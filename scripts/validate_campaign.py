#!/usr/bin/env python3
"""Validate THOX.ai Kickstarter quick-launch campaign docs."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]

REQUIRED_FILES = [
    "README.md",
    "ecosystem_map.md",
    "mvp_catalog.md",
    "development_queue.md",
    "architecture_decisions.md",
    "security_model.md",
    "SECURITY.md",
    "CHANGELOG.md",
    ".env.example",
    "config/launch-readiness.json",
    "docs/CAMPAIGN_INFO.md",
    "docs/KICKSTARTER_PAGE_COPY.md",
    "docs/REWARDS_MATRIX.md",
    "docs/QUICK_LAUNCH_RUNBOOK.md",
    "docs/SETUP_GUIDE.md",
    "docs/LAUNCH_CHECKLIST.md",
    "docs/VIDEO_PRODUCTION.md",
    "docs/VIDEO_SCRIPT.md",
    "docs/VIDEO_SCENE_PROMPTS.md",
    "docs/VIDEO_WALKTHROUGH_SCRIPT.md",
    "prompts/README.md",
    "examples/reward-tier-import.csv",
    "examples/demo-shot-list.csv",
    "agent_tasks/launch-operator.md",
    "demo/README.md",
    "demo/DEVICE_DEMOS.md",
    "demo/RECORDING_RUNBOOK.md",
    "demo/DEMO_ACCEPTANCE_CHECKLIST.md",
]

CANONICAL_DOCS = [
    "README.md",
    ".env.example",
    "ecosystem_map.md",
    "mvp_catalog.md",
    "development_queue.md",
    "docs/CAMPAIGN_INFO.md",
    "docs/KICKSTARTER_PAGE_COPY.md",
    "docs/REWARDS_MATRIX.md",
    "docs/QUICK_LAUNCH_RUNBOOK.md",
    "docs/SETUP_GUIDE.md",
    "docs/LAUNCH_CHECKLIST.md",
    "docs/VIDEO_PRODUCTION.md",
    "docs/VIDEO_SCRIPT.md",
    "docs/VIDEO_SCENE_PROMPTS.md",
    "docs/VIDEO_WALKTHROUGH_SCRIPT.md",
    "prompts/README.md",
    "demo/README.md",
    "demo/DEVICE_DEMOS.md",
    "demo/RECORDING_RUNBOOK.md",
    "demo/DEMO_ACCEPTANCE_CHECKLIST.md",
]

REQUIRED_TERMS = [
    "ThoxKey", "ThoxAir", "ThoxMini", "ThoxClip",
    "$39.99", "$99", "$199", "$399",
    "$24", "$69", "$149", "$299",
    "Craig Ross, CEO", "Tommy Xaypanya, CTO",
    "2026-07-07", "2026-08-06",
]

DEMO_REQUIRED_TERMS = [
    "standalone LLM computer",
    "wireless local-first companion",
    "compact local compute node",
    "premium command and capture device",
    "not a medical",
    "not a high-end inference workstation",
    "heavier work routes to capable local hardware",
]

LEGACY_PATTERNS = [
    r"\bThoxNova\b",
    r"\bThoxMini Air\b",
    r"\bThoxStick\b",
    r"\bPhamy\b",
    r"\bMilk-V\b",
    r"2026-08-12",
    r"2026-09-11",
    r"\bAugust 12, 2026\b",
    r"\bSeptember 11, 2026\b",
]


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def main() -> int:
    missing_files = [path for path in REQUIRED_FILES if not (ROOT / path).exists()]
    if missing_files:
        fail("Missing required files: " + ", ".join(missing_files))

    combined = "\n".join(read(path) for path in CANONICAL_DOCS)
    missing_terms = [term for term in REQUIRED_TERMS if term not in combined]
    if missing_terms:
        fail("Missing required campaign terms: " + ", ".join(missing_terms))

    demo_text = "\n".join(
        read(path)
        for path in [
            "demo/README.md",
            "demo/DEVICE_DEMOS.md",
            "demo/RECORDING_RUNBOOK.md",
            "demo/DEMO_ACCEPTANCE_CHECKLIST.md",
            "docs/VIDEO_WALKTHROUGH_SCRIPT.md",
        ]
    )
    demo_text_lower = demo_text.lower()
    missing_demo_terms = [
        term for term in DEMO_REQUIRED_TERMS if term.lower() not in demo_text_lower
    ]
    if missing_demo_terms:
        fail("Missing required demo guardrails: " + ", ".join(missing_demo_terms))

    for path in CANONICAL_DOCS:
        text = read(path)
        for pattern in LEGACY_PATTERNS:
            if re.search(pattern, text):
                fail(f"Legacy term matched {pattern!r} in {path}")

    print("THOX.ai Kickstarter campaign docs and demos validated.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
