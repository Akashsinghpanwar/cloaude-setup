# Architect Review — System Design & Architecture Analysis

## Trigger
User says: "architecture review", "system design", "design review", "scale this", "architect"

## Review Dimensions

### 1. Structural Integrity
- Separation of concerns (Presentation / Business / Data)
- No circular dependencies
- Clean module boundaries
- Proper abstraction layers
- Single responsibility at module level

### 2. Scalability Assessment
- Horizontal scaling readiness
- Database bottleneck analysis
- Caching strategy evaluation
- Message queue needs
- Connection pooling
- Stateless service design

### 3. Reliability & Resilience
- Circuit breaker patterns for external calls
- Retry logic with exponential backoff
- Graceful degradation on dependency failure
- Health check endpoints
- Dead letter queues for failed messages

### 4. Data Architecture
- Database schema normalization/denormalization trade-offs
- Index coverage for query patterns
- Migration strategy
- Backup and recovery plan
- Data consistency model (strong vs eventual)

### 5. API Design
- RESTful conventions (or GraphQL schema design)
- Versioning strategy
- Pagination approach (cursor vs offset)
- Error response format consistency
- Rate limiting and throttling

### 6. Security Architecture
- Authentication flow (JWT, session, OAuth)
- Authorization model (RBAC, ABAC)
- Secret management
- Network security (VPC, firewall rules)
- Data encryption (transit + rest)

### 7. Observability
- Structured logging
- Metrics collection (latency, throughput, errors)
- Distributed tracing
- Alerting thresholds
- Dashboard design

## Output Format
```
📐 ARCHITECTURE REVIEW
━━━━━━━━━━━━━━━━━━━━━━━

Overall Grade: [A/B/C/D/F]

✅ Strengths:
- [what's done well]

⚠️ Concerns:
- [potential issues]

🔴 Critical Issues:
- [must fix before scaling]

📋 Recommendations:
1. [prioritized action items]

🗺️ Suggested Architecture:
[ASCII diagram or description of improved architecture]
```

## Design Patterns to Recommend
- **Repository Pattern** — for data access abstraction
- **Strategy Pattern** — for interchangeable algorithms
- **Observer/Event** — for decoupled communication
- **Factory Pattern** — for complex object creation
- **Middleware/Pipeline** — for cross-cutting concerns
- **CQRS** — for read/write optimization (if needed)
- **Saga** — for distributed transactions
