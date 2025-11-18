# backend/app/schemas/task.py
from datetime import datetime
from pydantic import BaseModel

from ..models.task import TaskStatusEnum, ChatMessageType


class UserPreview(BaseModel):
    id: int
    first_name: str
    last_name: str

    class Config:
        orm_mode = True


class TaskBase(BaseModel):
    title: str
    description: str
    category: str | None = None
    score: int = 0
    assigned_to_id: int
    start_time: datetime | None = None
    due_time: datetime | None = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    category: str | None = None
    score: int | None = None
    assigned_to_id: int | None = None
    status: TaskStatusEnum | None = None
    start_time: datetime | None = None
    due_time: datetime | None = None
    redo_reason: str | None = None


class TaskRead(TaskBase):
    id: int
    status: TaskStatusEnum
    redo_reason: str | None
    assigned_by_id: int
    created_at: datetime
    updated_at: datetime
    assigned_to: UserPreview | None = None

    class Config:
        orm_mode = True


class ChatMessageCreate(BaseModel):
    message_type: ChatMessageType = ChatMessageType.TEXT
    content: str | None = None
    attachment_url: str | None = None


class ChatMessageRead(ChatMessageCreate):
    id: int
    task_id: int
    author_id: int
    created_at: datetime

    class Config:
        orm_mode = True


class FileAssetRead(BaseModel):
    id: int
    file_name: str
    file_type: str
    storage_key: str
    created_at: datetime

    class Config:
        orm_mode = True
