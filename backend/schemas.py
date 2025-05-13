# Placeholder for future DB schemas

from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class PredictionRequest(BaseModel):
    schizophrenia: float
    depression: float
    anxiety: float
    bipolar: float

class PredictionResponse(BaseModel):
    prediction: float
    schizophrenia: float
    depression: float
    anxiety: float
    bipolar: float
