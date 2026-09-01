import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="text-lg font-semibold text-white">
              MangoLogic<span className="text-brand">.ai</span>
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              Self-hosted AI audit engine.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium text-slate-300">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/product" className="text-sm text-slate-500 hover:text-white">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-sm text-slate-500 hover:text-white">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/frameworks" className="text-sm text-slate-500 hover:text-white">
                  Frameworks
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium text-slate-300">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/resources" className="text-sm text-slate-500 hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/resources#roadmap" className="text-sm text-slate-500 hover:text-white">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-medium text-slate-300">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/demo" className="text-sm text-slate-500 hover:text-white">
                  Book a Demo
                </Link>
              </li>
              <li>
                <a
                  href="mailto:hello@mangologic.ai"
                  className="text-sm text-slate-500 hover:text-white"
                >
                  hello@mangologic.ai
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
          &copy; {new Date().getFullYear()} MangoLogic. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
