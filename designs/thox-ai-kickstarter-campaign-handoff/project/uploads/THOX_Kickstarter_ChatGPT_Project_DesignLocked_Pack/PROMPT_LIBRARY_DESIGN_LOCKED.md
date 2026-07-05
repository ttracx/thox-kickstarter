# THOX Kickstarter Design-Locked Prompt Library

Use these prompts for AI-assisted copy, image, video, and QA generation.

## Image system prompt

```text
Create a THOX.ai Kickstarter campaign visual using the THOX.ai design system.

Fonts: Xolonium for display text, Inter for body text, JetBrains Mono for labels or telemetry.
Colors: background #09090B or #000000; cards #18181B; CTA and active states #10B981; highlights #34D399; sparse neon #00FF88; warning #FBBF24; destructive #EF4444; info #3B82F6. Purple #A855F7 or #C084FC is allowed only for MagStack cluster or coupling elements, never for MeshStack.

Tone: premium, technical, minimal, dark-first, local-first AI hardware.

Subject: [device or section].
Format: [16:9 hero / 3:2 reward tile / story graphic / square social / vertical social].
Must show: [specific object or app scene].
Must avoid: fake certifications, unverified specs, old product names, old dates, off-brand fonts, off-brand colors, unlabeled product renders, exaggerated sci-fi.
```

## Product-specific visual prompts

ThoxKey:

```text
A compact THOX-branded USB drive on a keyring beside a laptop, dark #09090B campaign surface, emerald #10B981 edge accent, Xolonium product label treatment, Inter microcopy space, local-first AI workspace suggested on-screen, no cloud icons, no security-key framing.
```

ThoxMini Air:

```text
A small wireless THOX pocket node with keychain ring, MeshStack pairing screen nearby, black and zinc surfaces, emerald status light, Xolonium title space, JetBrains Mono device label, no purple, no unverified certification marks, clean 3:2 reward-tile composition.
```

ThoxMini:

```text
A compact USB-C THOX compute stick connected to a laptop with ThoxOS Mini terminal visible, dark #09090B surface, emerald accents, JetBrains Mono terminal text, Xolonium product display label, honest builder-tool mood, no cloud imagery.
```

ThoxClip:

```text
A slim phone-attached THOX companion aligned vertically on the back of a smartphone, MeshStack pairing status on screen, dark premium hardware style, emerald LED, no official accessory or certification marks, Xolonium display label, Inter body copy space.
```

MeshStack:

```text
A MeshStack app board showing Identity, Pair, Connect, Monitor, and Chat scenes across mobile and desktop frames. Use MeshStack dark sub-palette: #000000 canvas, #050A0B surface, #091113 cards, #1F3430 borders, #C7D0CC secondary text, emerald #10B981 and #34D399 accents. No purple.
```

## Design QA prompt

```text
Audit these THOX Kickstarter assets for design-system compliance.

Check:
- Xolonium display, Inter body, JetBrains Mono labels
- #09090B or #000000 backgrounds
- #18181B cards or MeshStack approved card surfaces
- #10B981 CTA and active states
- #34D399 highlights
- Purple only for MagStack
- No purple for MeshStack
- No Space Grotesk in new campaign shells
- No legacy #2ee68f in new campaign shells
- No generic or off-brand fonts
- No old dates, old SKUs, or unapproved claims

Return blockers, warnings, and exact fixes.
```
