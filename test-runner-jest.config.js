const { getJestConfig } = require('@storybook/test-runner')

const config = getJestConfig()

module.exports = {
  ...config,
  testEnvironmentOptions: {
    'jest-playwright': {
      browsers: ['chromium'],
    },
  },
  setupFilesAfterEnv: ['<rootDir>/test-runner-setup.js'],
}
