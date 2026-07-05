"""Configuration loaders and typed dataclasses for the Thox.ai campaign tooling.

All YAML config lives in ``config/``. This module loads
``brand_guardrails.yaml``, ``campaign.yaml``, and ``agents.yaml`` into frozen
dataclasses and validates them eagerly. Any problem raises :class:`ConfigError`
with a message that names the file and the offending value.
"""

from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import Any, Mapping, Optional, Sequence

try:
    import yaml
except ImportError as exc:  # pragma: no cover - dependency is declared in pyproject
    raise ImportError(
        "PyYAML is required. Install with `pip install -e \".[dev]\"`."
    ) from exc


# --------------------------------------------------------------------------- #
# Paths
# --------------------------------------------------------------------------- #

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONFIG_DIR = os.path.join(REPO_ROOT, "config")
PROMPT_DIR = os.path.join(REPO_ROOT, "prompts")

GUARDRAILS_PATH = os.path.join(CONFIG_DIR, "brand_guardrails.yaml")
CAMPAIGN_PATH = os.path.join(CONFIG_DIR, "campaign.yaml")
AGENTS_PATH = os.path.join(CONFIG_DIR, "agents.yaml")

VALID_SEVERITIES = ("error", "warning")


class ConfigError(Exception):
    """Raised when configuration is missing, malformed, or self-inconsistent."""


# --------------------------------------------------------------------------- #
# Low-level helpers
# --------------------------------------------------------------------------- #

def _load_yaml(path: str) -> Any:
    if not os.path.isfile(path):
        raise ConfigError(f"Config file not found: {path}")
    try:
        with open(path, "r", encoding="utf-8") as handle:
            return yaml.safe_load(handle)
    except yaml.YAMLError as exc:
        raise ConfigError(f"Invalid YAML in {path}: {exc}") from exc


def _require_mapping(data: Any, path: str) -> Mapping[str, Any]:
    if not isinstance(data, Mapping):
        raise ConfigError(f"{path}: expected a top-level mapping, got {type(data).__name__}.")
    return data


def _require(data: Mapping[str, Any], key: str, path: str) -> Any:
    if key not in data:
        raise ConfigError(f"{path}: missing required key '{key}'.")
    return data[key]


def _check_severity(severity: Any, path: str, context: str) -> str:
    if severity not in VALID_SEVERITIES:
        raise ConfigError(
            f"{path}: unknown severity '{severity}' for {context}; "
            f"expected one of {VALID_SEVERITIES}."
        )
    return severity


# --------------------------------------------------------------------------- #
# Guardrails
# --------------------------------------------------------------------------- #

@dataclass(frozen=True)
class PhraseRule:
    text: str
    severity: str
    reason: str


@dataclass(frozen=True)
class PatternRule:
    pattern: str
    severity: str
    reason: str
    flags: str = ""


@dataclass(frozen=True)
class GuardrailsConfig:
    forbidden_phrases: tuple[PhraseRule, ...]
    forbidden_patterns: tuple[PatternRule, ...]
    allowed_colorways: tuple[str, ...]
    forbid_emoji: bool
    approved_privacy_phrases: tuple[str, ...]
    public_skus: tuple[str, ...]


def load_guardrails(path: str = GUARDRAILS_PATH) -> GuardrailsConfig:
    """Load and validate the brand guardrails config."""
    data = _require_mapping(_load_yaml(path), path)

    phrases: list[PhraseRule] = []
    for i, raw in enumerate(data.get("forbidden_phrases", []) or []):
        if not isinstance(raw, Mapping):
            raise ConfigError(f"{path}: forbidden_phrases[{i}] must be a mapping.")
        text = _require(raw, "text", path)
        if not isinstance(text, str) or not text:
            raise ConfigError(f"{path}: forbidden_phrases[{i}].text must be a non-empty string.")
        severity = _check_severity(raw.get("severity"), path, f"forbidden_phrases[{i}]")
        reason = str(raw.get("reason", ""))
        phrases.append(PhraseRule(text=text, severity=severity, reason=reason))

    patterns: list[PatternRule] = []
    for i, raw in enumerate(data.get("forbidden_patterns", []) or []):
        if not isinstance(raw, Mapping):
            raise ConfigError(f"{path}: forbidden_patterns[{i}] must be a mapping.")
        pattern = _require(raw, "pattern", path)
        if not isinstance(pattern, str) or not pattern:
            raise ConfigError(f"{path}: forbidden_patterns[{i}].pattern must be a non-empty string.")
        severity = _check_severity(raw.get("severity"), path, f"forbidden_patterns[{i}]")
        reason = str(raw.get("reason", ""))
        flags = str(raw.get("flags", "") or "")
        patterns.append(PatternRule(pattern=pattern, severity=severity, reason=reason, flags=flags))

    return GuardrailsConfig(
        forbidden_phrases=tuple(phrases),
        forbidden_patterns=tuple(patterns),
        allowed_colorways=tuple(str(c) for c in (data.get("allowed_colorways") or [])),
        forbid_emoji=bool(data.get("forbid_emoji", False)),
        approved_privacy_phrases=tuple(str(p) for p in (data.get("approved_privacy_phrases") or [])),
        public_skus=tuple(str(s) for s in (data.get("public_skus") or [])),
    )


# --------------------------------------------------------------------------- #
# Campaign
# --------------------------------------------------------------------------- #

@dataclass(frozen=True)
class Sku:
    id: str
    name: str
    tagline: str
    locked: bool
    msrp: Optional[float] = None
    super_early_bird: Optional[float] = None
    price_working: Optional[float] = None
    colorways: tuple[str, ...] = ()
    features: tuple[str, ...] = ()


@dataclass(frozen=True)
class CampaignConfig:
    meta: Mapping[str, Any]
    founders: tuple[Mapping[str, Any], ...]
    skus: tuple[Sku, ...]
    phases: Mapping[str, Any]
    meshstack: Mapping[str, Any]

    def sku(self, sku_id: str) -> Sku:
        for sku in self.skus:
            if sku.id == sku_id:
                return sku
        raise KeyError(f"Unknown SKU id: {sku_id}")


def load_campaign(path: str = CAMPAIGN_PATH) -> CampaignConfig:
    """Load and validate the campaign config."""
    data = _require_mapping(_load_yaml(path), path)

    raw_skus = _require(data, "skus", path)
    if not isinstance(raw_skus, Sequence) or not raw_skus:
        raise ConfigError(f"{path}: 'skus' must be a non-empty list.")

    skus: list[Sku] = []
    seen_ids: set[str] = set()
    for i, raw in enumerate(raw_skus):
        if not isinstance(raw, Mapping):
            raise ConfigError(f"{path}: skus[{i}] must be a mapping.")
        sku_id = _require(raw, "id", path)
        if sku_id in seen_ids:
            raise ConfigError(f"{path}: duplicate SKU id '{sku_id}'.")
        seen_ids.add(sku_id)
        skus.append(
            Sku(
                id=str(sku_id),
                name=str(raw.get("name", sku_id)),
                tagline=str(raw.get("tagline", "")),
                locked=bool(raw.get("locked", False)),
                msrp=raw.get("msrp"),
                super_early_bird=raw.get("super_early_bird"),
                price_working=raw.get("price_working"),
                colorways=tuple(str(c) for c in (raw.get("colorways") or [])),
                features=tuple(str(f) for f in (raw.get("features") or [])),
            )
        )

    return CampaignConfig(
        meta=dict(_require_mapping(_require(data, "meta", path), path)),
        founders=tuple(dict(f) for f in (data.get("founders") or [])),
        skus=tuple(skus),
        phases=dict(_require_mapping(_require(data, "phases", path), path)),
        meshstack=dict(data.get("meshstack") or {}),
    )


# --------------------------------------------------------------------------- #
# Agents
# --------------------------------------------------------------------------- #

@dataclass(frozen=True)
class AgentSpec:
    name: str
    role: str
    prompt: str
    depends_on: tuple[str, ...]
    model: str
    max_tokens: int
    temperature: float

    def prompt_path(self) -> str:
        return os.path.join(PROMPT_DIR, self.prompt)

    def load_prompt(self) -> str:
        path = self.prompt_path()
        if not os.path.isfile(path):
            raise ConfigError(f"Prompt file not found for agent '{self.name}': {path}")
        with open(path, "r", encoding="utf-8") as handle:
            return handle.read()


@dataclass(frozen=True)
class AgentsConfig:
    defaults: Mapping[str, Any]
    gated: tuple[str, ...]
    agents: tuple[AgentSpec, ...]

    def names(self) -> tuple[str, ...]:
        return tuple(a.name for a in self.agents)

    def by_name(self, name: str) -> AgentSpec:
        for agent in self.agents:
            if agent.name == name:
                return agent
        raise KeyError(f"Unknown agent: {name}")


def load_agents(path: str = AGENTS_PATH) -> AgentsConfig:
    """Load and validate the agent team config."""
    data = _require_mapping(_load_yaml(path), path)

    defaults = dict(data.get("defaults") or {})
    default_model = str(defaults.get("model", "claude-sonnet-4-6"))
    default_max_tokens = int(defaults.get("max_tokens", 2048))
    default_temperature = float(defaults.get("temperature", 0.4))

    raw_agents = _require(data, "agents", path)
    if not isinstance(raw_agents, Sequence) or not raw_agents:
        raise ConfigError(f"{path}: 'agents' must be a non-empty list.")

    agents: list[AgentSpec] = []
    seen: set[str] = set()
    for i, raw in enumerate(raw_agents):
        if not isinstance(raw, Mapping):
            raise ConfigError(f"{path}: agents[{i}] must be a mapping.")
        name = _require(raw, "name", path)
        if name in seen:
            raise ConfigError(f"{path}: duplicate agent name '{name}'.")
        seen.add(name)
        depends_on = tuple(str(d) for d in (raw.get("depends_on") or []))
        agents.append(
            AgentSpec(
                name=str(name),
                role=str(raw.get("role", "")),
                prompt=str(_require(raw, "prompt", path)),
                depends_on=depends_on,
                model=str(raw.get("model", default_model)),
                max_tokens=int(raw.get("max_tokens", default_max_tokens)),
                temperature=float(raw.get("temperature", default_temperature)),
            )
        )

    # Dependencies must reference known agents.
    for agent in agents:
        for dep in agent.depends_on:
            if dep not in seen:
                raise ConfigError(
                    f"{path}: agent '{agent.name}' depends on unknown agent '{dep}'."
                )

    gated = tuple(str(g) for g in (data.get("gated") or []))
    for g in gated:
        if g not in seen:
            raise ConfigError(f"{path}: gated agent '{g}' is not defined.")

    return AgentsConfig(defaults=defaults, gated=gated, agents=tuple(agents))
