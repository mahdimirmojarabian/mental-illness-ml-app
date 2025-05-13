from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session
from database import engine, get_db
from models import Base, User, Prediction
from schemas import UserCreate, UserLogin, PredictionRequest, PredictionResponse
from auth import get_password_hash, create_access_token, authenticate_user, get_current_user
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from jose import JWTError, jwt
from fastapi.security import OAuth2PasswordBearer
import os

# Initialize database
Base.metadata.create_all(bind=engine)

# Initialize app
app = FastAPI()

router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model_bundle = joblib.load("ml_model.pkl")
model = model_bundle["model"]
scaler = model_bundle["scaler"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

SECRET_KEY = os.getenv("SECRET_KEY", "secret-key")
ALGORITHM = "HS256"

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        user = db.query(User).filter(User.username == username).first()
        if user is None:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@app.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    new_user = User(username=user.username, email=user.email, password_hash=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User registered successfully"}

@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = authenticate_user(db, user.username, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": db_user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post('/predict', response_model=PredictionResponse)
def predict(request: PredictionRequest, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    try:
        features = [request.schizophrenia, request.depression, request.anxiety, request.bipolar]

        # Using scaler and ML model
        scaled_features = scaler.transform([features])
        prediction_result = float(model.predict(scaled_features)[0])

        new_prediction = Prediction(
            schizophrenia=request.schizophrenia,
            depression=request.depression,
            anxiety=request.anxiety,
            bipolar=request.bipolar,
            result=prediction_result,
            username=current_user.username,
            features=",".join(map(str, features))
        )

        db.add(new_prediction)
        db.commit()
        db.refresh(new_prediction)

        print(f"[INFO] Prediction saved: {new_prediction.id} - User: {current_user.username}")

        return PredictionResponse(
            prediction=prediction_result,
            schizophrenia=request.schizophrenia,
            depression=request.depression,
            anxiety=request.anxiety,
            bipolar=request.bipolar
        )

    except Exception as e:
        db.rollback()
        print(f"[ERROR] Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/history")
def get_prediction_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    history = db.query(Prediction).filter_by(username=current_user.username).all()
    response_data = [
        {
            "features": entry.features,
            "result": entry.result
        } for entry in history
    ]
    print("[DEBUG] Fetched History:", response_data)
    return response_data

@app.get("/me")
def read_users_me(current_user: User = Depends(get_current_user)):
    return {"username": current_user.username, "email": current_user.email}

app.include_router(router)
