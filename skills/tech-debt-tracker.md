# Tech Debt Tracker — Auto-Detect & Score Technical Debt

> UNIQUE to Vibe Elite. No other tool quantifies tech debt this way.

## Trigger
User says: "tech debt", "code health", "debt score", "what needs fixing", "technical debt"

## What This Does
Automatically scans and SCORES technical debt across your codebase.
Gives a single number (0-100) so you know exactly how much debt you carry.

## Debt Detection Categories

### 1. Code Smell Debt (Weight: 25%)
- Functions > 50 lines → 2 points each
- Files > 300 lines → 3 points each
- Cyclomatic complexity > 10 → 2 points each
- Deep nesting > 3 levels → 1 point each
- Duplicate code blocks → 3 points each
- God classes/modules (too many responsibilities) → 5 points each

### 2. Test Debt (Weight: 20%)
- No tests at all → 20 points
- Coverage < 50% → 10 points
- Coverage 50-70% → 5 points
- Skipped/disabled tests → 2 points each
- No E2E tests for critical paths → 5 points
- Tests that mock everything (fragile) → 1 point each

### 3. Dependency Debt (Weight: 15%)
- Major version behind → 3 points per dep
- Known CVE in dependency → 10 points per CVE (critical), 5 (high)
- Deprecated package → 5 points each
- Unused dependencies → 1 point each
- No lock file → 5 points

### 4. Architecture Debt (Weight: 20%)
- Circular dependencies → 5 points each
- Business logic in controllers/handlers → 3 points each
- No separation of concerns → 10 points
- Hardcoded configuration → 2 points each
- No environment variable usage → 5 points
- Monolithic file (everything in one file) → 10 points

### 5. Documentation Debt (Weight: 10%)
- No CLAUDE.md / README → 5 points
- No API documentation → 3 points
- Outdated comments (refer to non-existent code) → 1 point each
- No setup instructions → 3 points

### 6. Infrastructure Debt (Weight: 10%)
- No CI/CD pipeline → 5 points
- No Docker/containerization → 3 points
- No health checks → 3 points
- No logging strategy → 3 points
- Manual deployment process → 5 points

## Scoring Formula
```
Raw Score = sum of all detected debt points
Max Possible = 100
Debt Score = min(Raw Score, 100)
Health Score = 100 - Debt Score

Health Grade:
  90-100: A+ (Pristine — rare, congratulations)
  75-89:  A  (Healthy — minor debt, manageable)
  60-74:  B  (Moderate — schedule debt sprints)
  40-59:  C  (Heavy — debt is slowing you down)
  20-39:  D  (Critical — prioritize debt reduction)
  0-19:   F  (Emergency — debt is blocking progress)
```

## Output Format
```
🏗️ TECH DEBT REPORT
━━━━━━━━━━━━━━━━━━━━

Health Score: XX/100  [GRADE]
Total Debt Points: XX

Breakdown:
  Code Smells:     XX/25  ████████░░ 
  Test Debt:       XX/20  ██████░░░░
  Dependency Debt: XX/15  ████░░░░░░
  Architecture:    XX/20  ████████░░
  Documentation:   XX/10  ██░░░░░░░░
  Infrastructure:  XX/10  ██████░░░░

🔴 Critical (Fix NOW):
1. [specific issue + file + fix]

🟡 High Priority (This Sprint):
1. [specific issue + file + fix]

🟢 Low Priority (Backlog):
1. [specific issue]

📈 Debt Reduction Plan:
  Sprint 1: Fix [X] → Score improves by ~[Y] points
  Sprint 2: Fix [X] → Score improves by ~[Y] points
```

## Tracking Over Time
After each audit, append to progress.md:
```
## Tech Debt History
| Date | Score | Grade | Key Change |
|------|-------|-------|------------|
| YYYY-MM-DD | XX | B | Fixed circular deps |
```
