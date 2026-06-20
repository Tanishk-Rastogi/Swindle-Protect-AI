from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from config.database import get_db

from models.alert import Alert

from utils.dependencies import get_current_user

router = APIRouter()

@router.get("/")
def get_alerts(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    alerts = (
        db.query(Alert)
        .filter(Alert.user_id == current_user.id)
        .all()
    )

    return alerts