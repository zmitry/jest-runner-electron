// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  globals: {
    __REACT_DEVTOOLS_GLOBAL_HOOK__: false,
    ELECTRON_DISABLE_SECURITY_WARNINGS: false
  },
  runner: "../../runner.js",
  testEnvironment: "../../env.js"
};
