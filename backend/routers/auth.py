from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from config.database import get_db
from models.user import User, UserLogin
from schemas.user import UserCreate
from utils.security import hash_password, verify_password
from utils.jwt_handler import create_access_token
from utils.dependencies import get_current_user

router = APIRouter()


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    new_user = User(
        name=user.name,
        email=user.email,
        password_hash=hash_password(user.password),
        role="user"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created",
        "id": str(new_user.id)
    }

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    existing_user = (
        db.query(User)
        .filter(User.email == form_data.username)
        .first()
    )
    if not existing_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    valid_password = verify_password(
        form_data.password,
        existing_user.password_hash
    )
    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid password"
        )
    token = create_access_token({"sub": existing_user.email})
    return {
        "access_token": token,
        "token_type": "bearer"
    }

@router.get("/me")
def me(current_user = Depends(get_current_user)):
    return {
        "id": str(current_user.id),
        "name": current_user.name,
        "email": current_user.email,
        "role": current_user.role
    }