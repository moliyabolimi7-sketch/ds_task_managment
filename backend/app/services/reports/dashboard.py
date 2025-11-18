# backend/app/services/reports/dashboard.py
from sqlalchemy.orm import Session
from sqlalchemy import func

from ...models import Task, User, TaskStatusEnum


def employee_stats(db: Session, user_id: int) -> dict:
    total_tasks = db.query(Task).filter(Task.assigned_to_id == user_id).count()
    completed = db.query(Task).filter(Task.assigned_to_id == user_id, Task.status == TaskStatusEnum.COMPLETED).count()
    pending = db.query(Task).filter(Task.assigned_to_id == user_id, Task.status == TaskStatusEnum.PENDING_REVIEW).count()
    latest_score = (
        db.query(func.sum(Task.score)).filter(Task.assigned_to_id == user_id, Task.status == TaskStatusEnum.COMPLETED).scalar()
        or 0
    )
    return {
        "total": total_tasks,
        "completed": completed,
        "pending": pending,
        "score": latest_score,
    }


def leaderboard(db: Session, limit: int = 5) -> list[dict]:
    rows = (
        db.query(User.first_name, User.last_name, func.sum(Task.score).label("score"))
        .join(Task, Task.assigned_to_id == User.id)
        .filter(Task.status == TaskStatusEnum.COMPLETED)
        .group_by(User.id)
        .order_by(func.sum(Task.score).desc())
        .limit(limit)
        .all()
    )
    return [
        {"name": f"{row.first_name} {row.last_name}", "score": int(row.score or 0)}
        for row in rows
    ]
