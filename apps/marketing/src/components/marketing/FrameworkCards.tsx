const frameworks = [
  {
    name: "SOC 2 Type II",
    status: "Proven",
    statusColor: "bg-success/10 text-success",
    description: "AICPA Trust Services Criteria covering Security, Availability, Processing Integrity, Confidentiality, and Privacy.",
    controls: "256 controls",
  },
  {
    name: "ISO 27001",
    status: "Roadmap",
    statusColor: "bg-brand/10 text-brand-light",
    description: "International standard for information security management systems (ISMS).",
    controls: "114 controls",
  },
  {
    name: "HIPAA",
    status: "Roadmap",
    statusColor: "bg-brand/10 text-brand-light",
    description: "Health Insurance Portability and Accountability Act — protecting sensitive patient health information.",
    controls: "45 controls",
  },
  {
    name: "PCI-DSS",
    status: "Roadmap",
    statusColor: "bg-brand/10 text-brand-light",
    description: "Payment Card Industry Data Security Standard — securing credit card transactions.",
    controls: "280+ controls",
  },
];

export function FrameworkCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {frameworks.map((fw) => (
        <div
          key={fw.name}
          className="rounded-xl border border-slate-800 bg-primary-surface p-6 transition-colors hover:border-slate-700"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">{fw.name}</h3>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${fw.statusColor}`}>
              {fw.status}
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-400">{fw.description}</p>
          <p className="mt-3 text-xs text-slate-600">{fw.controls}</p>
        </div>
      ))}
    </div>
  );
}
