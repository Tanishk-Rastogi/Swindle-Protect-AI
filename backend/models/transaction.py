from sqlalchemy import (
    Column,
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
    risk_score = Column(Integer,default=0)
    is_fraud = Column(Boolean,default=False)