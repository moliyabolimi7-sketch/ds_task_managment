# backend/app/schemas/__init__.py
from .user import UserCreate, UserRead, UserUpdate, DepartmentCreate, DepartmentRead, SystemSettingRead
from .task import TaskCreate, TaskRead, TaskUpdate, TaskStatusEnum, ChatMessageCreate, ChatMessageRead, FileAssetRead
from .auth import TokenPair, LoginRequest, ChangePasswordRequest

__all__ = [
    "UserCreate",
    "UserRead",
    "UserUpdate",
    "DepartmentCreate",
    "DepartmentRead",
    "SystemSettingRead",
    "TaskCreate",
    "TaskRead",
    "TaskUpdate",
    "TaskStatusEnum",
    "ChatMessageCreate",
    "ChatMessageRead",
    "FileAssetRead",
    "TokenPair",
    "LoginRequest",
    "ChangePasswordRequest",
]
