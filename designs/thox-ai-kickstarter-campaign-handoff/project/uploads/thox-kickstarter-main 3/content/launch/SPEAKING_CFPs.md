# THOX speaking CFP submit list

Every event in this list is a Call For Papers / Proposals target. CFP submissions are nearly free to author and high-leverage when accepted (free badge + speaker dinner + multi-week press tail).

Submit to all in scope; expect 20-40% acceptance rate.

Verify each CFP deadline against the event's official site before drafting; deadlines move year to year.

---

## Q3 2026 priority CFPs (must submit before Jul 2026)

### AI Engineer Summit (San Francisco)

- Typical CFP deadline: April-May 2026
- Winning themes: applied AI war stories, infra-level engineering, postmortems, runtime + serving systems
- THOX talk title placeholders:
  - "Shipping local-first LLM inference to USB form factors"
  - "We rewrote LiteRT in Rust: a postmortem on portability vs performance"
  - "MagStack: physically clustering small models for big context"
  - "When the cloud is the wrong answer: a serving-systems case for on-device"
- THOX angle: thox-litert-lm Rust rewrite + thoxcore observability + MagStack physical clustering
- Submitter: THOX core engineering lead

### Open Source Summit (Linux Foundation; typically Tokyo + LA)

- Typical CFP deadline: February-March 2026
- Winning themes: maintainer experience, open-source supply-chain security, Rust adoption stories, on-device AI runtimes
- THOX talk title placeholders:
  - "Apache-2.0 hardware: shipping open under-the-hood on Kickstarter"
  - "Rust + small models: a thox-litert-lm case study"
  - "Mesh cognition: a model for multi-agent open-source orchestration"
- THOX angle: thoxcore + thox-litert-lm + thoxmesh open-source posture
- Submitter: THOX OSS lead

---

## Q4 2026 priority CFPs (submit Mar-Sep 2026 window)

### KubeCon + CloudNativeCon NA

- Typical CFP deadline: late March 2026
- Winning themes: edge compute, observability, multi-cluster, security, sandboxed workloads, Wasm
- THOX talk title placeholders:
  - "Edge AI without the round-trip: thoxcore observability for on-device inference"
  - "We carried a Kubernetes cluster in our pocket: here is what broke"
  - "RPC, but no R: zero-network inference patterns for regulated industries"
- THOX angle: thoxcore observability + SLO + Grafana from wave-2 PR work + MagStack as portable cluster
- Submitter: THOX infra lead

### EDUCAUSE Annual Conference

- Typical CFP deadline: late March / early April 2026
- Winning themes: institutional case studies, accessibility, privacy, FERPA-compliant architectures, research-computing
- THOX talk title placeholders:
  - "Private AI in the classroom: a FERPA-first architecture"
  - "When AI cannot leave the building: research-computing + on-device LLMs"
  - "Hardware-mediated AI literacy: lessons from a K-12 pilot"
- THOX angle: THOXKey EDU + named pilot if any are booked by Q3 2026
- Submitter: THOX EDU lead (Craig)

### Slush Stages (Helsinki)

- Typical CFP deadline: late June / early July 2026
- Winning themes: contrarian founder theses, EU regulatory positioning, hardware-led startup narratives
- THOX talk title placeholders:
  - "GDPR by architecture: building AI that cannot leak data"
  - "Why we built our hardware in the open and shipped on Kickstarter"
  - "The American startup that came to Helsinki for the regulators"
- THOX angle: GDPR-by-architecture + EU enterprise design-partner positioning
- Submitter: THOX founder

---

## Q1 2027 priority CFPs (submit Aug 2026 - Jan 2027 window)

### SXSW PanelPicker (Austin)

- Typical CFP deadline: early August 2026 (PanelPicker voting opens Aug, closes Aug)
- Winning themes: creator-economy, narrative-led tech, AI-and-society, hardware design, brand-strategy
- THOX talk title placeholders:
  - "We made the Kickstarter, then we made the thing: an Austin hardware story"
  - "Private AI for creators: the case against the cloud"
  - "MagStack: when hardware design is the user interface"
- THOX angle: home-turf storytelling + Kickstarter delivery narrative
- Submitter: THOX founder + 1 creator-economy collaborator (panel format)

### FOSDEM (Brussels)

- Typical CFP deadline: November-December 2026 (devroom-based)
- Winning themes: small-talk, technical-depth, no-sales-allowed, open-source-only
- THOX talk title placeholders:
  - "thox-litert-lm: a Rust-first on-device inference runtime"
  - "Apache-2.0 hardware lessons from a USB-form-factor AI accelerator"
- THOX angle: thox-litert-lm + thoxcore Rust posture
- Submitter: THOX OSS lead

### NDC Conferences (various 2027 dates)

- Typical CFP deadline: varies per NDC location; check ndcconferences.com
- Winning themes: dev-deep technical talks, postmortems, security
- THOX talk title placeholders: same as AI Engineer Summit + Rust-focused subset
- Submitter: THOX core engineering lead

---

## Q2 2027 priority CFPs (submit Q1 2027 window)

### KubeCon + CloudNativeCon EU

- Typical CFP deadline: late November 2026 / early December 2026
- Winning themes: same as KubeCon NA but EU-tuned (data sovereignty, GDPR, EU regulatory)
- THOX talk title placeholders: GDPR-leaning variants of KubeCon NA submissions
- Submitter: THOX infra lead

### NAB Show (Las Vegas)

- Typical CFP deadline: typically Nov-Jan window
- Winning themes: on-device AI for production workflows, video/audio processing edge cases
- THOX talk title placeholders:
  - "On-device AI for video production: a privacy-first workflow"
  - "When your editing rig has its own brain: edge AI for post-production"
- THOX angle: ThoxNova + ThoxCargo edge-compute story for media workflows
- Submitter: THOX creator-tools lead

### Collision (Toronto)

- Typical CFP deadline: typically Q1 2027
- Winning themes: founder stories, growth-stage operating, hardware narratives
- THOX talk title placeholders: investor-tuned variants of TechCrunch Disrupt submissions
- Submitter: THOX founder

---

## CFP submission discipline

- Maintain a single doc tracking each CFP: deadline, submitter, status (drafted / submitted / accepted / rejected), talk title, abstract.
- Reuse the strongest 3-4 abstract drafts across CFPs (with event-specific tuning); do not write fresh each time.
- Acceptance rate target: 30%+ across the calendar. If under 20%, abstracts need a rewrite or theme realignment.
- Track which talks landed press; pattern-match for future CFPs.

## Bench of THOX-eligible talks

Maintain a bench of 6-8 always-ready abstracts that THOX can reskin across events:
1. thox-litert-lm Rust rewrite postmortem
2. thoxcore observability for on-device inference
3. MagStack physical-clustering design + lessons
4. THOXKey EDU + FERPA-compliant architecture
5. Kickstarter-to-shipped-hardware delivery story
6. Open-source supply chain for on-device AI
7. GDPR-by-architecture for EU markets
8. Private AI for creator-economy workflows
