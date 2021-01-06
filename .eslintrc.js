module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["plugin:@typescript-eslint/recommended", "prettier/@typescript-eslint", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {
    import: {
      parsers: {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
  },
  rules: {
    "no-useless-concat": "error",
    "prefer-template": "error",
    "no-nested-ternary": "error",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true }],
  },
}
