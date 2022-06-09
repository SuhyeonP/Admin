module.exports = {
  plugins: ['stylelint-order', 'stylelint-config-rational-order/plugin'],
  extends: ['stylelint-config-rational-order'],
  rules: {
    ['plugin/rational-order']: [
      true,
      {
        'border-in-box-model': true,
        'empty-line-between-groups': true,
      },
    ],
    'function-comma-space-after': 'always',
    'declaration-colon-space-before': 'never',
    'function-calc-no-unspaced-operator': true,
  },
};
