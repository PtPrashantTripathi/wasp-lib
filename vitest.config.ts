import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        typecheck: {
            tsconfig: "./tsconfig.json",
        },
        coverage: {
            reporter: ["text", "lcov", "json-summary", "json"],
            reportsDirectory: "./coverage",
            thresholds: {
                lines: 80, // Minimum % of lines covered
                functions: 80, // Minimum % of functions covered
                branches: 70, // Minimum % of branches covered
                statements: 80, // Minimum % of statements covered
            },
        },
    },
});
