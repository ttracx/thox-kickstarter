"""Parse T-N milestone timeline and assert ordering + date sanity.

Launch is 2026-08-12. Today (per repo state) is 2026-06-25. T-48 corresponds
to 2026-06-25. T-0 is launch day. Negative T (T+N) is post-launch.
"""

from __future__ import annotations

import datetime as dt
import pathlib
import re

import pytest

from .conftest import REPO_ROOT

MILESTONES = REPO_ROOT / "content" / "launch" / "MILESTONES.md"
TIMELINE = REPO_ROOT / "docs" / "TIMELINE.md"

LAUNCH_DATE = dt.date(2026, 8, 12)
TODAY = dt.date(2026, 6, 25)
GRACE_DAYS_PAST = 7  # allow recently-shipped Phase-1 deliverables already in the past

# T-N or T+N tokens, e.g. "T-48", "T+30", "T-0".
TN_RE = re.compile(r"\bT([+\-])(\d+)\b")

# ISO dates inside parens after T-N, e.g. (2026-06-25)
ISO_DATE_RE = re.compile(r"\b(20\d\d-\d\d-\d\d)\b")


def _parse_tn_offsets(text: str) -> list[int]:
    """Return signed week-day offsets from launch: T-48 -> -48, T+30 -> +30."""
    offsets = []
    for m in TN_RE.finditer(text):
        sign = -1 if m.group(1) == "-" else 1
        offsets.append(sign * int(m.group(2)))
    return offsets


def _parse_iso_dates(text: str) -> list[dt.date]:
    out = []
    for m in ISO_DATE_RE.finditer(text):
        try:
            out.append(dt.date.fromisoformat(m.group(1)))
        except ValueError:
            continue
    return out


def test_milestones_file_exists():
    assert MILESTONES.exists(), f"missing: {MILESTONES}"


def test_milestones_has_phase_headings():
    text = MILESTONES.read_text(encoding="utf-8")
    # Expect at least 5 phase sections.
    phases = re.findall(r"^##\s+Phase\s+\d+:", text, re.MULTILINE)
    assert len(phases) >= 5, f"expected 5+ phase headings, found {len(phases)}: {phases}"


def test_milestones_phase_order_ascending():
    text = MILESTONES.read_text(encoding="utf-8")
    nums = [int(n) for n in re.findall(r"^##\s+Phase\s+(\d+):", text, re.MULTILINE)]
    assert nums == sorted(nums), f"phase headings out of order: {nums}"


def test_milestones_t_offsets_present():
    text = MILESTONES.read_text(encoding="utf-8")
    offsets = _parse_tn_offsets(text)
    assert len(offsets) >= 10, f"expected 10+ T-N markers, got {len(offsets)}"


def test_milestones_t_offsets_within_bounds():
    """T-48 (oldest pre-launch) through T+150 (fulfillment) is the reasonable window."""
    text = MILESTONES.read_text(encoding="utf-8")
    offsets = _parse_tn_offsets(text)
    for off in offsets:
        assert -60 <= off <= 365, f"T-N offset {off} outside reasonable window"


def test_milestones_has_t48_starting_point():
    text = MILESTONES.read_text(encoding="utf-8")
    assert "T-48" in text, "T-48 starting marker missing"


def test_milestones_has_launch_t0():
    text = MILESTONES.read_text(encoding="utf-8")
    assert "T-0" in text, "T-0 launch day marker missing"


def test_milestones_iso_dates_within_campaign_window():
    """ISO dates in the milestone doc fall in a sensible launch window."""
    text = MILESTONES.read_text(encoding="utf-8")
    dates = _parse_iso_dates(text)
    # Sanity: should have at least a handful of dated rows.
    assert len(dates) >= 5, f"expected 5+ ISO dates, found {len(dates)}"
    earliest = LAUNCH_DATE - dt.timedelta(days=60)
    latest = LAUNCH_DATE + dt.timedelta(days=60)
    for d in dates:
        assert earliest <= d <= latest, (
            f"date {d} outside campaign window [{earliest}, {latest}]"
        )


def test_milestones_no_far_past_dates():
    """No date older than (TODAY - grace) days should appear in the forward-looking calendar."""
    text = MILESTONES.read_text(encoding="utf-8")
    cutoff = TODAY - dt.timedelta(days=GRACE_DAYS_PAST)
    for d in _parse_iso_dates(text):
        assert d >= cutoff, f"milestone date {d} is more than {GRACE_DAYS_PAST}d in the past"


def test_milestones_launch_date_referenced():
    text = MILESTONES.read_text(encoding="utf-8")
    assert "2026-08-12" in text, "launch date 2026-08-12 must be in MILESTONES.md"


def test_timeline_doc_exists_if_referenced():
    """docs/TIMELINE.md is cross-referenced from MILESTONES; it should exist."""
    ms_text = MILESTONES.read_text(encoding="utf-8")
    if "docs/TIMELINE.md" in ms_text:
        assert TIMELINE.exists(), "MILESTONES references docs/TIMELINE.md but file missing"
