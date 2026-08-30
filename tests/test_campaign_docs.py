from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def read_many(paths: list[str]) -> str:
    return "\n".join((ROOT / path).read_text(encoding="utf-8") for path in paths)


def test_required_campaign_terms_present() -> None:
    text = read_many(
        [
            "README.md",
            "docs/CAMPAIGN_INFO.md",
            "docs/REWARDS_MATRIX.md",
            "docs/KICKSTARTER_PAGE_COPY.md",
        ]
    )

    for term in [
        "ThoxKey",
        "ThoxAir",
        "ThoxMini",
        "ThoxClip",
        "$39.99",
        "$99",
        "$199",
        "$399",
        "Craig Ross, CEO",
        "Tommy Xaypanya, CTO",
    ]:
        assert term in text


def test_device_demo_guardrails_present() -> None:
    text = read_many(
        [
            "demo/README.md",
            "demo/DEVICE_DEMOS.md",
            "demo/RECORDING_RUNBOOK.md",
            "demo/DEMO_ACCEPTANCE_CHECKLIST.md",
            "docs/VIDEO_WALKTHROUGH_SCRIPT.md",
        ]
    )

    text_lower = text.lower()
    for term in [
        "standalone LLM computer",
        "wireless local-first companion",
        "compact local compute node",
        "premium command and capture device",
        "not a medical",
        "not a high-end inference workstation",
        "heavier work routes to capable local hardware",
    ]:
        assert term.lower() in text_lower, term


def test_canonical_launch_window_is_consistent() -> None:
    text = read_many(
        [
            ".env.example",
            "docs/CAMPAIGN_INFO.md",
            "docs/SETUP_GUIDE.md",
        ]
    )

    assert "2026-09-08" in text
    assert "2026-10-08" in text
    assert "September 8, 2026" in text
    assert "October 8, 2026" in text
    for retired_date in [
        "2026-07-07",
        "2026-08-06",
        "July 7, 2026",
        "August 6, 2026",
        "2026-08-12",
        "2026-09-11",
        "August 12, 2026",
        "September 11, 2026",
        "2026-09-01",
        "2026-10-01",
        "September 1, 2026",
        "October 1, 2026",
    ]:
        assert retired_date not in text
