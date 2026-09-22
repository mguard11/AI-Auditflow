import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-bold text-white">AuditFlow AI</h1>
      <p className="text-slate-400">
        Compliance and audit automation platform.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/dashboard"
          className="rounded-lg bg-orange-500 px-6 py-3 font-medium text-black transition-colors hover:bg-orange-400"
        >
          Open Dashboard
        </Link>
        <Link
          href="/audit/new"
          className="rounded-lg border border-orange-500/30 px-6 py-3 font-medium text-orange-400 transition-colors hover:bg-orange-500/10"
        >
          Start Audit Run
        </Link>
      </div>
    </main>
  );
}
