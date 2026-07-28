#!/usr/bin/env python3
"""Validate and report the THOX Kickstarter launch-readiness manifest."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
DEFAULT_MANIFEST = ROOT / "config" / "launch-readiness.json"
ALLOWED_GATE_STATUSES = {"verified", "blocked"}


class ManifestError(ValueError):
    """Raised when the readiness manifest is structurally invalid."""


def _non_empty_string(value: Any, field: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ManifestError(f"{field} must be a non-empty string")
    return value


def load_manifest(path: Path = DEFAULT_MANIFEST) -> dict[str, Any]:
    try:
        manifest = json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise ManifestError(f"manifest not found: {path}") from exc
    except json.JSONDecodeError as exc:
        raise ManifestError(f"invalid JSON in {path}: {exc}") from exc

    if not isinstance(manifest, dict):
        raise ManifestError("manifest root must be an object")
    if manifest.get("schema_version") != 1:
        raise ManifestError("schema_version must be 1")
    if manifest.get("campaign_source_status") != "validated":
        raise ManifestError("campaign_source_status must be 'validated'")
    if not isinstance(manifest.get("release_ready"), bool):
        raise ManifestError("release_ready must be a boolean")

    gates = manifest.get("gates")
    if not isinstance(gates, list) or not gates:
        raise ManifestError("gates must be a non-empty array")

    seen_ids: set[str] = set()
    for index, gate in enumerate(gates):
        prefix = f"gates[{index}]"
        if not isinstance(gate, dict):
            raise ManifestError(f"{prefix} must be an object")
        gate_id = _non_empty_string(gate.get("id"), f"{prefix}.id")
        if gate_id in seen_ids:
            raise ManifestError(f"duplicate gate id: {gate_id}")
        seen_ids.add(gate_id)

        status = gate.get("status")
        if status not in ALLOWED_GATE_STATUSES:
            raise ManifestError(
                f"{prefix}.status must be one of {sorted(ALLOWED_GATE_STATUSES)}"
            )
        _non_empty_string(gate.get("owner"), f"{prefix}.owner")
        _non_empty_string(gate.get("next_action"), f"{prefix}.next_action")

        evidence = gate.get("evidence")
        if not isinstance(evidence, list) or not evidence:
            raise ManifestError(f"{prefix}.evidence must be a non-empty array")
        for evidence_index, relative_path in enumerate(evidence):
            relative_path = _non_empty_string(
                relative_path, f"{prefix}.evidence[{evidence_index}]"
            )
            candidate = (ROOT / relative_path).resolve()
            try:
                candidate.relative_to(ROOT)
            except ValueError as exc:
                raise ManifestError(
                    f"{prefix}.evidence[{evidence_index}] leaves repository root"
                ) from exc
            if not candidate.exists():
                raise ManifestError(f"missing evidence path: {relative_path}")

    computed_ready = all(gate["status"] == "verified" for gate in gates)
    if manifest["release_ready"] != computed_ready:
        raise ManifestError(
            "release_ready does not match gate statuses "
            f"(declared={manifest['release_ready']}, computed={computed_ready})"
        )

    return manifest


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--manifest",
        type=Path,
        default=DEFAULT_MANIFEST,
        help="readiness manifest path",
    )
    parser.add_argument(
        "--require-ready",
        action="store_true",
        help="exit 2 unless every launch gate is verified",
    )
    args = parser.parse_args(argv)

    try:
        manifest = load_manifest(args.manifest)
    except ManifestError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1

    blocked = [gate for gate in manifest["gates"] if gate["status"] == "blocked"]
    print(f"campaign_source_status={manifest['campaign_source_status']}")
    print(f"release_ready={str(manifest['release_ready']).lower()}")
    print(f"verified_gates={len(manifest['gates']) - len(blocked)}")
    print(f"blocked_gates={len(blocked)}")
    for gate in blocked:
        print(f"BLOCKED {gate['id']}: {gate['next_action']}")

    if args.require_ready and blocked:
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())
