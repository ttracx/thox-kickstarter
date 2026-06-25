# Tommy's Kickstarter action playbook

**For**: Tommy <Tommy@thox.ai>
**Status**: 5 active human-gated items as of 2026-06-23 (T-49 to launch)
**Time required**: ~3 hours focused work today + ~4 hours of routing /
follow-up across the week

You are the orchestrator. Every agent team is now prep-complete. The
5 items below are the gates that human action unblocks. Do them in the
order listed; each one unblocks more agent work than the one above it.

## Today (Tue Jun 23 2026, 3 hours focused)

### Action 1 — DECISION CHANGED 2026-06-23: use local workstation, not cloud VM

The Hetzner CCX23 path described below is **superseded**. Decision recorded at [`docs/internal/BUILD_HOST_DECISION.md`](internal/BUILD_HOST_DECISION.md): use the local KnightHub workstation (i7-14700F 20c/28t, 127.7 GB RAM, RTX 4060 Ti 16 GB, WSL Ubuntu 26.04) as `THOX-BUILD-01`. More compute than the cloud option, zero recurring cost, GPU for Team D model packaging.

**Do this instead (15 min, vs the original 90 min):**

1. Open a WSL terminal: `wsl`
2. Pull and run the bootstrap script:
   ```
   curl -fsSL https://raw.githubusercontent.com/ttracx/thox-kickstarter/main/scripts/provision-thox-build-01.sh -o /tmp/bootstrap.sh
   chmod +x /tmp/bootstrap.sh
   /tmp/bootstrap.sh
   ```
   The script is idempotent. It installs the missing pieces (lld, qemu-user-static, debootstrap, cosign, tailscale, GitHub Actions runner binary) on top of what's already on the box, generates the cosign keypair, and writes `~/thox-shiproom/ENVIRONMENT.txt` with a full state dump.
3. Follow the "NEXT STEPS" the script prints when it finishes:
   - `sudo tailscale up` (browser auth; pin the resulting hostname)
   - Generate 5 GitHub Actions runner tokens (one per repo: thoxos-kernel, thoxos-air-image, thoxllm-factory, thox-provisioner, magstack-air); register via the included `~/thox-shiproom/bin/copy-runner-template <team> <repo> <token>` helper
   - Commit `~/thox-shiproom/secrets/cosign.pub` to thoxos-kernel + thoxos-air-image release pages (NEVER commit `cosign.key`)
4. Post in `#ks-ops`: "THOX-BUILD-01 live at `knighthub.<tailnet>.ts.net`. Teams B/C/D/E/F unblocked."
5. Update `docs/internal/BUILD_HOST_DECISION.md` sign-off checklist.

**Net savings**: $95-180/mo. Redirect to Pi Zero inventory + Kickstarter video production + packaging samples.

---

### Action 1 (ORIGINAL, SUPERSEDED) — Provision the shared Linux build host (90 min)

**Why now**: Unblocks Teams B (kernel), C (image build), D (model
packaging), E (cross-platform flasher), and F (MagStack Rust compile)
simultaneously. Highest-leverage single action you can take this week.

**Cost**: $95/mo on Hetzner CCX23, ~$15/mo if you go with AWS spot.
Provision through T+90 (Nov 10 2026); snapshot artifacts after.

**Steps**:

1. Sign up at hetzner.com -> Cloud -> Add Server
   - Location: Ashburn (us-east) or your preferred region
   - Image: Ubuntu 24.04 LTS
   - Type: **CCX23** (16 vCPU, 64 GB RAM, 360 GB NVMe)
   - SSH key: upload your existing key (do not use password auth)
   - Name: `thox-shiproom-1`
2. Wait ~30 sec for provisioning. Note the public IPv4.
3. SSH in: `ssh root@<ip>` then create user:
   ```
   adduser tommy --disabled-password
   usermod -aG sudo tommy
   mkdir -p /home/tommy/.ssh
   cp /root/.ssh/authorized_keys /home/tommy/.ssh/
   chown -R tommy:tommy /home/tommy/.ssh
   chmod 700 /home/tommy/.ssh
   chmod 600 /home/tommy/.ssh/authorized_keys
   echo "tommy ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers.d/tommy
   exit
   ```
4. Re-SSH as `tommy`: `ssh tommy@<ip>`
5. Run the bootstrap. The script is committed at TWO equivalent paths;
   either works:
   ```
   curl -L https://raw.githubusercontent.com/ttracx/thoxos-kernel/main/scripts/provision-linux-build-host.sh \
     -o ~/bootstrap.sh
   chmod +x ~/bootstrap.sh
   ~/bootstrap.sh
   ```
   Wait ~10 min. The script installs Rust nightly + 3 bare-metal targets +
   GRUB + QEMU + cosign + the workspace at `~/thox-shiproom/`.
6. Verify: `cat ~/thox-shiproom/ENVIRONMENT.txt` should show rustc,
   cargo, qemu-system-x86_64, cosign versions all populated.
7. Install Tailscale: `curl -fsSL https://tailscale.com/install.sh | sh`
   then `sudo tailscale up`. Note the tailnet name; share with Craig +
   Phamy so they can SSH in via the tailnet hostname.
8. Generate the cosign offline keypair (one-time):
   ```
   cd ~/thox-shiproom/secrets
   cosign generate-key-pair
   # Set a password when prompted. Save it in 1Password.
   chmod 400 cosign.key
   ```
   **CRITICAL**: never commit `cosign.key` to any repo. Public key
   `cosign.pub` gets committed to thoxos-kernel + thoxos-air-image
   release pages.

**Done when**:
- [ ] You can SSH from your laptop to `tommy@thox-shiproom-1` via
      Tailscale hostname
- [ ] `rustc --version` shows nightly bare-metal targets
- [ ] `cosign version` returns >=2.4.1
- [ ] `~/thox-shiproom/secrets/cosign.pub` exists; the key is in
      1Password

**Then**: post in `#ks-ops`: "Linux build host live at
`thox-shiproom-1.<tailnet>.ts.net`. Teams B/C/D/E/F unblocked." Tag
@Craig + @Phamy.

**Reference**: `docs/agent-dispatch/build-host-spec.md`.

### Action 2 — Order Team F MagStack hardware (30 min)

**Why now**: 8-clip MagStack physical assembly is the campaign's hero
shot. Lead time is the gating factor. Order Day 0 even if you don't
have the build host yet.

**Total**: ~$980. Charge to the THOX shiproom budget.

**Steps**:

1. Open `magstack-air/doc/PHYSICAL_ASSEMBLY_PLAN.md` in your browser
   (github.com/ttracx/magstack-air/blob/main/doc/PHYSICAL_ASSEMBLY_PLAN.md).
2. Place each line item in its respective cart per the sourcing notes
   in the BOM:
   - **8 x Pi Zero 2 W** — order from Adafruit, Sparkfun, or
     thepihut.com (have stock; ~1 week lead time to US). PiShop tends
     to be cheapest.
   - **8 x pogo-pin magnetic connectors** — per the BOM's specific
     part numbers
   - **1 x USB-PD source** (Anker / RAVPower 65W minimum)
   - **1 x mini-USB power distribution board**
   - Anti-static mat + ESD wrist strap if you don't have them
3. Track every order's expected arrival date. Drop them into a
   simple spreadsheet at `magstack-air/doc/parts-arrival-log.md`
   (or just paste into `#ks-ops`).
4. The 8 x ThoxClip v7.1 shell prints get queued on the Q2 Combo —
   Craig owns that (not a purchase).

**Done when**:
- [ ] All 4 line items ordered with arrival dates noted
- [ ] Total spend logged

**Then**: post in `#ks-ops`: "MagStack BOM ordered. Arrives <date
range>. Craig: queue 8 x ThoxClip v7.1 shells on Q2 Combo when bed
opens."

## This week (any time before Fri 5pm PT)

### Action 3 — Route Phamy for the 3 iOS TestFlight submissions (15 min)

**Why**: Team G's work is all prep-complete. The 3 iOS apps (thox-terminal,
thoxos-companion, thoxos-companion-multiplatform iOS variant) need
Phamy's Xcode + App Store Connect session to ship to TestFlight.

**Apps + bundles**:
| App | Bundle ID | Status |
|---|---|---|
| thox-terminal | `ai.thox.terminal` | scaffold landed at commit `f4ba35b`; needs `DEVELOPMENT_TEAM` + `MARKETING_VERSION=0.2.0` + `ITSAppUsesNonExemptEncryption=NO` |
| thoxos-companion | `ai.thox.companion` | P0 PEM trust anchor resolved at `94b0773`; needs 1024x1024 app icon + App Store Connect record |
| thoxos-companion-multiplatform (iOS) | TBD | deferred per Team G dispatch; iOS surface drops back to thoxos-companion |

**Steps**:

1. Slack DM to Phamy with the message template at the bottom of this
   playbook (search for "PHAMY MESSAGE TEMPLATE").
2. Send the dispatch files:
   - `thox-terminal/doc/TESTFLIGHT_SUBMISSION_GUIDE.md`
   - `thoxos-companion/doc/TESTFLIGHT_SUBMISSION_CHECKLIST.md`
3. Confirm Phamy has access to:
   - The THOX.ai Apple Developer account
   - The macOS box with Xcode 16+ installed
   - 30-90 min of focused time before T-35 (Jul 15)
4. Block time on her calendar for the build session if she asks.

**Done when**:
- [ ] Phamy confirmed she'll start the Xcode session by T-35
- [ ] App Store Connect records created for both apps
- [ ] First TestFlight build uploaded for each

**Decision rule**: if Phamy can't get to it by T-28 (Jul 22), demote
the iPhone beat in the video to "control via existing terminal client
on iPhone" (Termius / Blink) and shoot it that way. Don't let the
TestFlight delay cascade.

### Action 4 — Route Craig for the Team C V01 acceptance signoff (10 min)

**Why**: Team C v2 raised a new B6 blocker (real `thox-mesh-ctl` +
`thox-assistant` binaries, not placeholders) on top of the existing 5
blockers in V01_RELEASE_READINESS_AUDIT. Plus extended the acceptance
test (new sections 7a + 11). Craig owns thoxos-air-image; needs to
sign off on the scope change.

**Steps**:

1. Slack DM to Craig with this message:
   > B6 blocker added to thoxos-air-image V01 audit per Team C v2
   > (commit 7a01dfd): real thox-mesh-ctl (Rust, depends on
   > magstack-air mesh client crate) + real thox-assistant (Python,
   > depends on Ollama tag from Team D) instead of bash placeholders.
   > Acceptance test extends with section 7a peer-Pi mDNS check + section
   > 11 assistant token check. Read at
   > `thoxos-air-image/doc/V01_RELEASE_READINESS_AUDIT_2026-06-22.md` and
   > `doc/REAL_BINARY_IMPLEMENTATION_PLAN.md`. Reply approved or revise.
2. Wait for his approval; document in `#ks-ops`.

**Done when**:
- [ ] Craig replied approved/revised in writing
- [ ] If revised, the spec docs updated to match before any Linux-host
      build attempts

### Action 5 — DRI sign-off on command-center lockdown (5 min)

**Why**: Team A v2 verified lockdown but flagged 2 items RE-VERIFY:
README banner content + `.env.example` contents. The verifications
need `gh repo view` of a PRIVATE repo, which is on you as the
authenticated user.

**Steps**:

1. SSH or open a Windows terminal where `gh auth status` shows you
   authenticated as `ttracx`.
2. Run:
   ```
   gh repo view ttracx/thox-command-center --json visibility,description,homepageUrl
   ```
   Verify:
   - `visibility`: `PRIVATE`
   - `description`: contains "internal ops" or empty
   - `homepageUrl`: empty (no public marketing link)
3. Verify the README on disk:
   ```
   cd C:\Users\tommy\dev\thox-command-center
   cat README.md
   ```
   Confirm it's the 1-line "Internal THOX.ai ops only" text from the
   Team A v1 pass.
4. Verify `.env.example` doesn't leak any production secrets:
   ```
   grep -i "secret\|key\|token\|password" .env.example 2>/dev/null || echo "no env example"
   ```
5. Update `thox-kickstarter/docs/internal/COMMAND_CENTER_LOCKDOWN.md`
   (or `Thox.ai/docs/campaign/COMMAND_CENTER_LOCKDOWN.md` per the
   Team A v2 audit) by changing the 2 RE-VERIFY rows to PASS with
   timestamp + your sign-off.
6. Commit + push.

**Done when**:
- [ ] Both RE-VERIFY items flipped to PASS in the lockdown checklist
- [ ] Lockdown checklist pushed to main with your DRI signature line

## Routing templates

### PHAMY MESSAGE TEMPLATE (Slack DM)

```
Subject: 3 iOS TestFlight submissions for Kickstarter launch

Hey Phamy,

Team G prep is complete; the 3 iOS apps need your Xcode + App Store
Connect session to ship to TestFlight before T-35 (Jul 15 2026).

Apps + bundle IDs:
- thox-terminal: ai.thox.terminal (commit f4ba35b)
- thoxos-companion: ai.thox.companion (commit 94b0773)
- thoxos-companion-multiplatform iOS: see Team G v2 dispatch

What's prepped for you:
- thox-terminal/doc/TESTFLIGHT_SUBMISSION_GUIDE.md
- thoxos-companion/doc/TESTFLIGHT_SUBMISSION_CHECKLIST.md

What I need from you:
- 30-90 min Xcode session before T-35
- DEVELOPMENT_TEAM filled in thox-terminal/project.yml
- MARKETING_VERSION=0.2.0
- ITSAppUsesNonExemptEncryption=NO
- 1024x1024 app icon for thoxos-companion
- App Store Connect record created for both apps
- First TestFlight build uploaded

Block your own calendar; I'll cover other shiproom work in parallel.
If you cannot land it by T-28 (Jul 22), I demote the iPhone beat in
the video to an existing terminal client. Reply soon so I can plan
the video shoot.

Thanks,
Tommy
```

### CRAIG MESSAGE TEMPLATE (Slack DM)

```
Subject: thoxos-air-image V01 B6 blocker + acceptance test scope change

Hey Craig,

Team C v2 raised a new B6 blocker on thoxos-air-image and extended
the acceptance test. Needs your signoff before the Linux build host
work starts.

What changed:
- New B6: replace placeholder thox-mesh-ctl + thox-assistant bash
  stubs with real binaries
  - thox-mesh-ctl: Rust, cross-compile armv7-unknown-linux-gnueabihf,
    depends on magstack-air mesh client crate (Team F dependency)
  - thox-assistant: Python, depends on Ollama tag from Team D
- Acceptance test extends:
  - NEW section 7a: peer-node avahi-browse -tr _magstack-air._tcp check (updated 2026-06-25; ThoxMini Air now Luckfox Pico Mini B, not Pi)
  - NEW section 11: echo "hello" | thox-assistant token check

Files:
- thoxos-air-image/doc/V01_RELEASE_READINESS_AUDIT_2026-06-22.md
- thoxos-air-image/doc/REAL_BINARY_IMPLEMENTATION_PLAN.md
- thoxos-air-image/doc/specs/thox-mesh-ctl-spec.md
- thoxos-air-image/doc/specs/thox-assistant-spec.md
- thoxos-air-image/doc/v01-acceptance-test.md (sections 7a + 11)

Reply "approved" or "revise <what>". This is on the Day 0 critical
path: the build host work for Team B + C starts as soon as you sign.

Thanks,
Tommy
```

## Daily ritual

After today, plug into the scheduled standup:

- **8:30am PT Mon-Fri**: `ks-daily-standup` task runs automatically.
  Read its output in this chat. Pings the 8 team daily-report files;
  flags any team drifting (0 commits in 72h).
- **5pm PT Fri**: `ks-friday-milestone` task runs. Weekly aggregate +
  risk register delta + next week's deliverables.

You don't need to do anything except respond to blockers it surfaces.

## When to escalate to me

Ping me here if any of these happen:
- A team's daily report shows `RED` confidence for the Friday milestone
- The Linux build host is provisioned but Team B / C / D / E / F still
  not progressing within 48h (something's wrong with my dispatches)
- Phamy hasn't acknowledged the TestFlight ask by T-35
- Craig hasn't acknowledged the V01 B6 signoff within 48h
- Hardware arrival is delayed past T-28
- ANY public THOX surface contradicts the canonical campaign copy
  after Team A v2 lands

## Reference

- Master plan: `docs/KICKSTARTER_SHIPPING_PLAN.md`
- All team dispatches: `docs/agent-dispatch/team-{a..h}.md`
- Build host spec: `docs/agent-dispatch/build-host-spec.md`
- Canonical campaign copy: `Thox.ai/docs/campaign/CANONICAL_CAMPAIGN_COPY.md`
- Daily team reports: `docs/agent-dispatch/team-{a..h}-daily-report.md`
  (populated as work progresses)
- Risk register: `docs/KICKSTARTER_SHIPPING_PLAN.md` "Risk register" section

## Sign-off

Once all 5 actions in this playbook are complete, sign off here so
the scheduled standup knows the human-gated lane is closed:

- [ ] Action 1 (Linux build host) — DONE on ____________
- [ ] Action 2 (MagStack BOM order) — DONE on ____________
- [ ] Action 3 (Phamy routed for TestFlight) — DONE on ____________
- [ ] Action 4 (Craig signed off on V01 B6) — DONE on ____________
- [ ] Action 5 (Command-center lockdown DRI-signed) — DONE on ____________

Signed: ______________ on ____________

Tommy <Tommy@thox.ai>
