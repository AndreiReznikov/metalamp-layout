module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jquery: true,
  },
  globals: {
    NodeJS: true,
    JQuery: true,
    $: 'readonly',
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:fsd/all',
  ],
  plugins: [
    'fsd',
    'pug',
  ],
  rules: {
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'no-underscore-dangle': 0,
  },
};
