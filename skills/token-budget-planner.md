# Token Budget Planner — AI Cost Optimization Engine

> UNIQUE to Vibe Elite. No other tool does this.

## Trigger
User says: "token budget", "cost estimate", "how many tokens", "optimize cost", "token plan"

## What This Does
Estimates and optimizes Claude Code token consumption BEFORE you start working.
This saves real money and prevents mid-session context overflow.

## Budget Calculation Formula

### Task Complexity Tiers
| Tier | Tokens Estimate | Session Turns | Examples |
|------|----------------|---------------|----------|
| Micro | 5K-15K | 2-3 turns | Fix typo, add log, rename variable |
| Small | 15K-50K | 5-8 turns | New endpoint, component, util function |
| Medium | 50K-150K | 10-20 turns | New feature with tests, DB migration |
| Large | 150K-400K | 20-40 turns | Multi-file refactor, new module |
| Epic | 400K+ | Split sessions | Architecture change, new service |

### Token Cost Per Action
| Action | Read Tokens | Write Tokens |
|--------|-------------|-------------|
| Read file (avg) | ~500-2000 | 0 |
| Write new file | ~200 | ~1000-3000 |
| Edit existing file | ~500-1500 | ~500-2000 |
| Run terminal command | ~100 | ~200 |
| Search codebase | ~300 | ~500 |
| Sequential thinking | ~1000 | ~2000-5000 |
| Context7 lookup | ~500 | ~1000 |

## Budget Planning Process

### Step 1: Classify the Task
1. Read the requirement
2. Count files that need changes
3. Count new files to create
4. Estimate complexity tier

### Step 2: Calculate Budget
```
Budget = (files_to_read × 1000) + (files_to_write × 2000) + (files_to_edit × 1500)
       + (test_files × 2500) + (thinking_rounds × 3000) + overhead_20%
```

### Step 3: Optimization Strategy
- **Use Caveman mode** for sessions > 10 turns (saves ~50-75%)
- **Use Graphify** instead of reading individual files (saves ~71x)
- **Chunk epic tasks** into 5-10 turn sessions with progress.md handoff
- **Skip unnecessary reads** — reference by path, don't re-read known files
- **Batch related changes** — edit multiple functions in one tool call
- **Use .claudeignore** — exclude node_modules, dist, lock files

### Step 4: Session Splitting Plan
For Large/Epic tasks:
```
Session 1 (Budget: 50K): Planning + Architecture + Types/Interfaces
Session 2 (Budget: 80K): Core Implementation + Unit Tests
Session 3 (Budget: 50K): Integration + E2E Tests
Session 4 (Budget: 30K): Review + Security Audit + Polish
```

## Output Format
```
💰 TOKEN BUDGET PLAN
━━━━━━━━━━━━━━━━━━━━

Task: [description]
Complexity: [MICRO/SMALL/MEDIUM/LARGE/EPIC]
Estimated Tokens: [X]K
Estimated Sessions: [X]
Estimated Cost: ~$[X.XX]

Optimization Applied:
- [x] Caveman mode: saves ~[X]K tokens
- [x] Graphify: saves ~[X]K tokens  
- [x] .claudeignore: saves ~[X]K tokens

Session Breakdown:
1. [Session goal] — ~[X]K tokens
2. [Session goal] — ~[X]K tokens

💡 Money-Saving Tips:
- [specific tip for this task]
```

## Real-Time Tracking
During session, periodically report:
- Tokens used so far (estimate)
- Remaining budget
- Recommendation: continue or split session
