# tier_2_developer_outlets.md

Developer + technical community outlets. Hacker News is the highest-leverage single post in this tier and should be treated as a launch-day event, not a press pitch. The other four outlets accept submissions or pitches.

**Lead angle for this tier**: USB-form-factor + MagStack clustering + open-source runtime.
**Recommended template sequence**: initial_outreach for the publications; for Hacker News use the HN post template below (no email).

## Embargo policy

Mixed. Hacker News and Lobsters do not honor embargoes; they are community submission sites with public posts at the moment of submission. InfoQ, dev.to, and IEEE Spectrum accept embargoes for feature pieces.

## Outlets

---

### Hacker News (community post, not press contact)

- **URL**: https://news.ycombinator.com
- **Submission**: https://news.ycombinator.com/submit (requires a user account in good standing; the operator must have a HN account with positive karma to avoid the new-user filter)
- **Beat**: developer community discussion. Front page reach is in the millions when a post lands; a launch hardware story with open-source code has historically performed well.
- **Pitch angle**: lead with the technical artifact, not the marketing. Title format: `Show HN: THOX - private AI on USB-sized hardware (Apache-2.0)` or similar. Body is the GitHub repo link plus a short paragraph on what runs locally today.
- **Contact channel**: NOT a contact-the-editor outlet. The operator posts directly.
- **Submission guidelines**: https://news.ycombinator.com/showhn.html (Show HN rules: must be a thing people can play with, not just a landing page).
- **Lead time**: post at launch hour (Aug 12, ~9am Pacific is the historical sweet spot for engineering audience timezone coverage).
- **Embargo policy**: none. The post is public the moment it is submitted.
- **Coverage history**: Pine64, Framework Laptop, llama.cpp, Ollama, every notable open-source hardware launch from the last decade has had a top-page HN moment.
- **Post template**:
  ```
  Title: Show HN: THOX - private AI on USB-sized hardware (Apache-2.0)
  URL: https://www.kickstarter.com/projects/thox-ai/<slug>  (or the github repo if KS is not preferred for HN)
  Text (optional): brief 3-4 sentence post in founder voice. Mention what runs locally today (on-device Gemma 3, 7-backend ThoxCore router, Rust runtime), the four launch devices ($39-$499), and the GitHub link (github.com/ttracx). Sign as Tommy.
  ```

---

### Lobsters

- **URL**: https://lobste.rs
- **Beat**: invite-only developer community; smaller than HN but high signal. Front page reach is hundreds of thousands of impressions.
- **Pitch angle**: same as HN, leaning more into the architecture (Rust workspace, the 7-backend router, tiered memory).
- **Contact channel**: invite-only submission. The operator must have an invite or know someone who can submit on their behalf. No email pitch.
- **Submission guidelines**: https://lobste.rs/about (tagging rules are strict; correct tags are `hardware` + `ai` + `release`; do not over-tag).
- **Lead time**: post within 1-2 hours of HN post so the Lobsters audience sees it as a fresh artifact, not a re-share.
- **Embargo policy**: none.
- **Coverage history**: technical launches that did well on Lobsters also did well on HN.

---

### dev.to

- **URL**: https://dev.to
- **Beat**: developer blogging platform. Reach via tags and follower counts. Articles authored by THOX team get the strongest reach; pitches to staff are not the path.
- **Pitch angle**: authored long-form post by Tommy or Craig titled along the lines of `Why we built THOX: the case for on-device AI you can hold` or `From STL to ship: the THOX Cluster Dock build`.
- **Contact channel**: this is an authoring play, not a pitch play. Operator drafts a 1500-2000 word post and publishes from the THOX dev.to account.
- **Submission guidelines**: https://dev.to/p/editor_guide (style guide for posts)
- **Lead time**: publish at T-3 or T-1 so it surfaces during the launch week.
- **Embargo policy**: not applicable for self-authored posts.
- **Coverage history**: Pine64, Pimoroni, Adafruit teams have all built audience here.

---

### InfoQ

- **URL**: https://www.infoq.com
- **Beat**: software development news and analysis. Strong on Rust, distributed systems, AI infrastructure. Editorially curated.
- **Pitch angle**: the THOX runtime architecture as a case study. Multi-backend AI router (LiteRT, OpenAI-HTTP, Ollama, llama.cpp, vLLM, TensorRT, MLX) as the technical hook.
- **Contact channel**: `editors@infoq.com` (verify on https://www.infoq.com/about/ before send). InfoQ accepts pitches for feature articles.
- **Submission guidelines**: https://www.infoq.com/about (look for "Write for InfoQ" or contributor info)
- **Lead time**: 14-21 days. InfoQ moves on a feature pace, not a news pace.
- **Embargo policy**: accepts embargoes for feature articles when terms are documented.
- **Coverage history**: Rust ecosystem, LLM serving infrastructure, on-device AI.

---

### IEEE Spectrum

- **URL**: https://spectrum.ieee.org
- **Beat**: engineering deep-dives. Strong on chips, embedded, AI hardware, batteries, manufacturing. Will write a technical feature if the architecture is genuinely novel.
- **Pitch angle**: lead with the engineering. The 7-backend router pattern, the MagStack pogo-pin clustering, the parametric STL pipeline as engineering artifacts. The story is "how this was built," not "buy this."
- **Contact channel**: `tips@spectrum.ieee.org` (verify current); for feature pitches use the staff editor for the relevant beat (consumer electronics, AI, computing).
- **Submission guidelines**: https://spectrum.ieee.org/about (verify current contributor / contact link)
- **Lead time**: 21-30 days. Spectrum is a monthly outlet with a long calendar.
- **Embargo policy**: yes, for feature pieces.
- **Coverage history**: Pine64 RISC-V, Framework Laptop, Raspberry Pi launches, on-device AI silicon.

---

## Common dos and don'ts for Tier 2

- **Do**: link the GitHub repo (github.com/ttracx) in the first paragraph. This audience reads the code first.
- **Do**: highlight Apache-2.0 license and the published cargo workspace. Developers want to know the runtime is hackable.
- **Do**: for the HN post, post once, do not delete and re-post, do not ask friends to upvote. HN auto-detects manipulation and will dead-rank the post.
- **Don't**: send marketing-voice pitches to InfoQ or IEEE Spectrum. Both audiences are allergic to it.
- **Don't**: pitch a Lobsters submission via email to a moderator. It does not work that way.
