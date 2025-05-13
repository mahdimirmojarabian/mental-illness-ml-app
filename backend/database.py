# Placeholder for future DB connection
# You can use SQLAlchemy here for PostgreSQL connection

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# PostgreSQL Database URL
DATABASE_URL = os.getenv("DATABASE_URL")

# SQLAlchemy Setup
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

# Dependency to inject session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


