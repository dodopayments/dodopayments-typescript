import { parseCLIOptions } from '../src/options';

// yargs 18 is ESM-only. Jest's CommonJS module loader cannot `require()` ES modules, so load
// the real yargs through Node's native loader instead, which supports `require(esm)`.
jest.mock('yargs', () => process.getBuiltinModule('node:module').createRequire(__filename)('yargs'));
jest.mock('yargs/helpers', () =>
  process.getBuiltinModule('node:module').createRequire(__filename)('yargs/helpers'),
);

// Mock process.argv
const mockArgv = (args: string[]) => {
  const originalArgv = process.argv;
  process.argv = ['node', 'test.js', ...args];
  return () => {
    process.argv = originalArgv;
  };
};

describe('parseCLIOptions', () => {
  it('default parsing should be stdio', () => {
    const cleanup = mockArgv([]);

    const result = parseCLIOptions();

    expect(result.transport).toBe('stdio');

    cleanup();
  });

  it('using http transport with a port', () => {
    const cleanup = mockArgv(['--transport=http', '--port=2222']);

    const result = parseCLIOptions();

    expect(result.transport).toBe('http');
    expect(result.port).toBe(2222);
    cleanup();
  });
});
