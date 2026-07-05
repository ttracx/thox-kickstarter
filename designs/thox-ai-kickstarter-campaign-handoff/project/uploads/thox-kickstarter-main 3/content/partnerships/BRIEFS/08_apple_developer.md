# Partnership brief: THOX <-> Apple Developer

PRE-OUTREACH MEMO. Tommy + Craig review before any contact is initiated. Internal only. Do not send. Do not share with Apple or their representatives without redaction.

## Why this partnership matters to THOX

THOX ships thox-terminal as a SwiftUI iOS17+ and macOS14+ unified control plane (see project_thox_terminal in memory). The thox-terminal app is the operator-facing remote control for the entire THOX device fleet. It is also the most-likely-to-be-customer-facing surface of the THOX brand on Apple platforms. The xcframework deliverables from thoxllm-factory and THOXCore are designed to run on Apple Silicon with the MLX backend (which is one of the 7 THOXCore adapters). The relationship with Apple developer surfaces is therefore real and load-bearing for the iOS + macOS slice of the THOX product story.

Operationally, Apple Developer partnership unlocks three concrete things: App Store Featured placement for thox-terminal once it ships to the public app stores, WWDC Sessions or Labs access for the THOX iOS team to debug platform-specific behavior with Apple engineers, and pre-release access to upcoming iOS and macOS surfaces that may affect how thox-terminal handles things like Background Tasks, Local Networking entitlements, and Bluetooth pairing for the THOX device fleet.

Strategically, this is the most defensive of the 8 partnerships. THOX does not need Apple's permission to ship hardware or to publish open-weight models. THOX does need Apple's developer surface to behave predictably for thox-terminal. The asks here are operational, not strategic: make sure thox-terminal does not get app-store-rejected for surprising reasons, make sure entitlements requests get approved, make sure the THOX brand is not blocked from advertising on Apple platforms.

## Why this partnership might matter to Apple

Apple has a strategic interest in AI hardware that ships on-device with strong privacy posture. THOX is exactly that kind of partner. Every THOX device sold paired with thox-terminal on iOS or macOS is a deployment of an Apple-platform-friendly AI hardware story. Apple does not get many of those at the prosumer + maker + EDU tier. Most AI hardware in the Aug 2026 timeframe is Android-paired or web-only. THOX is iOS-and-macOS-first for the operator surface.

Apple's MLX team in particular has a real interest in third-party hardware that exercises MLX as a production runtime at scale. THOX's adoption of MLX as one of 7 THOXCore adapters is exactly the kind of distribution Apple wants for MLX. The MLX team is a credible point of warm engagement.

That said, Apple is famously hard to engage with at the partnership level. The right posture is to engage through the standard Apple Developer Program tier and through the MLX community channels, not to try to force a top-down partnership conversation that will almost certainly not happen.

## Mutual fit assessment (1-10)

- Strategic alignment: 8 (Apple privacy posture + on-device AI emphasis aligns with THOX brand)
- Technical compatibility: 8 (MLX is an existing THOXCore adapter; thox-terminal is SwiftUI-native)
- Brand fit: 7 (both technical-but-honest; Apple is brand-premium, THOX is brand-honest; coexists well)
- Commercial overlap risk: 5 (Apple does ship competing hardware at the AI-accelerator tier including the M-series Macs; THOX is not direct competition at the prosumer-edge-AI hardware tier but the overlap is non-trivial in the broader buyer mindset)
- Total weighted score: 7.0

## Specific asks we could make

- App Store Featured placement for thox-terminal at launch
- WWDC Sessions or Labs access for the THOX iOS team
- Direct channel to the MLX team for adapter-level feedback and pre-release access
- Entitlements pre-approval for any non-standard iOS or macOS entitlements thox-terminal requires (Local Networking, Background Tasks, Bluetooth, etc.)
- App Store reviewer relationship-of-record for thox-terminal updates, sufficient to avoid surprise rejections
- Apple Developer Program at the appropriate enterprise or individual tier for THOX
- Co-marketing on a "MLX on THOX" reference deployment (post-launch, dependent on real device install base)

## What we could offer

- Co-branded "MLX on THOX" reference designs showcasing MLX as the on-device runtime tier
- A real third-party hardware deployment surface for MLX at the prosumer-edge tier
- Published case study on shipping MLX-backed inference to real backers at scale (post-launch, dependent on real device install base)
- THOX hardware shipped to Apple's MLX team for internal experimentation
- A standing testbed for MLX adapter behavior at the prosumer-hardware tier
- A SwiftUI-native operator app (thox-terminal) that Apple can point at as a credible example of on-device AI tooling that respects iOS and macOS platform conventions

## Risks + non-starters

- DO NOT enter exclusivity arrangements. THOX is multi-platform (Android pairing is on the post-launch roadmap; web-only operator surface is the fallback).
- DO NOT promise that thox-terminal will be iOS-only or macOS-only. The web-only operator surface is the fallback for any non-Apple buyer.
- DO NOT accept terms that pull THOX into the Apple HomeKit, Matter, or HealthKit ecosystem unless the SKU specifically needs it. Avoid scope creep.
- DO NOT accept any arrangement that limits THOX's ability to ship to Apple-platform users in regions where the App Store does not operate normally.
- DO NOT accept any marketing language that frames THOX as an Apple-exclusive platform. The web operator surface is the canonical fallback.
- DO NOT promise data sharing back to Apple. THOX privacy story is the brand.

## Recommended outreach path

- Tier 4 outreach (Apple's developer-relations is mediated through paid developer programs and through community channels). Apple Developer Program enrollment is the standard entry. WWDC Lab requests are the standard escalation path. The MLX community channel is the most realistic warm-engagement path.
- Warm intro via an existing MLX contributor is preferred but not required.
- AVOID: any attempt to engage Apple's general-purpose partnerships funnel. Wrong audience.
- AVOID: any attempt to engage Apple Press. Wrong audience.

## Recommended timing

- T-21 days (Jul 22, 2026): NO outreach. Apple is not on the pre-launch outreach list because no Aug 12 ask depends on Apple engagement.
- T-7 days (Aug 5, 2026): ensure Apple Developer Program enrollment is current; confirm thox-terminal app store submission status if applicable
- Aug 12, 2026 launch: no Apple mention required on the campaign page. thox-terminal availability on iOS and macOS is a factual statement that can be made independent of any Apple partnership.
- Post-launch (Aug 13 onward): engage MLX community channels with real device install base data; submit WWDC 2027 session proposal if relevant; pursue App Store Featured placement on thox-terminal updates

## Decision authority

- All partnership commitments: Tommy + Craig (both)
- Any commitment that obligates THOX beyond a developer-program enrollment: requires written sign-off from both Tommy + Craig
- Any commitment >$10K: requires written sign-off from both Tommy + Craig PLUS attorney review
- Any commitment that obligates THOX to ship an Apple-platform-only feature: requires both Tommy + Craig sign-off AND a documented fallback for non-Apple buyers
- Any press-release copy mentioning Apple or MLX by name: requires legal review before publication

## Disclaimers

- This brief is internal-only.
- This brief does NOT commit THOX or Apple to anything.
- This brief does NOT reference any named Apple employee. THOX does not have warm-path intelligence at that level and will not pretend otherwise.
- Do not share this brief with Apple or their representatives without redaction.
- Do not commit to anything beyond a developer-program enrollment without further internal review and attorney sign-off where appropriate.
- The asks and offers above are conversation starters. Actual deal shape will be determined in conversation with Apple Developer-program counterparts and codified in a formal partnership agreement reviewed by counsel.
