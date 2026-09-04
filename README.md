# AuditFlow AI 🔍

> Vertical AI agents that automate compliance & audit workflows for mid-market B2B companies.

[![CI](https://github.com/auditflow-ai/auditflow/actions/workflows/ci.yml/badge.svg)](https://github.com/auditflow-ai/auditflow/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Python](https://img.shields.io/badge/Python-3.11+-green)](https://python.org)

---

## What is AuditFlow?

AuditFlow AI eliminates the 200–400 hours companies spend on manual compliance evidence collection per audit cycle. Our agents map your policies to control frameworks (SOC 2, HIPAA, ISO 27001, PCI-DSS), pull evidence from your existing tools, and generate audit-ready packages — continuously.

**Beachhead**: Compliance & Audit automation for US mid-market companies (50–500 employees) in regulated industries.

---

## Product Roadmap

| Phase | Timeline | Focus |
|-------|----------|-------|
| **MVP** | Months 1–6 | Policy mapping, evidence collection, gap reports, audit package export |
| **Platform** | Months 7–18 | Continuous monitoring, vendor risk, multi-framework (HIPAA, PCI-DSS, GDPR) |
| **Expansion** | Year 2+ | HR/Onboarding Agent, Contract Review Agent, Finance Close Agent |

---

## Monorepo Structure

```
auditflow-ai/
├── apps/
│   ├── marketing/       # Next.js 14 marketing site (static export for Cloudflare Pages)
│   ├── web/             # Next.js 14 frontend (React + TypeScript + Tailwind)
│   └── api/             # FastAPI backend (Python 3.11+)
├── packages/
│   ├── audit-engine/     # Core audit logic, framework mappers, evidence extractors
│   ├── llm-client/       # Open-source LLM wrapper (vLLM + Llama 3 8B) with retry, streaming, cost tracking
│   ├── shared-types/     # Shared TypeScript types across apps
│   └── ui-kit/           # Shared React component library
├── infra/
│   ├── docker/           # Docker Compose for local dev
│   ├── terraform/        # AWS infrastructure (ECS, RDS, S3, Secrets)
│   └── k8s/              # Kubernetes manifests (future)
├── docs/                 # Architecture, ADRs, runbooks
├── scripts/              # Dev tooling, seed scripts, migrations
└── .github/
    ├── workflows/        # CI/CD (test, lint, deploy)
    └── ISSUE_TEMPLATE/   # Bug reports, feature requests, compliance gap reports
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **AI Core** | vLLM + Llama 3 8B (self-hosted) · pgvector for RAG |
| **Orchestration** | Custom agent pipeline (ingest → map → collect → gap → report) |
| **Integrations** | Google Drive · Notion · Jira · GitHub · AWS Config · Slack (via MCP) |
| **Backend** | Python 3.11 · FastAPI · PostgreSQL · Celery · Redis |
| **Frontend** | Next.js 14 · TypeScript · Tailwind CSS |
| **Marketing** | Next.js 14 static export · Cloudflare Pages |
| **Security** | SOC 2 Type II · E2E encryption · SSO/SAML · Self-hosted data residency |
| **Infra** | Docker Compose (dev) · Kubernetes + Helm (prod) · AWS / GCP / Azure |

---

## Getting Started

### Prerequisites

- Node.js 20+
- Python 3.11+
- Docker & Docker Compose
- `pnpm` 8+

### Setup

```bash
# Clone
git clone https://github.com/auditflow-ai/auditflow.git
cd auditflow

# Install all dependencies
pnpm install

# Copy env files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# Start local services (Postgres, Redis)
docker compose -f infra/docker/docker-compose.dev.yml up -d

# Run DB migrations
cd apps/api && alembic upgrade head

# Start dev servers (web + api in parallel)
pnpm dev
```

Web runs at `http://localhost:3000` · API at `http://localhost:8000`

### Environment Variables

See [`apps/api/.env.example`](apps/api/.env.example) and [`apps/web/.env.example`](apps/web/.env.example) for required variables.

Key variables:
- `ANTHROPIC_API_KEY` — Claude API key
- `DATABASE_URL` — PostgreSQL connection string
- `PINECONE_API_KEY` — Vector DB for RAG
- `REDIS_URL` — Job queue and caching

---

## Development

```bash
pnpm dev          # Start all apps in dev mode
pnpm test         # Run all tests
pnpm lint         # Lint all packages
pnpm typecheck    # TypeScript check
pnpm build        # Production build
```

### Running Tests

```bash
# All tests
pnpm test

# API tests only
cd apps/api && pytest

# Web tests only
cd apps/web && pnpm test
```

---

## Deployment

### Marketing Site (`apps/marketing`)

The marketing site is built with `output: 'export'` for static hosting.

**Cloudflare Pages (recommended):**
1. Create a new Pages project in the Cloudflare dashboard
2. Connect your GitHub repo `AI-Auditflow`
3. Select branch `main` (or `feat/marketing-site` if PR #1 is not merged)
4. Build configuration:
   - Build command: `pnpm --filter @mangologic/marketing build`
   - Output directory: `apps/marketing/out`
5. Add custom domain `www.mangologic.ai` in Pages settings

**Local static build:**
```bash
cd apps/marketing
pnpm build
pnpm export
# Output in apps/marketing/out/
```

### Product Web App (`apps/web`)

Option A: Vercel (recommended for MVP)
- Connect repo, framework preset: Next.js
- Environment: `NEXT_PUBLIC_API_URL` pointing to your API

Option B: Self-hosted
```bash
cd apps/web
pnpm build
pnpm start
# Run behind nginx/Caddy in your VPC
```

### Backend API + Workers

Deploy as a containerized stack in your VPC.

```bash
# Build API image
docker build -f infra/docker/Dockerfile.api -t auditflow/api:latest .

# Deploy with Docker Compose (dev/single-node)
docker compose -f infra/docker/docker-compose.dev.yml up -d

# Or deploy to Kubernetes with Helm (production)
helm install auditflow infra/k8s/helm/auditflow
```

**LLM Infrastructure:**
- Deploy vLLM + Llama 3 8B on 1x A100 40GB (or 2x A100 for tensor parallelism)
- Expose OpenAI-compatible API endpoint for agents
- All LLM calls stay within your VPC

---

## Architecture

See [`docs/architecture.md`](docs/architecture.md) for a full system diagram and design decisions.

Key architectural decisions are tracked as [Architecture Decision Records (ADRs)](docs/adr/).

---

## Contributing

1. Fork the repo and create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes and add tests
3. Run `pnpm lint && pnpm test`
4. Open a PR against `main` — use the PR template

See [CONTRIBUTING.md](CONTRIBUTING.md) for full guidelines.

---

## Security

AuditFlow handles sensitive compliance data. Please review our [Security Policy](SECURITY.md) before reporting vulnerabilities. Do **not** open public issues for security bugs — email `security@auditflow.ai` instead.

---

## License

MIT — see [LICENSE](LICENSE)

---

*AuditFlow AI · Confidential Business Plan · 2026*
