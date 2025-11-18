# backend/app/main.py
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

from .config import get_settings
from .routers import auth, users, tasks, departments, files, reports, exports, chats
from .services.chat.manager import connection_manager

settings = get_settings()

app = FastAPI(title=settings.project_name, version="1.0.0", docs_url="/docs", redoc_url="/redoc")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=settings.api_v1_prefix, tags=["auth"])
app.include_router(users.router, prefix=settings.api_v1_prefix, tags=["users"])
app.include_router(tasks.router, prefix=settings.api_v1_prefix, tags=["tasks"])
app.include_router(departments.router, prefix=settings.api_v1_prefix, tags=["departments"])
app.include_router(files.router, prefix=settings.api_v1_prefix, tags=["files"])
app.include_router(reports.router, prefix=settings.api_v1_prefix, tags=["reports"])
app.include_router(exports.router, prefix=settings.api_v1_prefix, tags=["exports"])
app.include_router(chats.router, prefix=settings.api_v1_prefix, tags=["chat"])


@app.get("/", response_class=HTMLResponse)
def index():
    return "<h2>TaskFlow Pro API</h2>"


@app.websocket("/ws/tasks/{task_id}")
async def task_chat(websocket: WebSocket, task_id: int):
    await connection_manager.connect(task_id, websocket)
    try:
        while True:
            data = await websocket.receive_json()
            await connection_manager.broadcast(task_id, data)
    except WebSocketDisconnect:
        connection_manager.disconnect(task_id, websocket)
