# Stack-Specific Patterns — Dynamic Best Practices per Stack

> UNIQUE to Vibe Elite. Adapts rules based on YOUR chosen tech stack.

## Trigger
Auto-loaded based on stack selection during `vibe-elite` setup.
User says: "best practices", "patterns for [framework]", "how should I structure"

## What This Does
Provides stack-SPECIFIC coding patterns, not generic advice.
Read by Claude alongside CLAUDE.md to enforce the right patterns for YOUR stack.

## Next.js (App Router) Patterns
```
- Use Server Components by default, Client Components only when needed
- 'use client' only for: useState, useEffect, event handlers, browser APIs
- Data fetching in Server Components (not useEffect)
- Use loading.tsx, error.tsx, not-found.tsx for each route
- Metadata API for SEO (not Head component)
- Route handlers in app/api/ (not pages/api/)
- Use next/image for all images
- Use next/link for all internal links
- Server Actions for form mutations
- Parallel routes for complex layouts
```

## React + Vite Patterns
```
- Functional components only (no class components)
- Custom hooks for shared logic (useAuth, useFetch, useDebounce)
- React Query / TanStack Query for server state
- Zustand or Jotai for client state (not Redux for new projects)
- React Hook Form for forms (not controlled inputs for large forms)
- Lazy loading with React.lazy() + Suspense for route splitting
- Error Boundaries for error handling
- Strict Mode in development
- Vite path aliases (@/ for src/)
```

## Express / Fastify API Patterns
```
- Controller → Service → Repository layering
- Validation middleware (zod/joi) before handler
- Error handling middleware (centralized)
- Request ID middleware for tracing
- Rate limiting middleware on public routes
- Helmet/security headers middleware
- Structured JSON logging (pino for Fastify, winston for Express)
- Graceful shutdown handler
- Health check endpoint (/health, /ready)
- API versioning (/api/v1/)
```

## Python FastAPI Patterns
```
- Pydantic models for request/response validation
- Dependency injection with Depends()
- Async endpoints for I/O operations
- Background tasks for non-blocking operations
- Middleware for auth, logging, CORS
- Alembic for database migrations
- SQLAlchemy async sessions
- Type hints on everything
- Settings from environment (pydantic-settings)
- Structured exception handlers
```

## React Native / Expo Patterns
```
- Expo Router for navigation (file-based)
- NativeWind for styling (Tailwind for RN)
- React Query for data fetching
- AsyncStorage for local persistence
- Expo SecureStore for sensitive data
- Platform-specific code with .ios.tsx / .android.tsx
- Custom hooks for native features
- Error recovery with ErrorBoundary
- OTA updates with expo-updates
- Performance: FlatList over ScrollView for lists
```

## Go API Patterns
```
- Standard library net/http or Chi/Gin router
- Context propagation for cancellation/deadlines
- Structured errors (not string errors)
- Interface-based dependency injection
- Table-driven tests
- Middleware chain pattern
- Graceful shutdown with signal handling
- Environment config with envconfig/viper
- Database connection pooling with sql.DB
- Go modules for dependency management
```

## Universal Rules (All Stacks)
```
These apply REGARDLESS of stack:
1. Environment variables for all config
2. Structured logging (JSON)
3. Input validation at boundaries
4. Error handling on every path
5. Health check endpoints
6. Graceful shutdown
7. Tests before shipping
8. No secrets in code
```
