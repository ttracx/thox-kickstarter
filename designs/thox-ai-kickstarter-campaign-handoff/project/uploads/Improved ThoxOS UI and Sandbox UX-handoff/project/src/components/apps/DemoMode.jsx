import { useState, useEffect } from "react";

const mono = "'JetBrains Mono',monospace";

// Source of truth for the demo cycle. Exported so the ThoxOS root component
// can drive the orchestration (timers + app open/close) — this lets the demo
// keep running even when the DemoMode UI itself is unmounted because the user
// has navigated to another app's sheet/window.
export const DEMO_STEPS = [
  { id: "home", label: "Home Screen", duration: 3000, app: null, desc: "ThoxOS ready" },
  { id: "inference", label: "AI Inference", duration: 8000, app: "inference", desc: "Streaming AI response via TensorRT-LLM FP8" },
  { id: "quantum", label: "Quantum Simulator", duration: 6000, app: "quantum", desc: "Running QAOA circuit — Bloch sphere + histogram" },
  { id: "magstack", label: "MagStack™ Cluster", duration: 5000, app: "magstack", desc: "4 nodes active, dispatching tensor job" },
  { id: "mesh", label: "Mesh Cognition", duration: 6000, app: "mesh", desc: "Kuramoto sync reaching coherence r(t) > 0.8" },
  { id: "distributed", label: "Distributed Inference", duration: 5000, app: "distributed", desc: "Tensor parallel scaling to 70B params" },
  { id: "memory", label: "Memory Hierarchy", duration: 5000, app: "memory", desc: "5-tier pyramid + tiled pipeline animation" },
  { id: "security", label: "Security Center", duration: 5000, app: "security", desc: "Boot chain verification — 7/7 trust score" },
  { id: "kvcache", label: "KV Cache", duration: 5000, app: "kvcache", desc: "Sliding context 2K → 254K tokens" },
  { id: "home2", label: "Home Screen", duration: 3000, app: null, desc: "Status: Ready" },
];

export const DEMO_TOTAL_MS = DEMO_STEPS.reduce((s, x) => s + x.duration, 0);

// Presentational only. Demo state + timers live in the parent (ThoxOS root)
// so the demo survives sheet/active-window switches on mobile and tablet.
export default function DemoMode({ stepIdx = -1, startedAt = null, onStart, onStop }) {
  const running = stepIdx >= 0;
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!running || !startedAt) { setElapsed(0); return; }
    const tick = () => setElapsed(Date.now() - startedAt);
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [running, startedAt]);

  const totalDuration = DEMO_TOTAL_MS;
  const progress = Math.min((elapsed / totalDuration) * 100, 100);
  const currentStep = stepIdx >= 0 && stepIdx < DEMO_STEPS.length ? DEMO_STEPS[stepIdx] : null;
  const startDemo = () => { if (onStart) onStart(); };
  const stopDemo = () => { if (onStop) onStop(); };

  return (
    <div style={{ flex: 1, background: "#030806", fontFamily: mono, overflow: "auto", padding: 14 }}>
      <div style={{ color: "#fbbf24", fontSize: 9, fontWeight: 700, marginBottom: 14, letterSpacing: 0.8 }}>DEMO MODE</div>

      {!running ? (
        <>
          {/* Demo description */}
          <div style={{ background: "#111827", borderRadius: 10, padding: "14px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 16 }}>
            <div style={{ color: "#d1d5db", fontSize: 10, fontWeight: 600, marginBottom: 8 }}>Automated Kickstarter Walkthrough</div>
            <div style={{ color: "#9ca3af", fontSize: 8, lineHeight: 1.7, marginBottom: 12 }}>
              Cycles through all apps in a {(totalDuration / 1000).toFixed(0)}-second automated sequence.
              Perfect for screen recordings and Kickstarter video capture.
            </div>

            {/* Step timeline */}
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {DEMO_STEPS.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 20, textAlign: "right" }}>
                    <span style={{ color: "#4b5563", fontSize: 7 }}>{(step.duration / 1000).toFixed(0)}s</span>
                  </div>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: step.app ? "#fbbf24" : "#10b981" }} />
                  <span style={{ color: "#d1d5db", fontSize: 8 }}>{step.label}</span>
                  <span style={{ color: "#4b5563", fontSize: 7 }}>— {step.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Start button */}
          <button onClick={startDemo}
            style={{
              width: "100%", padding: "14px", borderRadius: 10,
              background: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(251,191,36,0.05))",
              border: "1px solid #fbbf24", color: "#fbbf24",
              fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: mono,
              letterSpacing: 1,
            }}>
            ▶ Start Demo
          </button>

          <div style={{ textAlign: "center", marginTop: 8 }}>
            <span style={{ color: "#4b5563", fontSize: 7 }}>Capture-ready: watermark overlay enabled during playback</span>
          </div>
        </>
      ) : (
        <>
          {/* Now playing */}
          <div style={{ background: "#111827", borderRadius: 10, padding: "16px", border: "1px solid rgba(251,191,36,0.2)", marginBottom: 16, textAlign: "center" }}>
            <div style={{ color: "#fbbf24", fontSize: 7, marginBottom: 6, letterSpacing: 1 }}>NOW SHOWING</div>
            <div style={{ color: "#fff", fontSize: 18, fontWeight: 800, marginBottom: 4 }}>
              {currentStep?.label || "Complete"}
            </div>
            <div style={{ color: "#9ca3af", fontSize: 8 }}>{currentStep?.desc}</div>
          </div>

          {/* Progress */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: "#6b7280", fontSize: 7 }}>Step {stepIdx + 1} of {DEMO_STEPS.length}</span>
              <span style={{ color: "#fbbf24", fontSize: 7 }}>{(elapsed / 1000).toFixed(0)}s / {(totalDuration / 1000).toFixed(0)}s</span>
            </div>
            <div style={{ height: 6, background: "#1f2937", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #fbbf24, #10b981)", transition: "width 0.1s", borderRadius: 3 }} />
            </div>
          </div>

          {/* Step indicators */}
          <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 16, flexWrap: "wrap" }}>
            {DEMO_STEPS.map((_, i) => (
              <div key={i} style={{
                width: i === stepIdx ? 16 : 6, height: 6, borderRadius: 3,
                background: i < stepIdx ? "#10b981" : i === stepIdx ? "#fbbf24" : "#1f2937",
                transition: "all 0.3s",
              }} />
            ))}
          </div>

          {/* Stop button */}
          <button onClick={stopDemo}
            style={{
              width: "100%", padding: "12px", borderRadius: 8,
              background: "rgba(239,68,68,0.1)", border: "1px solid #ef4444",
              color: "#ef4444", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: mono,
            }}>
            ■ Stop Demo
          </button>
        </>
      )}
    </div>
  );
}
