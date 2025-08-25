// eslint.config.js
import prettier from "eslint-config-prettier";
import unusedImports from "eslint-plugin-unused-imports";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default ts.config([
    globalIgnores(["dist", "node_modules", "docs/.vitepress/cache"]),
    {
        files: ["**/*.ts"],
        extends: [prettier, js.configs.recommended, ts.configs.recommended],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",

            globals: globals.browser,
        },

        plugins: {
            "unused-imports": unusedImports,
            "simple-import-sort": simpleImportSort,
        },

        rules: {
            // General rules
            "no-unused-vars": "off",
            "prefer-const": "error",
            "no-var": "error",
            "no-console": "warn",

            // TypeScript specific rules
            "@typescript-eslint/explicit-function-return-type": "error",
            "@typescript-eslint/no-explicit-any": "error",

            // Unused imports plugin
            "unused-imports/no-unused-imports": "warn",
            "unused-imports/no-unused-vars": [
                "warn",
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],

            // Import sorting
            "simple-import-sort/exports": "warn",
            "simple-import-sort/imports": [
                "warn",
                {
                    groups: [
                        // External packages
                        ["^@?\\w"],
                        // Internal packages
                        ["^(@|components)(/.*|$)"],
                        // Side effect imports
                        ["^\\u0000"],
                        // Parent imports
                        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
                        // Other relative imports
                        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
                        // Style imports
                        ["^.+\\.?(css)$"],
                    ],
                },
            ],

            // Code quality rules
            "object-shorthand": ["warn", "properties"],
            eqeqeq: ["error", "always", { null: "ignore" }],
            "lines-between-class-members": [
                "error",
                "always",
                { exceptAfterSingleLine: true },
            ],
            "spaced-comment": [
                "error",
                "always",
                {
                    line: {
                        markers: ["*package", "!", "/", ",", "="],
                    },
                    block: {
                        balanced: true,
                        markers: [
                            "*package",
                            "!",
                            ",",
                            ":",
                            "::",
                            "flow-include",
                        ],
                        exceptions: ["*"],
                    },
                },
            ],
            "symbol-description": "error",

            // Disable conflicting rules for Prettier
            "max-len": "off",
            quotes: "off",
            semi: "off",
        },
    },
]);
