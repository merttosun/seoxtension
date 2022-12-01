module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(spec|test).ts", "**/?(*.)+(spec|test).tsx"],
  modulePathIgnorePatterns: ["<rootDir>/dist"],
  collectCoverage: true,
  coveragePathIgnorePatterns: ["<rootDir>/dist"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testPathIgnorePatterns: ["test-container"],
  coverageReporters: ["json", "lcov", "text", "cobertura", "text-summary"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleDirectories: ["node_modules", "src"],
  collectCoverageFrom: ["src/**/*.{ts,js,jsx,tsx}"],
  globals: {
    "ts-jest": {
      tsConfigFile: "tsconfig.json",
      enableTsDiagnostics: true,
      babelConfig: true,
    },
  },
  setupFiles: ["./jest.setup.js"],
  transform: {
    ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
  },
};
