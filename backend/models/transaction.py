from sqlalchemy import (
    Column,
    Float,
    ForeignKey,
    Numeric,
    String,
    Boolean,
    Integer,
    DateTime
)
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
from config.database import Base

import uuid



class Transaction(Base):

    __tablename__ = "transactions"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id")
    )

    amount = Column(Numeric(10, 2))
    merchant = Column(String(255))
    timestamp = Column(DateTime,default=datetime.utcnow)
    rule_score = Column(Integer, nullable=False, default=0)
    risk_score = Column(Integer,default=0)
    ml_probability = Column(Float, nullable=False, default=0)
    is_fraud = Column(Boolean,default=False)
    day_of_week = Column(Integer)
    hour = Column(Integer)
    merchant_category = Column(String)
    is_new_device = Column(Boolean)
    distance_from_home_km = Column(Float)
    is_international = Column(Boolean)
    txn_velocity_1h = Column(Integer)
    account_age_days = Column(Integer)