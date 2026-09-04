# Unique Selling Proposition

## Install in your VPC. Keep your data.

AuditFlow AI is not another SaaS that asks you to upload your policies and hand over your audit trails. We install our code into your infrastructure. Your data never leaves your environment.

## What this means in practice

- **Your Postgres, your Redis**: All audit state, embeddings, and evidence metadata live in your PostgreSQL database with pgvector.
- **Your object storage**: PDF reports and JSON exports are written to your S3-compatible bucket or local filesystem.
- **Your integrations**: We connect to your GDrive, Jira, GitHub, and AWS Config using OAuth tokens you control. Evidence never routes through our systems.
- **Your network**: The API, worker, and agent processes run in your VPC, subnet, or on-prem cluster.

## Why data residency is non-negotiable

Compliance data is among the most sensitive information an organization holds. It describes control failures, access patterns, and risk posture. Sending this data to a third-party SaaS creates:

- Additional vendor review burden for your auditors
- Cross-border data transfer risk (GDPR, CCPA, state privacy laws)
- Dependency on another company's uptime and security posture
- Questions about who has administrative access to your evidence

AuditFlow AI eliminates these concerns by design.

## AI agents, not consultants

The platform replaces manual evidence collection with a deterministic, repeatable agent pipeline:

- Policy-to-control mapping that scales across frameworks
- Automated evidence gathering from your existing toolchain
- Continuous gap scoring with prioritized remediation paths
- Audit-ready packages generated on demand

The result is faster audit cycles, fewer surprises at review time, and a living compliance posture instead of a quarterly snapshot.

## SOC 2 Type II beachhead

SOC 2 Type II is our proven deployment target. The framework mapping, evidence collectors, and report templates are all built and tested against SOC 2 criteria.

ISO 27001, HIPAA, and PCI-DSS support are on the roadmap and will follow the same self-hosted pattern: install in your infra, map your controls, collect your evidence, generate your reports.
