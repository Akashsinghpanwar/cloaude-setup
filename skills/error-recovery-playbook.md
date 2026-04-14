# Error Recovery Playbook — Smart Error Pattern Resolution

> UNIQUE to Vibe Elite. Pattern-based error resolution, not just stack traces.

## Trigger
User says: "error", "crash", "not working", "failed", "broken", "500", "TypeError"
Auto-trigger: When any command/test fails.

## What This Does
Instead of blindly debugging, matches errors to KNOWN PATTERNS first.
Resolves 80% of common errors in 1-2 turns instead of 5-10.

## Error Pattern Database

### Pattern 1: Module/Import Errors
```
Symptoms: "Cannot find module", "Module not found", "ERR_MODULE_NOT_FOUND"
Causes (check in order):
  1. Package not installed → npm install [package]
  2. Wrong import path (relative vs absolute) → check tsconfig paths
  3. ESM vs CommonJS mismatch → check "type": "module" in package.json
  4. Missing @types package → npm install -D @types/[package]
  5. Barrel file not exporting → check index.ts exports
```

### Pattern 2: Type Errors
```
Symptoms: "Property X does not exist on type Y", "Type X is not assignable to Y"
Causes:
  1. Missing interface property → update type definition
  2. Nullable value accessed without check → add optional chaining (?.)
  3. API response shape changed → update type to match actual response
  4. Generic type not passed → add type parameter <T>
  5. Union type not narrowed → add type guard
```

### Pattern 3: Runtime Null/Undefined
```
Symptoms: "Cannot read properties of undefined", "X is not a function"
Causes:
  1. Async data not loaded yet → add loading state check
  2. Array/object is empty → add empty check before access
  3. API returned null → add nullish coalescing (??)
  4. Wrong variable scope → check closure/hoisting
  5. Race condition → add proper await/synchronization
```

### Pattern 4: Database Errors
```
Symptoms: "relation does not exist", "column X does not exist", "unique constraint"
Causes:
  1. Migration not run → run pending migrations
  2. Schema out of sync → regenerate client (prisma generate / drizzle push)
  3. Wrong database URL → check .env DATABASE_URL
  4. Transaction deadlock → reduce transaction scope
  5. Connection pool exhausted → increase pool size or fix leaks
```

### Pattern 5: Build/Compile Errors
```
Symptoms: "Build failed", "Compilation error", "SyntaxError"
Causes:
  1. Syntax error → check exact line from error
  2. Missing dependency → npm install
  3. Wrong Node.js version → check engines in package.json
  4. Cache stale → rm -rf node_modules/.cache && rm -rf .next
  5. Config conflict → check tsconfig, webpack, vite config
```

### Pattern 6: Network/API Errors
```
Symptoms: "CORS error", "ECONNREFUSED", "fetch failed", "timeout"
Causes:
  1. Server not running → start the server
  2. Wrong port/URL → check API_URL in .env
  3. CORS not configured → add cors middleware with correct origin
  4. SSL certificate issue → check HTTPS config
  5. Rate limited → implement retry with backoff
```

### Pattern 7: Test Failures
```
Symptoms: "Expected X but received Y", "Timeout", "Mock not called"
Causes:
  1. Snapshot outdated → update snapshots
  2. Async not awaited → add await to async assertions
  3. Mock not reset → add beforeEach(() => jest.clearAllMocks())
  4. Environment different → check test env config
  5. Order-dependent → tests should be independent
```

## Recovery Protocol
```
1. READ the full error message (not just the first line)
2. MATCH to known pattern above
3. CHECK causes in order (most common first)
4. FIX with minimal change
5. VERIFY fix doesn't break other things
6. ADD test to prevent regression
```

## Output Format
```
🛡️ ERROR RECOVERY
━━━━━━━━━━━━━━━━━

Error Type: [Pattern Name]
Matched Pattern: [X/7]
Confidence: [HIGH/MEDIUM/LOW]

Root Cause: [specific cause]
File: [path:line]

Fix: [exact change]
Verify: [how to confirm it's fixed]
Prevent: [test or validation to add]
```
