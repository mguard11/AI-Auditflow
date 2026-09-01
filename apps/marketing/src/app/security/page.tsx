import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description: "Your data stays in your infrastructure. Self-hosted architecture.",
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Your data stays in your infrastructure
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              MangoLogic deploys as a containerized stack into your VPC. Your Postgres, your
              Redis, your object storage. Your compliance data never leaves your environment.
            </p>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              Reference architecture
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <ArchCard
                title="API"
                description="FastAPI application serving the web UI and agent orchestration. Runs in your VPC with optional internal load balancer."
              />
              <ArchCard
                title="Worker"
                description="Background worker running long-running audit jobs asynchronously. Scales based on queue depth."
              />
              <ArchCard
                title="Postgres + pgvector"
                description="Persistent storage for audit state, embeddings, and metadata. Your data, your backup policies."
              />
              <ArchCard
                title="Redis"
                description="Job queue and caching layer. No external dependencies."
              />
            </div>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              Data flow
            </h2>
            <div className="space-y-4">
              <DataFlowItem
                title="Your integrations"
                description="GDrive, Jira, GitHub, AWS Config — connected via OAuth tokens you control. Evidence never routes through our systems."
              />
              <DataFlowItem
                title="Your database"
                description="All audit state, embeddings, and evidence metadata live in your PostgreSQL database with pgvector."
              />
              <DataFlowItem
                title="Your object storage"
                description="PDF reports and JSON exports are written to your S3-compatible bucket or local filesystem."
              />
              <DataFlowItem
                title="Your network"
                description="The API, worker, and agent processes run in your VPC, subnet, or on-prem cluster."
              />
            </div>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              Network requirements
            </h2>
            <div className="rounded-xl border border-slate-800 bg-primary p-6">
              <p className="text-sm text-slate-400">
                Outbound internet access is required only for:
              </p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  <span className="text-sm text-slate-300">
                    LLM API calls (Anthropic Claude) for policy mapping and reasoning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand" />
                  <span className="text-sm text-slate-300">
                    OAuth token exchange during initial integration setup
                  </span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                All other traffic stays within your network boundary.
              </p>
            </div>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              Why data residency matters
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <ReasonCard
                title="Vendor review burden"
                description="Every third-party SaaS adds a vendor to your compliance boundary. MangoLogic eliminates this."
              />
              <ReasonCard
                title="Cross-border risk"
                description="No data transfer risk (GDPR, CCPA, state privacy laws). Your data stays where you put it."
              />
              <ReasonCard
                title="Uptime dependency"
                description="No dependency on another company's infrastructure. You control the deployment."
              />
              <ReasonCard
                title="Admin access"
                description="No external party has administrative access to your evidence. Only your team."
              />
            </div>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white">
              Deploy in your environment
            </h2>
            <p className="mt-4 text-slate-400">
              Docker Compose for evaluation. Kubernetes with Helm for production.
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

function ArchCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-primary p-5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}

function DataFlowItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-primary-surface p-5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-400">{description}</p>
    </div>
  );
}

function ReasonCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-primary p-5">
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-400">{description}</p>
    </div>
  );
}
