# Deployment

AuditFlow AI deploys as a containerized stack into your existing infrastructure. The reference topology runs on Docker Compose or Kubernetes with Helm, connects to your data sources, and writes all output to your object storage.

## Reference topology

The canonical deployment consists of four services:

| Service | Purpose | Image |
|---------|---------|-------|
| API | FastAPI application serving the web UI and agent orchestration | `auditflow/api` |
| Worker | Celery worker running background audit jobs | `auditflow/api` |
| Postgres + pgvector | Persistent storage for audit state, embeddings, and metadata | `pgvector/pgvector:pg16` |
| Redis | Job queue and caching layer | `redis:7-alpine` |

All services run in your VPC. The API exposes an optional internal load balancer or ingress for your team's browser access. The worker processes long-running audit jobs asynchronously.

## Docker Compose (development / single-node)

For evaluation or single-node deployments, use the provided Docker Compose file:

```yaml
version: "3.9"

services:
  postgres:
    image: pgvector/pgvector:pg16
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: auditflow
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      retries: 5

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      retries: 5

  api:
    build:
      context: .
      dockerfile: infra/docker/Dockerfile.api
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql+asyncpg://postgres:${POSTGRES_PASSWORD}@postgres:5432/auditflow
      REDIS_URL: redis://redis:6379/0
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  worker:
    build:
      context: .
      dockerfile: infra/docker/Dockerfile.api
    command: celery -A src.lib.celery worker --loglevel=info
    environment:
      DATABASE_URL: postgresql+asyncpg://postgres:${POSTGRES_PASSWORD}@postgres:5432/auditflow
      REDIS_URL: redis://redis:6379/0
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
  redis_data:
```

## Kubernetes / Helm

For production, we provide Helm charts that package the same services with:

- PersistentVolumeClaims for Postgres and Redis data
- Ingress or LoadBalancer service for the API
- HorizontalPodAutoscaler for the worker based on Celery queue depth
- Secrets management via your existing Vault, AWS Secrets Manager, or sealed-secrets

## Data sources

AuditFlow AI connects to the tools your team already uses. Integrations are configured via OAuth or service account credentials stored in your secret manager:

| Source | What we collect |
|--------|-----------------|
| Google Drive | Policy documents and evidence files |
| Jira | Access reviews, change tickets, incident records |
| GitHub | Pull request audit trails, branch protections, CODEOWNERS |
| AWS Config | Configuration snapshots, compliance rules, resource inventories |

No integration sends your data to external services. API calls originate from your VPC using your credentials.

## Output location

All generated artifacts are written to your object storage:

- **Audit packages**: PDF bundles with mapped controls, evidence citations, and gap summaries
- **Structured exports**: JSON files with machine-readable coverage scores and remediation plans
- **Agent logs**: LLM call logs for cost tracking and reproducibility

Supported backends: AWS S3, MinIO, Google Cloud Storage, or local filesystem.

## Network requirements

Outbound internet access is required only for:

- LLM API calls (Anthropic Claude) for policy mapping and reasoning
- OAuth token exchange during initial integration setup

All other traffic stays within your network boundary.

## Getting started

1. Clone the repository into your VPC or CI/CD pipeline.
2. Set environment variables for database, Redis, and LLM credentials.
3. Run database migrations.
4. Start the API and worker services.
5. Configure integrations via the web UI or API.
6. Upload policy documents and launch your first audit run.

Detailed runbooks for Kubernetes, Helm, and Docker Compose are available in `infra/`.
