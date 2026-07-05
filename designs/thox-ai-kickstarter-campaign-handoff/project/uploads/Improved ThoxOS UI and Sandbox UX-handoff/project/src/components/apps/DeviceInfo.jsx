import { useState } from "react";

const mono = "'JetBrains Mono',monospace";

const SPECS = [
  ["SOM", "NVIDIA Jetson Orin NX 16GB"],
  ["CPU", "ARM Cortex-A78AE, 8-core @ 2.84 GHz"],
  ["GPU", "Ampere, 1024 CUDA cores, 32 Tensor cores, 100 TOPS (INT8)"],
  ["Memory", "16GB LPDDR5 @ 6400 MT/s (UMA)"],
  ["Storage", "2TB NVMe Gen4 (7,000 MB/s read)"],
  ["Networking", "2.5GbE + Wi-Fi 6E + BT 5.3"],
  ["Security", "TPM 2.0 + Secure Boot + LUKS2"],
  ["MagStack™", "8× N52 magnets + 12-pin pogo + NFC"],
  ["Enclosure", "CNC 6061-T6 Aluminum, Midnight Black"],
  ["Dimensions", "157.5 × 101.6 × 35.6mm, < 500g"],
  ["Power", "25W typical, 65W max"],
  ["Noise", "< 25 dBA"],
  ["OS", "ThoxOS (hardened Ubuntu 24.04 + JetPack 6.x)"],
];

// Single-device Kickstarter backer tiers — all THOX Nova (Orin NX 16GB).
// MSRP $899; reserve any tier with a refundable $99.99 deposit.
const SKUS = [
  { name: "Super Early Bird", short: "Super EB", limit: "First 1,000", ks: "$629", msrp: "$899", off: "30% off MSRP", color: "#fbbf24", highlight: false },
  { name: "Early Bird", short: "Early Bird", limit: "First 10,000", ks: "$699", msrp: "$899", off: "22% off MSRP", color: "#10b981", highlight: true },
  { name: "Kickstarter Special", short: "KS Special", limit: "Standard tier", ks: "$769", msrp: "$899", off: "14% off MSRP", color: "#60a5fa", highlight: false },
];

// MagStack™ multi-device cluster bundles (face-to-back stack, no cables).
const BUNDLES = [
  { name: "Duo", devices: "2× Nova", price: "$1,379", per: "~$690 / device", color: "#a855f7", popular: false },
  { name: "Quad", devices: "4× Nova", price: "$2,699", per: "~$675 / device", color: "#c084fc", popular: true },
  { name: "Octuple", devices: "8× Nova", price: "$5,299", per: "~$662 / device", color: "#a855f7", popular: false },
];

export default function DeviceInfo() {
  const [selSku, setSelSku] = useState(1);

  return (
    <div style={{ flex: 1, background: "#030806", fontFamily: mono, overflow: "auto", padding: 16 }}>
      {/* Device header */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>THOX</span>
          <span style={{ background: "#10b981", color: "#000", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>Nova</span>
        </div>
        <div style={{ fontSize: 8, color: "#6b7280", marginTop: 2 }}>One-time purchase &middot; No subscriptions &middot; No API fees</div>
        {/* Device illustration */}
        <div style={{ margin: "16px auto", maxWidth: 220 }}>
          <svg viewBox="0 0 220 140" style={{ width: "100%" }}>
            <defs>
              <linearGradient id="devGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1f2937" />
                <stop offset="100%" stopColor="#111827" />
              </linearGradient>
            </defs>
            {/* Device body */}
            <rect x="10" y="10" width="200" height="120" rx="12" fill="url(#devGrad)" stroke="#374151" strokeWidth="1.5" />
            {/* Ventilation lines */}
            {[0,1,2,3,4].map(i => (
              <line key={i} x1="30" y1={30 + i * 8} x2="80" y2={30 + i * 8} stroke="#374151" strokeWidth="1" strokeLinecap="round" />
            ))}
            {/* Center chip */}
            <rect x="90" y="45" width="40" height="40" rx="4" fill="#0d1117" stroke="#10b981" strokeWidth="1" />
            <text x="110" y="68" textAnchor="middle" fill="#10b981" fontSize="8" fontFamily={mono}>ORIN</text>
            <text x="110" y="78" textAnchor="middle" fill="#6b7280" fontSize="6" fontFamily={mono}>NX 16GB</text>
            {/* Connector pins */}
            {[0,1,2,3,4,5].map(i => (
              <rect key={i} x={145} y={38 + i * 12} width="16" height="6" rx="1" fill="#a855f7" opacity="0.4" />
            ))}
            {/* Magnets */}
            {[0,1,2,3].map(i => (
              <circle key={i} cx={180} cy={40 + i * 24} r="5" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.5" />
            ))}
            <text x="180" y="125" textAnchor="middle" fill="#a855f7" fontSize="5" fontFamily={mono}>MagStack™</text>
          </svg>
        </div>
      </div>

      {/* Specs table */}
      <div style={{ background: "#111827", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", marginBottom: 20 }}>
        <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <span style={{ color: "#10b981", fontSize: 10, fontWeight: 700, letterSpacing: 0.8 }}>HARDWARE SPECIFICATIONS</span>
        </div>
        {SPECS.map(([label, value], i) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px", borderBottom: i < SPECS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", gap: 12 }}>
            <span style={{ color: "#6b7280", fontSize: 9, flexShrink: 0 }}>{label}</span>
            <span style={{ color: label === "MagStack™" ? "#a855f7" : "#d1d5db", fontSize: 9, textAlign: "right" }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Backer tiers */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ color: "#9ca3af", fontSize: 9, fontWeight: 700, letterSpacing: 0.8, marginBottom: 4 }}>KICKSTARTER BACKER TIERS</div>
        <div style={{ color: "#6b7280", fontSize: 8, marginBottom: 10 }}>MSRP $899 · Reserve with a refundable $99.99 deposit</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {SKUS.map((sku, i) => (
            <div key={sku.name} onClick={() => setSelSku(i)}
              style={{
                background: sku.highlight ? "rgba(16,185,129,0.08)" : "#111827",
                border: `1px solid ${selSku === i ? sku.color : "rgba(255,255,255,0.1)"}`,
                borderRadius: 12, padding: "14px 10px", textAlign: "center", cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: sku.highlight ? "0 0 20px rgba(16,185,129,0.1)" : "none",
              }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: sku.color, marginBottom: 4 }}>{sku.short}</div>
              <div style={{ fontSize: 7, color: "#6b7280", marginBottom: 8 }}>{sku.limit}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 2 }}>{sku.ks}</div>
              <div style={{ fontSize: 8, color: "#4b5563", textDecoration: "line-through", marginTop: 1 }}>{sku.msrp}</div>
              <div style={{ fontSize: 7, color: sku.color, marginTop: 4, fontWeight: 600 }}>{sku.off}</div>
              {sku.highlight && (
                <div style={{ marginTop: 8, background: "#10b981", color: "#000", fontSize: 7, fontWeight: 700, padding: "2px 6px", borderRadius: 3, display: "inline-block" }}>BEST VALUE</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 7, color: "#6b7280", textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
          Each tier ships: 1× Nova · USB-C 45W charger · quick-start guide
        </div>
      </div>

      {/* MagStack bundles */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ color: "#a855f7", fontSize: 9, fontWeight: 700, letterSpacing: 0.8, marginBottom: 4 }}>MAGSTACK™ BUNDLES</div>
        <div style={{ color: "#6b7280", fontSize: 8, marginBottom: 10 }}>Stack devices face-to-back to combine RAM and run larger models. No cables, no configuration.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
          {BUNDLES.map((b) => (
            <div key={b.name}
              style={{
                background: b.popular ? "rgba(168,85,247,0.08)" : "#111827",
                border: `1px solid ${b.popular ? b.color : "rgba(255,255,255,0.1)"}`,
                borderRadius: 12, padding: "14px 10px", textAlign: "center",
                boxShadow: b.popular ? "0 0 20px rgba(168,85,247,0.1)" : "none",
              }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: b.color, marginBottom: 4 }}>{b.name}</div>
              <div style={{ fontSize: 7, color: "#6b7280", marginBottom: 8 }}>{b.devices}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 2 }}>{b.price}</div>
              <div style={{ fontSize: 7, color: "#6b7280", marginTop: 2 }}>{b.per}</div>
              {b.popular && (
                <div style={{ marginTop: 8, background: "#a855f7", color: "#fff", fontSize: 7, fontWeight: 700, padding: "2px 6px", borderRadius: 3, display: "inline-block" }}>MOST POPULAR</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 7, color: "#6b7280", textAlign: "center", marginTop: 8 }}>
          Need 16+ devices? Contact Sales for enterprise volume pricing.
        </div>
      </div>

      {/* Badge */}
      <div style={{ textAlign: "center", padding: "10px", background: "rgba(16,185,129,0.04)", borderRadius: 8, border: "1px solid rgba(16,185,129,0.12)" }}>
        <span style={{ color: "#10b981", fontSize: 8, fontFamily: mono }}>One-time purchase · No subscriptions · No API fees · Patent-Pending MagStack™</span>
      </div>
    </div>
  );
}
