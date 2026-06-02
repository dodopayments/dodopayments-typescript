import { build } from 'esbuild';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const pkgRoot = resolve(here, '..');

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

const bundled = result.outputFiles[0].text;

const out = `// GENERATED FILE - do not edit. Produced by scripts/build-isolate.mjs.
// This is the bootstrap module (with the DodoPayments SDK bundled in) that runs
// inside each Worker Loader isolate. It imports './user-code.js', which is the
// caller's code supplied through the LOADER modules map at request time.
export const ISOLATE_BOOTSTRAP = ${JSON.stringify(bundled)};
`;

writeFileSync(resolve(pkgRoot, 'src/isolate-bundle.generated.ts'), out);
console.log(`Wrote src/isolate-bundle.generated.ts (${bundled.length} bytes bundled)`);
