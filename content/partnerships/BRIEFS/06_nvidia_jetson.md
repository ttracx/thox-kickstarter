# Partnership brief: THOX <-> NVIDIA (Jetson)

PRE-OUTREACH MEMO. Tommy + Craig review before any contact is initiated. Internal only. Do not send. Do not share with NVIDIA or their representatives without redaction.

## Why this partnership matters to THOX

THOX evaluated the Jetson Orin NX as the ThoxNova prototype SoC and ruled it out in favor of LattePanda N100 (see project_thoxnova_soc in memory). That decision is locked for the Aug 12 launch lineup. The Jetson family is therefore NOT a load-bearing component of the Kickstarter SKUs. The case for a Jetson partnership is stretch-SKU-only: a post-Kickstarter "ThoxNova Pro" or "ThoxNova Max" tier where the CUDA + TensorRT runtime would unlock workloads the LattePanda Intel Xe + SYCL + Vulkan path cannot reach at the same envelope.

Operationally, THOXCore already supports TensorRT as one of the 7 backend adapters. The integration exists. A Jetson partnership would unlock evaluation kit access, ecosystem listing as an NVIDIA Jetson partner, and reference designs that include the full NVIDIA edge-AI stack. None of those unlock anything required for Aug 12, but they de-risk the stretch SKU lineage and the post-funding "ThoxNova Pro on Jetson" path that would otherwise require THOX to engineer from scratch.

Strategically, NVIDIA partnership for the THOX product line is an option, not a requirement. THOX should not bet the launch on it. THOX should pursue it on a slower timeline (Tier 3, post-launch) and let the post-funding evidence drive the conversation.

## Why this partnership might matter to NVIDIA

NVIDIA is judged on Jetson adoption in the prosumer + maker + edge-AI segment. THOX is exactly the kind of partner the Jetson ecosystem team wants more of: a hardware shop with a credible runtime story, a real backer base, and a public posture on shipping AI to real users. The cost to NVIDIA is small (eval kits, ecosystem listing) and the optionality is real (a successful THOX SKU on Jetson is a free reference deployment NVIDIA can point at).

NVIDIA also has a brand-credibility interest in being associated with privacy-forward edge AI. Most NVIDIA brand stories are datacenter-first. THOX is the opposite end of that spectrum: edge-first, privacy-first, on-device. The brand-juxtaposition value is real.

That said, NVIDIA does not need THOX. NVIDIA has hundreds of Jetson ecosystem partners. THOX is one of many. The right posture is humble, specific, and focused on what THOX brings that the median Jetson partner does not.

## Mutual fit assessment (1-10)

- Strategic alignment: 6 (NVIDIA Jetson aligns with edge-AI; THOX is edge-AI; modest overlap)
- Technical compatibility: 8 (TensorRT adapter exists in THOXCore; integration is real but not deployed in any Aug 12 SKU)
- Brand fit: 5 (NVIDIA is enterprise-grand; THOX is prosumer-honest; coexists but does not deeply resonate)
- Commercial overlap risk: 3 (NVIDIA does not ship competing prosumer hardware in the THOX segment, but does ship developer kits that overlap with maker-segment buyers)
- Total weighted score: 6.0

## Specific asks we could make

- Jetson developer kit evaluation access for the post-Kickstarter ThoxNova Pro / ThoxNova Max line
- Jetson partner ecosystem listing for THOX once a Jetson-bearing SKU ships
- Pre-release access to upcoming Jetson modules and JetPack updates relevant to THOXCore's TensorRT adapter
- Co-marketing on a "TensorRT on THOX" reference architecture (post-launch, not for Aug 12)
- Discount on Jetson Orin / next-gen modules in volume for a future ThoxNova Pro production run
- Inclusion in NVIDIA's edge-AI showcase materials once a Jetson-based THOX SKU ships at scale

## What we could offer

- Co-branded "TensorRT on THOX" reference designs for the post-launch ThoxNova Pro lineage
- A real prosumer-segment deployment surface for Jetson modules in a packaged consumer product
- Published case study on shipping Jetson-backed inference to real backers at scale (post-launch, dependent on Pro SKU shipping)
- THOX hardware (LattePanda-based ThoxNova) shipped to NVIDIA's edge-AI team for comparison-benchmarking against Jetson reference designs
- Co-author technical writeup on the LattePanda-vs-Jetson tradeoff curve at the consumer-hardware price point

## Risks + non-starters

- DO NOT enter exclusivity arrangements. The ThoxNova base SKU is LattePanda; Jetson is a stretch SKU only.
- DO NOT accept terms that pull THOX into NVIDIA's broader enterprise sales motion. THOX is hardware. THOX is not a Tegra OEM.
- DO NOT accept any arrangement that obligates THOX to ship a Jetson SKU on a specific timeline. The Pro SKU is post-Kickstarter and dependent on funding levels.
- DO NOT accept volume-commit pricing that obligates THOX to a minimum Jetson module purchase. Variable purchase is fine. Minimum commits are not.
- DO NOT accept any marketing language that frames THOX as a Jetson-exclusive platform. The LattePanda-based ThoxNova is the flagship.
- DO NOT promise data sharing back to NVIDIA. THOX privacy story is the brand.

## Recommended outreach path

- Tier 3 outreach (NVIDIA's Jetson ecosystem team engages with community partners through paid and free developer programs). Direct application to the Jetson Partner Program is the right entry point.
- Warm intro via an existing Jetson ecosystem partner is preferred but not required.
- AVOID: any path that lands the brief on an enterprise-sales desk. Wrong audience.
- AVOID: any premature engagement that commits THOX to a Jetson SKU before the Pro tier is funded.

## Recommended timing

- T-21 days (Jul 22, 2026): NO outreach. NVIDIA is not on the pre-launch outreach list because no Aug 12 SKU uses Jetson.
- Aug 12, 2026 launch: no NVIDIA mention required on the campaign page. ThoxNova ships on LattePanda. That story stands alone.
- Post-launch (Aug 13 onward, contingent on $1.5M+ stretch funding): engage Jetson Partner Program with funding data and a credible plan for the ThoxNova Pro SKU
- Post-launch (Aug 13 onward, regardless of stretch funding): apply for Jetson ecosystem listing as an early step toward a future Pro SKU even if the launch does not unlock the Pro tier immediately

## Decision authority

- All partnership commitments: Tommy + Craig (both)
- Any commitment that obligates THOX beyond a discovery call: requires written sign-off from both Tommy + Craig
- Any commitment >$10K: requires written sign-off from both Tommy + Craig PLUS attorney review
- Any commitment that obligates THOX to ship a Jetson-bearing SKU on a specific timeline: requires both Tommy + Craig sign-off AND a funded Pro-SKU production plan
- Any press-release copy mentioning NVIDIA or Jetson by name: requires legal review before publication

## Disclaimers

- This brief is internal-only.
- This brief does NOT commit THOX or NVIDIA to anything.
- This brief does NOT reference any named NVIDIA employee. THOX does not have warm-path intelligence at that level and will not pretend otherwise.
- Do not share this brief with NVIDIA or their representatives without redaction.
- Do not commit to anything beyond a discovery call without further internal review and attorney sign-off where appropriate.
- The asks and offers above are conversation starters. Actual deal shape will be determined in conversation with Jetson team counterparts and codified in a formal partnership agreement reviewed by counsel.
