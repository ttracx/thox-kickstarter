from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_required_campaign_terms_present() -> None:
    text = "\n".join(
        (ROOT / path).read_text(encoding="utf-8")
        for path in [
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
