export type DemoState =
  | "idle"
  | "control"
  | "observe"
  | "reason"
  | "detect"
  | "action"
  | "prove"
  | "complete";

export interface ReasoningStep {
  id: DemoState;
  label: string;
  title: string;
  description: string;
  artifacts?: Array<{ source: string; title: string; status: "found" | "missing" }>;
  duration: number;
}

export const reasoningSteps: ReasoningStep[] = [
  {
    id: "control",
    label: "CONTROL",
    title: "CC6.1 — Logical Access Controls",
    description:
      "The entity implements logical access security software, infrastructure, and architectures over protected information assets.",
    duration: 1200,
  },
  {
    id: "observe",
    label: "OBSERVE",
    title: "AWS IAM · Okta · GitHub · Jira",
    description: "Connected to four integrations. Pulling access data from each source.",
    artifacts: [
      { source: "AWS IAM", title: "Privileged role assignments", status: "found" },
      { source: "Okta", title: "Active directory groups", status: "found" },
      { source: "GitHub", title: "Organization members & teams", status: "found" },
      { source: "Jira", title: "Access request tickets", status: "found" },
    ],
    duration: 1500,
  },
  {
    id: "reason",
    label: "REASON",
    title: "17 privileged users · 14 approved access requests",
    description:
      "Cross-referencing identity sources against approved access requests. Three accounts have no matching approval ticket.",
    duration: 1400,
  },
  {
    id: "detect",
    label: "DETECT",
    title: "3 unmatched privileged accounts",
    description: "Privileged access detected without corresponding approval artifacts.",
    artifacts: [
      { source: "AWS IAM", title: "admin@ — no approval ticket", status: "missing" },
      { source: "Okta", title: "devops-lead@ — no approval ticket", status: "missing" },
      { source: "GitHub", title: "infra-bot@ — no approval ticket", status: "missing" },
    ],
    duration: 1500,
  },
  {
    id: "action",
    label: "ACTION",
    title: "Review or revoke access",
    description:
      "Recommended action: Initiate access review for unmatched accounts. Escalate to resource owner within 5 business days.",
    duration: 1200,
  },
  {
    id: "prove",
    label: "PROVE",
    title: "Evidence package generated",
    description:
      "PDF report and structured JSON export written to your object storage. Auditor-ready.",
    duration: 1000,
  },
];

export const demoStateOrder: DemoState[] = [
  "control",
  "observe",
  "reason",
  "detect",
  "action",
  "prove",
  "complete",
];
