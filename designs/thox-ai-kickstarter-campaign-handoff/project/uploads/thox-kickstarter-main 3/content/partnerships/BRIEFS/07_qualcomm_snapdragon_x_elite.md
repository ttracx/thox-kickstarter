# Partnership brief: THOX <-> Qualcomm (Snapdragon X Elite)

PRE-OUTREACH MEMO. Tommy + Craig review before any contact is initiated. Internal only. Do not send. Do not share with Qualcomm or their representatives without redaction.

## Why this partnership matters to THOX

The Snapdragon X Elite is the leading ARM-on-Windows platform for prosumer + small-business hardware in 2026. THOX does not ship a Snapdragon SKU on Aug 12, but the ARM-Windows-on-Snapdragon path is the obvious next step for a future ThoxNova Desktop or ThoxNova Workstation tier targeting buyers who want long battery life, fanless or near-fanless thermals, and a low-power AI accelerator NPU integrated into the SoC. The Snapdragon X Elite NPU is exactly the kind of edge-AI silicon THOX's runtime story was designed for.

Operationally, the path is non-trivial: THOXCore would need an ARM-Windows build of every adapter, the Windows-on-ARM emulation surface is still imperfect for some Python tooling, and the Snapdragon NPU has its own runtime that THOXCore does not currently target as a first-class adapter (it would be a candidate for an 8th adapter slot post-launch). The partnership conversation is therefore early: THOX is asking Qualcomm for evaluation kit access and developer-program admission, not for a co-branded product.

Strategically, the Snapdragon partnership is a long-horizon bet. The post-Kickstarter roadmap includes a desktop / workstation tier where the Snapdragon X Elite is a credible candidate. The partnership conversation should start now to be ready for a 2027 SKU decision.

## Why this partnership might matter to Qualcomm

Qualcomm is fighting for ARM-Windows mindshare against the incumbent Intel + AMD x86 ecosystem. Every credible ARM-Windows hardware design from a non-PC-OEM is valuable to Qualcomm. THOX is an unusual partner shape: not a PC OEM, not a traditional ODM, but a vertically-integrated AI hardware shop with a real runtime story and a real backer base. That is a partner Qualcomm cannot easily acquire elsewhere.

Qualcomm also has a meaningful interest in the privacy-forward + on-device AI narrative. The Snapdragon NPU is one of the strongest stories in that segment. THOX validates the story at the prosumer hardware tier in a way that the existing ThinkPad-on-Snapdragon and Surface-on-Snapdragon partnerships do not, because those are enterprise plays. THOX is the maker + prosumer angle Qualcomm currently does not have a brand-aligned partner for.

That said, Qualcomm is a large company with a long sales cycle. The right posture is patient and specific: THOX is interested in the developer program now, an evaluation kit in the near future, and a possible SKU conversation post-Kickstarter once the Pro tier is funded.

## Mutual fit assessment (1-10)

- Strategic alignment: 7 (Qualcomm wants ARM-Windows adoption; THOX could be a credible non-OEM partner)
- Technical compatibility: 5 (THOXCore does not currently target the Snapdragon NPU directly; ARM-Windows port is real work)
- Brand fit: 6 (both technical; Qualcomm enterprise-grand, THOX prosumer-honest; coexists)
- Commercial overlap risk: 2 (Qualcomm does not ship competing prosumer AI hardware in the THOX segment)
- Total weighted score: 5.5

## Specific asks we could make

- Snapdragon X Elite developer kit evaluation access for a future ThoxNova Desktop / Workstation SKU
- Admission to the Snapdragon Developer Program at the appropriate tier
- Pre-release access to upcoming Snapdragon platform updates and NPU runtime documentation
- Documentation and SDK access for the Qualcomm NPU runtime, sufficient for THOX engineering to evaluate as an 8th THOXCore adapter
- Future co-marketing on a "Snapdragon NPU on THOX" reference architecture (post-launch, dependent on SKU shipping)
- Volume-discount path for Snapdragon X Elite or successor SoCs in a future ThoxNova Desktop production run

## What we could offer

- A real non-OEM ARM-Windows hardware design with a credible AI runtime story
- A prosumer + maker + EDU + small-business deployment surface that Qualcomm's existing partners do not cover
- Co-branded "Snapdragon NPU on THOX" reference designs (post-launch, dependent on SKU shipping)
- Published case study on shipping ARM-Windows-on-Snapdragon hardware to real backers at scale (post-launch, dependent on SKU shipping)
- THOX hardware (LattePanda-based ThoxNova) shipped to Qualcomm's edge-AI team for comparison-benchmarking
- A standing testbed for Qualcomm NPU runtime experiments at the prosumer hardware tier

## Risks + non-starters

- DO NOT enter exclusivity arrangements. THOX is multi-architecture (Intel x86 for current ThoxNova, Rockchip RV1103 for ThoxMini, Pi-class ARM for ThoxMini Air). Snapdragon is one option among many.
- DO NOT accept terms that pull THOX into Qualcomm's broader chipset-licensing or OEM funnel. THOX is a hardware shop, not a phone OEM.
- DO NOT accept any arrangement that obligates THOX to ship a Snapdragon SKU on a specific timeline.
- DO NOT accept volume-commit pricing that obligates THOX to a minimum SoC purchase before the SKU is funded.
- DO NOT promise data sharing back to Qualcomm. THOX privacy story is the brand.
- DO NOT accept any marketing language that frames THOX as a Snapdragon-exclusive platform.

## Recommended outreach path

- Tier 4 outreach (Qualcomm's developer-program path is the standard entry; paid developer-relations may be required). Direct application to the Snapdragon Developer Program is the right initial step.
- Warm intro via an existing Snapdragon ecosystem partner is preferred but not required.
- AVOID: any path that lands the brief on an OEM-licensing desk. Wrong audience.

## Recommended timing

- T-21 days (Jul 22, 2026): NO outreach. Qualcomm is not on the pre-launch outreach list because no Aug 12 SKU uses Snapdragon.
- Aug 12, 2026 launch: no Qualcomm mention required on the campaign page.
- Post-launch (Aug 13 onward, regardless of stretch funding): apply to the Snapdragon Developer Program as an early step toward a possible 2027 ThoxNova Desktop / Workstation SKU
- 2026-Q4: evaluation kit conversation if developer-program admission lands
- 2027-Q1: SKU feasibility decision

## Decision authority

- All partnership commitments: Tommy + Craig (both)
- Any commitment that obligates THOX beyond a developer-program application: requires written sign-off from both Tommy + Craig
- Any commitment >$10K: requires written sign-off from both Tommy + Craig PLUS attorney review
- Any commitment that obligates THOX to ship a Snapdragon-bearing SKU on a specific timeline: requires both Tommy + Craig sign-off AND a funded Desktop / Workstation SKU production plan
- Any press-release copy mentioning Qualcomm or Snapdragon by name: requires legal review before publication

## Disclaimers

- This brief is internal-only.
- This brief does NOT commit THOX or Qualcomm to anything.
- This brief does NOT reference any named Qualcomm employee. THOX does not have warm-path intelligence at that level and will not pretend otherwise.
- Do not share this brief with Qualcomm or their representatives without redaction.
- Do not commit to anything beyond a developer-program application without further internal review and attorney sign-off where appropriate.
- The asks and offers above are conversation starters. Actual deal shape will be determined in conversation with Qualcomm counterparts and codified in a formal partnership agreement reviewed by counsel.
