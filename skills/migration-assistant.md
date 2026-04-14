# Migration Assistant — Smart Framework & Version Migration

> UNIQUE to Vibe Elite. No tool plans migrations this comprehensively.

## Trigger
User says: "migrate", "upgrade", "move from X to Y", "version upgrade", "migration plan"

## What This Does
Creates a step-by-step, zero-downtime migration plan when moving between
frameworks, major versions, databases, or any significant tech change.

## Migration Types

### 1. Framework Migration
Examples: Express → Fastify, React → Next.js, REST → GraphQL, CRA → Vite
```
Process:
1. Map EVERY current feature to equivalent in target
2. Identify gaps (what doesn't have a 1:1 mapping)
3. Create adapter/bridge layer for gradual migration
4. Migrate one route/component at a time
5. Run both old and new in parallel during transition
6. Remove old code only after new passes all tests
```

### 2. Major Version Upgrade
Examples: Next.js 13 → 14, React 17 → 18, Node 16 → 20, Python 3.9 → 3.12
```
Process:
1. Read CHANGELOG / migration guide (use Context7 MCP)
2. List ALL breaking changes that affect your code
3. Create a branch: `migrate/framework-vX-to-vY`
4. Update package first, then fix breakages one-by-one
5. Run full test suite after each fix
6. Update CLAUDE.md with new version constraints
```

### 3. Database Migration
Examples: MongoDB → PostgreSQL, MySQL → PostgreSQL, SQLite → any
```
Process:
1. Map schema: every collection/table to target
2. Map queries: every query pattern to target syntax
3. Create migration scripts with rollback
4. Dual-write period (write to both DBs)
5. Verify data integrity with checksums
6. Switch reads to new DB
7. Remove old DB writes after verification
```

### 4. Language Migration
Examples: JavaScript → TypeScript, Python 2 → 3, CommonJS → ESM
```
Process:
1. Set up target language tooling alongside existing
2. Migrate utilities first (least dependencies)
3. Then services, then controllers, then routes
4. Keep interop layer during migration
5. Strict mode from day one in new code
```

## Migration Plan Template

### Pre-Migration Checklist
- [ ] Full test suite passes on current version
- [ ] Backup of current state (git tag: pre-migration-YYYY-MM-DD)
- [ ] Read target version's migration guide completely
- [ ] List ALL breaking changes
- [ ] Estimate effort using Effort Estimator skill
- [ ] Create migration branch
- [ ] Define rollback plan

### Migration Phases
```
Phase 1: PREPARE (no code changes)
  → Read docs, list changes, plan order

Phase 2: FOUNDATION (infrastructure only)
  → Update configs, tooling, build system

Phase 3: ADAPT (code changes, file by file)
  → Migrate one module at a time, test after each

Phase 4: VERIFY (full testing)
  → Run all tests, E2E, performance benchmarks

Phase 5: CLEANUP (remove old code)
  → Remove compatibility layers, old configs
  → Update CLAUDE.md and progress.md
```

## Output Format
```
🔀 MIGRATION PLAN
━━━━━━━━━━━━━━━━━

From: [current]
To:   [target]
Risk Level: [LOW/MEDIUM/HIGH/CRITICAL]
Estimated Effort: [X hours/days]

Breaking Changes Found: X
Files to Modify: X
New Files Needed: X

Phase-by-Phase Plan:
1. PREPARE — [details] — ~[time]
2. FOUNDATION — [details] — ~[time]
3. ADAPT — [details] — ~[time]
4. VERIFY — [details] — ~[time]
5. CLEANUP — [details] — ~[time]

Rollback Plan:
  → git checkout pre-migration-tag
  → Revert package versions
  → Run: [specific rollback commands]
```

## Safety Rules
1. NEVER migrate without tests passing first
2. NEVER do big-bang migration (all at once)
3. ALWAYS have a rollback plan
4. ALWAYS create a git tag before starting
5. ALWAYS migrate in a separate branch
