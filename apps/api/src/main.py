"""AuditFlow AI — FastAPI application entrypoint."""

from contextlib import asynccontextmanager

import structlog
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.lib.config import settings
from src.lib.db import init_db
from src.routes import audit, auth, evidence, frameworks, organizations, reports

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Starting AuditFlow API", env=settings.APP_ENV)
    await init_db()
    yield
    logger.info("Shutting down AuditFlow API")


app = FastAPI(
    title="AuditFlow AI API",
    description="Vertical AI agents for compliance & audit automation",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.APP_ENV != "production" else None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth.router, prefix="/v1/auth", tags=["auth"])
app.include_router(organizations.router, prefix="/v1/orgs", tags=["organizations"])
app.include_router(frameworks.router, prefix="/v1/frameworks", tags=["frameworks"])
app.include_router(audit.router, prefix="/v1/audits", tags=["audits"])
app.include_router(evidence.router, prefix="/v1/evidence", tags=["evidence"])
app.include_router(reports.router, prefix="/v1/reports", tags=["reports"])


@app.get("/health")
async def health():
    return {"status": "ok", "version": "0.1.0"}
