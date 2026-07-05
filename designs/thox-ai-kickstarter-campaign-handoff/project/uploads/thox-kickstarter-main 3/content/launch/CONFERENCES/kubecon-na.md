# KubeCon + CloudNativeCon North America

## Overview

- Typical dates: early-to-mid Nov 2026 (verify against CNCF)
- Location: rotates; recent years Chicago, Detroit, Salt Lake City
- URL: https://events.linuxfoundation.org/kubecon-cloudnativecon-north-america
- Audience: platform engineers, SREs, edge-compute architects, CNCF maintainers
- Size: ~10K attendees, very high signal density for B2B platform leads

## Why THOX

KubeCon NA is the single highest-value B2B exhibit for the edge AI + observability + mesh cognition story. Audience overlaps perfectly with companies that would deploy MagStack clusters at the edge and want a private-inference layer that does not phone home.

The thoxcore observability + SLO + Grafana wave-2 PR work maps directly to KubeCon attendee priorities. Demo MagStack as a "cluster you carry" alongside their existing k8s narratives.

## ROI angle

- Primary: B2B leads. Target 50+ qualified enterprise opt-ins (>500 employees) for THOX pilots.
- Secondary: 2-3 CNCF sandbox / incubation conversations if thoxcore qualifies.
- Tertiary: VC + corp-dev conversations density is high at KubeCon afterparties.

## Decision criteria

- Decision gate: Kickstarter $1M+ to justify exhibit budget
- Speak-track first: submit thoxcore observability talk to CFP
- If CFP rejected AND funding under $1M: skip exhibit, send 1 attender for relationship-building
- If CFP rejected AND funding $1M+: exhibit anyway with thoxcore + MagStack live demo

## Budget breakdown

- Conference registration: $1.5K-$2.5K per attendee
- Booth small kiosk: $8K-$15K
- Booth furniture + AV: $2K-$4K
- Travel: $1K per person + lodging $300-$500/night
- Per-diem: $150/day
- Collateral: $1K printed, $4-6K THOXKey giveaway (200 units)
- Total envelope: $5K (attend-only) to $25K (small booth + 3 staff)

## Booth / demo configuration

- SKUs to demo: MagStack 8-node ring, ThoxNova edge node, ThoxVault SKU
- Live demo: edge inference with Grafana dashboard showing token-level SLO + latency tier metrics from thoxcore
- Secondary demo: thox-litert-lm running same Gemma 3 prompts on bare-metal Rust runtime vs container, side-by-side
- Signage: "Cluster you carry. Inference that stays." + thoxcore branding
- Handout: thoxcore architecture one-pager + Grafana dashboard JSON QR

## Speaker submission

- CFP typical deadline: late Mar 2026; verify
- THOX talk title placeholders:
  - "Edge AI without the round-trip: thoxcore observability for on-device inference"
  - "We carried a Kubernetes cluster in our pocket. Here is what broke."
  - "RPC, but no R: zero-network inference patterns for regulated industries"
- Theme fit: KubeCon favors honest-failure war stories with metrics. Prefer talks where you show what did not work.

## Networking strategy

- CNCF maintainer mixer (if invited via thoxcore project)
- Day-2 morning runs (KubeCon tradition)
- Vendor party density is highest Tue-Wed evenings; pick 2 vendor parties max
- Target meet list: AWS Outposts PMs, Azure Arc PMs, Cloudflare edge team, Fastly compute, NVIDIA Triton team

## Lead capture

THOXKey serialized opt-in from outreach pack. KubeCon attendees are sophisticated enough to ask about the privacy model of the opt-in flow; have a 1-page privacy notice ready.

## Post-event nurture

- T+24h: thank-you + thoxcore architecture deep-dive link
- T+7d: invite to private B2B pilot list
- T+14d: schedule 1:1 discovery for any opt-in tagged "enterprise"
- T+30d: thoxcore office hours invitation
- T+90d: pilot proposal for any active conversation
