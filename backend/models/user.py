from pydantic import EmailStr, BaseModel
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
import uuid
from config.database import Base

class User(Base):                  
    __tablename__ = "users"           # Table name
    
    id = Column(                      # User ID
        UUID(as_uuid=True),           # Use UUID format
        primary_key=True,             # Make it unique
        default=uuid.uuid4            # Generate automatically
    )

    name = Column(String)             # Store name
    email = Column(String, unique=True) # Store email, must be unique
    password_hash = Column(String)    # Store password
    role = Column(String)             # Store user role

class UserLogin(BaseModel):
    email: EmailStr
    password: str