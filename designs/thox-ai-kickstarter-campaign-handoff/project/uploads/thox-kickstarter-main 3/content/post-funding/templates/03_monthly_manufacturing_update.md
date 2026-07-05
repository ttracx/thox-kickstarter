# Template 03: Monthly Manufacturing Update

**Subject**: THOX month {{ month_number }}: {{ headline }}
**Alt subject (A/B)**: Month {{ month_number }} update: what we built, what we learned
**Preview text**: {{ short_summary }}

**Trigger**: every 30 days starting Day +30. Final monthly update is the month before the last reward ships.

**Send window**: 09:00 PT on the 30th day of each cycle. One send per cycle.

**Transactional**: No. Respects unsubscribe flag.

**Parametric**: this template is reused every month. The variables below carry the month-specific content.

**Variables used**:
- `{{ backer.first_name }}`
- `{{ month_number }}` -> integer, starts at 1 for the Day +30 send
- `{{ headline }}` -> one short clause, e.g. "ThoxClip DVT complete, ThoxMini at EVT2"
- `{{ short_summary }}` -> one-sentence preview text
- `{{ milestones_hit }}` -> bullet list of milestones hit this month
- `{{ milestones_missed }}` -> bullet list of milestones missed and why
- `{{ next_30_days }}` -> bullet list of what is in flight for the next 30 days
- `{{ per_sku_status_table }}` -> markdown table, one row per shipping SKU
- `{{ photo_url }}` -> link to one photo or short video from the month
- `{{ ask }}` -> optional, used only when we need backer input

---

**Body**:

> Hi {{ backer.first_name }},
>
> Month {{ month_number }} update. {{ headline }}.
>
> **What we hit this month**
>
> {{ milestones_hit }}
>
> **What we missed and why**
>
> {{ milestones_missed }}
>
> If this section is empty, it means nothing slipped this cycle. That is rare and worth noting when it happens. If this section is not empty, the reasons are real and we are not editorializing.
>
> **Per-reward status**
>
> {{ per_sku_status_table }}
>
> **Next 30 days**
>
> {{ next_30_days }}
>
> **Photo from the floor**: {{ photo_url }}
>
> {{ ask }}
>
> If your reward ship window has changed since the last update, the per-reward status table above will say so explicitly. If it has not changed, the table will say so explicitly as well. No reading between the lines required.
>
> Tommy

**Footer**: standard transactional footer.

---

## Per-reward status table format

This is the canonical markdown shape for `{{ per_sku_status_table }}`. Operator fills in the cells. Ship window column is the only place a date appears; status column is plain English.

```
| Reward | Status this month | Ship window |
|---|---|---|
| ThoxClip | EVT2 complete, DVT scheduled | Q1 2027 (unchanged) |
| ThoxMini | EVT1 in progress | Q2 2027 (unchanged) |
| ThoxAir | EVT1 in progress | Q2 2027 (unchanged) |
| ThoxNova | DVT in progress, chassis rev3 locked | Q2 2027 (unchanged) |
| MagStack Cluster Dock | Mold tooling kicked off | Q2 2027 (unchanged) |
```

If a window changes, the cell reads e.g. `Q1 2027 -> Q2 2027 (Template 07 sent <date>)` so backers see the change inline and know a delay comm was issued.

---

## Notes

**When to use**: every 30 days, starting Day +30. The cadence is locked. Skipping a month erodes trust faster than sending a quiet "nothing major to report" update.

**When NOT to use**: do not use this template for delay-only communications. Delays get Template 07 first, then are referenced in the next Template 03 cycle. Do not use this template for quality-issue announcements. Use Template 08.

**Minimum content rule**: even in a slow month, the update must include the per-reward status table and the next-30-days bullet list. Backers want signal that we are still working, not silence.

**Escalation criteria**: if more than one ship window in the per-reward status table is slipping this month, that month's update gets a Tommy + Craig joint sign-off and Craig's name appears in the closing.

**Photo / video discipline**: one photo from the actual floor or workbench. No stock photography. No glamour renders. If we did not produce something photographable this month, link a short Loom or screencap of a test run instead. Honesty over polish.

**Length target**: 400 to 600 words. If it runs longer, split into a routine update and a separate deep-dive blog post linked at the bottom.
