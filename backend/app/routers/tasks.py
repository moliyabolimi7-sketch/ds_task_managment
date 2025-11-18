# backend/app/routers/tasks.py
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from .. import deps
from ..database import get_db
from ..models import Task, TaskStatusEnum, RoleEnum, User
from ..schemas import TaskCreate, TaskRead, TaskUpdate
from ..services.notifications.dispatcher import send_task_assigned
from ..config import get_settings

router = APIRouter()
settings = get_settings()


@router.get("/tasks", response_model=list[TaskRead])
def list_tasks(
    db: Session = Depends(get_db), current_user: User = Depends(deps.get_current_user), status: TaskStatusEnum | None = None
):
    query = db.query(Task).options(joinedload(Task.assigned_to))
    if current_user.role == RoleEnum.EMPLOYEE:
        query = query.filter(Task.assigned_to_id == current_user.id)
    elif current_user.role == RoleEnum.MANAGER:
        query = query.filter(Task.assigned_by_id == current_user.id)
    if status:
        query = query.filter(Task.status == status)
    return query.order_by(Task.created_at.desc()).all()


@router.post("/tasks", response_model=TaskRead)
def create_task(
    payload: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        deps.require_roles(RoleEnum.MANAGER, RoleEnum.DIRECTOR, RoleEnum.OWNER)
    ),
):
    task = Task(
        title=payload.title,
        description=payload.description,
        category=payload.category,
        score=payload.score,
        assigned_to_id=payload.assigned_to_id,
        assigned_by_id=current_user.id,
        start_time=payload.start_time,
        due_time=payload.due_time,
    )
    db.add(task)
    db.commit()
    db.refresh(task)

    assignee = db.get(User, payload.assigned_to_id)
    if assignee and assignee.telegram_id:
        send_task_assigned(
            assignee.telegram_id,
            task.title,
            task.due_time.isoformat() if task.due_time else "",
            task.score,
            f"{settings.frontend_url}/tasks/{task.id}",
        )
    return task


@router.get("/tasks/{task_id}", response_model=TaskRead)
def get_task(task_id: int, db: Session = Depends(get_db), current_user: User = Depends(deps.get_current_user)):
    task = db.query(Task).options(joinedload(Task.assigned_to)).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if current_user.role == RoleEnum.EMPLOYEE and task.assigned_to_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    return task


@router.patch("/tasks/{task_id}", response_model=TaskRead)
def update_task(
    task_id: int,
    payload: TaskUpdate,
    db: Session = Depends(get_db),
    _: User = Depends(deps.require_roles(RoleEnum.MANAGER, RoleEnum.DIRECTOR, RoleEnum.OWNER)),
):
    task = db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    for field, value in payload.dict(exclude_unset=True).items():
        setattr(task, field, value)
    task.updated_at = datetime.utcnow()
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


@router.post("/tasks/{task_id}/status", response_model=TaskRead)
def set_status(
    task_id: int,
    status: TaskStatusEnum,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
):
    task = db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    if current_user.role == RoleEnum.EMPLOYEE and task.assigned_to_id != current_user.id:
        raise HTTPException(status_code=403, detail="Forbidden")
    if current_user.role == RoleEnum.EMPLOYEE and status not in {
        TaskStatusEnum.IN_PROGRESS,
        TaskStatusEnum.PENDING_REVIEW,
    }:
        raise HTTPException(status_code=403, detail="Employees cannot set this status")
    task.status = status
    task.updated_at = datetime.utcnow()
    if status == TaskStatusEnum.COMPLETED:
        assignee = db.get(User, task.assigned_to_id)
        if assignee:
            assignee.score += task.score
            db.add(assignee)
    db.add(task)
    db.commit()
    db.refresh(task)
    return task
