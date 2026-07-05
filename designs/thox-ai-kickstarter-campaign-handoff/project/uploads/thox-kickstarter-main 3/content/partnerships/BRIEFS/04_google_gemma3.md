# Partnership brief: THOX <-> Google (Gemma 3)

PRE-OUTREACH MEMO. Tommy + Craig review before any contact is initiated. Internal only. Do not send. Do not share with Google or their representatives without redaction.

## Why this partnership matters to THOX

Gemma is the most widely-deployed open-weight model family on the THOX rig, with multiple production fine-tunes already shipped (ThoxGemma4-E4B-SFT among others; see project_thox_gemma4_e4b_sft in memory). The thoxllm-factory v0.6 bundle treats Gemma as a first-class base model alongside Mistral and Llama. THOX has put real engineering hours into making Gemma-derived adapters production-grade on consumer hardware. A partnership with the Gemma developer-relations team formalizes a relationship that already exists at the model-card level.

Operationally, Gemma is a load-bearing component of THOX's on-device tier. ThoxNova ships Gemma fine-tunes. ThoxMini's edge variants ship Gemma-derived adapters where parameter budget permits. The THOX fine-tunes are public artifacts on Hugging Face under the Thox-ai org (some private, some public over time). A formal Gemma showcase relationship would unlock model-card listing, bug-report channel access, and pre-release access to Gemma 4 unified architecture variants that currently block Phase C of the thox-gemma4 pipeline due to a transformers version compatibility gap.

Strategically, Google sits in a category of its own among the four Tier-1 candidates. Anthropic, OpenAI, and Cohere are pure API plays. Google ships Gemma weights. That makes the partnership shape fundamentally different: THOX is not asking Google to license API capacity to THOX users. THOX is asking the Gemma team for showcase status and a bug-channel into the Gemma roadmap. Lower-stakes ask, faster turnaround, more achievable in the T-21 to T-0 window.

## Why this partnership might matter to Google

The Gemma team is judged internally by adoption metrics: downloads, derivative fine-tunes, deployment surfaces, public showcase quality. THOX moves all four dials. Every THOX device shipped with a Gemma fine-tune pre-installed is an adoption count. Every published THOX fine-tune is a derivative. Every THOX device sold is a deployment surface. Every Kickstarter milestone hit is showcase-quality marketing material the Gemma team can point at internally.

Google also has a structural challenge with the Gemma narrative: most Gemma deployments are either (a) datacenter cloud-tier (where Gemma loses to Gemini) or (b) very small phone-tier (where Gemma loses to in-house Pixel models). The on-device-but-meaningful tier where Gemma is the right answer is exactly where THOX hardware lives. THOX is proof that Gemma is the right model family for the prosumer + edge tier. That proof point is hard for Google to manufacture internally and free for the Gemma team if THOX ships.

Finally, the Gemma developer-relations team has been visibly engaged with the open-weight community and has historically been receptive to community-driven showcase opportunities. The asks here are small. The cost to Google is near zero. The optionality is real.

## Mutual fit assessment (1-10)

- Strategic alignment: 9 (Gemma's strategic mandate is open-weight adoption at the edge; THOX is a real edge deployment surface)
- Technical compatibility: 10 (Gemma is already a load-bearing base model in the THOX stack; multiple production fine-tunes shipped)
- Brand fit: 7 (Google brand is broad and consumer-facing; Gemma sub-brand is technical and developer-facing; THOX aligns with the Gemma sub-brand cleanly)
- Commercial overlap risk: 2 (Google does not sell open-weight hardware in the THOX segment; THOX does not train frontier models; near-zero direct overlap)
- Total weighted score: 8.5

## Specific asks we could make

- Gemma showcase listing for one or more THOX SKUs (ThoxNova as the flagship Gemma-on-edge reference)
- Direct channel for THOX engineering to file bug reports against the Gemma family, particularly around the Gemma 4 unified architecture and transformers compatibility
- Pre-release access to upcoming Gemma versions for THOX router and fine-tune compatibility testing
- Co-marketing on a "Gemma on THOX" reference architecture, published on the Gemma team's docs surface and on docs.thox.ai
- Pilot program: 25 ThoxNova units preloaded with the latest Gemma fine-tune, shipped to selected Gemma community advocates and Google developer-relations contacts for hands-on review
- A standing channel for THOX to provide telemetry-free deployment feedback to the Gemma team about what works and what does not on real consumer hardware

## What we could offer

- Co-branded "Gemma on THOX" reference designs and demo footage suitable for Gemma marketing and developer-event use
- Published case study on shipping Gemma-derived adapters to real backers at scale
- A standing testbed for Gemma quantization and runtime experiments on consumer hardware
- THOX hardware shipped to the Gemma team for internal experimentation
- Co-author a technical writeup on Gemma fine-tuning for the prosumer-hardware tier
- Public acknowledgment of the Gemma family on THOX model cards and on the campaign page

## Risks + non-starters

- DO NOT enter exclusivity arrangements. THOXCore is multi-vendor. Mistral, Llama, and future open-weight models matter equally.
- DO NOT accept terms that require THOX to deprecate or de-emphasize non-Gemma fine-tunes in the thoxllm-factory pipeline. The factory is base-model agnostic by design.
- DO NOT promise data sharing back to Google. THOX privacy story is the brand.
- DO NOT accept NDAs that prevent THOX from talking about the partnership publicly or from continuing to support other model families.
- DO NOT accept marketing language that frames THOX as a Google-only platform.
- DO NOT accept any arrangement that pulls THOX into the broader Google Cloud reseller funnel. THOX is hardware. THOX is not a Google Cloud sales channel.

## Recommended outreach path

- Tier 2 outreach (Gemma is a sub-brand within Google, not a top-level partnership). Direct engagement with the Gemma developer-relations team is the right entry point. Public-facing community channels (Discord, forum, GitHub) are acceptable initial-contact paths.
- Warm intro via a community contact who already participates in Gemma showcase events is preferred but not required.
- AVOID: the broader Google partnerships funnel. That path is too long and the wrong audience.
- AVOID: any attempt to engage Google Cloud sales. Wrong product, wrong team.

## Recommended timing

- T-21 days (Jul 22, 2026): direct engagement with Gemma developer-relations via community channels
- T-14 days (Jul 29, 2026): polite single follow-up if no response; engage at least one Gemma community advocate as a warm reference
- T-7 days (Aug 5, 2026): no further outbound; focus on launch
- Aug 12, 2026 launch: a public "ThoxNova ships Gemma fine-tunes" statement is fine on the campaign page regardless of Gemma team engagement; that is factual
- Post-launch (Aug 13 onward): re-engage with funding numbers, real deployment surface count, and published fine-tune model cards as proof points

## Decision authority

- All partnership commitments: Tommy + Craig (both)
- Any commitment that obligates THOX beyond a discovery call: requires written sign-off from both Tommy + Craig
- Any commitment >$10K: requires written sign-off from both Tommy + Craig PLUS attorney review
- Any press-release copy mentioning Google or Gemma by name: requires legal review before publication
- Any joint-marketing asset: requires Tommy + Craig sign-off AND Gemma team counterpart sign-off

## Disclaimers

- This brief is internal-only.
- This brief does NOT commit THOX or Google to anything.
- This brief does NOT reference any named Google or Gemma-team employee. THOX does not have warm-path intelligence at that level and will not pretend otherwise.
- Do not share this brief with Google or their representatives without redaction.
- Do not commit to anything beyond a discovery call without further internal review and attorney sign-off where appropriate.
- The asks and offers above are conversation starters. Actual deal shape will be determined in conversation with Gemma team counterparts and codified in a formal partnership agreement reviewed by counsel.
