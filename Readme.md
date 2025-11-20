# TaskFlow Pro — Rollarga asoslangan vazifa boshqaruvi

TaskFlow Pro menejerlar, direktorlar va hodimlar o'rtasidagi jarayonlarni yagona platformada uyg'unlashtiradi. Loyiha FastAPI backend, HTML + Vite frontend, Aiogram 3 Telegram boti va Docker Compose asosidagi infrani o'z ichiga oladi.

## 🏗 Arxitektura qisqacha
- **Backend (FastAPI)** — Auth, RBAC, vazifalar, chat, fayl yuklash, hisobotlar va Google Sheets eksporti.
- **Frontend (Vanilla HTML + Vite bundler)** — har bir sahifa sof HTML maketlarida yozilgan, premium dizaynli dashboardlar, chat va formalar bilan.
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
3. FastAPI hujjatlari `http://localhost:8000/docs` da, HTML frontend esa `http://localhost:5173/login.html` dan boshlanadi.

## 🔑 Asosiy imkoniyatlar
- Telegram orqali login/parol generatsiyasi va tasdiqlash.
- RBAC: Owner, Director, Admin, Manager, Employee rollari.
- Vazifa sikli: New → In Progress → Pending Review → Completed / Rejected.
- WebSocket chat, fayl/screenshot/audio/video upload va MinIO saqlash.
- Telegram notifikatsiyalari (yangi vazifa, topshirildi, redo, kunlik xulosalar).
- Google Sheets eksport endpointlari.
- Admin panel — foydalanuvchilar, bo'limlar va rang sxemasi sozlamalari.
- Direktorlar uchun executive hisobotlari va premium leaderboard vidjetlari.

## 📊 HTML sahifalari
Frontend endi quyidagi sof HTML fayllar orqali tashkil etilgan:

| Fayl | Tavsif |
| --- | --- |
| `login.html` | Telegram orqali olingan login/parol bilan avtorizatsiya shakli |
| `dashboard.html` | Premium ko'rinishdagi statistik kartalar, timeline va bildirishnomalar |
| `tasks.html` | Vazifalar katalogi, filtrlash va tezkor amallar |
| `task-detail.html` | Chat, fayl ro'yxati va redo/approve tugmalari |
| `reports.html` | Bo'limlar kesimidagi completion progresslari |
| `users.html` | Admin uchun foydalanuvchilar jadvali |
| `settings.html` | Rang rejimi, Telegram bot tokeni va ruxsat sozlamalari |

Har bir fayl `src/pages/*.ts` moduli orqali minimal interaktivlikka ega (`theme` toggle, chat, filtrlar).

## 📦 Papkalar
```
backend/        FastAPI ilovasi + Alembic
frontend/       Sof HTML sahifalar va Vite build konfiguratsiyasi
telegram_bot/   Aiogram 3 bot
nginx/          Reverse proxy konfiguratsiyasi
docs/           ERD va UML hujjatlari
```

## 🧪 Test va rivojlantirish
- Backendni lokal ishga tushirish: `uvicorn app.main:app --reload --app-dir backend`
- Frontendni dev rejimida: `cd frontend && npm install && npm run dev`
- Telegram botini lokal ishga tushirish: `cd telegram_bot && pip install -r requirements.txt && python bot.py`
