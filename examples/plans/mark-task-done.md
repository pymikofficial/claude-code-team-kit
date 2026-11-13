# Plan: mark a task as done from the task list

> Written by Claude Code in plan mode on 13 Nov 2026, in answer to the request below. Kept as written, nothing from it has been built.
> It was written before the kit had a test setup, so it still says the repo has no package.json. That gap is now closed, see `package.json`.
>
> Request: "Let users mark a task as done from the task list. It should work end to end, from the button down to the database, with tests."
>
> Before writing it, Claude asked two questions.
> 1. The repo has no package.json, so nothing can run tests yet. Which setup should I plan for? Answer, Vitest + React Testing Library.
> 2. The API has no HTTP server. How should the button reach the API? Answer, plain function calls.

## Context

Users can see tasks in TaskList but cannot change them. We want a "Mark done" button on each open task that goes all the way down: button → frontend client → API route → in-memory database, with tests at every layer.

The repo has no package.json today, so no test can run. That includes the 400 test added last turn, which is still uncommitted in tests/tasks.test.ts. Choices the user has made:
- Tooling: add Vitest + React Testing Library (new dependencies approved).
- Transport: plain function calls, with no HTTP server. The frontend client calls the route function directly, the same way getTaskRoute is used today.

Rules that apply: api/CLAUDE.md (validate input before the DB, `{ data }` / `{ error: { code, message } }`, 400/404 meanings, DB access only through db.ts), .claude/rules/frontend.md (accessible labels, loading and error states, one component per file), .claude/rules/tests.md (one behaviour per test, sentence names, arrange/act/assert, in-memory fakes), coding standards (strict TS, functions under ~40 lines, no swallowed errors). CLAUDE.md also says to check current docs with Context7 before writing library code, so look up Vitest config (globals, per-file jsdom environment) and RTL/user-event usage first.

## Steps

### 1. Tooling (new files at the repo root)

- package.json. devDependencies: typescript, vitest, jsdom, @testing-library/react, @testing-library/user-event, @testing-library/jest-dom, @types/react, @types/react-dom. dependencies: react, react-dom. Scripts:
  - `"test": "vitest run"`
  - `"lint": "tsc --noEmit"`. This is a type check only. The repo has no ESLint config, and adding ESLint would be a separate dependency decision, so flag that to the user rather than add it silently.
  - Leave out npm run dev. There is no app shell to run, so say so.
- tsconfig.json: strict: true, jsx: "react-jsx", module: "esnext", moduleResolution: "bundler", types: ["vitest/globals", "@testing-library/jest-dom"], include api, frontend, tests.
- vitest.config.ts: globals: true, so the existing test()/expect() tests work unchanged, and a setup file importing @testing-library/jest-dom/vitest. Default environment node. The component test opts into jsdom with `// @vitest-environment jsdom`.

### 2. Database: api/src/db.ts

- Export the Task type.
- Keep seed data in a seedTasks constant, with tasks as a deep copy of it.
- Add markTaskDone(id: string): Promise<Task | undefined>. It finds the task, sets done = true and returns it, or returns undefined if missing. It is idempotent.
- Add resetTasks(): void, which restores the copy from the seed so tests don't leak state into each other.

### 3. Route: api/src/tasks.ts

- Add markTaskDoneRoute(id: string), following getTaskRoute:
  - empty id → 400 `{ error: { code: "bad_input", message: "Task id is required" } }`, before touching the DB
  - markTaskDone returns undefined → 404 `{ error: { code: "not_found", message: "Task not found" } }`
  - otherwise → 200 `{ data: task }`

### 4. Frontend client: frontend/src/taskClient.ts (new)

- markTaskDone(id: string): Promise<Task> calls markTaskDoneRoute from ../../api/src/tasks. On status 200 it returns body.data. Otherwise it throws new Error(body.error.message), so the caller always sees the reason. Nothing is swallowed.

### 5. Components

- frontend/src/TaskItem.tsx (new, one component per file). Props: task and onMarkDone(id): Promise<void>.
  - Open task: a ``<button aria-label={`Mark "${task.title}" as done`}>Mark done</button>``.
  - While the call is pending: the button is disabled and reads "Saving…". This is the loading state.
  - On failure: `<p role="alert">Could not mark "{title}" as done: {message}</p>`, and the button is enabled again. This is the error state.
  - Done task: shows "Done, {title}" with no button. Marking done is one-way, and there is no undo in this change.
- frontend/src/TaskList.tsx:
  - Props become `{ tasks, markTaskDone = taskClient.markTaskDone }`. Injecting the client keeps the default wired to the real API and lets tests pass a failing or slow fake.
  - Hold tasks in useState initialised from props. handleMarkDone(id) awaits markTaskDone(id) and then replaces that task in state with the returned one.
  - Render TaskItem per task, and keep the existing "No tasks yet." empty state.

### 6. Tests

- tests/tasks.test.ts (extend the file, beforeEach(resetTasks)):
  - keep "returns 404 when the task does not exist" and "returns 400 when the task id is empty"
  - "markTaskDoneRoute returns 400 when the task id is empty"
  - "markTaskDoneRoute returns 404 when the task does not exist"
  - "markTaskDoneRoute returns the task marked as done"
  - "a task marked as done stays done when fetched again" (calls getTaskRoute afterwards)
- tests/taskClient.test.ts:
  - "resolves with the task marked as done"
  - "throws the API error message when the task does not exist"
- tests/TaskList.test.tsx (jsdom, RTL + user-event, beforeEach(resetTasks)):
  - "marks a task as done end to end when its button is clicked". Uses the default client, so it goes through the real route and the in-memory DB. It asserts that "Done" shows and the button is gone, then confirms getTaskRoute("1") returns done: true.
  - "shows a saving state while the request is pending". Uses an injected promise that hasn't resolved yet.
  - "shows an error and re-enables the button when marking done fails"
  - "does not show a mark done button for tasks already done"

## Suggested commits (only when the user asks)

1. "Add Vitest and TypeScript config so tests can run". Includes last turn's 400 test.
2. "Add mark task done to the API"
3. "Add a mark done button to the task list"

## Verification

- npm install
- npm test: all suites pass, including the end-to-end TaskList test that hits the real route and DB.
- npm run lint (tsc --noEmit): no type errors under strict mode.
- Run /review-change to check the diff against the team rules before committing.
