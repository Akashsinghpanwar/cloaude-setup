# Vibe Code Auditor — Production Readiness Scoring

## Trigger
User says: "audit", "code quality", "production ready?", "score this code", "vibe check"

## Scoring System (0-100)

### Categories & Weights
| Category | Weight | What to Check |
|----------|--------|---------------|
| Code Quality | 20% | Clean code, naming, SRP, DRY, complexity |
| Type Safety | 15% | Strict types, no `any`, proper interfaces |
| Error Handling | 15% | Try/catch, error boundaries, graceful degradation |
| Security | 20% | Input validation, SQL injection, XSS, auth |
| Performance | 10% | N+1 queries, memory leaks, bundle size, caching |
| Testing | 10% | Coverage, edge cases, integration tests |
| Architecture | 10% | Separation of concerns, DI, modularity |

### Scoring Rubric
- **90-100 🟢 ELITE:** Ship to production immediately. Best practices everywhere.
- **75-89 🟡 GOOD:** Production-ready with minor improvements. Ship with confidence.
- **60-74 🟠 DECENT:** Needs work before production. Fix flagged issues.
- **40-59 🔴 RISKY:** Major issues present. Significant rework needed.
- **0-39 ⛔ FAIL:** Not deployable. Fundamental problems.

## Audit Process
1. **Scan** all files in scope
2. **Score** each category independently
3. **Flag** critical issues (security = instant fail if critical)
4. **Suggest** specific, actionable fixes with code examples
5. **Output** formatted scorecard

## Output Format
```
╔══════════════════════════════════════╗
║     VIBE CODE AUDIT — SCORECARD     ║
╠══════════════════════════════════════╣
║ Overall Score:  XX/100  [RATING]    ║
╠══════════════════════════════════════╣
║ Code Quality:   XX/20               ║
║ Type Safety:    XX/15               ║
║ Error Handling: XX/15               ║
║ Security:       XX/20               ║
║ Performance:    XX/10               ║
║ Testing:        XX/10               ║
║ Architecture:   XX/10               ║
╠══════════════════════════════════════╣
║ Critical Issues: X                  ║
║ Warnings:        X                  ║
║ Suggestions:     X                  ║
╚══════════════════════════════════════╝
```

## Critical Issue Flags (Auto-Fail Conditions)
- SQL injection vulnerability → Score capped at 30
- Hardcoded credentials → Score capped at 20
- No error handling on API routes → Score capped at 50
- No input validation → Score capped at 40
- eval() or exec() with user input → Score capped at 10

## Fix Suggestions Format
For each issue:
1. **File:** exact file path and line
2. **Issue:** what's wrong and why it matters
3. **Fix:** exact code replacement
4. **Impact:** which score category improves and by how much
