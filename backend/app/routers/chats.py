# backend/app/routers/chats.py
import asyncio

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import deps
from ..database import get_db
from ..models import Task, TaskChatMessage, RoleEnum, User
from ..schemas import ChatMessageCreate, ChatMessageRead
from ..services.chat.manager import connection_manager

router = APIRouter()


@router.get("/tasks/{task_id}/chat", response_model=list[ChatMessageRead])
def get_chat(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(deps.get_current_user)):
    task = db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if current_user.role == RoleEnum.EMPLOYEE and task.assigned_to_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    return db.query(TaskChatMessage).filter(TaskChatMessage.task_id == task_id).order_by(TaskChatMessage.created_at).all()


@router.post("/tasks/{task_id}/chat", response_model=ChatMessageRead)
def post_message(
    task_id: int,
    payload: ChatMessageCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
):
    task = db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if current_user.role == RoleEnum.EMPLOYEE and task.assigned_to_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    message = TaskChatMessage(
        task_id=task_id,
        author_id=current_user.id,
        message_type=payload.message_type,
        content=payload.content,
        attachment_url=payload.attachment_url,
    )
    db.add(message)
    db.commit()
    db.refresh(message)

    asyncio.create_task(
        connection_manager.broadcast(
            task_id,
            {
                "id": message.id,
                "author_id": current_user.id,
                "message_type": message.message_type.value,
                "content": message.content,
                "attachment_url": message.attachment_url,
                "created_at": message.created_at.isoformat(),
            },
        )
    )

    return message
