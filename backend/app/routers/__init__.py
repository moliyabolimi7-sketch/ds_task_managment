# backend/app/routers/__init__.py
from . import auth, users, tasks, departments, files, reports, exports, chats

__all__ = [
    "auth",
    "users",
    "tasks",
    "departments",
    "files",
    "reports",
    "exports",
    "chats",
]
