import { useState, useEffect, useRef } from "react";

const mono = "'JetBrains Mono',monospace";

const BOOT_CHAIN = [
  { label: "UEFI Secure Boot", detail: "ROM-verified first stage", color: "#10b981" },
  { label: "Verified JetPack Kernel", detail: "Signed kernel image", color: "#10b981" },
  { label: "Encrypted rootfs", detail: "LUKS2 / TPM-sealed", color: "#10b981" },
  { label: "systemd init", detail: "Service manager", color: "#10b981" },
  { label: "thox-cluster-agent", detail: "MagStack™ Raft", color: "#a855f7" },
  { label: "ollama", detail: "LLM inference server", color: "#10b981" },
  { label: "thox-api-server", detail: "REST + WebSocket", color: "#10b981" },
  { label: "thox-studio", detail: "User interface", color: "#10b981" },
];

const TRUST_CHECKS = [
  "TPM 2.0 Hardware Root of Trust (Infineon SLB9670)",
  "UEFI Secure Boot Chain",
  "AES-256 Full-Disk Encryption (LUKS2)",
  "Zero Telemetry · Zero Call-Home",
  "Air-Gapped Quantum Data (pogo-link only)",
  "mTLS Cluster Communication",
  "Device X.509 Certificates (TPM-sealed keys)",
];

const FIREWALL = [
  { rule: "iptables -P INPUT DROP", label: "DEFAULT DENY", color: "#ef4444" },
  { rule: "iptables -A INPUT -m state --state EST", label: "ESTABLISHED ✓", color: "#10b981" },
  { rule: "iptables -A INPUT -i lo -j ACCEPT", label: "LOCALHOST ✓", color: "#10b981" },
  { rule: "iptables -A INPUT -i pogo0 -j ACCEPT", label: "MAGSTACK ✓", color: "#a855f7" },
  { rule: "iptables -A INPUT -p tcp --dport 8080", label: "INFERENCE ✓", color: "#10b981" },
  { rule: "iptables -A INPUT -p tcp --dport 3000", label: "STUDIO ✓", color: "#10b981" },
];

const COMPLIANCE = ["HIPAA", "GDPR", "ITAR", "SOC 2"];

export default function SecurityCenter() {
  const [tab, setTab] = useState("boot");
  const [bootStep, setBootStep] = useState(0);
  const [tampered, setTampered] = useState(false);
  const [tamperIdx, setTamperIdx] = useState(-1);
  const [trustVisible, setTrustVisible] = useState(0);
  const bootTimer = useRef(null);

  // Boot chain animation
  useEffect(() => {
    if (tab !== "boot") return;
    setBootStep(0);
    setTampered(false);
    setTamperIdx(-1);
    bootTimer.current = setInterval(() => {
      setBootStep(s => {
        if (s >= BOOT_CHAIN.length) { clearInterval(bootTimer.current); return s; }
        return s + 1;
      });
    }, 600);
    return () => clearInterval(bootTimer.current);
  }, [tab]);

  // Trust score animation
  useEffect(() => {
    if (tab !== "trust") return;
    setTrustVisible(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTrustVisible(i);
      if (i >= TRUST_CHECKS.length) clearInterval(id);
    }, 400);
    return () => clearInterval(id);
  }, [tab]);

  const simulateTamper = () => {
    const idx = Math.floor(Math.random() * BOOT_CHAIN.length);
    setTampered(true);
    setTamperIdx(idx);
    setBootStep(idx + 1);
    clearInterval(bootTimer.current);
  };

  const tabs = [
    { id: "boot", label: "Boot Chain" },
    { id: "trust", label: "Trust Score" },
    { id: "firewall", label: "Firewall" },
  ];

  return (
    <div style={{ flex: 1, background: "#030806", fontFamily: mono, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)", flexShrink: 0 }}>
        {tabs.map(t => (
          <div key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, padding: "8px 0", textAlign: "center", fontSize: 9, cursor: "pointer",
              color: tab === t.id ? "#10b981" : "#6b7280",
              borderBottom: tab === t.id ? "2px solid #10b981" : "2px solid transparent",
              transition: "all 0.2s" }}>
            {t.label}
          </div>
        ))}
      </div>

      <div style={{ flex: 1, overflow: "auto", padding: 14 }}>
        {/* Boot Chain Tab */}
        {tab === "boot" && (
          <div>
            <div style={{ color: "#10b981", fontSize: 9, fontWeight: 700, marginBottom: 12, letterSpacing: 0.8 }}>SECURE BOOT VERIFICATION</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 16 }}>
              {BOOT_CHAIN.map((stage, i) => {
                const reached = i < bootStep;
                const isTamper = tampered && i === tamperIdx;
                const blocked = tampered && i > tamperIdx;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                      background: isTamper ? "rgba(239,68,68,0.15)" : reached ? "rgba(16,185,129,0.1)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${isTamper ? "#ef4444" : reached ? "#10b981" : "rgba(255,255,255,0.08)"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 12, color: isTamper ? "#ef4444" : reached ? "#10b981" : "#374151",
                      transition: "all 0.3s",
                      animation: reached && !isTamper && !blocked ? undefined : undefined,
                    }}>
                      {isTamper ? "✗" : reached ? "✓" : blocked ? "\u2022" : (i + 1)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 9, fontWeight: 600, color: isTamper ? "#ef4444" : reached ? "#d1d5db" : "#4b5563", transition: "color 0.3s" }}>{stage.label}</div>
                      <div style={{ fontSize: 7, color: isTamper ? "#ef4444" : "#6b7280" }}>
                        {isTamper ? "TAMPER DETECTED — BOOT HALTED" : stage.detail}
                      </div>
                    </div>
                    {i < BOOT_CHAIN.length - 1 && !blocked && (
                      <div style={{ position: "absolute", left: 24, top: "100%", width: 1, height: 6, background: reached ? "#10b981" : "#1f2937" }} />
                    )}
                  </div>
                );
              })}
            </div>
            {tampered && (
              <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "10px 12px", marginBottom: 12 }}>
                <div style={{ color: "#ef4444", fontSize: 10, fontWeight: 700, marginBottom: 4 }}>⚠ BOOT HALTED</div>
                <div style={{ color: "#9ca3af", fontSize: 8 }}>Integrity check failed at stage {tamperIdx + 1}: {BOOT_CHAIN[tamperIdx].label}. System will not proceed until verified.</div>
              </div>
            )}
            <button onClick={simulateTamper}
              style={{ width: "100%", padding: "10px", background: tampered ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, color: "#ef4444", fontSize: 9, fontWeight: 600, cursor: "pointer", fontFamily: mono }}>
              {tampered ? "Tamper Simulated — Restart Boot" : "Simulate Tamper"}
            </button>
          </div>
        )}

        {/* Trust Score Tab */}
        {tab === "trust" && (
          <div>
            <div style={{ color: "#10b981", fontSize: 9, fontWeight: 700, marginBottom: 12, letterSpacing: 0.8 }}>ZERO-TRUST SCORECARD</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {TRUST_CHECKS.map((check, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                  background: "#111827", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)",
                  opacity: i < trustVisible ? 1 : 0.2, transform: i < trustVisible ? "translateX(0)" : "translateX(10px)",
                  transition: "all 0.4s ease",
                }}>
                  <span style={{ color: "#10b981", fontSize: 14, flexShrink: 0 }}>{i < trustVisible ? "\u2705" : "\u2b1c"}</span>
                  <span style={{ color: "#d1d5db", fontSize: 9 }}>{check}</span>
                </div>
              ))}
            </div>
            {/* Overall score */}
            <div style={{ textAlign: "center", padding: "16px", background: "rgba(16,185,129,0.06)", borderRadius: 12, border: "1px solid rgba(16,185,129,0.2)", marginBottom: 16 }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#10b981", marginBottom: 4 }}>7/7</div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#10b981" }}>MAXIMUM TRUST</div>
            </div>
            {/* Compliance badges */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {COMPLIANCE.map(c => (
                <span key={c} style={{
                  background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)",
                  color: "#34d399", fontSize: 9, fontWeight: 600, padding: "4px 10px", borderRadius: 6,
                }}>{c}</span>
              ))}
            </div>
          </div>
        )}

        {/* Firewall Tab */}
        {tab === "firewall" && (
          <div>
            <div style={{ color: "#10b981", fontSize: 9, fontWeight: 700, marginBottom: 12, letterSpacing: 0.8 }}>FIREWALL RULES</div>
            <div style={{ background: "#0d1117", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", fontFamily: mono }}>
              <div style={{ padding: "8px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
                <span style={{ color: "#6b7280", fontSize: 8 }}>root@thox-edge-0:~# iptables -L -n --line-numbers</span>
              </div>
              {FIREWALL.map((fw, i) => (
                <div key={i} style={{ padding: "8px 12px", borderBottom: i < FIREWALL.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <code style={{ color: fw.color === "#ef4444" ? "#ef4444" : "#d1d5db", fontSize: 8, flex: 1 }}>{fw.rule}</code>
                  <span style={{ color: fw.color, fontSize: 7, fontWeight: 600, flexShrink: 0, padding: "2px 6px", background: `${fw.color}12`, borderRadius: 3, border: `1px solid ${fw.color}28` }}>
                    [{fw.label}]
                  </span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: "8px 12px", background: "#111827", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)" }}>
              <div style={{ color: "#9ca3af", fontSize: 8, lineHeight: 1.8 }}>
                <span style={{ color: "#ef4444" }}>● DEFAULT DENY</span> — All inbound dropped unless explicitly allowed<br/>
                <span style={{ color: "#10b981" }}>● ACCEPT</span> — Verified service endpoints<br/>
                <span style={{ color: "#a855f7" }}>● MAGSTACK</span> — Trusted pogo-link interface (physical only)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
