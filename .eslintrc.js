const commmonRules = {
  curly: ["error", "all"],
  eqeqeq: ["error", "smart"],
  "import/extensions": [
    "error",
    "never",
    {
      json: "always",
      svg: "always",
    },
  ],
  "prefer-regex-literals": ["error", { disallowRedundantWrapping: false }],
  "import/order": [
    "error",
    {
      groups: [
        ["external", "builtin"],
        "internal",
        ["parent", "sibling", "index"],
      ],
    },
  ],
  "sort-imports": [
    "error",
    {
      ignoreCase: true,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
    },
  ],
  "no-void": ["error", { allowAsStatement: true }], // This allows us to write `void myAsyncFunction()`
  "no-console": "error",
  "no-catch-shadow": "off",
  "global-require": "off",
  "react/display-name": "warn",
  "react/jsx-uses-react": "off",
  "react/react-in-jsx-scope": "off",
  "react/no-unstable-nested-components": ["warn", { allowAsProps: true }],
  "react/no-string-refs": "warn",
  "react/prop-types": "off",
  "react/no-unescaped-entities": "off",
  "react/function-component-definition": [
    "error",
    { namedComponents: "arrow-function" },
  ],
  "react-hooks/rules-of-hooks": "error",
  "react-hooks/exhaustive-deps": "warn",
  "react/jsx-props-no-spreading": "off",
  "react/jsx-filename-extension": ["error", { extensions: [".jsx", ".tsx"] }],
  "react/jsx-boolean-value": "error",
  "import/prefer-default-export": "off",
  "react/require-default-props": "off", // does not play well with typescript
  "react/style-prop-object": [
    "error",
    {
      allow: ["StatusBar"],
    },
  ],
  "no-useless-return": "off", // clashes with tsconfig.noImplicitReturns
  "eslint-comments/no-unused-enable": "off",
  "no-param-reassign": "off",
  "max-classes-per-file": "off",
}

module.exports = {
  extends: [
    "airbnb",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals",
    "plugin:prettier/recommended",
  ],
  plugins: ["jsx-a11y", "import"],
  env: {
    "jest/globals": true,
    es6: true,
  },
  settings: {
    react: { version: "detect" },
    "import/parsers": { "@typescript-eslint/parser": [".ts", ".tsx"] },
    "import/resolver": { typescript: {} },
  },
  rules: commmonRules,
  overrides: [
    {
      // Typescript
      files: ["**/*.ts?(x)"],
      excludedFiles: ["**/*.{test,spec}.ts?(x)", "**/test-utils/**"],
      extends: [
        "airbnb-typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: "./tsconfig.json",
      },
      plugins: ["jsx-falsy"],
      rules: {
        ...commmonRules,
        "no-shadow": "off", // Overriden by @typescript-eslint/no-shadow
        "no-use-before-define": "off", // Overriden by @typescript-eslint/no-use-before-define
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
        "@typescript-eslint/no-unnecessary-type-arguments": "error",
        "@typescript-eslint/prefer-string-starts-ends-with": "error",
        "@typescript-eslint/switch-exhaustiveness-check": "error",
        "@typescript-eslint/unified-signatures": "error",
        "@typescript-eslint/no-misused-promises": [
          "error",
          { checksVoidReturn: false },
        ],
        "@typescript-eslint/no-unused-vars": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/quotes": "off", // clashes with Prettier
        "@typescript-eslint/semi": "off", // clashes with Prettier
        "@typescript-eslint/comma-dangle": "off", // clashes with Prettier
        "@typescript-eslint/no-extra-semi": "off", // clashes with Prettier
        "@typescript-eslint/no-unnecessary-condition": "off", // the autofix is causing regressions
        "@typescript-eslint/no-use-before-define": [
          "error",
          { functions: true, classes: true, variables: false },
        ], // disable for variables to follow convention of declaring StyleSheet.create below a component
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/prefer-optional-chain": "error",
        "import/no-default-export": "off",
        "import/no-cycle": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-case-declarations": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "react/jsx-no-useless-fragment": "off",
        "react/function-component-definition": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-throw-literal": "off",
        "no-await-in-loop": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-shadow": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "import/no-named-as-default": "off",
        "react/no-array-index-key": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "jsx-falsy/no-falsy-and": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "react/jsx-no-bind": "off",
        "import/no-extraneous-dependencies": "off",
        "@typescript-eslint/unbound-method": "off",
        "react/jsx-no-constructed-context-values": "off",
        "jsx-a11y/label-has-associated-control": "off",
      },
    },
    {
      // Tests
      files: [
        "**/*.{test,spec}.{js,jsx,ts,tsx}",
        "**/test-utils/**",
        "jest.*.{js,ts}",
      ],
      extends: [
        "plugin:jest-formatting/strict",
        "plugin:jest/recommended",
        "plugin:jest/style",
        "plugin:testing-library/react",
      ],
      plugins: ["jest", "jest-formatting", "testing-library"],
      rules: {
        ...commmonRules,
        "no-console": "off",
        "global-require": "off",
        "no-restricted-imports": "off",
        "jest/consistent-test-it": ["error", { fn: "it" }],
        "jest/prefer-lowercase-title": ["error", { ignore: ["describe"] }],
        "jest/require-top-level-describe": "error",
        "jest/no-standalone-expect": "off",
        "react/jsx-no-constructed-context-values": "off",
        "react/display-name": "off",
      },
    },
  ],
}
