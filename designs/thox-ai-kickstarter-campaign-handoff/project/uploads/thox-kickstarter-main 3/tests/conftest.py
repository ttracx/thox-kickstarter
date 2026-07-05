"""Shared pytest fixtures and path helpers for the thox-kickstarter test suite."""

from __future__ import annotations

import os
import pathlib

import pytest

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]


@pytest.fixture(scope="session")
def repo_root() -> pathlib.Path:
    return REPO_ROOT


def _iter_text_files(roots, suffixes):
    for root in roots:
        if not root.exists():
            continue
        for path in root.rglob("*"):
            if not path.is_file():
                continue
            if path.suffix.lower() not in suffixes:
                continue
            # Skip rendered PDFs and other binaries by suffix already.
            yield path


def collect_brand_text_files():
    """Walk content/, launch/, press/, templates/, social/ for brand-voice lint."""
    roots = [
        REPO_ROOT / "content",
        REPO_ROOT / "templates",
        REPO_ROOT / "social",
        REPO_ROOT / "runbooks",
    ]
    suffixes = {".md", ".txt", ".yaml", ".yml"}
    return sorted(_iter_text_files(roots, suffixes))


def collect_email_markdown_files():
    """Return markdown files that contain a launch email sequence body."""
    candidates = [
        REPO_ROOT / "content" / "launch" / "EMAIL_SEQUENCE.md",
        REPO_ROOT / "templates" / "launch-day-email.md",
        REPO_ROOT / "templates" / "pre-launch-email.md",
        REPO_ROOT / "templates" / "weekly-update.md",
        REPO_ROOT / "templates" / "stretch-unlock-update.md",
    ]
    return [p for p in candidates if p.exists()]
