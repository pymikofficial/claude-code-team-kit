# Claude Code team kit

A starter kit that shows how a team sets up Claude Code so everyone gets the same behaviour, with personal settings kept separate.
Built in public as part of the Claude Architect Log. Independent study notes, not affiliated with Anthropic.

## What is inside (part 1)

| Layer | File | Who it applies to |
|---|---|---|
| Personal | `~/.claude/CLAUDE.md` (sample in `examples/user-CLAUDE.md`) | Only you, in every project |
| Project | `CLAUDE.md` | The whole team, shared through git |
| Imported standards | `docs/coding-standards.md`, pulled in with `@docs/coding-standards.md` | The whole team |
| Folder | `api/CLAUDE.md` | Anyone working inside `api/` |
| Path rules | `.claude/rules/frontend.md`, `.claude/rules/tests.md` | Loaded only for matching files |

The small sample app in `api/`, `frontend/` and `tests/` exists only so the rules have real files to apply to.

## Try it
1. Clone the repo and open it in a terminal.
2. Run `claude`.
3. Type `/memory` to see which memory files Claude Code loaded.
4. Ask Claude to edit `frontend/src/TaskList.tsx` and watch the frontend rules apply.

## Coming next
Skills, MCP setup and a plan mode test on three task sizes.
