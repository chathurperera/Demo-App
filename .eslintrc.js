module.exports = {
  root: true,
  extends: ['airbnb-typescript', 'prettier/react'],
  plugins: ['import'],
  ignorePatterns: ['!**/*', 'public', '.cache', 'node_modules'],
  rules: {
    'react/jsx-filename-extension': 'off',
    '@typescript-eslint/object-curly-spacing': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        json: 'never',
      },
    ],
  },
  parserOptions: {
    project: './tsconfig.json',
  },
};
