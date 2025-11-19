# backend/app/config.py
from pydantic import BaseSettings, Field
from functools import lru_cache


class Settings(BaseSettings):
    project_name: str = "TaskFlow Pro"
    environment: str = Field("development", env="ENVIRONMENT")
    api_v1_prefix: str = "/api/v1"

    database_url: str = Field(
        "postgresql+psycopg://taskflow:taskflow@postgres:5432/taskflow", env="DATABASE_URL"
    )

    redis_url: str = Field("redis://redis:6379/0", env="REDIS_URL")
    s3_endpoint: str = Field("http://minio:9000", env="S3_ENDPOINT")
    s3_access_key: str = Field("minio", env="S3_ACCESS_KEY")
    s3_secret_key: str = Field("minio123", env="S3_SECRET_KEY")
    s3_bucket: str = Field("taskflow", env="S3_BUCKET")

    jwt_secret_key: str = Field("super-secret", env="JWT_SECRET_KEY")
    jwt_refresh_secret_key: str = Field("super-refresh", env="JWT_REFRESH_SECRET_KEY")
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 60
    jwt_refresh_token_expire_minutes: int = 60 * 24 * 7

    telegram_bot_token: str = Field("", env="TELEGRAM_BOT_TOKEN")
    frontend_url: str = Field("http://localhost:5173", env="FRONTEND_URL")

    google_service_account_json: str = Field("/secrets/google.json", env="GOOGLE_SERVICE_ACCOUNT_JSON")

    class Config:
        env_file = ".env"


@lru_cache
def get_settings() -> Settings:
    return Settings()
