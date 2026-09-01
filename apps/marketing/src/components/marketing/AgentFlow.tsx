const agents = [
  {
    name: "Ingest",
    description: "Parse PDF, DOCX, Markdown, and Google Docs into chunks. Generate embeddings stored in your vector database.",
  },
  {
    name: "Map",
    description: "Match policy chunks to compliance framework controls using structured LLM reasoning (e.g., SOC 2 CC6.1).",
  },
  {
    name: "Collect",
    description: "Query your connected integrations — GDrive, Jira, GitHub, AWS Config — for artifacts that satisfy each control.",
  },
  {
    name: "Analyze",
    description: "Score coverage per control, flag missing evidence, and generate prioritized remediation suggestions.",
  },
  {
    name: "Report",
    description: "Produce audit-ready PDF packages and structured JSON exports, stored in your S3-compatible bucket.",
  },
];

export function AgentFlow() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {agents.map((agent, idx) => (
          <div key={agent.name} className="relative flex flex-col items-center">
            <div className="w-full rounded-xl border border-slate-800 bg-primary-surface p-4 text-center">
              <div className="mx-auto mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                {idx + 1}
              </div>
              <h3 className="text-sm font-semibold text-white">{agent.name}</h3>
              <p className="mt-2 text-xs text-slate-500">{agent.description}</p>
            </div>
            {idx < agents.length - 1 && (
              <div className="my-2 hidden text-slate-600 lg:block absolute -right-2 top-1/2 -translate-y-1/2">
                →
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
