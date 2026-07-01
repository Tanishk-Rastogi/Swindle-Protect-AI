from sqlalchemy import create_engine      # Connect Python to the database

from sqlalchemy.orm import declarative_base  # Blueprint for database tables
from sqlalchemy.orm import sessionmaker      # Tool to talk to the database

import os                                 # Access environment variables
from dotenv import load_dotenv

load_dotenv()                             # Load .env file

DATABASE_URL = os.getenv("DATABASE_URL")  # Get database address
engine = create_engine(DATABASE_URL)      # Create DB connection

SessionLocal = sessionmaker(              # Create DB session tool
    autocommit=False,                     # Save manually
    autoflush=False,                      # Don't auto-send changes
    bind=engine                           # Use this DB connection
)

Base = declarative_base()                 # Base for all database tables

def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()
