import { build } from 'esbuild';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(here, '..');
const outFile = resolve(pkgRoot, 'src/isolate-bundle.generated.ts');

const header = '// GENERATED FILE - do not edit. Produced by scripts/build-isolate.mjs.';

async function buildBundle() {
  const result = await build({
    entryPoints: [resolve(pkgRoot, 'src/isolate-entry.ts')],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    conditions: ['worker', 'browser'],
    external: ['./user-code.js', 'node:*'],
    write: false,
    legalComments: 'none',
    minify: false,
  });
  return result.outputFiles[0].text;
}

try {
  const bundled = await buildBundle();
  writeFileSync(
    outFile,
    `${header}\n// Bootstrap module (with the DodoPayments SDK bundled in) that runs inside each\n// Worker Loader isolate. It imports './user-code.js' — the caller's code supplied\n// through the LOADER modules map at request time.\nexport const ISOLATE_BOOTSTRAP = ${JSON.stringify(
      bundled,
    )};\n`,
  );
  console.log(`Wrote src/isolate-bundle.generated.ts (${bundled.length} bytes bundled)`);
} catch (err) {
  // During `postinstall` in a partially-bootstrapped monorepo the `dodopayments`
  // SDK may not be resolvable yet. Don't fail `npm install`: write a placeholder
  // only if one isn't already present, and let the explicit `build:isolate` step
  // (run by dev/deploy/CI) produce the real bundle. The `wx` flag makes the write
  // atomic and fail if the file exists, avoiding a check-then-write race.
  const reason = err instanceof Error ? err.message : String(err);
  const placeholder = `${header}\nexport const ISOLATE_BOOTSTRAP = (() => {\n  throw new Error('isolate bundle not built — run "npm run build:isolate"');\n})();\n`;
  try {
    writeFileSync(outFile, placeholder, { flag: 'wx' });
    console.warn(
      `build-isolate: wrote placeholder; run "npm run build:isolate" before dev/deploy (${reason})`,
    );
  } catch (writeErr) {
    if (writeErr && writeErr.code === 'EEXIST') {
      console.warn(`build-isolate: keeping existing bundle; rebuild skipped (${reason})`);
    } else {
      throw writeErr;
    }
  }
}
