module.exports = {
  clearMocks: true,
  setupFiles: ["./jest.setup.js"],
  reporters: ["default", "github-actions"],
  setupFilesAfterEnv: ["./jest.setup.after-env.js"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
    ".+\\.(png|jpg)$": "jest-transform-stub",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
}
