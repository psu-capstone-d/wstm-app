module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['off'],
        'react-native/no-inline-styles': ['off'],
        'no-shadow': 'off',
        'no-undef': 'off',
        semi: 0,
        eqeqeq: 0,
      },
    },
    {
      files: ['*.js', '*.jsx'],
      rules: {
        semi: 0,
      },
    },
  ],
}
