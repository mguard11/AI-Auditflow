"use client";

import { useState } from "react";

export function DemoForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-success/30 bg-success/5 p-8 text-center">
        <p className="text-lg font-medium text-success">Thanks for your interest</p>
        <p className="mt-2 text-sm text-slate-400">
          We&apos;ll be in touch within 2 business days to schedule your demo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm text-slate-400">
          Name <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-lg border border-slate-800 bg-primary-surface px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm text-slate-400">
          Work Email <span className="text-error">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="w-full rounded-lg border border-slate-800 bg-primary-surface px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm text-slate-400">
          Company <span className="text-error">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          className="w-full rounded-lg border border-slate-800 bg-primary-surface px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
          placeholder="Company name"
        />
      </div>
      <div>
        <label htmlFor="framework" className="mb-1.5 block text-sm text-slate-400">
          Framework Interest
        </label>
        <select
          id="framework"
          name="framework"
          className="w-full rounded-lg border border-slate-800 bg-primary-surface px-4 py-3 text-sm text-white transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50"
        >
          <option value="">Select a framework</option>
          <option value="soc2">SOC 2 Type II</option>
          <option value="iso27001">ISO 27001</option>
          <option value="hipaa">HIPAA</option>
          <option value="pci-dss">PCI-DSS</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm text-slate-400">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-lg border border-slate-800 bg-primary-surface px-4 py-3 text-sm text-white placeholder-slate-600 transition-colors focus:border-brand/50 focus:outline-none focus:ring-1 focus:ring-brand/50 resize-none"
          placeholder="Tell us about your compliance needs..."
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-brand px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/50"
      >
        Request Demo
      </button>
    </form>
  );
}
