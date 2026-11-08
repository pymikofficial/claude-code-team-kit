---
paths:
  - "tests/**/*"
  - "**/*.test.ts"
---

# Test rules

These load only when Claude works on test files, wherever they sit.

- One behaviour per test, named as a sentence, for example "returns 404 when the task does not exist".
- Arrange, act, assert, in that order, with a blank line between each.
- No real network or database calls. Use in-memory fakes instead.
- A bug fix comes with a test that failed before the fix.
