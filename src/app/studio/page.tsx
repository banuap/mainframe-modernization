"use client";

import React, { useState, useCallback } from "react";
import { type Persona, PERSONAS, getPersonaById } from "@/lib/personas";
import {
  type Message,
  type Artifact,
  type PipelineStep,
  PIPELINE_STEPS,
  generateDemoResponse,
} from "@/lib/agents";
import PersonaSelector from "@/components/studio/PersonaSelector";
import PipelineTracker from "@/components/studio/PipelineTracker";
import ChatPanel from "@/components/studio/ChatPanel";
import PromptInput from "@/components/studio/PromptInput";

export default function StudioPage() {
  const [activePersonaId, setActivePersonaId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Record<string, Message[]>>({});
  const [pipeline, setPipeline] = useState<PipelineStep[]>([...PIPELINE_STEPS]);
  const [isProcessing, setIsProcessing] = useState(false);

  const activeMessages = activePersonaId ? conversations[activePersonaId] ?? [] : [];

  const handleSelectPersona = useCallback((persona: Persona) => {
    setActivePersonaId(persona.id);
    // Initialize conversation if it doesn't exist
    setConversations((prev) => ({
      ...prev,
      [persona.id]: prev[persona.id] ?? [],
    }));
    // Mark pipeline step as in-progress
    setPipeline((prev) =>
      prev.map((step) =>
        step.personaId === persona.id && step.status === "pending"
          ? { ...step, status: "in-progress" as const }
          : step
      )
    );
  }, []);

  const handleStepClick = useCallback(
    (personaId: string) => {
      const persona = getPersonaById(personaId);
      if (persona) handleSelectPersona(persona);
    },
    [handleSelectPersona]
  );

  const handleSendPrompt = useCallback(
    (prompt: string) => {
      if (!activePersonaId) return;

      const userMessage: Message = {
        id: `msg-${Date.now()}-user`,
        role: "user",
        content: prompt,
        personaId: activePersonaId,
        timestamp: new Date(),
      };

      setConversations((prev) => ({
        ...prev,
        [activePersonaId]: [...(prev[activePersonaId] ?? []), userMessage],
      }));

      setIsProcessing(true);

      // Simulate agent processing delay
      setTimeout(() => {
        const response = generateDemoResponse(activePersonaId, prompt);

        const artifact: Artifact | undefined = response.artifact
          ? {
              ...response.artifact,
              id: `artifact-${Date.now()}`,
              createdAt: new Date(),
            }
          : undefined;

        const assistantMessage: Message = {
          id: `msg-${Date.now()}-assistant`,
          role: "assistant",
          content: response.content,
          personaId: activePersonaId,
          artifact,
          timestamp: new Date(),
        };

        setConversations((prev) => ({
          ...prev,
          [activePersonaId]: [...(prev[activePersonaId] ?? []), assistantMessage],
        }));

        // Update pipeline artifact count
        if (artifact) {
          setPipeline((prev) =>
            prev.map((step) =>
              step.personaId === activePersonaId
                ? { ...step, artifactCount: step.artifactCount + 1, status: "in-progress" as const }
                : step
            )
          );
        }

        setIsProcessing(false);
      }, 1500);
    },
    [activePersonaId]
  );

  const handleApproveArtifact = useCallback(
    (artifactId: string) => {
      setConversations((prev) => {
        const updated = { ...prev };
        for (const personaId of Object.keys(updated)) {
          updated[personaId] = updated[personaId].map((msg) =>
            msg.artifact?.id === artifactId
              ? { ...msg, artifact: { ...msg.artifact, status: "approved" as const } }
              : msg
          );
        }
        return updated;
      });

      // Mark pipeline step as complete if it has approved artifacts
      if (activePersonaId) {
        setPipeline((prev) =>
          prev.map((step) =>
            step.personaId === activePersonaId ? { ...step, status: "complete" as const } : step
          )
        );
      }
    },
    [activePersonaId]
  );

  const handleRejectArtifact = useCallback((artifactId: string) => {
    setConversations((prev) => {
      const updated = { ...prev };
      for (const personaId of Object.keys(updated)) {
        updated[personaId] = updated[personaId].map((msg) =>
          msg.artifact?.id === artifactId
            ? { ...msg, artifact: { ...msg.artifact, status: "rejected" as const } }
            : msg
        );
      }
      return updated;
    });
  }, []);

  return (
    <div className="flex h-screen flex-col bg-[#0f0f1a] text-gray-200">
      {/* Title Bar */}
      <header className="flex items-center justify-between border-b border-gray-700/50 bg-[#0a0a14] px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏗️</span>
          <div>
            <h1 className="text-lg font-bold text-white">
              Agentic SDLC Studio
            </h1>
            <p className="text-[11px] text-gray-500">
              Prompt-Driven Development • All Personas via Chat UI
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[11px] text-green-400">
            Bank Sweep Demo
          </span>
          <span className="text-xs text-gray-500">Powered by Spec-Kit</span>
        </div>
      </header>

      {/* Persona Selector */}
      <PersonaSelector activePersonaId={activePersonaId} onSelect={handleSelectPersona} />

      {/* Pipeline Tracker */}
      <div className="px-4 pb-2">
        <PipelineTracker steps={pipeline} activePersonaId={activePersonaId} onStepClick={handleStepClick} />
      </div>

      {/* Chat Area */}
      <div className="flex min-h-0 flex-1 flex-col">
        <ChatPanel
          messages={activeMessages}
          personaId={activePersonaId}
          isProcessing={isProcessing}
          onApproveArtifact={handleApproveArtifact}
          onRejectArtifact={handleRejectArtifact}
        />
        <PromptInput
          persona={activePersonaId ? getPersonaById(activePersonaId) ?? null : null}
          onSend={handleSendPrompt}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}
