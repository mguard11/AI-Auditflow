import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { FrameworkCards } from "@/components/marketing/FrameworkCards";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frameworks",
  description: "SOC 2 Type II, ISO 27001, HIPAA, PCI-DSS support.",
};

export default function FrameworksPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Compliance frameworks
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              SOC 2 Type II is fully proven with 256 controls mapped. ISO 27001, HIPAA, and
              PCI-DSS follow the same self-hosted pattern.
            </p>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <FrameworkCards />
        </Section>

        <Section className="border-t border-slate-800/50">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              SOC 2 Type II — Proven
            </h2>
            <div className="rounded-xl border border-slate-800 bg-primary-surface p-6">
              <p className="text-sm text-slate-400">
                The AICPA Trust Services Criteria (2017, updated 2022) covers Security,
                Availability, Processing Integrity, Confidentiality, and Privacy. MangoLogic maps
                all 256 controls across these categories.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <ControlCategory
                  name="Common Criteria (CC)"
                  description="Security criteria applicable to all engagements"
                  controls={9}
                />
                <ControlCategory
                  name="Availability (A)"
                  description="System availability commitments"
                  controls={4}
                />
                <ControlCategory
                  name="Processing Integrity (PI)"
                  description="Complete, accurate, timely processing"
                  controls={3}
                />
                <ControlCategory
                  name="Confidentiality (C)"
                  description="Confidential information protection"
                  controls={3}
                />
                <ControlCategory
                  name="Privacy (P)"
                  description="Personal information lifecycle"
                  controls={9}
                />
              </div>
            </div>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-white">
              Roadmap frameworks
            </h2>
            <div className="space-y-4">
              <RoadmapItem
                name="ISO 27001"
                description="International standard for information security management systems (ISMS). 114 controls across 14 domains."
                status="Next"
              />
              <RoadmapItem
                name="HIPAA"
                description="Health Insurance Portability and Accountability Act — protecting sensitive patient health information."
                status="Next"
              />
              <RoadmapItem
                name="PCI-DSS"
                description="Payment Card Industry Data Security Standard — securing credit card transactions across 280+ controls."
                status="Later"
              />
              <RoadmapItem
                name="GDPR / CCPA"
                description="Data protection and privacy regulations. Framework support for continuous compliance monitoring."
                status="Later"
              />
            </div>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white">
              Extensibility model
            </h2>
            <p className="mt-4 text-slate-400">
              Every framework follows the same pattern: install in your infrastructure, map your
              controls, collect your evidence, generate your reports. The agent pipeline is
              framework-agnostic — new frameworks are added by defining control structures and
              evidence collectors.
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

function ControlCategory({
  name,
  description,
  controls,
}: {
  name: string;
  description: string;
  controls: number;
}) {
  return (
    <div className="rounded-lg border border-slate-800 bg-primary p-4">
      <h4 className="text-sm font-semibold text-white">{name}</h4>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
      <p className="mt-2 text-xs text-brand">{controls} controls mapped</p>
    </div>
  );
}

function RoadmapItem({
  name,
  description,
  status,
}: {
  name: string;
  description: string;
  status: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-800 bg-primary p-5">
      <span className="shrink-0 rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand-light">
        {status}
      </span>
      <div>
        <h3 className="text-sm font-semibold text-white">{name}</h3>
        <p className="mt-1 text-sm text-slate-400">{description}</p>
      </div>
    </div>
  );
}
