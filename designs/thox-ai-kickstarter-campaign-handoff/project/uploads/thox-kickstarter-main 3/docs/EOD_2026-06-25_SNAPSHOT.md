# EOD snapshot 2026-06-25 (v2)

Frozen point-in-time snapshot. Reference this tomorrow morning together with
`docs/PULL_FORWARD_TRACKER.md` for the single canonical resume state.

T-48 days to Aug 12 2026 launch.

---

## Per-repo HEAD SHA table

| Repo | HEAD | Status |
| --- | --- | --- |
| thoxcore | f1abdfd | clean |
| thoxllm-factory | eb9ab50 | clean |
| thox-kickstarter-integration | 1a4b8dc | clean |
| thox-loop-engine | a9fdeb0 | dirty (sibling agent owns loop_engine/gateway/adapters/) |
| thox-3dprint-kit | 7b9b5ef | dirty |
| thox-meta | fc594df | clean |
| thox-key | ad54a2e | clean |
| thox-quickstart | e5061ce | dirty |
| thox-build-infra | 3d9b6fa | dirty |
| thox-docs | a07a823 | dirty |
| thox-q2-print-farm | 57057d5 | dirty |
| thox-brand-vault | 0085554 | dirty |
| thox-ip-disclosures | 6417976 | dirty |
| thox-kickstarter | 66fc04c | dirty (tracker + this doc not yet committed) |

---

## Today's totals

- Commits across portfolio: ~220+
- Sprints completed: ~60+
- Tests passing across portfolio: ~2,500+
- New repos created: 8 (thox-build-infra, thox-docs, thox-q2-print-farm, thox-brand-vault, thox-ip-disclosures, thox-meta, thox-kickstarter-integration, thox-loop-engine)
- New release tags cut: 12+
- Memory topic files: 82 (20 added across session)
- MEMORY.md: 14.76 KB / 118 lines (well under 24.4 KB / 200-line caps)
- Spend today: $0

---

## Top-3 ship blockers (keyboard items)

These are the most critical of the 13 items in section 1 of the tracker.
Until they are checked, ship-readiness stays at ~90%.

1. **Stripe setup dry-run** (item 1) - 5 min, unblocks 4 SKU renames + 18-21 prices + referral payouts. Cheapest item; do this first.
2. **Self-hosted runner bootstrap** (item 2) - 10 min, unblocks 6 consumer CI workflows. Everything else gates on CI green.
3. **Mac + CUDA verify_v0.2.0 run** (item 11) - 15 min, unblocks v0.2.0 final tag. Windows already green at 200/56/4.

The other 10 keyboard items (DNS, PAT, ThoxMini tailnet, SD reader, Vercel,
print + assemble, Nova flash, Thox.ai PR review, founder bio edits, IP-008..012
authorship) are blocking but not on the critical path for the very next
demo or release cut.

---

## Top-3 in-flight follow-ups for tomorrow

These are agent-side, not user-side. They will be picked up automatically by
the wave 1 plan in `PULL_FORWARD_TRACKER.md` section 4.

1. **thox-loop-engine v0.2 wave 5a**: real-adapter env-wire + 1 real-model
   loop test (Ollama local is cheapest). Coordinate with the sibling agent
   that owns `loop_engine/gateway/adapters/`.
2. **thoxcore v0.2.0 final tag**: once user runs verify_v0.2.0 on Mac + CUDA,
   the collator (8fe3f65) auto-promotes to the final tag.
3. **thoxllm-factory v0.7 batch_train**: one-command batch trainer (1be5acf)
   is staged for 6 shipping models; first model picks up the moment user
   sets HF_TOKEN.

---

## Single most-important action

**Run keyboard item 1 (`pnpm stripe:setup:dry`).** It is 5 minutes, unblocks
the entire payments + referral payouts stack, and has no upstream dependency.
Every other keyboard item except 11 (verify) is downstream of either Stripe
or the runner.

---

## TEL absorption marker

ChatGPT TEL blueprint absorbed verbatim into `ttracx/thox-loop-engine` across
4 waves: foundation (559e9eb) -> registry (f623d72) -> structure (6a825fb) ->
vertical-slice (a9fdeb0). All 10 TEL section 17 acceptance criteria proven
in wave 4 with stubbed model backends. 217 test functions across 33 test
files green at EOD. v0.2 tag deferred until wave 5 (real adapters) lands.

See `PULL_FORWARD_TRACKER.md` section 6 for the full TEL absorption summary
and the production-grade delta vs the Gemini baseline.

---

## Handoff

Tomorrow opens with `PULL_FORWARD_TRACKER.md` + `EOD_2026-06-25_SNAPSHOT.md`
as canonical state. ~60 sprints done today. 13 keyboard items remain.
Ship-readiness 90%. TEL absorption complete. Aug 12 launch on track.
