"""Verify PULL_FORWARD_TRACKER.md cross-references resolve.

Every local path mention (one of the well-known top-level dirs in this repo)
must exist on disk. Every PR URL must be well-formed.

No network calls are made; PR URLs are only format-validated.
"""

from __future__ import annotations

import pathlib
import re

import pytest

from .conftest import REPO_ROOT

TRACKER = REPO_ROOT / "docs" / "PULL_FORWARD_TRACKER.md"

# Top-level dirs in THIS repo. A path starting with one of these is "local".
LOCAL_PREFIXES = (
    "content/",
    "docs/",
    "templates/",
    "social/",
    "runbooks/",
    "assets/",
    "scripts/",
    "tools/",
    "prompts/",
    "deliverables/",
    ".github/",
    "qa/",
)

# Match `path/file.ext` inside backticks. Restrict to common doc + code suffixes
# so we do not chase every word that contains a dot.
BACKTICK_PATH_RE = re.compile(
    r"`([A-Za-z0-9_./\-]+\.(?:md|py|sh|ps1|yml|yaml|json|toml|txt|pdf|svg|png|jpg|tsx|ts|mjs|rs|docx|pptx))`"
)

# Also catch bare path mentions (no backticks). Anchored on whitespace or start of line
# to avoid grabbing URL fragments. The first capture group is the path.
BARE_PATH_RE = re.compile(
    r"(?:(?<=\s)|(?<=^))((?:content|docs|templates|social|runbooks|assets|scripts|tools|prompts|deliverables|qa)/"
    r"[A-Za-z0-9_./\-]+\.(?:md|py|sh|ps1|yml|yaml|json|toml|txt|pdf|svg|png|jpg|tsx|ts|mjs|rs|docx|pptx))",
    re.MULTILINE,
)

# GitHub PR/issue URL format check.
GH_URL_RE = re.compile(r"https://github\.com/[A-Za-z0-9_.\-]+/[A-Za-z0-9_.\-]+(?:/(?:pull|issues|commit|tree|blob)/[^\s)\"']+)?")


def _load_tracker_text() -> str:
    assert TRACKER.exists(), f"PULL_FORWARD_TRACKER missing: {TRACKER}"
    return TRACKER.read_text(encoding="utf-8")


def _local_path_mentions() -> list[str]:
    text = _load_tracker_text()
    hits = set()
    for match in BACKTICK_PATH_RE.finditer(text):
        candidate = match.group(1).lstrip("./")
        if not candidate.startswith(LOCAL_PREFIXES):
            continue
        if candidate.startswith((".scratch/", "graphify-out/")):
            continue
        hits.add(candidate)
    for match in BARE_PATH_RE.finditer(text):
        candidate = match.group(1).lstrip("./")
        # Strip trailing punctuation that the regex tolerated.
        candidate = candidate.rstrip(".,;:)\"'")
        if not candidate.startswith(LOCAL_PREFIXES):
            continue
        if candidate.startswith((".scratch/", "graphify-out/")):
            continue
        hits.add(candidate)
    return sorted(hits)


def _github_urls() -> list[str]:
    text = _load_tracker_text()
    return sorted(set(GH_URL_RE.findall(text)))


def test_tracker_exists():
    assert TRACKER.exists()
    assert TRACKER.stat().st_size > 0


def test_tracker_has_local_path_mentions():
    # Sanity: regex actually finds at least one path mention.
    paths = _local_path_mentions()
    assert len(paths) >= 1, f"Expected at least 1 local path mention in tracker, found {len(paths)}"


LOCAL_PATHS = _local_path_mentions()


@pytest.mark.parametrize("relpath", LOCAL_PATHS)
def test_tracker_local_path_resolves(relpath: str):
    """Every local path mention in the tracker exists on disk."""
    target = REPO_ROOT / relpath
    assert target.exists(), f"PULL_FORWARD_TRACKER references missing path: {relpath}"


def test_tracker_pr_urls_well_formed():
    urls = _github_urls()
    # Should find at least a couple if not - format-only check.
    for url in urls:
        assert url.startswith("https://github.com/"), url
        # No spaces, no markdown leftovers.
        assert " " not in url
        assert ")" not in url


# Also audit local cross-references from the launch surface markdown.
LAUNCH_CROSSREF_SOURCES = [
    REPO_ROOT / "content" / "launch" / "MILESTONES.md",
    REPO_ROOT / "content" / "launch" / "STRETCH_GOALS.md",
    REPO_ROOT / "content" / "launch" / "REWARDS_FAQ.md",
    REPO_ROOT / "content" / "launch" / "VIDEO_SCRIPT.md",
    REPO_ROOT / "content" / "launch" / "STORYBOARD.md",
]


def _crossref_paths_from(src: pathlib.Path) -> list[str]:
    if not src.exists():
        return []
    text = src.read_text(encoding="utf-8")
    out = set()
    for m in BACKTICK_PATH_RE.finditer(text):
        cand = m.group(1).lstrip("./")
        if cand.startswith(LOCAL_PREFIXES) and not cand.startswith((".scratch/", "graphify-out/")):
            out.add(cand)
    return sorted(out)


_LAUNCH_CROSSREF_PAIRS = [
    (src.relative_to(REPO_ROOT).as_posix(), relpath)
    for src in LAUNCH_CROSSREF_SOURCES
    for relpath in _crossref_paths_from(src)
]


@pytest.mark.parametrize(
    "src,relpath",
    _LAUNCH_CROSSREF_PAIRS,
    ids=[f"{s} -> {r}" for s, r in _LAUNCH_CROSSREF_PAIRS],
)
def test_launch_doc_crossref_resolves(src: str, relpath: str):
    """Cross-references in launch-surface docs must resolve to a real file."""
    target = REPO_ROOT / relpath
    assert target.exists(), f"{src} references missing path: {relpath}"
