import { resolve } from "node:path";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "WaspLib",
            fileName: format => {
                switch (format) {
                    case "cjs":
                        return "index.cjs";
                    case "es":
                        return "index.mjs";
                    default:
                        return `index.${format}.js`;
                }
            },
            formats: ["es", "cjs", "umd"],
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {},
            },
        },
        minify: true,
        sourcemap: true,
        target: "es2020",
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            outDir: "dist",
            include: ["src/**/*"],
            exclude: ["test/**/*", "docs/**/*"],
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
});
