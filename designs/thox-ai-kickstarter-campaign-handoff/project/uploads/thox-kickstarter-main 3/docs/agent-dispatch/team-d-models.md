# Team D — Model training + publish

## Mission

Every THOX device has a working local model on Ollama by T-28
(Jul 15 2026) for filming.

## Repos you own

- `C:\Users\tommy\dev\thox-gemma4` (primary)
- `C:\Users\tommy\dev\thoxllm-factory`
- `C:\Users\tommy\dev\thox-gemma4-e4b-sft`
- `C:\Users\tommy\dev\thox-micro-125m`

## Context to load first

1. `..\KICKSTARTER_SHIPPING_PLAN.md`
2. `thox-gemma4/README.md` + `docs/ROADMAP.md`
3. `thoxllm-factory/README.md` + the run-1/run-2/run-3 memory entries
4. `thox-gemma4-e4b-sft/README.md`
5. `thox-micro-125m/README.md`

## Current state

- thox-gemma4 Phase C 12B blocked on transformers 5.6+
- thoxllm-factory: 5 adapters trained at 240 steps (run 3); P1.5 7-tag publish pending
- thox-gemma4-e4b-sft: 71 MB LoRA ready; GGUF + Ollama tag pending
- thox-micro-125m: base only; needs SFT for instruction following

## Deliverables (priority order)

1. **transformers 5.6+ bump** in `thox-gemma4/pyproject.toml` +
   `requirements.txt` (precondition for Phase C 12B)
2. **Phase C 12B QLoRA train** on the 4060 Ti rig — `scripts/launch_phase_c_12b.sh`
3. **GGUF Q4_K_M export** for the 12B + benchmark on a LattePanda
   N100 (Intel CPU/Vulkan, NOT 4060 Ti CUDA)
4. **thoxllm-factory P1.5**: publish the 7 ready Ollama tags
   (`scripts/create_ollama_models.sh` + manual ollama push)
5. **ThoxGem-E4B GGUF**: merge LoRA -> bf16 -> GGUF Q4_K_M; push
   as `ollama tag ttracx/thoxgem:e4b`
6. **thox-gemma4 E2B**: train + RKNN export for ThoxAir NPU; bench
   tokens/sec on real Pi Zero 2 W + Coral Accelerator
7. **thox-micro-125m SFT**: instruction-tune for ThoxClip/Mini
   routing; benchmark on Pi Zero W

## Acceptance gate

- [ ] `ollama pull ttracx/thoxgem:e4b` works publicly
- [ ] `ollama pull ttracx/thoxnova-12b` works publicly (5 more
      tags + this one = 6 minimum live)
- [ ] ThoxNova on LP N100 hits >=4 tokens/sec on 12B (sustained)
- [ ] ThoxAir on Pi Zero 2 W + Coral hits >=10 tokens/sec on E2B
- [ ] ThoxMini on Pi Zero W hits >=1 token/sec on 125M SFT

## Scope reduction

If Phase C 12B fails to converge: fall back to Nova-12B-Unleashed
(already trained at 240 steps; just needs GGUF + Ollama publish).

## Daily standup + weekly milestone same shape as Team B.
