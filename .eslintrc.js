module.exports = { 
  env: { es2016: true, },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',

  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'no-shadow': ['error', { hoist: 'never' }],
  },
  ignorePatterns: ["dist/*"],
}
