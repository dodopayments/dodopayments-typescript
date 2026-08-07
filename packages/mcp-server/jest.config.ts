import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    // `.cts` is not matched by the pattern below and swc infers plain JS from the extension,
    // so it needs an explicit TypeScript parser.
    '^.+\\.[cm]ts$': [
      '@swc/jest',
      { sourceMaps: 'inline', jsc: { parser: { syntax: 'typescript' } }, module: { type: 'commonjs' } },
    ],
    '^.+\\.(t|j)sx?$': ['@swc/jest', { sourceMaps: 'inline' }],
  },
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'mts', 'cts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '^dodopayments-mcp$': '<rootDir>/src/index.ts',
    '^dodopayments-mcp/(.*)$': '<rootDir>/src/$1',
    // Mirror the TypeScript `.cjs` -> `.cts` extension substitution that `moduleResolution:
    // node` performs at compile time, so the CommonJS shim is reachable from tests. Scoped to
    // this one module so it cannot rewrite `.cjs` specifiers inside third-party packages.
    'code-tool-paths\\.cjs$': '<rootDir>/src/code-tool-paths.cts',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  testPathIgnorePatterns: ['scripts'],
};

export default config;
