/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    BigInt: 'readonly'
  },
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/multi-word-component-names': 'off'
  },
  extends: ['plugin:vue/vue3-recommended', 'eslint:recommended', '@vue/eslint-config-typescript/recommended', '@vue/eslint-config-prettier']
}
