from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.database import Base, engine
from config.constants import (API_VERSION, PROJECT_NAME)
from models.user import User
from models.alert import Alert
from models.transaction import Transaction

from routers.auth import router as auth_router
from routers.transaction import router as transaction_router
from routers.alerts import router as alert_router
from routers.analytics import router as analytics_router




app = FastAPI(title=PROJECT_NAME,
    version=API_VERSION,
    description="""
    Portfolio-grade AI fraud detection platform.
    Features:
    - JWT Authentication
    - Rule-based fraud detection
    - Machine Learning fraud prediction
    - Risk scoring engine
    - Alert generation
    - Analytics dashboard support
    - PostgreSQL persistence
    """
)


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

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://swindle-protect-ai.vercel.app",
        "https://swindle-protect-lk6jwskwf-tanishks-projects-44d951bb.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Backend running"
    }

@app.get("/health")
def health_check():

    return {
        "status": "healthy",
        "service": "Swindle-Protect AI"
    }