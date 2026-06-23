from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from config.database import get_db

from models.transaction import Transaction

from utils.dependencies import get_current_user

router = APIRouter()


@router.get("/")
def get_analytics(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    transactions = (
        db.query(Transaction)
        .filter(Transaction.user_id == current_user.id)
        .all()
    )
    latest_transaction = (max(transactions, key=lambda t: t.timestamp)
        if transactions
        else None
    )
    total_transactions = len(transactions)
    total_amount = sum(t.amount for t in transactions)
    fraud_count = sum(1 for t in transactions if t.is_fraud)
    fraud_rate = (
        (fraud_count / total_transactions) * 100
        if total_transactions
        else 0
    )
    average_risk_score = (
        sum(t.risk_score for t in transactions) / total_transactions
        if total_transactions
        else 0
    )

    average_ml_confidence = (
        sum(t.ml_probability for t in transactions) / total_transactions
        if total_transactions
        else 0
    )
    return {
        "total_transactions": total_transactions,
        "total_amount": float(total_amount),
        "fraud_count": fraud_count,
        "average_risk_score": round(
            average_risk_score,
            2
        ),
        "average_ml_confidence": round(
            average_ml_confidence * 100,
            2
        ),
        "fraud_rate": round(
            fraud_rate,
            2
        ),
        "latest_transaction": (
            latest_transaction.timestamp
            if latest_transaction
            else None
        ),
    }