import js from "@eslint/js";
import globals, { node } from "globals";
import { defineConfig } from "eslint/config";

const env = {
  node: true,
}

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser }, env },
]);