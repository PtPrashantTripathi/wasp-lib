import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // ✅ Typecheck during tests
    typecheck: {
      tsconfig: "./tsconfig.json",
    },
    // ✅ Coverage settings
    coverage: {
      reporter: ["text", "lcov", "json-summary", "json"], // 👈 json & json-summary needed for PR action
      reportsDirectory: "./coverage",
      thresholds: {
        lines: 80,       // Minimum % of lines covered
        functions: 80,   // Minimum % of functions covered
        branches: 70,    // Minimum % of branches covered
        statements: 80,  // Minimum % of statements covered
      },
    },
  },
});
