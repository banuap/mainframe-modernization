"use client";

import React from "react";
import { type PipelineStep } from "@/lib/agents";
import { PERSONAS } from "@/lib/personas";

interface PipelineTrackerProps {
  steps: PipelineStep[];
  activePersonaId: string | null;
  onStepClick: (personaId: string) => void;
}

export default function PipelineTracker({ steps, activePersonaId, onStepClick }: PipelineTrackerProps) {
  return (
    <div className="flex items-center gap-1 rounded-xl border border-gray-700/50 bg-gray-800/30 px-4 py-3">
      <span className="mr-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Pipeline</span>
      {steps.map((step, i) => {
        const persona = PERSONAS.find((p) => p.id === step.personaId);
        const isActive = activePersonaId === step.personaId;
        const statusIcon =
          step.status === "complete"
            ? "✅"
            : step.status === "in-progress"
            ? "🔄"
            : "⬜";

        return (
          <React.Fragment key={step.step}>
            <button
              onClick={() => onStepClick(step.personaId)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200
                ${isActive
                  ? `${persona?.bgColor} ${persona?.color} ring-1 ${persona?.borderColor.replace("border", "ring")}`
                  : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                }`}
              title={`${step.name} (${step.artifactCount} artifacts)`}
            >
              <span>{statusIcon}</span>
              <span className="hidden sm:inline">{step.name}</span>
              {step.artifactCount > 0 && (
                <span className="rounded-full bg-gray-700 px-1.5 py-0.5 text-[10px] text-gray-300">
                  {step.artifactCount}
                </span>
              )}
            </button>
            {i < steps.length - 1 && (
              <span className="text-gray-600">→</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
