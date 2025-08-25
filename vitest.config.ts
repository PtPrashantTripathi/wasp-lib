import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        typecheck: {
            tsconfig: "./tsconfig.json",
            enabled: true,
        },
        coverage: {
            reporter: ["text", "lcov", "json-summary", "json"],
            reportsDirectory: "./coverage",
            thresholds: {
                lines: 80, // Minimum % of lines covered
                functions: 80, // Minimum % of functions covered
                branches: 80, // Minimum % of branches covered
                statements: 80, // Minimum % of statements covered
            },
        },
    },
});
