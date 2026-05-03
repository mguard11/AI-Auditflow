# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| `main` (latest) | ✅ |
| All prior releases | ❌ |

## Reporting a Vulnerability

AuditFlow AI processes sensitive compliance data. We take security seriously.

**Do not open public GitHub issues for security vulnerabilities.**

Instead, email: **security@auditflow.ai**

Include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested remediation (optional)

We will acknowledge within 24 hours and aim to patch within 7 days.

## Security Architecture

- All data encrypted in transit (TLS 1.3) and at rest (AES-256)
- SOC 2 Type I certified from launch (via Vanta)
- SSO/SAML support for enterprise customers
- On-prem / VPC deployment available for sensitive workloads
- No LLM training on customer data — prompts are never used to train Claude
- Audit logs for all agent actions stored for 90 days minimum
- Role-based access control (RBAC) on all API endpoints
