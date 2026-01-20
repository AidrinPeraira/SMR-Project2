import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: false },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true, // Enable type-aware linting
      },
    },
  },

  {
    ignores: [
      "**/node_modules",
      "**/dist/**",
      "**/build/**",
      "smr-frontend/**",
      "**/tests/**",
      "**/application.config.ts",
    ],
  },
);
