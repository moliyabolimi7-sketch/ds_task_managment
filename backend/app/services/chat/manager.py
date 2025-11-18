# backend/app/services/chat/manager.py
from collections import defaultdict
from typing import Any

from fastapi import WebSocket


class ConnectionManager:
    def __init__(self) -> None:
        self.active_connections: dict[int, list[WebSocket]] = defaultdict(list)

    async def connect(self, task_id: int, websocket: WebSocket) -> None:
        await websocket.accept()
        self.active_connections[task_id].append(websocket)

    def disconnect(self, task_id: int, websocket: WebSocket) -> None:
        if websocket in self.active_connections.get(task_id, []):
            self.active_connections[task_id].remove(websocket)

    async def broadcast(self, task_id: int, message: Any) -> None:
        for connection in self.active_connections.get(task_id, []):
            await connection.send_json(message)


connection_manager = ConnectionManager()
