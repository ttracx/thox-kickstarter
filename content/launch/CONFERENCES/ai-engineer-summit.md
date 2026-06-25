# AI Engineer Summit

## Overview

- Typical dates: late Aug or early Sep 2026 (verify against ai.engineer)
- Location: San Francisco
- URL: https://ai.engineer
- Audience: applied AI engineers, infra leads, startup founders building with LLMs
- Size: typical low-thousands attendees, high signal density

## Why THOX

The AI Engineer Summit audience is the single most important developer cohort for THOXKey adoption. These are the people who write the apps that would consume THOXKey as a local-inference accelerator and as a credential carrier. They are pre-sold on the on-device + private-inference story; THOX does not have to educate them on the why, only the how.

This is also the audience that converts directly into THOX SDK consumers (thoxllm-factory tags, thox-litert-lm Rust bindings, thox-portable browser-direct integration).

## ROI angle

- Primary: developer-mindshare leads. Target 200+ qualified opt-ins via THOXKey serialized giveaway.
- Secondary: 3-5 partner conversations (Ollama, Modal, Replicate, Cursor, LM Studio).
- Tertiary: 1-2 press conversations (The Pragmatic Engineer, Latent Space podcast).
- No direct B2B revenue expectation; this is a long-tail funnel event.

## Decision criteria

- Default decision: speak track if CFP accepted; exhibit otherwise.
- Hard skip only if Kickstarter under $500K AND no speaking slot offered.
- Exhibit-vs-attend swing point: $750K funded. At $750K+ booth is justified.

## Budget breakdown

- Conference registration: $1.5K-$2.5K per attendee (early-bird vs walk-up)
- Booth (if exhibiting): $5K-$8K small footprint
- Travel: $1K per person Austin-to-SF roundtrip + lodging
- Per-diem: $150/day SF
- Collateral: $500 printed cards, $2-4K THOXKey giveaway inventory (50-100 units serialized)
- Total envelope: $3K (speaker-only attend) to $15K (full booth + 2 staff)

## Booth / demo configuration

- SKUs to demo: THOXKey baseline (USB-form-factor), MagStack 4-node ring, ThoxNova on LattePanda
- Live demo: local Gemma 3 inference on THOXKey; latency vs cloud roundtrip side-by-side
- Signage: "Private. Local. Yours." headline + THOX brand palette (#0B1220 / #27E5FF accent)
- Handout: 1-page THOX SDK quickstart with QR to docs.thox.ai
- Lead capture: THOXKey serial number opt-in (per outreach pack lead-capture spec)

## Speaker submission

- CFP typical deadline: April-May 2026; verify
- THOX talk title placeholders:
  - "Shipping local-first LLM inference to USB form factors"
  - "Why we rewrote LiteRT in Rust: a postmortem"
  - "MagStack: physically clustering small models for big context"
- Theme fit: AI Engineer Summit favors war-story technical talks with code, postmortems, and concrete numbers. Avoid marketing framing.

## Networking strategy

- Speaker dinner (if accepted)
- Latent Space pre-show meetup
- Ollama / LM Studio community drinks if hosted
- Target meet list: 5 named contacts from Anthropic, Meta, Google, Mistral, HuggingFace dev-rel

## Lead capture

Use THOXKey serial-number opt-in flow from PRESS_OUTREACH/. Each unit handed out is pre-serialized, scanning the device on first plug-in registers the lead. Opt-in only; no covert telemetry.

## Post-event nurture

- T+24h: thank-you email to scanned leads
- T+7d: SDK quickstart + first-tutorial nudge
- T+30d: invite to private THOX developer Slack/Discord
- T+90d: case-study request for any production deployment
