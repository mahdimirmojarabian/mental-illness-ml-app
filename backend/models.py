from sqlalchemy import Column, Integer, String, Float, Boolean, JSON
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String, default='User')
    is_active = Column(Boolean, default=True)


class Prediction(Base):
    __tablename__ = 'predictions'

    id = Column(Integer, primary_key=True, index=True)
    schizophrenia = Column(Float, nullable=False)
    depression = Column(Float, nullable=False)
    anxiety = Column(Float, nullable=False)
    bipolar = Column(Float, nullable=False)
    result = Column(Float, nullable=False)
    username = Column(String, nullable=False)
    features = Column(String, nullable=True)  # ✅ New Column Added
