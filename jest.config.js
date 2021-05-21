module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': require.resolve('ts-jest')
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironment: 'jest-environment-jsdom-fifteen',
  testMatch: ['**/tests/unit/**/*.spec.ts', '**/__tests__/*.ts']
}
