const integrations = [
  { name: "Google Drive", description: "Policy documents & evidence files" },
  { name: "Jira", description: "Access reviews & change tickets" },
  { name: "GitHub", description: "PR audit trails & branch protections" },
  { name: "AWS Config", description: "Configuration snapshots & compliance rules" },
  { name: "Notion", description: "Wiki pages & process documentation" },
  { name: "Okta", identity: "Identity provider & access management" },
];

export function IntegrationGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {integrations.map((integration) => (
        <div
          key={integration.name}
          className="rounded-xl border border-slate-800 bg-primary-surface p-5 transition-colors hover:border-slate-700"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-sm font-bold text-brand">
            {integration.name.charAt(0)}
          </div>
          <h3 className="text-sm font-semibold text-white">{integration.name}</h3>
          <p className="mt-1 text-xs text-slate-500">{integration.description}</p>
        </div>
      ))}
    </div>
  );
}
