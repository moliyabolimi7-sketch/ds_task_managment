# TaskFlow Pro — Rollarga asoslangan vazifa boshqaruvi

TaskFlow Pro menejerlar, direktorlar va hodimlar o'rtasidagi jarayonlarni yagona platformada uyg'unlashtiradi. Loyiha FastAPI backend, React + Vite frontend, Aiogram 3 Telegram boti va Docker Compose asosidagi infrani o'z ichiga oladi.

## 🏗 Arxitektura qisqacha
- **Backend (FastAPI)** — Auth, RBAC, vazifalar, chat, fayl yuklash, hisobotlar va Google Sheets eksporti.
- **Frontend (React + Tailwind)** — mobil-first dizayn, sidebar navigatsiya, real-time chat interfeysi va statistik dashboardlar.
- **Telegram bot (Aiogram 3)** — telefon orqali autentifikatsiya, inline approve/reject, live notifikatsiyalar.
- **Infra** — PostgreSQL, Redis, MinIO, Nginx reverse proxy, Docker Compose orkestratsiyasi.

Batafsil dizayn `docs/ARCHITECTURE.md` faylida.

## 🚀 Ishga tushirish
1. `.env` faylini yarating va quyidagilarni to'ldiring:
   ```env
   JWT_SECRET_KEY=super-secret
   JWT_REFRESH_SECRET_KEY=super-refresh
   TELEGRAM_BOT_TOKEN=123456:ABC
   GOOGLE_SERVICE_ACCOUNT_JSON=/secrets/google.json
   ```
2. Docker Compose bilan barcha servislarni ko'taring:
   ```bash
   docker compose up --build
   ```
3. FastAPI hujjatlari `http://localhost:8000/docs` da, frontend esa `http://localhost:5173` da ishlaydi.

## 🔑 Asosiy imkoniyatlar
- Telegram orqali login/parol generatsiyasi va tasdiqlash.
- RBAC: Owner, Director, Admin, Manager, Employee rollari.
- Vazifa sikli: New → In Progress → Pending Review → Completed / Rejected.
- WebSocket chat, fayl/screenshot/audio/video upload va MinIO saqlash.
- Telegram notifikatsiyalari (yangi vazifa, topshirildi, redo, kunlik xulosalar).
- Google Sheets eksport endpointlari.
- Admin panel — foydalanuvchilar, bo'limlar va rang sxemasi sozlamalari.
- Direktorlar uchun executive hisobotlari va premium leaderboard vidjetlari.

## 📊 Executive hisobotlari

FastAPI backendiga yangi `/api/v1/reports/executive` endpointi qo'shildi. U quyidagi ma'lumotlarni qaytaradi:

- Barcha statuslar bo'yicha umumiy metrikalar, tugallanish foizi va premium ball volumeni.
- Bo'limlar kesimidagi sog'liq jadvali (completed/pending/active).
- Top performerlar va ularning rollari/departamentlari.
- So'nggi premium timeline — yuqori baholi vazifalar, holati va muddatlari.

Frontendning **Reports** sahifasida ushbu ma'lumotlar gradient kartalar, department health progress barlari va executive timeline ko'rinishida aks etadi.

## 📦 Papkalar
```
backend/        FastAPI ilovasi + Alembic
frontend/       React + Vite mijoz ilovasi
telegram_bot/   Aiogram 3 bot
nginx/          Reverse proxy konfiguratsiyasi
docs/           ERD va UML hujjatlari
```

## 🧪 Test va rivojlantirish
- Backendni lokal ishga tushirish: `uvicorn app.main:app --reload --app-dir backend`
- Frontendni dev rejimida: `cd frontend && npm install && npm run dev`
- Telegram botini lokal ishga tushirish: `cd telegram_bot && pip install -r requirements.txt && python bot.py`
