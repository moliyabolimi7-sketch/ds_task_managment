# backend/app/routers/reports.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import deps
from ..database import get_db
from ..models import RoleEnum, User
from ..services.reports import dashboard

router = APIRouter()


@router.get("/reports/employee")
def employee_report(current_user: User = Depends(deps.get_current_user), db: Session = Depends(get_db)):
    return dashboard.employee_stats(db, current_user.id)


@router.get("/reports/leaderboard")
def leaderboard(
    _: User = Depends(deps.require_roles(RoleEnum.MANAGER, RoleEnum.DIRECTOR, RoleEnum.OWNER)),
    db: Session = Depends(get_db),
):
    return dashboard.leaderboard(db)
