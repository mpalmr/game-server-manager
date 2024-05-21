'use strict';

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  clearMocks: true,
  testMatch: [
    '**/__tests__/*.test.ts',
    '**/__tests__/*.test.tsx',
  ],
  transform: {
    '^.*\\.tsx?$': [
      'ts-jest',
    ],
  },
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
  ],
};
