# beat_mapping.md

THOX angle -> outlet tier crosswalk. Use this when picking which tier to pitch with which angle. A single press cycle should not push the same angle to every tier; the angle should match the tier's editorial voice.

## THOX angles

1. **Private / on-device AI.** The runtime ships on hardware the buyer owns. Inference happens in the buyer's hand, not in a vendor data center.
2. **USB-form-factor (THOXKey + ThoxStick).** Pocketable hardware. The whole runtime fits on a USB-sized device.
3. **DIY-print enclosures.** 3D-printable shells, STL + 3MF plates published in the open, MagStack Cluster Dock printable on a single Q2 Combo bed.
4. **MagStack clustering.** Magnetic pogo stack lets multiple ThoxAir nodes act as one larger compute pool for multi-agent workflows.
5. **Founder-led from Texas.** Two co-founders in Cedar Park, TX, working through a Nevada LLC. No VC. No incubator. Open-source, Apache-2.0 across the runtime.
6. **Education access (THOXKey EDU).** Sub-$50 starting price + open syllabus inserts + bookstore SKU path = AI literacy for community colleges and continuing-ed.

## Angle -> Tier matrix

| Angle | Tier 1 Tech | Tier 2 Dev | Tier 3 Consumer | Tier 4 Hardware | Tier 5 AI | Tier 6 Business | Tier 7 Local TX | Tier 8 EDU |
|---|---|---|---|---|---|---|---|---|
| Private / on-device AI | Lead | Lead | Strong | Strong | Lead | Strong | Strong | Strong |
| USB-form-factor | Strong | Lead | Strong | Lead | Mention | Mention | Mention | Strong |
| DIY-print enclosures | Mention | Strong | Mention | Lead | Mention | Skip | Mention | Mention |
| MagStack clustering | Strong | Lead | Mention | Lead | Strong | Mention | Mention | Mention |
| Founder-led from Texas | Mention | Mention | Mention | Mention | Mention | Lead | Lead | Mention |
| Education access | Mention | Mention | Mention | Mention | Mention | Mention | Mention | Lead |

Legend:
- **Lead**: this is the headline. Open the pitch with it.
- **Strong**: belongs in paragraph 2. Reinforces the lead.
- **Mention**: one sentence in the close. Lets the reporter know there is more if they want to dig.
- **Skip**: do not raise this angle with this tier. It will dilute the pitch.

## Per-tier recommended lead angle

- **Tier 1 (Verge, Ars, TechCrunch, Information, 9to5Mac):** Private / on-device AI. These outlets care about the platform thesis and the prosumer story.
- **Tier 2 (HN, Lobsters, dev.to, InfoQ, IEEE Spectrum):** USB-form-factor + MagStack clustering. Developers care about the runtime, the wire protocol, the cargo workspace layout.
- **Tier 3 (Engadget, Wired, Gizmodo, TNW):** Private / on-device AI. Consumer-tech framing. "AI that does not leave your desk."
- **Tier 4 (Hackaday, Make, Tom's, AnandTech):** USB-form-factor + DIY-print + MagStack. Show the BOM, the STL, the assembly, the parametric generator.
- **Tier 5 (LWiAI, Latent Space, Stratechery, Import AI, Batch, AI Snake Oil):** Private / on-device AI. The thesis: AI is decentralizing, and the form factor that wins is the one you can own.
- **Tier 6 (WSJ, Bloomberg, Forbes):** Founder-led from Texas. Two-person team, Nevada LLC, Texas operations, Kickstarter funding model, no VC.
- **Tier 7 (Statesman, ABJ, Texas Monthly, KUT):** Founder-led from Texas. Local angle is the lead.
- **Tier 8 (EdSurge, Inside Higher Ed, EdTech):** Education access. THOXKey EDU SKU, syllabus inserts, community college pricing.

## Pitch-angle filler for template variable `{{ pitch_angle }}`

When the template asks for `{{ pitch_angle }}`, use the lead angle for that tier (above), one sentence, founder voice. Examples:

- Tier 1: `private AI in a USB-sized device, runs entirely on the hardware in your hand, no vendor server in the loop`
- Tier 2: `open-source runtime (Apache-2.0), USB-CDC wire protocol, parametric 3D-print enclosures, ships as a Rust cargo workspace`
- Tier 3: `AI that does not leave your desk; a family of four devices starting at $39`
- Tier 4: `BOM under $20 on the smallest device; STL + 3MF plates published; one Q2 Combo bed prints the cluster dock`
- Tier 5: `the form factor for on-device AI; not a wrapper around someone else's model; the runtime is the product`
- Tier 6: `two co-founders in Cedar Park TX, Nevada LLC, Kickstarter-funded, no VC, four devices launching together`
- Tier 7: `Cedar Park founders shipping a four-device family on Kickstarter; designed in Texas; no VC`
- Tier 8: `sub-$50 entry SKU plus open syllabus inserts; built for AI-literacy curricula at community colleges`

These are starter strings. Tighten per send.
