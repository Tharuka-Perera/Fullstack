module.exports = {
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

  testMatch: ["<rootDir>/src/**/*.test.{js,jsx}"],
}