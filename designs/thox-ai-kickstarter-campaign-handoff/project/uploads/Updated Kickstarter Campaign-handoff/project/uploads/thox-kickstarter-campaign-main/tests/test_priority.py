"""Tests for the weighted prioritization scoring."""

import pytest

from thox_campaign.priority import Option, as_table, rank


def test_score_math():
    opt = Option(name="A", market=10, technical=10, time_to_market=10, strategic=10)
    assert opt.score == pytest.approx(10.0)

    opt2 = Option(name="B", market=5, technical=5, time_to_market=5, strategic=5)
    assert opt2.score == pytest.approx(5.0)

    # 8*0.4 + 6*0.3 + 4*0.2 + 2*0.1 = 3.2 + 1.8 + 0.8 + 0.2 = 6.0
    opt3 = Option(name="C", market=8, technical=6, time_to_market=4, strategic=2)
    assert opt3.score == pytest.approx(6.0)


def test_market_weight_dominates():
    # Same total raw points, but loading them into market should score higher
    # than loading them into strategic, because market carries the most weight.
    market_heavy = Option(name="M", market=10, technical=1, time_to_market=1, strategic=1)
    strategic_heavy = Option(name="S", market=1, technical=1, time_to_market=1, strategic=10)
    assert market_heavy.score > strategic_heavy.score


def test_rank_descending():
    a = Option(name="low", market=2, technical=2, time_to_market=2, strategic=2)
    b = Option(name="high", market=9, technical=9, time_to_market=9, strategic=9)
    c = Option(name="mid", market=5, technical=5, time_to_market=5, strategic=5)
    ranked = rank([a, b, c])
    assert [o.name for o in ranked] == ["high", "mid", "low"]


def test_rank_is_stable_on_ties():
    first = Option(name="first", market=5, technical=5, time_to_market=5, strategic=5)
    second = Option(name="second", market=5, technical=5, time_to_market=5, strategic=5)
    ranked = rank([first, second])
    assert [o.name for o in ranked] == ["first", "second"]


@pytest.mark.parametrize("bad", [0, 11, -3, 10.5])
def test_out_of_range_factor_rejected(bad):
    with pytest.raises(ValueError):
        Option(name="bad", market=bad, technical=5, time_to_market=5, strategic=5)


def test_empty_rank_rejected():
    with pytest.raises(ValueError):
        rank([])


def test_table_recommends_the_top():
    a = Option(name="Alpha", market=9, technical=8, time_to_market=7, strategic=6)
    b = Option(name="Beta", market=3, technical=3, time_to_market=3, strategic=3)
    table = as_table([b, a])
    assert "Recommendation: pursue **Alpha**" in table
    assert "| 1 | Alpha |" in table
