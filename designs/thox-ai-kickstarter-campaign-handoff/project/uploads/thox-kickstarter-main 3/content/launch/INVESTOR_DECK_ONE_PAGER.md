# INVESTOR_DECK_ONE_PAGER.md

Single-page printable summary of the THOX.ai investor deck (`INVESTOR_DECK.md`). Designed to fit a US-letter or A4 page when rendered via the THOX deck-stage component.

Brand: #0B1220 background, #F2F4F8 foreground, #27E5FF cyan accent, #FF3DA8 magenta accent. IBM Plex Sans body, JetBrains Mono for code.

Voice: technical, honest. No fabricated quotes. No fabricated metrics. User-set fields stay labeled.

---

## THOX.ai - Private AI you can hold

A family of small, owned AI hardware devices that run inference on hardware in your hands. Kickstarter launch August 12, 2026. Goal $250K. Ceiling $3M.

---

### What it is

Four launch SKUs:

- ThoxClip from $39 (clip-on wake-word + voice gateway)
- ThoxMini at $69 (desktop edge compute on Luckfox Pico Mini B)
- ThoxAir at $79 (single-node, clusters via MagStack Cluster Dock)
- ThoxNova at $499 (workstation, 7-backend ThoxCore router)

Common Apache-2.0 runtime across the family. Full repo graph public on github.com/ttracx.

### The problem

Cloud AI carries three structural costs the centralized model cannot fix: privacy exposure (every prompt becomes a log row), recurring cost (per-token billing scales with use), and vendor lock-in (provider can change model, rate limit, policy, or price at any time).

### The category

Personal AI compute as a hardware category, not a SaaS line item. Hardware-as-category builds defensible LTV through upgrade and refresh, not monthly recurring.

### Why now

1. Edge silicon finally cheap enough: sub-$100 SoCs run useful instruction-tuned small models at usable latency.
2. Consumer awareness of AI privacy is at a procurement-threshold level.
3. Bulk channels (universities, makerspaces, high school CS, bookstores) procure hardware easily; they procure cloud subscriptions with friction.

### Traction (already shipped, public repos)

- THOXCore router v0.2.0: 7 backend adapters (LiteRT, OpenAI HTTP, Ollama, llama.cpp, vLLM, TensorRT, MLX). 145 of 145 tests green.
- THOXCore v0.4.0 release notes staged. 221 of 221 tests at integration phase.
- 30+ public ttracx/* repos in the THOX ecosystem.
- ThoxMini provisioner shipped (Luckfox Pico Mini B). ThoxNova provisioner staged (LattePanda N100).
- MagStack Cluster Dock print kit shipped. ThoxMini Air v4 multi-material 3MF kit shipped.
- Kickstarter campaign content pack shipped (script, storyboard, FAQ, milestones, stretch, press kit).
- Backer reward fulfillment workflow shipped. 55 of 55 tests green.

### Business model

Four revenue lines, in order of expected near-term contribution:

1. Hardware margin (per-unit; thin at early-bird, standard at long-run).
2. THOXKey EDU bulk pricing (annual refresh, first 25 universities locked at the $500K stretch).
3. Enterprise white-label (TBD on volume and timing; high-ASP, low-volume).
4. Bulk MOQ swag (teaching kits, conference demo, employee distribution).

Specific dollar figures are user-set and updated post-campaign.

### Competition

Compete on category, not on named vendors. Cloud LLM APIs and cloud AI assistants are the primary frame; THOX wins on privacy, predictable cost, and no-lock-in. Other single-device edge AI vendors cannot match the family-runtime moat. DIY local AI (Ollama on a PC) lacks the turn-key hardware experience.

First-mover at sub-$50 USB tier (ThoxClip at $39) is defensible.

### Team

- Tommy Xaypanya, co-founder. Software, AI runtime, campaign operations. Inventor of record on THOX IP portfolio (IP-008 onward).
- Craig Ross, co-founder. Hardware, mechanical design, supply. Inventor of record alongside Tommy.

Advisors and additional team: TBD. Named only on commitment in writing.

### The ask

| Field | Value |
|---|---|
| Amount raising | $X (user-set) |
| For | Y percent equity (user-set) |
| Pre-money | $Z (user-set) |
| Round timing | Closes alongside or after Kickstarter window (Aug 12 to Sep 11, 2026) |

Use of funds: manufacturing capital, certification budget, fulfillment ops capacity (Q1 to Q3 2027), 3 to 5 hires to extend founding team (supply, fulfillment, devrel).

---

### Next steps

- Investor data room: link on request to tommy@thox.ai
- Founder-led deep-dive call: 60 minutes, scheduled directly
- Public repo tour: github.com/ttracx

Founders: Tommy Xaypanya (tommy@thox.ai), Craig Ross (craig@thox.ai). THOX.ai LLC, Reno, NV (mailing address TBD).

---

Owner: Tommy. The Ask block dollar figures must be set jointly by Tommy and Craig before any external send. Last refreshed against `INVESTOR_DECK.md` on 2026-06-25.
