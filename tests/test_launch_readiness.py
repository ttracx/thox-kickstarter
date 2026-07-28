from __future__ import annotations

import json
from pathlib import Path
import subprocess
import sys

from scripts.audit_launch_readiness import ManifestError, load_manifest


def test_readiness_manifest_is_valid_and_truthful(repo_root: Path) -> None:
    manifest = load_manifest(repo_root / "config" / "launch-readiness.json")

    assert manifest["campaign_source_status"] == "validated"
    assert manifest["release_ready"] is False
    assert any(gate["status"] == "blocked" for gate in manifest["gates"])


def test_require_ready_fails_while_operator_gates_are_blocked(repo_root: Path) -> None:
    result = subprocess.run(
        [sys.executable, "scripts/audit_launch_readiness.py", "--require-ready"],
        cwd=repo_root,
        text=True,
        capture_output=True,
        check=False,
    )

    assert result.returncode == 2
    assert "release_ready=false" in result.stdout
    assert "BLOCKED final-product-imagery:" in result.stdout


def test_manifest_rejects_declared_ready_when_gate_is_blocked(
    repo_root: Path, tmp_path: Path
) -> None:
    source = repo_root / "config" / "launch-readiness.json"
    manifest = json.loads(source.read_text(encoding="utf-8"))
    manifest["release_ready"] = True
    candidate = tmp_path / "invalid-readiness.json"
    candidate.write_text(json.dumps(manifest), encoding="utf-8")

    try:
        load_manifest(candidate)
    except ManifestError as exc:
        assert "release_ready does not match gate statuses" in str(exc)
    else:
        raise AssertionError("invalid readiness declaration was accepted")
