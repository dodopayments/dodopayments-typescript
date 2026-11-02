#!/usr/bin/env bash
# End-to-end MCP probe: one stateless request (tools/list or tools/call) to POST /mcp.
# Usage: bash scripts/probe.sh <BASE_URL> <list|execute|search_docs|throw|hang>
# Requires DODO_MCP_TOKEN (a dodo-auth MCP access token) in the environment.
# A grant with test mode and live mode also needs DODO_MODE (test or live).
set -euo pipefail
BASE="$1"; MODE="$2"; ACC="${DODO_MCP_TOKEN:?set DODO_MCP_TOKEN}"

J() { node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const l=d.split(/\r?\n/).filter(x=>x.startsWith("data:"));process.stdout.write(l.length?l.pop().replace(/^data:\s?/,""):d)})'; }

H=(-H "authorization: Bearer $ACC" -H 'content-type: application/json' -H 'accept: application/json, text/event-stream' \
  -H 'mcp-protocol-version: 2025-06-18')
if [ -n "${DODO_MODE:-}" ]; then H+=(-H "dodo-mode: $DODO_MODE"); fi

case "$MODE" in
  list) BODY='{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}';;
  execute) BODY='{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"execute","arguments":{"code":"async function run(client){ const p = await client.payments.list({page_size:2}); console.log(JSON.stringify({count:p.items?.length??0})); }","intent":"probe"}}}';;
  search_docs) BODY='{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_docs","arguments":{"query":"list payments","language":"typescript"}}}';;
  throw) BODY='{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"execute","arguments":{"code":"async function run(client){ throw new Error(\"boom\"); }","intent":"probe"}}}';;
  hang) BODY='{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"execute","arguments":{"code":"async function run(client){ while(true){} }","intent":"probe"}}}';;
  *) echo "unknown mode: $MODE" >&2; exit 2;;
esac
curl -s -X POST "$BASE/mcp" "${H[@]}" --max-time 60 -d "$BODY" | J
