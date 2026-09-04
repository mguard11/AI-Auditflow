# How It Works

AuditFlow AI runs a five-step agent pipeline inside your infrastructure. Each step is orchestrated by a purpose-built agent that reads your data locally and writes results to your storage.

```
Policy Docs + Integrations
           │
           ▼
   ┌─────────────┐
   │  Ingestion  │  Parse PDF, DOCX, Markdown, and Google Docs into chunks.
   │   Agent     │  Generate embeddings and store them in your vector database.
   └──────┬──────┘
           │
           ▼
   ┌─────────────┐
   │  Mapping    │  Match policy chunks to compliance framework controls using
   │   Agent     │  structured LLM reasoning (e.g., SOC 2 Type II CC6.1).
   └──────┬──────┘
           │
           ▼
   ┌─────────────┐
   │  Evidence   │  Query your connected integrations — GDrive, Jira, GitHub,
   │ Collector   │  AWS Config — for artifacts that satisfy each control.
   └──────┬──────┘
           │
           ▼
   ┌─────────────┐
   │ Gap Analyzer│  Score coverage per control, flag missing evidence, and
   │   Agent     │  generate prioritized remediation suggestions.
   └──────┬──────┘
           │
           ▼
   ┌─────────────┐
   │  Reporter   │  Produce audit-ready PDF packages and structured JSON
   │   Agent     │  exports, stored in your S3-compatible bucket.
   └─────────────┘
```

## Step 1: Ingest

The ingestion agent accepts policy documents in PDF, DOCX, Markdown, and Google Docs formats. It chunks text, generates embeddings, and persists them in your pgvector database. No document leaves your network.

## Step 2: Map

The mapping agent uses structured LLM reasoning to align policy content with controls from your selected framework. At launch, SOC 2 Type II is fully supported. ISO 27001, HIPAA, and PCI-DSS are on the roadmap.

## Step 3: Collect Evidence

The evidence collector queries your existing data sources through authenticated integrations. It pulls access reviews from AWS Config, pull requests from GitHub, tickets from Jira, and files from Google Drive. Evidence metadata is stored locally; only API calls leave your environment.

## Step 4: Analyze Gaps

The gap analyzer computes a coverage score per control, identifies controls with insufficient evidence, and generates actionable remediation suggestions with priority and effort estimates.

## Step 5: Report

The reporter assembles a human-reviewed PDF package and a structured JSON export. Both are written to your object storage (S3, MinIO, or equivalent). Your auditors access files directly from your infrastructure.
