# Security Auditor — OWASP Top 10 & Beyond

## Trigger
User says: "security audit", "vulnerability scan", "security check", "is this secure?", "pentest"

## Scan Scope

### OWASP Top 10 (2021) Checklist
1. **A01: Broken Access Control**
   - Check: Auth middleware on protected routes
   - Check: Role-based access control (RBAC)
   - Check: Resource ownership validation
   - Check: CORS configuration (not wildcard *)
   - Check: Directory traversal prevention

2. **A02: Cryptographic Failures**
   - Check: Passwords hashed with bcrypt/argon2 (NOT md5/sha1)
   - Check: HTTPS enforced everywhere
   - Check: Sensitive data encrypted at rest
   - Check: No secrets in source code or logs
   - Check: Strong JWT secret + short expiry

3. **A03: Injection**
   - Check: Parameterized queries (no string concat in SQL)
   - Check: ORM used properly
   - Check: No eval(), exec(), Function() with user input
   - Check: Command injection prevention
   - Check: LDAP/XML injection prevention

4. **A04: Insecure Design**
   - Check: Rate limiting on auth endpoints
   - Check: Account lockout after failed attempts
   - Check: Business logic validation
   - Check: Threat modeling for critical flows

5. **A05: Security Misconfiguration**
   - Check: Default credentials removed
   - Check: Error messages don't leak internals
   - Check: Security headers set (CSP, X-Frame-Options, etc.)
   - Check: Unnecessary features/ports disabled
   - Check: Debug mode OFF in production

6. **A06: Vulnerable Components**
   - Check: npm audit / pip audit results
   - Check: No known CVEs in dependencies
   - Check: Dependencies up to date
   - Check: Lock files committed

7. **A07: Auth Failures**
   - Check: Brute force protection
   - Check: Session management secure
   - Check: Token rotation implemented
   - Check: Logout invalidates session/token

8. **A08: Data Integrity**
   - Check: CI/CD pipeline secure
   - Check: Dependencies from trusted sources
   - Check: Subresource integrity for CDN resources

9. **A09: Logging Failures**
   - Check: Auth events logged
   - Check: Failed access logged
   - Check: Logs don't contain sensitive data
   - Check: Log injection prevention

10. **A10: SSRF**
    - Check: URL validation on server-side requests
    - Check: Allowlist for external service URLs
    - Check: No user-controlled redirects without validation

## Output Format
```
╔══════════════════════════════════════════╗
║    SECURITY AUDIT REPORT                 ║
╠══════════════════════════════════════════╣
║ Risk Level: [CRITICAL/HIGH/MEDIUM/LOW]   ║
║ Vulnerabilities Found: X                 ║
╠══════════════════════════════════════════╣
║ 🔴 Critical: X                           ║
║ 🟠 High:     X                           ║
║ 🟡 Medium:   X                           ║
║ 🟢 Low:      X                           ║
╚══════════════════════════════════════════╝
```

## For Each Vulnerability
1. **Severity:** CRITICAL / HIGH / MEDIUM / LOW
2. **Category:** OWASP ID (e.g., A03: Injection)
3. **Location:** File path + line number
4. **Description:** What's vulnerable and how it can be exploited
5. **Fix:** Exact code fix with before/after
6. **References:** CWE ID, relevant documentation

## Auto-Fix Priority
1. CRITICAL → Fix immediately, block deployment
2. HIGH → Fix before next release
3. MEDIUM → Fix within sprint
4. LOW → Track in backlog
