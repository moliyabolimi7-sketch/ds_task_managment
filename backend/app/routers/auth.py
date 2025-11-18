# backend/app/routers/auth.py
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from .. import deps
from ..config import get_settings
from ..database import get_db
from ..models import User
from ..schemas import TokenPair, LoginRequest, UserRead, ChangePasswordRequest
from ..utils.security import verify_password, get_password_hash, create_access_token, create_refresh_token

router = APIRouter()
settings = get_settings()


@router.post("/auth/login", response_model=TokenPair)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.phone == data.phone).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect credentials")
    access = create_access_token(str(user.id), extra_claims={"role": user.role.value})
    refresh = create_refresh_token(str(user.id))
    return TokenPair(access_token=access, refresh_token=refresh)


@router.post("/auth/refresh", response_model=TokenPair)
def refresh(token: str):
    try:
        payload = jwt.decode(token, settings.jwt_refresh_secret_key, algorithms=[settings.jwt_algorithm])
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token") from exc
    user_id = payload.get("sub")
    access = create_access_token(user_id)
    refresh_token = create_refresh_token(user_id)
    return TokenPair(access_token=access, refresh_token=refresh_token)


@router.get("/auth/me", response_model=UserRead)
def me(current_user: User = Depends(deps.get_current_user)):
    return current_user


@router.post("/auth/change-password")
def change_password(
    payload: ChangePasswordRequest,
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(get_db),
):
    current_user.password_hash = get_password_hash(payload.password)
    db.add(current_user)
    db.commit()
    return {"status": "ok"}


@router.post("/auth/telegram/issue")
def issue_credentials(phone: str, telegram_id: str, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.phone == phone).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.telegram_id = telegram_id
    generated_password = f"TF-{user.id}-{int(datetime.utcnow().timestamp())}"
    user.password_hash = get_password_hash(generated_password)
    db.add(user)
    db.commit()
    return {"login": user.phone, "password": generated_password}
