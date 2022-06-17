module.exports = {
  env: {
    browser: true,
    node: true,
  },
  plugins: [
    '@typescript-eslint',
    'react-hooks',
    'jest',
    'prettier',
    'react',
    'prettier',
    'import',
    'jsx-a11y',
    'import',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
  },
  rules: {
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'none' }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-use-before-define': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-var': 'off',
    '@typescript-eslint/quotes': [
      'warn',
      'single',
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    'import/order': 'error',
    curly: ['error', 'all'],
    eqeqeq: 'error',
    'prefer-arrow-callback': 'error',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
