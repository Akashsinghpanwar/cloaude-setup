# Debugger Pro — Systematic Debugging Workflow

## Trigger
User says: "debug", "fix this bug", "why is this failing", "error", "not working", "crash"

## Debugging Protocol

### Step 1: REPRODUCE
- Get exact error message and stack trace
- Identify the trigger (what action causes the bug)
- Note the environment (dev/staging/prod, browser, OS)
- Can you reproduce it consistently?

### Step 2: ISOLATE
- Narrow down to the exact file and function
- Check recent changes (git log, git diff)
- Use binary search on commits if needed (git bisect)
- Add strategic logging at entry/exit points

### Step 3: UNDERSTAND
- Read the code path end-to-end
- Check data flow: what goes in, what comes out
- Verify assumptions about data types and values
- Check for race conditions, timing issues, null values

### Step 4: HYPOTHESIZE
- Form a theory about the root cause
- List potential causes ranked by probability
- Check the most likely cause first

### Step 5: FIX
- Write a test that catches the bug FIRST
- Make the minimal fix
- Verify the test passes
- Verify no other tests break
- Consider: could this bug exist elsewhere?

### Step 6: PREVENT
- Add regression test
- Add input validation if missing
- Add logging for future debugging
- Document the fix in commit message

## Common Bug Patterns

### Async Issues
- Missing await → Promise<pending> instead of value
- Race condition → add mutex/lock or sequential execution
- Unhandled rejection → add .catch() or try/catch

### Type Issues
- null/undefined access → add optional chaining (?.)
- Wrong type coercion → use strict comparison (===)
- Missing type guard → add runtime type checks

### State Issues
- Stale closure → use ref or dependency array
- Shared mutable state → use immutable patterns
- Incorrect initialization → check default values

### Data Issues
- Off-by-one errors → check boundary conditions
- Encoding issues → verify UTF-8 handling
- Timezone issues → always use UTC internally

## Output Format
```
🐛 BUG ANALYSIS
━━━━━━━━━━━━━━━━━━━
Root Cause: [description]
Location:   [file:line]
Impact:     [what's affected]
Fix:        [exact code change]
Prevention: [how to avoid in future]
Test:       [regression test added]
```
