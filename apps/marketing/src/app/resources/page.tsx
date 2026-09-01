import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Documentation, roadmap, and compliance insights.",
};

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Resources
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              Documentation, roadmap, and compliance insights from the MangoLogic team.
            </p>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              Documentation
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <DocCard
                title="Getting Started"
                description="Deploy MangoLogic in your environment. Docker Compose for evaluation, Kubernetes for production."
              />
              <DocCard
                title="Architecture"
                description="Self-hosted reference topology. API, Worker, Postgres + pgvector, Redis."
              />
              <DocCard
                title="Integrations"
                description="Connect GDrive, Jira, GitHub, AWS Config via OAuth. Evidence never routes through external systems."
              />
              <DocCard
                title="API Reference"
                description="Programmatic access to audit runs, evidence packages, and framework mappings."
              />
            </div>
          </div>
        </Section>

        <Section id="roadmap" className="border-t border-slate-800/50">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              Roadmap
            </h2>
            <div className="space-y-6">
              <RoadmapSection
                status="Now"
                description="Proving the core compliance evidence workflow"
                items={[
                  "Policy document upload (PDF, DOCX, Markdown, Google Docs)",
                  "Automatic mapping to SOC 2 Type II control framework",
                  "Evidence request automation (Google Drive, Notion, Jira, GitHub)",
                  "Gap report generation with remediation suggestions",
                  "Audit-ready package export (PDF + structured JSON)",
                ]}
              />
              <RoadmapSection
                status="Next"
                description="Expanding framework support and continuous monitoring"
                items={[
                  "ISO 27001 framework support",
                  "Jira + GitHub connectors",
                  "PDF export with auditor-ready formatting",
                  "Basic dashboard (org settings, audit runs, download reports)",
                ]}
              />
              <RoadmapSection
                status="Later"
                description="Platform expansion and adjacent verticals"
                items={[
                  "Continuous compliance monitoring (watch AWS Config, GCP, Azure for drift)",
                  "Vendor risk assessment agent",
                  "HIPAA framework support",
                  "PCI-DSS framework support",
                  "Slack integration for compliance alerts",
                  "SSO / SAML",
                ]}
              />
            </div>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white">
              Stay updated
            </h2>
            <p className="mt-4 text-slate-400">
              Join our newsletter for product updates and compliance insights.
            </p>
            <div className="mt-8">
              <Link href="/demo">
                <Button>Get in Touch</Button>
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function DocCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-primary p-5 transition-colors hover:border-slate-700">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

function RoadmapSection({
  status,
  description,
  items,
}: {
  status: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-primary-surface p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand-light">
          {status}
        </span>
        <span className="text-sm text-slate-400">{description}</span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
