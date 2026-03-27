"use client";

import React, { useRef, useEffect } from "react";
import { type Message } from "@/lib/agents";
import { PERSONAS } from "@/lib/personas";
import ArtifactViewer from "./ArtifactViewer";

interface ChatPanelProps {
  messages: Message[];
  personaId: string | null;
  isProcessing: boolean;
  onApproveArtifact: (id: string) => void;
  onRejectArtifact: (id: string) => void;
}

export default function ChatPanel({
  messages,
  personaId,
  isProcessing,
  onApproveArtifact,
  onRejectArtifact,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const persona = PERSONAS.find((p) => p.id === personaId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing]);

  if (!personaId) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-gray-500">
        <span className="text-5xl">💬</span>
        <p className="text-lg font-medium">Select a persona to start</p>
        <p className="text-sm">Choose a role above to begin generating artifacts</p>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
      {/* Welcome message */}
      {messages.length === 0 && persona && (
        <div className="mb-6 rounded-xl border border-gray-700/50 bg-gray-800/40 p-6 text-center">
          <span className="text-4xl">{persona.icon}</span>
          <h2 className={`mt-3 text-lg font-semibold ${persona.color}`}>
            {persona.name} Agent
          </h2>
          <p className="mt-1 text-sm text-gray-400">{persona.description}</p>
          <p className="mt-3 text-xs text-gray-500">
            Type a prompt below or click an example to get started
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-gray-700/60 text-gray-200"
                  : "border border-gray-700/50 bg-gray-800/40 text-gray-300"
              }`}
            >
              {msg.role === "assistant" && persona && (
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-sm">{persona.icon}</span>
                  <span className={`text-xs font-semibold ${persona.color}`}>{persona.name}</span>
                </div>
              )}
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>

              {/* Artifact attached to message */}
              {msg.artifact && (
                <div className="mt-3">
                  <ArtifactViewer
                    artifact={msg.artifact}
                    onApprove={onApproveArtifact}
                    onReject={onRejectArtifact}
                  />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Processing indicator */}
        {isProcessing && persona && (
          <div className="flex justify-start">
            <div className="rounded-xl border border-gray-700/50 bg-gray-800/40 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">{persona.icon}</span>
                <span className={`text-xs font-semibold ${persona.color}`}>{persona.name}</span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                <span className="animate-pulse">●</span>
                <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>●</span>
                <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>●</span>
                <span className="ml-2 text-xs">Generating artifacts…</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
