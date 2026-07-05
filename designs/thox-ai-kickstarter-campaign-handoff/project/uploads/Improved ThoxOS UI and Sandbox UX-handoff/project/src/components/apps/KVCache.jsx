import { useState, useEffect, useMemo } from "react";

const mono = "'JetBrains Mono',monospace";

export default function KVCache() {
  const [contextSize, setContextSize] = useState(64000);
  const [animOffset, setAnimOffset] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setAnimOffset(o => (o + 1) % 100), 80);
    return () => clearInterval(id);
  }, []);

  const maxTokens = 254000;

  // Memory calculations
  const standardMem = useMemo(() => (contextSize / 1000) * 0.065, [contextSize]); // ~65MB per 1K tokens standard
  const pqMem = useMemo(() => standardMem / 3.76, [standardMem]);

  // Chart data points
  const chartPoints = useMemo(() => {
    const pts = [];
    for (let t = 2000; t <= 254000; t += 4000) {
      pts.push({
        tokens: t,
        standard: (t / 1000) * 0.065,
        pq: (t / 1000) * 0.065 / 3.76,
      });
    }
    return pts;
  }, []);

  const maxMem = 16;
  const chartW = 260, chartH = 120;

  return (
    <div style={{ flex: 1, background: "#030806", fontFamily: mono, overflow: "auto", padding: 14 }}>
      <div style={{ color: "#22d3ee", fontSize: 9, fontWeight: 700, marginBottom: 12, letterSpacing: 0.8 }}>KV CACHE & POLARQUANT</div>

      {/* Context Window Slider */}
      <div style={{ background: "#111827", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ color: "#9ca3af", fontSize: 8 }}>Context Window</span>
          <span style={{ color: "#22d3ee", fontSize: 10, fontWeight: 700 }}>{(contextSize / 1000).toFixed(0)}K tokens</span>
        </div>
        <input type="range" min={2000} max={254000} step={1000} value={contextSize}
          onChange={e => setContextSize(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#22d3ee", height: 4 }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <span style={{ color: "#4b5563", fontSize: 7 }}>2K</span>
          <span style={{ color: "#4b5563", fontSize: 7 }}>64K</span>
          <span style={{ color: "#4b5563", fontSize: 7 }}>254K</span>
        </div>

        {/* Mini chart */}
        <svg viewBox={`0 0 ${chartW} ${chartH}`} style={{ width: "100%", marginTop: 8, display: "block" }}>
          {/* OOM line */}
          <line x1="0" y1={chartH * (1 - maxMem / 20)} x2={chartW} y2={chartH * (1 - maxMem / 20)} stroke="#ef4444" strokeWidth="0.5" strokeDasharray="3 3" />
          <text x={chartW - 2} y={chartH * (1 - maxMem / 20) - 3} textAnchor="end" fill="#ef4444" fontSize="6" fontFamily={mono}>16GB OOM</text>

          {/* Standard line (red) */}
          <polyline fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.8"
            points={chartPoints.map((p, i) => `${(i / (chartPoints.length - 1)) * chartW},${chartH - (Math.min(p.standard, 20) / 20) * chartH}`).join(" ")} />

          {/* PolarQuant line (emerald) */}
          <polyline fill="none" stroke="#10b981" strokeWidth="1.5"
            points={chartPoints.map((p, i) => `${(i / (chartPoints.length - 1)) * chartW},${chartH - (Math.min(p.pq, 20) / 20) * chartH}`).join(" ")} />

          {/* Current position marker */}
          {(() => {
            const x = ((contextSize - 2000) / (254000 - 2000)) * chartW;
            return <line x1={x} y1={0} x2={x} y2={chartH} stroke="#22d3ee" strokeWidth="0.5" strokeDasharray="2 2" />;
          })()}

          {/* Labels */}
          <text x="4" y="10" fill="#ef4444" fontSize="6" fontFamily={mono}>Standard</text>
          <text x="4" y="18" fill="#10b981" fontSize="6" fontFamily={mono}>PolarQuant</text>
        </svg>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ color: "#ef4444", fontSize: 8 }}>Standard: {standardMem.toFixed(1)} GB</span>
          <span style={{ color: "#10b981", fontSize: 8 }}>PolarQuant: {pqMem.toFixed(1)} GB</span>
        </div>
      </div>

      {/* KV Formula Card */}
      <div style={{ background: "#111827", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 14 }}>
        <div style={{ color: "#22d3ee", fontSize: 8, fontWeight: 700, marginBottom: 8 }}>KV FORMULA</div>
        <div style={{ background: "#0d1117", borderRadius: 6, padding: "8px 10px", fontFamily: mono, fontSize: 7, lineHeight: 1.8 }}>
          <div style={{ color: "#d1d5db" }}>KV = 2 × B × L × S × G × W × E</div>
          <div style={{ color: "#ef4444", marginTop: 4 }}>Standard: 2 × 64 × 32 × 1M × 8 × 128 × 1 = 4,194 GB <span style={{ color: "#6b7280" }}>← IMPOSSIBLE</span></div>
          <div style={{ color: "#10b981" }}>Sparse: &nbsp; 2 × 64 × 32 × 1,024 × 8 × 128 × 1 ≈ 4.3 GB <span style={{ color: "#6b7280" }}>← FITS IN UMA</span></div>
        </div>
        <div style={{ textAlign: "center", marginTop: 8 }}>
          <span style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", color: "#22d3ee", fontSize: 8, fontWeight: 600, padding: "3px 8px", borderRadius: 4 }}>
            1,000× memory reduction via sparse indexed attention
          </span>
        </div>
      </div>

      {/* NVMe Offload Diagram */}
      <div style={{ background: "#111827", borderRadius: 10, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 14 }}>
        <div style={{ color: "#22d3ee", fontSize: 8, fontWeight: 700, marginBottom: 10 }}>NVMe OFFLOAD</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
          <div style={{ flex: 1, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ color: "#10b981", fontSize: 9, fontWeight: 700, marginBottom: 4 }}>LPDDR5</div>
            <div style={{ color: "#d1d5db", fontSize: 7 }}>Dense Window</div>
            <div style={{ color: "#6b7280", fontSize: 7 }}>1,024 recent tokens</div>
            <div style={{ color: "#10b981", fontSize: 7, marginTop: 4 }}>102.4 GB/s</div>
          </div>
          {/* Animated arrows */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
            <div style={{ color: "#22d3ee", fontSize: 10, transform: `translateX(${Math.sin(animOffset * 0.1) * 3}px)`, transition: "none" }}>→</div>
            <div style={{ color: "#6b7280", fontSize: 6 }}>ANN</div>
            <div style={{ color: "#22d3ee", fontSize: 10, transform: `translateX(${-Math.sin(animOffset * 0.1) * 3}px)`, transition: "none" }}>←</div>
          </div>
          <div style={{ flex: 1, background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.3)", borderRadius: 8, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ color: "#60a5fa", fontSize: 9, fontWeight: 700, marginBottom: 4 }}>NVMe</div>
            <div style={{ color: "#d1d5db", fontSize: 7 }}>Indexed Store</div>
            <div style={{ color: "#6b7280", fontSize: 7 }}>Full history</div>
            <div style={{ color: "#60a5fa", fontSize: 7, marginTop: 4 }}>7 GB/s</div>
          </div>
        </div>
      </div>

      {/* PolarQuant Stats */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
        {[
          "3.76× KV compression (16-bit → PQ4)",
          "Context: ~64K → ~254K tokens on 16GB UMA",
        ].map((s, i) => (
          <span key={i} style={{ background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.2)", color: "#22d3ee", fontSize: 7, fontWeight: 600, padding: "3px 8px", borderRadius: 4 }}>{s}</span>
        ))}
        <span style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", color: "#6b7280", fontSize: 7, fontFamily: mono, padding: "3px 8px", borderRadius: 4 }}>
          RHT seed: 0xDEADBEEF0042CAFE
        </span>
      </div>
    </div>
  );
}
