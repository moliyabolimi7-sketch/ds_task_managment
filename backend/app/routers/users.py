# backend/app/routers/users.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import deps
from ..database import get_db
from ..models import User, RoleEnum
from ..schemas import UserCreate, UserRead, UserUpdate
from ..utils.security import get_password_hash

router = APIRouter()


@router.get("/users", response_model=list[UserRead])
def list_users(
    db: Session = Depends(get_db),
    _: User = Depends(deps.require_roles(RoleEnum.ADMIN, RoleEnum.DIRECTOR, RoleEnum.OWNER)),
):
    return db.query(User).all()


@router.post("/users", response_model=UserRead)
def create_user(
    payload: UserCreate,
    db: Session = Depends(get_db),
    _: User = Depends(deps.require_roles(RoleEnum.ADMIN, RoleEnum.DIRECTOR, RoleEnum.OWNER)),
):
    if db.query(User).filter(User.phone == payload.phone).first():
        raise HTTPException(status_code=400, detail="Phone already used")
    user = User(
        first_name=payload.first_name,
        last_name=payload.last_name,
        phone=payload.phone,
        role=payload.role,
        department_id=payload.department_id,
        password_hash=get_password_hash(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.patch("/users/{user_id}", response_model=UserRead)
def update_user(
    user_id: int,
    payload: UserUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(deps.require_roles(RoleEnum.ADMIN, RoleEnum.DIRECTOR, RoleEnum.OWNER)),
):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for field, value in payload.dict(exclude_unset=True).items():
        if field == "password" and value:
            setattr(user, "password_hash", get_password_hash(value))
        elif hasattr(user, field):
            setattr(user, field, value)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.delete("/users/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    _: User = Depends(deps.require_roles(RoleEnum.ADMIN, RoleEnum.OWNER)),
):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"status": "deleted"}
