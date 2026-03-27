"use client";

import React, { useState } from "react";
import { type Artifact, type ArtifactStatus } from "@/lib/agents";
import { PERSONAS } from "@/lib/personas";

interface ArtifactViewerProps {
  artifact: Artifact;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export default function ArtifactViewer({ artifact, onApprove, onReject }: ArtifactViewerProps) {
  const [expanded, setExpanded] = useState(true);
  const persona = PERSONAS.find((p) => p.id === artifact.personaId);

  const statusBadge: Record<ArtifactStatus, { label: string; className: string }> = {
    draft: { label: "Draft", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    approved: { label: "Approved", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    rejected: { label: "Rejected", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  };

  const badge = statusBadge[artifact.status];

  return (
    <div className={`rounded-xl border ${persona?.borderColor ?? "border-gray-700"} ${persona?.bgColor ?? "bg-gray-800/40"} overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-lg">{persona?.icon}</span>
          <div>
            <h3 className={`text-sm font-semibold ${persona?.color ?? "text-gray-200"}`}>
              {artifact.title}
            </h3>
            <span className="text-[11px] text-gray-500">
              {artifact.type} • {persona?.name}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${badge.className}`}>
            {badge.label}
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="rounded p-1 text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
          >
            {expanded ? "▼" : "▶"}
          </button>
        </div>
      </div>

      {/* Content */}
      {expanded && (
        <div className="max-h-[500px] overflow-y-auto px-4 py-3">
          <div className="prose prose-invert prose-sm max-w-none">
            <pre className="whitespace-pre-wrap rounded-lg bg-gray-900/60 p-4 text-xs leading-relaxed text-gray-300">
              {artifact.content}
            </pre>
          </div>
        </div>
      )}

      {/* Actions */}
      {artifact.status === "draft" && (
        <div className="flex items-center gap-2 border-t border-gray-700/50 px-4 py-3">
          <button
            onClick={() => onApprove(artifact.id)}
            className="rounded-lg bg-green-600/20 px-4 py-1.5 text-xs font-medium text-green-400 transition-colors hover:bg-green-600/30"
          >
            ✓ Approve
          </button>
          <button
            onClick={() => onReject(artifact.id)}
            className="rounded-lg bg-red-600/20 px-4 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-600/30"
          >
            ✗ Reject
          </button>
          <span className="ml-auto text-[11px] text-gray-500">
            Human review required before shipping
          </span>
        </div>
      )}
    </div>
  );
}
