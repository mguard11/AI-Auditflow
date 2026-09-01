import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-primary-surface p-6 ${className}`}
    >
      {children}
    </div>
  );
}
