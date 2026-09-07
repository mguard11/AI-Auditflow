"use client";

interface AuditRunProgressProps {
  auditRunId: string | null;
  onComplete?: (id: string) => void;
}

export function AuditRunProgress({ auditRunId, onComplete }: AuditRunProgressProps) {
  return null;
}
