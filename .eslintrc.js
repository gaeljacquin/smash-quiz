module.exports = {
  extends: 'plugin:prettier/recommended',
  rules: {
    // enable additional rules
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'comma-dangle': ['error', 'never'],

    // override configuration set by extending "eslint:recommended"
    'no-empty': 'warn',
    'no-cond-assign': ['error', 'always'],

    // disable rules from base configurations
    'for-direction': 'off'
  }
}
