/**
 * SOC 2 Trust Services Criteria (TSC) Framework Definition
 *
 * Source: AICPA Trust Services Criteria (2017, updated 2022)
 * Reference: https://www.aicpa.org/resources/download/2017-trust-services-criteria
 */

import type { ComplianceFramework, Control } from "../types";

export const SOC2_FRAMEWORK: ComplianceFramework = {
  id: "soc2",
  name: "SOC 2 Type II",
  version: "2017 (updated 2022)",
  description:
    "AICPA Trust Services Criteria covering Security, Availability, Processing Integrity, Confidentiality, and Privacy.",
  categories: [
    {
      id: "CC",
      name: "Common Criteria",
      description: "Security criteria applicable to all engagements",
    },
    { id: "A", name: "Availability", description: "System availability commitments" },
    { id: "PI", name: "Processing Integrity", description: "Complete, accurate, timely processing" },
    { id: "C", name: "Confidentiality", description: "Confidential information protection" },
    { id: "P", name: "Privacy", description: "Personal information lifecycle" },
  ],
  controls: SOC2_CONTROLS,
};

const SOC2_CONTROLS: Control[] = [
  // ── CC1 — Control Environment ─────────────────────────────────────────────
  {
    id: "CC1.1",
    category: "CC",
    title: "COSO Principle 1: Demonstrates Commitment to Integrity and Ethical Values",
    description:
      "The entity demonstrates a commitment to integrity and ethical values.",
    evidenceExamples: ["Code of conduct", "Ethics policy", "Employee acknowledgment records"],
    severity: "high",
  },
  {
    id: "CC1.2",
    category: "CC",
    title: "COSO Principle 2: Exercises Oversight Responsibility",
    description:
      "The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control.",
    evidenceExamples: ["Board meeting minutes", "Audit committee charter"],
    severity: "high",
  },

  // ── CC2 — Communication & Information ────────────────────────────────────
  {
    id: "CC2.1",
    category: "CC",
    title: "COSO Principle 13: Uses Relevant Information",
    description:
      "The entity obtains or generates and uses relevant, quality information to support the functioning of internal control.",
    evidenceExamples: ["Risk register", "Incident log", "Security metrics dashboard"],
    severity: "medium",
  },

  // ── CC6 — Logical & Physical Access ──────────────────────────────────────
  {
    id: "CC6.1",
    category: "CC",
    title: "Logical Access Security Software",
    description:
      "The entity implements logical access security software, infrastructure, and architectures over protected information assets.",
    evidenceExamples: [
      "Access control policy",
      "IAM configuration screenshots",
      "MFA enforcement evidence",
    ],
    severity: "critical",
  },
  {
    id: "CC6.2",
    category: "CC",
    title: "Prior to Issuing System Credentials",
    description:
      "Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users.",
    evidenceExamples: ["User provisioning SOP", "Access request tickets", "Onboarding checklist"],
    severity: "critical",
  },
  {
    id: "CC6.3",
    category: "CC",
    title: "Role-Based Access and Least Privilege",
    description:
      "The entity authorizes, modifies, or removes access to data, software, functions, and other protected information assets based on roles.",
    evidenceExamples: ["RBAC matrix", "Access review records", "Quarterly access certification"],
    severity: "critical",
  },

  // ── CC7 — System Operations ───────────────────────────────────────────────
  {
    id: "CC7.1",
    category: "CC",
    title: "Vulnerability Management",
    description:
      "To meet its objectives, the entity uses detection and monitoring procedures to identify changes to configurations.",
    evidenceExamples: ["Vulnerability scan reports", "Patch management policy", "SIEM alerts"],
    severity: "high",
  },
  {
    id: "CC7.2",
    category: "CC",
    title: "Monitors System Components for Anomalous Behavior",
    description:
      "The entity monitors system components and the operation of those components for anomalies.",
    evidenceExamples: ["SIEM configuration", "Alert runbooks", "Incident response logs"],
    severity: "high",
  },

  // ── CC9 — Risk Mitigation ─────────────────────────────────────────────────
  {
    id: "CC9.1",
    category: "CC",
    title: "Risk Mitigation Activities",
    description:
      "The entity identifies, selects, and develops risk mitigation activities for risks arising from potential business disruptions.",
    evidenceExamples: ["Business continuity plan", "DR test results", "RTO/RPO documentation"],
    severity: "high",
  },
];
