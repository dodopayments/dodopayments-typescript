import { build } from 'esbuild';
import { existsSync, writeFileSync } from 'node:fs';
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
  // SDK may not be resolvable yet. Don't fail `npm install`: emit a placeholder
  // that throws if used, and let the explicit `build:isolate` step (run by
  // dev/deploy/CI) produce the real bundle. Never overwrite a good bundle.
  const reason = err instanceof Error ? err.message : String(err);
  if (existsSync(outFile)) {
    console.warn(`build-isolate: keeping existing bundle; rebuild skipped (${reason})`);
  } else {
    writeFileSync(
      outFile,
      `${header}\nexport const ISOLATE_BOOTSTRAP = (() => {\n  throw new Error('isolate bundle not built — run "npm run build:isolate"');\n})();\n`,
    );
    console.warn(
      `build-isolate: wrote placeholder; run "npm run build:isolate" before dev/deploy (${reason})`,
    );
  }
}
