# Agentic SDLC Studio Constitution

## Core Principles

### I. Product Purpose
We are building the **Chat UI / Studio** — an agentic SDLC platform where personas (BA, Architect, Developer, QA, DevOps) interact through a chat interface to generate software artifacts via AI agents. Bank Sweep is the demo scenario, not the product itself.

### II. Next.js Frontend-First
The product is a Next.js web application. All UI is built with React 19, TypeScript, Tailwind CSS, and shadcn/ui components. Server-side rendering where appropriate. Client components for interactive chat.

### III. Spec-Kit as the Backbone
GitHub Spec-Kit (`specify_cli`) provides the spec-driven development workflow: specify → plan → tasks → implement. The Studio UI exposes spec-kit's agent capabilities through a visual chat interface.

### IV. Agent Architecture
Each persona (BA, Architect, Developer, QA, Reviewer, DevOps) is defined as a spec-kit agent (`.github/agents/*.agent.md`). The Studio routes user prompts to the appropriate agent and renders the generated artifacts in the UI.

### V. Simplicity (NON-NEGOTIABLE)
Start simple, iterate. No backend server initially — use Next.js API routes. No database initially — use local state and file system. No auth initially. Add complexity only when demonstrated necessary.

### VI. Human-in-the-Loop
Every AI-generated artifact is presented for human review before any action is taken. The UI must make the review/approve/reject flow explicit and easy.

## Technology Stack

- **Framework**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui, Lucide icons
- **State**: React state (local), expandable to Zustand if needed
- **Spec Engine**: GitHub Spec-Kit (specify_cli)
- **AI Agents**: Defined via `.github/agents/*.agent.md` files
- **Charts**: Recharts (for pipeline visualization)

## Architecture

```
src/
├── app/
│   ├── page.tsx              # Landing / dashboard
│   ├── studio/
│   │   └── page.tsx          # Chat UI / Studio main page
│   └── api/                  # API routes (future)
├── components/
│   ├── studio/               # Studio-specific components
│   │   ├── ChatPanel.tsx     # Chat conversation UI
│   │   ├── PersonaSelector.tsx # Persona role picker
│   │   ├── ArtifactViewer.tsx  # Rendered artifact display
│   │   ├── PipelineTracker.tsx # SDLC step progress
│   │   └── PromptInput.tsx     # Prompt composition
│   └── ui/                   # shadcn/ui primitives
└── lib/
    ├── agents.ts             # Agent definitions & routing
    ├── personas.ts           # Persona configs
    └── utils.ts              # Utilities
```

## Governance

This constitution governs the Chat UI / Studio product development. The Bank Sweep demo content (persona agents, example prompts) lives alongside but is not the product. Amendments require documented rationale.

**Version**: 2.0.0 | **Ratified**: 2026-03-27 | **Last Amended**: 2026-03-27
