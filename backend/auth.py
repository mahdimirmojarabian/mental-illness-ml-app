from passlib.context import CryptContext
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from datetime import datetime, timedelta
from database import get_db
from models import User
from schemas import UserCreate, UserLogin
import os


SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def authenticate_user(db: Session, username: str, password: str):
    print("Searching for user:", username)  # DEBUG
    user = db.query(User).filter(User.username == username).first()
    if not user:
        print("User not found!")  # DEBUG
        return False
    print("User found, verifying password...")  # DEBUG
    if not verify_password(password, user.password_hash):
        print("Password mismatch!")  # DEBUG
        return False
    print("Password verified!")  # DEBUG
    return user


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    print(f"Incoming Token: {token}")  # ✅ DEBUG: Check token
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(f"Payload Decoded: {payload}")  # ✅ DEBUG: Check payload
        username = payload.get("sub")
        if username is None:
            print("Username not found in token payload.")  # ✅ DEBUG
            raise HTTPException(status_code=401, detail="Invalid token")
        user = db.query(User).filter(User.username == username).first()
        if user is None:
            print("User not found in database.")  # ✅ DEBUG
            raise HTTPException(status_code=401, detail="User not found")
        print("User authenticated successfully.")  # ✅ DEBUG
        return user
    except JWTError as e:
        print(f"JWT Error: {str(e)}")  # ✅ DEBUG
        raise HTTPException(status_code=401, detail="Could not validate credentials")