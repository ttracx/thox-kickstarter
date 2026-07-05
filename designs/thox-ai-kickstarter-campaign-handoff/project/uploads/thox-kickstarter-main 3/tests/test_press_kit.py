"""Validate press kit referenced assets resolve and structure invariants hold."""

from __future__ import annotations

import json
import pathlib
import re

import pytest

from .conftest import REPO_ROOT

PRESS_KIT_LAUNCH = REPO_ROOT / "content" / "launch" / "PRESS_KIT.md"
PRESS_KIT_DOCS = REPO_ROOT / "docs" / "PRESS_KIT.md"

LOCAL_PREFIXES = (
    "content/",
    "docs/",
    "templates/",
    "assets/",
    "scripts/",
    "tools/",
    "prompts/",
    "deliverables/",
    "social/",
    "runbooks/",
)

BACKTICK_PATH_RE = re.compile(
    r"`([A-Za-z0-9_./\-]+\.(?:md|py|sh|ps1|yml|yaml|json|toml|txt|pdf|svg|png|jpg|tsx|ts|mjs|rs|docx|pptx))`"
)


def _local_paths_in(text: str) -> list[str]:
    out = set()
    for m in BACKTICK_PATH_RE.finditer(text):
        cand = m.group(1).lstrip("./")
        if cand.startswith(LOCAL_PREFIXES) and not cand.startswith((".scratch/", "graphify-out/")):
            out.add(cand)
    return sorted(out)


def test_launch_press_kit_exists():
    assert PRESS_KIT_LAUNCH.exists(), f"missing: {PRESS_KIT_LAUNCH}"


def test_docs_press_kit_exists():
    assert PRESS_KIT_DOCS.exists(), f"missing: {PRESS_KIT_DOCS}"


def test_launch_press_kit_has_founder_bios():
    text = PRESS_KIT_LAUNCH.read_text(encoding="utf-8")
    # Both founders must be named in the bios section.
    assert "Tommy Xaypanya" in text, "launch press kit missing Tommy Xaypanya"
    assert "Craig Ross" in text, "launch press kit missing Craig Ross"


def test_launch_press_kit_has_per_sku_specs():
    text = PRESS_KIT_LAUNCH.read_text(encoding="utf-8")
    for sku in ("ThoxClip", "ThoxMini", "ThoxAir", "ThoxNova"):
        assert sku in text, f"launch press kit missing SKU section: {sku}"


def test_launch_press_kit_has_funding_anchors():
    text = PRESS_KIT_LAUNCH.read_text(encoding="utf-8")
    # $250K baseline + $3M ceiling are load-bearing campaign anchors.
    assert "$250" in text
    assert "$3,000,000" in text or "$3M" in text or "3,000,000" in text


LAUNCH_PRESS_PATHS = _local_paths_in(PRESS_KIT_LAUNCH.read_text(encoding="utf-8")) if PRESS_KIT_LAUNCH.exists() else []
DOCS_PRESS_PATHS = _local_paths_in(PRESS_KIT_DOCS.read_text(encoding="utf-8")) if PRESS_KIT_DOCS.exists() else []


@pytest.mark.parametrize("relpath", LAUNCH_PRESS_PATHS, ids=lambda p: p)
def test_launch_press_kit_local_paths_resolve(relpath: str):
    assert (REPO_ROOT / relpath).exists(), f"PRESS_KIT references missing path: {relpath}"


@pytest.mark.parametrize("relpath", DOCS_PRESS_PATHS, ids=lambda p: p)
def test_docs_press_kit_local_paths_resolve(relpath: str):
    assert (REPO_ROOT / relpath).exists(), f"docs/PRESS_KIT references missing path: {relpath}"


def test_press_kit_pdf_artifacts_present():
    """Rendered PDFs from the deliverables pipeline should be on disk."""
    expected = [
        REPO_ROOT / "content" / "launch" / "INVESTOR_DECK.pdf",
        REPO_ROOT / "content" / "launch" / "INVESTOR_DECK_ONE_PAGER.pdf",
    ]
    for pdf in expected:
        assert pdf.exists(), f"missing rendered PDF: {pdf}"
        assert pdf.stat().st_size > 1000, f"PDF suspiciously small: {pdf}"


def test_any_json_manifests_parse():
    """Any JSON manifest under content/, assets/, or deliverables/ must parse."""
    roots = [REPO_ROOT / "content", REPO_ROOT / "assets", REPO_ROOT / "deliverables"]
    found = 0
    for root in roots:
        if not root.exists():
            continue
        for jp in root.rglob("*.json"):
            found += 1
            try:
                json.loads(jp.read_text(encoding="utf-8"))
            except json.JSONDecodeError as exc:
                pytest.fail(f"invalid JSON {jp}: {exc}")
    # Sanity: even zero is fine, but log it.
    assert found >= 0
