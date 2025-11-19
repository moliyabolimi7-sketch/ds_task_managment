# backend/app/schemas/user.py
from datetime import datetime
from pydantic import BaseModel, Field

from ..models.user import RoleEnum


class DepartmentBase(BaseModel):
    name: str
    description: str | None = None


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentRead(DepartmentBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class UserBase(BaseModel):
    first_name: str
    last_name: str
    phone: str
    role: RoleEnum = RoleEnum.EMPLOYEE
    department_id: int | None = None


class UserCreate(UserBase):
    password: str = Field(min_length=6)


class UserUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    phone: str | None = None
    role: RoleEnum | None = None
    department_id: int | None = None
    is_active: bool | None = None
    password: str | None = Field(default=None, min_length=6)


class UserRead(UserBase):
    id: int
    is_active: bool
    score: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True


class SystemSettingRead(BaseModel):
    key: str
    value: str

    class Config:
        orm_mode = True
