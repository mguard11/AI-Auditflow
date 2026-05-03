"use client";

import { useState } from "react";
import { PolicyUploader } from "@/components/audit/PolicyUploader";
import { FrameworkSelector } from "@/components/audit/FrameworkSelector";
import { EvidenceSourceSelector } from "@/components/audit/EvidenceSourceSelector";
import { AuditRunProgress } from "@/components/audit/AuditRunProgress";
import { GapReportViewer } from "@/components/audit/GapReportViewer";

type Step = "upload" | "configure" | "running" | "results";

export default function NewAuditPage() {
  const [step, setStep] = useState<Step>("upload");
  const [auditRunId, setAuditRunId] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">New Audit Run</h1>
        <p className="text-sm text-slate-400 mt-1">
          Upload your policy documents and we'll map them to your compliance frameworks.
        </p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-3">
        {(["upload", "configure", "running", "results"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-medium
              ${step === s ? "bg-cyan-500 text-black" : 
                ["upload", "configure", "running", "results"].indexOf(step) > i 
                  ? "bg-cyan-500/20 text-cyan-500 border border-cyan-500/30"
                  : "bg-white/5 text-slate-500 border border-white/10"}`}>
              {i + 1}
            </div>
            {i < 3 && <div className={`h-px w-8 ${["upload","configure","running","results"].indexOf(step) > i ? "bg-cyan-500/30" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      {step === "upload" && (
        <PolicyUploader onComplete={() => setStep("configure")} />
      )}
      {step === "configure" && (
        <div className="space-y-6">
          <FrameworkSelector />
          <EvidenceSourceSelector />
          <button
            onClick={() => setStep("running")}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors"
          >
            Start Audit Run →
          </button>
        </div>
      )}
      {step === "running" && (
        <AuditRunProgress
          auditRunId={auditRunId}
          onComplete={(id) => { setAuditRunId(id); setStep("results"); }}
        />
      )}
      {step === "results" && auditRunId && (
        <GapReportViewer auditRunId={auditRunId} />
      )}
    </div>
  );
}
