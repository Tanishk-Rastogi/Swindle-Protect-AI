from pydantic import BaseModel, Field


class TransactionCreate(BaseModel):
    day_of_week: int = Field(..., ge=0, le=6)
    hour: int = Field(..., ge=0, le=23)
    amount: float = Field(..., gt=0)
    merchant: str
    merchant_category: str
    is_new_device: bool
    distance_from_home_km: float = Field(..., ge=0)
    is_international: bool
    txn_velocity_1h: int = Field(..., ge=0)
    account_age_days: int = Field(..., ge=0)