// scribble-ui flat ESLint config (ESLint 9 / typescript-eslint 8)
// Covers packages/* and apps/* TypeScript + React sources.
// Intentionally conservative: keeps the tree green at first introduction;
// strictness can be raised in follow-up commits.

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import globals from "globals";

export default [
  // 1. Ignore generated / vendor / internal-workspace dirs.
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/out/**",
      "**/.next/**",
      "**/.next-e2e/**",
      "**/.turbo/**",
      "**/coverage/**",
      "**/*.tsbuildinfo",
      "apps/e2e/test-results/**",
      "apps/e2e/playwright-report/**",
      "apps/e2e/blob-report/**",
      "apps/e2e/.playwright/**",
      // Local-only AI/IDE workspaces (also gitignored).
      ".workbuddy/**",
      ".codebuddy/**",
      ".claude/**",
      ".cursor/**",
    ],
  },

  // 2. Base recommended rule sets.
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Project-wide language options + React settings.
  {
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
    settings: {
      react: { version: "detect" },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      // React 17+ JSX transform: no need to import React in scope.
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      // We use TypeScript for prop typing.
      "react/prop-types": "off",
      // JSX hygiene.
      "react/jsx-uses-vars": "error",
      "react/jsx-key": "error",
      "react/no-unknown-property": "error",

      // Hooks correctness — keep as warn for now; tighten later.
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // a11y — pragmatic baseline.
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-role": "error",
      "jsx-a11y/role-has-required-aria-props": "error",

      // TS — pragmatic baseline (no `any` is a warn, not an error).
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        { "ts-expect-error": "allow-with-description" },
      ],

      // Core JS — defer unused-vars to the TS variant above.
      "no-unused-vars": "off",
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  // 4. Tests: relax a few rules that are noisy in test code.
  {
    files: [
      "packages/*/test/**/*.{ts,tsx}",
      "packages/*/src/**/*.test.{ts,tsx}",
      "apps/e2e/**/*.{ts,tsx}",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },

  // 5. Config / build files: allow Node globals + CommonJS.
  {
    files: [
      "**/*.config.{js,mjs,cjs,ts}",
      "**/tsup.config.ts",
      "**/vitest.config.ts",
      "**/playwright.config.ts",
      "**/next.config.{js,mjs,ts}",
    ],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "no-console": "off",
    },
  },
];
