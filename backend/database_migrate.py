from database import engine
from models import Base

print("Applying migrations...")
Base.metadata.create_all(bind=engine)
print("Database tables created successfully!")
