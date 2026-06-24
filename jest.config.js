module.exports = {
  "testEnvironment": "jsdom",
  "setupFiles": ["<rootDir>/tests/setupTests.js"],
  "setupFilesAfterEnv": ['./node_modules/jest-enzyme/lib/index.js'],
  "modulePathIgnorePatterns": ["<rootDir>/tests/legacy"],
};
