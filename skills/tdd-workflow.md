# TDD Workflow — Test-Driven Development Engine

## Trigger
User says: "TDD", "test first", "write tests", "test driven", "red green refactor"

## The TDD Cycle

### Phase 1: RED (Write Failing Test)
1. Understand the requirement completely
2. Write the SMALLEST test that expresses the requirement
3. Run the test — confirm it FAILS
4. The test should fail for the RIGHT reason

### Phase 2: GREEN (Make It Pass)
1. Write the MINIMUM code to make the test pass
2. Don't optimize or clean up yet
3. Run the test — confirm it PASSES
4. All previous tests must still pass

### Phase 3: REFACTOR (Clean Up)
1. Remove duplication
2. Improve naming and structure
3. Apply design patterns if appropriate
4. Run ALL tests — confirm everything still passes
5. Never add new behavior during refactor

## Test Writing Rules

### Unit Tests
- Test ONE behavior per test
- Use descriptive test names: `should_[expected]_when_[condition]`
- Arrange → Act → Assert pattern
- Mock external dependencies
- Test edge cases: null, empty, boundary values, errors

### Integration Tests
- Test actual component interactions
- Use test database (not mocks)
- Test happy path + error paths
- Clean up test data after each test

### E2E Tests
- Test critical user journeys
- Keep E2E tests minimal (they're slow)
- Use data-testid for element selection
- Screenshot on failure for debugging

## Test Structure Template
```
describe('[Component/Function Name]', () => {
  describe('[method/behavior]', () => {
    it('should [expected outcome] when [condition]', () => {
      // Arrange - set up test data
      // Act - execute the function
      // Assert - verify the result
    });

    it('should throw error when [invalid condition]', () => {
      // Test error handling
    });

    it('should handle edge case: [edge case]', () => {
      // Test boundary conditions
    });
  });
});
```

## Coverage Targets
| Type | Elite | Standard |
|------|-------|----------|
| Business Logic | 100% | 90% |
| API Endpoints | 95% | 80% |
| UI Components | 85% | 70% |
| Utilities | 100% | 90% |
| Overall | 90% | 80% |

## What NOT to Test
- Third-party library internals
- Simple getters/setters with no logic
- Framework configuration files
- Generated code
- Constants/enums
