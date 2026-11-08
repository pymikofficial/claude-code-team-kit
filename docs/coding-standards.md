# Coding standards

Imported into the project CLAUDE.md with `@docs/coding-standards.md`, so it stays one file the team edits in one place.

- TypeScript everywhere, `strict` mode on.
- Names say what a thing is. `dueDate`, not `d`.
- Functions do one job and stay under about 40 lines.
- Handle errors where they happen and return a clear message. Never swallow an error silently.
- No commented-out code in commits.
