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
        "ThoxMini Air",
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

    for term in [
        "standalone LLM computer",
        "wireless local-first companion",
        "compact local compute node",
        "premium command and capture device",
        "not a medical",
        "not a high-end inference workstation",
        "heavier work routes to capable local hardware",
    ]:
        assert term in text
