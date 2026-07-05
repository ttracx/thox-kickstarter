"""Enforce THOX brand voice rules across customer-facing copy.

Rules (per project memory + thox-brand-vault BRAND_GUIDELINES):
  1. No em-dashes (U+2014). Use hyphens or a sentence break instead.
  2. No emojis (common emoji unicode ranges).
  3. No Claude/Anthropic leaks ("As Claude", "I'm Claude", "Anthropic AI",
     "made by Claude", "by Anthropic").

Scope: customer-facing surfaces only. Internal operator docs under docs/
and template/style libraries under templates/social/ are excluded.
"""

from __future__ import annotations

import pathlib
import re

import pytest

from .conftest import REPO_ROOT

EM_DASH = "—"

# Common emoji unicode ranges. Not exhaustive; covers the bulk of consumer emoji.
EMOJI_RE = re.compile(
    "["
    "\U0001f300-\U0001f5ff"  # symbols & pictographs
    "\U0001f600-\U0001f64f"  # emoticons
    "\U0001f680-\U0001f6ff"  # transport & map
    "\U0001f700-\U0001f77f"
    "\U0001f780-\U0001f7ff"
    "\U0001f800-\U0001f8ff"
    "\U0001f900-\U0001f9ff"  # supplemental symbols & pictographs
    "\U0001fa00-\U0001fa6f"
    "\U0001fa70-\U0001faff"
    "\U00002700-\U000027bf"  # dingbats
    "\U0001f1e6-\U0001f1ff"  # regional indicators (flags)
    "]",
    flags=re.UNICODE,
)

CLAUDE_LEAK_RES = [
    re.compile(r"\bAs Claude\b", re.IGNORECASE),
    re.compile(r"\bI'?m Claude\b", re.IGNORECASE),
    re.compile(r"\bAnthropic AI\b", re.IGNORECASE),
    re.compile(r"\bmade by Claude\b", re.IGNORECASE),
    re.compile(r"\bby Anthropic\b", re.IGNORECASE),
]


def _collect_customer_facing_files() -> list[pathlib.Path]:
    """Customer-facing surface for brand-voice enforcement.

    Includes everything under content/ (launch, post-funding, manuals,
    partnerships) and runbooks/. Excludes templates/social/* (style library),
    docs/ (internal ops), and assets/social/ binaries.
    """
    roots = [REPO_ROOT / "content", REPO_ROOT / "runbooks"]
    suffixes = {".md", ".txt", ".yaml", ".yml"}
    files = []
    for root in roots:
        if not root.exists():
            continue
        for p in root.rglob("*"):
            if p.is_file() and p.suffix.lower() in suffixes:
                files.append(p)
    # Also include the top-level launch-day customer email + reply snippets.
    for name in (
        "launch-day-email.md",
        "pre-launch-email.md",
        "weekly-update.md",
        "stretch-unlock-update.md",
        "reply-snippets.md",
    ):
        candidate = REPO_ROOT / "templates" / name
        if candidate.exists():
            files.append(candidate)
    return sorted(files)


CUSTOMER_FILES = _collect_customer_facing_files()


def test_customer_files_discovered():
    assert len(CUSTOMER_FILES) >= 10, (
        f"expected 10+ customer-facing files, found {len(CUSTOMER_FILES)}"
    )


@pytest.mark.parametrize("path", CUSTOMER_FILES, ids=lambda p: str(p.relative_to(REPO_ROOT)).replace("\\", "/"))
def test_no_em_dash(path: pathlib.Path):
    text = path.read_text(encoding="utf-8")
    if EM_DASH in text:
        # Surface first line containing the violation.
        for i, line in enumerate(text.splitlines(), start=1):
            if EM_DASH in line:
                pytest.fail(
                    f"{path.relative_to(REPO_ROOT)}:{i} contains em-dash (U+2014): "
                    f"{line.strip()!r}"
                )


@pytest.mark.parametrize("path", CUSTOMER_FILES, ids=lambda p: str(p.relative_to(REPO_ROOT)).replace("\\", "/"))
def test_no_emoji(path: pathlib.Path):
    text = path.read_text(encoding="utf-8")
    match = EMOJI_RE.search(text)
    if match:
        # Find the line.
        offset = match.start()
        line_num = text[:offset].count("\n") + 1
        line = text.splitlines()[line_num - 1] if line_num <= len(text.splitlines()) else ""
        pytest.fail(
            f"{path.relative_to(REPO_ROOT)}:{line_num} contains emoji: {match.group()!r} "
            f"in line: {line.strip()!r}"
        )


@pytest.mark.parametrize("path", CUSTOMER_FILES, ids=lambda p: str(p.relative_to(REPO_ROOT)).replace("\\", "/"))
def test_no_claude_or_anthropic_leak(path: pathlib.Path):
    text = path.read_text(encoding="utf-8")
    for rx in CLAUDE_LEAK_RES:
        m = rx.search(text)
        if m:
            offset = m.start()
            line_num = text[:offset].count("\n") + 1
            pytest.fail(
                f"{path.relative_to(REPO_ROOT)}:{line_num} contains Claude/Anthropic leak: "
                f"{m.group()!r}"
            )
