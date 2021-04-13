#!/bin/sh
# https://labzilla.io/blog/synology-cloudflare-ddns
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/<ZONE ID>/dns_records?name=<sub-domain.domain.com>" -H "X-Auth-Email: <cloudflare-account-email>" -H "X-Auth-Key: <Global API Key>" -H "Content-Type: application/json"	