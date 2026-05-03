# Contributing to AuditFlow AI

Thank you for your interest in contributing! This document outlines our development process.

## Code of Conduct

Be kind, be constructive. We're building something important — compliance tooling that real companies depend on.

## Development Setup

See the [README](README.md#getting-started) for full setup instructions.

## Branch Strategy

```
main          ← production-ready, protected
staging       ← pre-release QA
feat/*        ← new features
fix/*         ← bug fixes
chore/*       ← tooling, deps, refactors
docs/*        ← documentation only
```

All PRs target `main` via squash merge.

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(audit-engine): add HIPAA framework mapper
fix(api): handle empty evidence list in gap reporter
chore(deps): upgrade anthropic SDK to 0.25.0
docs(adr): add ADR-003 for vector DB selection
```

Types: `feat` · `fix` · `chore` · `docs` · `test` · `refactor` · `perf` · `ci`

## Pull Request Process

1. Branch from `main`, name it `feat/your-feature` or `fix/your-bug`
2. Write tests for new functionality
3. Run `pnpm lint && pnpm test && pnpm typecheck` — all must pass
4. Fill out the PR template completely
5. Request review from at least one team member
6. Squash and merge after approval

## Testing Standards

- **API**: pytest, aim for >80% coverage on agent logic
- **Web**: Vitest + React Testing Library for components
- **E2E**: Playwright for critical user flows (evidence upload → gap report)
- **Agent evals**: See `packages/audit-engine/src/evals/` for LLM output quality tests

## Agent Development Guidelines

When building or modifying AI agents:

1. **Always show sources** — every claim the agent makes must be traceable to a document chunk
2. **Never certify, only prepare** — agents prepare audit packages; humans review them
3. **Human-in-the-loop gates** for any destructive or high-stakes action
4. **Log every LLM call** with input/output/cost/latency to `agent_runs` table
5. **Eval before merge** — run the eval suite in `audit-engine/src/evals/` and include scores in your PR

## Adding a New Compliance Framework

1. Create `packages/audit-engine/src/frameworks/<framework-name>.ts`
2. Implement the `ComplianceFramework` interface
3. Add control mappings in `frameworks/controls/`
4. Write at least 10 eval fixtures in `evals/fixtures/<framework-name>/`
5. Document the framework in `docs/frameworks/<framework-name>.md`

## Reporting Bugs

Use the [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md) template. Include:
- Environment (OS, Node/Python version, Docker version)
- Steps to reproduce
- Expected vs actual behavior
- Relevant logs

## Security Vulnerabilities

Do **not** open public GitHub issues for security bugs. Email `security@auditflow.ai` — see [SECURITY.md](SECURITY.md).
