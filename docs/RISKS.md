# Risks

The Story-page risks section copy and the internal risk register.

## Story-page risks copy (paste into Kickstarter)

> We have spent two years building THOX.ai. The agent runtime is already shipping in alpha across Apple Silicon (thox-vmlx), NVIDIA (llama-server-cuda), Intel x86 (llama-server-sycl), browsers (MediaPipe WebGPU), and small ARM / RISC-V edge silicon (thoxymicro family). What this campaign funds is the hardware that runs that brain. None of this campaign is ML R&D; it is the first production run of four devices and the assembly line behind them.
>
> The three risks we care about most:
>
> **Supply chain.** The Milk-V Duo SoC inside ThoxMini and the BCM2835 inside ThoxAir are well-established but single-source. We have already prototyped on alternate silicon (the Luckfox RV1103 for ThoxMini, the Pi Zero 2 W for ThoxAir) and our firmware runs on both alternates today. If a primary part disappears, we switch the BOM, ship slightly later, and absorb the cost. No backer loses their reward.
>
> **Manufacturing.** We are working with a Reno, NV contract manufacturer who has shipped consumer-grade hardware for three other Kickstarter campaigns. They have committed line capacity for our Jan 2027 run. If they cannot meet capacity, we have a secondary partner in Shenzhen as a fallback.
>
> **Overclaim.** This is the risk we own personally. We will never tell you a 64 MB device runs an LLM. We will never tell you a wearable clip replaces a workstation. The smaller devices route to the larger ones. That is the whole point of the family, and we will publicly correct any marketing copy that drifts from this commitment.

## Internal risk register

| ID | Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|---|
| R1 | Stripe Connect verification slips past T-3 | medium | catastrophic | Submit documents at T-21; have ID + EIN ready; daily check-in with Stripe Connect support | P |
| R2 | Milk-V Duo end-of-life announcement during campaign | low | high | Switch ThoxMini to Luckfox RV1103 (already prototyped); 60-day delay; absorb $4/unit BOM | C |
| R3 | BCM2835 supply tightens on Pi Zero W | medium | medium | Switch ThoxAir to Pi Zero 2 W (already prototyped; faster anyway); no delay; absorb $2/unit BOM | C |
| R4 | LattePanda N100 EOL during fulfillment window | low | high | LattePanda Mu (Core Ultra 5) is announced as the successor; switch SKU, communicate via Update | C |
| R5 | Pledge rate falls below break-even at T+15 | medium | medium | Aggressive press push (3 outlets primed), influencer outreach, partner cross-promo from Adafruit | P |
| R6 | Major outlet publishes a negative review | low | medium | Standing 1-hour response policy; FAQ link; reply with specifics, not platitudes | P |
| R7 | Two-factor recovery codes lost | low | catastrophic | Codes saved in 1Password shared with both founders; backup printed in safe | B |
| R8 | Manufacturing partner cannot hit capacity in Jan 2027 | medium | high | Shenzhen secondary partner contract signed at DVT freeze; 30-day fallback window | C |
| R9 | Tariff change between launch and ship date | medium | medium | Reserve 4% of campaign budget; absorb up to 12% tariff swing without re-pricing | P |
| R10 | FCC / CE certification fails first time | medium | medium | Pre-certification scan at PVT; budget covers two cert cycles | C |

