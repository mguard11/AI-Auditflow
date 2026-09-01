import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand/5 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl text-balance">
            The AI audit engine your team won&apos;t hate using.
          </h1>
          <p className="mt-4 text-lg text-slate-400 md:text-xl">
            No friction. Just smart workflows.
          </p>
          <p className="mt-6 text-base text-slate-500">
            MangoLogic works quietly across your existing systems to find evidence, detect gaps
            and tell your team what needs attention—before the auditor does.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#demo">
              <Button>See MangoLogic in action</Button>
            </a>
            <a href="/demo">
              <Button variant="secondary">Book a demo</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
