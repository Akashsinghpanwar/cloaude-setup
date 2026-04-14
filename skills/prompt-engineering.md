# Prompt Engineering Guide — Optimal Claude Code Prompts

> UNIQUE to Vibe Elite. Teaches you HOW to talk to Claude for best results.

## Trigger
User says: "prompt", "how to ask", "better prompts", "prompt engineering", "how to use claude"

## Why This Matters
The quality of Claude's output is directly proportional to prompt quality.
A good prompt = 10x better code, fewer iterations, less tokens wasted.

## The SCOPE Framework (for every task)

### S — Specific
Bad:  "Build a login page"
Good: "Build a login page with email/password, using React Hook Form for validation, 
       Tailwind CSS for styling, and integrate with our /api/auth/login endpoint"

### C — Context
Bad:  "Add caching"
Good: "Add Redis caching to the getUserById function in src/services/user.ts. 
       We're using ioredis client already configured in src/lib/redis.ts. 
       Cache TTL should be 5 minutes."

### O — Output Format
Bad:  "Create tests"
Good: "Write Vitest unit tests for the calculatePrice function in src/utils/pricing.ts.
       Use describe/it blocks, test happy path + edge cases (null, 0, negative, max value).
       Follow AAA pattern (Arrange-Act-Assert)."

### P — Precedent
Bad:  "Make an API endpoint"
Good: "Create a GET /api/users/:id endpoint following the same pattern as 
       src/routes/products.ts. Use the same error handling middleware, 
       validation schema pattern, and response format."

### E — Exclusions
Bad:  "Refactor this file"
Good: "Refactor src/services/order.ts to extract the pricing logic into a separate 
       calculateOrderTotal utility. DON'T change the public API, DON'T rename 
       existing functions, DON'T modify the database queries."

## Power Prompts (Copy-Paste Ready)

### For Building Features
```
"Build [feature] with these requirements:
1. [requirement 1]
2. [requirement 2]

Follow the existing patterns in [reference file].
Use [specific library/framework].
Include error handling, input validation, and types.
Write tests using TDD approach."
```

### For Code Review
```
"Review [file/feature] for production readiness. Check:
1. Security vulnerabilities (OWASP Top 10)
2. Performance issues (N+1, memory leaks)
3. Error handling completeness
4. Type safety
5. Test coverage gaps

Score 0-100 and provide specific fixes."
```

### For Debugging
```
"Debug this issue:
Error: [paste error message]
File: [file path]
Expected: [what should happen]
Actual: [what's happening]

Steps to reproduce:
1. [step]
2. [step]

Check for: race conditions, null access, type mismatches."
```

### For Architecture
```
"Use sequential thinking to design [system/feature]:
Requirements: [list]
Constraints: [list]
Scale: [expected load/users]

Consider: separation of concerns, testability, scalability.
Output: module diagram, data flow, file structure."
```

## Token-Saving Prompt Patterns

### Reference Instead of Repeat
BAD:  "Here's the code: [paste 200 lines]... now modify it"
GOOD: "In src/services/user.ts, modify the createUser function to add email validation"

### Batch Related Changes
BAD:  Message 1: "Add type for User" → Message 2: "Now add type for Order" → Message 3: "Now add type for Product"
GOOD: "Create TypeScript interfaces for User, Order, and Product in src/types/index.ts. 
       User has: id, email, name. Order has: id, userId, items[], total. Product has: id, name, price, stock."

### Be Explicit About Scope
BAD:  "Make this better"
GOOD: "In src/components/Dashboard.tsx, extract the chart rendering logic (lines 45-120) 
       into a separate ChartWidget component. Keep the same props interface."

## Anti-Patterns (NEVER Do These)
1. "Fix everything" → Too vague, wastes tokens exploring
2. "Make it production ready" → Define what that means specifically
3. Pasting entire files when only one function matters
4. Asking the same question with slight variations
5. Not reading CLAUDE.md (makes Claude re-discover project rules)
6. Starting new sessions without reading progress.md
