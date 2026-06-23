from pydantic import BaseModel


class TransactionCreate(BaseModel):
    day_of_week: int
    hour: int
    amount: float
    merchant: str
    merchant_category: str
    is_new_device: bool
    distance_from_home_km: float
    is_international: bool
    txn_velocity_1h: int
    account_age_days: int