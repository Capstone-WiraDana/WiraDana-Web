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
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['prettier'],
    },
  ],
};
