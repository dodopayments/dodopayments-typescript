#!/usr/bin/env bash
# OAuth re-auth diagnostic harness. Characterizes server-side behavior that
# determines whether MCP clients are forced to re-authorize per session.
# Usage: bash scripts/oauth-diag.sh <BASE_URL>
# Requires DODO_TEST_KEY (test_mode key) in the environment.
#
# NOTE: this harness is tightly coupled to the current consent-flow HTML — it scrapes
# the `oauthReqInfo` hidden field out of the /authorize page and the `code=` link out
# of the /approve response. If src/utils.ts changes that markup (field names, form
# shape), update the grep/sed extraction in get_code()/reg_and_req() accordingly.
set -uo pipefail
BASE="${1:?usage: oauth-diag.sh <BASE_URL>}"; KEY="${DODO_TEST_KEY:?set DODO_TEST_KEY}"

hr() { printf '\n========== %s ==========\n' "$1"; }

# Register a public client (auth method none). Echoes client_id.
register() {
  local redirect="$1"
  curl -s -X POST "$BASE/register" -H 'content-type: application/json' \
    -d "{\"client_name\":\"diag\",\"redirect_uris\":[\"$redirect\"],\"token_endpoint_auth_method\":\"none\",\"grant_types\":[\"authorization_code\",\"refresh_token\"],\"response_types\":[\"code\"]}"
}

# Full authorize -> returns "code" for a given client_id + redirect_uri.
# The code arrives URL-encoded in the redirect href; decode it so the caller can
# re-encode once via --data-urlencode (double-encoding corrupts the code -> invalid_grant).
get_code() {
  local cid="$1" redirect_enc="$2"
  local req raw
  req=$(curl -s "$BASE/authorize?client_id=$cid&redirect_uri=$redirect_enc&response_type=code&state=x&scope=" \
    | grep -oE 'name="oauthReqInfo" value="[^"]*"' | head -1 | sed 's/.*value="//;s/"$//' | sed 's/&quot;/"/g')
  raw=$(curl -s -X POST "$BASE/approve" --data-urlencode "action=login_approve" --data-urlencode "oauthReqInfo=$req" \
    --data-urlencode "clientopt_bearerToken=$KEY" --data-urlencode "clientopt_environment=test_mode" \
    | grep -oE 'code=[^&"]+' | head -1 | sed 's/code=//')
  node -e "process.stdout.write(decodeURIComponent(process.argv[1]||''))" "$raw"
}

# MCP initialize with a bearer token. Prints HTTP status + whether a session id came back.
mcp_init() {
  local acc="$1"
  local hdr=/tmp/diag_mcp_hdr.txt
  local status
  status=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE/mcp" \
    -H "authorization: Bearer $acc" -H 'content-type: application/json' \
    -H 'accept: application/json, text/event-stream' -D "$hdr" \
    -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"diag","version":"1"}}}')
  local sid
  sid=$(grep -i '^mcp-session-id:' "$hdr" | tr -d '\r' | sed 's/.*: *//')
  echo "HTTP=$status mcp-session-id=${sid:-<none>}"
}

echo "BASE=$BASE"

hr "0. AUTH-SERVER METADATA (.well-known)"
curl -s "$BASE/.well-known/oauth-authorization-server" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{const j=JSON.parse(d);console.log(JSON.stringify({grant_types_supported:j.grant_types_supported,token_endpoint_auth_methods_supported:j.token_endpoint_auth_methods_supported,code_challenge_methods_supported:j.code_challenge_methods_supported,registration_endpoint:j.registration_endpoint},null,2))}catch(e){console.log("RAW:",d.slice(0,400))}})'

hr "1. REGISTER client A (redirect http://localhost:9999/cb)"
REG_A=$(register "http://localhost:9999/cb")
echo "$REG_A" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);console.log(JSON.stringify({client_id:j.client_id,client_secret:j.client_secret??null,client_id_issued_at:j.client_id_issued_at,client_secret_expires_at:j.client_secret_expires_at,redirect_uris:j.redirect_uris},null,2))})'
CID_A=$(echo "$REG_A" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>console.log(JSON.parse(d).client_id))')

hr "2. FULL AUTH -> token response (expires_in / refresh_token presence)"
CODE1=$(get_code "$CID_A" "http%3A%2F%2Flocalhost%3A9999%2Fcb")
echo "authorization code: ${CODE1:0:12}..."
TOK1=$(curl -s -X POST "$BASE/token" -d grant_type=authorization_code --data-urlencode "code=$CODE1" \
  -d "client_id=$CID_A" -d "redirect_uri=http://localhost:9999/cb")
echo "$TOK1" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);console.log(JSON.stringify({token_type:j.token_type,expires_in:j.expires_in,has_access_token:!!j.access_token,has_refresh_token:!!j.refresh_token,scope:j.scope,refresh_prefix:(j.refresh_token||"").slice(0,8)},null,2))})'
ACC1=$(echo "$TOK1" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>process.stdout.write(JSON.parse(d).access_token||""))')
REF1=$(echo "$TOK1" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>process.stdout.write(JSON.parse(d).refresh_token||""))')

hr "3. ACCESS-TOKEN REUSE across THREE fresh MCP sessions (new-conversation sim)"
echo "session #1: $(mcp_init "$ACC1")"
echo "session #2: $(mcp_init "$ACC1")"
echo "session #3: $(mcp_init "$ACC1")"

hr "4. REFRESH flow (grant_type=refresh_token) -> rotation?"
RT1=$(curl -s -X POST "$BASE/token" -d grant_type=refresh_token --data-urlencode "refresh_token=$REF1" -d "client_id=$CID_A")
echo "$RT1" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const j=JSON.parse(d);console.log(JSON.stringify({expires_in:j.expires_in,has_access_token:!!j.access_token,has_refresh_token:!!j.refresh_token,new_refresh_prefix:(j.refresh_token||"").slice(0,8),error:j.error,error_description:j.error_description},null,2))})'
ACC2=$(echo "$RT1" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>process.stdout.write(JSON.parse(d).access_token||""))')
REF2=$(echo "$RT1" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>process.stdout.write(JSON.parse(d).refresh_token||""))')
echo "refreshed access token works in new MCP session: $(mcp_init "$ACC2")"

hr "5. CONCURRENT-401 RACE sim: reuse the SAME (old) refresh token REF1 again"
echo "(workers-oauth-provider rotates refresh tokens; a 2nd concurrent refresh with the stale token is MCP SDK #1760)"
RT_OLD=$(curl -s -w '\n__HTTP__%{http_code}' -X POST "$BASE/token" -d grant_type=refresh_token --data-urlencode "refresh_token=$REF1" -d "client_id=$CID_A")
echo "$RT_OLD" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const m=d.split("__HTTP__");const http=m[1]||"?";let body={};try{body=JSON.parse(m[0])}catch(e){}console.log(JSON.stringify({http,error:body.error,error_description:body.error_description,has_access_token:!!body.access_token},null,2))})'

hr "5b. Is REF1 fully dead, or is the PREVIOUS rotation still valid (grace window)?"
echo "REF1 (original) status shown above. Now confirm REF2 (latest) still works:"
RT2=$(curl -s -w '\n__HTTP__%{http_code}' -X POST "$BASE/token" -d grant_type=refresh_token --data-urlencode "refresh_token=$REF2" -d "client_id=$CID_A")
echo "$RT2" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const m=d.split("__HTTP__");console.log("REF2 -> HTTP",m[1]||"?");let b={};try{b=JSON.parse(m[0])}catch(e){}console.log(JSON.stringify({has_access_token:!!b.access_token,error:b.error},null,2))})'

hr "6. REDIRECT_URI EPHEMERAL-PORT MISMATCH (register :9999, authorize :54321)"
echo "Native apps (Claude Code / Codex) reuse a stored client_id but bind a NEW ephemeral localhost port each launch."
echo "0.0.5 matches redirect_uri by exact string. Capturing /authorize response for the mismatched port:"
MISMATCH=$(curl -s -w '\n__HTTP__%{http_code}' "$BASE/authorize?client_id=$CID_A&redirect_uri=http%3A%2F%2Flocalhost%3A54321%2Fcb&response_type=code&state=x&scope=")
echo "$MISMATCH" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const m=d.split("__HTTP__");console.log("HTTP",m[1]||"?");const body=m[0]||"";const err=(body.match(/error[^<]*|invalid[^<]*|redirect[^<]*/i)||[])[0];console.log("snippet:",(err||body.replace(/\s+/g," ").slice(0,300)));})'

hr "6b. CONTROL: same flow but with the CORRECT registered port :9999 succeeds"
CTRL=$(curl -s -w '\n__HTTP__%{http_code}' "$BASE/authorize?client_id=$CID_A&redirect_uri=http%3A%2F%2Flocalhost%3A9999%2Fcb&response_type=code&state=x&scope=")
echo "$CTRL" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const m=d.split("__HTTP__");console.log("HTTP",m[1]||"?","hasOauthReqInfo="+/oauthReqInfo/.test(m[0]||""));})'

hr "7. UNKNOWN client_id at /token (DCR churn -> invalid_client?)"
BOGUS=$(curl -s -w '\n__HTTP__%{http_code}' -X POST "$BASE/token" -d grant_type=refresh_token --data-urlencode "refresh_token=$REF2" -d "client_id=does-not-exist-0000")
echo "$BOGUS" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{const m=d.split("__HTTP__");console.log("HTTP",m[1]||"?");let b={};try{b=JSON.parse(m[0])}catch(e){b={raw:(m[0]||"").slice(0,200)}}console.log(JSON.stringify(b,null,2))})'

hr "8. NO GRANT REVOCATION in 0.0.5: re-auth same key, confirm OLD access token still valid"
CODE2=$(get_code "$CID_A" "http%3A%2F%2Flocalhost%3A9999%2Fcb")
TOK3=$(curl -s -X POST "$BASE/token" -d grant_type=authorization_code --data-urlencode "code=$CODE2" \
  -d "client_id=$CID_A" -d "redirect_uri=http://localhost:9999/cb")
ACC3=$(echo "$TOK3" | node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>process.stdout.write(JSON.parse(d).access_token||""))')
echo "new grant access token (ACC3) works: $(mcp_init "$ACC3")"
echo "ORIGINAL refreshed token (ACC2) STILL works after new auth: $(mcp_init "$ACC2")"

echo ""
echo "========== DONE =========="
