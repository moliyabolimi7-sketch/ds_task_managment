# backend/app/deps.py
from fastapi import Depends, Header, HTTPException, status
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from .config import get_settings
from .database import get_db
from .models.user import User, RoleEnum

settings = get_settings()


def _extract_token(authorization: str | None) -> str:
    if not authorization:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing token")
    if authorization.startswith("Bearer "):
        return authorization.split(" ", 1)[1]
    return authorization


def get_current_user(
    authorization: str | None = Header(None, alias="Authorization"), db: Session = Depends(get_db)
) -> User:
    token = _extract_token(authorization)
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc
    user_id: str | None = payload.get("sub")
    if user_id is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")
    user = db.get(User, int(user_id))
    if not user or not user.is_active:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Inactive user")
    return user


def require_roles(*roles: RoleEnum):
    def role_checker(user: User = Depends(get_current_user)) -> User:
        if user.role not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
        return user

    return role_checker


def get_optional_user(
    authorization: str | None = Header(None, alias="Authorization"), db: Session = Depends(get_db)
) -> User | None:
    if not authorization:
        return None
    token = _extract_token(authorization)
    try:
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
    except JWTError:
        return None
    user_id: str | None = payload.get("sub")
    if user_id is None:
        return None
    return db.get(User, int(user_id))
