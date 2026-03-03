/**
 * Patches dodopayments-mcp for Cloudflare Workers compatibility.
 *
 * The code-tool module has top-level imports that are incompatible with CF Workers:
 * - code-tool-paths.cjs uses require.resolve() (not available in CF Workers)
 * - @valtown/deno-http-worker uses fileURLToPath(import.meta.url) (undefined in CF Workers)
 *
 * Both are only used for local Deno code execution, which is not applicable in
 * CF Workers (the remote Stainless sandbox is used instead). This script replaces
 * the problematic module with a no-op stub after npm install.
 *
 * Note: @valtown/deno-http-worker is separately handled via wrangler alias config.
 */
const fs = require('fs');
const path = require('path');

const pkgDir = path.join(__dirname, '..', 'node_modules', 'dodopayments-mcp');

const filesToPatch = [
  {
    file: 'code-tool-paths.cjs',
    content:
      '"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.workerPath = "";\n',
  },
];

for (const { file, content } of filesToPatch) {
  const filePath = path.join(pkgDir, file);
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Patched ${file} for CF Workers compatibility`);
  }
}
