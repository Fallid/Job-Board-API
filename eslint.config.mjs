import js from "@eslint/js";
import globals from "globals";
import stylistic from '@stylistic/eslint-plugin';
import lintCommonJsConfig from '@fallid/eslint-commonjs-config';
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.commonjs } } },
  {
    files: ["**/*.js"],
    ignores: ["migrations/**/*.js"],
    plugins: { "@stylistic": stylistic },
    languageOptions: { sourceType: "commonjs" },
    rules: {
      ...lintCommonJsConfig
    }
  },
  {
    files: ["migrations/**/*.mjs"],
    plugins: { "@stylistic": stylistic },
    languageOptions: { sourceType: 'module' },
    rules: {
      // Migration files use ES modules, no CommonJS rules applied
    }
  }
]);
