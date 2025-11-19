# telegram_bot/bot.py
import asyncio
import logging
from typing import Any

from aiogram import Bot, Dispatcher, F
from aiogram.filters import CommandStart
from aiogram.types import Message, ReplyKeyboardMarkup, KeyboardButton, CallbackQuery
import httpx
import os

API_URL = os.getenv("BACKEND_URL", "http://backend:8000/api/v1")
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "test-token")

logging.basicConfig(level=logging.INFO)

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


async def request_credentials(phone: str, telegram_id: int) -> dict[str, Any]:
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            f"{API_URL}/auth/telegram/issue",
            params={"phone": phone, "telegram_id": telegram_id},
            timeout=30,
        )
        resp.raise_for_status()
        return resp.json()


@dp.message(CommandStart())
async def start(message: Message):
    keyboard = ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="Telefonni yuborish", request_contact=True)]], resize_keyboard=True
    )
    await message.answer(
        "Salom! TaskFlow Pro tizimi uchun telefon raqamingizni yuboring.", reply_markup=keyboard
    )


@dp.message(F.contact)
async def contact_handler(message: Message):
    if not message.contact:
        return
    phone = message.contact.phone_number
    try:
        creds = await request_credentials(phone, message.from_user.id)
    except httpx.HTTPStatusError:
        await message.answer("Siz ro'yxatdan o'tmagansiz, admin bilan bog'laning.")
        return
    await message.answer(
        f"Login: <code>{creds['login']}</code>\nParol: <code>{creds['password']}</code>\n\nWeb: https://taskflow.example.com",
        parse_mode="HTML",
    )


@dp.callback_query(F.data.startswith("approve:"))
async def approve_task(callback: CallbackQuery):
    _, task_id = callback.data.split(":", 1)
    async with httpx.AsyncClient() as client:
        await client.post(f"{API_URL}/tasks/{task_id}/status", params={"status": "COMPLETED"})
    await callback.answer("Tasdiqlandi")


async def daily_summary():
    while True:
        await asyncio.sleep(24 * 3600)
        logging.info("Daily summary triggered")


async def main():
    asyncio.create_task(daily_summary())
    await dp.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
