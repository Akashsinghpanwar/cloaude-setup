export function generateClaudeMd(config) {
  const { projectName, level, projectType, stack, language, features, testingLevel, plugins } = config;

  const hasPlugins = plugins && plugins.length > 0;
  const hasCaveman = plugins?.includes('caveman');
  const hasGraphify = plugins?.includes('graphify');
  const isElite = level === 'elite';
  const detected = config._detected;
  const detectedInfo = detected ? `\n- **Auto-Detected:** ${detected.type} (${detected.framework || 'custom'})${detected.packageManager ? `\n- **Package Manager:** ${detected.packageManager}` : ''}` : '';
  const langMap = { typescript: 'TypeScript', javascript: 'JavaScript', python: 'Python', go: 'Go', rust: 'Rust', java: 'Java', csharp: 'C#', other: 'Mixed' };
  const langName = langMap[language] || language;

  let md = `# CLAUDE.md — ${projectName} Project Configuration

## Project Overview
- **Name:** ${projectName}
- **Type:** ${getProjectTypeLabel(projectType)}
- **Stack:** ${stack}
- **Language:** ${langName}
- **Quality Level:** ${isElite ? 'ELITE (Production-Grade)' : 'Standard'}${detectedInfo}
- **Environment:** Production Web Service

---

## CRITICAL RULES (NEVER BREAK THESE)

1. **NEVER** hardcode secrets, API keys, passwords, or tokens
2. **NEVER** skip error handling — every async operation must have try/catch or .catch()
3. **NEVER** use \`any\` type in TypeScript — always define proper types
4. **NEVER** commit code without running tests first
5. **NEVER** use string concatenation in SQL queries — use parameterized queries
6. **NEVER** trust user input — validate and sanitize everything
7. **NEVER** ignore security warnings from dependencies

---

## Development Standards

### Code Style
${getCodeStyleRules(language, isElite)}

### Architecture Rules
${getArchitectureRules(projectType, isElite)}

### File Organization
- Maximum file length: ${isElite ? '250' : '400'} lines
- One component/module per file
- Group by feature, not by type
- Keep imports organized: external → internal → relative

---

## Testing Requirements
${getTestingRules(testingLevel, isElite)}

---

## Security Checklist
${getSecurityRules(isElite)}

---

## Performance Standards
${getPerformanceRules(isElite)}

---

## Git Workflow
- Conventional commits: feat:, fix:, refactor:, test:, docs:, perf:, chore:
- PR required for all changes
- No direct commits to main/master
- Squash merge preferred
- Branch naming: feature/*, fix/*, refactor/*

---

## Error Handling Pattern
\`\`\`
Every function that can fail MUST:
1. Have explicit error handling (try/catch or Result type)
2. Log errors with context (what failed, with what input)
3. Return meaningful error messages to caller
4. NEVER swallow errors silently
5. Use custom error classes for domain errors
\`\`\`

---

## Code Review Checklist (Before Every Commit)
1. ✅ All tests pass (zero failures)
2. ✅ No security vulnerabilities
3. ✅ No hardcoded values or secrets
4. ✅ Error handling present on all paths
5. ✅ Types are strict (no \`any\`)
6. ✅ Code is under ${isElite ? '250' : '400'} lines per file
7. ✅ No N+1 queries or memory leaks
8. ✅ Input validation on all entry points
9. ✅ No console.log in production code (use proper logger)
10. ✅ Accessibility checked (if frontend)

---

${hasPlugins ? `## Installed Tools (Existing Ecosystem)
${hasCaveman ? '- **Caveman** — Enable with \`caveman lite\` for ~75% token savings\n' : ''}${hasGraphify ? '- **Graphify** — Run \`/graphify\` to generate codebase knowledge graph\n' : ''}
---
` : ''}

## MCP Tool Usage Guide
- Use **sequential-thinking** for complex architecture decisions
- Use **Context7** for any library/framework API questions  
- Use **Playwright** for E2E testing verification
- Use **memory** to store project decisions and patterns
- Read **progress.md** at session start for continuity

---

## When Starting a New Feature
1. Read this file (CLAUDE.md) first
2. Read progress.md for current status
3. Plan the approach using sequential thinking
${testingLevel === 'tdd' ? '4. Write failing tests FIRST\n5. Implement minimum code to pass tests\n6. Refactor while keeping tests green' : '4. Implement the feature\n5. Write comprehensive tests\n6. Refactor as needed'}
7. Run security audit
8. Update progress.md
`;

  return md;
}

export function generateProgressMd(config) {
  return `# Progress Tracker — ${config.projectName}

## Current Session
- **Date:** ${new Date().toISOString().split('T')[0]}
- **Working On:** Initial setup
- **Status:** Project configured with Vibe Elite (${config.level} level)

## Completed
- [x] Vibe Elite setup (${config.level} level)
- [x] CLAUDE.md configured
- [x] Skills installed (${config.features.length} skills)
- [x] MCP servers configured

## Next Steps
- [ ] Start first feature implementation
- [ ] Set up CI/CD pipeline
- [ ] Configure production environment

## Key Decisions
- Quality Level: ${config.level === 'elite' ? 'ELITE (production-grade)' : 'Standard'}
- Stack: ${config.stack}
- Testing: ${config.testingLevel}
- Token Optimization: ${config.plugins?.includes('caveman') ? 'Enabled (Caveman)' : 'Manual'}

## Known Issues
- None yet

## Architecture Notes
- Document architecture decisions here as you make them
`;
}

export function generateClaudeignore() {
  return `# Vibe Elite — Claude Ignore File
# Files Claude should NOT read (saves tokens)

node_modules/
dist/
build/
.next/
coverage/
*.min.js
*.min.css
*.map
*.lock
package-lock.json
yarn.lock
pnpm-lock.yaml
.env
.env.*
*.log
*.sqlite
*.db
__pycache__/
*.pyc
.git/
.DS_Store
Thumbs.db
`;
}

function getProjectTypeLabel(type) {
  const map = {
    fullstack: 'Full-Stack Web Application',
    frontend: 'Frontend SPA',
    backend: 'Backend API',
    mobile: 'Mobile Application',
    cli: 'CLI Tool / Library',
    ai: 'AI/ML Application',
    general: 'General Purpose',
  };
  return map[type] || type;
}

function getCodeStyleRules(language, isElite) {
  const base = `- Use descriptive variable names (no single letters except loop indices)
- Functions should do ONE thing (Single Responsibility)
- Maximum function length: ${isElite ? '30' : '50'} lines
- Maximum parameters per function: ${isElite ? '3' : '5'} (use objects for more)
- Use early returns to avoid deep nesting
- Constants over magic numbers — always name your values`;

  const tsRules = `
- Use TypeScript strict mode (\`"strict": true\`)
- Define interfaces for all data structures
- Use \`unknown\` instead of \`any\` when type is uncertain
- Prefer \`const\` over \`let\`, never use \`var\`
- Use optional chaining (?.) and nullish coalescing (??)
- Async/await over .then() chains`;

  const pyRules = `
- Follow PEP 8 strictly
- Use type hints on all function signatures
- Use dataclasses or Pydantic models for data structures
- Use f-strings for string formatting
- Use \`pathlib\` over \`os.path\`
- Use async/await for I/O operations`;

  const goRules = `
- Follow Go conventions (gofmt, golint)
- Always handle errors explicitly
- Use meaningful receiver names
- Prefer composition over inheritance
- Use context.Context for cancellation`;

  if (['typescript', 'javascript'].includes(language)) return base + tsRules;
  if (language === 'python') return base + pyRules;
  if (language === 'go') return base + goRules;
  return base;
}

function getArchitectureRules(projectType, isElite) {
  const base = `- Separate concerns: Presentation → Business Logic → Data Access
- No business logic in route handlers/controllers
- Use dependency injection for testability
- Environment variables for ALL configuration
- No circular dependencies`;

  const eliteRules = isElite
    ? `
- Use repository pattern for data access
- Implement proper logging (structured JSON logs)
- Use middleware for cross-cutting concerns (auth, logging, rate limiting)
- Implement circuit breaker for external service calls
- Use event-driven patterns for decoupled communication
- Cache strategically (define TTL, invalidation strategy)`
    : '';

  return base + eliteRules;
}

function getTestingRules(testingLevel, isElite) {
  if (testingLevel === 'tdd') {
    return `### TDD Workflow (MANDATORY)
1. **RED:** Write a failing test FIRST
2. **GREEN:** Write MINIMUM code to pass the test
3. **REFACTOR:** Clean up while keeping tests green

### Coverage Requirements
- Minimum ${isElite ? '90' : '80'}% code coverage
- 100% coverage on critical business logic
- E2E tests for all critical user paths
- Integration tests for API endpoints
- Unit tests for all business logic functions
- Edge case tests for error handling
- Performance tests for bottleneck areas`;
  }

  if (testingLevel === 'test-after') {
    return `### Testing Strategy
- Write comprehensive tests after implementation
- Minimum ${isElite ? '85' : '70'}% code coverage
- E2E tests for critical user paths
- Integration tests for API endpoints
- Unit tests for business logic
- Always test error paths`;
  }

  return `### Testing Strategy
- Test critical paths and business logic
- Minimum 60% code coverage
- Focus on integration tests for APIs
- Unit tests for complex business logic`;
}

function getSecurityRules(isElite) {
  const base = `### Security Gates (Check Before Every PR)
1. Input validation on ALL entry points (whitelist, not blacklist)
2. Parameterized queries only (NEVER string concatenation in SQL)
3. Authentication on all protected routes
4. CORS configured for specific origins only
5. No credentials in source code
6. Sanitize user input before rendering (XSS prevention)
7. Use HTTPS only
8. Rate limiting on public endpoints`;

  const eliteRules = isElite
    ? `
9. Content Security Policy (CSP) headers
10. CSRF protection on state-changing operations
11. Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
12. JWT tokens: short expiry, refresh token rotation
13. Audit logging for sensitive operations
14. Dependency vulnerability scanning (npm audit / pip audit)
15. No eval(), exec(), os.system(), or dynamic code execution
16. File upload: validate type, size, scan for malware
17. API versioning for backward compatibility
18. Implement request signing for API-to-API communication`
    : '';

  return base + eliteRules;
}

function getPerformanceRules(isElite) {
  if (!isElite) {
    return `### Performance Basics
- No N+1 database queries
- Use pagination for list endpoints
- Implement basic caching where appropriate
- Lazy load non-critical resources`;
  }

  return `### Performance Standards (Elite)
- No N+1 database queries — use eager loading or DataLoader
- Database indexes on all queried columns
- Response time targets: API < 200ms, Page load < 1.5s
- Use pagination with cursor-based pagination for large datasets
- Implement caching strategy (Redis/in-memory) with proper TTL
- Lazy load non-critical resources and code split
- Use connection pooling for database connections
- Implement request deduplication
- Bundle size budget: JS < 200KB gzipped
- Image optimization: WebP/AVIF with responsive sizes
- Use CDN for static assets
- Implement stale-while-revalidate caching pattern
- Monitor memory usage — no memory leaks
- Use streaming for large data transfers`;
}
