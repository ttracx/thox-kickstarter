# Partnership brief: THOX <-> Hugging Face

PRE-OUTREACH MEMO. Tommy + Craig review before any contact is initiated. Internal only. Do not send. Do not share with Hugging Face or their representatives without redaction.

## Why this partnership matters to THOX

Hugging Face is the default model registry for the open-weight ecosystem THOX builds on top of. THOX already hosts the Thox-ai organization on the Hub with multiple shipped fine-tune adapters (per project_thoxllm_factory and project_thoxllm_v06_bundle in memory). The thoxllm-factory pipeline produces GGUF + Ollama artifacts that get pushed to the Hub as part of the standard release flow. The relationship exists at the artifact level already. A partnership formalizes it.

Operationally, Hugging Face is the distribution channel that makes THOX's open-source posture credible. Every published THOX fine-tune is a Hub artifact. Every published THOX base model (ThoxMicro-125M, ThoxLLM-327M) is a Hub artifact. Every backer who wants to verify what is actually running on their device can read the model card on the Hub. The Hub is THOX's "show your work" surface. A formal relationship with the Hub team raises the credibility ceiling of that surface materially.

Strategically, Hugging Face partnership unlocks two specific things that matter for the Aug 12 launch: verified-publisher status (which signals to Hub viewers that the Thox-ai org is who it claims to be), and a featured collection placement that drives organic Hub traffic to THOX model cards. Neither costs Hugging Face anything. Both move the THOX top-of-funnel meaningfully.

## Why this partnership might matter to Hugging Face

Hugging Face is judged on ecosystem breadth: how many active orgs, how many published models, how many derivative artifacts, how many real deployment surfaces. THOX moves all four metrics in the right direction. Every THOX fine-tune is a Hub publication. Every THOX device shipped is a real deployment of Hub-hosted artifacts. Every THOX backer who pulls a quantized GGUF from the Hub is an authenticated Hub user. THOX is exactly the kind of org Hugging Face wants more of.

Hugging Face also has a meaningful interest in the "AI hardware that respects the Hub" story. Most hardware vendors at the prosumer + edge tier ship closed runtimes that do not interact cleanly with the Hub. THOX is the exception: THOXCore pulls model artifacts from the Hub at provision time, respects model cards, and surfaces the model card content to the user. That is a story Hugging Face can tell at developer events without needing to build the hardware themselves.

Finally, the cost to Hugging Face is near zero. THOX is not asking for paid services. THOX is asking for verified-publisher status, a featured collection, and a relationship-of-record. All three are things Hugging Face grants regularly to high-quality publishers.

## Mutual fit assessment (1-10)

- Strategic alignment: 9 (Hugging Face mission is open-weight ecosystem health; THOX is a real on-device deployment surface for Hub artifacts)
- Technical compatibility: 10 (THOX already publishes to the Hub; integration is the status quo)
- Brand fit: 9 (both technical, both community-friendly, both honest)
- Commercial overlap risk: 1 (Hugging Face does not sell hardware; THOX does not run a model registry; zero direct overlap)
- Total weighted score: 9.0

## Specific asks we could make

- Verified-publisher status for the Thox-ai org on the Hub
- Featured collection placement for the THOX-published model family (ThoxMicro-125M, ThoxLLM-327M, ThoxLLM-factory adapters)
- Listing of THOX devices in any Hub-adjacent hardware compatibility surface
- Co-marketing on a "Hub-hosted models running on THOX hardware" reference architecture
- Pre-release access to upcoming Hub features that affect THOXCore's artifact-fetch pipeline (in particular: Xet integration timing, since THOX has shipped specific workarounds for Xet-related upload failures per project_thoxllm_factory_run1)
- Direct channel for THOX engineering to file feedback on artifact-fetch behavior at consumer-hardware scale

## What we could offer

- Co-branded "Hub on THOX" reference designs showcasing model-card-respectful hardware behavior
- Published case study on shipping Hub-hosted models to real backers at scale
- A standing testbed for Hub-side features that touch artifact fetch, model card surfacing, or quantization formats
- THOX hardware shipped to Hugging Face's developer-experience team for internal experimentation
- Public acknowledgment of the Hub as THOX's canonical artifact distribution surface on every THOX model card and on the campaign page
- Co-authored writeup on shipping open-weight artifacts to consumer hardware

## Risks + non-starters

- DO NOT enter exclusivity arrangements. THOX must continue to host artifacts on Ollama and other distribution surfaces as appropriate.
- DO NOT promise data sharing back to Hugging Face. THOX privacy story is the brand.
- DO NOT accept NDAs that prevent THOX from talking about the partnership publicly.
- DO NOT accept any arrangement that requires THOX to pay for Hub services that are otherwise free. THOX is happy to be a paying Hub Pro customer if the value is there, but that is a procurement decision, not a partnership term.
- DO NOT accept marketing language that frames THOX as a Hugging-Face-exclusive distribution platform.

## Recommended outreach path

- Tier 3 outreach (Hugging Face engages with community publishers regularly through public channels). Discord, forum, and direct email to the developer-experience or community team are all acceptable initial-contact paths.
- Warm intro via a Hub community contact is preferred but not required.
- AVOID: any path that lands the brief on a sales desk. We are not buying enterprise services.

## Recommended timing

- T-21 days (Jul 22, 2026): direct outreach via community channels with verified-publisher request and featured-collection nomination
- T-14 days (Jul 29, 2026): polite single follow-up; consider escalating via a Hub community advocate
- T-7 days (Aug 5, 2026): no further outbound; focus on launch
- Aug 12, 2026 launch: campaign page links to the Hub model cards regardless of Hugging Face engagement
- Post-launch (Aug 13 onward): re-engage with download counts, real backer usage data, and growing fine-tune library as proof points for verified-publisher status

## Decision authority

- All partnership commitments: Tommy + Craig (both)
- Any commitment that obligates THOX beyond a discovery call: requires written sign-off from both Tommy + Craig
- Any commitment >$10K: requires written sign-off from both Tommy + Craig PLUS attorney review
- Any press-release copy mentioning Hugging Face by name: requires legal review before publication
- Any joint-marketing asset: requires Tommy + Craig sign-off AND Hugging Face counterpart sign-off

## Disclaimers

- This brief is internal-only.
- This brief does NOT commit THOX or Hugging Face to anything.
- This brief does NOT reference any named Hugging Face employee. THOX does not have warm-path intelligence at that level and will not pretend otherwise.
- Do not share this brief with Hugging Face or their representatives without redaction.
- Do not commit to anything beyond a discovery call without further internal review and attorney sign-off where appropriate.
- The asks and offers above are conversation starters. Actual deal shape will be determined in conversation with Hugging Face counterparts and codified in a formal partnership agreement reviewed by counsel.
