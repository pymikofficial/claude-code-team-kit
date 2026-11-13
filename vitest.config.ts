import { defineConfig } from "vitest/config";

// globals: true lets the tests use test() and expect() without importing them.
export default defineConfig({
  test: {
    globals: true,
  },
});
