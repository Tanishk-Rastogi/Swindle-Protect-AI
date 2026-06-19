from fastapi import FastAPI

from config.database import Base, engine

from models.user import User
from models.alert import Alert

from routers.auth import router as auth_router
from routers.transaction import router as transaction_router


app = FastAPI(title="Swindle Protect AI")

Base.metadata.create_all(bind=engine) # Create database tables

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    transaction_router,
    prefix="/transactions",
    tags=["Transactions"]
)
@app.get("/")
def home():
    return {
        "message": "Backend running"
    }