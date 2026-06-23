from fastapi import FastAPI

from config.database import Base, engine

from models.user import User
from models.alert import Alert
from models.transaction import Transaction

from routers.auth import router as auth_router
from routers.transaction import router as transaction_router
from routers.alerts import router as alert_router
from routers.analytics import router as analytics_router


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

app.include_router(
    alert_router,
    prefix="/alerts",
    tags=["Alerts"]
)

app.include_router(
    analytics_router,
    prefix="/analytics",
    tags=["Analytics"]
)

@app.get("/")
def home():
    return {
        "message": "Backend running"
    }