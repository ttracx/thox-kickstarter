# Team A — Marketing site reconciliation

## Mission

Ship the production thox.ai marketing site that matches the
Kickstarter playbook by T-30 (Jul 13 2026). Lock the
`thox-command-center` repo PRIVATE.

## Repos you own

- `C:\Users\tommy\dev\Thox.ai` (Next.js 16 marketing site)
- `C:\Users\tommy\dev\thox-command-center` (NOT yet a git repo;
  internal only)

## Context to load first

1. `C:\Users\tommy\dev\thox-kickstarter\docs\KICKSTARTER_SHIPPING_PLAN.md`
2. `C:\Users\tommy\dev\thox-kickstarter\docs\CAMPAIGN_INFO.md`
3. `C:\Users\tommy\dev\thox-kickstarter\docs\REWARDS_MATRIX.md`
4. `C:\Users\tommy\dev\Thox.ai\README.md`
5. `C:\Users\tommy\dev\Thox.ai\app/` directory structure
6. `C:\Users\tommy\dev\thox-3dprint-kit\devices\thoxnova\v2\README.md`
7. `C:\Users\tommy\dev\thox-3dprint-kit\devices\thoxclip\v7\README.md`

## Current state (per audit)

- Site says "April 14 2026 launch / starting at $549"
- Kickstarter playbook says "Aug 12 2026 / $39-$499 / 4 SKUs"
- These contradict each other

## Deliverables

1. **Hero rewrite**: replace "Edge AI device" framing with the
   4-SKU lineup (ThoxClip / Mini / Air / Nova at $39 / $69 / $79 /
   $499 early-bird).
2. **Countdown swap**: change April 14 to Aug 12 2026 9am PT.
3. **Pricing block**: 4-tier comparison table matching
   `docs/REWARDS_MATRIX.md`.
4. **Hero device render**: swap the current device image for a
   render of the 4 v2 devices in a row (use STL renders from
   `thox-3dprint-kit/devices/<device>/v2/mockup.svg` as a starting
   point; commission a real render if time permits).
5. **JSON-LD**: update the structured-data block for the new launch
   date.
6. **Stripe**: update deposit amount from current to $9.99 (matches
   the launch-list capture price in the playbook); verify
   `docs/REWARDS_MATRIX.md` confirms this.
7. **command-center lockdown**: initialize `thox-command-center`
   as a PRIVATE git repo (gh repo create ttracx/thox-command-center
   --private); 1-line README "internal ops only"; add cross80127
   as maintainer; sweep all public THOX repos for any
   "command-center" string references and remove them.

## Acceptance gate

- [ ] Site at thox.ai shows Aug 12 2026 / 4 SKUs / $39-$499 by T-30
- [ ] Stripe checkout works at $9.99 deposit on staging + prod
- [ ] `grep -ri "command-center" *` in every public repo returns
      zero matches (use `gh search code` for portfolio-wide check)
- [ ] thox-command-center private repo exists at
      github.com/ttracx/thox-command-center, cross80127 invited
- [ ] Lighthouse score >=90 on perf / SEO / a11y for the home page
- [ ] Mobile breakpoint clean on iPhone 15 + Pixel 8

## Daily standup template (post to #ks-ops at 12pm PT)

```
[Team A] Day N:
- Yesterday: <1 line>
- Today: <1 line>
- Blocker: <1 line or none>
- ETA to T-30 milestone: <on track | at risk | slipping>
```

## Weekly milestone

- Week 1 (T-49 to T-42): copy draft + design draft
- Week 2 (T-42 to T-35): site on staging URL
- Week 3 (T-35 to T-28): GA at thox.ai
- Week 4 (T-28 to T-21): SEO + JSON-LD + Lighthouse polish
- Week 5+ (T-21 onward): support other teams; no new site work
