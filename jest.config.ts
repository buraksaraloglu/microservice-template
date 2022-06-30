export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
  modulePaths: ['<rootDir>/src/', '<rootDir>/test/']
};
