from fastapi import FastAPI

from config.database import engine
from models.user import User

app = FastAPI(title="Swindle Protect AI")

User.metadata.create_all(bind=engine) # Create database tables

@app.get("/")
def home():
    return {
        "message": "Backend running"
    }