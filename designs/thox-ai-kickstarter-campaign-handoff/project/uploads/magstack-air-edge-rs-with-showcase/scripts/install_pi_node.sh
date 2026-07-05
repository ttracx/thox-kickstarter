#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root: sudo $0" >&2
  exit 1
fi

MODE="${1:-leader}"
BIN_DIR="${BIN_DIR:-target/aarch64-unknown-linux-gnu/release}"

if [[ ! -x "${BIN_DIR}/magair-node" ]]; then
  echo "Missing ${BIN_DIR}/magair-node. Build first with scripts/build_pi.sh." >&2
  exit 1
fi

id -u magstack >/dev/null 2>&1 || useradd --system --home /var/lib/magstack-air --shell /usr/sbin/nologin magstack
mkdir -p /etc/magstack-air /var/lib/magstack-air /opt/magstack-air/models
install -m 0755 "${BIN_DIR}/magair-node" /usr/local/bin/magair-node
install -m 0755 "${BIN_DIR}/magairctl" /usr/local/bin/magairctl
cp models/*.json /opt/magstack-air/models/

if [[ "${MODE}" == "worker" ]]; then
  cp configs/worker.env.example /etc/magstack-air/air.env
else
  cp configs/leader.env.example /etc/magstack-air/air.env
fi

chown -R magstack:magstack /var/lib/magstack-air /opt/magstack-air
cp systemd/magstack-air-node.service /etc/systemd/system/magstack-air-node.service
systemctl daemon-reload
systemctl enable magstack-air-node

echo "Edit /etc/magstack-air/air.env, then run: systemctl start magstack-air-node"
