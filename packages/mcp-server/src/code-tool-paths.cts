// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

export function getWorkerPath(): string {
  return require.resolve('./code-tool-worker.mjs');
}

/**
 * Resolves a Deno executable from the optional `deno` npm package, if it is installed.
 *
 * This deliberately uses a bare specifier rather than joining paths by hand: package
 * managers hoist `deno` to a *sibling* of this package (e.g. `<root>/node_modules/deno`,
 * not `<root>/node_modules/dodopayments-mcp/node_modules/deno`), so we need
 * `require.resolve`'s parent `node_modules` walk to find it. `deno` declares no `exports`
 * map, so resolving a deep path into it is legal.
 *
 * Returns `null` when no usable executable is available.
 */
export function getBundledDenoPath(): string | null {
  let launcherPath: string;
  try {
    launcherPath = require.resolve('deno/bin.cjs');
  } catch {
    return null;
  }

  const fs = require('node:fs') as typeof import('node:fs');
  const path = require('node:path') as typeof import('node:path');

  // The `deno` package's postinstall hard-links the real binary next to `bin.cjs`.
  // Prefer it: `bin.cjs` is a Node wrapper that runs Deno via a blocking `spawnSync`,
  // so the Deno grandchild would outlive `worker.terminate()`.
  const executablePath = path.join(
    path.dirname(launcherPath),
    process.platform === 'win32' ? 'deno.exe' : 'deno',
  );
  if (fs.existsSync(executablePath)) {
    return executablePath;
  }

  // Fall back to the launcher, which installs the binary on first run. It relies on its
  // shebang, so it is only directly spawnable on non-Windows platforms.
  return process.platform === 'win32' ? null : launcherPath;
}
