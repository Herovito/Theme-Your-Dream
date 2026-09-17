#!/usr/bin/env bash
# Cross-platform validator is also available as `npm run validate`.
set -eu
cd "$(dirname "$0")"
node scripts/validate-links.js "$@"
