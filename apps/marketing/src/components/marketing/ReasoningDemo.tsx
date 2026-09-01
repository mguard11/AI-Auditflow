"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  reasoningSteps,
  demoStateOrder,
  type DemoState,
  type ReasoningStep,
} from "@/lib/demo-data";

function getStepIndex(state: DemoState): number {
  return demoStateOrder.indexOf(state);
}

function getActiveSteps(state: DemoState): DemoState[] {
  const idx = getStepIndex(state);
  return demoStateOrder.slice(0, idx + 1) as DemoState[];
}

export function ReasoningDemo() {
  const [state, setState] = useState<DemoState>("idle");
  const [activeSteps, setActiveSteps] = useState<DemoState[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const advance = useCallback(() => {
    setState((prev) => {
      const idx = getStepIndex(prev);
      if (idx >= demoStateOrder.length - 1) return "complete";
      return demoStateOrder[idx + 1];
    });
  }, []);

  useEffect(() => {
    setActiveSteps(getActiveSteps(state));

    clearTimer();

    if (state !== "idle" && state !== "complete") {
      const step = reasoningSteps.find((s) => s.id === state);
      if (step) {
        timerRef.current = setTimeout(() => {
          advance();
        }, step.duration);
      }
    }

    return clearTimer;
  }, [state, advance, clearTimer]);

  const handleStart = () => {
    setState("control");
  };

  const handleReset = () => {
    clearTimer();
    setState("idle");
    setActiveSteps([]);
  };

  const handleStepClick = (stepId: DemoState) => {
    if (state === "idle" || state === "complete") return;
    clearTimer();
    setState(stepId);
  };

  const isRunning = state !== "idle" && state !== "complete";

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <button
          onClick={handleStart}
          disabled={isRunning}
          className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isRunning ? "Running..." : "Run Audit"}
        </button>
        {(isRunning || state === "complete") && (
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-lg border border-slate-700 px-6 py-3 text-sm text-slate-400 transition-colors hover:border-slate-600 hover:text-white"
          >
            Reset
          </button>
        )}
      </div>

      {/* Vertical stepper - works on mobile and desktop */}
      <div className="space-y-4">
        {reasoningSteps.map((step, idx) => (
          <StepCard
            key={step.id}
            step={step}
            index={idx}
            isActive={activeSteps.includes(step.id)}
            isCurrent={state === step.id}
            onClick={() => handleStepClick(step.id)}
            isClickable={state !== "idle" && state !== "complete"}
            isLast={idx === reasoningSteps.length - 1}
          />
        ))}
      </div>

      {state === "complete" && (
        <div className="mt-8 rounded-xl border border-success/30 bg-success/5 p-6 text-center animate-fade-in">
          <p className="text-lg font-medium text-success">Audit complete</p>
          <p className="mt-2 text-sm text-slate-400">
            Evidence package written to your object storage. Ready for auditor review.
          </p>
        </div>
      )}
    </div>
  );
}

interface StepCardProps {
  step: ReasoningStep;
  index: number;
  isActive: boolean;
  isCurrent: boolean;
  onClick: () => void;
  isClickable: boolean;
  isLast: boolean;
}

function StepCard({
  step,
  index,
  isActive,
  isCurrent,
  onClick,
  isClickable,
  isLast,
}: StepCardProps) {
  return (
    <div className="relative flex gap-4">
      {/* Connector line */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-all duration-500 ${
            isCurrent
              ? "border-brand bg-brand text-black scale-110"
              : isActive
              ? "border-brand/50 bg-brand/10 text-brand-light"
              : "border-slate-800 bg-primary-surface text-slate-600"
          }`}
        >
          {index + 1}
        </div>
        {!isLast && (
          <div
            className={`mt-2 w-0.5 flex-1 transition-all duration-500 ${
              isActive && !isCurrent ? "bg-brand/40" : "bg-slate-800"
            }`}
          />
        )}
      </div>

      {/* Content */}
      <button
        onClick={onClick}
        disabled={!isClickable || !isActive}
        className={`flex-1 rounded-xl border p-5 text-left transition-all duration-500 ${
          isCurrent
            ? "border-brand/50 bg-primary-surface shadow-lg shadow-brand/5"
            : isActive
            ? "border-slate-800 bg-primary-surface/50"
            : "border-slate-800/50 bg-transparent opacity-50"
        } ${isClickable && isActive ? "cursor-pointer hover:border-slate-700" : "cursor-default"}`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`text-xs font-bold tracking-wider ${
              isCurrent ? "text-brand" : isActive ? "text-brand-light" : "text-slate-600"
            }`}
          >
            {step.label}
          </span>
          {isCurrent && (
            <span className="h-2 w-2 animate-pulse-subtle rounded-full bg-brand" />
          )}
        </div>
        <h3 className="mt-2 text-base font-semibold text-white">{step.title}</h3>
        <p className="mt-1 text-sm text-slate-400">{step.description}</p>

        {step.artifacts && isActive && (
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {step.artifacts.map((artifact) => (
              <div
                key={artifact.title}
                className="flex items-center gap-2 rounded-lg border border-slate-800 bg-primary/50 px-3 py-2 text-xs"
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${
                    artifact.status === "found" ? "bg-success" : "bg-error"
                  }`}
                />
                <span className="text-slate-400">{artifact.source}:</span>
                <span className="text-slate-300">{artifact.title}</span>
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}
