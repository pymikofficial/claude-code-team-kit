---
name: review-change
description: Review the uncommitted changes in this repo against the team's coding standards and rule files, without editing anything. Use before a commit.
argument-hint: "[optional file or folder to limit the review]"
context: fork
agent: Explore
allowed-tools: Read, Grep, Glob, Bash(git status *), Bash(git diff *)
---

Review the uncommitted changes in this repository. Do not edit, create or delete any file.

Scope: $ARGUMENTS
If no scope is given, review every changed file.

## Steps

1. Run `git status --short` and `git diff HEAD` to see what changed.
2. Read `docs/coding-standards.md`.
3. For each changed file, read the rule file that covers it.
   - Files under `frontend/` are covered by `.claude/rules/frontend.md`.
   - Test files are covered by `.claude/rules/tests.md`.
   - Files under `api/` are covered by `api/CLAUDE.md`.
4. Check every change against those rules.

## Report

Reply in this shape and keep it under 20 lines.

- Verdict. Either "Ready to commit" or "Needs changes".
- Findings. One line each, with the file, the line, the rule it breaks and a suggested fix.
- Rules checked. The rule files you read.
