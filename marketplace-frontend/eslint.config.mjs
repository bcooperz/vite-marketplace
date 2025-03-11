import reactCompiler from "eslint-plugin-react-compiler";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import eslintConfigPrettier from "eslint-config-prettier";
import parser from "@typescript-eslint/parser";
import eslintPluginReact from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslint from "@eslint/js";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    ignores: [
      "**/dist",
      "**/.eslintrc.cjs",
      "**/vite.config.ts",
      "**/eslint.config.mjs",
      "eslint.config.mjs",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
  },
  ...tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    tseslint.configs.stylisticTypeChecked,
    eslintPluginReact.configs.flat?.["recommended"] ?? {},
    eslintPluginReact.configs.flat?.["jsx-runtime"] ?? {},
    eslintConfigPrettier,
  ),

  {
    plugins: {
      "react-hooks": eslintPluginReactHooks,
    },
    rules: { ...eslintPluginReactHooks.configs.recommended.rules },
  },
  {
    plugins: {
      "react-refresh": reactRefresh,
      "react-compiler": reactCompiler,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },

      parser: parser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: ["./tsconfig.json", "./tsconfig.node.json"],
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],

      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "react-compiler/react-compiler": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
];
