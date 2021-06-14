#!/bin/sh
curl -fsSL -o ./docker-compose.yml https://raw.githubusercontent.com/livepoll/live-poll/develop/.github/scripts/docker-compose-prod.yml
mkdir -p ./volumes/api-mysql