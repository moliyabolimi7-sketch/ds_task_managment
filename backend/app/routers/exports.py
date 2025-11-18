# backend/app/routers/exports.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import deps
from ..database import get_db
from ..models import RoleEnum, Task, User
from ..services.reports.google_sheets import export_tasks_to_sheet

router = APIRouter()


@router.post("/exports/tasks")
def export_tasks(
    db: Session = Depends(get_db),
    _: str = Depends(deps.require_roles(RoleEnum.MANAGER, RoleEnum.DIRECTOR, RoleEnum.OWNER, RoleEnum.ADMIN)),
):
    rows = [["Title", "Assignee", "Score", "Status", "Due"]]
    tasks = db.query(Task).all()
    for task in tasks:
        assignee: User | None = task.assigned_to
        rows.append([
            task.title,
            f"{assignee.first_name} {assignee.last_name}" if assignee else "",
            str(task.score),
            task.status.value,
            task.due_time.isoformat() if task.due_time else "",
        ])
    url = export_tasks_to_sheet("TaskFlow Export", rows)
    return {"sheet_url": url}
