module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'eslint:recommended',
    'plugin:react/jsx-runtime'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'linebreak-style': 0,
    quotes: [
      'error',
      'single',
      { avoidEscape: true }
    ],
    'max-len': [
      'warn',
      { code: 160, ignoreComments: true }
    ],
    'space-before-function-paren': [
      'error',
      'always'
    ],
    semi: ['error', 'always']
  }
};
