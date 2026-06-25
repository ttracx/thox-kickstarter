# Partnership brief: THOX <-> OpenAI

PRE-OUTREACH MEMO. Tommy + Craig review before any contact is initiated. Internal only. Do not send. Do not share with OpenAI or their representatives without redaction.

## Why this partnership matters to THOX

OpenAI is the default cloud-AI brand for the vast majority of buyers. THOXCore's router was designed from day one to speak the OpenAI-compatible wire protocol, which means the OpenAI API is the most natural cloud-tier adapter in the stack. A formal relationship with OpenAI strengthens the THOX pitch for buyers who already have OpenAI credentials sitting in a vault and want to plug a private edge tier in front of those credentials without rebuilding their workflow.

Operationally, the partnership is mostly already done at the protocol layer. ChatGPT, gpt-4 family, the Responses API, and the upcoming on-device dev kit lineage all speak shapes THOXCore handles natively. A partnership turns this from "we happen to work" into "we are an OpenAI-listed hardware partner," which moves the THOX brand into a different procurement category for risk-averse buyers.

Strategically, the OpenAI partnership is the most transactional of the four Tier-1 candidates. THOX is not asking for joint research or for OpenAI to validate the THOX safety story. THOX is asking for preferred hardware partner status for buyers who want a privacy-tier in front of OpenAI services. That is a clean ask, easy for OpenAI to evaluate, easy for OpenAI to decline without burning a bridge, easy to revisit in a year.

## Why this partnership might matter to OpenAI

OpenAI has a hardware problem that they are visibly working on (the Jony Ive collaboration, the ChatGPT-as-an-operating-layer narrative). They do not have a privacy-forward hardware story. They have a "AI for everyone" story. The privacy-forward seat is open. THOX can sit in that seat without competing with whatever OpenAI eventually ships, because THOX is targeting prosumer + small-business + EDU + regulated-vertical buyers who would never wait two-to-three years for a first-party OpenAI device.

THOX also brings something OpenAI does not currently have at any scale: a real on-device router that handles the cloud-handoff cleanly. The router runs locally, decides locally, and only forwards to the OpenAI API when the on-device model is not the right tool for the job. That handoff pattern is the actual edge AI story for 2026 and beyond. OpenAI benefits from a partner that documents and proves out the pattern in public.

Finally, THOX's positioning is non-competitive. THOX does not train frontier models. THOX does not run a hosted-API business. THOX does not compete with the ChatGPT consumer product. THOX is a hardware shop that routes some traffic to OpenAI's API. That is the cleanest possible relationship: THOX is a customer that occasionally markets the relationship.

## Mutual fit assessment (1-10)

- Strategic alignment: 6 (OpenAI is committed to broad AI accessibility; THOX brings a privacy-tier story that complements but does not deeply align with OpenAI's "AI for everyone" thesis)
- Technical compatibility: 10 (THOXCore was built around the OpenAI-compatible wire protocol; integration is trivial)
- Brand fit: 5 (different voices; OpenAI is consumer-mass-market; THOX is technical-prosumer-private; no friction but no obvious resonance either)
- Commercial overlap risk: 4 (OpenAI's hardware ambitions create modest future overlap; near-term overlap is low because OpenAI does not target THOX's prosumer + maker + EDU + small-business segments at price points THOX can match)
- Total weighted score: 6.25

## Specific asks we could make

- Listed-partner status on the OpenAI Platform partners page or equivalent hardware listing
- A preferred-vendor or volume-discount agreement on API usage that the THOX Cloud profile users can opt into
- Pre-release access to upcoming OpenAI API surface changes so THOXCore's adapter stays current
- Co-marketing on a "THOX + OpenAI hybrid deployment" reference architecture, framed as one of several supported cloud-tier configurations (not THOX-exclusive)
- Pilot program: 25-50 THOX devices preloaded with the OpenAI adapter configured, shipped to OpenAI developer relations and selected community advocates for hands-on review and feedback

## What we could offer

- Co-branded hardware reference designs that showcase the OpenAI API behind a THOX edge tier, suitable for OpenAI demo footage at developer events
- A real privacy-tier deployment case study OpenAI can reference when enterprise customers ask "how do we run this in a privacy-sensitive environment"
- A standing testbed for OpenAI to validate API surface changes against an on-device router workload
- THOX hardware (ThoxNova + ThoxMini Air MagStack cluster) shipped to OpenAI's platform team for internal experimentation
- A documented on-device adapter that handles graceful fallback when the OpenAI API is rate-limited or unavailable, useful as a community reference

## Risks + non-starters

- DO NOT enter exclusivity arrangements. THOXCore's 7-adapter promise depends on multi-vendor support. Anthropic and Cohere matter equally.
- DO NOT promise data sharing. THOX's privacy story is the brand. No telemetry from on-device sessions to OpenAI. The router only forwards the specific prompt the user routed to the cloud tier. Nothing else.
- DO NOT accept NDAs that prevent THOX from talking about the partnership publicly.
- DO NOT accept NDAs that prevent THOX from continuing to support other model vendors.
- DO NOT accept marketing language that frames THOX as an OpenAI-only platform. Wrong story.
- DO NOT accept any arrangement that requires THOX to disable or de-prioritize on-device inference in favor of cloud routing. The on-device story is the brand.

## Recommended outreach path

- Tier 1 outreach. Warm intro via a mutual connection at the platform-partnerships or developer-relations level. Cold-outreach is acceptable as a fallback.
- AVOID: the consumer-product email. That is the wrong audience for a hardware partnership.
- AVOID: any path that lands the brief on a press desk. We are not pitching press here.

## Recommended timing

- T-21 days (Jul 22, 2026): warm-intro outreach attempted; if no warm path, send a single tightly written cold note
- T-14 days (Jul 29, 2026): polite single follow-up if no response; if still no response, table until post-launch
- T-7 days (Aug 5, 2026): no further outbound; focus on launch
- Aug 12, 2026 launch: a generic "THOXCore supports the OpenAI API" line is fine on the campaign page regardless of OpenAI engagement, because that is a factual statement about the open protocol
- Post-launch (Aug 13 onward): re-engage with funding numbers and a real backer install base as proof points

## Decision authority

- All partnership commitments: Tommy + Craig (both)
- Any commitment that obligates THOX beyond a discovery call: requires written sign-off from both Tommy + Craig
- Any commitment >$10K: requires written sign-off from both Tommy + Craig PLUS attorney review
- Any press-release copy mentioning OpenAI by name: requires legal review before publication
- Any joint-marketing asset: requires Tommy + Craig sign-off AND OpenAI counterpart sign-off

## Disclaimers

- This brief is internal-only.
- This brief does NOT commit THOX or OpenAI to anything.
- This brief does NOT reference any named OpenAI executive. THOX does not have warm-path intelligence at the executive level at OpenAI and will not pretend otherwise.
- Do not share this brief with OpenAI or their representatives without redaction.
- Do not commit to anything beyond a discovery call without further internal review and attorney sign-off where appropriate.
- The asks and offers above are conversation starters. Actual deal shape will be determined in conversation with OpenAI counterparts and codified in a formal partnership agreement reviewed by counsel.
