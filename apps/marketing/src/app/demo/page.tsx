import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { DemoForm } from "@/components/marketing/DemoForm";
import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Join our design partner program.",
};

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main>
        <Section>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              Book a Demo
            </h1>
            <p className="mt-4 text-lg text-slate-400">
              Join 10 design partners. $0–$5K/mo. Help shape the product with dedicated support
              and direct influence on the roadmap.
            </p>
          </div>
        </Section>

        <Section className="border-t border-slate-800/50 bg-primary-surface/30">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-xl font-bold text-white">Design Partner Program</h2>
                <p className="mt-4 text-sm text-slate-400">
                  Our design partners work directly with the founding team to shape MangoLogic
                  around real compliance workflows. You get:
                </p>
                <ul className="mt-6 space-y-4">
                  <Benefit text="Dedicated onboarding and support" />
                  <Benefit text="Direct input on roadmap priorities" />
                  <Benefit text="Preferred pricing locked for 12 months" />
                  <Benefit text="Early access to new frameworks and features" />
                  <Benefit text="Monthly product feedback sessions" />
                </ul>
              </div>
              <div className="rounded-xl border border-slate-800 bg-primary p-6">
                <h3 className="mb-6 text-lg font-semibold text-white">Request a Demo</h3>
                <DemoForm />
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function Benefit({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/10">
        <svg
          className="h-3 w-3 text-success"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
      <span className="text-sm text-slate-300">{text}</span>
    </li>
  );
}
