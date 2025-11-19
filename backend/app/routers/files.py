# backend/app/routers/files.py
from fastapi import APIRouter, Depends, File, UploadFile, HTTPException
from sqlalchemy.orm import Session

from .. import deps
from ..database import get_db
from ..models import FileAsset, Task, User
from ..services.storage import s3

router = APIRouter()


@router.post("/tasks/{task_id}/files")
def upload_file(
    task_id: int,
    upload: UploadFile = File(...),
    current_user: User = Depends(deps.get_current_user),
    db: Session = Depends(get_db),
):
    task = db.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    content = upload.file.read()
    key = s3.upload_file(content, upload.filename, upload.content_type)
    file_asset = FileAsset(
        task_id=task_id,
        uploader_id=current_user.id,
        file_name=upload.filename,
        file_type=upload.content_type or "application/octet-stream",
        storage_key=key,
    )
    db.add(file_asset)
    db.commit()
    db.refresh(file_asset)
    return {"url": s3.generate_presigned_url(key), "file": file_asset.id}
