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
 * Resolution is anchored at this file, so it only sees `deno` when installed into the same
 * `node_modules` tree as this package. Under `npx` or a global install it will not find a
 * `deno` living in the user's own project, which is intentional: resolving from the launch
 * directory would let any directory the server happens to start in supply the executable
 * that gets spawned.
 *
 * `resolveModule` exists so tests can anchor resolution at a fixture tree.
 *
 * Returns `null` when no usable executable is available.
 */
export function getBundledDenoPath(
  resolveModule: (specifier: string) => string = (specifier) => require.resolve(specifier),
): string | null {
  let launcherPath: string;
  try {
    launcherPath = resolveModule('deno/bin.cjs');
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
    // The executable bit carries no meaning on Windows, so existence is the only signal
    // there. On POSIX an interrupted install can leave the hard-link non-executable; fall
    // through to the launcher rather than failing later with a spawn EACCES.
    if (process.platform === 'win32') {
      return executablePath;
    }
    try {
      fs.accessSync(executablePath, fs.constants.X_OK);
      return executablePath;
    } catch {
      // Present but not executable.
    }
  }

  // Fall back to the launcher, which installs the binary on first run. It relies on its
  // shebang, so it is only directly spawnable on non-Windows platforms.
  return process.platform === 'win32' ? null : launcherPath;
}
