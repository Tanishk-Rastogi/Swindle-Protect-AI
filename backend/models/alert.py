from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from config.database import Base


class Alert(Base):

    __tablename__ = "alerts"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id")
    )

    transaction_id = Column(
        UUID(as_uuid=True),
        ForeignKey("transactions.id")
    )

    severity = Column(String)

    message = Column(String)

    status = Column(
        String,
        default="unread"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )