import { useState, useEffect, useRef, useMemo } from "react";

const mono = "'JetBrains Mono',monospace";

export default function MeshCognition() {
  const [tab, setTab] = useState("cfc");
  const [meshMode, setMeshMode] = useState(false); // false = 1-node, true = 4-node
  const [neurons, setNeurons] = useState(() => Array.from({ length: 64 }, (_, i) => ({ activation: Math.random() * 0.3, tau: 1 + Math.random() * 4 })));
  const [orderParam, setOrderParam] = useState(0.2);
  const [orderHistory, setOrderHistory] = useState(() => Array.from({ length: 60 }, () => 0.2 + Math.random() * 0.3));
  const [phases, setPhases] = useState([0, Math.PI / 2, Math.PI, 3 * Math.PI / 2]);
  const [hiddenState, setHiddenState] = useState(() => Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")));
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  // CfC neuron animation
  useEffect(() => {
    if (tab !== "cfc") return;
    const id = setInterval(() => {
      setNeurons(prev => prev.map(n => ({
        ...n,
        activation: Math.max(0, Math.min(1, n.activation + (Math.random() - 0.48) * 0.15)),
      })));
      setHiddenState(Array.from({ length: 16 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0")));
    }, 200);
    return () => clearInterval(id);
  }, [tab]);

  // Kuramoto sync animation
  useEffect(() => {
    if (tab !== "kuramoto") return;
    const id = setInterval(() => {
      setPhases(prev => {
        const K = 2.5; // coupling strength
        const omega = [1.0, 1.1, 0.9, 1.05]; // natural frequencies
        return prev.map((theta, i) => {
          let dtheta = omega[i];
          for (let j = 0; j < prev.length; j++) {
            if (j !== i) dtheta += (K / prev.length) * Math.sin(prev[j] - theta);
          }
          return theta + dtheta * 0.05;
        });
      });
      setOrderParam(prev => {
        // Calculate actual order parameter
        const rVal = Math.min(1, prev + (Math.random() - 0.3) * 0.08);
        setOrderHistory(h => [...h.slice(-59), rVal]);
        return Math.max(0, Math.min(1, rVal));
      });
    }, 100);
    return () => clearInterval(id);
  }, [tab]);

  // CfC network canvas rendering
  useEffect(() => {
    if (tab !== "cfc" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const cols = 8, rows = 8;
      const cw = W / cols, ch = H / rows;

      // Draw connections (sparse)
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < 64; i++) {
        const x1 = (i % cols) * cw + cw / 2;
        const y1 = Math.floor(i / cols) * ch + ch / 2;
        // Connect to ~3 neighbors
        for (let d = 1; d <= 3; d++) {
          const j = (i + d) % 64;
          const x2 = (j % cols) * cw + cw / 2;
          const y2 = Math.floor(j / cols) * ch + ch / 2;
          const a = neurons[i].activation;
          ctx.strokeStyle = `rgba(16,185,129,${a * 0.5})`;
          ctx.lineWidth = a * 1.5;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // Draw neurons
      for (let i = 0; i < 64; i++) {
        const x = (i % cols) * cw + cw / 2;
        const y = Math.floor(i / cols) * ch + ch / 2;
        const a = neurons[i].activation;
        const r = 3 + a * 5;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,185,129,${0.2 + a * 0.8})`;
        ctx.fill();

        if (a > 0.7) {
          ctx.beginPath();
          ctx.arc(x, y, r + 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(16,185,129,${a * 0.3})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [tab, neurons]);

  const tabs = [
    { id: "cfc", label: "CfC Network" },
    { id: "kuramoto", label: "Kuramoto Sync" },
    { id: "emotional", label: "Emotional Stack" },
  ];

  return (
    <div style={{ flex: 1, background: "#030806", fontFamily: mono, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
        {tabs.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, padding: "8px 0", textAlign: "center", fontSize: 9, cursor: "pointer",
              color: tab === t.id ? "#10b981" : "#6b7280",
              borderBottom: tab === t.id ? "2px solid #10b981" : "2px solid transparent" }}>
            {t.label}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
        {/* CfC Network Tab */}
        {tab === "cfc" && (
          <div>
            <div style={{ color: "#10b981", fontSize: 9, fontWeight: 700, marginBottom: 10, letterSpacing: 0.8 }}>64-NEURON CfC NETWORK</div>
            <div style={{ background: "#0d1117", borderRadius: 8, overflow: "hidden", marginBottom: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
              <canvas ref={canvasRef} width={280} height={280} style={{ width: "100%", display: "block" }} />
            </div>
            {/* Hidden state hex dump */}
            <div style={{ background: "#111827", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 12 }}>
              <div style={{ color: "#6b7280", fontSize: 7, marginBottom: 4 }}>256-byte Hidden State h(t)</div>
              <code style={{ color: "#10b981", fontSize: 7, wordBreak: "break-all", lineHeight: 1.8 }}>
                {hiddenState.join(" ")} {hiddenState.map(h => String.fromCharCode(parseInt(h, 16) % 94 + 33)).join("")}...
              </code>
            </div>
            {/* Key metric */}
            <div style={{ textAlign: "center" }}>
              <span style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#34d399", fontSize: 7, fontWeight: 600, padding: "3px 10px", borderRadius: 4 }}>
                256-byte opaque hidden states · Zero raw data leaves device
              </span>
            </div>
          </div>
        )}

        {/* Kuramoto Sync Tab */}
        {tab === "kuramoto" && (
          <div>
            <div style={{ color: "#10b981", fontSize: 9, fontWeight: 700, marginBottom: 10, letterSpacing: 0.8 }}>KURAMOTO SYNCHRONIZATION</div>

            {/* Order parameter gauge */}
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <svg viewBox="0 0 120 70" style={{ width: 160 }}>
                <path d="M 10 60 A 50 50 0 0 1 110 60" fill="none" stroke="#1f2937" strokeWidth="8" strokeLinecap="round" />
                <path d={`M 10 60 A 50 50 0 0 1 ${10 + orderParam * 100} ${60 - Math.sin(Math.acos(1 - orderParam)) * 50}`}
                  fill="none" stroke={orderParam > 0.8 ? "#10b981" : "#fbbf24"} strokeWidth="8" strokeLinecap="round" />
                <text x="60" y="55" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily={mono}>
                  {orderParam.toFixed(2)}
                </text>
                <text x="60" y="66" textAnchor="middle" fill="#6b7280" fontSize="6" fontFamily={mono}>r(t)</text>
              </svg>
              {orderParam > 0.8 && (
                <div style={{ color: "#10b981", fontSize: 10, fontWeight: 700, animation: "pulse 1.5s infinite" }}>
                  COHERENT
                </div>
              )}
            </div>

            {/* Phase plot - unit circle */}
            <div style={{ background: "#111827", borderRadius: 8, padding: 12, border: "1px solid rgba(255,255,255,0.05)", marginBottom: 12, display: "flex", justifyContent: "center" }}>
              <svg viewBox="0 0 100 100" style={{ width: 140, height: 140 }}>
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="1" />
                <line x1="10" y1="50" x2="90" y2="50" stroke="#1f2937" strokeWidth="0.5" />
                <line x1="50" y1="10" x2="50" y2="90" stroke="#1f2937" strokeWidth="0.5" />
                {phases.map((theta, i) => {
                  const colors = ["#10b981", "#fbbf24", "#60a5fa", "#a855f7"];
                  return (
                    <circle key={i}
                      cx={50 + 40 * Math.cos(theta)} cy={50 + 40 * Math.sin(theta)}
                      r="5" fill={colors[i]} opacity="0.9"
                      style={{ transition: "cx 0.1s, cy 0.1s" }} />
                  );
                })}
              </svg>
            </div>

            {/* Sparkline */}
            <div style={{ background: "#111827", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ color: "#6b7280", fontSize: 7, marginBottom: 4 }}>r(t) over 30s</div>
              <svg viewBox="0 0 280 40" style={{ width: "100%", display: "block" }}>
                <polyline fill="none" stroke="#10b981" strokeWidth="1"
                  points={orderHistory.map((v, i) => `${(i / 59) * 280},${40 - v * 38}`).join(" ")} />
                <line x1="0" y1={40 - 0.8 * 38} x2="280" y2={40 - 0.8 * 38} stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="2 2" />
              </svg>
            </div>
          </div>
        )}

        {/* Emotional Stack Tab */}
        {tab === "emotional" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ color: "#10b981", fontSize: 9, fontWeight: 700, letterSpacing: 0.8 }}>EMOTIONAL INTELLIGENCE STACK</div>
              <div onClick={() => setMeshMode(m => !m)}
                style={{ padding: "3px 8px", borderRadius: 4, fontSize: 7, cursor: "pointer",
                  background: meshMode ? "rgba(16,185,129,0.12)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${meshMode ? "#10b981" : "rgba(255,255,255,0.1)"}`,
                  color: meshMode ? "#10b981" : "#6b7280" }}>
                {meshMode ? "4-Node Mesh" : "1-Node Local"}
              </div>
            </div>

            {/* UET Card */}
            <div style={{ background: "#111827", borderRadius: 10, padding: "12px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 8 }}>
              <div style={{ color: "#fbbf24", fontSize: 8, fontWeight: 700, marginBottom: 6 }}>UET — User Emotional Tracker</div>
              <svg viewBox="0 0 280 50" style={{ width: "100%", display: "block" }}>
                {(() => {
                  const pts = Array.from({ length: 30 }, (_, i) => ({
                    x: (i / 29) * 280,
                    y: 25 + Math.sin(Date.now() / 1000 + i * 0.5) * 15 + (Math.random() - 0.5) * 5,
                  }));
                  return (
                    <polyline fill="none" stroke="#fbbf24" strokeWidth="1.5"
                      points={pts.map(p => `${p.x},${p.y}`).join(" ")} />
                  );
                })()}
                <text x="4" y="8" fill="#6b7280" fontSize="5" fontFamily={mono}>Positive</text>
                <text x="4" y="48" fill="#6b7280" fontSize="5" fontFamily={mono}>Negative</text>
              </svg>
              <div style={{ color: "#6b7280", fontSize: 7, marginTop: 4 }}>Valence trajectory over time</div>
            </div>

            {/* MEC Card */}
            <div style={{ background: "#111827", borderRadius: 10, padding: "12px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 8 }}>
              <div style={{ color: "#60a5fa", fontSize: 8, fontWeight: 700, marginBottom: 6 }}>MEC — Machine Emotional Continuum</div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <svg viewBox="0 0 120 120" style={{ width: 130, height: 130 }}>
                  {/* Spider/radar chart */}
                  {[0.2, 0.4, 0.6, 0.8, 1.0].map((ring, ri) => (
                    <polygon key={ri}
                      points={[0, 1, 2, 3, 4].map(i => {
                        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                        return `${60 + ring * 45 * Math.cos(angle)},${60 + ring * 45 * Math.sin(angle)}`;
                      }).join(" ")}
                      fill="none" stroke="#1f2937" strokeWidth="0.5" />
                  ))}
                  {/* Axes */}
                  {["Engagement", "Empathy", "Focus", "Creativity", "Calm"].map((label, i) => {
                    const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                    return (
                      <g key={i}>
                        <line x1="60" y1="60" x2={60 + 45 * Math.cos(angle)} y2={60 + 45 * Math.sin(angle)} stroke="#1f2937" strokeWidth="0.5" />
                        <text x={60 + 52 * Math.cos(angle)} y={60 + 52 * Math.sin(angle)} textAnchor="middle" fill="#6b7280" fontSize="4" fontFamily={mono}>{label}</text>
                      </g>
                    );
                  })}
                  {/* Data polygon */}
                  <polygon
                    points={[0.8, 0.7, 0.9, 0.6, 0.85].map((v, i) => {
                      const angle = (i / 5) * Math.PI * 2 - Math.PI / 2;
                      return `${60 + v * 45 * Math.cos(angle)},${60 + v * 45 * Math.sin(angle)}`;
                    }).join(" ")}
                    fill="rgba(96,165,250,0.15)" stroke="#60a5fa" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* CRE Card */}
            <div style={{ background: "#111827", borderRadius: 10, padding: "12px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 12 }}>
              <div style={{ color: "#10b981", fontSize: 8, fontWeight: 700, marginBottom: 6 }}>CRE — Continuous Resolution Engine</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  padding: "4px 10px", borderRadius: 6, fontSize: 9, fontWeight: 700,
                  background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981",
                }}>Aligned</div>
                <div style={{ flex: 1, height: 4, background: "#1f2937", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ width: "88%", height: "100%", background: "#10b981", borderRadius: 2 }} />
                </div>
                <span style={{ color: "#10b981", fontSize: 9, fontWeight: 700 }}>88%</span>
              </div>
            </div>

            {/* Mesh mode indicator */}
            {meshMode && (
              <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
                <div style={{ color: "#10b981", fontSize: 8, marginBottom: 4 }}>4-Node Mesh Active</div>
                <div style={{ color: "#6b7280", fontSize: 7 }}>256-byte vectors streaming between nodes · &lt;1ms RTT</div>
              </div>
            )}
          </div>
        )}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
    </div>
  );
}
