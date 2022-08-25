module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/?(*.)+(spec|test).ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist'],
    collectCoverage: true,
    coveragePathIgnorePatterns: [
        '<rootDir>/dist',
    ],
    testPathIgnorePatterns: ['test-container'],
    coverageReporters: ['json', 'lcov', 'text', 'cobertura', 'text-summary'],
    moduleDirectories: ['node_modules', 'src'],
    collectCoverageFrom: ['src/**/*.{ts,js,jsx}'],
    globals: {
        "ts-jest": {
            "tsConfigFile": "tsconfig.json",
            "enableTsDiagnostics": true
        }
    },
    setupFiles: ['./jest.setup.js']
};
  