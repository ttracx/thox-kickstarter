"""LLM client abstraction.

``LLMClient`` is the protocol the agents depend on. ``AnthropicLLM`` is the live
implementation; it imports the Anthropic SDK lazily so the SDK is never required
for tests or the mock pipeline. ``MockLLM`` returns deterministic,
compliance-clean copy keyed by the agent name found in the system prompt, so the
full pipeline runs offline.
"""

from __future__ import annotations

import os
import re
import time
from typing import Protocol, runtime_checkable

_AGENT_LINE = re.compile(r"^Agent:\s*(?P<name>[\w-]+)", re.MULTILINE)


def _agent_name_from_system(system: str) -> str:
    match = _AGENT_LINE.search(system or "")
    return match.group("name") if match else "unknown"


@runtime_checkable
class LLMClient(Protocol):
    """Minimal completion interface used by the agents."""

    def complete(
        self,
        system: str,
        user: str,
        model: str,
        max_tokens: int,
        temperature: float,
    ) -> str:
        ...


class AnthropicLLM:
    """Live client backed by the Anthropic SDK.

    The SDK is imported lazily and the API key is read from the environment, so
    importing this module never requires the SDK or a key. Transient failures
    are retried with exponential backoff.
    """

    def __init__(
        self,
        api_key: str | None = None,
        max_retries: int = 4,
        base_delay: float = 1.0,
    ):
        self._api_key = api_key or os.environ.get("ANTHROPIC_API_KEY")
        self._max_retries = max_retries
        self._base_delay = base_delay
        self._client = None  # constructed lazily

    def _ensure_client(self):
        if self._client is not None:
            return self._client
        if not self._api_key:
            raise RuntimeError(
                "ANTHROPIC_API_KEY is not set. Set it in the environment for live runs, "
                "or use MockLLM for offline runs."
            )
        try:
            import anthropic  # lazy import; only needed for live runs
        except ImportError as exc:
            raise RuntimeError(
                "The anthropic package is not installed. Install with "
                "`pip install -e \".[live]\"` for live runs."
            ) from exc
        self._client = anthropic.Anthropic(api_key=self._api_key)
        return self._client

    def complete(
        self,
        system: str,
        user: str,
        model: str,
        max_tokens: int,
        temperature: float,
    ) -> str:
        client = self._ensure_client()
        last_exc: Exception | None = None
        for attempt in range(self._max_retries):
            try:
                message = client.messages.create(
                    model=model,
                    max_tokens=max_tokens,
                    temperature=temperature,
                    system=system,
                    messages=[{"role": "user", "content": user}],
                )
                parts = [
                    block.text
                    for block in message.content
                    if getattr(block, "type", None) == "text"
                ]
                return "".join(parts).strip()
            except Exception as exc:  # noqa: BLE001 - retry on any transient SDK error
                last_exc = exc
                if attempt < self._max_retries - 1:
                    time.sleep(self._base_delay * (2 ** attempt))
        raise RuntimeError(
            f"Anthropic request failed after {self._max_retries} attempts: {last_exc}"
        ) from last_exc


class MockLLM:
    """Deterministic, compliance-clean client for offline runs and tests.

    Output is keyed by the agent name parsed from the system prompt's
    "Agent: <name>" line, so the full pipeline produces stable, clean copy
    without any network access.
    """

    def complete(
        self,
        system: str,
        user: str,
        model: str,
        max_tokens: int,
        temperature: float,
    ) -> str:
        name = _agent_name_from_system(system)
        builder = _MOCK_OUTPUTS.get(name, _mock_default)
        return builder(user)


def _mock_default(brief: str) -> str:
    return (
        "Thox.ai campaign note. The Founder Reservation is live now for ThoxNova "
        "with a refundable deposit, estimated shipping Q4 2026. Data stays on your devices."
    )


def _mock_campaign_manager(brief: str) -> str:
    return (
        "Campaign objective: drive Founder Reservations for ThoxNova and build the "
        "day-one backer list for the Kickstarter.\n"
        "Audience: privacy-minded buyers who want edge AI they control.\n"
        "Key messages: data stays on your devices; works offline on LAN after pairing; "
        "manufactured by Thox.ai LLC.\n"
        "Sequencing: phase one Founder Reservation (ThoxNova, refundable deposit), "
        "then phase two Kickstarter across ThoxNova, ThoxClip, ThoxMini, ThoxAir, and ThoxOnStick.\n"
        "Deliverables for content: campaign story, FAQ, email sequences, social hooks, press release."
    )


def _mock_content_writer(brief: str) -> str:
    return (
        "ThoxNova is a privacy-first edge AI device that runs ThoxOS. Data stays on "
        "your devices, and MeshStack works offline on LAN after pairing using the "
        "WireGuard protocol, so the coordinator never sees plaintext. The family also "
        "includes ThoxClip, ThoxMini, ThoxAir, and ThoxOnStick. ThoxNova comes in "
        "Matte Black, Space Gray, and Arctic White. The Founder Reservation is live now "
        "with a refundable deposit credited toward purchase, and estimated shipping is "
        "Q4 2026. Every device is manufactured by Thox.ai LLC."
    )


def _mock_compliance_guardian(brief: str) -> str:
    return (
        "Compliance verdict: the copy holds the conservative line. Privacy claims use "
        "the approved phrasing, the manufacturer is stated as Thox.ai LLC, colorways are "
        "limited to Matte Black, Space Gray, and Arctic White, and only the five public "
        "SKUs appear. No forbidden terms detected. Cleared for downstream use."
    )


def _mock_social_scheduler(brief: str) -> str:
    return (
        "Social calendar summary.\n"
        "Pre-launch: tease the Founder Reservation for ThoxNova.\n"
        "Day 1: reservations open, refundable deposit. Platform: X. Hook: own your edge AI.\n"
        "Day 7: how devices work together with MagStack and MeshStack. Platform: LinkedIn.\n"
        "Day 14: privacy explainer, data stays on your devices. Platform: Mastodon.\n"
        "Day 30: final call before the Kickstarter phase. Platform: X."
    )


def _mock_email_sequencer(brief: str) -> str:
    return (
        "Email sequence summary.\n"
        "Pre-launch 1. Subject: Your ThoxNova reservation is almost open. "
        "Preview: Privacy-first edge AI is coming. Body: data stays on your devices.\n"
        "Launch day. Subject: Founder Reservations are open. Preview: Refundable deposit, "
        "credited toward purchase. Body: reserve your ThoxNova, estimated shipping Q4 2026.\n"
        "Onboarding. Subject: Welcome to Thox.ai. Preview: Here is what happens next. "
        "Body: thank you for reserving, manufactured by Thox.ai LLC."
    )


def _mock_analytics(brief: str) -> str:
    return (
        "Analytics report. The social calendar and email sequences are aligned on the "
        "Founder Reservation for ThoxNova and the Kickstarter phase across all five SKUs. "
        "Coverage is consistent and privacy messaging uses the approved phrasing. "
        "Recommendations: keep launch-day and final-48-hours touchpoints synchronized, "
        "and treat the reservation list as day-one backers for the Kickstarter."
    )


_MOCK_OUTPUTS = {
    "campaign_manager": _mock_campaign_manager,
    "content_writer": _mock_content_writer,
    "compliance_guardian": _mock_compliance_guardian,
    "social_scheduler": _mock_social_scheduler,
    "email_sequencer": _mock_email_sequencer,
    "analytics": _mock_analytics,
}
