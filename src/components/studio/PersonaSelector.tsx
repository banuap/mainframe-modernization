"use client";

import React from "react";
import { type Persona, PERSONAS } from "@/lib/personas";

interface PersonaSelectorProps {
  activePersonaId: string | null;
  onSelect: (persona: Persona) => void;
}

export default function PersonaSelector({ activePersonaId, onSelect }: PersonaSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3 p-4 lg:grid-cols-6">
      {PERSONAS.map((persona) => {
        const isActive = activePersonaId === persona.id;
        return (
          <button
            key={persona.id}
            onClick={() => onSelect(persona)}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200
              ${isActive
                ? `${persona.borderColor} ${persona.bgColor} ring-2 ring-offset-2 ring-offset-[#0f0f1a] ${persona.borderColor.replace("border", "ring")}`
                : "border-gray-700/50 bg-gray-800/40 hover:border-gray-600 hover:bg-gray-800/70"
              }`}
          >
            <span className="text-2xl">{persona.icon}</span>
            <span className={`text-sm font-semibold ${isActive ? persona.color : "text-gray-300"}`}>
              {persona.name}
            </span>
            <span className="text-[11px] text-gray-500">{persona.role}</span>
          </button>
        );
      })}
    </div>
  );
}
