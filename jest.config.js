const nodeModulesToTransform = [
  "node-fetch",
  "data-uri-to-buffer",
  "fetch-blob",
  "formdata-polyfill",
].join("|")

module.exports = {
  clearMocks: true,
  setupFiles: ["./jest.setup.js"],
  reporters: ["default", "github-actions"],
  setupFilesAfterEnv: ["./jest.setup.after-env.js"],
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(!(visual)).(spec|test).(js|ts|tsx)"],
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
    ".+\\.(png|jpg)$": "jest-transform-stub",
  },
  transformIgnorePatterns: [`node_modules/(?!(${nodeModulesToTransform})/)`],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
}
