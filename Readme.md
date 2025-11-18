📌 TaskFlow Pro — Rollarga asoslangan vazifa boshqaruvi, Telegram Login, Real-Time Chat va Hisobotlar tizimi

TaskFlow Pro — kompaniyadagi ish jarayonlarini avtomatlashtirish uchun yaratilgan zamonaviy veb-platforma.
Tizim menejer, direktor, admin va hodimlar o‘rtasidagi vazifa boshqaruvini soddalashtiradi, Telegram orqali autentifikatsiya qiladi, real-time chat taqdim etadi, va aniq statistika hamda hisobotlarni yaratadi.

🚀 Asosiy imkoniyatlar
🔐 Telegram login

Foydalanuvchi ro‘yxatini admin yaratadi

Login/parolni foydalanuvchi Telegram orqali oladi

Aiogram 3 orqali xavfsiz autentifikatsiya

JWT Access/Refresh tokenlar

🧩 Rollar va huquqlar (RBAC)
Rol	Huquqlar
👑 Ta’sischi	Barcha statistika, barcha bo‘limlar, vazifa yuklash
🎯 Direktor	Vazifa yuklash, tasdiqlash, muddatni uzaytirish
🛠 Admin	User CRUD, bo‘limlar, rang sxema, statistika
🧑‍💼 Menejer	O‘z bo‘limiga vazifa yuklash, boshqa bo‘lim uchun direktor tasdig‘i
👤 Hodim	Faqat o‘z vazifalari, chat, fayl yuklash, Redo jarayoni
📝 Vazifa jarayoni

Statuslar:

New

In progress

Pending review

Completed

Rejected / Redo

Vazifa atributlari:

Kimga / kimdan

Boshlanish va tugash vaqti

Muddat (timer)

Ball

Kategoriya

Tavsif

Chat bilan biriktirilgan

💬 Real-Time Chat

WebSocket asosida real-time yozishmalar

Rasm, fayl, audio, video

Har bir fayl uchun Telegram notifikatsiya

MinIO (S3 compatible) storage

🔔 Telegram bildirishnomalari

Yangi vazifa yuklandi

Direktor tasdiqlashi kerak

Vazifa topshirildi

Fayl yuklandi

Qayta topshirish (Redo)

Kunlik statistik xabarnoma

📊 Hisobotlar

Hodimlar uchun:

Kunlik / Haftalik / Oylik statistikalar

Ball tarixi grafikda

Menejer uchun:

Bo‘lim kesimida vazifa statistikasi

Hodimlar reytingi

Direktor / Ta’sischi:

Eng yaxshi hodimlar

Eng faol bo‘limlar

Filiallar statistikasi

📤 Google Sheets Export

Ishlar tarixi

Ballar

Vazifalar tarixi

Chat fayllari

Sheets API orqali avtomatik eksport

🧱 Texnologiyalar
Backend:

FastAPI

PostgreSQL

SQLAlchemy 2.0

Alembic

Redis (queue/cache)

MinIO (S3 storage)

JWT Authentication

WebSocket (real-time chat)

Frontend:

React + Vite

TailwindCSS

Zustand/Redux (state management)

Mobile-first UI

Telegram Bot:

Aiogram 3

Approve/Reject inline tizimi

Login parol generatsiyasi

Fayl preview

Kunlik xabarnoma scheduler

Infra:

Docker Compose

Nginx Reverse Proxy

S3 Storage (MinIO)

Multi-container microservices
