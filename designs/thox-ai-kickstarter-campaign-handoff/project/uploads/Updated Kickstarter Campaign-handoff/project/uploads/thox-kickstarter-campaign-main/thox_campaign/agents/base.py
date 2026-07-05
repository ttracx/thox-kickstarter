"""Base agent.

An :class:`Agent` wraps an :class:`~thox_campaign.config.AgentSpec`, its system
prompt, and an LLM client. :meth:`Agent.run` composes the brief with any upstream
agent outputs and returns an :class:`AgentResult`.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Mapping, Optional

from ..config import AgentSpec
from ..llm import LLMClient


@dataclass(frozen=True)
class AgentResult:
    """The output of a single agent run."""

    name: str
    output: str
    model: str


class Agent:
    """Runs one agent: prompt + LLM client + spec-driven parameters."""

    def __init__(
        self,
        spec: AgentSpec,
        llm: LLMClient,
        system_prompt: Optional[str] = None,
    ):
        self.spec = spec
        self.llm = llm
        self.system_prompt = system_prompt if system_prompt is not None else spec.load_prompt()

    def _build_user_message(self, brief: str, upstream: Mapping[str, str]) -> str:
        sections = [f"Campaign brief:\n{brief.strip()}"]
        for dep in self.spec.depends_on:
            if dep in upstream:
                sections.append(f"Output from {dep}:\n{upstream[dep].strip()}")
        sections.append(
            f"Produce the {self.spec.name} output. Role: {self.spec.role}"
        )
        return "\n\n".join(sections)

    def run(self, brief: str, upstream: Optional[Mapping[str, str]] = None) -> AgentResult:
        """Run the agent. Rejects an empty brief."""
        if not isinstance(brief, str) or not brief.strip():
            raise ValueError(f"Agent '{self.spec.name}' received an empty brief.")
        upstream = upstream or {}
        user = self._build_user_message(brief, upstream)
        output = self.llm.complete(
            system=self.system_prompt,
            user=user,
            model=self.spec.model,
            max_tokens=self.spec.max_tokens,
            temperature=self.spec.temperature,
        )
        return AgentResult(name=self.spec.name, output=output, model=self.spec.model)
