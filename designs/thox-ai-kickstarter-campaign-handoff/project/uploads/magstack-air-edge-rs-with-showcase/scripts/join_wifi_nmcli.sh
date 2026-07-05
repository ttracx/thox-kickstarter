#!/usr/bin/env bash
set -euo pipefail
SSID="${1:-}"; PASSWORD="${2:-}"; IFACE="${IFACE:-wlan0}"
if [[ -z "${SSID}" || -z "${PASSWORD}" ]]; then
  echo "Usage: sudo $0 <ssid> <password>" >&2
  exit 1
fi
nmcli dev wifi connect "${SSID}" password "${PASSWORD}" ifname "${IFACE}"
echo "Connected ${IFACE} to ${SSID}."
