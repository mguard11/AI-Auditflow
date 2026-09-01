import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { AgentFlow } from "@/components/marketing/AgentFlow";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
  description: "5-agent pipeline for policy mapping, evidence collection, and gap analysis.",
};

export default function ProductPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              The 5-agent pipeline
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              MangoLogic runs a deterministic, repeatable agent pipeline inside your
              infrastructure. Each agent handles one step. Your data never leaves your network.
            </p>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <AgentFlow />
        </Section>

        <Section className="border-t border-slate-800/50">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              How each agent works
            </h2>
            <div className="space-y-6">
              <AgentDetail
                number="01"
                name="Ingestion Agent"
                description="Accepts policy documents in PDF, DOCX, Markdown, and Google Docs formats. Chunks text, generates embeddings, and persists them in your pgvector database. No document leaves your network."
              />
              <AgentDetail
                number="02"
                name="Mapping Agent"
                description="Uses structured LLM reasoning to align policy content with controls from your selected framework. At launch, SOC 2 Type II is fully supported with 256 controls mapped to the Trust Services Criteria."
              />
              <AgentDetail
                number="03"
                name="Evidence Collector"
                description="Queries your existing data sources through authenticated integrations. Pulls access reviews from AWS Config, pull requests from GitHub, tickets from Jira, and files from Google Drive. Evidence metadata is stored locally; only API calls leave your environment."
              />
              <AgentDetail
                number="04"
                name="Gap Analyzer"
                description="Computes a coverage score per control, identifies controls with insufficient evidence, and generates actionable remediation suggestions with priority and effort estimates."
              />
              <AgentDetail
                number="05"
                name="Reporter"
                description="Assembles a human-reviewed PDF package and a structured JSON export. Both are written to your object storage (S3, MinIO, or equivalent). Your auditors access files directly from your infrastructure."
              />
            </div>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              Technical differentiators
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Differentiator
                title="Self-hosted by design"
                description="Deploys into your VPC. Your Postgres, your Redis, your object storage."
              />
              <Differentiator
                title="Deterministic pipeline"
                description="Repeatable audit runs with structured LLM reasoning, not black-box outputs."
              />
              <Differentiator
                title="Framework-agnostic"
                description="SOC 2 Type II today. ISO 27001, HIPAA, PCI-DSS on the roadmap."
              />
              <Differentiator
                title="Audit-ready output"
                description="PDF packages and JSON exports written to your storage, under your retention policies."
              />
            </div>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white">
              See it in action
            </h2>
            <p className="mt-4 text-slate-400">
              Book a demo to see the full pipeline running against your own environment.
            </p>
            <div className="mt-8">
              <Link href="/demo">
                <Button>Book a Demo</Button>
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function AgentDetail({
  number,
  name,
  description,
}: {
  number: string;
  name: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-primary-surface p-6">
      <div className="mb-3 text-xs font-bold text-brand">{number}</div>
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

function Differentiator({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-primary p-5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}
