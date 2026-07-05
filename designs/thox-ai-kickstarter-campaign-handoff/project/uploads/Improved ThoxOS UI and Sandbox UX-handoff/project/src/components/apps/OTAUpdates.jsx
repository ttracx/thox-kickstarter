import { useState, useEffect, useRef } from "react";

const mono = "'JetBrains Mono',monospace";

const COMPONENTS = [
  { name: "ThoxOS", current: "1.2.0", available: "1.3.0", hasUpdate: true },
  { name: "Ollama", current: "0.5.7", available: "0.5.7", hasUpdate: false },
  { name: "cuQuantum", current: "24.08", available: "24.11", hasUpdate: true },
  { name: "Cluster Agent", current: "2.1.0", available: "2.1.0", hasUpdate: false },
];

export default function OTAUpdates() {
  const [activePartition, setActivePartition] = useState("A");
  const [updating, setUpdating] = useState(false);
  const [updatePhase, setUpdatePhase] = useState(""); // download, write, verify, reboot
  const [updateProgress, setUpdateProgress] = useState(0);
  const [componentUpdating, setComponentUpdating] = useState(null);
  const [componentProgress, setComponentProgress] = useState(0);
  const [showRollbackConfirm, setShowRollbackConfirm] = useState(false);
  const timerRef = useRef(null);

  const simulateUpdate = () => {
    if (updating) return;
    setUpdating(true);
    setUpdatePhase("download");
    setUpdateProgress(0);

    let phase = 0;
    const phases = ["download", "write", "verify", "reboot"];
    let progress = 0;

    timerRef.current = setInterval(() => {
      progress += 2 + Math.random() * 3;
      if (progress >= 100) {
        phase++;
        if (phase >= phases.length) {
          clearInterval(timerRef.current);
          setActivePartition(p => p === "A" ? "B" : "A");
          setUpdating(false);
          setUpdatePhase("");
          setUpdateProgress(0);
          return;
        }
        progress = 0;
        setUpdatePhase(phases[phase]);
      }
      setUpdateProgress(Math.min(progress, 100));
    }, 100);
  };

  const simulateComponentUpdate = (idx) => {
    if (componentUpdating !== null) return;
    setComponentUpdating(idx);
    setComponentProgress(0);
    const id = setInterval(() => {
      setComponentProgress(p => {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(() => {
            setComponentUpdating(null);
            setComponentProgress(0);
          }, 500);
          return 100;
        }
        return p + 3 + Math.random() * 4;
      });
    }, 100);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const standbyPartition = activePartition === "A" ? "B" : "A";

  return (
    <div style={{ flex: 1, background: "#030806", fontFamily: mono, overflow: "auto", padding: 14 }}>
      <div style={{ color: "#10b981", fontSize: 9, fontWeight: 700, marginBottom: 12, letterSpacing: 0.8 }}>OTA UPDATE MANAGER</div>

      {/* Partition Diagram */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {["A", "B"].map(p => {
          const isActive = activePartition === p;
          const isWriteTarget = updating && !isActive;
          return (
            <div key={p} style={{
              flex: 1, padding: "14px 12px", borderRadius: 12, textAlign: "center",
              background: isActive ? "rgba(16,185,129,0.06)" : "#111827",
              border: `1px solid ${isActive ? "#10b981" : isWriteTarget ? "#fbbf24" : "rgba(255,255,255,0.08)"}`,
              transition: "all 0.3s",
            }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: isActive ? "#10b981" : isWriteTarget ? "#fbbf24" : "#6b7280" }}>
                Partition {p}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 6 }}>
                {isActive && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse 1.5s infinite" }} />}
                <span style={{ color: isActive ? "#10b981" : "#6b7280", fontSize: 9, fontWeight: 600 }}>
                  {isActive ? "Active" : isWriteTarget ? "Writing..." : "Standby"}
                </span>
              </div>
              {isWriteTarget && updating && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ height: 4, background: "#1f2937", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${updateProgress}%`, background: "#fbbf24", transition: "width 0.1s" }} />
                  </div>
                  <div style={{ color: "#fbbf24", fontSize: 7, marginTop: 3 }}>{updatePhase}: {updateProgress.toFixed(0)}%</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Simulate Update button */}
      <button onClick={simulateUpdate} disabled={updating}
        style={{
          width: "100%", padding: "10px", marginBottom: 16, borderRadius: 8, border: "1px solid #10b981",
          background: updating ? "rgba(16,185,129,0.06)" : "rgba(16,185,129,0.1)",
          color: "#10b981", fontSize: 9, fontWeight: 600, cursor: updating ? "default" : "pointer", fontFamily: mono,
          opacity: updating ? 0.6 : 1,
        }}>
        {updating ? `Updating — ${updatePhase}...` : "Simulate A/B Update"}
      </button>

      {/* Component Update List */}
      <div style={{ color: "#9ca3af", fontSize: 8, fontWeight: 700, marginBottom: 8, letterSpacing: 0.5 }}>COMPONENT STATUS</div>
      <div style={{ background: "#111827", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 16 }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 80px", padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {["Component", "Current", "Available", "Status"].map(h => (
            <span key={h} style={{ color: "#6b7280", fontSize: 7, fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {COMPONENTS.map((comp, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 60px 60px 80px", padding: "8px 12px", borderBottom: i < COMPONENTS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", alignItems: "center" }}>
            <span style={{ color: "#d1d5db", fontSize: 9 }}>{comp.name}</span>
            <span style={{ color: "#6b7280", fontSize: 8 }}>{comp.current}</span>
            <span style={{ color: comp.hasUpdate ? "#fbbf24" : "#6b7280", fontSize: 8 }}>{comp.available}</span>
            <div>
              {componentUpdating === i ? (
                <div style={{ height: 4, background: "#1f2937", borderRadius: 2, overflow: "hidden", width: 70 }}>
                  <div style={{ height: "100%", width: `${componentProgress}%`, background: "#10b981", transition: "width 0.1s" }} />
                </div>
              ) : comp.hasUpdate ? (
                <button onClick={() => simulateComponentUpdate(i)}
                  style={{ padding: "2px 8px", borderRadius: 4, border: "1px solid #fbbf24", background: "rgba(251,191,36,0.1)", color: "#fbbf24", fontSize: 7, cursor: "pointer", fontFamily: mono }}>
                  Update
                </button>
              ) : (
                <span style={{ color: "#10b981", fontSize: 8 }}>✅ Current</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Rollback Button */}
      <button onClick={() => setShowRollbackConfirm(true)}
        style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #ef4444", background: "rgba(239,68,68,0.06)", color: "#ef4444", fontSize: 9, fontWeight: 600, cursor: "pointer", fontFamily: mono, marginBottom: 12 }}>
        Rollback to Previous
      </button>

      {showRollbackConfirm && (
        <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "12px", marginBottom: 12 }}>
          <div style={{ color: "#ef4444", fontSize: 9, fontWeight: 700, marginBottom: 6 }}>Confirm Rollback?</div>
          <div style={{ color: "#9ca3af", fontSize: 8, marginBottom: 8 }}>This will switch active partition from {activePartition} to {standbyPartition}.</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => { setActivePartition(standbyPartition); setShowRollbackConfirm(false); }}
              style={{ flex: 1, padding: "6px", borderRadius: 6, border: "1px solid #ef4444", background: "rgba(239,68,68,0.15)", color: "#ef4444", fontSize: 8, cursor: "pointer", fontFamily: mono }}>
              Confirm
            </button>
            <button onClick={() => setShowRollbackConfirm(false)}
              style={{ flex: 1, padding: "6px", borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)", color: "#9ca3af", fontSize: 8, cursor: "pointer", fontFamily: mono }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Status note */}
      <div style={{ textAlign: "center", padding: "8px", background: "rgba(255,255,255,0.02)", borderRadius: 6 }}>
        <span style={{ color: "#6b7280", fontSize: 7 }}>Manual updates only — no auto-updates without user consent</span>
      </div>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </div>
  );
}
