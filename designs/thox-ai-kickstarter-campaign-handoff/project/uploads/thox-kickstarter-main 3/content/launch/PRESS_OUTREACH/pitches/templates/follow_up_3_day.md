# follow_up_3_day.md

Polite 3-day bump. Use exactly once. If no response after the bump, the reporter is in `ghosted` status and the operator drops outreach for this campaign (per `workflow/PR_PLAYBOOK.md`).

## Variables

- `{{ publication }}`
- `{{ reporter }}`
- `{{ new_angle }}` - a different angle from the initial pitch, drawn from `beat_mapping.md`. The bump should not be a copy-paste of the first send.
- `{{ kickstarter_url }}`
- `{{ founder_signoff }}` - same founder who sent the initial; do not switch senders mid-conversation

## Subject line (A)

```
Re: THOX - private AI on hardware you own. Kickstarter Aug 12.
```

The "Re:" form keeps the email threaded with the original send. Inbox UIs collapse it under the first message, which is the polite read.

## Subject line (B)

```
Quick bump: THOX preview offer still open for {{ publication }}
```

## Preview text (~60 chars)

```
Three-day check-in. New angle. Same demo offer.
```

## Body (~150 words)

```
Hi {{ reporter }},

Quick bump on my note from three days ago. The Kickstarter pre-launch page is now live at {{ kickstarter_url }} and the embargo preview slot for {{ publication }} is still open.

One additional angle that may be a better fit for your beat: {{ new_angle }}.

If you would like the demo unit and the 30-minute founder briefing, reply and we will get it scheduled this week. If this is not your beat, please forward and I will follow up with the right person.

If now is not the right time, I understand. We will not pile on; this is the only bump.

Thank you,

{{ founder_signoff }}

Tommy Xaypanya
Co-founder, THOX.ai
Cedar Park, TX
```

## Send checklist

- 72 hours have elapsed since the initial send (not less, not more)
- `{{ new_angle }}` is genuinely different from the initial pitch angle
- This is the FIRST bump; the operator has not bumped this reporter before in this campaign
- Same sender as the initial pitch (Tommy or Craig); do not switch
- Logged in `workflow/JOURNALIST_RELATIONSHIP_LOG.md` with `Last contact` updated and a note about which new angle was used
- After this send, the reporter moves to `ghosted` if no reply within 5 more business days; no additional bumps
