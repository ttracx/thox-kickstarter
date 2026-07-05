import { useState, useEffect, useMemo } from "react";

const mono = "'JetBrains Mono',monospace";

const MODES = [
  { id: "tp", label: "Tensor Parallel", desc: "Weight matrix W split into column shards across devices. All-reduce combines partial results." },
  { id: "pp", label: "Pipeline Parallel", desc: "Consecutive transformer layers assigned to consecutive devices. Tokens flow through the chain." },
  { id: "dup", label: "Model Duplication", desc: "Identical full model on each device. Requests load-balanced round-robin." },
];

const SCALING = [
  { nodes: 4, weight: "~3.5 GB", maxModel: "14B", example: "Llama-3 14B Int8" },
  { nodes: 8, weight: "~3.5 GB", maxModel: "28B", example: "Mixtral 8x7B Int8" },
  { nodes: 16, weight: "~3.5 GB", maxModel: "56B", example: "Llama-3 70B Int4" },
  { nodes: 32, weight: "~3.5 GB", maxModel: "70B", example: "Llama-3 70B Int8" },
];

export default function DistributedInference() {
  const [tab, setTab] = useState("parallel");
  const [mode, setMode] = useState("tp");
  const [clusterSize, setClusterSize] = useState(4);
  const [animPhase, setAnimPhase] = useState(0);
  const [specTokens, setSpecTokens] = useState([]);

  useEffect(() => {
    const id = setInterval(() => setAnimPhase(p => (p + 1) % 120), 60);
    return () => clearInterval(id);
  }, []);

  // Speculative decoding token animation
  useEffect(() => {
    if (tab !== "speculative") return;
    const id = setInterval(() => {
      setSpecTokens(prev => {
        const next = [...prev];
        if (next.length < 12) {
          const isDraft = next.length % 4 !== 3;
          next.push({
            id: Date.now(),
            text: isDraft ? ["the", "quick", "fox", "jumps", "over", "lazy", "dog", "and", "ran", "fast", "with", "great"][next.length % 12] : ["the", "quick", "brown", "jumps", "over", "a", "dog", "then", "ran", "quickly", "with", "much"][next.length % 12],
            draft: isDraft,
            accepted: !isDraft || Math.random() > 0.2,
          });
        } else {
          return [];
        }
        return next;
      });
    }, 300);
    return () => clearInterval(id);
  }, [tab]);

  const tabs = [
    { id: "parallel", label: "Parallelization" },
    { id: "scaling", label: "Scaling" },
    { id: "speculative", label: "Spec Decode" },
  ];

  const currentScaling = useMemo(() => SCALING.find(s => s.nodes === clusterSize), [clusterSize]);
  const bwUtil = useMemo(() => (1 - 1 / clusterSize) * 100, [clusterSize]);

  return (
    <div style={{ flex: 1, background: "#030806", fontFamily: mono, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
        {tabs.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, padding: "8px 0", textAlign: "center", fontSize: 9, cursor: "pointer",
              color: tab === t.id ? "#fbbf24" : "#6b7280",
              borderBottom: tab === t.id ? "2px solid #fbbf24" : "2px solid transparent" }}>
            {t.label}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
        {/* Parallelization Tab */}
        {tab === "parallel" && (
          <div>
            <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
              {MODES.map(m => (
                <div key={m.id} onClick={() => setMode(m.id)}
                  style={{ flex: 1, padding: "6px 4px", textAlign: "center", fontSize: 8, cursor: "pointer", borderRadius: 6,
                    background: mode === m.id ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${mode === m.id ? "#fbbf24" : "rgba(255,255,255,0.08)"}`,
                    color: mode === m.id ? "#fbbf24" : "#6b7280" }}>
                  {m.label}
                </div>
              ))}
            </div>

            {/* Animated diagram */}
            <div style={{ background: "#111827", borderRadius: 10, padding: 12, border: "1px solid rgba(255,255,255,0.05)", marginBottom: 12 }}>
              <svg viewBox="0 0 280 120" style={{ width: "100%", display: "block" }}>
                {mode === "tp" && (
                  <>
                    {/* Weight matrix split */}
                    <text x="140" y="12" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily={mono}>Weight Matrix W → Column Shards</text>
                    {[0, 1, 2, 3].map(i => {
                      const x = 35 + i * 65;
                      const pulse = Math.sin((animPhase + i * 30) * 0.08) * 0.3 + 0.7;
                      return (
                        <g key={i}>
                          <rect x={x} y="22" width="50" height="30" rx="4" fill={`rgba(251,191,36,${pulse * 0.15})`} stroke="#fbbf24" strokeWidth="1" />
                          <text x={x + 25} y="35" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily={mono}>W₀</text>
                          <text x={x + 25} y="46" textAnchor="middle" fill="#6b7280" fontSize="6" fontFamily={mono}>Node {i}</text>
                          {/* All-reduce arrows */}
                          {i < 3 && (
                            <line x1={x + 50} y1="37" x2={x + 65} y2="37" stroke="#fbbf24" strokeWidth="0.5" strokeDasharray="2 2" opacity={pulse} />
                          )}
                        </g>
                      );
                    })}
                    {/* All-reduce result */}
                    <rect x="80" y="70" width="120" height="30" rx="4" fill="rgba(16,185,129,0.1)" stroke="#10b981" strokeWidth="1" />
                    <text x="140" y="86" textAnchor="middle" fill="#10b981" fontSize="7" fontFamily={mono}>All-Reduce → Combined</text>
                    <line x1="140" y1="52" x2="140" y2="70" stroke="#6b7280" strokeWidth="0.5" strokeDasharray="2 2" />
                  </>
                )}
                {mode === "pp" && (
                  <>
                    <text x="140" y="12" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily={mono}>Pipeline: Layers → Devices</text>
                    {[0, 1, 2, 3].map(i => {
                      const x = 15 + i * 67;
                      const tokenX = ((animPhase * 2) % 280);
                      const isActive = tokenX >= x && tokenX < x + 50;
                      return (
                        <g key={i}>
                          <rect x={x} y="25" width="55" height="50" rx="4"
                            fill={isActive ? "rgba(251,191,36,0.15)" : "rgba(255,255,255,0.03)"}
                            stroke={isActive ? "#fbbf24" : "#374151"} strokeWidth="1" />
                          <text x={x + 27} y="44" textAnchor="middle" fill="#d1d5db" fontSize="7" fontFamily={mono}>Layers</text>
                          <text x={x + 27} y="55" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily={mono}>{i * 8}-{(i + 1) * 8 - 1}</text>
                          <text x={x + 27} y="68" textAnchor="middle" fill="#6b7280" fontSize="6" fontFamily={mono}>Node {i}</text>
                          {i < 3 && <text x={x + 60} y="52" fill="#fbbf24" fontSize="10">→</text>}
                        </g>
                      );
                    })}
                    {/* Flowing token */}
                    <circle cx={((animPhase * 2) % 280)} cy="90" r="4" fill="#fbbf24" opacity="0.8" />
                    <text x={((animPhase * 2) % 280) + 8} y="93" fill="#fbbf24" fontSize="6" fontFamily={mono}>token</text>
                  </>
                )}
                {mode === "dup" && (
                  <>
                    <text x="140" y="12" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily={mono}>Duplication: Full Model × N</text>
                    {/* Load balancer */}
                    <rect x="110" y="20" width="60" height="20" rx="4" fill="rgba(251,191,36,0.1)" stroke="#fbbf24" strokeWidth="1" />
                    <text x="140" y="33" textAnchor="middle" fill="#fbbf24" fontSize="6" fontFamily={mono}>Load Balancer</text>
                    {[0, 1, 2, 3].map(i => {
                      const x = 15 + i * 67;
                      const isActive = (Math.floor(animPhase / 30) % 4) === i;
                      return (
                        <g key={i}>
                          <line x1="140" y1="40" x2={x + 27} y2="55" stroke={isActive ? "#fbbf24" : "#374151"} strokeWidth="0.5" />
                          <rect x={x} y="55" width="55" height="40" rx="4"
                            fill={isActive ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.03)"}
                            stroke={isActive ? "#fbbf24" : "#374151"} strokeWidth="1" />
                          <text x={x + 27} y="72" textAnchor="middle" fill="#d1d5db" fontSize="7" fontFamily={mono}>Full Model</text>
                          <text x={x + 27} y="85" textAnchor="middle" fill="#6b7280" fontSize="6" fontFamily={mono}>Node {i}</text>
                        </g>
                      );
                    })}
                  </>
                )}
              </svg>
            </div>

            <div style={{ color: "#9ca3af", fontSize: 8, lineHeight: 1.6, marginBottom: 8 }}>
              {MODES.find(m => m.id === mode)?.desc}
            </div>

            {/* Formula */}
            <div style={{ background: "#0d1117", borderRadius: 6, padding: "8px 10px" }}>
              <code style={{ color: "#fbbf24", fontSize: 8 }}>BW/device = 2X × (1 - 1/P)</code>
              <div style={{ height: 6, background: "#1f2937", borderRadius: 3, marginTop: 6, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${bwUtil}%`, background: "#fbbf24", transition: "width 0.5s" }} />
              </div>
              <div style={{ color: "#6b7280", fontSize: 7, marginTop: 3 }}>Bandwidth utilization: {bwUtil.toFixed(0)}% (P={clusterSize})</div>
            </div>
          </div>
        )}

        {/* Scaling Tab */}
        {tab === "scaling" && (
          <div>
            <div style={{ color: "#fbbf24", fontSize: 9, fontWeight: 700, marginBottom: 10 }}>CLUSTER SCALING</div>
            <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
              {[4, 8, 16, 32].map(n => (
                <div key={n} onClick={() => setClusterSize(n)}
                  style={{ flex: 1, padding: "8px 4px", textAlign: "center", fontSize: 10, fontWeight: 700, cursor: "pointer", borderRadius: 6,
                    background: clusterSize === n ? "rgba(251,191,36,0.12)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${clusterSize === n ? "#fbbf24" : "rgba(255,255,255,0.08)"}`,
                    color: clusterSize === n ? "#fbbf24" : "#6b7280" }}>
                  {n}×
                </div>
              ))}
            </div>

            {/* Scaling table */}
            <div style={{ background: "#111827", borderRadius: 10, overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
              {SCALING.map((s, i) => {
                const isActive = s.nodes === clusterSize;
                const barW = (s.nodes / 32) * 100;
                return (
                  <div key={i} style={{ padding: "10px 12px", borderBottom: i < SCALING.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                    background: isActive ? "rgba(251,191,36,0.06)" : "transparent", transition: "background 0.2s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: isActive ? "#fbbf24" : "#d1d5db", fontSize: 10, fontWeight: 700 }}>{s.nodes} devices</span>
                      <span style={{ color: "#10b981", fontSize: 10, fontWeight: 700 }}>{s.maxModel} params</span>
                    </div>
                    <div style={{ height: 6, background: "#0d1117", borderRadius: 3, overflow: "hidden", marginBottom: 4 }}>
                      <div style={{ height: "100%", width: `${barW}%`, background: isActive ? "#fbbf24" : "#374151", transition: "all 0.5s", borderRadius: 3 }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#6b7280", fontSize: 7 }}>{s.weight}/device (Int8)</span>
                      <span style={{ color: "#6b7280", fontSize: 7 }}>{s.example}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Speculative Decoding Tab */}
        {tab === "speculative" && (
          <div>
            {/* Big stat */}
            <div style={{ textAlign: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#fbbf24" }}>~3.8×</div>
              <div style={{ color: "#9ca3af", fontSize: 9 }}>Throughput Multiplier</div>
            </div>

            {/* Token generation animation */}
            <div style={{ background: "#111827", borderRadius: 10, padding: "12px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 14 }}>
              <div style={{ color: "#fbbf24", fontSize: 8, fontWeight: 700, marginBottom: 8 }}>TOKEN GENERATION</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4, minHeight: 40 }}>
                {specTokens.map((tok, i) => (
                  <span key={tok.id} style={{
                    padding: "2px 6px", borderRadius: 3, fontSize: 8, fontFamily: mono,
                    background: tok.draft ? (tok.accepted ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.12)") : "rgba(251,191,36,0.12)",
                    border: `1px solid ${tok.draft ? (tok.accepted ? "#10b981" : "#ef4444") : "#fbbf24"}40`,
                    color: tok.draft ? (tok.accepted ? "#10b981" : "#ef4444") : "#fbbf24",
                    animation: "fadeIn 0.2s ease",
                  }}>
                    {tok.text} {tok.draft ? (tok.accepted ? "✓" : "✗") : "\u2605"}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 8, fontSize: 7, color: "#6b7280" }}>
                <span><span style={{ color: "#6b7280" }}>★</span> Verified</span>
                <span><span style={{ color: "#10b981" }}>✓</span> Draft accepted</span>
                <span><span style={{ color: "#ef4444" }}>✗</span> Draft rejected</span>
              </div>
            </div>

            {/* BLAKE3 verification */}
            <div style={{ background: "#0d1117", borderRadius: 6, padding: "8px 10px", marginBottom: 12 }}>
              <div style={{ color: "#10b981", fontSize: 8, fontWeight: 700, marginBottom: 6 }}>BLAKE3 SHARD VERIFICATION</div>
              {[0, 1, 2, 3].map(i => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <code style={{ color: "#6b7280", fontSize: 7 }}>shard_{i}: {`0x${(0xA1B2C3D4 + i * 0x11111111).toString(16).toUpperCase()}`}</code>
                  <span style={{ color: "#10b981", fontSize: 8 }}>✓</span>
                </div>
              ))}
            </div>

            {/* Throughput counter */}
            <div style={{ textAlign: "center" }}>
              <span style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.2)", color: "#fbbf24", fontSize: 9, fontWeight: 600, padding: "4px 12px", borderRadius: 6 }}>
                {(48 * 3.8).toFixed(0)} tok/s (vs {48} tok/s baseline)
              </span>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
