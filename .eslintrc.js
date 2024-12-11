/* eslint-env node */
module.exports = {
  root: true,
  plugins: ['tailwindcss'],
  extends: [
    'next/core-web-vitals',
    'next/typescript',
    'plugin:tailwindcss/recommended',
  ],
  rules: {
    'tailwindcss/classnames-order': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-var': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['prettier'],
    },
  ],
};
