#!/usr/bin/env bash
# End-to-end MCP probe: OAuth -> initialize -> notifications/initialized -> (list|call).
# Usage: bash scripts/probe.sh <BASE_URL> <list|execute|search_docs|throw|hang>
# Requires DODO_TEST_KEY (test_mode key) in the environment.
set -euo pipefail
BASE="$1"; MODE="$2"; KEY="${DODO_TEST_KEY:?set DODO_TEST_KEY}"

J() { node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const l=d.split(/\r?\n/).filter(x=>x.startsWith("data:"));process.stdout.write((l.pop()||"{}").replace(/^data:\s?/,""))})'; }

CID=$(curl -s -X POST "$BASE/register" -H 'content-type: application/json' \
  -d '{"client_name":"probe","redirect_uris":["http://localhost:9999/cb"],"token_endpoint_auth_method":"none","grant_types":["authorization_code","refresh_token"],"response_types":["code"]}' \
  | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>console.log(JSON.parse(d).client_id))')
REQ=$(curl -s "$BASE/authorize?client_id=$CID&redirect_uri=http%3A%2F%2Flocalhost%3A9999%2Fcb&response_type=code&state=x&scope=" \
  | grep -oE 'name="oauthReqInfo" value="[^"]*"' | head -1 | sed 's/.*value="//;s/"$//' | sed 's/&quot;/"/g')
RAW=$(curl -s -X POST "$BASE/approve" --data-urlencode "action=login_approve" --data-urlencode "oauthReqInfo=$REQ" \
  --data-urlencode "clientopt_bearerToken=$KEY" --data-urlencode "clientopt_environment=test_mode" \
  | grep -oE 'code=[^&"]+' | head -1 | sed 's/code=//')
CODE=$(node -e "console.log(decodeURIComponent(process.argv[1]))" "$RAW")
ACC=$(curl -s -X POST "$BASE/token" -d grant_type=authorization_code --data-urlencode "code=$CODE" \
  -d "client_id=$CID" -d "redirect_uri=http://localhost:9999/cb" \
  | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>process.stdout.write(JSON.parse(d).access_token||""))')

H=(-H "authorization: Bearer $ACC" -H 'content-type: application/json' -H 'accept: application/json, text/event-stream')
curl -s -X POST "$BASE/mcp" "${H[@]}" -D /tmp/ph.txt -o /dev/null \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"probe","version":"1"}}}'
SID=$(grep -i '^mcp-session-id:' /tmp/ph.txt | tr -d '\r' | sed 's/.*: *//')
curl -s -X POST "$BASE/mcp" "${H[@]}" -H "mcp-session-id: $SID" -o /dev/null \
  -d '{"jsonrpc":"2.0","method":"notifications/initialized"}'

case "$MODE" in
  list) BODY='{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}';;
  execute) BODY='{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"execute","arguments":{"code":"async function run(client){ const p = await client.payments.list({page_size:2}); console.log(JSON.stringify({count:p.items?.length??0})); }","intent":"probe"}}}';;
  search_docs) BODY='{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_docs","arguments":{"query":"list payments","language":"typescript"}}}';;
  throw) BODY='{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"execute","arguments":{"code":"async function run(client){ throw new Error(\"boom\"); }","intent":"probe"}}}';;
  hang) BODY='{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"execute","arguments":{"code":"async function run(client){ while(true){} }","intent":"probe"}}}';;
  *) echo "unknown mode: $MODE" >&2; exit 2;;
esac
curl -s -X POST "$BASE/mcp" "${H[@]}" -H "mcp-session-id: $SID" --max-time 60 -d "$BODY" | J
