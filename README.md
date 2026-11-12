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

## What is inside (part 2), a saved shortcut

| Piece | File | What it does |
|---|---|---|
| Skill | `.claude/skills/review-change/SKILL.md` | Type `/review-change` and Claude reviews your uncommitted changes against the team rules |
| Practice file | `examples/practice/TaskList.bad.tsx` | A change that breaks two rules on purpose, so you can watch the skill catch them |

Three lines at the top of the skill file do the important work.

- `context: fork` runs the review in a separate helper, so the long review does not fill up your main conversation.
- `agent: Explore` picks a read-only helper for the job.
- `allowed-tools` lists the few tools the review may use without asking each time. Reading files and two git commands, nothing else.

### Try the skill
1. Inside Claude Code, type `! cp examples/practice/TaskList.bad.tsx frontend/src/TaskList.tsx`
2. Type `/review-change`
3. Read the findings. It should flag a button with no accessible label and a line of commented-out code.
4. Put the original back with `! git checkout frontend/src/TaskList.tsx`

## Keeping what Claude learns
The CLAUDE.md files and the rules travel with the repo. Auto memory stays on each person's machine.
Treat auto memory as a local staging area. Leave personal habits and machine quirks there. When Claude learns something true for the whole project, such as an API edge case or a test convention, move it into `CLAUDE.md` or `.claude/rules/` through a pull request so the team can review it.
Credit for this rule goes to Sarvesh Talele, from a LinkedIn comment thread.

## What is inside (part 3), an outside tool

| Piece | File | What it does |
|---|---|---|
| Project MCP config | `.mcp.json` | Connects everyone on the team to Context7, a service that returns current library docs |
| Team rule | `CLAUDE.md`, section Outside tools | Tells Claude to check current docs before writing library code, and keeps keys out of the shared file |

`.mcp.json` sits in the repo, so the whole team gets the same tool. Claude Code asks each person to approve it the first time, because a shared file should not switch on outside tools silently.

### Try it
1. Start `claude` in this folder and approve the `context7` server when asked.
2. Type `/mcp` and check that `context7` shows as connected.
3. Ask, `Use context7 to check the current React docs on keys in lists, then tell me whether frontend/src/TaskList.tsx follows them.`

### Before you add a server
- Add only servers the team has checked. A tool in `.mcp.json` runs for everyone who approves it.
- Keys never go in `.mcp.json`. If a server needs one, each person adds it in their own local config.

## Coming next
A plan mode test on three task sizes.
