module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["import", "@typescript-eslint"],
  ignorePatterns: [
    "node_modules/**",
    "storybook-static/**",
    ".next/**",
    "out/**",
    "dist/**",
  ],
  extends: ["plugin:prettier/recommended", "plugin:@next/next/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@next/next/no-html-link-for-pages": 0,
    "@next/next/no-img-element": 0,
    curly: ["error"],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: ["external", ["builtin", "parent", "sibling", "index"]],
      },
    ],
    "import/newline-after-import": ["error"],
    "import/no-duplicates": ["error"],
    "import/no-useless-path-segments": ["error"],
  },
};
