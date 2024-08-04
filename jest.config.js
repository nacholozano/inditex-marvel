/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  roots: ['src'],
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  moduleNameMapper: { '\\.(css)$': '<rootDir>/src/ui/__mocks__/styleMock.js' },
}
