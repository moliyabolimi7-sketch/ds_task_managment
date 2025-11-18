# backend/app/services/notifications/telegram.py
from __future__ import annotations

import httpx

from ...config import get_settings

settings = get_settings()


def build_url(method: str) -> str:
    return f"https://api.telegram.org/bot{settings.telegram_bot_token}/{method}"


def send_message(chat_id: str, text: str, reply_markup: dict | None = None) -> None:
    if not settings.telegram_bot_token:
        return
    payload = {"chat_id": chat_id, "text": text, "parse_mode": "HTML"}
    if reply_markup:
        payload["reply_markup"] = reply_markup
    try:
        httpx.post(build_url("sendMessage"), json=payload, timeout=10)
    except httpx.HTTPError:
        pass
