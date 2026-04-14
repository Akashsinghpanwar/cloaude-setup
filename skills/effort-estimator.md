# Effort Estimator — Development Time Estimation Engine

> UNIQUE to Vibe Elite. AI-powered dev time estimation.

## Trigger
User says: "estimate", "how long", "effort", "time estimate", "story points", "how much work"

## What This Does
Estimates development time for features/tasks using a formula that accounts
for complexity, testing, review, and the "unknown unknowns" factor.

## Estimation Framework

### Complexity Multipliers
| Factor | Multiplier | Example |
|--------|-----------|---------|
| New code (greenfield) | 1.0x | New endpoint from scratch |
| Modify existing code | 1.3x | Refactor existing feature |
| Legacy code (no tests) | 2.0x | Change untested old code |
| Third-party integration | 1.5x | API integration, OAuth |
| Database schema change | 1.4x | Migration + code changes |
| UI/UX (pixel perfect) | 1.6x | Design-spec frontend |
| Performance optimization | 1.8x | Profiling + optimization |
| Security-critical | 1.5x | Auth, payments, encryption |

### Base Time Estimation
```
Base Hours = (files_to_create × 1.5h) + (files_to_modify × 1h) + (complex_logic_blocks × 2h)
```

### Full Estimation Formula
```
Total = Base Hours 
      × Complexity Multiplier
      × (1 + Test Factor)    ← TDD: 0.4, Test After: 0.25, No Test: 0
      × (1 + Review Factor)  ← Elite: 0.15, Standard: 0.1
      × Uncertainty Factor   ← Known: 1.0, Some Unknown: 1.3, Many Unknown: 1.8
      + Buffer (20%)
```

### Confidence Levels
| Confidence | When | Buffer |
|-----------|------|--------|
| HIGH (±10%) | Well-understood, done before, clear requirements | 10% |
| MEDIUM (±25%) | Mostly understood, some unknowns | 25% |
| LOW (±50%) | Many unknowns, new technology, vague requirements | 50% |

## Estimation Process

### Step 1: Decompose
Break the feature into atomic tasks:
```
Feature: User authentication
├── Task 1: Login endpoint (2h base)
├── Task 2: JWT token generation (1.5h base)
├── Task 3: Refresh token flow (2h base)
├── Task 4: Password hashing (1h base)
├── Task 5: Login page UI (3h base)
├── Task 6: Session management (2h base)
└── Task 7: Tests for all above (4h base)
```

### Step 2: Apply Multipliers
Each task gets its own multiplier based on complexity.

### Step 3: Sum + Buffer
Add all task estimates + project-level buffer.

## Output Format
```
⏱️ EFFORT ESTIMATE
━━━━━━━━━━━━━━━━━━

Feature: [name]
Confidence: [HIGH/MEDIUM/LOW] (±[X]%)

Task Breakdown:
  1. [task] — [Xh] (complexity: [multiplier])
  2. [task] — [Xh] (complexity: [multiplier])
  ...

Subtotal:       [X]h
Testing:       +[X]h
Review:        +[X]h
Buffer (20%):  +[X]h
━━━━━━━━━━━━━
Total:          [X]h ([Y] developer-days)

Timeline:
  Day 1: [tasks]
  Day 2: [tasks]
  Day 3: Testing + Review

⚠️ Risk Factors:
- [what could increase the estimate]

💡 Speed Tips:
- [how to reduce time — e.g., use existing library]
```

## Story Point Mapping
| Hours | Story Points | T-Shirt |
|-------|-------------|---------|
| 1-4h | 1-2 SP | XS |
| 4-8h | 3 SP | S |
| 8-16h | 5 SP | M |
| 16-32h | 8 SP | L |
| 32-64h | 13 SP | XL |
| 64h+ | 21+ SP | Split it! |
