"""Deterministic brand and compliance guardrail engine.

The engine scans text against the rules in ``config/brand_guardrails.yaml`` and
returns a :class:`ComplianceReport`. A report ``passed`` only when there are no
error-severity violations; warnings are reported but never block. This engine is
the trust boundary for public copy: every gated agent output and every generated
document must pass it.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Optional

from .config import GuardrailsConfig, PatternRule, PhraseRule, load_guardrails

# Explicit emoji ranges. Kept deliberately narrow and readable rather than
# pulling in a Unicode dependency. Covers the common pictographic blocks plus
# symbols, dingbats, flags, and variation selectors used to render emoji.
_EMOJI_RANGES = (
    (0x1F300, 0x1FAFF),  # Misc symbols & pictographs, emoticons, transport, supplemental, symbols-extended
    (0x2600, 0x27BF),    # Misc symbols and dingbats
    (0x1F1E6, 0x1F1FF),  # Regional indicator symbols (flags)
    (0x2190, 0x21FF),    # Arrows (decorative use as emoji)
    (0x2B00, 0x2BFF),    # Misc symbols and arrows
    (0xFE00, 0xFE0F),    # Variation selectors
    (0x1F000, 0x1F02F),  # Mahjong / dominoes
)

_EMOJI_PATTERN = re.compile(
    "[" + "".join(f"\\U{lo:08X}-\\U{hi:08X}" for lo, hi in _EMOJI_RANGES) + "]"
)


def _compile_flags(flags: str) -> int:
    value = 0
    mapping = {"i": re.IGNORECASE, "m": re.MULTILINE, "s": re.DOTALL}
    for ch in flags or "":
        if ch not in mapping:
            raise ValueError(f"Unsupported regex flag: '{ch}' in '{flags}'")
        value |= mapping[ch]
    return value


@dataclass(frozen=True)
class Violation:
    """A single guardrail hit."""

    kind: str          # "phrase", "pattern", or "emoji"
    severity: str      # "error" or "warning"
    rule: str          # the phrase, pattern, or label that matched
    reason: str        # human-readable explanation
    match: str         # the exact substring that triggered the rule
    start: int         # character offset of the match start
    end: int           # character offset of the match end

    def __str__(self) -> str:
        return (
            f"[{self.severity}] {self.kind}: {self.match!r} "
            f"(rule: {self.rule!r}) - {self.reason}"
        )


@dataclass(frozen=True)
class ComplianceReport:
    """Result of scanning a piece of text."""

    text: str
    violations: tuple[Violation, ...]

    @property
    def errors(self) -> tuple[Violation, ...]:
        return tuple(v for v in self.violations if v.severity == "error")

    @property
    def warnings(self) -> tuple[Violation, ...]:
        return tuple(v for v in self.violations if v.severity == "warning")

    @property
    def passed(self) -> bool:
        """True when there are no error-severity violations."""
        return len(self.errors) == 0

    def summary(self) -> str:
        if not self.violations:
            return "PASS: no guardrail violations."
        lines = [
            f"{'PASS' if self.passed else 'BLOCKED'}: "
            f"{len(self.errors)} error(s), {len(self.warnings)} warning(s)."
        ]
        for v in self.violations:
            lines.append(f"  - {v}")
        return "\n".join(lines)


class GuardrailViolation(Exception):
    """Raised by :meth:`GuardrailEngine.assert_clean` when copy is blocked."""

    def __init__(self, report: ComplianceReport):
        self.report = report
        super().__init__(report.summary())


class GuardrailEngine:
    """Compiles guardrail rules once and scans text against them."""

    def __init__(self, config: Optional[GuardrailsConfig] = None):
        self.config = config if config is not None else load_guardrails()
        self._phrase_rules = self._compile_phrases(self.config.forbidden_phrases)
        self._pattern_rules = self._compile_patterns(self.config.forbidden_patterns)

    @staticmethod
    def _compile_phrases(phrases: tuple[PhraseRule, ...]):
        compiled = []
        for rule in phrases:
            # Literal phrase, case-insensitive, bounded so substrings of larger
            # words do not match (e.g. "Intel" must not fire inside "intelligent").
            regex = re.compile(r"\b" + re.escape(rule.text) + r"\b", re.IGNORECASE)
            compiled.append((rule, regex))
        return compiled

    @staticmethod
    def _compile_patterns(patterns: tuple[PatternRule, ...]):
        compiled = []
        for rule in patterns:
            regex = re.compile(rule.pattern, _compile_flags(rule.flags))
            compiled.append((rule, regex))
        return compiled

    def scan(self, text: str) -> ComplianceReport:
        """Scan ``text`` and return a :class:`ComplianceReport`."""
        if not isinstance(text, str):
            raise TypeError(f"scan() expects str, got {type(text).__name__}")

        violations: list[Violation] = []

        for rule, regex in self._phrase_rules:
            for m in regex.finditer(text):
                violations.append(
                    Violation(
                        kind="phrase",
                        severity=rule.severity,
                        rule=rule.text,
                        reason=rule.reason,
                        match=m.group(0),
                        start=m.start(),
                        end=m.end(),
                    )
                )

        for rule, regex in self._pattern_rules:
            for m in regex.finditer(text):
                violations.append(
                    Violation(
                        kind="pattern",
                        severity=rule.severity,
                        rule=rule.pattern,
                        reason=rule.reason,
                        match=m.group(0),
                        start=m.start(),
                        end=m.end(),
                    )
                )

        if self.config.forbid_emoji:
            for m in _EMOJI_PATTERN.finditer(text):
                violations.append(
                    Violation(
                        kind="emoji",
                        severity="error",
                        rule="forbid_emoji",
                        reason="Emoji are forbidden anywhere.",
                        match=m.group(0),
                        start=m.start(),
                        end=m.end(),
                    )
                )

        violations.sort(key=lambda v: (v.start, v.end))
        return ComplianceReport(text=text, violations=tuple(violations))

    def assert_clean(self, text: str) -> ComplianceReport:
        """Scan and raise :class:`GuardrailViolation` if blocked. Returns the report otherwise."""
        report = self.scan(text)
        if not report.passed:
            raise GuardrailViolation(report)
        return report
