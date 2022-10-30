import type { JestConfigWithTsJest } from 'ts-jest';
import { jsWithTs } from 'ts-jest/presets';

const config: JestConfigWithTsJest = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage/unit',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'ts'],

  preset: '@shelf/jest-mongodb',

  roots: ['<rootDir>/src', '<rootDir>/tests'],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    ...jsWithTs.transform,
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;
