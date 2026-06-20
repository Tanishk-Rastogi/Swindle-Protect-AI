from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from config.database import get_db

from models.transaction import Transaction
from models.alert import Alert

from schemas.transaction import TransactionCreate

from utils.dependencies import get_current_user

from services.fraud_engine import calculate_risk
from services.alert_engine import create_alert

router = APIRouter()


@router.post("/")
def create_transaction(
    transaction: TransactionCreate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)):
    fraud = calculate_risk(transaction.amount)
    alert = create_alert(fraud["risk_score"])
    new_transaction = Transaction(
        user_id=current_user.id,
        amount=transaction.amount,
        merchant=transaction.merchant,
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