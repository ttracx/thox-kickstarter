"""Render every launch email through Jinja2 and assert no UndefinedError, no leftover tokens.

The 5-email pre-launch sequence lives in content/launch/EMAIL_SEQUENCE.md as five
markdown sections separated by `## Email N: T-N (...)`. Each section has a Subject,
optional Alt subject + Preview text, and a Body block (markdown blockquote `> ...`).

Per-email template fragments in templates/*.md use single-brace {token} format
(Python .format style) which Jinja2 leaves untouched; we render those with Jinja2
to confirm Jinja2 finds no undefined `{{ ... }}` tokens.
"""

from __future__ import annotations

import pathlib
import re

import pytest
from jinja2 import Environment, StrictUndefined, UndefinedError

from .conftest import REPO_ROOT, collect_email_markdown_files

EMAIL_SEQUENCE = REPO_ROOT / "content" / "launch" / "EMAIL_SEQUENCE.md"

JINJA_TOKEN_RE = re.compile(r"\{\{[^{}]+\}\}")

TEST_CONTEXT = {
    "first_name": "Tester",
    "unsubscribe_token": "test-token-abc123",
    "unsubscribe_url": "https://thox.ai/unsubscribe?t=test-token-abc123",
    "prelaunch_url": "https://thox.ai/launch",
    "kickstarter_url": "https://kickstarter.com/projects/thoxai/test",
}


def _jinja_env() -> Environment:
    return Environment(undefined=StrictUndefined, autoescape=False)


def _split_email_sections(text: str) -> dict[str, str]:
    """Return mapping of email_id -> raw section markdown (subject + body)."""
    sections = {}
    # Headers like:  ## Email 1: T-42 (Wed Jul 1, 2026)
    pattern = re.compile(r"^## Email\s+(\d+):.*$", re.MULTILINE)
    starts = [(m.start(), m.group(1)) for m in pattern.finditer(text)]
    for i, (pos, num) in enumerate(starts):
        end = starts[i + 1][0] if i + 1 < len(starts) else len(text)
        sections[f"email_{num}"] = text[pos:end].strip()
    return sections


def _extract_body(section: str) -> str:
    """Pull the markdown blockquote lines after the `Body:` marker."""
    body_lines = []
    in_body = False
    for line in section.splitlines():
        if line.strip().startswith("Body:"):
            in_body = True
            continue
        if in_body:
            # Body is the blockquote until a non-blockquote, non-blank line.
            stripped = line.strip()
            if stripped.startswith(">"):
                body_lines.append(stripped.lstrip("> ").rstrip())
            elif stripped == "":
                body_lines.append("")
            else:
                # End of blockquote.
                break
    return "\n".join(body_lines).strip()


def test_email_sequence_file_exists():
    assert EMAIL_SEQUENCE.exists(), f"missing: {EMAIL_SEQUENCE}"


def test_email_sequence_has_five_emails():
    text = EMAIL_SEQUENCE.read_text(encoding="utf-8")
    sections = _split_email_sections(text)
    assert len(sections) == 5, f"Expected 5 emails, found {len(sections)}: {sorted(sections)}"


SECTIONS = _split_email_sections(EMAIL_SEQUENCE.read_text(encoding="utf-8")) if EMAIL_SEQUENCE.exists() else {}


@pytest.mark.parametrize("email_id", sorted(SECTIONS.keys()))
def test_email_has_subject(email_id: str):
    section = SECTIONS[email_id]
    assert re.search(r"^Subject:\s+.+$", section, re.MULTILINE), f"{email_id} missing Subject"


@pytest.mark.parametrize("email_id", sorted(SECTIONS.keys()))
def test_email_has_body_block(email_id: str):
    section = SECTIONS[email_id]
    body = _extract_body(section)
    assert len(body) > 100, f"{email_id} body too short ({len(body)} chars)"


@pytest.mark.parametrize("email_id", sorted(SECTIONS.keys()))
def test_email_body_renders_through_jinja(email_id: str):
    section = SECTIONS[email_id]
    body = _extract_body(section)
    env = _jinja_env()
    try:
        rendered = env.from_string(body).render(**TEST_CONTEXT)
    except UndefinedError as exc:
        pytest.fail(f"{email_id} body has undefined Jinja token: {exc}")
    # No leftover `{{ ... }}` after render.
    leftover = JINJA_TOKEN_RE.findall(rendered)
    assert not leftover, f"{email_id} has leftover Jinja tokens after render: {leftover}"


@pytest.mark.parametrize("email_id", sorted(SECTIONS.keys()))
def test_email_section_has_alt_subject_or_preview(email_id: str):
    section = SECTIONS[email_id]
    has_alt = bool(re.search(r"^Alt subject", section, re.MULTILINE))
    has_preview = bool(re.search(r"^Preview text:", section, re.MULTILINE))
    assert has_alt or has_preview, f"{email_id} missing Alt subject and Preview text"


TEMPLATE_FILES = collect_email_markdown_files()


@pytest.mark.parametrize(
    "tmpl_path", [p for p in TEMPLATE_FILES if p.name != "EMAIL_SEQUENCE.md"], ids=lambda p: p.name
)
def test_email_template_renders(tmpl_path: pathlib.Path):
    """Single-brace {token} style templates render cleanly under Jinja2 (no leftover `{{ }}`)."""
    text = tmpl_path.read_text(encoding="utf-8")
    env = _jinja_env()
    try:
        rendered = env.from_string(text).render(**TEST_CONTEXT)
    except UndefinedError as exc:
        pytest.fail(f"{tmpl_path.name} undefined Jinja token: {exc}")
    leftover = JINJA_TOKEN_RE.findall(rendered)
    assert not leftover, f"{tmpl_path.name} has leftover Jinja tokens: {leftover}"
