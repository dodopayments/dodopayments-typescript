import { createRequire } from 'node:module';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { codeTool } from '../src/code-tool';
import { getBundledDenoPath } from '../src/code-tool-paths.cjs';
import { configureLogger } from '../src/logger';
import type { McpRequestContext, ToolCallResult } from '../src/types';

const mockPlatform = (platform: NodeJS.Platform) => {
  const original = Object.getOwnPropertyDescriptor(process, 'platform')!;
  Object.defineProperty(process, 'platform', { ...original, value: platform });
  return () => {
    Object.defineProperty(process, 'platform', original);
  };
};

const textOf = (result: ToolCallResult): string =>
  result.content.map((block) => (block.type === 'text' ? block.text : '')).join('\n');

const reqContext = {
  client: { baseURL: 'https://test.dodopayments.com' },
} as unknown as McpRequestContext;

const executeHandler = () => codeTool({ blockedMethods: undefined, codeExecutionMode: 'local' }).handler;

describe('codeTool execute handler', () => {
  beforeAll(() => {
    configureLogger({ level: 'error', pretty: false });
  });

  it('reports the real Windows limitation instead of asking the user to install Deno', async () => {
    const restorePlatform = mockPlatform('win32');

    try {
      const result = await executeHandler()({
        reqContext,
        args: { code: 'async function run(client) {}' },
      });

      expect(result.isError).toBe(true);
      const message = textOf(result);
      expect(message).toContain('not available on Windows');
      expect(message).toContain('https://github.com/denoland/deno/issues/18236');
      // The old message sent Windows users to install Deno, which can never fix this.
      expect(message).not.toMatch(/npm install deno/);
    } finally {
      restorePlatform();
    }
  });

  it('rejects blocked methods before attempting any execution', async () => {
    const handler = codeTool({
      blockedMethods: [{ fullyQualifiedName: 'client.payments.create' } as any],
      codeExecutionMode: 'local',
    }).handler;

    const result = await handler({
      reqContext,
      args: { code: 'await client.payments.create({})' },
    });

    expect(result.isError).toBe(true);
    expect(textOf(result)).toContain('client.payments.create');
  });
});

describe('getBundledDenoPath', () => {
  let fixtureDir: string;

  const anchoredResolve = () => {
    const anchoredRequire = createRequire(path.join(fixtureDir, 'anchor.cjs'));
    return (specifier: string) => anchoredRequire.resolve(specifier);
  };

  const writeDenoPackage = ({ withExecutable }: { withExecutable: boolean }) => {
    const denoDir = path.join(fixtureDir, 'node_modules', 'deno');
    fs.mkdirSync(denoDir, { recursive: true });
    fs.writeFileSync(path.join(denoDir, 'package.json'), '{"name":"deno","version":"0.0.0"}');
    fs.writeFileSync(path.join(denoDir, 'bin.cjs'), '#!/usr/bin/env node\n');
    if (withExecutable) {
      const executablePath = path.join(denoDir, process.platform === 'win32' ? 'deno.exe' : 'deno');
      fs.writeFileSync(executablePath, '#!/bin/sh\necho "deno 0.0.0"\n');
      fs.chmodSync(executablePath, 0o755);
    }
    return denoDir;
  };

  beforeEach(() => {
    // realpath so comparisons hold on macOS, where tmpdir is a /var -> /private/var symlink
    // and `require.resolve` returns the resolved path.
    fixtureDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dodo-deno-fixture-')));
  });

  afterEach(() => {
    fs.rmSync(fixtureDir, { recursive: true, force: true });
  });

  it('returns null when the deno package is not installed', () => {
    expect(getBundledDenoPath(anchoredResolve())).toBeNull();
  });

  it('resolves deno hoisted as a sibling package, not under a nested node_modules', () => {
    const denoDir = writeDenoPackage({ withExecutable: true });

    const resolved = getBundledDenoPath(anchoredResolve());

    expect(resolved).toBe(path.join(denoDir, process.platform === 'win32' ? 'deno.exe' : 'deno'));
    expect(resolved).not.toContain(`node_modules${path.sep}node_modules`);
  });

  it('falls back to the launcher when the native binary is missing', () => {
    const denoDir = writeDenoPackage({ withExecutable: false });

    expect(getBundledDenoPath(anchoredResolve())).toBe(path.join(denoDir, 'bin.cjs'));
  });

  it('falls back to the launcher when the native binary is not executable', () => {
    if (process.platform === 'win32') {
      return;
    }
    const denoDir = writeDenoPackage({ withExecutable: true });
    fs.chmodSync(path.join(denoDir, 'deno'), 0o644);

    expect(getBundledDenoPath(anchoredResolve())).toBe(path.join(denoDir, 'bin.cjs'));
  });

  it('returns null on Windows when only the shebang launcher is available', () => {
    writeDenoPackage({ withExecutable: false });
    const restorePlatform = mockPlatform('win32');

    try {
      expect(getBundledDenoPath(anchoredResolve())).toBeNull();
    } finally {
      restorePlatform();
    }
  });
});
