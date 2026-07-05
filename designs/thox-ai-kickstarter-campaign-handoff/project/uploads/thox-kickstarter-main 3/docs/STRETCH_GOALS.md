# Stretch Goals

Six unlocks, $250K to $3M. Each one is a real BOM or scope change, not a vanity badge.

## $250K - Baseline production run

- All ten reward tiers ship as listed.
- Manufacturing partner selected.
- DVT freeze in October 2026.

## $500K - ThoxOS Mini preflashed

- Every microSD that ships with a ThoxMini or ThoxAir arrives preflashed with ThoxOS Mini.
- The THOX agent fleet (A8 through A14) is preloaded.
- Backers can unbox and power on in under 60 seconds.

## $1.0M - MagStack Air firmware bundled

- Every ThoxAir ships with MagStack Air clustering firmware enabled by default.
- mDNS leader election, SQLite-backed task queue, llama.cpp `--rpc` integration, all preconfigured.
- Stand up a 4-node cluster by plugging four ThoxAir into the magnetic base. No setup.

## $1.5M - ThoxClip bone-conduction audio

- ThoxClip gets a bone-conduction transducer for private TTS playback.
- Adds about $4 to BOM; we eat the cost.
- Mechanical retains the magnetic clip and the 12-hour battery target.

## $2.0M - ThoxNova NPU module slot

- ThoxNova adds an M.2 2230 slot pre-wired for a Hailo-8L, RKNPU2 add-in card, or Coral.
- We ship the slot empty; backers can add the module they prefer.
- Includes driver shim in the THOX runtime so the NPU is visible to the agent.

## $3.0M - Open hardware files

- KiCad schematics for all four devices, STEP files for all four enclosures, full Buildroot configs.
- Published under CERN-OHL-S (Strong Reciprocal).
- Comes with the THOX hardware DESIGN.md explaining why every part was chosen.

## Risks per stretch

| Stretch | Biggest risk | Mitigation |
|---|---|---|
| $250K | None; baseline is the baseline | n/a |
| $500K | microSD reliability variance | Use only Samsung Industrial-grade SD; test 100 cards per shipment |
| $1.0M | WiFi airtime contention in cluster | Cap cluster at 8 nodes per shelf; document in MagStack Air docs |
| $1.5M | Bone-conduction acoustics on the small ThoxClip body | A/B with prototype before locking; if it fails, swap to a slightly larger driver and absorb the BOM delta |
| $2.0M | NPU module driver shim across three vendor types | Limit launch support to Hailo-8L; promise RKNPU2 + Coral as a Q3 2027 update |
| $3.0M | Open-hardware files leak in-development design choices we are not ready to publish | Publish the v1 hardware files, not the v2 prototype work |

