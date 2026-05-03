# Changelog

All notable changes to AuditFlow AI will be documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning: [Semantic Versioning](https://semver.org/)

---

## [Unreleased]

### Added
- Initial monorepo scaffold (Next.js web + FastAPI API + shared packages)
- SOC 2 Type II framework control definitions
- Audit orchestrator agent pipeline (ingestion → mapping → evidence → gap → report)
- Control mapper agent using Claude Sonnet with structured JSON output
- Gap analyzer agent with remediation suggestions
- JWT authentication middleware
- Docker Compose local dev environment (Postgres/pgvector + Redis)
- CI/CD workflows (GitHub Actions)
- Issue templates (bug report, feature request)
- Architecture documentation and ADRs
- Full product roadmap (MVP → Platform → Expansion)
