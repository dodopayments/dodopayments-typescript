/**
 * Patches dodopayments-mcp for Cloudflare Workers compatibility.
 *
 * Issues patched:
 * 1. code-tool-paths.cjs uses require.resolve() (not available in CF Workers)
 * 2. instructions.{mjs,js} uses setInterval() + .unref() in global scope
 *    (CF Workers forbid async I/O and timers in global scope)
 *
 * Both are safe to stub/strip:
 * - code-tool-paths is only used for local Deno code execution
 * - The setInterval is a cache cleanup timer; CF Workers are short-lived
 *   so cache eviction is unnecessary (the cache still works, just no auto-evict)
 *
 * Note: @valtown/deno-http-worker is separately handled via wrangler alias config.
 */
const fs = require('fs');
const path = require('path');

const pkgDir = path.join(__dirname, '..', 'node_modules', 'dodopayments-mcp');

// 1. Stub code-tool-paths.cjs (require.resolve not available in CF Workers)
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

// 2. Strip global setInterval + .unref() from instructions.{mjs,js}
//    CF Workers forbid setInterval/setTimeout in global scope.
//    The cache still works; it just won't auto-evict stale entries (fine for short-lived workers).
for (const ext of ['mjs', 'js']) {
  const filePath = path.join(pkgDir, `instructions.${ext}`);
  if (fs.existsSync(filePath)) {
    let src = fs.readFileSync(filePath, 'utf8');
    // Remove the setInterval block + .unref() call
    // Anchored to INSTRUCTIONS_CACHE_TTL_MS to avoid stopping at inner semicolons
    src = src.replace(/const _cacheCleanupInterval = setInterval\([\s\S]*?INSTRUCTIONS_CACHE_TTL_MS\);/m, '');
    src = src.replace(/[\r\n]*\/\/ Don't keep the process alive just for cleanup\./, '');
    src = src.replace(/[\r\n]*_cacheCleanupInterval\.unref\(\);/, '');
    fs.writeFileSync(filePath, src);
    console.log(`Patched instructions.${ext} — removed global setInterval for CF Workers compatibility`);
  }
}
