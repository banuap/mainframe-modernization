import Link from "next/link";
import { PERSONAS } from "@/lib/personas";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f0f1a] text-gray-200">
      <main className="flex max-w-2xl flex-col items-center gap-8 text-center">
        <span className="text-6xl">🏗️</span>
        <h1 className="text-4xl font-bold text-white">
          Agentic SDLC Studio
        </h1>
        <p className="text-lg text-gray-400">
          Prompt-driven development across every SDLC persona.
          <br />
          Chat with AI agents to generate specs, architecture, code, tests, reviews & deployments.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {PERSONAS.map((p) => (
            <span
              key={p.id}
              className="rounded-full border px-3 py-1 text-xs"
              style={{ borderColor: p.color, color: p.color }}
            >
              {p.icon} {p.name}
            </span>
          ))}
        </div>

        <Link
          href="/studio"
          className="mt-4 rounded-lg bg-indigo-600 px-8 py-3 text-lg font-semibold text-white transition-colors hover:bg-indigo-500"
        >
          Launch Studio →
        </Link>

        <p className="text-xs text-gray-600">
          Powered by GitHub Spec-Kit &bull; Bank Sweep Demo Scenario
        </p>
      </main>
    </div>
  );
}
