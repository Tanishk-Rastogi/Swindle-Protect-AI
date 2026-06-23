from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from config.database import get_db

from models.transaction import Transaction
from models.alert import Alert

from schemas.transaction import TransactionCreate

from utils.dependencies import get_current_user

from services.fraud_engine import calculate_risk
from services.alert_engine import create_alert

from ml.predict import predict_fraud

router = APIRouter()


@router.post("/")
def create_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    fraud = calculate_risk(transaction.amount)
    ml_input = {
        "day_of_week": transaction.day_of_week,
        "hour": transaction.hour,
        "amount": transaction.amount,
        "is_new_device": transaction.is_new_device,
        "distance_from_home_km": transaction.distance_from_home_km,
        "is_international": transaction.is_international,
        "txn_velocity_1h": transaction.txn_velocity_1h,
        "account_age_days": transaction.account_age_days,
        "merchant_category": transaction.merchant_category
    }
    ml_result = predict_fraud(ml_input)

    ml_probability = ml_result["probability"]

    ml_risk = int(ml_probability * 50)

    fraud["risk_score"] += ml_risk

    if ml_probability >= 0.5:
        fraud["reasons"].append(
            f"ML model detected suspicious activity ({ml_probability:.2f})"
        )
    fraud["risk_score"] = min(fraud["risk_score"],100)
    alert = create_alert(fraud["risk_score"])
    new_transaction = Transaction(
        user_id=current_user.id,
        day_of_week=transaction.day_of_week,
        hour=transaction.hour,
        amount=transaction.amount,
        merchant=transaction.merchant,
        merchant_category=transaction.merchant_category,
        is_new_device=transaction.is_new_device,
        distance_from_home_km=transaction.distance_from_home_km,
        is_international=transaction.is_international,
        txn_velocity_1h=transaction.txn_velocity_1h,
        account_age_days=transaction.account_age_days,
        risk_score=fraud["risk_score"],
        is_fraud=fraud["is_fraud"]
    )

    db.add(new_transaction)
    db.commit()
    db.refresh(new_transaction)
    if alert:
        new_alert = Alert(
            user_id=current_user.id,
            transaction_id=new_transaction.id,
            severity=alert["severity"],
            message=alert["message"]
        )
        db.add(new_alert)
        db.commit()

    return {
        "message": "Transaction created",
        "risk_score": fraud["risk_score"],
        "is_fraud": fraud["is_fraud"],
        "reasons": fraud["reasons"],
        "ml_prediction": ml_result["prediction"],
        "ml_probability": round(ml_result["probability"] * 100,2),
        "alert": alert
    }

@router.get("/")
def get_transactions(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)):
    transactions = (
        db.query(Transaction)
        .filter(Transaction.user_id == current_user.id)
        .all()
    )
    return transactions