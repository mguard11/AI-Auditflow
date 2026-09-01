import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/product", label: "Product" },
  { href: "/security", label: "Security" },
  { href: "/frameworks", label: "Frameworks" },
  { href: "/resources", label: "Resources" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold text-white">
          MangoLogic<span className="text-brand">.ai</span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/demo">
            <Button variant="secondary" className="px-4 py-2 text-sm">
              Book a Demo
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
