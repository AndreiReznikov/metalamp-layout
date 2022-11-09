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
    'airbnb/hooks',
  ],
  plugins: [
    'pug',
  ],
  rules: {
    'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
    'no-underscore-dangle': ['error', {
      enforceInMethodNames: false,
      enforceInClassFields: false,
      allowAfterThisConstructor: false,
      allowAfterThis: true,
    }],
  },
};
