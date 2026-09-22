"use client";

import { useState, type ChangeEvent } from "react";

interface PolicyUploaderProps {
  onComplete?: () => void;
}

export function PolicyUploader({ onComplete }: PolicyUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-white">Upload Policy Documents</h2>
        <p className="mt-1 text-sm text-slate-400">
          Add PDF, DOCX, or Markdown files to map against your compliance framework.
        </p>
      </div>

      <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950 px-6 py-10 text-center transition-colors hover:border-cyan-500/50">
        <span className="mb-2 text-xl font-medium text-cyan-500">Upload</span>
        <span className="text-sm font-medium text-white">
          {files.length > 0 ? `${files.length} file(s) selected` : "Click to browse or drop files"}
        </span>
        <span className="mt-1 text-xs text-slate-500">PDF, DOCX, MD up to 25MB each</span>
        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.md,.markdown"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file) => (
            <li
              key={`${file.name}-${file.size}`}
              className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm"
            >
              <span className="truncate text-slate-300">{file.name}</span>
              <span className="ml-2 shrink-0 text-xs text-slate-500">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        disabled={files.length === 0}
        onClick={onComplete}
        className="mt-6 w-full rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continue
      </button>
    </div>
  );
}
