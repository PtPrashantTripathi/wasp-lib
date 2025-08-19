import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        // Enable type checking during tests
        typecheck: {
            tsconfig: "./tsconfig.json",
        },
        coverage: {
            reporter: ["text", "lcov"], // "lcov" zaruri hai GitHub upload ke liye
            reportsDirectory: "./coverage",
        },
    },
});
