"""Weighted option scoring for campaign prioritization decisions.

Each :class:`Option` is scored on four factors in the range [1, 10] with fixed
weights. :func:`rank` orders options best-first (stable on ties) and
:func:`as_table` renders the math as a Markdown table with a recommendation.
"""

from __future__ import annotations

from dataclasses import dataclass

# Fixed weights. They sum to 1.0.
WEIGHT_MARKET = 0.4
WEIGHT_TECHNICAL = 0.3
WEIGHT_TIME_TO_MARKET = 0.2
WEIGHT_STRATEGIC = 0.1

_FACTOR_MIN = 1
_FACTOR_MAX = 10


def _check_factor(value: float, name: str) -> float:
    if not isinstance(value, (int, float)) or isinstance(value, bool):
        raise TypeError(f"{name} must be a number, got {type(value).__name__}")
    if value < _FACTOR_MIN or value > _FACTOR_MAX:
        raise ValueError(
            f"{name} must be in [{_FACTOR_MIN}, {_FACTOR_MAX}], got {value}"
        )
    return float(value)


@dataclass(frozen=True)
class Option:
    """A campaign option scored on four weighted factors."""

    name: str
    market: float
    technical: float
    time_to_market: float
    strategic: float

    def __post_init__(self) -> None:
        _check_factor(self.market, "market")
        _check_factor(self.technical, "technical")
        _check_factor(self.time_to_market, "time_to_market")
        _check_factor(self.strategic, "strategic")
        if not self.name or not isinstance(self.name, str):
            raise ValueError("Option.name must be a non-empty string")

    @property
    def score(self) -> float:
        return (
            self.market * WEIGHT_MARKET
            + self.technical * WEIGHT_TECHNICAL
            + self.time_to_market * WEIGHT_TIME_TO_MARKET
            + self.strategic * WEIGHT_STRATEGIC
        )


def rank(options: list[Option]) -> list[Option]:
    """Return options sorted by score descending. Stable on ties."""
    if not options:
        raise ValueError("rank() requires at least one option")
    # sorted() is stable, so ties keep their input order.
    return sorted(options, key=lambda o: o.score, reverse=True)


def as_table(options: list[Option]) -> str:
    """Render a Markdown table showing the score math and a recommendation."""
    ranked = rank(options)
    header = (
        "| Rank | Option | Market (0.4) | Technical (0.3) | "
        "Time to market (0.2) | Strategic (0.1) | Score |"
    )
    divider = "| --- | --- | --- | --- | --- | --- | --- |"
    rows = [header, divider]
    for i, opt in enumerate(ranked, start=1):
        rows.append(
            f"| {i} | {opt.name} | {opt.market:g} | {opt.technical:g} | "
            f"{opt.time_to_market:g} | {opt.strategic:g} | {opt.score:.2f} |"
        )
    top = ranked[0]
    rows.append("")
    rows.append(f"Recommendation: pursue **{top.name}** (score {top.score:.2f}).")
    return "\n".join(rows)
