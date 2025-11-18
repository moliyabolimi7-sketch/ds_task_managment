# TaskFlow Pro Architecture

## 1. High level overview
- **Client**: React + Vite SPA with TailwindCSS, WebSocket chat, RBAC-aware navigation.
- **API Gateway**: FastAPI service exposing Auth, User, Task, Chat, File, Report, Export endpoints with JWT security.
- **Services**:
  - Auth / Users / Tasks share a single FastAPI app with SQLAlchemy models.
  - Redis queue handles async notification fan-out to Telegram bot.
  - MinIO (S3 compatible) stores attachments, signed URLs returned to the UI.
  - Telegram bot (Aiogram 3) issues credentials, routes approvals, and delivers notifications.
  - Google Sheets exporter uses service account credentials to produce spreadsheets.
- **Infra**: Docker Compose orchestrates Postgres, Redis, MinIO, backend, frontend, Telegram bot, and Nginx.

## 2. ERD (Mermaid)
```mermaid
erDiagram
    DEPARTMENT ||--o{ USER : contains
    USER ||--o{ TASK : assigned_to
    USER ||--o{ TASK : assigned_by
    TASK ||--o{ TASK_CHAT_MESSAGE : has
    TASK ||--o{ FILE_ASSET : stores

    DEPARTMENT {
      int id PK
      string name
    }
    USER {
      int id PK
      string first_name
      string last_name
      string phone
      string role
      int department_id FK
    }
    TASK {
      int id PK
      string title
      string description
      enum status
      int assigned_to_id FK
      int assigned_by_id FK
      datetime due_time
      int score
    }
    TASK_CHAT_MESSAGE {
      int id PK
      int task_id FK
      int author_id FK
      string message_type
      text content
    }
    FILE_ASSET {
      int id PK
      int task_id FK
      string storage_key
      string file_type
    }
```

## 3. UML Sequence (task lifecycle)
```mermaid
sequenceDiagram
    participant Manager
    participant API
    participant Employee
    participant Telegram
    participant Director

    Manager->>API: POST /tasks
    API->>Telegram: Notify assignee
    Employee->>API: POST /tasks/{id}/status (IN_PROGRESS)
    Employee->>API: Upload files + chat
    Employee->>API: POST status (PENDING_REVIEW)
    API->>Manager: Telegram "📤 Vazifa topshirildi"
    alt Cross department
        API->>Director: Telegram approve inline
        Director->>API: Approve callback
    end
    Manager->>API: POST status (COMPLETED)
    API->>Employee: Telegram "✅ Qabul qilindi"
```

## 4. Deployment Notes
- Expose Nginx on port 80, route `/api` to FastAPI and `/` to Vite build.
- Mount `.env` with secrets (JWT keys, bot token, Google credentials path).
- Use Alembic migrations before starting the API container.
- Cron-like jobs (daily summary) run via background task in Telegram bot or Celery worker hooking Redis queue.
