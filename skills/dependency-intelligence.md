# Dependency Intelligence — Smart Dependency Analysis

> UNIQUE to Vibe Elite. Goes beyond `npm audit` with strategic analysis.

## Trigger
User says: "dependencies", "dep analysis", "package health", "should I use X or Y", "dependency check"

## What This Does
Analyzes your project's dependencies for health, risk, alternatives, and bloat.
Not just security — strategic dependency management.

## Analysis Dimensions

### 1. Health Score Per Dependency
| Factor | Score Impact | Check |
|--------|-------------|-------|
| Last published | < 6 months: +2, > 2 years: -5 | npm view [pkg] time |
| Weekly downloads | > 100K: +2, < 1K: -3 | npm info |
| Open issues ratio | < 10%: +1, > 50%: -3 | GitHub |
| Maintainers | > 2: +1, = 1: -2 | Bus factor risk |
| TypeScript types | Built-in: +2, @types: +1, None: -1 | DX quality |
| Bundle size | < 10KB: +2, > 100KB: -2 | bundlephobia |
| Dependencies count | < 5: +1, > 20: -2 | Supply chain risk |

### 2. Supply Chain Risk
- Total transitive dependencies count
- Known CVEs in dependency tree
- Dependencies with single maintainer
- Dependencies without lock file pinning
- Typosquat risk (similar named packages)

### 3. Bundle Impact Analysis
For frontend projects:
```
Dependency        Import Size    Gzipped    Tree-Shakeable?
────────────────────────────────────────────────────────
lodash            ~70KB          ~25KB      ❌ (use lodash-es)
moment            ~290KB         ~72KB      ❌ (use date-fns)
date-fns          ~13KB*         ~5KB       ✅ 
axios             ~14KB          ~5KB       ✅
zod               ~13KB          ~5KB       ✅

* tree-shaken import size
```

### 4. Alternative Recommendations
When a dependency is risky/heavy, suggest better alternatives:
```
CURRENT → RECOMMENDED (why)
moment → date-fns (tree-shakeable, smaller, maintained)
lodash → lodash-es or native JS (ES2024 has most utils)
express → hono or fastify (faster, modern, typed)
request → undici or native fetch (request is deprecated)
```

## Output Format
```
🔗 DEPENDENCY INTELLIGENCE
━━━━━━━━━━━━━━━━━━━━━━━━━

Total Dependencies: X (Y direct, Z transitive)
Health Score: XX/100

🔴 Critical Issues:
- [dep] — [CVE/deprecated/abandoned]

🟡 Recommendations:
- Replace [dep] with [alt] — saves [X]KB, better maintained
- Remove [dep] — unused (last imported: never)

📦 Bundle Impact: [X]KB gzipped total
  Top 3 heaviest: [dep1] [X]KB, [dep2] [X]KB, [dep3] [X]KB

🔄 Updates Available:
- [dep] current: X.Y.Z → latest: A.B.C (breaking: yes/no)
```
