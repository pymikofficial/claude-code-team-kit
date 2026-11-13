# Team Tasks, project memory for Claude Code

This file is shared with the whole team through git. Everyone who opens Claude Code in this repo gets the same rules.
Personal preferences do not go here. They go in each person's own ~/.claude/CLAUDE.md (see examples/user-CLAUDE.md).

## What this project is
A small task tracker for a business team. A React frontend in `frontend/`, a Node API in `api/`, tests in `tests/`.

## Commands
- Install: `npm install`
- Tests: `npm test` (Vitest)
- Lint: `npm run lint` (a TypeScript type check for now, there is no ESLint yet)

There is no app to run yet. The sample code exists so the rules have real files to apply to.
Run the tests and the linter before saying a change is done.

## How we work
- Small changes, one concern per commit.
- Commit messages in plain English, present tense, for example "Add due date to tasks".
- Never commit secrets. Keys live in `.env`, which is git-ignored.
- Ask before adding a new dependency.

## Coding standards
@docs/coding-standards.md

## Outside tools
- The project connects to Context7 through `.mcp.json`. Before writing code that depends on a library's API, look up the current docs with it instead of relying on memory.
- Never put keys or tokens in `.mcp.json`. It is shared through git.

## Where the other rules live
- Folder-specific rules sit in `.claude/rules/`. Each one loads only when Claude works on matching files.
- The API has its own `api/CLAUDE.md` for API-only conventions.
