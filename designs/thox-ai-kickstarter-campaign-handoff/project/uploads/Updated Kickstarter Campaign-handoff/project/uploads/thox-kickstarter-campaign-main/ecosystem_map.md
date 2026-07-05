# Ecosystem Map

Where this repo sits relative to the rest of Thox.ai. This is the campaign
operations layer, not the product and not the website.

## Parent product

Thox.ai LLC builds privacy-first edge AI hardware and the ThoxOS operating
system. The product family is five devices: ThoxNova, ThoxClip, ThoxMini,
ThoxAir, and ThoxOnStick, plus MeshStack, the software layer that links devices
into a private mesh. This repo references those products only as subjects of
campaign copy.

## Upstream dependencies

Inputs this repo consumes:

- **Product and campaign facts** -> `config/campaign.yaml`. SKUs, pricing
  (Nova locked; others working figures), phases, tiers, bundles, stretch goals,
  fulfillment waves, and the MeshStack Founder special.
- **Brand and compliance rules** -> `config/brand_guardrails.yaml`. The
  machine-checkable hard constraints that hold the conservative line.
- **Team definition** -> `config/agents.yaml` and `prompts/`. The fixed agent DAG
  and one system prompt per agent.
- **Optional model access** -> the Anthropic API, used only for `--live` runs.
  The mock pipeline and tests run fully offline.
- **Optional brand asset** -> `assets/THOX_ai_Logo_Horiz.png`. Embedded if
  present; the renderer degrades gracefully if it is absent.

## Downstream consumers

Outputs this repo produces, all consumed by humans:

- **Generated Word documents** -> `docs/`. The campaign story, FAQ, email
  sequences, social calendar, press release, and the internal runbook. A human
  moves cleared public copy into Kickstarter, email, and social tools.
- **Agent run reports** -> the orchestrator's `RunReport`, summarizing which
  agents ran, what passed the gate, and what was blocked or skipped.
- **Compliance scan results** -> the CLI `scan` command and `verify_docs.py`,
  used as a pre-publication check.

Nothing here publishes to an external platform. The boundary to Kickstarter,
email tools, and social tools is a manual human step by design.

## Data boundaries

- **On-device vs cloud.** The products keep data on the user's devices. This
  tooling never handles end-user device data; it only handles campaign copy and
  config.
- **Public vs internal.** Public documents (`kind: public`) and the internal
  runbook (`kind: internal`) are rendered with different footers. The supplier
  name and any internal-only detail stay out of public copy. The contract
  manufacturer's name is kept in the internal supplier record and is not written
  into any generated document, so even the internal runbook clears the same bar.
- **Locked vs working.** ThoxNova pricing is locked and may appear publicly.
  Non-Nova prices are working figures and are kept out of public copy until
  sign-off.
- **Founders vs platform interface.** Craig Ross and Tommy Xaypanya are the
  founders. Sadie is an openly synthetic digital-human interface in ThoxOS and
  never appears in founder, investor, or legal content.

## The trust boundary

The deterministic `GuardrailEngine` is the trust boundary for public copy.
Every gated agent output and every generated document must pass it before it is
accepted. It runs the same rules whether the copy came from an agent or from the
Node renderer, so there is one enforcement point and no way around it.
