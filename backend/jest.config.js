// jest.config.js
module.exports = {
  // Test environment
  testEnvironment: 'node',
  
  // Setup test environment
  setupFilesAfterEnv: ['./tests/setup.js'],
  
  // Configure environment variables for tests
  testEnvironmentOptions: {
    NODE_ENV: 'test'
  },
  
  // Patterns to match test files
  testMatch: ['**/tests/**/*.test.js'],
  
  // Increase timeout if needed for slow tests
  testTimeout: 30000,
  
  // Force exit after tests complete
  forceExit: true,
  
  // Detect open handles (like server connections)
  detectOpenHandles: true
};