# backend/app/routers/departments.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import deps
from ..database import get_db
from ..models import Department, RoleEnum
from ..schemas import DepartmentCreate, DepartmentRead

router = APIRouter()


@router.get("/departments", response_model=list[DepartmentRead])
def list_departments(db: Session = Depends(get_db)):
    return db.query(Department).all()


@router.post("/departments", response_model=DepartmentRead)
def create_department(
    payload: DepartmentCreate,
    db: Session = Depends(get_db),
    _: RoleEnum = Depends(deps.require_roles(RoleEnum.ADMIN, RoleEnum.OWNER)),
):
    if db.query(Department).filter(Department.name == payload.name).first():
        raise HTTPException(status_code=400, detail="Department exists")
    dep = Department(name=payload.name, description=payload.description)
    db.add(dep)
    db.commit()
    db.refresh(dep)
    return dep
