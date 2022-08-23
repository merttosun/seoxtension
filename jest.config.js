module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // moduleNameMapper: {
    //   '^.+\\.(css|less|scss)$': 'babel-jest'
    // },
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/!(*.spec).{ts,tsx}',
      '!src/Main.ts',
      '!src/application/Application.ts',
      '!src/**/fragment/hydrate.tsx',
      '!src/**/fragment/webpack.config.ts',
      '!src/**/*Config.ts',
      '!src/**/*Module.ts',
      '!dev/**',
      '!**/node_modules/**',
      '!src/**/__snapshots__'
    ],
    testPathIgnorePatterns: ['test-container']
  };
  