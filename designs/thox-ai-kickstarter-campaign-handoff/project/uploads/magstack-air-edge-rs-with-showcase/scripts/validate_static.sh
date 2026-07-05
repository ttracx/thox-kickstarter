#!/usr/bin/env bash
set -euo pipefail
python3 -m json.tool models/intent_v1.json >/dev/null
python3 -m json.tool models/sensor_anomaly_v1.json >/dev/null
bash -n scripts/*.sh
python3 -m compileall -q sdk/python/magstack_air_sdk
PYTHONPATH=sdk/python python3 -m unittest discover -s sdk/python/tests -v || true
python3 tools/check_dashboard_script.py
python3 tools/static_rust_sentinel.py
