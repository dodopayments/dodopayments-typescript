#!/usr/bin/env bash
# OAuth discovery checks for the MCP Worker, as a resource server of dodo-auth.
# Usage: bash scripts/oauth-diag.sh <BASE_URL> [AUTH_ISSUER]
#   BASE_URL     the Worker origin, for example https://mcp.dodopayments.com
#   AUTH_ISSUER  the dodo-auth issuer (default: https://auth.dodopayments.com)
# Optional: DODO_MCP_TOKEN, a dodo-auth MCP access token, for the check of an authenticated call.
# The script reads only. It exits 1 if one check fails.
set -uo pipefail
BASE="${1:?usage: oauth-diag.sh <BASE_URL> [AUTH_ISSUER]}"
BASE="${BASE%/}"
ISSUER="${2:-https://auth.dodopayments.com}"
ISSUER="${ISSUER%/}"
RESOURCE="$BASE/mcp"
FAILED=0

hr() { printf '\n========== %s ==========\n' "$1"; }
pass() { echo "PASS: $1"; }
fail() { echo "FAIL: $1"; FAILED=1; }

# json_field <json> <field>: prints the field as JSON, or nothing.
json_field() {
  node -e 'try{const v=JSON.parse(process.argv[1])[process.argv[2]];if(v!==undefined)process.stdout.write(JSON.stringify(v))}catch(e){}' "$1" "$2"
}

echo "BASE=$BASE ISSUER=$ISSUER"

# B1: the PRM at the root path and at the /mcp path.
for path in /.well-known/oauth-protected-resource /.well-known/oauth-protected-resource/mcp; do
  hr "PRM $path"
  BODY=$(curl -s "$BASE$path")
  echo "$BODY"
  [ "$(json_field "$BODY" resource)" = "\"$RESOURCE\"" ] && pass "resource is $RESOURCE" || fail "resource is not $RESOURCE"
  [ "$(json_field "$BODY" authorization_servers)" = "[\"$ISSUER\"]" ] && pass "authorization_servers is [$ISSUER]" \
    || fail "authorization_servers is not [$ISSUER]"
done

# B2: the AS metadata on the Worker is a copy of the metadata of dodo-auth.
hr "AS metadata /.well-known/oauth-authorization-server"
COPY=$(curl -s "$BASE/.well-known/oauth-authorization-server")
ORIGINAL=$(curl -s "$ISSUER/.well-known/oauth-authorization-server")
node -e 'try{const j=JSON.parse(process.argv[1]);console.log(JSON.stringify({issuer:j.issuer,authorization_endpoint:j.authorization_endpoint,token_endpoint:j.token_endpoint,registration_endpoint:j.registration_endpoint,client_id_metadata_document_supported:j.client_id_metadata_document_supported,token_endpoint_auth_methods_supported:j.token_endpoint_auth_methods_supported},null,2))}catch(e){console.log("RAW:",process.argv[1].slice(0,400))}' "$COPY"
[ "$(json_field "$COPY" issuer)" = "\"$ISSUER\"" ] && pass "issuer is $ISSUER" || fail "issuer is not $ISSUER"
for field in authorization_endpoint token_endpoint registration_endpoint; do
  [ "$(json_field "$COPY" $field)" = "$(json_field "$ORIGINAL" $field)" ] && pass "$field is the same as on the issuer" \
    || fail "$field is not the same as on the issuer"
done

# The Worker has no authorization server: these paths redirect to dodo-auth.
hr "Pass-through to the issuer"
for path in "/authorize?response_type=code&client_id=diag" /token /register; do
  method=GET; [ "$path" = "/authorize?response_type=code&client_id=diag" ] || method=POST
  OUT=$(curl -s -o /dev/null -X "$method" -w '%{http_code} %{redirect_url}' "$BASE$path")
  STATUS="${OUT%% *}"; LOCATION="${OUT#* }"
  echo "$method $path -> $STATUS $LOCATION"
  if [[ "$STATUS" =~ ^30[78]$ && "$LOCATION" == "$ISSUER"/* ]]; then
    pass "$path redirects to the issuer"
  else
    fail "$path is not a 307 or 308 redirect to the issuer"
  fi
done
STATUS=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE/approve")
[ "$STATUS" = "404" ] && pass "/approve is 404" || fail "/approve returned $STATUS"

hr "401 challenge on POST /mcp without a token"
HDR=$(curl -s -o /dev/null -D - -X POST "$BASE/mcp" -H 'content-type: application/json' \
  -H 'accept: application/json, text/event-stream' -d '{}' | tr -d '\r' | grep -i '^www-authenticate:')
echo "$HDR"
[[ "$HDR" == *"resource_metadata=\"$BASE/.well-known/oauth-protected-resource/mcp\""* ]] \
  && pass "the challenge names the PRM" || fail "the challenge does not name the PRM"

if [ -n "${DODO_MCP_TOKEN:-}" ]; then
  hr "Authenticated tools/list"
  STATUS=$(curl -s -o /dev/null -w '%{http_code}' -X POST "$BASE/mcp" \
    -H "authorization: Bearer $DODO_MCP_TOKEN" -H 'content-type: application/json' \
    -H 'accept: application/json, text/event-stream' -H 'mcp-protocol-version: 2025-06-18' \
    -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}')
  [ "$STATUS" = "200" ] && pass "tools/list is 200" || fail "tools/list returned $STATUS"
fi

echo ""
if [ "$FAILED" = 0 ]; then echo "========== ALL CHECKS PASSED =========="; else echo "========== SOME CHECKS FAILED =========="; fi
exit "$FAILED"
