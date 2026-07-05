"""Tests for the deterministic guardrail engine."""

import pytest

from thox_campaign.guardrails import (
    ComplianceReport,
    GuardrailEngine,
    GuardrailViolation,
)


@pytest.fixture(scope="module")
def engine() -> GuardrailEngine:
    return GuardrailEngine()


def test_clean_copy_passes(engine: GuardrailEngine):
    text = (
        "ThoxNova runs ThoxOS. Data stays on your devices, and MeshStack works "
        "offline on LAN after pairing using the WireGuard protocol. Manufactured "
        "by Thox.ai LLC. Colorways: Matte Black, Space Gray, Arctic White."
    )
    report = engine.scan(text)
    assert report.passed
    assert report.errors == ()


@pytest.mark.parametrize(
    "text",
    [
        "Patent Pending on the coupling.",
        "Delivers 100 TOPS of compute.",
        "Available in Midnight Black.",
        "Privacy first — always.",  # em dash
        "We love privacy \U0001F600",     # emoji
        "Qi2 charging supported.",
        "Built with Seeed Studio.",
        "Powered by NVIDIA modules.",
        "Runs on an Intel chip.",
        "Our devices are HIPAA compliant.",
    ],
)
def test_forbidden_inputs_are_blocked(engine: GuardrailEngine, text: str):
    report = engine.scan(text)
    assert not report.passed
    assert len(report.errors) >= 1


def test_intel_does_not_false_match_intelligent(engine: GuardrailEngine):
    report = engine.scan("Intelligent edge inference keeps your data private.")
    assert report.passed


def test_warnings_do_not_block(engine: GuardrailEngine):
    # A latency figure is a warning, not an error.
    report = engine.scan("Responses in under 50ms on device.")
    assert report.warnings
    assert report.passed


def test_assert_clean_raises_on_block(engine: GuardrailEngine):
    with pytest.raises(GuardrailViolation):
        engine.assert_clean("Patent Pending.")


def test_assert_clean_returns_report_when_clean(engine: GuardrailEngine):
    report = engine.assert_clean("Data stays on your devices.")
    assert isinstance(report, ComplianceReport)
    assert report.passed


def test_non_string_input_raises_type_error(engine: GuardrailEngine):
    with pytest.raises(TypeError):
        engine.scan(123)  # type: ignore[arg-type]


def test_summary_is_readable(engine: GuardrailEngine):
    report = engine.scan("Patent Pending.")
    summary = report.summary()
    assert "BLOCKED" in summary
    assert "Patent Pending" in summary
