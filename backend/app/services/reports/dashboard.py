# backend/app/services/reports/dashboard.py
from __future__ import annotations

from sqlalchemy import case, func
from sqlalchemy.orm import Session, joinedload

from ...models import Department, Task, TaskStatusEnum, User


def employee_stats(db: Session, user_id: int) -> dict:
    total_tasks = db.query(Task).filter(Task.assigned_to_id == user_id).count() or 0
    completed = (
        db.query(Task)
        .filter(Task.assigned_to_id == user_id, Task.status == TaskStatusEnum.COMPLETED)
        .count()
        or 0
    )
    pending = (
        db.query(Task)
        .filter(Task.assigned_to_id == user_id, Task.status == TaskStatusEnum.PENDING_REVIEW)
        .count()
        or 0
    )
    latest_score = (
        db.query(func.coalesce(func.sum(Task.score), 0))
        .filter(Task.assigned_to_id == user_id, Task.status == TaskStatusEnum.COMPLETED)
        .scalar()
        or 0
    )
    return {
        "total": total_tasks,
        "completed": completed,
        "pending": pending,
        "score": int(latest_score),
    }


def leaderboard(db: Session, limit: int = 5) -> list[dict]:
    rows = (
        db.query(
            User.first_name,
            User.last_name,
            User.role,
            func.coalesce(Department.name, "").label("department"),
            func.coalesce(func.sum(Task.score), 0).label("score"),
        )
        .join(Task, Task.assigned_to_id == User.id)
        .outerjoin(Department, Department.id == User.department_id)
        .filter(Task.status == TaskStatusEnum.COMPLETED)
        .group_by(User.id, Department.name)
        .order_by(func.sum(Task.score).desc())
        .limit(limit)
        .all()
    )
    leaderboard_rows: list[dict] = []
    for row in rows:
        leaderboard_rows.append(
            {
                "name": f"{row.first_name} {row.last_name}",
                "score": int(row.score or 0),
                "role": row.role.value if hasattr(row.role, "value") else row.role,
                "department": row.department or "—",
            }
        )
    return leaderboard_rows


def executive_overview(db: Session) -> dict:
    total_tasks = db.query(func.count(Task.id)).scalar() or 0
    status_rows = db.query(Task.status, func.count(Task.id)).group_by(Task.status).all()
    status_counts = {status: count for status, count in status_rows}

    overdue = (
        db.query(func.count(Task.id))
        .filter(
            Task.due_time.isnot(None),
            Task.due_time < func.now(),
            Task.status != TaskStatusEnum.COMPLETED,
        )
        .scalar()
        or 0
    )
    avg_score = db.query(func.avg(Task.score)).scalar() or 0
    total_score = db.query(func.sum(Task.score)).scalar() or 0

    department_rows = (
        db.query(
            Department.name.label("department"),
            func.count(Task.id).label("total"),
            func.sum(case((Task.status == TaskStatusEnum.COMPLETED, 1), else_=0)).label("completed"),
            func.sum(case((Task.status == TaskStatusEnum.PENDING_REVIEW, 1), else_=0)).label("pending"),
        )
        .join(User, User.department_id == Department.id)
        .join(Task, Task.assigned_to_id == User.id)
        .group_by(Department.id)
        .order_by(Department.name)
        .all()
    )

    breakdown = [
        {
            "department": row.department,
            "total": int(row.total or 0),
            "completed": int(row.completed or 0),
            "pending": int(row.pending or 0),
        }
        for row in department_rows
    ]

    recent_tasks = (
        db.query(Task)
        .options(joinedload(Task.assigned_to))
        .order_by(Task.updated_at.desc())
        .limit(6)
        .all()
    )
    recent_activity = [
        {
            "id": task.id,
            "title": task.title,
            "status": task.status.value,
            "score": task.score,
            "assignee": f"{task.assigned_to.first_name} {task.assigned_to.last_name}" if task.assigned_to else "",
            "due_time": task.due_time.isoformat() if task.due_time else None,
            "updated_at": task.updated_at.isoformat() if task.updated_at else None,
        }
        for task in recent_tasks
    ]

    completed = status_counts.get(TaskStatusEnum.COMPLETED, 0)
    completion_rate = round((completed / total_tasks) * 100, 1) if total_tasks else 0

    headline = {
        "total_tasks": total_tasks,
        "completed": completed,
        "in_progress": status_counts.get(TaskStatusEnum.IN_PROGRESS, 0),
        "pending_review": status_counts.get(TaskStatusEnum.PENDING_REVIEW, 0),
        "rejected": status_counts.get(TaskStatusEnum.REJECTED, 0),
        "overdue": overdue,
        "average_score": round(float(avg_score), 1),
        "score_volume": int(total_score),
        "completion_rate": completion_rate,
    }

    return {
        "headline": headline,
        "department_breakdown": breakdown,
        "top_performers": leaderboard(db, limit=6),
        "recent_activity": recent_activity,
    }
