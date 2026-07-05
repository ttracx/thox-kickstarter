import { useState, useEffect } from "react";

const mono = "'JetBrains Mono',monospace";

const TIERS = [
  { id: "T0", label: "Registers", bw: "~19 TB/s", size: "256 KB", color: "#10b981", detail: "GPU register file — fastest storage, per-thread private data" },
  { id: "T1", label: "Shared Memory / L1", bw: "~19 TB/s", size: "128 KB/SM", color: "#10b981", detail: "The beating heart — programmer-managed scratchpad for tensor tiles" },
  { id: "T2", label: "L2 Cache", bw: "~2 TB/s", size: "4 MB", color: "#60a5fa", detail: "Hardware-managed cache shared across all SMs" },
  { id: "T3", label: "LPDDR5 UMA", bw: "102.4 GB/s", size: "16 GB", color: "#ef4444", detail: "THE BOTTLENECK — unified memory shared between CPU, GPU, system" },
  { id: "T4", label: "NVMe SSD", bw: "~7 GB/s", size: "2 TB", color: "#6b7280", detail: "Persistent storage — KV cache offload, model weights, checkpoints" },
];

const UMA_BUDGET = [
  { label: "KV Cache", size: "2\u20134 GB", color: "#22d3ee", pct: 18.75 },
  { label: "Weight Shards", size: "0.5\u20134 GB", color: "#fbbf24", pct: 15.6 },
  { label: "ThoxOS + Quantum", size: "~2 GB", color: "#10b981", pct: 12.5 },
  { label: "OS + System", size: "~2 GB", color: "#6b7280", pct: 12.5 },
  { label: "Free", size: "~6 GB", color: "#1f2937", pct: 40.6 },
];

export default function MemoryHierarchy() {
  const [selTier, setSelTier] = useState(-1);
  const [pipePhase, setPipePhase] = useState(0);

  // Tiled pipeline animation
  useEffect(() => {
    const id = setInterval(() => {
      setPipePhase(p => (p + 1) % 100);
    }, 50);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ flex: 1, background: "#030806", fontFamily: mono, overflow: "auto", padding: 14 }}>
      {/* Memory Pyramid */}
      <div style={{ color: "#10b981", fontSize: 9, fontWeight: 700, marginBottom: 10, letterSpacing: 0.8 }}>MEMORY HIERARCHY</div>
      <div style={{ position: "relative", marginBottom: 16 }}>
        <svg viewBox="0 0 300 200" style={{ width: "100%", display: "block" }}>
          {TIERS.map((tier, i) => {
            const y = i * 38 + 5;
            const topW = 60 + i * 50;
            const botW = 60 + (i + 1) * 50;
            const cx = 150;
            const isSel = selTier === i;
            return (
              <g key={tier.id} onClick={() => setSelTier(isSel ? -1 : i)} style={{ cursor: "pointer" }}>
                <polygon
                  points={`${cx - topW/2},${y} ${cx + topW/2},${y} ${cx + botW/2},${y + 32} ${cx - botW/2},${y + 32}`}
                  fill={isSel ? `${tier.color}30` : `${tier.color}12`}
                  stroke={tier.color}
                  strokeWidth={isSel ? 2 : 1}
                  opacity={isSel ? 1 : 0.7}
                  style={{ transition: "all 0.3s" }}
                />
                <text x={cx} y={y + 14} textAnchor="middle" fill={tier.color} fontSize="8" fontWeight="700" fontFamily={mono}>{tier.id}: {tier.label}</text>
                <text x={cx} y={y + 24} textAnchor="middle" fill="#9ca3af" fontSize="7" fontFamily={mono}>{tier.bw}</text>
              </g>
            );
          })}
        </svg>
        {/* Detail card */}
        {selTier >= 0 && (
          <div style={{
            background: "#111827", borderRadius: 8, border: `1px solid ${TIERS[selTier].color}40`,
            padding: "10px 12px", marginTop: 4, animation: "fadeIn 0.2s ease",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ color: TIERS[selTier].color, fontSize: 10, fontWeight: 700 }}>{TIERS[selTier].id}: {TIERS[selTier].label}</span>
              <span style={{ color: "#9ca3af", fontSize: 8 }}>{TIERS[selTier].size}</span>
            </div>
            <div style={{ color: "#d1d5db", fontSize: 8, lineHeight: 1.6 }}>{TIERS[selTier].detail}</div>
            <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
              <span style={{ background: `${TIERS[selTier].color}15`, border: `1px solid ${TIERS[selTier].color}30`, color: TIERS[selTier].color, fontSize: 7, padding: "2px 6px", borderRadius: 3 }}>Bandwidth: {TIERS[selTier].bw}</span>
              <span style={{ background: `${TIERS[selTier].color}15`, border: `1px solid ${TIERS[selTier].color}30`, color: TIERS[selTier].color, fontSize: 7, padding: "2px 6px", borderRadius: 3 }}>Capacity: {TIERS[selTier].size}</span>
            </div>
          </div>
        )}
      </div>

      {/* UMA Budget Bar */}
      <div style={{ color: "#60a5fa", fontSize: 9, fontWeight: 700, marginBottom: 8, letterSpacing: 0.8 }}>UMA BUDGET — 16 GB</div>
      <div style={{ background: "#111827", borderRadius: 8, padding: "10px 12px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 16 }}>
        <div style={{ height: 24, borderRadius: 6, overflow: "hidden", display: "flex", marginBottom: 8 }}>
          {UMA_BUDGET.map((seg, i) => (
            <div key={i} style={{ width: `${seg.pct}%`, background: seg.color, transition: "width 0.5s", position: "relative" }}
              title={`${seg.label}: ${seg.size}`}>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {UMA_BUDGET.map((seg, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: 2, background: seg.color }} />
              <span style={{ color: "#9ca3af", fontSize: 7 }}>{seg.label}: {seg.size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tiled Pipeline Animation */}
      <div style={{ color: "#10b981", fontSize: 9, fontWeight: 700, marginBottom: 8, letterSpacing: 0.8 }}>TILED PIPELINE</div>
      <div style={{ background: "#111827", borderRadius: 8, padding: "12px", border: "1px solid rgba(255,255,255,0.05)", marginBottom: 12 }}>
        {[
          { label: "Stage A: DMA Prefetch", color: "#60a5fa" },
          { label: "Stage B: Compute", color: "#10b981" },
          { label: "Stage C: Writeback", color: "#a855f7" },
        ].map((stage, i) => {
          const offset = ((pipePhase + i * 33) % 100);
          return (
            <div key={i} style={{ marginBottom: i < 2 ? 6 : 0 }}>
              <div style={{ fontSize: 7, color: stage.color, marginBottom: 3 }}>{stage.label}</div>
              <div style={{ height: 8, background: "#0d1117", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                <div style={{
                  position: "absolute", left: `${offset - 30}%`, width: "30%", height: "100%",
                  background: `linear-gradient(90deg, transparent, ${stage.color}80, transparent)`,
                  borderRadius: 4, transition: "none",
                }} />
              </div>
            </div>
          );
        })}
        <div style={{ color: "#6b7280", fontSize: 7, marginTop: 8, textAlign: "center" }}>
          Near-100% tensor core utilization via deterministic software pipelining
        </div>
      </div>

      {/* Sparsity Badge */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <span style={{
          background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
          color: "#34d399", fontSize: 8, fontWeight: 600, padding: "4px 10px", borderRadius: 6, fontFamily: mono,
        }}>
          Int7+1 · 2:4 Structured Sparsity · 2× throughput · 50% BW reduction
        </span>
      </div>

      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}
