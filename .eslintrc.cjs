module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['**/dist/**', '**/node_modules/**'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-useless-escape': 'off',
    'prefer-rest-params': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.ts', '**/*.test.tsx'],
      env: {
        node: true,
      },
    },
  ],
};
