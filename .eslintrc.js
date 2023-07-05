module.exports = {
  env: {
    browser: true,
    node: true,
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
    "import/no-unresolved": "off",
    "import/extensions": 0,
  },
};
