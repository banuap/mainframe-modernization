export type ArtifactStatus = "draft" | "approved" | "rejected";

export interface Artifact {
  id: string;
  type: string;
  title: string;
  content: string;
  status: ArtifactStatus;
  personaId: string;
  sdlcStep: number;
  createdAt: Date;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  personaId: string;
  artifact?: Artifact;
  timestamp: Date;
}

export interface Conversation {
  personaId: string;
  messages: Message[];
}

export interface PipelineStep {
  step: number;
  name: string;
  personaId: string;
  status: "pending" | "in-progress" | "complete";
  artifactCount: number;
}

export const PIPELINE_STEPS: PipelineStep[] = [
  { step: 1, name: "Requirements", personaId: "ba", status: "pending", artifactCount: 0 },
  { step: 2, name: "Design", personaId: "architect", status: "pending", artifactCount: 0 },
  { step: 3, name: "Implementation", personaId: "developer", status: "pending", artifactCount: 0 },
  { step: 4, name: "Testing", personaId: "qa", status: "pending", artifactCount: 0 },
  { step: 5, name: "Code Review", personaId: "reviewer", status: "pending", artifactCount: 0 },
  { step: 6, name: "Deployment", personaId: "devops", status: "pending", artifactCount: 0 },
];

// Simulated agent responses for demo. In production, these would call an LLM API.
export function generateDemoResponse(personaId: string, prompt: string): { content: string; artifact?: Omit<Artifact, "id" | "createdAt"> } {
  const promptLower = prompt.toLowerCase();

  if (personaId === "ba") {
    return {
      content: "I've generated the epics and user stories based on your requirements. Here's the structured output:",
      artifact: {
        type: "requirements",
        title: "Bank Sweep Epics & Stories",
        content: `## Epic: Sweep Schedule Management
**Jira Key**: BSWP-101
**Priority**: P1
**Bounded Context**: Scheduling

### Description
Enable bank treasurers to create, configure, and manage automated sweep schedules that move idle funds between accounts based on configurable rules and thresholds.

### User Stories

#### Story: Create Daily Sweep Schedule
**Jira Key**: BSWP-102 | **Priority**: P1 | **Points**: 5

**As a** bank treasurer,
**I want** to create a daily sweep schedule for a specific account,
**So that** idle funds are automatically invested at end of day.

**Acceptance Criteria**:
1. **Given** an active checking account, **When** I create a daily sweep schedule with a target balance of $10,000, **Then** a schedule is created with status "ACTIVE" and next execution at 18:00 UTC
2. **Given** a sweep schedule exists, **When** the scheduled time arrives, **Then** any balance above the target is transferred to the linked investment account
3. **Given** a sweep is in progress, **When** insufficient funds exist for the full sweep amount, **Then** a partial sweep is executed and an alert is generated

#### Story: Configure Sweep Thresholds
**Jira Key**: BSWP-103 | **Priority**: P1 | **Points**: 3

**As a** account manager,
**I want** to set minimum and target balance thresholds per account type,
**So that** sweeps maintain appropriate balances for each account category.

**Acceptance Criteria**:
1. **Given** a checking account, **When** I set a minimum balance of $5,000 and target of $10,000, **Then** sweeps only execute when balance exceeds $10,000, never reducing below $5,000
2. **Given** thresholds are configured, **When** the balance is between minimum and target, **Then** no sweep is triggered

#### Story: Sweep Failure Handling
**Jira Key**: BSWP-104 | **Priority**: P2 | **Points**: 5

**As a** operations team member,
**I want** sweep failures to be automatically logged and escalated,
**So that** failed transfers are resolved without manual monitoring.

**Acceptance Criteria**:
1. **Given** a sweep execution fails mid-transfer, **When** the failure is detected, **Then** a rollback is initiated and the sweep status is set to "FAILED"
2. **Given** a sweep has failed, **When** the failure is logged, **Then** an alert notification is sent to the operations team`,
        status: "draft",
        personaId: "ba",
        sdlcStep: 1,
      },
    };
  }

  if (personaId === "architect") {
    return {
      content: "I've designed the microservice architecture with DDD bounded contexts. Here are the key artifacts:",
      artifact: {
        type: "design",
        title: "Bank Sweep Microservice Architecture",
        content: `## Bounded Contexts

### 1. Scheduling Context
- **Aggregate**: SweepSchedule (root)
  - Entities: ScheduleRule, ExecutionWindow
  - Value Objects: CronExpression, TargetBalance, TimeZone
  - Domain Events: ScheduleCreated, ScheduleActivated, SweepTriggered

### 2. Accounts Context
- **Aggregate**: BankAccount (root)
  - Entities: AccountLink, BalanceSnapshot
  - Value Objects: AccountNumber, Balance, Currency, ThresholdConfig
  - Domain Events: AccountLinked, ThresholdBreached, BalanceUpdated

### 3. Transfers Context
- **Aggregate**: SweepTransfer (root)
  - Entities: TransferLeg, Settlement
  - Value Objects: Amount, TransferStatus, SettlementReference
  - Domain Events: TransferInitiated, TransferCompleted, TransferFailed, TransferReversed

## Context Map
\`\`\`
Scheduling ──[Customer-Supplier]──► Transfers
     │                                   │
     └──[Anti-Corruption Layer]──► Accounts ◄─┘
\`\`\`

## API Overview (OpenAPI 3.0)

### Scheduling Service (port 8081)
\`\`\`yaml
paths:
  /api/v1/schedules:
    get:    # List all schedules (paginated)
    post:   # Create new schedule
  /api/v1/schedules/{id}:
    get:    # Get schedule by ID
    put:    # Update schedule
    delete: # Deactivate schedule
  /api/v1/schedules/{id}/execute:
    post:   # Trigger manual sweep execution
\`\`\`

### Accounts Service (port 8082)
\`\`\`yaml
paths:
  /api/v1/accounts:
    get:    # List accounts
  /api/v1/accounts/{id}/thresholds:
    get:    # Get threshold config
    put:    # Update thresholds
  /api/v1/accounts/{id}/links:
    post:   # Link accounts
    delete: # Unlink accounts
\`\`\`

### Transfers Service (port 8083)
\`\`\`yaml
paths:
  /api/v1/transfers:
    get:    # List transfers (paginated)
    post:   # Initiate transfer
  /api/v1/transfers/{id}:
    get:    # Get transfer status
  /api/v1/transfers/{id}/reverse:
    post:   # Reverse a transfer
\`\`\``,
        status: "draft",
        personaId: "architect",
        sdlcStep: 2,
      },
    };
  }

  if (personaId === "developer") {
    return {
      content: "I've generated the Spring Boot service implementation following Clean Architecture. Here's the code:",
      artifact: {
        type: "code",
        title: "SweepScheduler Service Implementation",
        content: `\`\`\`java
// domain/model/SweepSchedule.java
@Entity
@Table(name = "sweep_schedules")
@Getter @Builder @NoArgsConstructor @AllArgsConstructor
public class SweepSchedule {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String accountId;

    @Embedded
    private TargetBalance targetBalance;

    @Enumerated(EnumType.STRING)
    private ScheduleFrequency frequency;

    @Enumerated(EnumType.STRING)
    private ScheduleStatus status;

    @Column(nullable = false)
    private LocalTime executionTime;

    private ZoneId timeZone;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    public void activate() {
        if (this.status == ScheduleStatus.DRAFT) {
            this.status = ScheduleStatus.ACTIVE;
            registerEvent(new ScheduleActivated(this.id));
        }
    }

    public boolean shouldExecuteNow(Instant now) {
        ZonedDateTime zoned = now.atZone(timeZone);
        return status == ScheduleStatus.ACTIVE
            && zoned.toLocalTime().isAfter(executionTime);
    }
}

// application/usecase/CreateScheduleUseCase.java
@Service
@RequiredArgsConstructor
@Transactional
public class CreateScheduleUseCase {
    private final ScheduleRepository scheduleRepo;
    private final AccountPort accountPort;
    private final ApplicationEventPublisher events;

    public SweepSchedule execute(CreateScheduleCommand cmd) {
        accountPort.validateAccountExists(cmd.accountId());

        SweepSchedule schedule = SweepSchedule.builder()
            .accountId(cmd.accountId())
            .targetBalance(new TargetBalance(cmd.targetAmount(), cmd.currency()))
            .frequency(cmd.frequency())
            .executionTime(cmd.executionTime())
            .timeZone(cmd.timeZone())
            .status(ScheduleStatus.DRAFT)
            .build();

        SweepSchedule saved = scheduleRepo.save(schedule);
        events.publishEvent(new ScheduleCreated(saved.getId()));
        return saved;
    }
}

// infrastructure/adapter/in/web/ScheduleController.java
@RestController
@RequestMapping("/api/v1/schedules")
@RequiredArgsConstructor
public class ScheduleController {
    private final CreateScheduleUseCase createSchedule;
    private final GetScheduleUseCase getSchedule;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ScheduleResponse create(@Valid @RequestBody CreateScheduleRequest req) {
        return ScheduleMapper.toResponse(
            createSchedule.execute(ScheduleMapper.toCommand(req))
        );
    }

    @GetMapping("/{id}")
    public ScheduleResponse getById(@PathVariable UUID id) {
        return ScheduleMapper.toResponse(getSchedule.execute(id));
    }
}
\`\`\``,
        status: "draft",
        personaId: "developer",
        sdlcStep: 3,
      },
    };
  }

  if (personaId === "qa") {
    return {
      content: "I've generated the test suite covering all acceptance criteria. Here are the BDD scenarios and integration tests:",
      artifact: {
        type: "tests",
        title: "Sweep Scheduling Test Suite",
        content: `## Gherkin BDD Scenarios

\`\`\`gherkin
Feature: Sweep Schedule Management
  As a bank treasurer
  I want to manage sweep schedules
  So that idle funds are automatically invested

  Scenario: Create a daily sweep schedule
    Given an active checking account "ACC-001" with balance $50,000
    And no existing sweep schedule for "ACC-001"
    When I create a daily sweep schedule with target balance $10,000
    Then the schedule is created with status "ACTIVE"
    And the next execution time is set to 18:00 UTC tomorrow

  Scenario: Sweep execution with sufficient funds
    Given an active sweep schedule for "ACC-001"
    And current balance is $50,000 with target $10,000
    When the scheduled execution time arrives
    Then $40,000 is transferred to the linked investment account
    And the balance is reduced to $10,000
    And a "SweepExecuted" event is published

  Scenario: Sweep execution with insufficient funds
    Given an active sweep schedule for "ACC-002"
    And current balance is $5,000 with minimum threshold $5,000
    When the scheduled execution time arrives
    Then no transfer is initiated
    And an "InsufficientFunds" alert is generated

  Scenario: Partial sweep when balance is near threshold
    Given an active sweep schedule for "ACC-003"
    And current balance is $12,000 with target $10,000 and minimum $8,000
    When the scheduled execution time arrives
    Then $2,000 is transferred (balance minus target)
    And the remaining balance is $10,000
\`\`\`

## Integration Tests

\`\`\`java
@SpringBootTest
@Testcontainers
class SweepSchedulingIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:15-alpine");

    @Autowired private ScheduleController controller;
    @Autowired private TestRestTemplate rest;

    @Test
    void shouldCreateAndExecuteSweepSchedule() {
        // Create schedule
        var request = new CreateScheduleRequest("ACC-001",
            BigDecimal.valueOf(10000), "USD", "DAILY", "18:00", "UTC");
        var response = rest.postForEntity("/api/v1/schedules", request,
            ScheduleResponse.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CREATED);
        assertThat(response.getBody().status()).isEqualTo("ACTIVE");
    }

    @Test
    void shouldRejectScheduleForInvalidAccount() {
        var request = new CreateScheduleRequest("INVALID-ACC",
            BigDecimal.valueOf(10000), "USD", "DAILY", "18:00", "UTC");
        var response = rest.postForEntity("/api/v1/schedules", request,
            ProblemDetail.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}
\`\`\`

## Coverage Summary
| Story | Scenarios | Covered | Status |
|-------|-----------|---------|--------|
| BSWP-102 | 3 | 3 | ✅ 100% |
| BSWP-103 | 2 | 2 | ✅ 100% |
| BSWP-104 | 2 | 2 | ✅ 100% |`,
        status: "draft",
        personaId: "qa",
        sdlcStep: 4,
      },
    };
  }

  if (personaId === "reviewer") {
    return {
      content: "I've completed the code review. Here's my analysis:",
      artifact: {
        type: "review",
        title: "Code Review Report: Scheduling Service",
        content: `## Code Review Report: bank-sweep-scheduling

### Summary
- **Overall**: ✅ APPROVE (with minor suggestions)
- **Critical Issues**: 0
- **Warnings**: 2
- **Suggestions**: 3

### Warnings (Should Fix)

1. **Missing Optimistic Locking**: \`SweepSchedule\` entity lacks \`@Version\` field. Concurrent updates could cause lost writes.
   - File: \`SweepSchedule.java:L15\`
   - Fix: Add \`@Version private Long version;\`

2. **Transaction Boundary**: \`CreateScheduleUseCase\` publishes event inside transaction. If event publication fails, the schedule write is rolled back.
   - File: \`CreateScheduleUseCase.java:L22\`
   - Fix: Use \`@TransactionalEventListener\` for event publishing

### Spec Compliance
| Endpoint | Spec Match | Issues |
|----------|------------|--------|
| POST /api/v1/schedules | ✅ | None |
| GET /api/v1/schedules/{id} | ✅ | None |
| PUT /api/v1/schedules/{id} | ⚠️ | Not yet implemented |
| DELETE /api/v1/schedules/{id} | ⚠️ | Not yet implemented |

### Suggestions
1. Add \`@Validated\` at class level on \`ScheduleController\`
2. Consider using \`record\` types for DTOs instead of Lombok
3. Add Javadoc to the \`shouldExecuteNow()\` domain method

### Test Coverage
- Unit tests: 8 passing ✅
- Integration tests: 3 passing ✅
- Acceptance criteria coverage: 7/7 (100%)`,
        status: "draft",
        personaId: "reviewer",
        sdlcStep: 5,
      },
    };
  }

  if (personaId === "devops") {
    return {
      content: "I've generated the deployment infrastructure. Here are the CI/CD pipeline, Dockerfile, and K8s manifests:",
      artifact: {
        type: "devops",
        title: "Scheduling Service Deployment Configs",
        content: `## Dockerfile (Multi-stage)

\`\`\`dockerfile
FROM eclipse-temurin:17-jdk-alpine AS builder
WORKDIR /app
COPY gradle/ gradle/
COPY gradlew build.gradle.kts settings.gradle.kts ./
RUN ./gradlew dependencies --no-daemon
COPY src/ src/
RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:17-jre-alpine
RUN addgroup -S app && adduser -S app -G app
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
USER app
EXPOSE 8081
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD wget -qO- http://localhost:8081/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]
\`\`\`

## GitHub Actions CI/CD

\`\`\`yaml
name: Bank Sweep Scheduling CI/CD
on:
  push:
    branches: [main]
    paths: ['services/bank-sweep-scheduling/**']
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with: { java-version: '17', distribution: 'temurin' }
      - run: ./gradlew build test jacocoTestReport
      - run: ./gradlew bootBuildImage

  deploy-staging:
    needs: build-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: kubectl apply -f deploy/k8s/scheduling/
      - run: kubectl rollout status deployment/scheduling
\`\`\`

## Kubernetes Deployment

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: bank-sweep-scheduling
spec:
  replicas: 2
  selector:
    matchLabels:
      app: bank-sweep-scheduling
  template:
    spec:
      containers:
        - name: scheduling
          image: ghcr.io/banksweep/scheduling:latest
          ports:
            - containerPort: 8081
          resources:
            requests: { cpu: 250m, memory: 512Mi }
            limits: { cpu: 1000m, memory: 1Gi }
          readinessProbe:
            httpGet: { path: /actuator/health/readiness, port: 8081 }
          livenessProbe:
            httpGet: { path: /actuator/health/liveness, port: 8081 }
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: bank-sweep-scheduling-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: bank-sweep-scheduling
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource: { name: cpu, target: { type: Utilization, averageUtilization: 70 } }
\`\`\``,
        status: "draft",
        personaId: "devops",
        sdlcStep: 6,
      },
    };
  }

  // Generic fallback
  return {
    content: `I'll help you with that. As the ${personaId} agent, I'm processing your request: "${prompt}". Let me generate the relevant artifacts...`,
  };
}
