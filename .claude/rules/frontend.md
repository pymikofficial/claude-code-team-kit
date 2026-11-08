---
paths:
  - "frontend/**/*.{ts,tsx}"
---

# Frontend rules

These load only when Claude reads or edits files under `frontend/`.

- Function components and hooks only, no class components.
- One component per file, file name matches the component name.
- Every button and input has an accessible label.
- Show a loading state and an error state for every data fetch.
