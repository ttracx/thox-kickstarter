# Kickstarter digital content

Deployable Kickstarter campaign content generated from the Claude Design
handoff (`designs/thox-ai-kickstarter-campaign-handoff/`) and kept consistent
with the **THOX Experience Fabric (TXF)** tokens.

| File | What it is | Use it for |
|---|---|---|
| `story.html` | Self-contained, standalone Kickstarter Story page (all images + the Xolonium display font inlined as data URIs; Inter / JetBrains Mono via Google Fonts with system fallback). ~5 MB, single file. | Hosting a live campaign landing/preview page, embedding in a deck, or handing to the Kickstarter team as the visual spec. Open it in any browser. |
| `story.md` | The full campaign copy, section-for-section, in Markdown. | Pasting into the Kickstarter Story editor (which takes text + images, not raw HTML). Also the copy source of truth for social posts. |
| `copy.md` | The **copy system**: full Kickstarter descriptions + short graphic-ready copy for the four campaign devices and the ecosystem, brand constants, and the on-graphic "avoid" list. | Single source of truth for device copy. Full copy → the page; short copy → graphics. |
| `site/` | A portable, deployable static bundle of **every** campaign page + the film production tools, with a branded `index.html` hub. React / ReactDOM / Babel are vendored locally, so the interactive prototypes run with no CDN. | Deploying the whole campaign as one static site (Vercel, GitHub Pages, Netlify, `python3 -m http.server site/`). |
| `PRODUCTION.md` | Static device + storyboard capture inventory and checklist, generated from the shot list. | Printable shoot reference; index of every production resource. |
| `sources/` | Upstream inputs the build consumes: the ThoxOS sandbox + preview, the previz storyboard, the film shot list, storyboard script, previz QA, and the funded-milestone runbook. | Regenerating `site/`. |

## Film production tools

The Kickstarter film ships with an interactive production system, generated from
[`sources/thox-video-shotlist.csv`](sources/thox-video-shotlist.csv) (117 shots, 13 segments, 9:40 master):

| Tool | File | What it does |
|---|---|---|
| **Production Tracker** | [`site/production-tracker.html`](site/production-tracker.html) | Interactive, browser-saved tracker. Device capture inventory + every storyboard shot, moved **To shoot → Captured → Approved** with notes, filters, and JSON/CSV export. |
| **Visual storyboard** | [`site/storyboard.html`](site/storyboard.html) | The QA-approved previz: 13 modules, shot-for-shot visual reference. |
| **Campaign animatic** | `site/animatic.html` | The working-concept animatic video of the storyboard, playable in the browser (source: `assets/video/thox-campaign-animatic-v1-1080p.mp4`). Device close-up clips live in `assets/device/video/`. |
| **Inventory & checklist** | [`PRODUCTION.md`](PRODUCTION.md) | Static, printable device + scene checklist with the capture workflow and compliance reminders. |

Rebuild the tracker alone with `python3 kickstarter/build_tracker.py`; `build_site.py`
runs it automatically as its last step.

## `site/` — the deployable bundle

`index.html` links every page:

| Page | Kind | Notes |
|---|---|---|
| **ThoxOS Demo** (`thoxos-demo.html`) | Flagship | The **full ThoxOS** desktop sandbox (v6.1) that ships on THOX Nova and the THOX Edge Series: lock screen, menu bar, ⌘K command palette, app dock, live on-device inference. Same Experience Fabric as ThoxOS Mini, scaled up. Self-contained React app. Any password unlocks it. |
| **What's in the Box** (`packaging.html`) | Rewards | Retail-packaging showcase of what backers receive: ThoxMini Air, ThoxMini (three colorways), and ThoxClip — box front/back, specs, and "in the box" contents. Self-contained. Renders in `sources/packaging/`. |
| **THOX Experience Fabric** (`experience-fabric.html`) | Platform | The scientific design system + Rust runtime behind every THOX surface. Three planes (products → SDKs → runtime), the runtime crates, locked navigation, one visible agent (THOXY), four-tier memory, generated tokens, and the certified **Experience Score ≥ 90**. Self-contained. Source in `sources/experience-fabric.html`. |
| **ThoxLLM Model Gallery** (`models.html`) | Live app | Model gallery + download center for the real THOX models: filter by source / family / capability, match a model to your device, and copy the exact `ollama pull` / Hugging Face command. Links to the [model catalog](https://www.thox.ai/docs/model-catalog), [compatibility tool](https://www.thox.ai/docs/model-compatibility), [Hugging Face](https://huggingface.co/Thox-ai), and [Ollama](https://ollama.com/thox-ai). Self-contained. Source in `sources/models.html`. |
| **MeshStack app** (`meshstack-{ios,ipad,macos,windows,android}.html`) | Live app ×5 | Fully-functional standalone MeshStack demos, one per platform: identity, pairing, connect, monitor, devices. Self-contained React apps. Sources in `sources/meshstack/`. |
| **Flagship devices** (`thox-nova.html`, `thox-pro.html`, `thox-pro-max.html`, `thox-pro-ultra.html`) | Live demo ×4 | Interactive product pages for the upcoming THOX Nova and THOX Edge Series (Pro / Pro Max / Pro Ultra) edge-AI line, which run the **full ThoxOS**. Self-contained. Sources in `sources/devices/`. |
| **ThoxMigrate** (`thoxmigrate.html`) | Live app | Cloud-to-edge AI migration tool: scan cloud API traffic, map models to local equivalents, plan the move to THOX edge. Self-contained. Source in `sources/thoxmigrate.html`. |
| **ThoxOS Mini Demo** (`thoxos-mini-demo.html`) | Interactive | The **edge build of ThoxOS** that powers the four campaign devices — ThoxKey, ThoxMini Air, ThoxMini, ThoxClip: boot, insert, agents, files, skills, terminal. The same Experience Fabric as full ThoxOS, shrunk to a key. Source in `sources/thoxos-mini-demo.dc.html`. |
| Kickstarter Story | Self-contained | Same page as `../story.html`. |
| Campaign Runbook | Runtime | Internal launch playbook. |
| Model Gallery · Software Demo · Campaign Animatic | Interactive | Claude Design prototypes, rendered by the vendored runtime. |
| Video Storyboard | Self-contained | The standalone storyboard export. |

Build / rebuild it with:

```
python3 kickstarter/build_site.py     # writes kickstarter/site/
python3 -m http.server --directory kickstarter/site 8000   # preview at :8000
```

The build flattens all pages to the bundle root (so their relative `./support.js`,
`./image-slot.js`, `./*.jsx`, and `assets/` references keep resolving), vendors
React/ReactDOM/Babel into `site/vendor/` and repoints `support.js` at them, and
copies only the assets the pages actually reference (not the multi-hundred-MB of
unused product renders and uploads). Every page was rendered end-to-end in
headless Chromium to confirm it boots with zero page errors.

## Platform: ThoxOS, ThoxOS Mini, and the Experience Fabric

The campaign presents one platform at two scales, held together by a single
design + runtime framework.

- **ThoxOS Mini** — the edge build that ships on the four launch devices
  (**ThoxKey, ThoxMini Air, ThoxMini, ThoxClip**). A pocket-sized shell: boot,
  insert, agents, files, skills, terminal, all on-device. Demo:
  [`site/thoxos-mini-demo.html`](site/thoxos-mini-demo.html).
- **Full ThoxOS** — the complete desktop OS that ships on the **THOX Nova and the
  THOX Edge Series** (kept in the campaign so backers meet the full architecture and
  roadmap). Demo: [`site/thoxos-demo.html`](site/thoxos-demo.html).
- **THOX Experience Fabric (TXF)** — the reason the two feel like one product.
  It is a scientific design system plus a Rust runtime that guarantees the same
  experience on every surface: three planes (products → SDKs → runtime),
  a fixed set of runtime crates, **locked navigation**, **one visible agent
  (THOXY)**, **four-tier memory** (HOT / WARM / COLD / VAULT), design tokens
  generated from a single source, and a certification gate — the **Experience
  Score**, which every surface must hold at **≥ 90**. It is also THOX's adopted
  internal development framework. Page:
  [`site/experience-fabric.html`](site/experience-fabric.html).

`experience-fabric.html` is a self-contained, from-scratch page built on the TXF
tokens; `thoxos-mini-demo.html` is the Claude Design ThoxOS Mini prototype
(`sources/thoxos-mini-demo.dc.html`) rendered by the vendored runtime.

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
