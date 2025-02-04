import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-console": "off", // Allows console logs
      "no-unused-vars": "warn", // Warnings instead of errors
      "@typescript-eslint/no-unused-vars": "warn", // Avoids blocking due to unused variables
      "react/no-unescaped-entities": "off", // Prevents issues with apostrophes in JSX
      "react/jsx-key": "warn", // Ensures missing keys don't block builds
    },
  },
];

export default eslintConfig;
