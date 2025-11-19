# backend/app/services/notifications/dispatcher.py
from __future__ import annotations

from redis import Redis

from ...config import get_settings
from .telegram import send_message

settings = get_settings()

try:
    redis_client = Redis.from_url(settings.redis_url, decode_responses=True)
except Exception:  # pragma: no cover - fallback if redis unavailable
    redis_client = None


class NotificationEvent:
    def __init__(self, key: str, payload: dict):
        self.key = key
        self.payload = payload


def push_event(event: NotificationEvent) -> None:
    if redis_client:
        redis_client.rpush("taskflow_notifications", event.payload | {"event": event.key})


def send_task_assigned(chat_id: str, title: str, due: str, score: int, link: str) -> None:
    text = f"🆕 Yangi vazifa: <b>{title}</b>\nMuddati: {due}\nBall: {score}\n<a href='{link}'>Vazifani ochish</a>"
    send_message(chat_id, text)
