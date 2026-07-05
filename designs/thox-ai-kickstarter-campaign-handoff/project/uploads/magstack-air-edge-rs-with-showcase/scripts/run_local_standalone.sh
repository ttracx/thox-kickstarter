#!/usr/bin/env bash
set -euo pipefail
export MAGSTACK_AIR_TOKEN="${MAGSTACK_AIR_TOKEN:-dev-token}"
export MAGSTACK_AIR_INTERNAL_SECRET="${MAGSTACK_AIR_INTERNAL_SECRET:-dev-internal-secret}"
mkdir -p state
cargo run --release -p magair-node -- \
  --mode standalone \
  --bind 127.0.0.1:8787 \
  --public-url http://127.0.0.1:8787 \
  --db ./state/magstack-air.sqlite \
  --models-dir ./models \
  --token "$MAGSTACK_AIR_TOKEN" \
  --internal-secret "$MAGSTACK_AIR_INTERNAL_SECRET" \
  --label tier=air \
  --label role=dev
