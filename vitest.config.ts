import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    typecheck: {
      tsconfig: "./tsconfig.json",
    },
    coverage: {
      reporter: ["text", "lcov", "json-summary"], // add json-summary for PR report
      reportsDirectory: "./coverage",
    },
  },
});
