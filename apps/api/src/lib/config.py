"""Application configuration via pydantic-settings."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_ENV: str = "development"
    SECRET_KEY: str
    ALLOWED_ORIGINS: list[str] = ["http://localhost:3000"]

    DATABASE_URL: str
    REDIS_URL: str = "redis://localhost:6379/0"

    ANTHROPIC_API_KEY: str = ""
    ANTHROPIC_MODEL: str = "claude-sonnet-4-20250514"

    LLM_PROVIDER: str = "openai_compat"
    LLM_BASE_URL: str = "http://localhost:8000/v1"
    LLM_API_KEY: str = ""
    LLM_MODEL: str = "meta-llama/Llama-3-8B-Instruct"

    VECTOR_BACKEND: str = "pgvector"
    PINECONE_API_KEY: str = ""
    PINECONE_INDEX: str = "auditflow"

    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_REGION: str = "us-east-1"
    S3_BUCKET_REPORTS: str = "auditflow-reports-dev"

    SENTRY_DSN: str = ""
    LOG_LEVEL: str = "INFO"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
