import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Hero } from "@/components/marketing/Hero";
import { ReasoningDemo } from "@/components/marketing/ReasoningDemo";
import { AgentFlow } from "@/components/marketing/AgentFlow";
import { IntegrationGrid } from "@/components/marketing/IntegrationGrid";
import { FrameworkCards } from "@/components/marketing/FrameworkCards";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <Section id="demo" className="border-t border-slate-800/50">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Watch MangoLogic reason
            </h2>
            <p className="mt-3 text-slate-400">
              Click &quot;Run Audit&quot; to see the CONTROL&rarr;OBSERVE&rarr;REASON&rarr;DETECT&rarr;ACTION&rarr;PROVE chain in action.
            </p>
          </div>
          <ReasoningDemo />
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              200–400 hours of manual work, automated
            </h2>
            <p className="mt-4 text-slate-400">
              Compliance teams spend weeks collecting evidence, mapping policies to controls, and
              chasing down artifacts across fragmented tools. MangoLogic replaces the manual loop
              with a deterministic, repeatable agent pipeline.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-primary p-6">
                <p className="text-3xl font-bold text-brand">80%+</p>
                <p className="mt-2 text-sm text-slate-400">Evidence collection automation</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-primary p-6">
                <p className="text-3xl font-bold text-brand">60+</p>
                <p className="mt-2 text-sm text-slate-400">SOC 2 controls covered</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-primary p-6">
                <p className="text-3xl font-bold text-brand">On-demand</p>
                <p className="mt-2 text-sm text-slate-400">Audit-ready packages</p>
              </div>
            </div>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              5-Agent Workflow
            </h2>
            <p className="mt-3 text-slate-400">
              Each agent handles one step of the pipeline. Your data never leaves your infrastructure.
            </p>
          </div>
          <AgentFlow />
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Connects to your existing tools
            </h2>
            <p className="mt-3 text-slate-400">
              No migration required. MangoLogic reads from the tools your team already uses.
            </p>
          </div>
          <IntegrationGrid />
        </Section>

        <Section className="border-t border-slate-800/50">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-slate-800 bg-primary-surface p-8 text-center md:p-12">
              <h2 className="text-2xl font-bold text-white md:text-3xl">
                Runs in your environment. Your data stays yours.
              </h2>
              <p className="mt-4 text-slate-400">
                MangoLogic deploys as a containerized stack into your VPC. Your Postgres, your
                Redis, your object storage. Only outbound: LLM API calls and OAuth token exchange.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/security">
                  <Button variant="secondary">View Architecture</Button>
                </Link>
                <Link href="/demo">
                  <Button>Book a Demo</Button>
                </Link>
              </div>
            </div>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Framework support
            </h2>
            <p className="mt-3 text-slate-400">
              SOC 2 Type II is proven. ISO 27001, HIPAA, and PCI-DSS are on the roadmap.
            </p>
          </div>
          <FrameworkCards />
        </Section>

        <Section className="border-t border-slate-800/50">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Built for mid-market teams
            </h2>
            <p className="mt-4 text-slate-400">
              VP Engineering, Head of Security, and Director of Compliance at 50–500 employee
              companies in regulated industries.
            </p>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Join 10 design partners
            </h2>
            <p className="mt-4 text-slate-400">
              $0–$5K/mo. Help shape the product. Get dedicated support and influence the roadmap.
            </p>
            <div className="mt-8">
              <Link href="/demo">
                <Button>Apply for Design Partner Program</Button>
              </Link>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
