"use client";

import React, { useState, useRef, useEffect } from "react";
import { type Persona } from "@/lib/personas";

interface PromptInputProps {
  persona: Persona | null;
  onSend: (prompt: string) => void;
  isProcessing: boolean;
}

export default function PromptInput({ persona, onSend, isProcessing }: PromptInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + "px";
    }
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || !persona || isProcessing) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-700/50 bg-gray-800/50 p-4">
      {/* Example prompts */}
      {persona && input === "" && (
        <div className="mb-3 flex flex-wrap gap-2">
          {persona.examplePrompts.slice(0, 3).map((prompt, i) => (
            <button
              key={i}
              onClick={() => setInput(prompt)}
              className="rounded-lg border border-gray-700/50 bg-gray-800/50 px-3 py-1.5 text-[11px] text-gray-400 transition-all hover:border-gray-600 hover:bg-gray-700/50 hover:text-gray-300"
            >
              💬 {prompt.length > 60 ? prompt.slice(0, 60) + "…" : prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              persona
                ? `Type a prompt for ${persona.name}… (Enter to send, Shift+Enter for newline)`
                : "Select a persona to start…"
            }
            disabled={!persona || isProcessing}
            rows={1}
            className="w-full resize-none rounded-xl border border-gray-700 bg-gray-900/60 px-4 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-gray-500 focus:ring-1 focus:ring-gray-500 disabled:opacity-40"
          />
        </div>
        <button
          onClick={handleSend}
          disabled={!input.trim() || !persona || isProcessing}
          className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-200
            ${!input.trim() || !persona || isProcessing
              ? "bg-gray-700/30 text-gray-600"
              : `${persona.bgColor} ${persona.color} hover:opacity-80`
            }`}
        >
          {isProcessing ? (
            <span className="animate-spin text-lg">⏳</span>
          ) : (
            <span className="text-lg">↑</span>
          )}
        </button>
      </div>
    </div>
  );
}
