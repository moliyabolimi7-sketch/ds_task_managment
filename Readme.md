# TaskFlow Pro — Rollarga asoslangan vazifa boshqaruvi

TaskFlow Pro menejerlar, direktorlar va hodimlar o'rtasidagi jarayonlarni yagona platformada uyg'unlashtiradi. Loyiha FastAPI backend, HTML + Vite frontend, Aiogram 3 Telegram boti va Docker Compose asosidagi infrani o'z ichiga oladi.

## 🏗 Arxitektura qisqacha
- **Backend (FastAPI)** — Auth, RBAC, vazifalar, chat, fayl yuklash, hisobotlar va Google Sheets eksporti.
- **Frontend (Vanilla HTML + Vite bundler)** — har bir sahifa sof HTML maketlarida yozilgan, premium dizaynli dashboardlar, chat va formalar bilan.
- **Telegram bot (Aiogram 3)** — telefon orqali autentifikatsiya, inline approve/reject, live notifikatsiyalar.
- **Infra** — PostgreSQL, Redis, MinIO, Nginx reverse proxy, Docker Compose orkestratsiyasi.

Batafsil dizayn `docs/ARCHITECTURE.md` faylida.

## 🚀 Ishga tushirish
1. `.env` faylini yarating va quyidagilarni to'ldiring (Render yoki boshqa hostda tayyor Redis/Postgres bo'lsa, o'sha ulanishni kiriting):
   ```env
   DATABASE_URL=postgresql+psycopg://taskflow:taskflow@postgres:5432/taskflow
   REDIS_URL=redis://redis:6379/0
   JWT_SECRET_KEY=super-secret
   JWT_REFRESH_SECRET_KEY=super-refresh
   TELEGRAM_BOT_TOKEN=123456:ABC
   GOOGLE_SERVICE_ACCOUNT_JSON=/secrets/google.json
   ```

   Masalan, Render'dagi public Redis endpointni ishlatishda `REDIS_URL` quyidagicha ko'rinishga ega bo'ladi (parolni o'zingizniki bilan almashtiring):
   ```env
   REDIS_URL=redis://default:<parol>@redis-16642.c14.us-east-1-3.ec2.cloud.redislabs.com:16642/0
   ```
2. Docker Compose bilan barcha servislarni ko'taring:
   ```bash
   docker compose up --build
   ```
3. FastAPI hujjatlari `http://localhost:8000/docs` da, HTML frontend esa `http://localhost:5173/login.html` dan boshlanadi.

## 🎬 Tezkor preview (dev)
Minimal ishchi preview uchun lokal rejimda quyidagi amallarni bajaring:

1. **Infra**: Postgres, Redis va MinIO ni compose orqali ishga tushuring:
   ```bash
   docker compose up -d postgres redis minio
   ```
   (Agar hosted Postgres/Redis ishlatsangiz, `.env` faylida `DATABASE_URL` va `REDIS_URL` ni mos ravishda kiriting.)
2. **Backend (dev)**: yangi terminalda backend papkasidan uvicornni ishga tushuring:
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 --app-dir .
   ```
3. **Frontend (dev)**: boshqa terminalda frontendni dev server orqali ko‘tarib, backendga ulaning:
   ```bash
   cd frontend
   npm install
   VITE_API_URL=http://localhost:8000/api/v1 npm run dev -- --host
   ```
   Frontend ko‘rinishi `http://localhost:5173/login.html` da ochiladi; boshqa sahifalar (`/dashboard.html`, `/tasks.html`, ...).
4. **Telegram bot (ixtiyoriy preview)**: agar botni sinab ko‘rmoqchi bo‘lsangiz:
   ```bash
   cd telegram_bot
   pip install -r requirements.txt
   BACKEND_URL=http://localhost:8000/api/v1 TELEGRAM_BOT_TOKEN=<token> python bot.py
   ```
5. **Ma’lumotlar**: Alembic migratsiyalarni ishga tushirish uchun backendda:
   ```bash
   alembic upgrade head
   ```
   Demo ma’lumotlari kerak bo‘lsa, `app/services/reports/dashboard.py` va `app/routers/*` ichidagi seed funksiyalaridan foydalaning yoki qo‘lda foydalanuvchilarni yarating.

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
