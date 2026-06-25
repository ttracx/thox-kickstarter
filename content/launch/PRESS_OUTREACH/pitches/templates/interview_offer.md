# interview_offer.md

Founder interview offer. Use for podcasts, radio, long-form features, and any outlet that wants a conversation rather than a unit-review.

## Variables

- `{{ publication }}`
- `{{ reporter }}` - the host, producer, or reporter
- `{{ format }}` - "30-minute podcast interview" / "phone call for your feature" / "in-studio radio segment" / "video interview" etc
- `{{ scheduling_link }}` - operator's scheduling link; default `cal.com/thox-press` (verify before claiming)
- `{{ founder_signoff }}`
- `{{ interview_topics }}` - 3-5 short topic prompts the operator pre-loads to help the reporter shape the conversation

## Subject line (A)

```
Interview offer: THOX founders on private AI hardware
```

## Subject line (B)

```
Founder availability for {{ publication }} - 30 min, your scheduling
```

## Preview text (~60 chars)

```
Tommy + Craig available. Topic prompts inside. Your scheduling.
```

## Body (~270 words)

```
Hi {{ reporter }},

Following up on the THOX.ai launch coverage. I would like to offer you a {{ format }} with me and my co-founder Craig Ross.

Some topic prompts to make the booking easier on your end:

{{ interview_topics }}

Default prompts if you want them:
- Why we built THOX: the case for AI that runs on hardware you own
- The 7-backend ThoxCore router and what it took to ship a runtime that targets LiteRT + OpenAI-HTTP + Ollama + llama.cpp + vLLM + TensorRT + MLX from one cargo workspace
- Bootstrapping a two-person hardware company from Cedar Park, Texas, on Kickstarter, without VC
- Open-sourcing the runtime under Apache-2.0 and what that does and does not enable
- The MagStack clustering story: pogo-pin magnetic stack, multi-agent workflows, on-device compute pools

We can do audio-only over Zoom, Riverside, or your platform of choice. We can record in-person in Austin if your team is local. Video is fine. Either of us can lead, or both, depending on the angle.

Schedule any 30-minute slot that works for you here: {{ scheduling_link }}

If a 30-minute conversation is not the right format and you would prefer a written Q+A or a recorded standup, that works too. Reply with what fits your workflow and we will adapt.

Thank you for the consideration.

{{ founder_signoff }}

Tommy Xaypanya
Co-founder, THOX.ai
Cedar Park, TX
```

## Per-tier customization notes

- **Tier 1:** keep as written. Default to phone or video for the interview.
- **Tier 2:** for podcasts in this tier, the interview is the play; lead with the technical topic prompts.
- **Tier 3:** the interview is usually a quote-gathering call, not a full feature. Shorten the topic prompts to 2 items.
- **Tier 5 (AI podcasts):** lead with the long-form thesis topic. Latent Space, Last Week in AI may want the founder for the full episode.
- **Tier 6 (business press):** lead with the founder + funding-model topic. WSJ / Bloomberg interviews are typically phone, 20-30 min.
- **Tier 7 (local TX):** offer in-person interview in Cedar Park or Austin as the lead option. Local press cares about presence.
- **Tier 8 (education):** offer to bring both a faculty perspective (operator finds a willing early adopter from THOXKey university outreach) and the founder perspective.

## Send checklist

- Reporter has expressed interest (or this is a warm-introduction follow-up)
- `{{ format }}` matches what the reporter has indicated they want
- `{{ scheduling_link }}` is live and shows real founder availability
- `{{ interview_topics }}` are 3-5 specific prompts (not generic)
- Both founders confirmed available for the slot range offered
- Logged in `workflow/JOURNALIST_RELATIONSHIP_LOG.md` with `hot` status
