/**
 * Core type definitions for the AuditFlow audit engine.
 * Shared between the TypeScript packages and exported for API consumption.
 */

// ── Framework types ──────────────────────────────────────────────────────────

export type Severity = "critical" | "high" | "medium" | "low";

export interface Control {
  id: string;
  category: string;
  title: string;
  description: string;
  evidenceExamples: string[];
  severity: Severity;
}

export interface FrameworkCategory {
  id: string;
  name: string;
  description: string;
}

export interface ComplianceFramework {
  id: string;
  name: string;
  version: string;
  description: string;
  categories: FrameworkCategory[];
  controls: Control[];
}

// ── Evidence types ───────────────────────────────────────────────────────────

export type EvidenceSource =
  | "google_drive"
  | "notion"
  | "jira"
  | "github"
  | "aws_config"
  | "slack"
  | "manual_upload";

export interface EvidenceItem {
  id: string;
  controlId: string;
  framework: string;
  source: EvidenceSource;
  title: string;
  url: string;
  collectedAt: string;
  verified: boolean;
  notes?: string;
}

// ── Audit run types ──────────────────────────────────────────────────────────

export type AuditRunStatus =
  | "queued"
  | "ingesting"
  | "mapping"
  | "collecting_evidence"
  | "analyzing"
  | "generating_report"
  | "completed"
  | "failed";

export interface AuditRun {
  id: string;
  organizationId: string;
  frameworkIds: string[];
  status: AuditRunStatus;
  progress: number; // 0–100
  createdAt: string;
  completedAt?: string;
  reportUrl?: string;
  errorMessage?: string;
}

// ── Gap report types ─────────────────────────────────────────────────────────

export interface RemediationSuggestion {
  step: number;
  action: string;
  effort: "low" | "medium" | "high";
  timeline: string;
}

export interface GapItem {
  controlId: string;
  framework: string;
  controlTitle: string;
  severity: Severity;
  remediationSuggestions: RemediationSuggestion[];
}

export interface GapReport {
  auditRunId: string;
  generatedAt: string;
  coverageByFramework: Record<string, number>; // framework_id → % covered
  gaps: GapItem[];
  totalControls: number;
  coveredControls: number;
}
