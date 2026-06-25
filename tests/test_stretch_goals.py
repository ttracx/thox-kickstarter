"""Parse the stretch goal ladder and assert pricing + structural invariants."""

from __future__ import annotations

import pathlib
import re

import pytest

from .conftest import REPO_ROOT

LAUNCH_LADDER = REPO_ROOT / "content" / "launch" / "STRETCH_GOALS.md"
DOCS_LADDER = REPO_ROOT / "docs" / "STRETCH_GOALS.md"

# Match `## $250K - title` or `## $1.0M - title`. The dash may be hyphen-minus.
HEADING_RE = re.compile(
    r"^##\s+\$([\d.]+)\s*([KM])\s*[-–—]\s*(.+?)\s*$",
    re.MULTILINE,
)


def _parse_ladder(text: str) -> list[tuple[float, str, str]]:
    """Return list of (amount_usd, raw_label, description_first_line)."""
    rows = []
    for m in HEADING_RE.finditer(text):
        num = float(m.group(1))
        unit = m.group(2)
        title = m.group(3).strip()
        multiplier = 1_000 if unit == "K" else 1_000_000
        usd = num * multiplier
        # First non-blank line after the heading is the description.
        start = m.end()
        desc = ""
        for line in text[start:].splitlines():
            stripped = line.strip()
            if stripped.startswith("> ") or (stripped and not stripped.startswith("#")):
                desc = stripped.lstrip("> ").strip()
                break
        rows.append((usd, title, desc))
    return rows


def test_launch_ladder_file_exists():
    assert LAUNCH_LADDER.exists(), f"missing: {LAUNCH_LADDER}"


def test_docs_ladder_file_exists():
    assert DOCS_LADDER.exists(), f"missing: {DOCS_LADDER}"


def test_launch_ladder_parses_multiple_tiers():
    rows = _parse_ladder(LAUNCH_LADDER.read_text(encoding="utf-8"))
    assert len(rows) >= 6, f"expected 6+ tiers in launch ladder, got {len(rows)}: {rows}"


def test_launch_ladder_strictly_monotonic():
    rows = _parse_ladder(LAUNCH_LADDER.read_text(encoding="utf-8"))
    amounts = [r[0] for r in rows]
    for prev, curr in zip(amounts, amounts[1:]):
        assert curr > prev, f"non-monotonic stretch tiers: {amounts}"


def test_launch_ladder_no_duplicate_tiers():
    rows = _parse_ladder(LAUNCH_LADDER.read_text(encoding="utf-8"))
    amounts = [r[0] for r in rows]
    assert len(amounts) == len(set(amounts)), f"duplicate tier amount: {amounts}"


def test_launch_ladder_baseline_is_250k():
    rows = _parse_ladder(LAUNCH_LADDER.read_text(encoding="utf-8"))
    assert rows[0][0] == 250_000, f"expected baseline $250K, got ${rows[0][0]:,.0f}"


def test_launch_ladder_ceiling_is_3m():
    rows = _parse_ladder(LAUNCH_LADDER.read_text(encoding="utf-8"))
    assert rows[-1][0] == 3_000_000, f"expected ceiling $3M, got ${rows[-1][0]:,.0f}"


LAUNCH_ROWS = _parse_ladder(LAUNCH_LADDER.read_text(encoding="utf-8")) if LAUNCH_LADDER.exists() else []


@pytest.mark.parametrize(
    "usd,label,desc", LAUNCH_ROWS, ids=lambda v: str(v) if not isinstance(v, str) else v
)
def test_launch_tier_has_non_empty_description(usd: float, label: str, desc: str):
    assert desc.strip(), f"tier ${usd:,.0f} '{label}' has empty description"


def test_docs_ladder_strictly_monotonic_too():
    rows = _parse_ladder(DOCS_LADDER.read_text(encoding="utf-8"))
    if not rows:
        pytest.skip("docs/STRETCH_GOALS.md uses a different heading format")
    amounts = [r[0] for r in rows]
    for prev, curr in zip(amounts, amounts[1:]):
        assert curr > prev, f"docs ladder non-monotonic: {amounts}"


def test_launch_ladder_anchors_match_milestones():
    """Stretch unlock anchors in MILESTONES.md must reference the same tiers."""
    milestones = REPO_ROOT / "content" / "launch" / "MILESTONES.md"
    if not milestones.exists():
        pytest.skip("MILESTONES.md not present")
    ms_text = milestones.read_text(encoding="utf-8")
    for usd, label, _desc in LAUNCH_ROWS:
        if usd == 250_000:
            assert "$250K" in ms_text
        elif usd == 500_000:
            assert "$500K" in ms_text
        elif usd == 1_000_000:
            assert "$1M" in ms_text or "$1,000,000" in ms_text or "$1.0M" in ms_text
        elif usd == 3_000_000:
            assert "$3M" in ms_text or "$3,000,000" in ms_text or "$3.0M" in ms_text
