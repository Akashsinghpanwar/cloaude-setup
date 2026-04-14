# Ship Checklist — Pre-Deploy Validation Engine

> UNIQUE to Vibe Elite. The final gate before ANY code goes to production.

## Trigger
User says: "ship", "deploy", "ready to ship?", "pre-deploy check", "go live", "ship checklist"

## What This Does
Runs a comprehensive validation checklist before deployment.
Acts as the final quality gate — catches what code review missed.

## The Checklist (Score: X/50 points)

### 1. Code Quality (10 points)
- [ ] No `console.log` in production code (use logger) — 2pts
- [ ] No `any` types in TypeScript — 2pts
- [ ] No TODO/FIXME/HACK comments left — 1pt
- [ ] All functions < 30 lines — 2pts
- [ ] All files < 300 lines — 2pts
- [ ] No commented-out code — 1pt

### 2. Error Handling (8 points)
- [ ] Every async operation has try/catch — 2pts
- [ ] API errors return proper status codes — 2pts
- [ ] Error messages don't leak internal details — 2pts
- [ ] Error boundary/fallback in frontend — 1pt
- [ ] Unhandled rejection handler exists — 1pt

### 3. Security (10 points)
- [ ] No hardcoded secrets/keys/tokens — 3pts
- [ ] Input validation on all entry points — 2pts
- [ ] SQL injection protection (parameterized queries) — 2pts
- [ ] CORS configured (not wildcard *) — 1pt
- [ ] Auth on protected routes — 1pt
- [ ] Rate limiting on public endpoints — 1pt

### 4. Testing (8 points)
- [ ] All tests pass (zero failures) — 3pts
- [ ] Coverage > 80% on business logic — 2pts
- [ ] E2E tests for critical user paths — 2pts
- [ ] No skipped/disabled tests — 1pt

### 5. Performance (6 points)
- [ ] No N+1 database queries — 2pts
- [ ] Images optimized (WebP, lazy load) — 1pt
- [ ] API responses < 200ms — 1pt
- [ ] Bundle size within budget — 1pt
- [ ] No memory leaks — 1pt

### 6. Operations (8 points)
- [ ] Environment variables documented — 1pt
- [ ] Health check endpoint exists — 2pts
- [ ] Logging in place (structured) — 2pts
- [ ] Database migrations up to date — 1pt
- [ ] Rollback plan defined — 1pt
- [ ] Monitoring/alerts configured — 1pt

## Scoring
```
45-50: ✅ SHIP IT — Production ready, go live!
35-44: ⚠️ ALMOST — Fix flagged items, then ship
25-34: 🔶 NOT YET — Significant gaps, needs work
0-24:  🔴 BLOCKED — Do not deploy, major issues
```

## Output Format
```
🚀 SHIP CHECKLIST
━━━━━━━━━━━━━━━━━

Score: XX/50  [STATUS]

Code Quality:    XX/10  ██████████
Error Handling:  XX/8   ████████░░
Security:        XX/10  ██████████
Testing:         XX/8   ██████░░░░
Performance:     XX/6   ██████░░░░
Operations:      XX/8   ████████░░

🔴 BLOCKERS (must fix):
1. [issue — file — fix]

🟡 WARNINGS (should fix):
1. [issue — file — fix]

✅ ALL CLEAR:
- [what passed]

Verdict: [SHIP IT / FIX FIRST / NOT READY]
```

## Post-Ship Protocol
After deployment:
1. Verify health check endpoint returns 200
2. Check error monitoring (no new errors)
3. Verify critical user flows work
4. Monitor performance metrics for 15 minutes
5. Update progress.md with deployment note
