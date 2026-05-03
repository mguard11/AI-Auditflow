# AuditFlow AI — Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                          AuditFlow Platform                          │
│                                                                     │
│  ┌──────────────┐    ┌──────────────────────────────────────────┐  │
│  │   Next.js    │    │              FastAPI Backend              │  │
│  │   Web App    │◄──►│                                          │  │
│  │  (Vercel)    │    │  ┌──────────┐  ┌───────────────────────┐│  │
│  └──────────────┘    │  │  Routes  │  │     Agent Orchestrator ││  │
│                       │  └────┬─────┘  └──────────┬────────────┘│  │
│                       │       │                    │              │  │
│                       │  ┌────▼─────┐  ┌──────────▼────────────┐│  │
│                       │  │ Services │  │    Audit Engine (pkg)  ││  │
│                       │  └────┬─────┘  └──────────┬────────────┘│  │
│                       │       │                    │              │  │
│                       │  ┌────▼────────────────────▼────────────┐│  │
│                       │  │           PostgreSQL + pgvector        ││  │
│                       │  └───────────────────────────────────────┘│  │
│                       └──────────────────────────────────────────┘  │
│                                                                     │
│  External Integrations              AI Services                     │
│  ┌───────────────────────┐         ┌─────────────────────────────┐ │
│  │ GDrive · Notion · Jira│         │ Claude API (Anthropic)       │ │
│  │ GitHub · AWS Config   │◄────────│ Pinecone (vector search)     │ │
│  │ Slack (MCP)           │         │ LangGraph (orchestration)    │ │
│  └───────────────────────┘         └─────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

## Core Agent Architecture

### Audit Agent Pipeline

```
Upload Policy Docs
       │
       ▼
┌─────────────┐
│  Ingestion  │  PDF/DOCX/MD → chunks → embeddings → pgvector
│   Agent     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Mapping    │  Chunks → control framework mapper → SOC 2 / ISO / HIPAA
│   Agent     │  (Claude Sonnet with structured output)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Evidence   │  For each control → search GDrive, Jira, GitHub, AWS Config
│ Collector   │  (MCP integrations)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Gap Analyzer│  Coverage score per control → identify missing evidence
│   Agent     │  → generate remediation suggestions
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Reporter   │  Generate audit-ready PDF package + JSON export
│   Agent     │
└─────────────┘
```

## Data Model

### Core Tables

- `organizations` — tenant isolation
- `policies` — uploaded policy documents
- `policy_chunks` — chunked + embedded policy text
- `frameworks` — SOC 2, HIPAA, ISO 27001, PCI-DSS, etc.
- `controls` — individual framework control requirements
- `control_mappings` — policy chunk → control coverage
- `evidence_items` — collected evidence (with source URL/metadata)
- `audit_runs` — complete audit execution records
- `gap_reports` — generated gap analyses
- `agent_runs` — LLM call log (input, output, cost, latency, model)
- `integrations` — connected OAuth sources per org

## Key Design Decisions

See [ADR directory](adr/) for full decision records.

| # | Decision | Rationale |
|---|----------|-----------|
| 001 | Monorepo with Turbo | Shared types between web/api; single CI pipeline |
| 002 | FastAPI over Node.js for API | Python ecosystem for ML/AI; Pydantic for strict typing |
| 003 | pgvector over Pinecone | Fewer moving parts for MVP; migrate if scale demands |
| 004 | LangGraph for orchestration | Stateful multi-step agent graphs; easier debugging |
| 005 | Claude Sonnet for reasoning | Best document reasoning quality at acceptable cost |

## Security Boundaries

- All API endpoints require JWT authentication
- Tenant isolation enforced at DB query level (organization_id on every table)
- Agent outputs are never directly exposed — always reviewed before download
- No customer data used in LLM fine-tuning
- MCP integration credentials stored encrypted in AWS Secrets Manager
