'use strict';

const devDepsRule = {
  'import/no-extraneous-dependencies': [2, {
    devDependencies: true,
  }],
};

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
      rules: {
        'react/jsx-props-no-spreading': 0,
        'react/require-default-props': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-no-bind': 0,
        'import/prefer-default-export': 0,
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
        ...devDepsRule,
        strict: [2, 'global'],
      },
    },
    {
      files: [
        '**/__tests__/**',
        '**/__mocks__/**',
        '**/_test-utils.ts',
        '**/_test-utils.tsx',
      ],
      extends: [
        'plugin:import/typescript',
        'airbnb',
        'airbnb-typescript',
        'plugin:jest/recommended',
        'plugin:jest-dom/recommended',
      ],
      plugins: [
        'jest',
        'jest-dom',
      ],
      env: {
        'jest/globals': true,
      },
      rules: {
        ...devDepsRule,
        'react/require-default-props': 0,
        'import/prefer-default-export': 0,
      },
    },
    {
      files: [
        'forge.config.ts',
        'webpack.plugins.ts',
      ],
      rules: {
        ...devDepsRule,
      },
    },
  ],
};
