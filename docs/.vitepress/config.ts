import { defineConfig } from "vitepress";

export default defineConfig({
    title: "wasp-lib",
    description:
        "Web Assembly Safe Pointers - Type-safe WebAssembly memory management",
    base: ".",
    head: [
        [
            "link",
            {
                rel: "icon",
                href: "https://raw.githubusercontent.com/PtPrashantTripathi/wasp-lib/refs/heads/main/logo/wasp_lib.ico",
            },
        ],
        ["meta", { name: "theme-color", content: "#ffcc02" }],
        ["meta", { property: "og:type", content: "website" }],
        ["meta", { property: "og:locale", content: "en" }],
        [
            "meta",
            {
                property: "og:title",
                content: "WASP-Lib | WebAssembly Safe Pointers",
            },
        ],
        ["meta", { property: "og:site_name", content: "WASP-Lib" }],
        [
            "meta",
            {
                property: "og:url",
                content: "https://ptprashanttripathi.github.io/wasp-lib/",
            },
        ],
    ],

    themeConfig: {
        logo: "logo/wasp_lib.png",

        nav: [
            { text: "Guide", link: "/guide/introduction" },
            { text: "API Reference", link: "/api/pointers" },
            { text: "Examples", link: "/examples/use-cases" },
            {
                text: "v2.0.0",
                items: [
                    // { text: "Changelog", link: "/changelog" },
                    { text: "Contributing", link: "/community/contributing" },
                ],
            },
        ],

        sidebar: {
            "/guide/": [
                {
                    text: "Guide",
                    items: [
                        { text: "Introduction", link: "/guide/introduction" },
                        {
                            text: "Getting Started",
                            link: "/guide/getting-started",
                        },
                        {
                            text: "Error Handling",
                            link: "/guide/error-handling",
                        },
                        {
                            text: "Performance Tips",
                            link: "/guide/performance",
                        },
                    ],
                },
            ],
            "/api/": [
                {
                    text: "API Reference",
                    items: [
                        { text: "Pointer Classes", link: "/api/pointers" },
                        { text: "Utility Classes", link: "/api/utilities" },
                        { text: "Type Definitions", link: "/api/types" },
                    ],
                },
            ],
            "/examples/": [
                {
                    text: "Examples",
                    items: [
                        {
                            text: "Common Use Cases",
                            link: "/examples/use-cases",
                        },
                        {
                            text: "Advanced Examples",
                            link: "/examples/advanced",
                        },
                    ],
                },
            ],
        },

        socialLinks: [
            {
                icon: "github",
                link: "https://github.com/ptprashanttripathi/wasp-lib",
            },
        ],

        footer: {
            message: "Released under the MIT License.",
            copyright:
                'Copyright © 2025 <a href="https://github.com/ptprashanttripathi">Pt. Prashant Tripathi</a>',
        },
        search: {
            provider: "local",
        },
    },

    markdown: {
        theme: {
            light: "github-light",
            dark: "github-dark",
        },
        lineNumbers: true,
    },
});
