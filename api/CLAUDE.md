# API conventions

Claude Code loads this file in addition to the root CLAUDE.md when it works inside `api/`.

- Every route validates its input before touching the database.
- Responses use one shape, `{ data }` on success and `{ error: { code, message } }` on failure.
- HTTP status codes follow the meaning, 400 for bad input, 404 for missing, 500 only for real server faults.
- Database access goes through `api/src/db.ts`, never straight from a route.
