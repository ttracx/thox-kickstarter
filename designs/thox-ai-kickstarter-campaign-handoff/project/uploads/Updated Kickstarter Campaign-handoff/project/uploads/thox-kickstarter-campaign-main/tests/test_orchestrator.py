"""Tests for the campaign orchestrator and supporting config."""

import pytest

from thox_campaign.config import load_agents, load_campaign, load_guardrails
from thox_campaign.llm import MockLLM
from thox_campaign.orchestrator import (
    OrchestratorError,
    run,
    topological_order,
)


def test_guardrails_load():
    config = load_guardrails()
    assert config.forbidden_phrases
    assert config.forbid_emoji is True
    assert "ThoxNova" in config.public_skus
    assert "Matte Black" in config.allowed_colorways


def test_team_dag_valid():
    config = load_agents()
    names = config.names()
    assert "campaign_manager" in names
    assert "content_writer" in names
    assert "analytics" in names
    # content_writer is the gated content step.
    assert "content_writer" in config.gated


def test_nova_locked_at_629():
    campaign = load_campaign()
    nova = campaign.sku("ThoxNova")
    assert nova.locked is True
    assert nova.super_early_bird == 629
    assert nova.msrp == 899


def test_topological_order_respects_dependencies():
    config = load_agents()
    order = topological_order(config)
    pos = {name: i for i, name in enumerate(order)}
    for agent in config.agents:
        for dep in agent.depends_on:
            assert pos[dep] < pos[agent.name]


def test_cycle_detection():
    # Build a config object with an artificial cycle.
    config = load_agents()
    from dataclasses import replace

    agents = list(config.agents)
    # Make campaign_manager depend on analytics, closing a loop.
    cm = next(a for a in agents if a.name == "campaign_manager")
    idx = agents.index(cm)
    agents[idx] = replace(cm, depends_on=("analytics",))
    looped = replace(config, agents=tuple(agents))
    with pytest.raises(OrchestratorError):
        topological_order(looped)


def test_dry_run_passes_with_clean_content():
    report = run("Launch day brief", llm=MockLLM())
    assert report.ok
    assert not report.blocked
    assert not report.skipped
    # Every agent ran.
    assert set(report.results) == set(report.order)


class _DirtyLLM:
    """LLM whose content_writer output trips the gate."""

    def complete(self, system, user, model, max_tokens, temperature):
        if "Agent: content_writer" in system:
            return "Patent Pending ThoxNova with 100 TOPS in Midnight Black."
        return "Clean downstream copy: data stays on your devices."


def test_dirty_content_blocks_and_skips_downstream():
    report = run("Launch day brief", llm=_DirtyLLM(), strict=True)
    assert not report.ok
    assert "content_writer" in report.blocked
    # Everything depending on content_writer (transitively) is skipped.
    for downstream in ["compliance_guardian", "social_scheduler", "email_sequencer", "analytics"]:
        assert downstream in report.skipped


def test_dirty_content_no_strict_runs_downstream():
    report = run("Launch day brief", llm=_DirtyLLM(), strict=False)
    assert not report.ok
    assert "content_writer" in report.blocked
    # Without strict mode, downstream still runs.
    assert not report.skipped
    assert "analytics" in report.results


def test_empty_brief_rejected():
    with pytest.raises(ValueError):
        run("   ", llm=MockLLM())
