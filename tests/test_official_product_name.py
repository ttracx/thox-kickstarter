from __future__ import annotations

from scripts.validate_campaign import CANONICAL_DOCS, LEGACY_PATTERNS, read


def test_thoxair_is_the_only_user_facing_air_product_name() -> None:
    combined = "\n".join(read(path) for path in CANONICAL_DOCS)

    assert "ThoxAir" in combined
    assert "ThoxMini Air" not in combined


def test_validator_rejects_the_retired_product_name() -> None:
    patterns = set(LEGACY_PATTERNS)

    assert r"\bThoxMini Air\b" in patterns
    assert r"\bThoxAir\b" not in patterns
