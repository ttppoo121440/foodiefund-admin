module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
  ],
  plugins: ['react', '@typescript-eslint', 'tailwindcss'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    tailwindcss: {
      config: 'tailwind.config.js',
    },
  },
};
