import mockFs from 'mock-fs';
import { clear } from 'jest-date-mock';

afterEach(() => {
  mockFs.restore();
  clear();
});
