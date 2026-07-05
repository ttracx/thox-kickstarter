"""Campaign orchestrator.

Builds the agent team from ``agents.yaml``, computes a topological order over
``depends_on`` (with cycle detection), runs each agent feeding upstream outputs
forward, and runs the deterministic :class:`~thox_campaign.guardrails.GuardrailEngine`
on every gated agent output.

Modeled on a fixed-team, explicit-DAG design with a hard gate on every content
step: when a gated output fails the gate it is marked blocked, and in strict mode
every downstream agent that depends on it (transitively) is skipped.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Mapping, Optional

from .agents.base import Agent, AgentResult
from .config import AgentsConfig, ConfigError, load_agents
from .guardrails import ComplianceReport, GuardrailEngine
from .llm import LLMClient, MockLLM


class OrchestratorError(Exception):
    """Raised for structural problems in the agent DAG."""


def topological_order(config: AgentsConfig) -> tuple[str, ...]:
    """Return agent names in dependency order. Raises on cycles.

    Uses depth-first search with explicit colouring so a cycle is reported with
    a readable message rather than a recursion error.
    """
    names = set(config.names())
    WHITE, GREY, BLACK = 0, 1, 2
    color = {name: WHITE for name in names}
    order: list[str] = []

    def visit(name: str, stack: list[str]) -> None:
        color[name] = GREY
        stack.append(name)
        for dep in config.by_name(name).depends_on:
            if color[dep] == GREY:
                cycle = " -> ".join(stack[stack.index(dep):] + [dep])
                raise OrchestratorError(f"Dependency cycle detected: {cycle}")
            if color[dep] == WHITE:
                visit(dep, stack)
        stack.pop()
        color[name] = BLACK
        order.append(name)

    # Visit in declaration order for deterministic output.
    for agent in config.agents:
        if color[agent.name] == WHITE:
            visit(agent.name, [])
    return tuple(order)


def build_agents(
    config: AgentsConfig,
    llm: LLMClient,
) -> dict[str, Agent]:
    """Construct an :class:`Agent` for every spec in the config."""
    return {spec.name: Agent(spec=spec, llm=llm) for spec in config.agents}


@dataclass(frozen=True)
class RunReport:
    """Result of an orchestrator run."""

    ok: bool
    order: tuple[str, ...]
    results: Mapping[str, AgentResult]
    reports: Mapping[str, ComplianceReport]
    blocked: tuple[str, ...]
    skipped: tuple[str, ...]
    strict: bool = True

    def summary(self) -> str:
        status = "OK" if self.ok else "FAILED"
        lines = [
            f"Run {status} (strict={self.strict}).",
            f"  Order: {' -> '.join(self.order)}",
            f"  Ran: {', '.join(self.results) or '(none)'}",
        ]
        if self.blocked:
            lines.append(f"  Blocked by gate: {', '.join(self.blocked)}")
        if self.skipped:
            lines.append(f"  Skipped downstream: {', '.join(self.skipped)}")
        for name in self.blocked:
            report = self.reports.get(name)
            if report is not None:
                for line in report.summary().splitlines():
                    lines.append(f"    {name}: {line}")
        return "\n".join(lines)


def run(
    brief: str,
    *,
    agents_config: Optional[AgentsConfig] = None,
    engine: Optional[GuardrailEngine] = None,
    llm: Optional[LLMClient] = None,
    strict: bool = True,
    gated: Optional[tuple[str, ...]] = None,
) -> RunReport:
    """Run the full campaign DAG with the deterministic compliance gate.

    :param brief: the campaign brief. Must be non-empty.
    :param agents_config: the team config; loaded from ``agents.yaml`` by default.
    :param engine: the guardrail engine; constructed from default config by default.
    :param llm: the LLM client; :class:`MockLLM` by default for offline runs.
    :param strict: when True, skip downstream agents of any blocked gate.
    :param gated: override for the set of gated agent names.
    """
    if not isinstance(brief, str) or not brief.strip():
        raise ValueError("run() requires a non-empty brief.")

    config = agents_config if agents_config is not None else load_agents()
    engine = engine if engine is not None else GuardrailEngine()
    llm = llm if llm is not None else MockLLM()
    gated_set = set(gated if gated is not None else config.gated)

    order = topological_order(config)
    agents = build_agents(config, llm)

    results: dict[str, AgentResult] = {}
    reports: dict[str, ComplianceReport] = {}
    blocked: list[str] = []
    skipped: list[str] = []
    tainted: set[str] = set()  # blocked or skipped agents

    for name in order:
        spec = config.by_name(name)

        # Skip if any dependency is tainted and we are in strict mode.
        if strict and any(dep in tainted for dep in spec.depends_on):
            skipped.append(name)
            tainted.add(name)
            continue

        upstream = {
            dep: results[dep].output
            for dep in spec.depends_on
            if dep in results
        }
        result = agents[name].run(brief, upstream)
        results[name] = result

        if name in gated_set:
            report = engine.scan(result.output)
            reports[name] = report
            if not report.passed:
                blocked.append(name)
                tainted.add(name)

    return RunReport(
        ok=len(blocked) == 0,
        order=order,
        results=results,
        reports=reports,
        blocked=tuple(blocked),
        skipped=tuple(skipped),
        strict=strict,
    )
