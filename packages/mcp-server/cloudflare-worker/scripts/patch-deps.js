/**
 * Patches dodopayments-mcp for Cloudflare Workers compatibility.
 *
 * Issues patched:
 * 1. code-tool-paths.cjs uses require.resolve() (not available in CF Workers)
 * 2. instructions.{mjs,js} uses setInterval() + .unref() in global scope
 *    (CF Workers forbid async I/O and timers in global scope)
 * 3. logger.{mjs,js} uses pino + process.stderr (not available in CF Workers)
 *    and requires configureLogger() to be called before getLogger()
 *
 * All are safe to stub/strip — CF Workers don't need pino, local Deno execution,
 * or global timers.
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

// 3. Replace logger.{mjs,js} with a CF Workers-compatible console-based logger.
//    The original uses pino + process.stderr which aren't available in CF Workers.
//    getLogger() also throws if configureLogger() wasn't called first.
const loggerMjs = `
let _logger;
export function configureLogger(opts) {
  // no-op in CF Workers; logger is always console-based
}
export function getLogger() {
  if (!_logger) {
    _logger = {
      debug: (...args) => console.debug(...args),
      info: (...args) => console.info(...args),
      warn: (...args) => console.warn(...args),
      error: (...args) => console.error(...args),
      fatal: (...args) => console.error(...args),
      child: () => _logger,
    };
  }
  return _logger;
}
`;

const loggerJs = `
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _logger;
function configureLogger(opts) {}
function getLogger() {
  if (!_logger) {
    _logger = {
      debug: (...args) => console.debug(...args),
      info: (...args) => console.info(...args),
      warn: (...args) => console.warn(...args),
      error: (...args) => console.error(...args),
      fatal: (...args) => console.error(...args),
      child: () => _logger,
    };
  }
  return _logger;
}
exports.configureLogger = configureLogger;
exports.getLogger = getLogger;
`;

for (const [file, content] of [['logger.mjs', loggerMjs], ['logger.js', loggerJs]]) {
  const filePath = path.join(pkgDir, file);
  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Patched ${file} — replaced pino with console-based logger for CF Workers`);
  }
}
