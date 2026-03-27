export interface Persona {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  agentFile: string;
  sdlcStep: number;
  examplePrompts: string[];
}

export const PERSONAS: Persona[] = [
  {
    id: "ba",
    name: "Business Analyst",
    role: "Requirements",
    description: "Generate epics, user stories, and acceptance criteria",
    icon: "📋",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    agentFile: "banksweep.ba",
    sdlcStep: 1,
    examplePrompts: [
      "Create epics for the Bank Sweep cash management module. Include sweep scheduling, threshold management, and account linking.",
      "Break the sweep scheduling epic into user stories with acceptance criteria. Use Given-When-Then format.",
      "Add stories for error handling: what happens when a sweep fails mid-transfer? What about insufficient funds?",
      "Update the threshold management stories – thresholds should be configurable per account type, not global.",
    ],
  },
  {
    id: "architect",
    name: "Architect",
    role: "Design",
    description: "Generate DDD models, OpenAPI specs, database schemas, and ADRs",
    icon: "🏗️",
    color: "text-teal-400",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    agentFile: "banksweep.architect",
    sdlcStep: 2,
    examplePrompts: [
      "Design a microservice architecture for Bank Sweep with bounded contexts for Scheduling, Accounts, and Transfers.",
      "Generate an OpenAPI 3.0 spec for the Sweep Scheduling service with CRUD operations and webhook notifications.",
      "Create a database schema for the Accounts service using PostgreSQL. Include audit columns and soft deletes.",
      "Write an ADR for choosing event-driven communication between Scheduling and Transfers services.",
    ],
  },
  {
    id: "developer",
    name: "Developer",
    role: "Implementation",
    description: "Generate Spring Boot code, unit tests, and pull requests",
    icon: "💻",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    agentFile: "banksweep.developer",
    sdlcStep: 3,
    examplePrompts: [
      "Implement the SweepScheduler service per the OpenAPI spec. Use Spring Boot 3, Java 17, Clean Architecture.",
      "Generate the JPA entities for the Accounts schema. Add Lombok, auditing, and soft delete support.",
      "Write a REST controller for the Threshold Management API with validation and error handling.",
      "Create unit tests for the SweepExecutionService covering success, insufficient funds, and partial failure.",
    ],
  },
  {
    id: "qa",
    name: "QA Engineer",
    role: "Testing",
    description: "Generate BDD scenarios, integration tests, and test data",
    icon: "🧪",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    agentFile: "banksweep.qa",
    sdlcStep: 4,
    examplePrompts: [
      "Generate Gherkin BDD scenarios for the sweep scheduling stories, covering happy path, edge cases, and failures.",
      "Create integration tests for the end-to-end sweep flow using TestContainers and Spring Boot Test.",
      "Generate test data sets for the Accounts service – include valid, boundary, and invalid data.",
      "Write API contract tests to validate the Scheduling service against its OpenAPI spec.",
    ],
  },
  {
    id: "reviewer",
    name: "Reviewer",
    role: "Code Review",
    description: "Analyze code quality, security, and spec compliance",
    icon: "🔍",
    color: "text-sky-400",
    bgColor: "bg-sky-500/10",
    borderColor: "border-sky-500/30",
    agentFile: "banksweep.reviewer",
    sdlcStep: 5,
    examplePrompts: [
      "Review this PR for code quality, security vulnerabilities, and SOLID violations.",
      "Check if this implementation matches the acceptance criteria in BSWP-142.",
      "Verify the Scheduling controller follows our OpenAPI spec – flag any deviations.",
      "Analyze test coverage for this PR – are all edge cases from the Gherkin scenarios covered?",
    ],
  },
  {
    id: "devops",
    name: "DevOps",
    role: "Deployment",
    description: "Generate Dockerfiles, CI/CD pipelines, K8s manifests, and monitoring",
    icon: "🚀",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    agentFile: "banksweep.devops",
    sdlcStep: 6,
    examplePrompts: [
      "Generate a multi-stage Dockerfile for the Scheduling service. Optimize for minimal image size.",
      "Create a GitHub Actions CI/CD pipeline: build, test, scan, deploy to staging, then prod.",
      "Generate Kubernetes deployment manifests with HPA, resource limits, and readiness probes.",
      "Create a Grafana dashboard JSON for monitoring sweep execution latency and error rates.",
    ],
  },
];

export function getPersonaById(id: string): Persona | undefined {
  return PERSONAS.find((p) => p.id === id);
}
