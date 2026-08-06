import { codeTool } from '../src/code-tool';
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

  it('blocks forbidden methods before reaching platform detection', async () => {
    const restorePlatform = mockPlatform('win32');

    try {
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
    } finally {
      restorePlatform();
    }
  });
});
