'use strict';

module.exports = {
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      env: {
        browser: true,
        es6: true,
        node: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'airbnb',
        'airbnb-typescript',
        'plugin:import/electron',
      ],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    {
      files: ['*.js'],
      env: {
        es6: true,
        node: true,
      },
      extends: [
        'airbnb',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: [2, 'global'],
      },
    },
  ],
};
