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

    total_transactions = len(transactions)
    total_amount = sum(t.amount for t in transactions)
    fraud_count = sum(1 for t in transactions if t.is_fraud)

    return {
        "total_transactions": total_transactions,
        "total_amount": float(total_amount),
        "fraud_count": fraud_count
    }