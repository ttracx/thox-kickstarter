# Kickstarter digital content

Deployable Kickstarter campaign content generated from the Claude Design
handoff (`designs/thox-ai-kickstarter-campaign-handoff/`) and kept consistent
with the **THOX Experience Fabric (TXF)** tokens.

| File | What it is | Use it for |
|---|---|---|
| `story.html` | Self-contained, standalone Kickstarter Story page (all images + the Xolonium display font inlined as data URIs; Inter / JetBrains Mono via Google Fonts with system fallback). ~5 MB, single file. | Hosting a live campaign landing/preview page, embedding in a deck, or handing to the Kickstarter team as the visual spec. Open it in any browser. |
| `story.md` | The full campaign copy, section-for-section, in Markdown. | Pasting into the Kickstarter Story editor (which takes text + images, not raw HTML). Also the copy source of truth for social posts. |

## How `story.html` was produced

`story.html` is the Claude Design `Kickstarter Story.dc.html` page resolved into
plain, portable HTML:

- Every `image-slot` is replaced with a real `<img>` (data URI).
  - The four device cards + both founder photos use the design team's own
    slot assignments from `.image-slots.state.json`.
  - The **hero** uses `assets/social/prelaunch/prelaunch_campaign_ecosystem_16x9_v1.png`
    (the new 16:9 ecosystem render).
  - **Topology** and the **ThoxOS dashboard** use the handoff marketing/OS art
    (`ks-mkt-thoxmini-wireless-diagram-v2.png`, `thox-bg-2026.png`).
- The `sc-if` campaign-state conditionals are resolved to launch defaults:
  early bird **available**, Sage colorway **locked**.
- The Claude Design runtime (`support.js`, `image-slot.js`, `<x-dc>`) is removed.

### Regenerating

The page is a build artifact. To rebuild it (for example after the design team
assigns the hero / topology / dashboard slots, or swaps device renders), re-run
the converter that produced it against the updated handoff and slot state, then
commit the refreshed `story.html`.

## Brand consistency

Colors, type, and spacing follow `designs/thox-ai-kickstarter-campaign-handoff/project/CLAUDE.md`
(TOKENS.json v2.0): black `#09090B`, surface `#1A1A1C`, emerald `#10B981`,
emerald-bright `#34D399`; Inter + JetBrains Mono, Xolonium for display headings.
Voice: local-first, spec-first, plain. No em dashes in product copy.
