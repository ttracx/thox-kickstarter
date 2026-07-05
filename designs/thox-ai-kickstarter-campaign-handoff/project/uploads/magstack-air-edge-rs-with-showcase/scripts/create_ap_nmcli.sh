#!/usr/bin/env bash
set -euo pipefail
SSID="${1:-MagStack-Air}"
PASSWORD="${2:-}"
IFACE="${IFACE:-wlan0}"
if [[ -z "${PASSWORD}" || ${#PASSWORD} -lt 12 ]]; then
  echo "Usage: sudo $0 <ssid> <password-min-12-chars>" >&2
  exit 1
fi
nmcli con delete "${SSID}" >/dev/null 2>&1 || true
nmcli dev wifi hotspot ifname "${IFACE}" ssid "${SSID}" password "${PASSWORD}"
echo "Created Wi-Fi hotspot ${SSID} on ${IFACE}."
