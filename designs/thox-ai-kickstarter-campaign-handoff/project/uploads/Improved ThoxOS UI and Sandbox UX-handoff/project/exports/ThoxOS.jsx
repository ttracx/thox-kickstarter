import {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from "react";
import { play, setMuted, isMuted } from "@/lib/sounds";
import AgentApp from "./AgentApp";
import ChatMarkdown from "./ChatMarkdown";
import AttachmentInput from "./AttachmentInput";
import RealtimeChat from "./RealtimeChat";
import MeshCognition from "./apps/MeshCognition";
import DistributedInference from "./apps/DistributedInference";
import MemoryHierarchy from "./apps/MemoryHierarchy";
import SecurityCenter from "./apps/SecurityCenter";
import KVCache from "./apps/KVCache";
import OTAUpdates from "./apps/OTAUpdates";
import DemoMode, { DEMO_STEPS, DEMO_TOTAL_MS } from "./apps/DemoMode";
import DeviceInfo from "./apps/DeviceInfo";

// ╔═══════════════════════════════════════════════════════════════════╗
// ║  THOX OS v6.0 — COMPLETE SYSTEM DEMO                             ║
// ║  The primary function of the Thox.ai device visualized:          ║
// ║                                                                   ║
// ║  1. INFERENCE ENGINE  — Live Claude API · token streaming         ║
// ║     TensorRT-LLM pipeline · VRAM graph · token/s meter           ║
// ║  2. QUANTUM SIMULATOR — cuStateVec/TensorNet live viz             ║
// ║     Circuit builder · Bloch sphere · probability histogram        ║
// ║  3. MAGSTACK CLUSTER  — 4-node topology · Raft heartbeat          ║
// ║     Live tensor distribution · gRPC job dispatch                 ║
// ║  4. EDGE AI PIPELINE  — Camera→Model→Output demo                 ║
// ║     Vision / LLM / Quantum hybrid routing                        ║
// ║  5. SYSTEM DASHBOARD  — GPU SM heatmap · UMA bus · power rail     ║
// ║  Responsive: Mobile / Tablet / Desktop                            ║
// ╚═══════════════════════════════════════════════════════════════════╝

// ── Contexts ──────────────────────────────────────────────────
const Ctx = createContext(null);
const useCtx = () => useContext(Ctx);

// ── Viewport ──────────────────────────────────────────────────
function useVP() {
  const [v, setV] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1280,
    h: typeof window !== "undefined" ? window.innerHeight : 800,
  });
  useEffect(() => {
    const f = () => setV({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", f);
    f();
    return () => window.removeEventListener("resize", f);
  }, []);
  return { ...v, mob: v.w < 768, tab: v.w >= 768 && v.w < 1024, desk: v.w >= 1024 };
}

function useSwipe(L, R, t = 55) {
  const s = useRef(null);
  return {
    onTouchStart: (e) => {
      s.current = e.touches[0].clientX;
    },
    onTouchEnd: (e) => {
      if (!s.current) return;
      const d = e.changedTouches[0].clientX - s.current;
      if (d < -t) L();
      else if (d > t) R();
      s.current = null;
    },
  };
}

// ── Boot lines ─────────────────────────────────────────────────
const BOOT = [
  "ThoxOS v6.0 — kernel 5.15.148-thoxos-rt  [PREEMPT_RT]",
  "NVIDIA Jetson Orin NX 16GB — CUDA 12.3 · 1024 CUDA cores · 32 Tensor cores",
  "cuQuantum SDK 24.03 — cuStateVec · cuTensorNet · cuDensityMat",
  "TensorRT-LLM v0.9 — FP8 quantization engine loaded",
  "Claude claude-sonnet-4-20250514 — model mapped to VRAM [OK]",
  "MagStack™ pogo-connector — 4/4 nodes online · NFC ST25DV64K",
  "Raft consensus — quorum 3/4 · leader node-0 · term 48",
  "TPM 2.0 (Infineon SLB9670) — attestation chain verified ✓",
  "Edge AI pipeline — vision router · LLM router · quantum router",
  "UMA memory bus — 16GB unified · quantum/LLM shared heap",
  "gRPC gateway :50051 · Ollama :11434 · Supabase edge runtime",
  "NullClaw v0.1 — autonomous agent runtime · 678KB · <2ms boot",
  "Lightpanda headless browser — CDP :9222 · MCP tools · 9× less RAM",
  "Ollama — llama3.1:8b-q4_K_M loaded · Q4 KV cache · 15-25 tok/s",
  "Agent Orchestrator :8300 — 4 subagents · MCP · SQLite+vector memory [READY]",
  "Mesh Cognition Protocol — CfC network · Kuramoto sync · 256-byte hidden states",
  "Distributed Inference — PP×TP hybrid · 4-node MagStack cluster · 14B active",
  "Security — TPM 2.0 · LUKS2 · UEFI Secure Boot · 7/7 zero-trust score",
  "ThoxOS Complete System Demo v6 — all systems nominal ⚡",
];

// ── App registry ───────────────────────────────────────────────
const APPS = {
  inference: { id: "inference", label: "AI Inference", short: "AI", icon: "◉", color: "#10b981" },
  quantum: { id: "quantum", label: "Quantum Sim", short: "QSim", icon: "⬡", color: "#34d399" },
  magstack: { id: "magstack", label: "MagStack™", short: "Mag", icon: "⬡", color: "#c084fc" },
  pipeline: { id: "pipeline", label: "Edge Pipeline", short: "Pipe", icon: "▶", color: "#f59e0b" },
  dashboard: { id: "dashboard", label: "GPU Dashboard", short: "GPU", icon: "◈", color: "#3b82f6" },
  terminal: { id: "terminal", label: "Terminal", short: "Term", icon: ">_", color: "#34d399" },
  agents: { id: "agents", label: "Agents", short: "Agent", icon: "⚡", color: "#34d399" },
  settings: { id: "settings", label: "Settings", short: "Cfg", icon: "⚙", color: "#6b7280" },
  // 2026 polish: monochrome geometric glyphs (drop emoji); emerald-led accents.
  // Color stays distinct only where category demands it (warning=amber,
  // info=blue, magstack=purple). Everything else trends emerald/zinc.
  mesh: { id: "mesh", label: "Mesh Cognition", short: "Mesh", icon: "◎", color: "#10b981" },
  distributed: {
    id: "distributed",
    label: "Dist Inference",
    short: "Dist",
    icon: "⌁",
    color: "#fbbf24",
  },
  memory: { id: "memory", label: "Memory Hierarchy", short: "Mem", icon: "▤", color: "#60a5fa" },
  security: {
    id: "security",
    label: "Security Center",
    short: "Sec",
    icon: "◉",
    color: "#10b981",
  },
  kvcache: { id: "kvcache", label: "KV Cache", short: "KV", icon: "▦", color: "#22d3ee" },
  ota: { id: "ota", label: "OTA Updates", short: "OTA", icon: "↻", color: "#10b981" },
  demo: { id: "demo", label: "Demo Mode", short: "Demo", icon: "⏵⏵", color: "#fbbf24" },
  info: { id: "info", label: "Device Info", short: "Info", icon: "ⓘ", color: "#a1a1aa" },
};
const AL = Object.values(APPS);

// ── Data generators ────────────────────────────────────────────
const rnd = (v, lo, hi) => Math.min(hi, Math.max(lo, v + (Math.random() - 0.5) * 8));
const genSys = (p) => ({
  cpu: rnd(p?.cpu ?? 34, 5, 95),
  gpu: rnd(p?.gpu ?? 72, 30, 98),
  mem: rnd(p?.mem ?? 58, 30, 85),
  power: rnd(p?.power ?? 18, 8, 25),
  temp: rnd(p?.temp ?? 52, 40, 78),
  vram: rnd(p?.vram ?? 62, 40, 90),
  toks: Math.floor(rnd(p?.toks ?? 48, 20, 95)),
  net: Math.floor(Math.random() * 800),
});
const genSM = (p) => Array.from({ length: 8 }, (_, i) => rnd(p?.[i] ?? 50 + i * 4, 10, 98));
const genQ = () => {
  const t = Date.now() / 1000;
  return Array.from({ length: 20 }, (_, i) => ({
    p: Math.abs(Math.sin(t * 0.3 + i * 0.8)) * (0.5 + Math.random() * 0.5),
  }));
};

// ── Terminal cmds ──────────────────────────────────────────────
const CMDS = {
  help: () =>
    "ThoxOS v6.0 commands:\n  inference        — show AI inference stats\n  quantum          — quantum backend status\n  magstack         — cluster topology\n  pipeline         — edge AI pipeline status\n  agents           — autonomous agent orchestrator\n  mesh             — mesh cognition protocol\n  security         — zero-trust security status\n  nvidia-smi       — GPU stats\n  models           — THOX Pro model catalog\n  ollama list      — installed models\n  ollama search THOX-ai — available THOX Pro models\n  ps               — running processes\n  thox             — company info\n  uname -a         — kernel info\n  clear",
  inference: () =>
    `AI Inference Engine\n───────────────────\nEngine    : TensorRT-LLM v0.9  FP8\nModel     : claude-sonnet-4-20250514\nContext   : 200,000 tokens\nThroughput: ~48 tok/s  (batch=1)\nVRAM used : 9.8 GB / 16 GB\nPrecision : FP8 quantized\nBackend   : CUDA 12.3  1024 cores`,
  quantum: () =>
    `Quantum Stack\n─────────────\ncuStateVec   [ACTIVE]  ~34q  6.2 GB VRAM\ncuTensorNet  [STANDBY] ~60q  UMA managed\ncuDensityMat [STANDBY] noisy/mixed\nBackend: ADAPTIVE  MagStack accel: 4-node\nLast job: GHZ 16q  fidelity 99.4%`,
  magstack: () =>
    `MagStack™ Cluster — Patent-Pending\n───────────────────────────────────\nInterface : 12-pin pogo + NFC ST25DV64K\nNodes     : 4/4 online\nConsensus : Raft v3.1 · leader node-0 · term 48\nProtocol  : index-bit swap + tensor-net dist\ngRPC      : :50051\nPCT       : deadline 2027-03-04`,
  pipeline: () =>
    `Edge AI Pipeline\n────────────────\n[CAM] → [Vision: llama3.2-vision-11b]\n              ↓\n        [Router: classify intent]\n       ↙    ↓    ↘\n  [LLM]  [QSim] [Embed]\n   ↓        ↓      ↓\n  [Output stream to host]`,
  "nvidia-smi": () =>
    `Jetson Orin NX 16GB  CUDA 12.3  Driver 535.161\nGPU 72%  VRAM 9.8/16GB  Temp 52°C  18W/25W\nSM cores: 8 active  Tensor cores: 32\ncuStateVec(6.2GB)  TensorRT-LLM(3.6GB)`,
  "ollama list": () =>
    `NAME                                SIZE     STATUS\nTHOX-ai/thox-pro-8b:q4_k_m          10GB     active   (recommended · Ministral-3 · vision + 32-lang)\nTHOX-ai/thox-pro-14b:q4_k_m         14GB     standby  (Ministral-3 14B · advanced vision)\nTHOX-ai/thox-pro-24b:q4_k_m         20GB     standby  (Devstral-Small-2 · agentic coding)\nTHOX-ai/thox-pro-30b:q4_k_m         24GB     standby  (Nemotron-3-Nano MoE · thinking mode)\nTHOX-ai/thox-pro-32b:q4_k_m         24GB     standby  (Qwen3-VL · vision + OCR 32 lang)\nnomic-embed-text:latest             274MB    active`,
  "ollama search THOX-ai": () =>
    `THOX-ai/thox-pro-8b   8B   ministral-3:8b      vision + 32-lang  Recommended\nTHOX-ai/thox-pro-14b  14B  ministral-3:14b     advanced vision\nTHOX-ai/thox-pro-24b  24B  devstral-small-2    agentic coding · tool use\nTHOX-ai/thox-pro-30b  30B  nemotron-3-nano     reasoning · thinking mode (3.5B active)\nTHOX-ai/thox-pro-32b  32B  qwen3-vl:32b        vision + OCR (32 lang)`,
  models: () =>
    `THOX Pro Model Catalog — privacy-first, 100% on-device\n──────────────────────────────────────────────────────\n[ HIPAA · GDPR · SOC2 · FERPA · attorney-client privilege ]\n\nthox-pro-8b   RECOMMENDED  10GB  40-60 tok/s  256K ctx   Ministral-3 8B    vision + 32-lang\nthox-pro-14b               14GB  30-45 tok/s  256K ctx   Ministral-3 14B   advanced vision\nthox-pro-24b               20GB  25-35 tok/s  384K ctx   Devstral-Small-2  agentic coding\nthox-pro-30b               24GB  35-50 tok/s  256K ctx   Nemotron-3-Nano   thinking mode (MoE 3.5B active)\nthox-pro-32b               24GB  20-30 tok/s  256K ctx   Qwen3-VL          vision + OCR (32 lang)\n\nQuantization: fp16 / q8_0 / q4_k_m (default) / q4_0\nInstall:      ollama pull THOX-ai/thox-pro-8b\nBenchmarks:   AIME 99.2% (30b) · GPQA 73% (30b)`,
  ps: () =>
    `PID   NAME                  CPU   MEM\n1001  thoxos-kernel          1.2   12MB\n1042  tensorrt-llm          18.4   3.6GB\n1080  custatevec             8.1   6.2GB\n1103  magstack-raft          2.1   0.8MB\n1201  ollama-server          5.3   8.2GB\n1350  edge-pipeline          3.2   180MB\n1420  tpm-attestd            0.1   0.2MB\n1500  nullclaw-daemon        2.8   1.0MB\n1501  nullclaw-orchestrator  0.4   1.0MB\n1502  nullclaw-coder         0.1   1.0MB\n1503  nullclaw-browser       0.2   1.0MB\n1504  nullclaw-research      0.1   1.0MB\n1600  lightpanda-cdp         1.1   32MB`,
  thox: () =>
    `THOX.AI LLC — Cedar Park TX\nCTO: Tommy Xaypanya  CEO/CPO: Craig Ross  CAO: Nellie Ross\nProduct: THOX Nova · MSRP $899 · one-time purchase, no subscriptions, no API fees\nReserve: $99.99 refundable deposit\nKickstarter tiers: Super EB $629 (1k) · EB $699 (10k) · Special $769\nMagStack™ bundles: Duo $1,379 · Quad $2,699 · Octuple $5,299\nEnterprise (16+): Contact Sales\nPatent: MagStack™ US Provisional 2026-03-04 · PCT deadline 2027-03-04`,
  agents: () =>
    `Agent Orchestrator\n──────────────────\nRuntime   : NullClaw 0.1 (Zig, 678KB)\nAgents    : 4 (orchestrator/coder/browser/research)\nBrowser   : Lightpanda CDP :9222 + MCP (10 tools)\nLLM       : llama3.1:8b-q4_K_M via Ollama (15-25 tok/s)\nMemory    : SQLite + vector + FTS5 (hybrid 0.7/0.3)\nBoot      : <2ms/agent · ~1MB RAM/agent\nGateway   : :8300 (HTTP + WebSocket)\nKV Cache  : Q4 quantized · NVMe persistent\nSandbox   : Landlock → Firejail → Bubblewrap (auto)\nPattern   : Swarm-style single-active-agent`,
  mesh: () =>
    `Mesh Cognition Protocol (MMP)\n────────────────────────────\nCfC Network  : 64 neurons · τ 1-5s\nHidden State : 256-byte opaque vectors\nKuramoto r(t): 0.94 · COHERENT\nEmotion Stack: UET/MEC/CRE aligned\nMode         : 4-node mesh · <1ms RTT\nIP           : IP-002 · Priority 9.0`,
  security: () =>
    `Security Stack — Zero Trust\n───────────────────────────\nTPM 2.0      : Infineon SLB9670 [OK]\nBoot Chain   : UEFI → Kernel → rootfs [VERIFIED]\nEncryption   : AES-256 LUKS2 [ACTIVE]\nTelemetry    : ZERO · No call-home\nCluster Auth : mTLS + X.509 [ACTIVE]\nCompliance   : HIPAA GDPR ITAR SOC2\nTrust Score  : 7/7 MAXIMUM`,
  "uname -a": () => "Linux thox-edge-0 5.15.148-thoxos-rt #1 SMP PREEMPT_RT aarch64",
  clear: () => "__clear__",
};

// ── Shared atoms ───────────────────────────────────────────────
const mono = "'JetBrains Mono',monospace";
const Bar = ({ label, value, color, suffix = "%", height = 5 }) => (
  <div style={{ marginBottom: 7 }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
      <span style={{ color: "#6b7280", fontSize: 9 }}>{label}</span>
      <span style={{ color, fontSize: 9, fontWeight: 700 }}>
        {typeof value === "number" ? value.toFixed(1) : value}
        {suffix}
      </span>
    </div>
    <div style={{ height, background: "#18181b", borderRadius: 3, overflow: "hidden" }}>
      <div
        style={{
          height: "100%",
          width: `${Math.min(value, 100)}%`,
          background: color,
          transition: "width 0.7s",
          boxShadow: `0 0 4px ${color}44`,
        }}
      />
    </div>
  </div>
);
const Hd = ({ children, color = "#34d399" }) => (
  <div
    style={{
      color,
      fontSize: 9,
      fontWeight: 700,
      letterSpacing: 0.8,
      marginBottom: 6,
      paddingBottom: 3,
      borderBottom: `1px solid ${color}22`,
    }}
  >
    {children}
  </div>
);
const Tag = ({ children, color, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      padding: "2px 7px",
      background: active ? `${color}20` : `${color}08`,
      border: `1px solid ${active ? color : color + "40"}`,
      borderRadius: 3,
      cursor: onClick ? "pointer" : "default",
      fontSize: 8,
      color: active ? color : color + "80",
      transition: "all 0.12s",
      flexShrink: 0,
    }}
  >
    {children}
  </div>
);

// ══════════════════════════════════════════════════════════════
//  1. AI INFERENCE ENGINE
//  Visualizes: TensorRT-LLM pipeline, token streaming,
//  VRAM allocation, token/s meter, model context window
// ══════════════════════════════════════════════════════════════
const INFERENCE_SYS = `You are the ThoxOS AI assistant running on a THOX Nova Edge AI device (Jetson Orin NX 16GB) in Cedar Park, Texas. You are powered by Claude claude-sonnet-4-20250514 via TensorRT-LLM v0.9 with FP8 quantization.

DEVICE: THOX Nova — one-time purchase, no subscriptions, no API fees
- Hardware: NVIDIA Jetson Orin NX 16GB unified memory
- Quantum: cuStateVec (~34q), cuTensorNet (~60q+), cuDensityMat
- MagStack™: patent-pending magnetic stacking interface — devices snap face-to-back to combine RAM, no cables
- COMPANY: THOX.ai LLC, Cedar Park TX. CTO: Tommy Xaypanya. CEO/CPO: Craig Ross. CAO: Nellie Ross

KICKSTARTER (MSRP $899; reserve with refundable $99.99 deposit):
- Super Early Bird $629 (30% off, first 1,000 backers)
- Early Bird $699 (22% off, first 10,000 backers)
- Kickstarter Special $769 (14% off, standard tier)
Each tier ships 1× Nova, USB-C 45W charger, quick-start guide.

MAGSTACK™ BUNDLES: Duo (2×) $1,379 · Quad (4×) $2,699 (most popular) · Octuple (8×) $5,299. Enterprise (16+): Contact Sales.

THOX PRO MODEL CATALOG (100% on-device · HIPAA/GDPR/SOC2/FERPA/attorney-client preserved · published on Ollama as THOX-ai/thox-pro-*):
- thox-pro-8b (RECOMMENDED): Ministral-3 8B · vision + 32-lang · 10GB · 40-60 tok/s · 256K ctx
- thox-pro-14b: Ministral-3 14B · advanced vision · 14GB · 30-45 tok/s · 256K ctx
- thox-pro-24b: Devstral-Small-2 · agentic coding, tool use, multi-file edit · 20GB · 25-35 tok/s · 384K ctx
- thox-pro-30b: Nemotron-3-Nano (MoE 3.5B active) · thinking mode · 24GB · 35-50 tok/s · AIME 99.2%, GPQA 73%
- thox-pro-32b: Qwen3-VL · vision + OCR (32 lang) · 24GB · 20-30 tok/s · 256K ctx
Quantization: fp16/q8_0/q4_k_m (default)/q4_0. Install: ollama pull THOX-ai/thox-pro-8b.

You are embedded in the ThoxOS AI Inference Sandbox. Be concise, technical, and demonstrate the device capabilities. Under 120 words unless detail is requested.`;

function InferenceApp() {
  const { sys } = useCtx();
  const [msgs, setMsgs] = useState([
    {
      role: "assistant",
      content:
        "ThoxOS Inference Engine online.\n\nModel: Claude claude-sonnet-4-20250514\nEngine: TensorRT-LLM v0.9 · FP8\nVRAM: 9.8 GB / 16 GB\nContext: 200K tokens\n\nAsk me about the device, MagStack™, quantum stack, or run an AI demo.",
    },
  ]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokRate, setTokRate] = useState(48);
  const [totalToks, setTotalToks] = useState(312);
  const [vramHistory, setVramHistory] = useState(() =>
    Array.from({ length: 30 }, (_, i) => 58 + i * 0.4 + Math.random() * 3)
  );
  const [streamText, setStreamText] = useState("");
  const [pipeline, setPipeline] = useState({
    tokenize: false,
    attention: false,
    mlp: false,
    sample: false,
    decode: false,
  });
  const [pendingAttachments, setPendingAttachments] = useState([]);
  const [voiceActive, setVoiceActive] = useState(false);
  const [selectedTool, setSelectedTool] = useState("thinking");
  const [toolPopOpen, setToolPopOpen] = useState(false);
  const bot = useRef(null),
    inpRef = useRef(null);

  useEffect(() => {
    bot.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, streamText]);

  // Live vram/tok simulation
  useEffect(() => {
    const id = setInterval(() => {
      setTokRate((r) => Math.min(95, Math.max(20, r + (Math.random() - 0.5) * 6)));
      setVramHistory((h) => [...h.slice(-29), 58 + (loading ? 8 : 0) + Math.random() * 4]);
    }, 800);
    return () => clearInterval(id);
  }, [loading]);

  const animatePipeline = async () => {
    const steps = ["tokenize", "attention", "mlp", "sample", "decode"];
    for (const s of steps) {
      setPipeline((p) => ({ ...p, [s]: true }));
      play("pipelineStep");
      await new Promise((r) => setTimeout(r, 180));
    }
    await new Promise((r) => setTimeout(r, 400));
    setPipeline({ tokenize: false, attention: false, mlp: false, sample: false, decode: false });
  };

  const send = async () => {
    if ((!inp.trim() && pendingAttachments.length === 0) || loading) return;
    const q = inp.trim();
    const atts = pendingAttachments;
    setInp("");
    setPendingAttachments([]);
    setLoading(true);
    setStreamText("");
    // Local message: text + previews for the chat panel.
    const newMsgs = [...msgs, { role: "user", content: q, previews: atts.map((a) => a.preview) }];
    setMsgs(newMsgs);
    play("send");
    animatePipeline();

    // Wire to the API: each user message becomes either a plain string (no
    // attachments) or a content-block array (text + image blocks).
    const apiMessages = newMsgs.map((m) => {
      if (m.role === "user" && Array.isArray(m._blocks) && m._blocks.length > 0) {
        return { role: "user", content: m._blocks };
      }
      if (m.role === "user" && (m.previews?.length ?? 0) > 0) {
        // Most recent message — assemble blocks now.
        return {
          role: "user",
          content: [{ type: "text", text: m.content || "" }, ...atts.map((a) => a.block)],
        };
      }
      return { role: m.role, content: m.content };
    });

    try {
      const res = await fetch("/api/inference", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: INFERENCE_SYS,
          messages: apiMessages,
        }),
      });
      const data = await res.json().catch(() => ({}));
      const text =
        data.content?.[0]?.text ||
        data.error ||
        `Inference call failed (HTTP ${res.status}). Try again in a moment.`;
      // Simulate token streaming
      let i = 0;
      const interval = setInterval(() => {
        i += Math.floor(Math.random() * 4) + 2;
        if (i >= text.length) {
          i = text.length;
          clearInterval(interval);
          setMsgs((m) => [...m, { role: "assistant", content: text }]);
          setStreamText("");
          setLoading(false);
          setTotalToks((t) => t + Math.floor(text.length / 4));
          play("receive");
        } else setStreamText(text.slice(0, i));
      }, 30);
    } catch (e) {
      setMsgs((m) => [...m, { role: "assistant", content: `⚠ ${e.message}` }]);
      setLoading(false);
      setStreamText("");
      play("error");
    }
  };

  const handleAttachmentPicked = useCallback(({ blocks, previews, errors }) => {
    if (errors.length > 0) {
      // Surface the first error in chat as a system message so the user knows.
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: errors.map((e) => `⚠ ${e}`).join("\n") },
      ]);
    }
    if (blocks.length === 0) return;
    setPendingAttachments((prev) => [
      ...prev,
      ...blocks.map((b, i) => ({ block: b, preview: previews[i] })),
    ]);
    play("send");
  }, []);

  const DEMOS = [
    "Explain MagStack™ clustering",
    "Show THOX Pro models",
    "Run a quantum GHZ demo",
    "Show Kickstarter pricing",
    "MagStack bundle pricing",
    "Show inference benchmarks",
  ];

  const TOOLS = [
    {
      id: "thinking",
      name: "Extended thinking",
      desc: "Step-by-step reasoning · slower",
      icon: "🧠",
    },
    { id: "web", name: "Web search", desc: "Live retrieval · grounded", icon: "🌐" },
    { id: "code", name: "Code interpreter", desc: "Run Python locally", icon: "⚙" },
    { id: "rag", name: "RAG over /mnt", desc: "Local vector store · 14k docs", icon: "📚" },
    { id: "vision", name: "Vision", desc: "Image understanding", icon: "👁" },
  ];

  // Pipeline stage colors
  const PS = {
    tokenize: "#34d399",
    attention: "#a855f7",
    mlp: "#3b82f6",
    sample: "#f59e0b",
    decode: "#10b981",
  };
  const PL = {
    tokenize: "Tokenize",
    attention: "Attention",
    mlp: "MLP/FFN",
    sample: "Sample",
    decode: "Decode",
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#030806",
        fontFamily: mono,
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      {/* Header strip */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 12px",
          borderBottom: "1px solid #0f2a1a",
          background: "rgba(16,185,129,0.04)",
          flexShrink: 0,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 6px #10b981",
            }}
          />
          <span style={{ color: "#34d399", fontSize: 9, fontWeight: 700 }}>
            TENSORRT-LLM v0.9 · FP8
          </span>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {[
            ["claude-sonnet-4-20250514", "#10b981"],
            [`${tokRate.toFixed(0)} tok/s`, "#34d399"],
            [`${sys.vram?.toFixed(0) ?? 62}% VRAM`, "#f59e0b"],
            [`${totalToks.toLocaleString()} tokens`, "#9ca3af"],
          ].map(([l, c]) => (
            <span
              key={l}
              style={{
                fontSize: 8,
                color: c,
                padding: "1px 5px",
                background: `${c}12`,
                borderRadius: 3,
                border: `1px solid ${c}30`,
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* Chat column */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {/* Realtime voice panel — only renders when active */}
          <RealtimeChat
            active={voiceActive}
            color="#10b981"
            onUserTranscript={(text) =>
              setMsgs((m) => [...m, { role: "user", content: text, _voice: true }])
            }
            onAssistantTranscript={(text) =>
              setMsgs((m) => [...m, { role: "assistant", content: text, _voice: true }])
            }
            onError={(err) => {
              setMsgs((m) => [...m, { role: "assistant", content: `⚠ Voice mode error: ${err}` }]);
              setVoiceActive(false);
            }}
          />
          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "10px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
              minHeight: 0,
            }}
            onClick={() => inpRef.current?.focus()}
          >
            {msgs.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                  gap: 6,
                  alignItems: "flex-start",
                }}
              >
                {m.role === "assistant" && (
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "rgba(16,185,129,0.12)",
                      border: "1px solid rgba(16,185,129,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 9,
                      color: "#10b981",
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  >
                    ◉
                  </div>
                )}
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "7px 10px",
                    borderRadius: m.role === "user" ? "8px 8px 2px 8px" : "8px 8px 8px 2px",
                    fontSize: 11,
                    lineHeight: 1.6,
                    background: m.role === "user" ? "rgba(16,185,129,0.08)" : "#071009",
                    border: `1px solid ${m.role === "user" ? "rgba(16,185,129,0.18)" : "#0e1f0f"}`,
                    color: m.role === "user" ? "#34d399" : "#9ca3af",
                    wordBreak: "break-word",
                  }}
                >
                  {m.role === "user" ? (
                    <span style={{ whiteSpace: "pre-wrap" }}>{m.content}</span>
                  ) : (
                    <ChatMarkdown>{m.content}</ChatMarkdown>
                  )}
                  {/* Attachment previews on user messages */}
                  {Array.isArray(m.previews) && m.previews.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        gap: 5,
                        flexWrap: "wrap",
                        marginTop: m.content ? 5 : 0,
                      }}
                    >
                      {m.previews.map((p, pi) =>
                        p.kind === "image" ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            key={pi}
                            src={p.dataUrl}
                            alt={p.name}
                            style={{
                              maxWidth: 140,
                              maxHeight: 140,
                              borderRadius: 4,
                              border: "1px solid #0e1f0f",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <span
                            key={pi}
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 4,
                              padding: "3px 7px",
                              border: "1px solid rgba(16,185,129,0.3)",
                              borderRadius: 4,
                              fontSize: 9,
                              color: "#34d399",
                              background: "rgba(16,185,129,0.06)",
                            }}
                          >
                            📎 {p.name}{" "}
                            <span style={{ color: "#374151", fontSize: 8 }}>
                              ({(p.size / 1024).toFixed(0)} KB)
                            </span>
                          </span>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {/* Streaming token visualization */}
            {loading && streamText && (
              <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    color: "#10b981",
                    flexShrink: 0,
                  }}
                >
                  ◉
                </div>
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "7px 10px",
                    borderRadius: "8px 8px 8px 2px",
                    fontSize: 11,
                    lineHeight: 1.6,
                    background: "#071009",
                    border: "1px solid #0e1f0f",
                    color: "#9ca3af",
                    wordBreak: "break-word",
                  }}
                >
                  <ChatMarkdown>{streamText}</ChatMarkdown>
                  <span style={{ color: "#10b981", animation: "blink 0.6s infinite" }}>▋</span>
                </div>
              </div>
            )}
            {loading && !streamText && (
              <div style={{ display: "flex", gap: 6 }}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.12)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#10b981",
                    fontSize: 9,
                  }}
                >
                  ◉
                </div>
                <div
                  style={{
                    background: "#071009",
                    border: "1px solid #0e1f0f",
                    borderRadius: "8px 8px 8px 2px",
                    padding: "8px 12px",
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: "50%",
                        background: "#10b981",
                        animation: `bounce 1.2s ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bot} />
          </div>

          {/* Tool selector + quick demos */}
          <div
            style={{
              display: "flex",
              gap: 5,
              padding: "6px 12px",
              flexWrap: "wrap",
              flexShrink: 0,
              alignItems: "center",
            }}
          >
            <div className="thox-tool-wrap">
              <button
                type="button"
                className={"thox-tool-btn" + (toolPopOpen ? " on" : "")}
                onClick={() => setToolPopOpen((o) => !o)}
                title="Tool"
              >
                <span style={{ fontSize: 11 }}>
                  {TOOLS.find((t) => t.id === selectedTool)?.icon}
                </span>
                <span>{TOOLS.find((t) => t.id === selectedTool)?.name || "tool"}</span>
                <span style={{ opacity: 0.6, marginLeft: 2 }}>▾</span>
              </button>
              {toolPopOpen && (
                <div className="thox-tool-pop" onMouseLeave={() => setToolPopOpen(false)}>
                  {TOOLS.map((t) => (
                    <button
                      type="button"
                      key={t.id}
                      className={"thox-tool-row" + (selectedTool === t.id ? " on" : "")}
                      onClick={() => {
                        setSelectedTool(t.id);
                        setToolPopOpen(false);
                      }}
                    >
                      <span className="ic">{t.icon}</span>
                      <span>
                        <b>{t.name}</b>
                        <i>{t.desc}</i>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            {DEMOS.map((d) => (
              <div
                key={d}
                onClick={() => {
                  if (!loading) setInp(d);
                }}
                style={{
                  padding: "3px 9px",
                  background: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.30)",
                  borderRadius: 999,
                  cursor: "pointer",
                  fontSize: 10,
                  color: "#6EE7B7",
                  fontFamily: "var(--thox-font-sans)",
                  whiteSpace: "nowrap",
                  transition: "transform 0.15s ease, background 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(16,185,129,0.14)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(16,185,129,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Pending attachments — chip row above the input */}
          {pendingAttachments.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 5,
                padding: "5px 12px 0",
                flexWrap: "wrap",
                flexShrink: 0,
              }}
            >
              {pendingAttachments.map((a, ai) => (
                <div
                  key={ai}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "3px 5px 3px 6px",
                    background: "rgba(16,185,129,0.08)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    borderRadius: 5,
                    fontSize: 9,
                    color: "#34d399",
                  }}
                >
                  {a.preview.kind === "image" ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.preview.dataUrl}
                        alt={a.preview.name}
                        style={{ width: 18, height: 18, borderRadius: 3, objectFit: "cover" }}
                      />
                      <span
                        style={{
                          maxWidth: 120,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {a.preview.name}
                      </span>
                    </>
                  ) : (
                    <span
                      style={{
                        maxWidth: 160,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      📎 {a.preview.name}
                    </span>
                  )}
                  <span
                    onClick={() => setPendingAttachments((prev) => prev.filter((_, i) => i !== ai))}
                    style={{
                      cursor: "pointer",
                      color: "#9ca3af",
                      fontSize: 11,
                      padding: "0 3px",
                      lineHeight: 1,
                    }}
                    title="Remove"
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <div
            style={{
              display: "flex",
              gap: 6,
              padding: "7px 12px",
              borderTop: "1px solid #0f2a1a",
              flexShrink: 0,
              alignItems: "center",
            }}
          >
            <AttachmentInput onPicked={handleAttachmentPicked} disabled={loading} color="#34d399" />
            <button
              type="button"
              onClick={() => setVoiceActive((v) => !v)}
              title={
                voiceActive
                  ? "End voice conversation"
                  : "Start realtime voice conversation (OpenAI gpt-realtime)"
              }
              style={{
                border: "none",
                background: voiceActive ? "rgba(239,68,68,0.18)" : "transparent",
                cursor: "pointer",
                color: voiceActive ? "#ef4444" : "#34d399",
                fontSize: 13,
                padding: 4,
                lineHeight: 1,
                borderRadius: 4,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {voiceActive ? "📵" : "🎙"}
            </button>
            <input
              ref={inpRef}
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Run an inference job..."
              disabled={loading}
              style={{
                flex: 1,
                background: "#071009",
                border: "1px solid #132013",
                borderRadius: 6,
                padding: "7px 10px",
                color: "#fafafa",
                fontSize: 11,
                fontFamily: mono,
                outline: "none",
                minWidth: 0,
              }}
            />
            <button
              onClick={send}
              disabled={loading || (!inp.trim() && pendingAttachments.length === 0)}
              style={{
                padding: "7px 14px",
                background:
                  loading || (!inp.trim() && pendingAttachments.length === 0)
                    ? "#071009"
                    : "#10b981",
                color:
                  loading || (!inp.trim() && pendingAttachments.length === 0) ? "#374151" : "#000",
                borderRadius: 6,
                border: "none",
                cursor: "pointer",
                fontSize: 11,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              ↑
            </button>
          </div>
        </div>

        {/* Right telemetry panel */}
        <div
          style={{
            width: 168,
            borderLeft: "1px solid #0f2a1a",
            padding: "8px 9px",
            background: "#040c06",
            overflowY: "auto",
            flexShrink: 0,
          }}
        >
          <Hd color="#10b981">PIPELINE</Hd>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 10 }}>
            {Object.entries(PL).map(([k, l]) => (
              <div
                key={k}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "4px 6px",
                  background: pipeline[k] ? `${PS[k]}18` : "#080e08",
                  border: `1px solid ${pipeline[k] ? PS[k] : "#0f1a0f"}`,
                  borderRadius: 4,
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: pipeline[k] ? PS[k] : "#1a2a1a",
                    boxShadow: pipeline[k] ? `0 0 6px ${PS[k]}` : "none",
                    transition: "all 0.15s",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: pipeline[k] ? PS[k] : "#2d3a2d", fontSize: 9 }}>{l}</span>
              </div>
            ))}
          </div>

          <Hd color="#10b981">VRAM 30s</Hd>
          <div
            style={{ display: "flex", alignItems: "flex-end", gap: 1, height: 36, marginBottom: 8 }}
          >
            {vramHistory.map((v, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: v > 80 ? "#ef4444" : v > 65 ? "#f59e0b" : "#10b981",
                  height: `${(v / 100) * 100}%`,
                  borderRadius: "1px 1px 0 0",
                  opacity: 0.4 + (i / vramHistory.length) * 0.6,
                }}
              />
            ))}
          </div>

          <Hd color="#10b981">LIVE METRICS</Hd>
          <Bar label="VRAM" value={sys.vram ?? 62} color="#10b981" />
          <Bar label="GPU" value={sys.gpu ?? 72} color="#3b82f6" />
          <Bar label="Power" value={((sys.power ?? 18) / 25) * 100} color="#f59e0b" suffix={`W`} />
          <div
            style={{
              marginTop: 8,
              padding: "6px 7px",
              background: "rgba(16,185,129,0.05)",
              border: "1px solid rgba(16,185,129,0.15)",
              borderRadius: 5,
              fontSize: 8,
              color: "#2d4a3a",
              lineHeight: 1.9,
            }}
          >
            <span style={{ color: "#34d399" }}>tok/s</span> {tokRate.toFixed(0)}
            <br />
            <span style={{ color: "#34d399" }}>ctx</span> 200K
            <br />
            <span style={{ color: "#34d399" }}>quant</span> FP8
            <br />
            <span style={{ color: "#34d399" }}>batch</span> 1
          </div>
        </div>
      </div>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}`}</style>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  2. QUANTUM SIMULATOR
//  Visualizes: Bloch sphere, probability histogram, circuit,
//  backend switching, MagStack acceleration
// ══════════════════════════════════════════════════════════════
function QuantumApp() {
  const [data, setData] = useState(genQ());
  const [running, setRunning] = useState(true);
  const [qubits, setQubits] = useState(8);
  const [backend, setBackend] = useState("cuStateVec");
  const [circType, setCircType] = useState("GHZ");
  const [fidelity, setFidelity] = useState(99.4);
  const [jobLog, setJobLog] = useState([
    "[00] cuStateVec initialized",
    "[01] MagStack™ accel ENABLED",
    "[02] GHZ 8q · fidelity 99.4%",
  ]);
  const [bloch, setBloch] = useState({ theta: 0.5, phi: 0.8 });
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setData(genQ());
      setFidelity((f) => Math.min(99.9, Math.max(97, f + (Math.random() - 0.5) * 0.3)));
      setBloch((b) => ({ theta: b.theta + 0.06, phi: b.phi + 0.04 }));
      if (Math.random() < 0.1)
        setJobLog((l) => [
          ...l.slice(-10),
          `[${String(l.length).padStart(2, "0")}] ${circType} ${qubits}q · fid ${(98 + Math.random() * 1.8).toFixed(2)}%`,
        ]);
    }, 260);
    return () => clearInterval(id);
  }, [running, circType, qubits]);

  // Bloch sphere canvas — emerald wireframe with subtle gradient backdrop
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width,
      H = c.height,
      cx = W / 2,
      cy = H / 2,
      r = Math.min(W, H) / 2 - 6;
    ctx.clearRect(0, 0, W, H);
    // Soft radial backdrop
    const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.1);
    grd.addColorStop(0, "rgba(16,185,129,0.10)");
    grd.addColorStop(1, "rgba(16,185,129,0)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.1, 0, Math.PI * 2);
    ctx.fill();
    // Sphere outline
    ctx.strokeStyle = "rgba(16,185,129,0.40)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    // Equator + meridian ellipses
    ctx.strokeStyle = "rgba(16,185,129,0.25)";
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * 0.3, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 0.3, r, 0, 0, Math.PI * 2);
    ctx.stroke();
    // Axes
    ctx.strokeStyle = "rgba(255,255,255,0.10)";
    [
      [0, -r, 0, r],
      [-r, 0, r, 0],
    ].forEach(([x1, y1, x2, y2]) => {
      ctx.beginPath();
      ctx.moveTo(cx + x1, cy + y1);
      ctx.lineTo(cx + x2, cy + y2);
      ctx.stroke();
    });
    // State vector
    const sx = Math.sin(bloch.theta) * Math.cos(bloch.phi) * r;
    const sy = -Math.cos(bloch.theta) * r;
    ctx.strokeStyle = "#34D399";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + sx, cy + sy);
    ctx.stroke();
    // State point + glow
    ctx.fillStyle = "rgba(52,211,153,0.30)";
    ctx.beginPath();
    ctx.arc(cx + sx, cy + sy, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#6EE7B7";
    ctx.beginPath();
    ctx.arc(cx + sx, cy + sy, 4, 0, Math.PI * 2);
    ctx.fill();
    // Labels
    ctx.fillStyle = "rgba(161,161,170,0.85)";
    ctx.font = "9px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("|0⟩", cx, cy - r - 4);
    ctx.fillText("|1⟩", cx, cy + r + 12);
  }, [bloch]);

  const maxP = Math.max(...data.slice(0, qubits).map((d) => d.p), 0.01);
  const GATES = {
    GHZ: ["H", "CX", "CX", "M"],
    QFT: ["H", "R", "R", "M"],
    QAOA: ["Rz", "CX", "Rx", "M"],
    VQE: ["Ry", "CX", "Ry", "M"],
  };
  // Backends differentiated by hue; primary stays emerald per design tokens.
  const BE_COLORS = { cuStateVec: "#10b981", cuTensorNet: "#3b82f6", cuDensityMat: "#f59e0b" };
  const BAR_GRADIENT_FROM = {
    cuStateVec: "#059669",
    cuTensorNet: "#1d4ed8",
    cuDensityMat: "#b45309",
  };
  const BAR_GRADIENT_TO = {
    cuStateVec: "#6EE7B7",
    cuTensorNet: "#60A5FA",
    cuDensityMat: "#FBBF24",
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        fontFamily: "var(--thox-font-sans)",
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      {/* Controls */}
      <div
        style={{
          display: "flex",
          gap: 6,
          padding: "8px 12px",
          borderBottom: "1px solid var(--border)",
          alignItems: "center",
          flexWrap: "wrap",
          background: "var(--surface)",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: "var(--accent-h)",
            fontWeight: 600,
            fontSize: 11,
            fontFamily: "var(--thox-font-mono)",
            letterSpacing: "0.08em",
          }}
        >
          ⬡ QSIM
        </span>
        {["cuStateVec", "cuTensorNet", "cuDensityMat"].map((b) => (
          <Tag key={b} color={BE_COLORS[b]} active={backend === b} onClick={() => setBackend(b)}>
            {b}
          </Tag>
        ))}
        <select
          value={circType}
          onChange={(e) => setCircType(e.target.value)}
          style={{
            background: "var(--surface-2)",
            color: "var(--accent-h)",
            border: "1px solid var(--border)",
            borderRadius: 4,
            padding: "2px 6px",
            fontSize: 10,
            fontFamily: "var(--thox-font-mono)",
          }}
        >
          {["GHZ", "QFT", "QAOA", "VQE"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <label
          style={{
            color: "var(--fg-2)",
            fontSize: 10,
            display: "flex",
            gap: 4,
            alignItems: "center",
            whiteSpace: "nowrap",
            fontFamily: "var(--thox-font-mono)",
          }}
        >
          Q:
          <input
            type="range"
            min={2}
            max={16}
            value={qubits}
            onChange={(e) => setQubits(+e.target.value)}
            style={{ accentColor: "var(--accent)", width: 56 }}
          />
          {qubits}
        </label>
        <span
          style={{
            color: "var(--accent-h)",
            fontSize: 10,
            marginLeft: "auto",
            fontFamily: "var(--thox-font-mono)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          fid: {fidelity.toFixed(2)}%
        </span>
        <Tag color={BE_COLORS[backend]} active={running} onClick={() => setRunning((v) => !v)}>
          {running ? "⏸" : "▶"}
        </Tag>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* Histogram + circuit */}
        <div style={{ flex: 1, padding: "12px 14px", overflowY: "auto", minWidth: 0 }}>
          <Hd color="var(--fg-3)">MEASUREMENT PROBABILITIES · {backend}</Hd>
          {data.slice(0, qubits).map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span
                style={{
                  color: "var(--fg-3)",
                  fontSize: 9,
                  width: 28,
                  textAlign: "right",
                  flexShrink: 0,
                  fontFamily: "var(--thox-font-mono)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {i.toString(2).padStart(3, "0")}
              </span>
              <div
                style={{
                  flex: 1,
                  height: 10,
                  background: "var(--surface-2)",
                  borderRadius: 6,
                  overflow: "hidden",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(d.p / maxP) * 100}%`,
                    background: `linear-gradient(90deg, ${BAR_GRADIENT_FROM[backend]}, ${BAR_GRADIENT_TO[backend]})`,
                    transition: running ? "width 0.22s" : "none",
                    boxShadow: `0 0 8px ${BE_COLORS[backend]}55`,
                  }}
                />
              </div>
              <span
                style={{
                  color: "var(--fg-2)",
                  fontSize: 10,
                  width: 42,
                  textAlign: "right",
                  flexShrink: 0,
                  fontFamily: "var(--thox-font-mono)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {(d.p * 100).toFixed(1)}%
              </span>
            </div>
          ))}
          <div style={{ marginTop: 14 }}>
            <Hd color="var(--fg-3)">
              CIRCUIT — {circType} {qubits}Q
            </Hd>
            <div style={{ display: "flex", gap: 4, overflowX: "auto", padding: "4px 2px" }}>
              {Array.from({ length: Math.min(qubits, 12) }, (_, qi) => (
                <div
                  key={qi}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    alignItems: "center",
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      color: "var(--fg-3)",
                      fontSize: 9,
                      fontFamily: "var(--thox-font-mono)",
                    }}
                  >
                    q{qi}
                  </span>
                  {(GATES[circType] || GATES.GHZ).map((g, gi) => (
                    <div
                      key={gi}
                      style={{
                        width: 26,
                        height: 20,
                        background: g === "M" ? "var(--surface-2)" : "rgba(16,185,129,0.10)",
                        border: `1px solid ${g === "M" ? "var(--border)" : "rgba(16,185,129,0.40)"}`,
                        borderRadius: 6,
                        display: "grid",
                        placeItems: "center",
                        fontSize: 9,
                        fontFamily: "var(--thox-font-mono)",
                        color: g === "M" ? "var(--warn)" : BE_COLORS[backend],
                        transition: "background 0.15s",
                      }}
                    >
                      {g}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bloch sphere + log */}
        <div
          style={{
            width: 168,
            borderLeft: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            background: "var(--surface)",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: "10px 12px" }}>
            <Hd color="var(--fg-3)">BLOCH SPHERE</Hd>
            <canvas
              ref={canvasRef}
              width={144}
              height={120}
              style={{ display: "block", width: "100%", height: "auto" }}
            />
            <div
              style={{
                marginTop: 6,
                fontSize: 10,
                color: "var(--fg-3)",
                lineHeight: 1.8,
                fontFamily: "var(--thox-font-mono)",
              }}
            >
              θ: <span style={{ color: "var(--accent-h)" }}>{bloch.theta.toFixed(2)}</span>
              <br />
              φ: <span style={{ color: "var(--accent-h)" }}>{bloch.phi.toFixed(2)}</span>
            </div>
          </div>
          <div style={{ flex: 1, padding: "0 12px 8px", overflowY: "auto" }}>
            <Hd color="var(--fg-3)">JOB LOG</Hd>
            {jobLog.map((l, i) => {
              const isLatest = i === jobLog.length - 1;
              return (
                <div
                  key={i}
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--thox-font-mono)",
                    color: isLatest ? "var(--fg)" : "var(--fg-3)",
                    marginBottom: 3,
                    lineHeight: 1.5,
                    wordBreak: "break-word",
                    display: "flex",
                    gap: 6,
                  }}
                >
                  <span style={{ color: "var(--accent-h)", flexShrink: 0 }}>✔</span>
                  <span>{l}</span>
                </div>
              );
            })}
          </div>
          <div
            style={{
              padding: "8px 12px",
              borderTop: "1px solid var(--border)",
              fontSize: 10,
              color: "var(--fg-3)",
              lineHeight: 1.8,
              fontFamily: "var(--thox-font-mono)",
            }}
          >
            MagStack™
            <br />
            <span style={{ color: "var(--accent-h)" }}>ACCEL ON</span> · 4 nodes
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  3. MAGSTACK™ CLUSTER
//  Visualizes: 4-node topology, live Raft heartbeat,
//  tensor distribution, pogo-connector interface
// ══════════════════════════════════════════════════════════════
function MagStackApp() {
  const [nodes, setNodes] = useState([
    { id: 0, role: "LEADER", status: "ACTIVE", temp: 52, qubits: 16, load: 72, term: 48 },
    { id: 1, role: "FOLLOWER", status: "ACTIVE", temp: 47, qubits: 12, load: 65, term: 48 },
    { id: 2, role: "FOLLOWER", status: "ACTIVE", temp: 49, qubits: 14, load: 58, term: 48 },
    { id: 3, role: "FOLLOWER", status: "SYNC", temp: 44, qubits: 8, load: 22, term: 47 },
  ]);
  const [pulse, setPulse] = useState(false);
  const [hbTime, setHbTime] = useState(0);
  const [raftLog, setRaftLog] = useState([
    "[init] Raft v3.1 consensus established",
    "[sync] node-3 catching up term 47→48",
    "[beat] Heartbeat 200ms · all followers ACK",
  ]);
  const [jobs, setJobs] = useState([
    { id: "J001", type: "GHZ-16q", node: 0, status: "done", ms: 142 },
    { id: "J002", type: "QFT-8q", node: 1, status: "done", ms: 89 },
    { id: "J003", type: "VQE-12q", node: 2, status: "running", ms: 0 },
  ]);
  const [activeEdge, setActiveEdge] = useState(null);

  useEffect(() => {
    const hb = setInterval(() => {
      setPulse((v) => !v);
      setHbTime(Date.now());
    }, 1200);
    return () => clearInterval(hb);
  }, []);

  useEffect(() => {
    const MSGS = [
      "[beat] Heartbeat ACK × 3",
      "[sync] Tensor dist node-1 OK",
      "[grpc] Job J00" + Math.floor(Math.random() * 9) + " dispatched",
      "[nfc] ST25DV64K tag read OK",
      "[raft] AppendEntries ACK × 3",
      "[pogo] 12-pin stable",
      "[qbit] Index-bit swap complete",
      "[dist] Tensor partition merged",
    ];
    const id = setInterval(() => {
      setRaftLog((l) => [...l.slice(-12), MSGS[Math.floor(Math.random() * MSGS.length)]]);
      setNodes((ns) =>
        ns.map((n) => ({
          ...n,
          temp: Math.min(70, Math.max(38, n.temp + (Math.random() - 0.5) * 2)),
          load:
            n.status === "ACTIVE"
              ? Math.min(95, Math.max(20, n.load + (Math.random() - 0.5) * 8))
              : Math.min(30, Math.max(5, n.load + (Math.random() - 0.5) * 3)),
        }))
      );
      setActiveEdge(Math.floor(Math.random() * 4));
      setTimeout(() => setActiveEdge(null), 400);
      if (Math.random() < 0.2)
        setJobs((js) => {
          const types = ["GHZ-16q", "QFT-12q", "VQE-8q", "QAOA-14q"];
          const newJob = {
            id: "J" + String(js.length + 1).padStart(3, "0"),
            type: types[Math.floor(Math.random() * types.length)],
            node: Math.floor(Math.random() * 4),
            status: "dispatched",
            ms: 0,
          };
          return [...js.slice(-6), newJob];
        });
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const NODE_ANGLES = [-90, 0, 90, 180];
  const R = 70,
    CX = 90,
    CY = 90;

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#05020e",
        fontFamily: mono,
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      <div
        style={{
          padding: "6px 12px",
          borderBottom: "1px solid #1a0b30",
          color: "#c084fc",
          fontWeight: 700,
          fontSize: 10,
          background: "rgba(168,85,247,0.05)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        ⬡ MAGSTACK™ CLUSTER CONTROL
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: pulse ? "#10b981" : "#1a2a1a",
              transition: "background 0.3s",
              boxShadow: pulse ? "0 0 6px #10b981" : "none",
            }}
          />
          <span style={{ color: "#2d4a2d", fontSize: 8 }}>HEARTBEAT 200ms</span>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* Left: topology + table */}
        <div
          style={{ flex: 1, padding: "10px", overflowY: "auto", borderRight: "1px solid #1a0030" }}
        >
          {/* Topology */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <svg width={180} height={180} style={{ overflow: "visible" }}>
              {/* Edges */}
              {nodes.map((n, i) => {
                const ang = (NODE_ANGLES[i] * Math.PI) / 180;
                const nx = CX + R * Math.cos(ang),
                  ny = CY + R * Math.sin(ang);
                const isActive = activeEdge === i;
                return (
                  <line
                    key={i}
                    x1={CX}
                    y1={CY}
                    x2={nx}
                    y2={ny}
                    stroke={isActive ? "#a855f7" : "#2d1b4e"}
                    strokeWidth={isActive ? 2 : 1}
                    style={{ transition: "stroke 0.2s, stroke-width 0.2s" }}
                  />
                );
              })}
              {/* Leader */}
              <circle
                cx={CX}
                cy={CY}
                r={26}
                fill="#1a0a2e"
                stroke="#a855f7"
                strokeWidth={2}
                style={{
                  filter: pulse ? "drop-shadow(0 0 8px #a855f7)" : "none",
                  transition: "filter 0.6s",
                }}
              />
              <text
                x={CX}
                y={CY - 4}
                textAnchor="middle"
                fill="#c084fc"
                fontSize={8}
                fontFamily={mono}
              >
                Raft
              </text>
              <text
                x={CX}
                y={CY + 7}
                textAnchor="middle"
                fill="#c084fc"
                fontSize={8}
                fontFamily={mono}
              >
                Leader
              </text>
              <text
                x={CX}
                y={CY + 18}
                textAnchor="middle"
                fill="#f59e0b"
                fontSize={7}
                fontFamily={mono}
              >
                t:{nodes[0].term}
              </text>
              {/* Nodes */}
              {nodes.map((n, i) => {
                const ang = (NODE_ANGLES[i] * Math.PI) / 180;
                const nx = CX + R * Math.cos(ang),
                  ny = CY + R * Math.sin(ang);
                const c = n.status === "ACTIVE" ? "#a855f7" : "#4a2070";
                const lc = n.load > 70 ? "#ef4444" : n.load > 45 ? "#f59e0b" : "#10b981";
                return (
                  <g key={i}>
                    <rect
                      x={nx - 22}
                      y={ny - 22}
                      width={44}
                      height={44}
                      rx={6}
                      fill="#1a0a2e"
                      stroke={c}
                      strokeWidth={1}
                      style={{ filter: activeEdge === i ? `drop-shadow(0 0 4px ${c})` : "none" }}
                    />
                    <text
                      x={nx}
                      y={ny - 8}
                      textAnchor="middle"
                      fill="#c084fc"
                      fontSize={8}
                      fontFamily={mono}
                      fontWeight="bold"
                    >
                      N{n.id}
                    </text>
                    <text
                      x={nx}
                      y={ny + 3}
                      textAnchor="middle"
                      fill={n.status === "ACTIVE" ? "#10b981" : "#f59e0b"}
                      fontSize={7}
                      fontFamily={mono}
                    >
                      {n.status}
                    </text>
                    <text
                      x={nx}
                      y={ny + 13}
                      textAnchor="middle"
                      fill="#4a2070"
                      fontSize={7}
                      fontFamily={mono}
                    >
                      {n.qubits}q
                    </text>
                    {/* Mini load bar */}
                    <rect x={nx - 16} y={ny + 16} width={32} height={3} rx={1} fill="#0d0520" />
                    <rect
                      x={nx - 16}
                      y={ny + 16}
                      width={(n.load / 100) * 32}
                      height={3}
                      rx={1}
                      fill={lc}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Node table */}
          <table style={{ width: "100%", fontSize: 9, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#1a0a2e" }}>
                {["NODE", "ROLE", "STATUS", "LOAD", "TEMP"].map((h) => (
                  <th key={h} style={{ padding: "3px 5px", color: "#6b21a8", textAlign: "left" }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {nodes.map((n) => (
                <tr key={n.id} style={{ borderTop: "1px solid #1a0030" }}>
                  <td style={{ padding: "3px 5px", color: "#c084fc" }}>edge-{n.id}</td>
                  <td
                    style={{
                      padding: "3px 5px",
                      color: n.role === "LEADER" ? "#a855f7" : "#6b21a8",
                    }}
                  >
                    {n.role.slice(0, 4)}
                  </td>
                  <td
                    style={{
                      padding: "3px 5px",
                      color: n.status === "ACTIVE" ? "#10b981" : "#f59e0b",
                    }}
                  >
                    {n.status}
                  </td>
                  <td style={{ padding: "3px 5px" }}>
                    <div
                      style={{
                        width: 40,
                        height: 4,
                        background: "#0d0520",
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${n.load}%`,
                          background: n.load > 70 ? "#ef4444" : n.load > 45 ? "#f59e0b" : "#10b981",
                          transition: "width 0.5s",
                        }}
                      />
                    </div>
                  </td>
                  <td style={{ padding: "3px 5px", color: n.temp > 65 ? "#ef4444" : "#10b981" }}>
                    {n.temp.toFixed(0)}°
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Spec card */}
          <div
            style={{
              marginTop: 8,
              padding: "6px 8px",
              background: "rgba(168,85,247,0.05)",
              border: "1px solid #2d1b4e",
              borderRadius: 5,
              fontSize: 8,
              color: "#3b1a6e",
              lineHeight: 1.9,
            }}
          >
            <span style={{ color: "#a855f7", fontWeight: 700 }}>PATENT PENDING</span> · US
            Provisional 2026-03-04
            <br />
            12-pin pogo · NFC ST25DV64K · index-bit swap
            <br />
            gRPC :50051 · PCT: <span style={{ color: "#f59e0b" }}>2027-03-04</span>
          </div>
        </div>

        {/* Right: Raft log + job queue */}
        <div
          style={{
            width: 155,
            background: "#030110",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          <div style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
            <Hd color="#6b21a8">RAFT LOG</Hd>
            {raftLog.map((l, i) => (
              <div
                key={i}
                style={{
                  fontSize: 7,
                  color: i === raftLog.length - 1 ? "#c084fc" : "#2d1560",
                  marginBottom: 3,
                  lineHeight: 1.5,
                  wordBreak: "break-word",
                }}
              >
                {l}
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid #1a0030",
              padding: "8px 8px",
              maxHeight: 140,
              overflowY: "auto",
            }}
          >
            <Hd color="#6b21a8">JOB QUEUE</Hd>
            {jobs.slice(-5).map((j) => (
              <div
                key={j.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  marginBottom: 4,
                  fontSize: 7,
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background:
                      j.status === "running"
                        ? "#f59e0b"
                        : j.status === "done"
                          ? "#10b981"
                          : "#a855f7",
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: "#c084fc" }}>{j.id}</span>
                <span
                  style={{
                    color: "#4a2070",
                    flex: 1,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {j.type}
                </span>
                <span style={{ color: "#2d1560" }}>N{j.node}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  4. EDGE AI PIPELINE
//  Visualizes: Camera→Vision→Router→LLM/Quantum/Embed
//  Live token output, model selection, task routing
// ══════════════════════════════════════════════════════════════
const PIPELINE_DEMOS = [
  {
    name: "Object Detection",
    input: "📷 Camera frame — identify objects",
    route: "vision",
    model: "llama3.2-vision-11b",
    latency: 84,
  },
  {
    name: "LLM Completion",
    input: "💬 User query — natural language",
    route: "llm",
    model: "claude-sonnet-4-20250514",
    latency: 52,
  },
  {
    name: "Quantum Optimize",
    input: "🔬 Optimization problem — 16 variables",
    route: "quantum",
    model: "cuStateVec-16q",
    latency: 142,
  },
  {
    name: "Semantic Search",
    input: "🔍 Document search — 10K corpus",
    route: "embed",
    model: "nomic-embed-text",
    latency: 12,
  },
  {
    name: "Hybrid Inference",
    input: "⚡ Complex query — multi-modal",
    route: "hybrid",
    model: "vision+llm+qsim",
    latency: 210,
  },
];

function PipelineApp() {
  const [activeDemo, setActiveDemo] = useState(null);
  const [running, setRunning] = useState(false);
  const [stage, setStage] = useState(0);
  const [output, setOutput] = useState("");
  const [latency, setLatency] = useState(0);
  const [history, setHistory] = useState([]);
  const [autoRun, setAutoRun] = useState(false);
  const autoRef = useRef(null);

  const ROUTE_COLORS = {
    vision: "#3b82f6",
    llm: "#10b981",
    quantum: "#a855f7",
    embed: "#f59e0b",
    hybrid: "#ef4444",
  };
  const STAGES = ["INPUT", "PREPROCESS", "ROUTE", "INFER", "POST", "OUTPUT"];

  const runDemo = async (demo) => {
    if (running) return;
    setActiveDemo(demo);
    setRunning(true);
    setOutput("");
    setStage(0);
    const t0 = Date.now();
    for (let i = 0; i < STAGES.length; i++) {
      setStage(i);
      play("pipelineStep");
      await new Promise((r) => setTimeout(r, 100 + Math.random() * 120));
    }
    const OUTPUTS = {
      vision:
        "Detected: laptop(0.97), keyboard(0.94), monitor(0.89), coffee cup(0.76)\nScene: office workspace · Confidence: 94.2%",
      llm: "Thox.ai Edge AI device leverages MagStack™ patent-pending clustering to distribute quantum circuits across 4 Jetson Orin NX nodes, enabling ~60+ qubit simulation at the edge.",
      quantum:
        "QAOA optimization: 16-variable portfolio\nOptimal allocation found in 3 iterations\nFidelity: 99.1% · Circuit depth: 24\nSpeedup vs classical: 12.4×",
      embed:
        "Query embedded → 768-dim vector\nTop-3 results: [0.94, 0.91, 0.88]\nSearch latency: 11ms · Corpus: 10K docs",
      hybrid:
        "Vision: scene classified as lab environment (0.96)\nLLM: generated 3-step procedure\nQuantum: optimized resource allocation\nTotal pipeline: 208ms end-to-end",
    };
    const elapsed = Date.now() - t0;
    setOutput(OUTPUTS[demo.route] || "Processing complete.");
    setLatency(elapsed);
    setHistory((h) => [
      ...h.slice(-8),
      { ...demo, latency: elapsed, ts: new Date().toLocaleTimeString() },
    ]);
    setRunning(false);
  };

  useEffect(() => {
    if (!autoRun) {
      if (autoRef.current) clearInterval(autoRef.current);
      return;
    }
    let idx = 0;
    autoRef.current = setInterval(() => {
      runDemo(PIPELINE_DEMOS[idx % PIPELINE_DEMOS.length]);
      idx++;
    }, 3000);
    return () => clearInterval(autoRef.current);
  }, [autoRun]);

  const RC = activeDemo ? ROUTE_COLORS[activeDemo.route] : "#34d399";

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#060a04",
        fontFamily: mono,
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      <div
        style={{
          padding: "6px 12px",
          borderBottom: "1px solid #1a2a10",
          color: "#f59e0b",
          fontWeight: 700,
          fontSize: 10,
          background: "rgba(245,158,11,0.04)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        ▶ EDGE AI PIPELINE — THOX.AI INFERENCE ROUTER
        <Tag color="#f59e0b" active={autoRun} onClick={() => setAutoRun((v) => !v)}>
          AUTO
        </Tag>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>
        {/* Left: demo selector + pipeline viz */}
        <div
          style={{ flex: 1, padding: "10px", overflowY: "auto", borderRight: "1px solid #1a2a10" }}
        >
          <Hd color="#a07020">SELECT DEMO JOB</Hd>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
            {PIPELINE_DEMOS.map((d) => (
              <div
                key={d.name}
                onClick={() => {
                  if (!running) runDemo(d);
                }}
                style={{
                  padding: "7px 10px",
                  background:
                    activeDemo?.name === d.name ? `${ROUTE_COLORS[d.route]}18` : "#08100a",
                  border: `1px solid ${activeDemo?.name === d.name ? ROUTE_COLORS[d.route] : "#1a2a10"}`,
                  borderRadius: 6,
                  cursor: running ? "default" : "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (!running) e.currentTarget.style.background = `${ROUTE_COLORS[d.route]}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    activeDemo?.name === d.name ? `${ROUTE_COLORS[d.route]}18` : "#08100a";
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span style={{ color: ROUTE_COLORS[d.route], fontSize: 10, fontWeight: 600 }}>
                    {d.name}
                  </span>
                  <span style={{ color: "#2d4a2d", fontSize: 8 }}>{d.latency}ms est.</span>
                </div>
                <div style={{ color: "#4b5563", fontSize: 9, marginTop: 2 }}>{d.input}</div>
                <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
                  <Tag color={ROUTE_COLORS[d.route]}>{d.route.toUpperCase()}</Tag>
                  <span style={{ color: "#2d4a2d", fontSize: 8, alignSelf: "center" }}>
                    {d.model}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Pipeline stages */}
          {activeDemo && (
            <div>
              <Hd color="#a07020">PIPELINE EXECUTION</Hd>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  overflowX: "auto",
                  marginBottom: 8,
                }}
              >
                {STAGES.map((s, i) => (
                  <div key={s} style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <div
                      style={{
                        padding: "4px 8px",
                        background: i < stage ? `${RC}20` : i === stage ? `${RC}35` : "#080e08",
                        border: `1px solid ${i <= stage ? RC : "#1a2a10"}`,
                        borderRadius: 4,
                        fontSize: 8,
                        color: i <= stage ? RC : "#2d4a2d",
                        whiteSpace: "nowrap",
                        transition: "all 0.2s",
                        boxShadow: i === stage && running ? `0 0 8px ${RC}44` : "none",
                      }}
                    >
                      {i < stage ? "✓ " : i === stage && running ? "⟳ " : ""}
                      {s}
                    </div>
                    {i < STAGES.length - 1 && (
                      <div
                        style={{ width: 8, height: 1, background: i < stage ? RC : "#1a2a10" }}
                      />
                    )}
                  </div>
                ))}
              </div>
              {output && (
                <div
                  style={{
                    padding: "8px 10px",
                    background: "#050e07",
                    border: `1px solid ${RC}30`,
                    borderRadius: 6,
                    fontSize: 9,
                    color: "#9ca3af",
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <div style={{ color: RC, fontWeight: 700, marginBottom: 4 }}>
                    OUTPUT — {activeDemo.name} · {latency}ms
                  </div>
                  {output}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: history + routing diagram */}
        <div
          style={{
            width: 155,
            background: "#050a04",
            padding: "8px",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          <Hd color="#a07020">ROUTING DIAGRAM</Hd>
          <div style={{ marginBottom: 10, fontSize: 8, lineHeight: 2, color: "#2d4a2d" }}>
            {[
              ["INPUT", "#9ca3af"],
              ["↓ PreProcess", "#4b5563"],
              ["↓ ROUTER", "#f59e0b"],
              ["├ Vision →", "#3b82f6"],
              ["├ LLM →", "#10b981"],
              ["├ QSim →", "#a855f7"],
              ["└ Embed →", "#f59e0b"],
            ].map(([l, c]) => (
              <div
                key={l}
                style={{
                  color: activeDemo && l.includes(activeDemo.route.slice(0, 3)) ? c : "#2d4a2d",
                  transition: "color 0.3s",
                }}
              >
                {l}
              </div>
            ))}
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            <Hd color="#a07020">RUN HISTORY</Hd>
            {history.length === 0 && (
              <div style={{ color: "#2d4a2d", fontSize: 8 }}>No runs yet</div>
            )}
            {history.map((h, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 5,
                  padding: "4px 5px",
                  background: "#060c06",
                  border: `1px solid ${ROUTE_COLORS[h.route]}22`,
                  borderRadius: 4,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: ROUTE_COLORS[h.route], fontSize: 8 }}>{h.name}</span>
                  <span style={{ color: "#2d4a2d", fontSize: 7 }}>{h.latency}ms</span>
                </div>
                <div style={{ color: "#2d4a2d", fontSize: 7 }}>{h.ts}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  5. GPU DASHBOARD
//  Visualizes: SM heatmap, UMA bus, power rail, thermal
// ══════════════════════════════════════════════════════════════
function DashboardApp() {
  const { sys } = useCtx();
  const [sm, setSM] = useState(() => genSM(null));
  const [hist, setHist] = useState(() => Array.from({ length: 40 }, () => genSys(null)));
  const [busTraffic, setBusTraffic] = useState(() =>
    Array.from({ length: 20 }, () => Math.random() * 100)
  );
  const [powerRail, setPowerRail] = useState([
    { name: "GPU Core", v: 0.85, a: 8.2, c: "#10b981" },
    { name: "DRAM", v: 1.1, a: 3.4, c: "#3b82f6" },
    { name: "CPU", v: 0.95, a: 2.1, c: "#f59e0b" },
    { name: "IO", v: 1.8, a: 0.9, c: "#a855f7" },
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setSM(genSM);
      setHist((h) => [...h.slice(-39), genSys(h[h.length - 1])]);
      setBusTraffic((b) => [...b.slice(-19), Math.random() * 100]);
      setPowerRail((p) =>
        p.map((r) => ({ ...r, a: Math.max(0.1, r.a + (Math.random() - 0.5) * 0.4) }))
      );
    }, 750);
    return () => clearInterval(id);
  }, []);

  const maxH = Math.max(...hist.map((h) => h.gpu), 1);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#030810",
        fontFamily: mono,
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      <div
        style={{
          padding: "6px 12px",
          borderBottom: "1px solid #0f1630",
          color: "#3b82f6",
          fontWeight: 700,
          fontSize: 10,
          background: "rgba(59,130,246,0.04)",
          flexShrink: 0,
        }}
      >
        ◈ GPU DASHBOARD — Jetson Orin NX 16GB · CUDA 12.3
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
        {/* Top KPIs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 6,
            marginBottom: 10,
          }}
        >
          {[
            ["GPU", `${sys.gpu?.toFixed(0)}%`, "#10b981"],
            ["VRAM", `${sys.vram?.toFixed(0)}%`, "#3b82f6"],
            ["Power", `${sys.power?.toFixed(0)}W`, "#f59e0b"],
            ["Temp", `${sys.temp?.toFixed(0)}°C`, "#ef4444"],
          ].map(([l, v, c]) => (
            <div
              key={l}
              style={{
                background: "#060c1a",
                border: `1px solid ${c}22`,
                borderRadius: 6,
                padding: "7px 8px",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#374151", fontSize: 7 }}>{l}</div>
              <div style={{ color: c, fontWeight: 800, fontSize: 18 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* GPU timeline */}
        <Hd color="#1e3a5f">GPU UTILIZATION · 40s</Hd>
        <div
          style={{ display: "flex", alignItems: "flex-end", gap: 1, height: 44, marginBottom: 10 }}
        >
          {hist.map((h, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: `hsl(${120 + h.gpu * 0.7},65%,50%)`,
                height: `${(h.gpu / 100) * 100}%`,
                borderRadius: "1px 1px 0 0",
                opacity: 0.3 + (i / hist.length) * 0.7,
                transition: "height 0.6s",
              }}
            />
          ))}
        </div>

        {/* SM heatmap */}
        <Hd color="#1e3a5f">SM CORE HEATMAP — 8 STREAMING MULTIPROCESSORS</Hd>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 5,
            marginBottom: 10,
          }}
        >
          {sm.map((v, i) => {
            const c = v > 80 ? "#ef4444" : v > 60 ? "#f59e0b" : v > 40 ? "#10b981" : "#3b82f6";
            return (
              <div
                key={i}
                style={{
                  background: `${c}18`,
                  border: `1px solid ${c}44`,
                  borderRadius: 5,
                  padding: "6px 4px",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "#374151", fontSize: 7 }}>SM{i}</div>
                <div
                  style={{
                    height: 22,
                    background: "#060c1a",
                    borderRadius: 3,
                    margin: "3px 0",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: `${v}%`,
                      background: c,
                      transition: "height 0.7s",
                    }}
                  />
                </div>
                <div style={{ color: c, fontSize: 9, fontWeight: 700 }}>{v.toFixed(0)}%</div>
              </div>
            );
          })}
        </div>

        {/* UMA bus */}
        <Hd color="#1e3a5f">UMA MEMORY BUS TRAFFIC</Hd>
        <div
          style={{ display: "flex", alignItems: "flex-end", gap: 1, height: 28, marginBottom: 8 }}
        >
          {busTraffic.map((v, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: "#3b82f6",
                height: `${v}%`,
                borderRadius: "1px 1px 0 0",
                opacity: 0.3 + (i / busTraffic.length) * 0.7,
              }}
            />
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 5,
            marginBottom: 10,
            fontSize: 8,
          }}
        >
          {[
            ["Read BW", "24.6 GB/s", "#3b82f6"],
            ["Write BW", "18.2 GB/s", "#10b981"],
            ["Latency", "42 ns", "#f59e0b"],
          ].map(([l, v, c]) => (
            <div
              key={l}
              style={{
                background: "#060c1a",
                border: `1px solid ${c}22`,
                borderRadius: 4,
                padding: "5px 6px",
              }}
            >
              <div style={{ color: "#374151", fontSize: 7 }}>{l}</div>
              <div style={{ color: c, fontWeight: 700 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Power rails */}
        <Hd color="#1e3a5f">POWER RAILS</Hd>
        <table style={{ width: "100%", fontSize: 8, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#060c1a" }}>
              {["RAIL", "VOLT", "AMP", "WATT", "STATUS"].map((h) => (
                <th key={h} style={{ padding: "3px 5px", color: "#374151", textAlign: "left" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {powerRail.map((r) => (
              <tr key={r.name} style={{ borderTop: "1px solid #0a0f1e" }}>
                <td style={{ padding: "3px 5px", color: r.c }}>{r.name}</td>
                <td style={{ padding: "3px 5px", color: "#9ca3af" }}>{r.v}V</td>
                <td style={{ padding: "3px 5px", color: "#9ca3af" }}>{r.a.toFixed(1)}A</td>
                <td style={{ padding: "3px 5px", color: r.c, fontWeight: 700 }}>
                  {(r.v * r.a).toFixed(1)}W
                </td>
                <td style={{ padding: "3px 5px", color: "#10b981" }}>●</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Terminal ───────────────────────────────────────────────────
function TerminalApp() {
  const [hist, setHist] = useState([
    { t: "sys", s: "ThoxOS v5.0 · AI Inference Sandbox · type 'help'" },
  ]);
  const [inp, setInp] = useState("");
  const [ch, setCh] = useState([]),
    [ci, setCi] = useState(-1);
  const bot = useRef(null),
    ref = useRef(null);
  useEffect(() => {
    bot.current?.scrollIntoView({ behavior: "smooth" });
  }, [hist]);
  const run = (cmd) => {
    const c = cmd.trim().toLowerCase();
    if (!c) return;
    setCh((h) => [cmd, ...h.slice(0, 49)]);
    setCi(-1);
    setHist((h) => [...h, { t: "in", s: `root@thox:~# ${cmd}` }]);
    play("terminal");
    const fn = CMDS[c];
    if (fn) {
      const o = fn();
      if (o === "__clear__") {
        setHist([]);
        return;
      }
      setHist((h) => [...h, { t: "out", s: o }]);
      play("termOutput");
    } else {
      setHist((h) => [...h, { t: "err", s: `bash: ${cmd}: not found` }]);
      play("error");
    }
  };
  const onKey = (e) => {
    if (e.key === "Enter") {
      run(inp);
      setInp("");
    } else if (e.key === "ArrowUp") {
      const i = Math.min(ci + 1, ch.length - 1);
      setCi(i);
      setInp(ch[i] || "");
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      const i = Math.max(ci - 1, -1);
      setCi(i);
      setInp(i === -1 ? "" : ch[i] || "");
      e.preventDefault();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const k = Object.keys(CMDS).find((k) => k.startsWith(inp));
      if (k) setInp(k);
    }
  };
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#020504",
        minHeight: 0,
      }}
    >
      <div
        style={{ flex: 1, overflowY: "auto", padding: "8px 12px" }}
        onClick={() => ref.current?.focus()}
      >
        {hist.map((l, i) => (
          <pre
            key={i}
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: 11,
              lineHeight: 1.65,
              color:
                l.t === "in"
                  ? "#34d399"
                  : l.t === "err"
                    ? "#ef4444"
                    : l.t === "sys"
                      ? "#a855f7"
                      : "#9ca3af",
              fontFamily: mono,
            }}
          >
            {l.s}
          </pre>
        ))}
        <div ref={bot} />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #0a1a12",
          padding: "7px 12px",
          gap: 6,
          background: "#030706",
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#34d399", fontSize: 11, whiteSpace: "nowrap", fontFamily: mono }}>
          root@thox:~#
        </span>
        <input
          ref={ref}
          autoFocus
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fafafa",
            fontSize: 11,
            fontFamily: mono,
            caretColor: "#34d399",
            minWidth: 0,
          }}
          placeholder="command..."
        />
      </div>
    </div>
  );
}

// ── Settings ───────────────────────────────────────────────────
function SettingsApp() {
  const { settings, setSetting } = useCtx();
  const tabs = [
    { id: "display", l: "Display" },
    { id: "inference", l: "Inference" },
    { id: "quantum", l: "Quantum" },
    { id: "about", l: "About" },
  ];
  const [tab, setTab] = useState("display");
  const Row = ({ label, children }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "7px 0",
        borderBottom: "1px solid #1a1a28",
      }}
    >
      <span style={{ color: "#9ca3af", fontSize: 10 }}>{label}</span>
      {children}
    </div>
  );
  const Sl = ({ k, lo, hi, st = 1 }) => (
    <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
      <input
        type="range"
        min={lo}
        max={hi}
        step={st}
        value={settings[k]}
        onChange={(e) => setSetting(k, +e.target.value)}
        style={{ accentColor: "#10b981", width: 70 }}
      />
      <span style={{ color: "#34d399", fontSize: 9, minWidth: 20 }}>{settings[k]}</span>
    </div>
  );
  const Sel = ({ k, opts }) => (
    <select
      value={settings[k]}
      onChange={(e) => setSetting(k, e.target.value)}
      style={{
        background: "#1a1a2e",
        color: "#fafafa",
        border: "1px solid #374151",
        borderRadius: 4,
        padding: "2px 5px",
        fontSize: 9,
        fontFamily: mono,
      }}
    >
      {opts.map((o) => (
        <option key={o.v || o} value={o.v || o}>
          {o.l || o}
        </option>
      ))}
    </select>
  );
  const Tog = ({ k }) => (
    <div
      onClick={() => {
        setSetting(k, !settings[k]);
        play("toggle");
      }}
      style={{
        width: 30,
        height: 17,
        borderRadius: 9,
        background: settings[k] ? "#10b981" : "#374151",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: settings[k] ? 13 : 2,
          width: 13,
          height: 13,
          borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s",
        }}
      />
    </div>
  );
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        background: "#06060f",
        fontFamily: mono,
        overflow: "hidden",
        minHeight: 0,
      }}
    >
      <div
        style={{
          width: 85,
          background: "#040410",
          borderRight: "1px solid #1a1a28",
          padding: "6px 0",
          flexShrink: 0,
        }}
      >
        {tabs.map((t) => (
          <div
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              padding: "7px 10px",
              cursor: "pointer",
              fontSize: 9,
              color: tab === t.id ? "#34d399" : "#4b5563",
              background: tab === t.id ? "rgba(52,211,153,0.06)" : "transparent",
              borderLeft: tab === t.id ? "2px solid #34d399" : "2px solid transparent",
            }}
          >
            {t.l}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px" }}>
        {tab === "display" && (
          <>
            <Hd>DISPLAY</Hd>
            {/* macOS-style resolution picker */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ color: "#6b7280", fontSize: 8, marginBottom: 8, textAlign: "center" }}>
                Resolution
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  gap: 6,
                }}
              >
                {[
                  { z: 0.75, label: "Larger Text", w: 28, h: 20 },
                  { z: 0.85, label: "", w: 32, h: 23 },
                  { z: 1, label: "Default", w: 38, h: 27 },
                  { z: 1.15, label: "", w: 44, h: 31 },
                  { z: 1.3, label: "More Space", w: 50, h: 35 },
                ].map((opt) => {
                  const active = settings.zoom === opt.z;
                  return (
                    <div
                      key={opt.z}
                      onClick={() => {
                        setSetting("zoom", opt.z);
                        play("click");
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: opt.w,
                          height: opt.h,
                          borderRadius: 3,
                          background: active ? "#1a1a2e" : "#0c0c18",
                          border: `1.5px solid ${active ? settings.accent : "#2a2a3a"}`,
                          display: "flex",
                          flexDirection: "column",
                          padding: 2,
                          gap: 1,
                          overflow: "hidden",
                          boxShadow: active ? `0 0 8px ${settings.accent}44` : "none",
                          transition: "all 0.15s",
                        }}
                      >
                        {/* Mini window chrome dots */}
                        <div style={{ display: "flex", gap: 1.5, padding: "1px 0" }}>
                          <div
                            style={{
                              width: 2.5,
                              height: 2.5,
                              borderRadius: "50%",
                              background: "#ef4444",
                            }}
                          />
                          <div
                            style={{
                              width: 2.5,
                              height: 2.5,
                              borderRadius: "50%",
                              background: "#f59e0b",
                            }}
                          />
                          <div
                            style={{
                              width: 2.5,
                              height: 2.5,
                              borderRadius: "50%",
                              background: "#10b981",
                            }}
                          />
                        </div>
                        {/* Mini content lines */}
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            justifyContent: "center",
                            padding: "0 1px",
                          }}
                        >
                          {Array.from({ length: Math.max(2, Math.floor(opt.h / 6)) }, (_, i) => (
                            <div
                              key={i}
                              style={{
                                height: 1.5,
                                background: active ? `${settings.accent}60` : "#2a2a3a",
                                borderRadius: 1,
                                width: `${60 + Math.random() * 40}%`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      {opt.label && (
                        <span
                          style={{
                            fontSize: 7,
                            color: active ? "#fafafa" : "#4b5563",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {opt.label}
                        </span>
                      )}
                      {!opt.label && <span style={{ fontSize: 7, color: "transparent" }}>·</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Brightness slider */}
            <div style={{ marginBottom: 12, padding: "0 4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: "#4b5563" }}>☀</span>
                <input
                  type="range"
                  min={0.4}
                  max={1}
                  step={0.05}
                  value={settings.brightness}
                  onChange={(e) => setSetting("brightness", +e.target.value)}
                  style={{ flex: 1, accentColor: settings.accent, height: 4 }}
                />
                <span style={{ fontSize: 14, color: "#9ca3af" }}>☀</span>
              </div>
              <div style={{ textAlign: "center", marginTop: 3 }}>
                <span style={{ fontSize: 8, color: "#4b5563" }}>Brightness</span>
              </div>
            </div>
            <Row label="Appearance">
              <div style={{ display: "flex", gap: 4 }}>
                {[
                  { v: "dark", l: "Dark" },
                  { v: "light", l: "Light" },
                ].map((t) => (
                  <div
                    key={t.v}
                    onClick={() => {
                      setSetting("theme", t.v);
                      play("click");
                    }}
                    style={{
                      padding: "3px 10px",
                      borderRadius: 5,
                      background: settings.theme === t.v ? `${settings.accent}20` : "transparent",
                      border: `1px solid ${settings.theme === t.v ? settings.accent : "#374151"}`,
                      color: settings.theme === t.v ? settings.accent : "#6b7280",
                      fontSize: 9,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {t.l}
                  </div>
                ))}
              </div>
            </Row>
            <Row label="Accent Color">
              <div style={{ display: "flex", gap: 5 }}>
                {["#34d399", "#3b82f6", "#a855f7", "#f59e0b", "#ef4444", "#10b981"].map((c) => (
                  <div
                    key={c}
                    onClick={() => {
                      setSetting("accent", c);
                      play("click");
                    }}
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: "50%",
                      background: c,
                      cursor: "pointer",
                      border: settings.accent === c ? "2px solid #fff" : "2px solid transparent",
                    }}
                  />
                ))}
              </div>
            </Row>
            <Row label="Sound Effects">
              <Tog k="sound" />
            </Row>
            <Row label="Notifications">
              <Tog k="notifs" />
            </Row>
          </>
        )}
        {tab === "inference" && (
          <>
            <Hd>AI INFERENCE</Hd>
            <Row label="Model">
              <Sel
                k="model"
                opts={[
                  { v: "claude-sonnet-4-20250514", l: "Sonnet 4.5" },
                  { v: "claude-opus-4-6", l: "Opus 4.6" },
                  { v: "claude-haiku-4-5-20251001", l: "Haiku 4.5" },
                ]}
              />
            </Row>
            <Row label="Temperature">
              <Sl k="temp" lo={0} hi={1} st={0.05} />
            </Row>
            <div
              style={{
                marginTop: 10,
                padding: "7px",
                background: "rgba(16,185,129,0.04)",
                border: "1px solid rgba(16,185,129,0.12)",
                borderRadius: 5,
                fontSize: 8,
                color: "#2d4a3a",
                lineHeight: 1.9,
              }}
            >
              <span style={{ color: "#10b981" }}>Live Anthropic API</span> · TensorRT-LLM v0.9
              <br />
              FP8 quantization · 200K context
            </div>
          </>
        )}
        {tab === "quantum" && (
          <>
            <Hd>QUANTUM STACK</Hd>
            <Row label="Backend">
              <Sel
                k="qbackend"
                opts={[
                  { v: "adaptive", l: "Adaptive" },
                  "cuStateVec",
                  "cuTensorNet",
                  "cuDensityMat",
                ]}
              />
            </Row>
            <Row label="Max Qubits">
              <Sl k="maxQ" lo={4} hi={60} />
            </Row>
            <Row label="Raft Timeout">
              <Sl k="raft" lo={50} hi={500} st={10} />
            </Row>
          </>
        )}
        {tab === "about" && (
          <>
            <Hd>THOXOS v6.0</Hd>
            <div style={{ fontSize: 9, color: "#9ca3af", lineHeight: 2.1 }}>
              {[
                ["OS", "ThoxOS v6.0.0"],
                ["Kernel", "5.15.148-thoxos-rt"],
                ["Hardware", "Jetson Orin NX 16GB"],
                ["CUDA", "12.3 · cuQuantum 24.03"],
                ["AI Engine", "TensorRT-LLM v0.9 FP8"],
                ["LLM", "Claude claude-sonnet-4-20250514"],
                ["MagStack™", "4 nodes · Raft v3.1"],
                ["Company", "Thox.ai LLC · Cedar Park TX"],
                ["CTO", "Tommy Xaypanya"],
                ["Patent", "US Provisional 2026-03-04"],
                ["PCT", "Deadline 2027-03-04"],
              ].map(([l, v]) => (
                <div
                  key={l}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #0f0f1e",
                    padding: "2px 0",
                  }}
                >
                  <span style={{ color: "#4b5563" }}>{l}</span>
                  <span
                    style={{
                      color:
                        l === "MagStack™"
                          ? "#c084fc"
                          : l === "LLM" || l === "AI Engine"
                            ? "#10b981"
                            : "#fafafa",
                    }}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function AppContent({ id, openApp, closeApp, goHome, demo }) {
  if (id === "inference") return <InferenceApp />;
  if (id === "quantum") return <QuantumApp />;
  if (id === "magstack") return <MagStackApp />;
  if (id === "pipeline") return <PipelineApp />;
  if (id === "dashboard") return <DashboardApp />;
  if (id === "terminal") return <TerminalApp />;
  if (id === "agents") return <AgentApp />;
  if (id === "settings") return <SettingsApp />;
  if (id === "mesh") return <MeshCognition />;
  if (id === "distributed") return <DistributedInference />;
  if (id === "memory") return <MemoryHierarchy />;
  if (id === "security") return <SecurityCenter />;
  if (id === "kvcache") return <KVCache />;
  if (id === "ota") return <OTAUpdates />;
  if (id === "demo")
    return (
      <DemoMode
        stepIdx={demo?.stepIdx ?? -1}
        startedAt={demo?.startedAt ?? null}
        onStart={demo?.start}
        onStop={demo?.stop}
      />
    );
  if (id === "info") return <DeviceInfo />;
  return null;
}

// ── Spotlight (Cmd+K) ──────────────────────────────────────────
function Spotlight({ apps, onClose, onLaunch }) {
  const [q, setQ] = useState("");
  const [idx, setIdx] = useState(0);
  const filt = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return apps
      .filter(
        (a) => !needle || (a.label + " " + a.short + " " + a.id).toLowerCase().includes(needle)
      )
      .slice(0, 10);
  }, [q, apps]);
  useEffect(() => {
    setIdx(0);
  }, [q]);
  const onKey = (e) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      setIdx((i) => Math.min(i + 1, filt.length - 1));
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setIdx((i) => Math.max(i - 1, 0));
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (filt[idx]) {
        onLaunch(filt[idx].id);
        onClose();
      }
    }
  };
  return (
    <div className="thox-spotlight-bg" onClick={onClose} role="dialog" aria-modal="true">
      <div className="thox-spotlight" onClick={(e) => e.stopPropagation()}>
        <div className="thox-spotlight-input">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{ color: "var(--accent-h)", flexShrink: 0 }}
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            autoFocus
            placeholder="Search apps, run commands…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKey}
            aria-label="Search"
          />
          <kbd>ESC</kbd>
        </div>
        <div className="thox-spotlight-list">
          {filt.length === 0 && <div className="thox-spotlight-empty">No matches.</div>}
          {filt.map((a, i) => (
            <button
              type="button"
              key={a.id}
              className={"thox-spotlight-item" + (i === idx ? " active" : "")}
              onClick={() => {
                onLaunch(a.id);
                onClose();
              }}
            >
              <span className="ic" style={{ color: a.color }}>
                {a.icon}
              </span>
              <div>
                <div className="nm">{a.label}</div>
                <div className="ds">{a.short}</div>
              </div>
              <div className="thox-spotlight-meta">app</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Window control glyphs (subtle monochrome × – ⛶) ───────────
const TBC_ICONS = {
  close: (
    <svg
      viewBox="0 0 8 8"
      width="9"
      height="9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5" />
    </svg>
  ),
  min: (
    <svg
      viewBox="0 0 8 8"
      width="9"
      height="9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M1.5 4h5" />
    </svg>
  ),
  max: (
    <svg viewBox="0 0 8 8" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1.5" y="1.5" width="5" height="5" />
    </svg>
  ),
};

// ── Desktop window ─────────────────────────────────────────────
function Win({ id, onClose, onFocus, zIndex, vp, snap, T, isDark, demoCtl }) {
  const app = APPS[id];
  const dH = vp.h - 36 - 72;
  const W = Math.min(Math.floor(vp.w * 0.52), 760),
    H = Math.min(Math.floor(dH * 0.76), 540);
  const idx = AL.findIndex((a) => a.id === id);
  const [pos, setPos] = useState({
    x: Math.min(30 + idx * 26, vp.w - W - 20),
    y: Math.min(12 + idx * 18, dH - H - 20),
  });
  const [min, setMin] = useState(false),
    [snapZ, setSnapZ] = useState("none"),
    [prev, setPrev] = useState(null),
    [ghost, setGhost] = useState(null);
  const dr = useRef(false),
    off = useRef({ x: 0, y: 0 });
  const sd = (cx, cy) => {
    if (snapZ !== "none") {
      setSnapZ("none");
      if (prev) setPos(prev);
    }
    onFocus(id);
    dr.current = true;
    off.current = { x: cx - pos.x, y: cy - pos.y };
  };
  useEffect(() => {
    const mm = (e) => {
      if (!dr.current) return;
      setPos({ x: e.clientX - off.current.x, y: e.clientY - off.current.y });
      if (!snap) return;
      if (e.clientX < 20) setGhost("left");
      else if (e.clientX > vp.w - 20) setGhost("right");
      else if (e.clientY < 4) setGhost("full");
      else setGhost(null);
    };
    const mu = (e) => {
      if (!dr.current) return;
      dr.current = false;
      if (snap) {
        if (e.clientX < 20) {
          setPrev(pos);
          setSnapZ("left");
        } else if (e.clientX > vp.w - 20) {
          setPrev(pos);
          setSnapZ("right");
        } else if (e.clientY < 4) {
          setPrev(pos);
          setSnapZ("full");
        }
      }
      setGhost(null);
    };
    const tm = (e) => {
      if (dr.current) {
        const t = e.touches[0];
        setPos({ x: t.clientX - off.current.x, y: t.clientY - off.current.y });
      }
    };
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup", mu);
    window.addEventListener("touchmove", tm, { passive: true });
    window.addEventListener("touchend", mu);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup", mu);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend", mu);
    };
  }, [pos, vp, snap]);
  const fx =
    snapZ === "left"
      ? 0
      : snapZ === "right"
        ? Math.floor(vp.w / 2)
        : snapZ === "full"
          ? 0
          : Math.max(0, Math.min(pos.x, vp.w - W));
  const fy = snapZ !== "none" ? 0 : Math.max(0, Math.min(pos.y, dH - 36));
  const fw = snapZ === "none" ? W : snapZ === "full" ? vp.w : Math.floor(vp.w / 2);
  const fh = snapZ !== "none" ? dH : H;
  return (
    <>
      {ghost && (
        <div
          style={{
            position: "absolute",
            zIndex: zIndex - 1,
            background: `${app.color}10`,
            border: `1px dashed ${app.color}55`,
            borderRadius: 12,
            left: ghost === "right" ? Math.floor(vp.w / 2) : 0,
            top: 0,
            width: ghost === "full" ? vp.w : Math.floor(vp.w / 2),
            height: dH,
            pointerEvents: "none",
          }}
        />
      )}
      <div
        onClick={() => onFocus(id)}
        style={{
          position: "absolute",
          left: fx,
          top: fy,
          zIndex,
          width: fw,
          height: min ? 36 : fh,
          background: T.winBg,
          border: `1px solid ${zIndex >= 100 ? "var(--border-strong)" : "var(--border)"}`,
          borderRadius: snapZ !== "none" ? 0 : 12,
          overflow: "hidden",
          boxShadow:
            snapZ !== "none"
              ? "none"
              : isDark
                ? `var(--thox-shadow-window-focus)`
                : `0 8px 24px rgba(0,0,0,0.10), 0 24px 60px rgba(0,0,0,0.08)`,
          transition:
            "left 0.16s, top 0.16s, width 0.16s, height 0.16s, border-radius 0.16s, box-shadow 0.2s, background 0.4s",
          fontFamily: "var(--thox-font-sans)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          onMouseDown={(e) => {
            if (!e.target.closest(".wc")) sd(e.clientX, e.clientY);
            e.preventDefault();
          }}
          onTouchStart={(e) => {
            if (!e.target.closest(".wc")) {
              const t = e.touches[0];
              sd(t.clientX, t.clientY);
            }
          }}
          onDoubleClick={() => setSnapZ((v) => (v === "full" ? "none" : "full"))}
          style={{
            height: 36,
            flexShrink: 0,
            background: isDark
              ? "linear-gradient(180deg, var(--surface-2) 0%, var(--surface) 100%)"
              : T.winChrome,
            borderBottom: `1px solid ${isDark ? "var(--border)" : T.borderSub}`,
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            gap: 10,
            cursor: snapZ !== "none" ? "default" : "grab",
            userSelect: "none",
          }}
        >
          <div className="wc thox-tbc-row">
            <button
              type="button"
              className="thox-tbc close"
              title="Close"
              onClick={(e) => {
                e.stopPropagation();
                onClose(id);
              }}
            >
              {TBC_ICONS.close}
            </button>
            <button
              type="button"
              className="thox-tbc min"
              title="Minimize"
              onClick={(e) => {
                e.stopPropagation();
                setMin((v) => !v);
                play("minimize");
              }}
            >
              {TBC_ICONS.min}
            </button>
            <button
              type="button"
              className="thox-tbc max"
              title="Maximize"
              onClick={(e) => {
                e.stopPropagation();
                setSnapZ((v) => (v === "full" ? "none" : "full"));
                play("maximize");
              }}
            >
              {TBC_ICONS.max}
            </button>
          </div>
          <span style={{ color: app.color, fontSize: 13, lineHeight: 1, display: "inline-flex" }}>
            {app.icon}
          </span>
          <span
            style={{
              color: T.text,
              fontSize: 12,
              fontWeight: 600,
              flex: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontFamily: "var(--thox-font-mono)",
              letterSpacing: "0.02em",
            }}
          >
            {app.label}
          </span>
        </div>
        {!min && (
          <div
            style={{
              flex: 1,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              minHeight: 0,
            }}
          >
            <AppContent
              id={id}
              openApp={() => {}}
              closeApp={() => {}}
              goHome={() => {}}
              demo={demoCtl}
            />
          </div>
        )}
      </div>
    </>
  );
}

// ── Boot screen ─────────────────────────────────────────────────
function ChipGlyph({ size = 72 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx=".5" fill="currentColor" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </svg>
  );
}
function BootScreen({ line, vp }) {
  const visible = BOOT.slice(Math.max(0, line - 8), line);
  return (
    <div className="thox-boot" style={{ position: "absolute" }}>
      <div className="thox-boot-mark">
        <ChipGlyph size={72} />
      </div>
      <div style={{ textAlign: "center" }}>
        <div className="thox-boot-name">
          Thox<b>OS</b>
        </div>
        <div className="thox-boot-version" style={{ marginTop: 4 }}>
          v6.0.0 · Complete System Demo
        </div>
      </div>
      <div className="thox-boot-bar">
        <i />
      </div>
      <div className="thox-boot-log" style={{ width: vp.mob ? 320 : 520 }}>
        {visible.map((l, i) => {
          const idx = Math.max(0, line - 8) + i;
          const cls = idx === line - 1 ? "ms" : idx % 5 === 0 ? "ok" : "dim";
          return (
            <div className="line" key={idx}>
              <span className="ts">[{String(idx).padStart(2, "0")}]</span>
              <span className={cls} style={{ wordBreak: "break-word" }}>
                {l}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Lock screen ────────────────────────────────────────────────
// Visual update (2026):
//   - Mesh-network background image (loaded from /thox-bg-2026.png in /public)
//   - Branded wordmark + chip glyph instead of user avatar
//   - Reduced chrome; password field stays focus-first
function LockScreen({ user = "tommy", onUnlock }) {
  const [pin, setPin] = useState("");
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = t.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  const date = t.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
  const submit = (e) => {
    e.preventDefault();
    onUnlock();
  };
  return (
    <div className="thox-lock thox-lock--mesh">
      <div className="thox-lock-time">{time}</div>
      <div className="thox-lock-date">{date}</div>
      <form className="thox-lock-card" onSubmit={submit}>
        <div className="thox-lock-mark" aria-hidden="true">
          <ChipGlyph size={44} />
        </div>
        <div className="thox-lock-brand">
          Thox<b>OS</b>
        </div>
        <div className="thox-lock-user">{user}@thoxos</div>
        <div className="thox-lock-input">
          <input
            autoFocus
            type="password"
            placeholder="• • • • • •"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            aria-label="Password"
          />
          <button className="thox-btn primary" type="submit">
            Unlock
          </button>
        </div>
        <div className="thox-lock-hint">Press Enter · Any password works</div>
      </form>
    </div>
  );
}

// ── Notification pool ──────────────────────────────────────────
const NPOOL = [
  {
    icon: "◉",
    color: "#10b981",
    title: "Inference",
    body: "claude-sonnet-4-20250514 · 48 tok/s peak",
  },
  { icon: "⬡", color: "#a855f7", title: "Quantum", body: "GHZ 16q fidelity 99.4% — cuStateVec" },
  { icon: "⬡", color: "#c084fc", title: "MagStack™", body: "Tensor dist node-2 complete · 14q" },
  {
    icon: "▶",
    color: "#f59e0b",
    title: "Pipeline",
    body: "Vision inference 84ms — llama3.2-vision",
  },
  {
    icon: "◈",
    color: "#3b82f6",
    title: "GPU",
    body: "Peak SM utilization 89% · cuTensorNet burst",
  },
  { icon: ">_", color: "#34d399", title: "ThoxOS", body: "Kernel attestation renewed · TPM OK" },
  { icon: "🧠", color: "#10b981", title: "Mesh", body: "Kuramoto sync r(t) = 0.94 · COHERENT" },
  {
    icon: "🔒",
    color: "#10b981",
    title: "Security",
    body: "Boot chain verified · 7/7 trust score",
  },
  {
    icon: "⚡",
    color: "#fbbf24",
    title: "Dist Inference",
    body: "4× TP active · 14B model loaded",
  },
];

// ── IP Protection & Footer ────────────────────────────────────
function IPProtectionSection() {
  return (
    <div
      style={{
        background: "rgba(17,24,39,0.5)",
        borderRadius: 12,
        padding: "14px 16px",
        border: "1px solid #1f2937",
        marginBottom: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <span style={{ color: "#f59e0b", fontSize: 14, flexShrink: 0, marginTop: 1 }}>🛡</span>
        <div>
          <div style={{ fontSize: 9, fontWeight: 600, color: "#f59e0b", marginBottom: 4 }}>
            Intellectual Property Protection
          </div>
          <div style={{ fontSize: 8, color: "#9ca3af", lineHeight: 1.6, marginBottom: 8 }}>
            All content, technology, and materials on this website are protected by U.S. and
            international intellectual property laws. The technologies described herein, including
            MagStack™ clustering technology and Thox OS™ operating system, are proprietary trade
            secrets and/or protected by pending patent applications.
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 6,
              marginBottom: 8,
            }}
          >
            <div
              style={{
                background: "rgba(168,85,247,0.1)",
                borderRadius: 8,
                padding: "7px 8px",
                border: "1px solid rgba(168,85,247,0.2)",
              }}
            >
              <div style={{ fontSize: 8, fontWeight: 600, color: "#a855f7", marginBottom: 2 }}>
                Patent Pending
              </div>
              <div style={{ fontSize: 7, color: "#6b7280" }}>
                MagStack™ magnetic stacking interface system
              </div>
            </div>
            <div
              style={{
                background: "rgba(16,185,129,0.1)",
                borderRadius: 8,
                padding: "7px 8px",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <div style={{ fontSize: 8, fontWeight: 600, color: "#10b981", marginBottom: 2 }}>
                Trademarks
              </div>
              <div style={{ fontSize: 7, color: "#6b7280" }}>Thox.ai™, Thox OS™, MagStack™</div>
            </div>
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                borderRadius: 8,
                padding: "7px 8px",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              <div style={{ fontSize: 8, fontWeight: 600, color: "#ef4444", marginBottom: 2 }}>
                Trade Secrets
              </div>
              <div style={{ fontSize: 7, color: "#6b7280" }}>
                Proprietary algorithms and designs
              </div>
            </div>
          </div>
          <div style={{ fontSize: 7, color: "#6b7280", lineHeight: 1.5 }}>
            You may not reverse engineer, disassemble, decompile, decode, or otherwise attempt to
            derive the source code, algorithms, data structures, or underlying ideas of any Thox.ai
            hardware, software, or technology.
          </div>
        </div>
      </div>
    </div>
  );
}

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "https://www.thox.ai/product#features" },
    { label: "Use Cases", href: "https://www.thox.ai/use-cases" },
    { label: "Pricing", href: "https://www.thox.ai/pricing" },
    { label: "MagStack™", href: "https://www.thox.ai/product#clustering" },
    { label: "Specs", href: "https://www.thox.ai/product#specs" },
  ],
  Developers: [
    { label: "MagStack™ SDK", href: "https://www.thox.ai/docs/magstack-sdk" },
    { label: "Documentation", href: "https://www.thox.ai/docs/magstack" },
    { label: "Hardware Specs", href: "https://www.thox.ai/docs/hardware" },
    { label: "API Reference", href: "https://www.thox.ai/docs/api" },
    { label: "Cluster Models", href: "https://www.thox.ai/docs/cluster-models" },
  ],
  Company: [
    { label: "About", href: "https://www.thox.ai/about" },
    { label: "Kickstarter", href: "https://www.thox.ai/kickstarter" },
    { label: "Investors", href: "https://www.thox.ai/investors" },
    { label: "Careers", href: "https://www.thox.ai/careers" },
    { label: "Press", href: "https://www.thox.ai/press" },
  ],
  Support: [
    { label: "Help Center", href: "https://www.thox.ai/help" },
    { label: "Contact", href: "https://www.thox.ai/contact" },
    { label: "FAQ", href: "https://www.thox.ai/product#faq" },
    { label: "Documentation", href: "https://www.thox.ai/docs" },
  ],
  Legal: [
    { label: "Privacy", href: "https://www.thox.ai/privacy" },
    { label: "Terms", href: "https://www.thox.ai/terms" },
    { label: "Intellectual Property", href: "https://www.thox.ai/intellectual-property" },
    { label: "Cookies", href: "https://www.thox.ai/cookies" },
  ],
};

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Thox-ai", icon: "⟐" },
  { label: "HuggingFace", href: "https://huggingface.co/Thox-ai", icon: "🤗" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/thoxai/", icon: "in" },
];

const linkStyle = {
  color: "#6b7280",
  fontSize: 7,
  textDecoration: "none",
  lineHeight: 1.9,
  display: "block",
};
const linkHover = (e, enter) => {
  e.currentTarget.style.color = enter ? "#10b981" : "#6b7280";
};

function TrademarkFooter({ vp }) {
  const isMob = vp?.mob;
  const cols = isMob ? "repeat(2,1fr)" : "repeat(5,1fr)";
  return (
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 12, marginTop: 10 }}>
      {/* Link columns */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: cols,
          gap: isMob ? 10 : 14,
          marginBottom: 12,
        }}
      >
        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
          <div key={section}>
            <div
              style={{
                fontSize: 8,
                fontWeight: 700,
                color: "#9ca3af",
                marginBottom: 4,
                letterSpacing: 0.5,
              }}
            >
              {section}
            </div>
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
                onMouseEnter={(e) => linkHover(e, true)}
                onMouseLeave={(e) => linkHover(e, false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        ))}
      </div>
      {/* Social */}
      <div
        style={{
          display: "flex",
          justifyContent: isMob ? "center" : "flex-start",
          gap: 8,
          marginBottom: 10,
        }}
      >
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={s.label}
            style={{
              width: 22,
              height: 22,
              borderRadius: 5,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 9,
              color: "#6b7280",
              textDecoration: "none",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#10b981";
              e.currentTarget.style.color = "#10b981";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "#6b7280";
            }}
          >
            {s.icon}
          </a>
        ))}
      </div>
      {/* Trademark / legal text */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 8 }}>
        <div
          style={{
            display: "flex",
            flexDirection: isMob ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMob ? "center" : "flex-start",
            gap: 8,
          }}
        >
          <div style={{ textAlign: isMob ? "center" : "left" }}>
            <div style={{ fontSize: 9, color: "#9ca3af" }}>
              © 2026 Thox.ai LLC. All Rights Reserved.
            </div>
            <div style={{ fontSize: 7, color: "#6b7280", marginTop: 3 }}>
              Thox.ai™, Thox OS™, MagStack™, and the Thox.ai logo are trademarks or registered
              trademarks of Thox.ai LLC in the United States and other countries.
            </div>
            <div style={{ fontSize: 7, color: "#4b5563", marginTop: 3 }}>
              U.S. Patent Pending — MagStack™ magnetic stacking interface technology.
            </div>
            <div style={{ fontSize: 7, color: "#4b5563", marginTop: 3 }}>
              NVIDIA, Jetson, TensorRT, and related marks are trademarks of NVIDIA Corporation.
              Ollama is a trademark of Ollama, Inc. All other trademarks are the property of their
              respective owners.
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: 7, color: "#6b7280", flexShrink: 0 }}>
            <div>Designed in Texas.</div>
            <div>Built for professionals everywhere.</div>
            <div style={{ marginTop: 3, color: "#4b5563" }}>
              Protected by U.S. and international IP laws.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
//  ROOT
// ══════════════════════════════════════════════════════════════
export default function ThoxOS() {
  const vp = useVP();
  const [settings, rawSet] = useState({
    accent: "#10b981",
    notifs: true,
    sound: true,
    zoom: 1,
    brightness: 1,
    model: "claude-sonnet-4-20250514",
    temp: 0.7,
    qbackend: "adaptive",
    maxQ: 34,
    raft: 150,
    snap: true,
    theme: "dark",
  });
  const setSetting = (k, v) => {
    rawSet((s) => ({ ...s, [k]: v }));
    if (k === "sound") setMuted(!v);
  };
  const isDark = settings.theme === "dark";
  // Theme-aware colors
  const T = isDark
    ? {
        bg: "#000",
        surface: "rgba(4,4,10,0.99)",
        surfaceAlt: "#0c0c18",
        border: "#14141e",
        borderSub: "#1a1a28",
        text: "#fafafa",
        textSub: "#9ca3af",
        textDim: "#6b7280",
        textGhost: "#374151",
        textInvis: "#1f1f2e",
        textNear: "#1a1a28",
        appBg: "#06060e",
        cardBg: "#0c0c18",
        winBg: "rgba(5,5,12,0.97)",
        winChrome: "rgba(14,14,22,0.99)",
        wallDot: "#141414",
        wallAccent: "07",
        wallPurple: "0.04",
        scrollThumb: "#1f2937",
      }
    : {
        bg: "#f0f2f5",
        surface: "rgba(255,255,255,0.97)",
        surfaceAlt: "#ffffff",
        border: "#e2e8f0",
        borderSub: "#e5e7eb",
        text: "#1a1a2e",
        textSub: "#4b5563",
        textDim: "#6b7280",
        textGhost: "#9ca3af",
        textInvis: "#d1d5db",
        textNear: "#e5e7eb",
        appBg: "#f8fafc",
        cardBg: "#ffffff",
        winBg: "rgba(255,255,255,0.98)",
        winChrome: "rgba(248,250,252,0.99)",
        wallDot: "#e2e8f0",
        wallAccent: "0a",
        wallPurple: "0.03",
        scrollThumb: "#cbd5e1",
      };
  const [sys, setSys] = useState(genSys(null));
  const [sysHist, setSysHist] = useState(() => Array.from({ length: 30 }, () => genSys(null)));

  const [phase, setPhase] = useState("boot");
  const [bl, setBl] = useState(0);
  const [open, setOpen] = useState([]);
  const [active, setActive] = useState(null);
  const [zC, setZC] = useState(100);
  const [zM, setZM] = useState({});
  const [time, setTime] = useState(new Date());
  const [sheet, setSheet] = useState(null);
  const [sheetIdx, setSheetIdx] = useState(0);
  const [notifs, setNotifs] = useState([]);
  const [showN, setShowN] = useState(false);
  const [toast, setToast] = useState(null);
  const [showMobApps, setShowMobApps] = useState(false); // mobile: home vs app grid
  const [statusLineIdx, setStatusLineIdx] = useState(0);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // 'thox' | 'apps' | 'view' | 'window' | 'help'

  const STATUS_LINES = useMemo(
    () => [
      { icon: "⬡", color: "#a855f7", text: `MAGSTACK™ · 4 nodes · Raft 3/4` },
      { icon: "◉", color: "#10b981", text: `AI INFERENCE · ${sys.toks} tok/s · FP8` },
      { icon: "🧠", color: "#10b981", text: `MESH COGNITION · r(t) = 0.94 · COHERENT` },
      { icon: "⚡", color: "#fbbf24", text: `DIST INFERENCE · 4× TP · 14B active` },
      { icon: "🔒", color: "#10b981", text: `SECURITY · 7/7 · MAXIMUM TRUST` },
    ],
    [sys.toks]
  );

  // Status line cycling
  useEffect(() => {
    if (phase !== "desktop") return;
    const id = setInterval(() => setStatusLineIdx((i) => (i + 1) % 5), 4000);
    return () => clearInterval(id);
  }, [phase]);

  // Cmd+K Spotlight + ESC to close menus
  useEffect(() => {
    if (phase !== "desktop") return;
    const onKey = (e) => {
      const isCmd = e.metaKey || e.ctrlKey;
      if (isCmd && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSpotlightOpen((s) => !s);
        setOpenMenu(null);
      } else if (e.key === "Escape") {
        setSpotlightOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  // Click-outside closes any open menubar dropdown
  useEffect(() => {
    if (!openMenu) return;
    const onDoc = () => setOpenMenu(null);
    window.addEventListener("click", onDoc);
    return () => window.removeEventListener("click", onDoc);
  }, [openMenu]);

  // Boot
  useEffect(() => {
    if (phase !== "boot") return;
    if (bl < BOOT.length) {
      if (bl === 0) play("boot");
      else play("bootTick");
      const t = setTimeout(() => setBl((v) => v + 1), bl === 0 ? 200 : 95 + Math.random() * 70);
      return () => clearTimeout(t);
    } else {
      play("bootDone");
      const t = setTimeout(() => setPhase("lock"), 300);
      return () => clearTimeout(t);
    }
  }, [phase, bl]);

  // Clock + sys
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
      setSys((p) => {
        const n = genSys(p);
        setSysHist((h) => [...h.slice(-29), n]);
        return n;
      });
    }, 800);
    return () => clearInterval(id);
  }, []);

  // Notifications
  useEffect(() => {
    if (phase !== "desktop" || !settings.notifs) return;
    const id = setInterval(() => {
      const n = {
        ...NPOOL[Math.floor(Math.random() * NPOOL.length)],
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
      };
      setNotifs((ns) => [n, ...ns.slice(0, 19)]);
      setToast(n);
      play("notify");
      setTimeout(() => setToast(null), 3000);
    }, 12000);
    return () => clearInterval(id);
  }, [phase, settings.notifs]);

  const toast2 = (msg) => {
    setToast({ icon: "⚡", color: settings.accent, title: "ThoxOS", body: msg, id: Date.now() });
    setTimeout(() => setToast(null), 2200);
  };

  const openApp = useCallback(
    (id) => {
      if (!open.includes(id)) setOpen((o) => [...o, id]);
      const z = zC + 1;
      setZC(z);
      setZM((m) => ({ ...m, [id]: z }));
      setActive(id);
      if (vp.mob) {
        setSheet(id);
        setSheetIdx(open.includes(id) ? open.indexOf(id) : open.length);
      }
      play("appOpen");
      toast2(`${APPS[id].label} opened`);
    },
    [open, zC, vp.mob, settings.accent]
  );

  const closeApp = useCallback(
    (id) => {
      setOpen((o) => o.filter((x) => x !== id));
      if (active === id) setActive(null);
      if (sheet === id) setSheet(null);
      play("appClose");
    },
    [active, sheet]
  );

  const focusWin = useCallback(
    (id) => {
      const z = zC + 1;
      setZC(z);
      setZM((m) => ({ ...m, [id]: z }));
      setActive(id);
      play("tabSwitch");
    },
    [zC]
  );

  // ── Demo Mode orchestration (lifted from DemoMode component so the demo
  //    keeps running even when its UI is unmounted by sheet/active changes
  //    on mobile/tablet) ────────────────────────────────────────────────
  const [demoStepIdx, setDemoStepIdx] = useState(-1);
  const [demoStartedAt, setDemoStartedAt] = useState(null);

  const goHomeAll = useCallback(() => {
    setActive(null);
    setSheet(null);
    setShowMobApps(false);
  }, []);

  const startDemo = useCallback(() => {
    setDemoStartedAt(Date.now());
    setDemoStepIdx(0);
    play("appOpen");
  }, []);

  const stopDemo = useCallback(() => {
    setDemoStepIdx(-1);
    setDemoStartedAt(null);
    // Close every app the demo opened so the user lands cleanly on home.
    for (const step of DEMO_STEPS) {
      if (step.app) setOpen((o) => o.filter((x) => x !== step.app));
    }
    goHomeAll();
  }, [goHomeAll]);

  // Drive the demo: step → openApp/goHome on enter, advance after duration.
  useEffect(() => {
    if (demoStepIdx < 0) return;
    if (demoStepIdx >= DEMO_STEPS.length) {
      stopDemo();
      return;
    }
    const step = DEMO_STEPS[demoStepIdx];
    if (step.app) {
      openApp(step.app);
    } else {
      goHomeAll();
    }
    const t = setTimeout(() => {
      if (step.app) {
        setOpen((o) => o.filter((x) => x !== step.app));
        if (active === step.app) setActive(null);
        if (sheet === step.app) setSheet(null);
      }
      setDemoStepIdx((s) => s + 1);
    }, step.duration);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoStepIdx]);

  const demoCtl = useMemo(
    () => ({ stepIdx: demoStepIdx, startedAt: demoStartedAt, start: startDemo, stop: stopDemo }),
    [demoStepIdx, demoStartedAt, startDemo, stopDemo]
  );

  const swL = () => {
    if (!open.length) return;
    const ni = (sheetIdx + 1) % open.length;
    setSheet(open[ni]);
    setSheetIdx(ni);
    setActive(open[ni]);
  };
  const swR = () => {
    if (!open.length) return;
    const ni = (sheetIdx - 1 + open.length) % open.length;
    setSheet(open[ni]);
    setSheetIdx(ni);
    setActive(open[ni]);
  };
  const sw = useSwipe(swL, swR);

  const topH = vp.mob ? 44 : 36;
  const acc = settings.accent;

  const ctxVal = { sys, sysHist, settings, setSetting, T, isDark };

  // Use dvh on mobile to account for browser chrome (URL bar), fallback to vh
  const fullH = vp.mob ? "100dvh" : "100vh";

  if (phase === "boot")
    return (
      <div style={{ width: "100%", height: fullH }}>
        <BootScreen line={bl} vp={vp} />
      </div>
    );
  if (phase === "lock")
    return (
      <div style={{ width: "100%", height: fullH }}>
        <LockScreen
          user="tommy"
          onUnlock={() => {
            play("appOpen");
            setPhase("desktop");
          }}
        />
      </div>
    );

  return (
    <Ctx.Provider value={ctxVal}>
      <div
        style={{
          width: "100%",
          height: fullH,
          background: T.bg,
          overflow: "hidden",
          fontFamily: mono,
          position: "relative",
          filter: settings.brightness < 1 ? `brightness(${settings.brightness})` : undefined,
          // Resolution picker: invert the slider value so 0.75 ("Larger Text") → 1.33×
          // visual zoom, 1.3 ("More Space") → 0.77× visual zoom. Uses CSS `zoom`
          // (well supported in Chrome/Safari/Firefox 126+) so layout/viewport math
          // stays correct, unlike a manual transform+width compensation.
          zoom: settings.zoom !== 1 ? 1 / settings.zoom : undefined,
          transition: "filter 0.3s, background 0.4s",
        }}
      >
        {/* Wallpaper — animated gradient mesh */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `radial-gradient(ellipse at 10% 90%,${acc}${T.wallAccent} 0%,transparent 40%),radial-gradient(ellipse at 90% 10%,rgba(168,85,247,${T.wallPurple}) 0%,transparent 40%),radial-gradient(circle,${T.wallDot} 1px,transparent 1px)`,
              backgroundSize: "100% 100%,100% 100%,28px 28px",
              transition: "all 0.4s",
            }}
          />
          {/* Subtle animated orbs */}
          <div
            className="thox-wallpaper-orb1"
            style={{
              position: "absolute",
              width: "40vmax",
              height: "40vmax",
              borderRadius: "50%",
              background: `radial-gradient(circle,${acc}${isDark ? "06" : "08"} 0%,transparent 70%)`,
              top: "20%",
              left: "-10%",
              animation: "thox-float1 25s ease-in-out infinite",
              willChange: "transform",
            }}
          />
          <div
            className="thox-wallpaper-orb2"
            style={{
              position: "absolute",
              width: "35vmax",
              height: "35vmax",
              borderRadius: "50%",
              background: `radial-gradient(circle,rgba(168,85,247,${isDark ? "0.04" : "0.05"}) 0%,transparent 70%)`,
              bottom: "10%",
              right: "-5%",
              animation: "thox-float2 30s ease-in-out infinite",
              willChange: "transform",
            }}
          />
          <div
            className="thox-wallpaper-orb3"
            style={{
              position: "absolute",
              width: "25vmax",
              height: "25vmax",
              borderRadius: "50%",
              background: `radial-gradient(circle,rgba(59,130,246,${isDark ? "0.03" : "0.04"}) 0%,transparent 70%)`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              animation: "thox-float3 20s ease-in-out infinite",
              willChange: "transform",
            }}
          />
        </div>

        {/* Top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: topH,
            background: isDark ? "rgba(9,9,11,0.85)" : T.surface,
            borderBottom: `1px solid ${T.border}`,
            display: "flex",
            alignItems: "center",
            padding: `0 ${vp.mob ? 12 : 14}px`,
            zIndex: 9999,
            gap: vp.mob ? 7 : 10,
            overflow: "hidden",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            transition: "background 0.4s, border-color 0.4s",
            fontFamily: "var(--thox-font-sans)",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "var(--accent-h)",
              fontWeight: 700,
              fontSize: vp.mob ? 14 : 13,
              letterSpacing: -0.2,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{ display: "inline-grid", placeItems: "center", color: "var(--accent-h)" }}
            >
              <svg
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
              </svg>
            </span>
            <span>
              Thox<span style={{ color: T.text }}>OS</span>
            </span>
          </span>
          {!vp.mob && (
            <>
              <span
                style={{
                  marginLeft: 2,
                  padding: "1px 8px",
                  borderRadius: 999,
                  background: "rgba(16,185,129,0.10)",
                  color: "var(--accent-h)",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: 0.2,
                  fontFamily: "var(--thox-font-mono)",
                }}
              >
                Sandbox
              </span>
              <span
                style={{
                  color: T.textInvis,
                  fontSize: 10,
                  marginLeft: 4,
                  fontFamily: "var(--thox-font-mono)",
                }}
              >
                v6.0
              </span>
            </>
          )}
          {/* Functional menu items (desktop only) */}
          {vp.desk &&
            [
              { id: "thox", label: active ? APPS[active].label : "ThoxOS", accent: true },
              { id: "apps", label: "Apps" },
              { id: "view", label: "View" },
              { id: "window", label: "Window" },
              { id: "help", label: "Help" },
            ].map((m) => (
              <div
                key={m.id}
                style={{ position: "relative", height: "100%", display: "inline-flex" }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu((o) => (o === m.id ? null : m.id));
                  }}
                  style={{
                    height: "100%",
                    padding: "0 10px",
                    background: openMenu === m.id ? "rgba(16,185,129,0.10)" : "transparent",
                    color: m.accent ? "var(--accent-h)" : T.textSub,
                    border: 0,
                    fontSize: 12,
                    fontWeight: m.accent ? 600 : 500,
                    cursor: "pointer",
                    fontFamily: "var(--thox-font-sans)",
                    letterSpacing: 0.02,
                  }}
                >
                  {m.label}
                </button>
                {openMenu === m.id && (
                  <div
                    className="thox-menu-pop"
                    style={{ left: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {m.id === "thox" && (
                      <>
                        <button
                          type="button"
                          className="thox-menu-row"
                          onClick={() => {
                            openApp("info");
                            setOpenMenu(null);
                          }}
                        >
                          <span className="left">About ThoxOS</span>
                        </button>
                        <div className="thox-menu-sep" />
                        <button
                          type="button"
                          className="thox-menu-row"
                          onClick={() => {
                            setSpotlightOpen(true);
                            setOpenMenu(null);
                          }}
                        >
                          <span className="left">Spotlight…</span>
                          <kbd>⌘K</kbd>
                        </button>
                        <button
                          type="button"
                          className="thox-menu-row"
                          onClick={() => {
                            openApp("settings");
                            setOpenMenu(null);
                          }}
                        >
                          <span className="left">Settings</span>
                        </button>
                        <div className="thox-menu-sep" />
                        <button
                          type="button"
                          className="thox-menu-row"
                          onClick={() => {
                            setPhase("lock");
                            setOpenMenu(null);
                          }}
                        >
                          <span className="left">Lock screen</span>
                        </button>
                      </>
                    )}
                    {m.id === "apps" && (
                      <>
                        {AL.map((a) => (
                          <button
                            type="button"
                            key={a.id}
                            className="thox-menu-row"
                            onClick={() => {
                              openApp(a.id);
                              setOpenMenu(null);
                            }}
                          >
                            <span className="left">
                              <span className="ic" style={{ color: a.color }}>
                                {a.icon}
                              </span>
                              {a.label}
                            </span>
                            {open.includes(a.id) && (
                              <span
                                style={{
                                  fontSize: 9,
                                  color: "var(--accent-h)",
                                  fontFamily: "var(--thox-font-mono)",
                                  letterSpacing: "0.06em",
                                }}
                              >
                                OPEN
                              </span>
                            )}
                          </button>
                        ))}
                      </>
                    )}
                    {m.id === "view" && (
                      <>
                        <button
                          type="button"
                          className={"thox-menu-row" + (open.length === 0 ? " disabled" : "")}
                          onClick={() => {
                            if (!open.length) return;
                            // Tile windows roughly via a grid layout
                            const dH = vp.h - topH - 80;
                            const cols = Math.ceil(Math.sqrt(open.length));
                            const rows = Math.ceil(open.length / cols);
                            const cw = Math.floor(vp.w / cols) - 12;
                            const ch = Math.floor(dH / rows) - 12;
                            // Just refocus all open windows top-most; full tiling would need
                            // direct setPos hooks per-window, so for now we just bring them all up.
                            open.forEach((id, i) => focusWin(id));
                            setOpenMenu(null);
                          }}
                        >
                          <span className="left">Bring all to front</span>
                          <kbd>⌘`</kbd>
                        </button>
                        <button
                          type="button"
                          className={"thox-menu-row" + (open.length === 0 ? " disabled" : "")}
                          onClick={() => {
                            // Close all windows
                            open.forEach((id) => closeApp(id));
                            setOpenMenu(null);
                          }}
                        >
                          <span className="left">Close all windows</span>
                          <kbd>⇧⌘W</kbd>
                        </button>
                        <div className="thox-menu-sep" />
                        <button
                          type="button"
                          className="thox-menu-row"
                          onClick={() => {
                            setSetting("theme", isDark ? "light" : "dark");
                            setOpenMenu(null);
                          }}
                        >
                          <span className="left">Toggle theme</span>
                          <kbd>{isDark ? "Light" : "Dark"}</kbd>
                        </button>
                        <button
                          type="button"
                          className="thox-menu-row"
                          onClick={() => {
                            setSetting("notifs", !settings.notifs);
                            setOpenMenu(null);
                          }}
                        >
                          <span className="left">Notifications</span>
                          <kbd>{settings.notifs ? "ON" : "OFF"}</kbd>
                        </button>
                      </>
                    )}
                    {m.id === "window" && (
                      <>
                        {open.length === 0 && (
                          <div className="thox-menu-row disabled">
                            <span className="left">No open windows</span>
                          </div>
                        )}
                        {open.map((id) => (
                          <button
                            type="button"
                            key={id}
                            className="thox-menu-row"
                            onClick={() => {
                              focusWin(id);
                              setOpenMenu(null);
                            }}
                          >
                            <span className="left">
                              <span className="ic" style={{ color: APPS[id].color }}>
                                {APPS[id].icon}
                              </span>
                              {APPS[id].label}
                            </span>
                            {active === id && (
                              <span
                                style={{
                                  fontSize: 11,
                                  color: "var(--accent-h)",
                                }}
                              >
                                ✓
                              </span>
                            )}
                          </button>
                        ))}
                      </>
                    )}
                    {m.id === "help" && (
                      <>
                        <button
                          type="button"
                          className="thox-menu-row"
                          onClick={() => {
                            setSpotlightOpen(true);
                            setOpenMenu(null);
                          }}
                        >
                          <span className="left">Spotlight search</span>
                          <kbd>⌘K</kbd>
                        </button>
                        <div className="thox-menu-sep" />
                        <button
                          type="button"
                          className="thox-menu-row"
                          onClick={() => {
                            window.open("https://thox.ai", "_blank", "noopener,noreferrer");
                            setOpenMenu(null);
                          }}
                        >
                          <span className="left">thox.ai</span>
                        </button>
                        <button
                          type="button"
                          className="thox-menu-row"
                          onClick={() => {
                            window.open(
                              "https://github.com/ttracx/thoxos-sandbox",
                              "_blank",
                              "noopener,noreferrer"
                            );
                            setOpenMenu(null);
                          }}
                        >
                          <span className="left">GitHub</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          <div style={{ flex: 1 }} />
          {/* Live telemetry chips */}
          {!vp.mob && (
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginRight: 6 }}>
              <span className="thox-tray-chip" title={`GPU ${sys.gpu.toFixed(0)}%`}>
                <span className="led" /> GPU {sys.gpu.toFixed(0)}%
              </span>
              <span className="thox-tray-chip" title={`Throughput ${sys.toks} tok/s`}>
                <span className="led" /> {sys.toks} t/s
              </span>
              <span className="thox-tray-chip" title="MagStack Raft consensus">
                <span className="led amber" /> RAFT 4/4
              </span>
            </div>
          )}
          {!vp.mob &&
            open.slice(0, vp.tab ? 3 : 4).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  if (vp.tab) setActive(id);
                  else focusWin(id);
                }}
                title={APPS[id].label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "2px 9px",
                  background: active === id ? "rgba(16,185,129,0.10)" : "transparent",
                  border: `1px solid ${active === id ? "rgba(16,185,129,0.35)" : "transparent"}`,
                  borderRadius: 999,
                  cursor: "pointer",
                  fontSize: 11,
                  color: active === id ? "var(--accent-h)" : T.textSub,
                  fontFamily: "var(--thox-font-sans)",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: APPS[id].color }}>{APPS[id].icon}</span>
                <span>{APPS[id].label}</span>
              </button>
            ))}
          {/* Search affordance — opens Spotlight (Cmd+K) */}
          {!vp.mob && (
            <button
              type="button"
              onClick={() => setSpotlightOpen(true)}
              title="Search apps · ⌘K"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "3px 8px",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--thox-radius-sm)",
                color: "var(--fg-3)",
                fontFamily: "var(--thox-font-sans)",
                fontSize: 11,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-strong)";
                e.currentTarget.style.color = "var(--fg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--fg-3)";
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="11"
                height="11"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <span>Search</span>
              <kbd
                style={{
                  fontFamily: "var(--thox-font-mono)",
                  fontSize: 9,
                  padding: "1px 5px",
                  background: "#000",
                  border: "1px solid var(--border)",
                  borderRadius: 3,
                  color: "var(--fg-3)",
                  letterSpacing: "0.04em",
                }}
              >
                ⌘K
              </kbd>
            </button>
          )}
          <div style={{ width: 1, height: 12, background: T.textInvis, flexShrink: 0 }} />
          {/* Theme toggle */}
          <div
            onClick={() => {
              setSetting("theme", isDark ? "light" : "dark");
              play("toggle");
            }}
            style={{
              cursor: "pointer",
              padding: "1px 3px",
              fontSize: 12,
              color: isDark ? "#f59e0b" : "#3b82f6",
              transition: "color 0.2s",
            }}
            title={isDark ? "Switch to light" : "Switch to dark"}
          >
            {isDark ? "☀" : "☽"}
          </div>
          <div
            onClick={() => {
              const next = !settings.sound;
              setSetting("sound", next);
              if (next) play("toggle");
            }}
            style={{
              cursor: "pointer",
              padding: "1px 3px",
              fontSize: 12,
              color: settings.sound ? "#34d399" : T.textGhost,
              transition: "color 0.2s",
            }}
            title={settings.sound ? "Sound on" : "Sound off"}
          >
            {settings.sound ? "🔊" : "🔇"}
          </div>
          <div
            onClick={() => setShowN((v) => !v)}
            style={{ position: "relative", cursor: "pointer", padding: "1px 3px" }}
          >
            <span style={{ color: notifs.length > 0 ? "#f59e0b" : T.textInvis, fontSize: 12 }}>
              🔔
            </span>
            {notifs.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: -1,
                  right: -1,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#ef4444",
                  border: `1px solid ${T.bg}`,
                }}
              />
            )}
          </div>
          <div style={{ width: 1, height: 12, background: T.textInvis, flexShrink: 0 }} />
          <span style={{ color: T.textInvis, fontSize: vp.mob ? 11 : 9, whiteSpace: "nowrap" }}>
            {vp.mob
              ? time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              : time.toLocaleTimeString()}
          </span>
        </div>

        {/* Notification center */}
        {showN && (
          <div
            style={{
              position: "absolute",
              top: topH + 4,
              right: 12,
              width: 268,
              background: isDark ? "rgba(7,7,16,0.98)" : "rgba(255,255,255,0.98)",
              border: `1px solid ${T.borderSub}`,
              borderRadius: 10,
              zIndex: 99998,
              boxShadow: isDark ? "0 20px 60px rgba(0,0,0,0.7)" : "0 20px 60px rgba(0,0,0,0.15)",
              overflow: "hidden",
              fontFamily: mono,
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                padding: "7px 12px",
                borderBottom: `1px solid ${T.borderSub}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ color: T.text, fontSize: 10, fontWeight: 600 }}>
                Notifications{" "}
                {notifs.length > 0 && (
                  <span style={{ color: "#ef4444", fontSize: 8 }}>({notifs.length})</span>
                )}
              </span>
              <div style={{ display: "flex", gap: 10 }}>
                <span
                  onClick={() => setNotifs([])}
                  style={{ color: T.textGhost, fontSize: 9, cursor: "pointer" }}
                >
                  Clear
                </span>
                <span
                  onClick={() => setShowN(false)}
                  style={{ color: T.textGhost, fontSize: 13, cursor: "pointer" }}
                >
                  ×
                </span>
              </div>
            </div>
            <div style={{ maxHeight: 270, overflowY: "auto" }}>
              {notifs.length === 0 && (
                <div
                  style={{ padding: "16px", color: T.textGhost, fontSize: 9, textAlign: "center" }}
                >
                  No notifications
                </div>
              )}
              {notifs.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: "7px 12px",
                    borderBottom: `1px solid ${isDark ? "#0a0f16" : "#f1f5f9"}`,
                    display: "flex",
                    gap: 7,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      background: `${n.color}14`,
                      border: `1px solid ${n.color}28`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      color: n.color,
                      flexShrink: 0,
                    }}
                  >
                    {n.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: T.text, fontSize: 9, fontWeight: 600 }}>{n.title}</div>
                    <div style={{ color: T.textDim, fontSize: 8, lineHeight: 1.4 }}>{n.body}</div>
                  </div>
                  <div
                    onClick={() => setNotifs((ns) => ns.filter((x) => x.id !== n.id))}
                    style={{ color: T.textGhost, fontSize: 12, cursor: "pointer", flexShrink: 0 }}
                  >
                    ×
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && !showN && (
          <div
            style={{
              position: "absolute",
              top: topH + 8,
              right: 12,
              maxWidth: 255,
              background: `${toast.color}12`,
              border: `1px solid ${toast.color}28`,
              borderRadius: 8,
              padding: "6px 10px",
              zIndex: 99997,
              display: "flex",
              gap: 7,
              alignItems: "flex-start",
              animation: "si 0.2s ease",
            }}
          >
            <span style={{ color: toast.color, fontSize: 11, flexShrink: 0 }}>{toast.icon}</span>
            <div>
              <div style={{ color: "#fafafa", fontSize: 9, fontWeight: 600 }}>{toast.title}</div>
              <div style={{ color: "#6b7280", fontSize: 8, marginTop: 1 }}>{toast.body}</div>
            </div>
          </div>
        )}

        {/* Demo Mode HUD — visible while a demo is running, regardless of which
            app is currently in the foreground. Click the dot to stop. */}
        {demoStepIdx >= 0 && demoStepIdx < DEMO_STEPS.length && (
          <div
            onClick={stopDemo}
            title="Click to stop demo"
            style={{
              position: "absolute",
              top: topH + 8,
              left: 12,
              zIndex: 99996,
              padding: "5px 10px",
              borderRadius: 999,
              background: "rgba(251,191,36,0.10)",
              border: "1px solid #fbbf24",
              fontFamily: mono,
              color: "#fbbf24",
              fontSize: 9,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
              boxShadow: "0 0 14px rgba(251,191,36,0.25)",
              backdropFilter: "blur(6px)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#fbbf24",
                boxShadow: "0 0 6px #fbbf24",
                animation: "blink 1.2s infinite",
              }}
            />
            <span>DEMO · {DEMO_STEPS[demoStepIdx].label}</span>
            <span style={{ color: "#92670a", fontSize: 8 }}>
              {demoStepIdx + 1}/{DEMO_STEPS.length}
            </span>
            <span
              style={{
                marginLeft: 4,
                padding: "1px 5px",
                borderRadius: 3,
                border: "1px solid #fbbf24",
                color: "#fbbf24",
                fontSize: 7,
              }}
            >
              STOP
            </span>
          </div>
        )}

        {/* ═══ DESKTOP ═══ */}
        {vp.desk && (
          <>
            <div style={{ position: "absolute", inset: `${topH}px 0 72px 0`, overflow: "hidden" }}>
              {open.map((id) => (
                <Win
                  key={id}
                  id={id}
                  onClose={closeApp}
                  onFocus={focusWin}
                  zIndex={zM[id] || 100}
                  vp={vp}
                  snap={settings.snap}
                  T={T}
                  isDark={isDark}
                  demoCtl={demoCtl}
                />
              ))}
              {open.length === 0 && (
                <div className="thox-empty-hero" style={{ fontFamily: "var(--thox-font-sans)" }}>
                  <div className="thox-hero-glyph">
                    <ChipGlyph size={120} />
                  </div>
                  <div className="thox-hero-name">
                    Thox<b>OS</b>
                  </div>
                  <div className="thox-hero-status">
                    <span className="led" /> Status: Ready
                  </div>
                  <div className="thox-hero-tele">{STATUS_LINES[statusLineIdx].text}</div>
                  <div className="thox-hero-hint">
                    Press <kbd>⌘K</kbd> to search apps
                  </div>
                </div>
              )}
            </div>
            {/* Dock — floating glassy pill, hover tooltips, emerald active underline */}
            <div className="thox-dock-wrap">
              <div className="thox-dock" role="toolbar" aria-label="Application dock">
                {AL.map((app) => {
                  const isOpen = open.includes(app.id);
                  const isActive = active === app.id;
                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => openApp(app.id)}
                      onMouseEnter={() => play("hover")}
                      title={app.label}
                      aria-label={app.label}
                      className={`thox-dock-app${isOpen ? " running" : ""}${isActive ? " focused" : ""}`}
                    >
                      <span
                        className="icon"
                        style={{ color: isOpen ? "var(--accent-h)" : "var(--fg-2)" }}
                      >
                        {app.icon}
                      </span>
                      <span className="ttip">{app.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* ═══ TABLET ═══ */}
        {vp.tab && (
          <div style={{ position: "absolute", inset: `${topH}px 0 0 0`, display: "flex" }}>
            <div
              style={{
                width: 56,
                background: T.surface,
                borderRight: `1px solid ${T.border}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "7px 0",
                gap: 4,
                flexShrink: 0,
                overflowY: "auto",
                transition: "background 0.4s",
              }}
            >
              {AL.map((a) => {
                const isOpen = open.includes(a.id),
                  isAct = active === a.id;
                return (
                  <div
                    key={a.id}
                    onClick={() => openApp(a.id)}
                    title={a.label}
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 9,
                      background: isAct ? `${a.color}18` : T.cardBg,
                      border: `1px solid ${isAct ? a.color : isOpen ? a.color + "44" : T.textInvis}`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      gap: 2,
                      boxShadow: isAct ? `0 0 10px ${a.color}44` : "none",
                      transition: "all 0.13s",
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 13, color: a.color }}>{a.icon}</span>
                    {isOpen && (
                      <div
                        style={{ width: 3, height: 3, borderRadius: "50%", background: a.color }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <div
              style={{
                flex: 1,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
              }}
            >
              {active ? (
                <>
                  <div
                    style={{
                      height: 34,
                      background: T.winChrome,
                      borderBottom: `1px solid ${APPS[active].color}28`,
                      display: "flex",
                      alignItems: "center",
                      padding: "0 12px",
                      gap: 7,
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ color: APPS[active].color, fontSize: 13 }}>
                      {APPS[active].icon}
                    </span>
                    <span style={{ color: T.text, fontSize: 11, fontWeight: 600, flex: 1 }}>
                      {APPS[active].label}
                    </span>
                    <div
                      onClick={() => closeApp(active)}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "#ef4444",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      ×
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      minHeight: 0,
                    }}
                  >
                    <AppContent
                      id={active}
                      openApp={openApp}
                      closeApp={closeApp}
                      goHome={() => setActive(null)}
                      demo={demoCtl}
                    />
                  </div>
                </>
              ) : (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      color: acc,
                      fontSize: 18,
                      fontWeight: 800,
                      letterSpacing: 2,
                      opacity: isDark ? 0.1 : 0.15,
                    }}
                  >
                    THOXOS
                  </div>
                  <div style={{ color: T.textNear, fontSize: 9 }}>Select an app ←</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══ MOBILE ═══ */}
        {vp.mob && (
          <>
            {/* Mobile Home Screen — matches device rendering */}
            {!sheet && !showMobApps && (
              <div
                style={{
                  position: "absolute",
                  inset: `${topH}px 0 0 0`,
                  overflowY: "auto",
                  padding: "0 16px",
                  background: "#000",
                  backgroundImage:
                    "radial-gradient(ellipse at 50% 30%, rgba(16,185,129,0.03) 0%, transparent 70%)",
                }}
              >
                {/* Logo Area */}
                <div style={{ textAlign: "center", paddingTop: 28, marginBottom: 20 }}>
                  {/* Emerald chip icon */}
                  <div style={{ display: "inline-block", marginBottom: 14 }}>
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 120 120"
                      style={{ filter: "drop-shadow(0 0 30px rgba(16,185,129,0.4))" }}
                    >
                      <defs>
                        <linearGradient id="chipGrad" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#00ff88" />
                        </linearGradient>
                      </defs>
                      <rect
                        x="20"
                        y="20"
                        width="80"
                        height="80"
                        rx="14"
                        fill="#0d1117"
                        stroke="url(#chipGrad)"
                        strokeWidth="2"
                      />
                      {/* Circuit traces */}
                      {[32, 44, 56, 68, 80].map((y) => (
                        <line
                          key={`h${y}`}
                          x1="28"
                          y1={y}
                          x2="92"
                          y2={y}
                          stroke="#10b981"
                          strokeWidth="0.5"
                          opacity="0.2"
                        />
                      ))}
                      {[32, 44, 56, 68, 80].map((x) => (
                        <line
                          key={`v${x}`}
                          x1={x}
                          y1="28"
                          x2={x}
                          y2="92"
                          stroke="#10b981"
                          strokeWidth="0.5"
                          opacity="0.2"
                        />
                      ))}
                      {/* Center chip */}
                      <rect
                        x="40"
                        y="40"
                        width="40"
                        height="40"
                        rx="6"
                        fill="#10b981"
                        opacity="0.15"
                      />
                      <rect
                        x="44"
                        y="44"
                        width="32"
                        height="32"
                        rx="4"
                        fill="#0d1117"
                        stroke="#10b981"
                        strokeWidth="1.5"
                      />
                      {/* Pin connectors */}
                      {[35, 50, 65, 80].map((y) => (
                        <>
                          <rect
                            key={`l${y}`}
                            x="8"
                            y={y - 2}
                            width="12"
                            height="4"
                            rx="1"
                            fill="#10b981"
                            opacity="0.3"
                          />
                          <rect
                            key={`r${y}`}
                            x="100"
                            y={y - 2}
                            width="12"
                            height="4"
                            rx="1"
                            fill="#10b981"
                            opacity="0.3"
                          />
                        </>
                      ))}
                      {[35, 50, 65, 80].map((x) => (
                        <>
                          <rect
                            key={`t${x}`}
                            x={x - 2}
                            y="8"
                            width="4"
                            height="12"
                            rx="1"
                            fill="#10b981"
                            opacity="0.3"
                          />
                          <rect
                            key={`b${x}`}
                            x={x - 2}
                            y="100"
                            width="4"
                            height="12"
                            rx="1"
                            fill="#10b981"
                            opacity="0.3"
                          />
                        </>
                      ))}
                    </svg>
                  </div>
                  {/* Title */}
                  <div
                    style={{
                      fontFamily: "var(--thox-font-sans)",
                      fontWeight: 700,
                      fontSize: 36,
                      color: "var(--fg)",
                      letterSpacing: -1,
                      marginBottom: 6,
                    }}
                  >
                    Thox<span style={{ color: "var(--accent-h)" }}>OS</span>
                  </div>
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      color: "var(--accent-h)",
                      fontSize: 13,
                      fontFamily: "var(--thox-font-sans)",
                      fontWeight: 500,
                    }}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "var(--accent-h)",
                        boxShadow: "0 0 10px var(--accent-h)",
                        animation: "thox-pulse 1.6s ease-in-out infinite",
                      }}
                    />
                    Status: Ready
                  </div>
                </div>

                {/* Status Tiles — 2 rows of 3 */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 10,
                    marginBottom: 20,
                  }}
                >
                  {[
                    {
                      icon: "◉",
                      label: "Connected",
                      sublabel: "WiFi",
                      color: "#10b981",
                      link: null,
                      dot: true,
                    },
                    {
                      icon: "⬡",
                      label: "Sub Units: 3",
                      sublabel: "MagStack",
                      color: "#a855f7",
                      link: "magstack",
                    },
                    {
                      icon: "◎",
                      label: "Active",
                      sublabel: "System",
                      color: "#10b981",
                      link: null,
                    },
                    {
                      icon: "◈",
                      label: "Analytics",
                      sublabel: "GPU",
                      color: "#10b981",
                      link: "dashboard",
                    },
                    {
                      icon: "📦",
                      label: "Firmware",
                      sublabel: "OTA",
                      color: "#10b981",
                      link: "ota",
                    },
                    {
                      icon: "⚙",
                      label: "Settings",
                      sublabel: "",
                      color: "#10b981",
                      link: "settings",
                    },
                  ].map((tile, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        if (tile.link) openApp(tile.link);
                      }}
                      style={{
                        background: "var(--surface)",
                        borderRadius: 14,
                        padding: "16px 8px",
                        textAlign: "center",
                        border: "1px solid var(--border)",
                        cursor: tile.link ? "pointer" : "default",
                        transition: "border-color 0.2s, background 0.2s",
                        WebkitTapHighlightColor: "transparent",
                      }}
                      onTouchStart={(e) => {
                        if (tile.link) {
                          e.currentTarget.style.borderColor = "rgba(16,185,129,0.45)";
                          e.currentTarget.style.background = "var(--surface-2)";
                        }
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.background = "var(--surface)";
                      }}
                    >
                      <div
                        style={{
                          fontSize: 22,
                          color: tile.color,
                          marginBottom: 6,
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        {tile.icon}
                        {tile.dot && (
                          <div
                            style={{
                              position: "absolute",
                              top: -2,
                              right: -6,
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "var(--accent-h)",
                              boxShadow: "0 0 6px var(--accent-h)",
                            }}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          color: "var(--fg)",
                          fontSize: 11,
                          fontWeight: 600,
                          fontFamily: "var(--thox-font-sans)",
                        }}
                      >
                        {tile.label}
                      </div>
                      {tile.sublabel && (
                        <div
                          style={{
                            color: "var(--fg-3)",
                            fontSize: 9,
                            marginTop: 2,
                            fontFamily: "var(--thox-font-mono)",
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                          }}
                        >
                          {tile.sublabel}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* System Tools Button */}
                <button
                  type="button"
                  onClick={() => setShowMobApps(true)}
                  className="thox-btn primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "14px 0",
                    borderRadius: 12,
                    fontSize: 15,
                    marginBottom: 16,
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  System Tools
                </button>

                {/* Cycling status bar */}
                <div
                  style={{
                    padding: "9px 11px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 9,
                    fontSize: 8,
                    color: T.textGhost,
                    textAlign: "center",
                    transition: "opacity 0.3s",
                  }}
                >
                  <span style={{ color: STATUS_LINES[statusLineIdx].color, fontWeight: 700 }}>
                    {STATUS_LINES[statusLineIdx].icon}
                  </span>{" "}
                  <span style={{ color: "#9ca3af" }}>{STATUS_LINES[statusLineIdx].text}</span>
                </div>

                {/* Footer */}
                <div
                  style={{
                    textAlign: "center",
                    padding: "16px 0 24px",
                    color: "#374151",
                    fontSize: 7,
                    letterSpacing: 1,
                  }}
                >
                  THOX.AI LLC · CONFIDENTIAL
                </div>
              </div>
            )}

            {/* Mobile App Grid (after tapping System Tools) */}
            {!sheet && showMobApps && (
              <div
                style={{
                  position: "absolute",
                  inset: `${topH}px 0 0 0`,
                  overflowY: "auto",
                  padding: "12px 14px",
                  background: "#000",
                  animation: "mobSlideUp 0.3s ease",
                }}
              >
                <div
                  onClick={() => setShowMobApps(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 14,
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <span style={{ color: "#10b981", fontSize: 14 }}>←</span>
                  <span style={{ color: "#10b981", fontSize: 11, fontWeight: 600 }}>Home</span>
                </div>
                <div
                  style={{
                    color: "#9ca3af",
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: 0.8,
                    marginBottom: 10,
                  }}
                >
                  SYSTEM TOOLS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
                  {AL.map((app, i) => (
                    <div
                      key={app.id}
                      onClick={() => openApp(app.id)}
                      style={{
                        background: "#111827",
                        border: `1px solid ${app.color}22`,
                        borderRadius: 12,
                        padding: "13px 4px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 5,
                        cursor: "pointer",
                        WebkitTapHighlightColor: "transparent",
                        transition: "all 0.2s",
                        animationDelay: `${i * 30}ms`,
                      }}
                      onTouchStart={(e) => {
                        e.currentTarget.style.transform = "scale(0.91)";
                        e.currentTarget.style.background = `${app.color}18`;
                      }}
                      onTouchEnd={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.background = "#111827";
                      }}
                    >
                      <div style={{ fontSize: 22, color: app.color }}>{app.icon}</div>
                      <span style={{ fontSize: 7, color: "#6b7280", textAlign: "center" }}>
                        {app.short}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Cycling status */}
                <div
                  style={{
                    marginTop: 14,
                    padding: "9px 11px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: 9,
                    fontSize: 8,
                    textAlign: "center",
                  }}
                >
                  <span style={{ color: STATUS_LINES[statusLineIdx].color, fontWeight: 700 }}>
                    {STATUS_LINES[statusLineIdx].icon}
                  </span>{" "}
                  <span style={{ color: "#9ca3af" }}>{STATUS_LINES[statusLineIdx].text}</span>
                </div>
              </div>
            )}

            {/* Mobile App Sheet */}
            {sheet && (
              <div
                {...sw}
                style={{
                  position: "absolute",
                  inset: `${topH}px 0 0 0`,
                  background: T.appBg,
                  zIndex: 200,
                  display: "flex",
                  flexDirection: "column",
                  touchAction: "pan-y",
                  transition: "background 0.4s",
                }}
              >
                <div
                  style={{
                    height: 40,
                    background: T.winChrome,
                    borderBottom: `1px solid ${APPS[sheet].color}38`,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    gap: 8,
                    flexShrink: 0,
                  }}
                >
                  <span style={{ color: APPS[sheet].color, fontSize: 14, fontWeight: 700 }}>
                    {APPS[sheet].icon}
                  </span>
                  <span style={{ color: T.text, fontSize: 12, fontWeight: 600, flex: 1 }}>
                    {APPS[sheet].label}
                  </span>
                  {open.length > 1 && (
                    <span style={{ color: T.textInvis, fontSize: 8 }}>
                      {sheetIdx + 1}/{open.length}
                    </span>
                  )}
                  <div
                    onClick={() => {
                      setSheet(null);
                      setShowMobApps(false);
                    }}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      background: isDark ? "#18182a" : "#e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: T.textSub,
                      fontSize: 15,
                      fontWeight: 700,
                    }}
                  >
                    ×
                  </div>
                </div>
                <div
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                  }}
                >
                  <AppContent
                    id={sheet}
                    openApp={openApp}
                    closeApp={closeApp}
                    goHome={() => {
                      setSheet(null);
                      setShowMobApps(false);
                    }}
                    demo={demoCtl}
                  />
                </div>
                {open.length > 1 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 5,
                      padding: "4px 0 calc(4px + env(safe-area-inset-bottom, 0px))",
                      background: isDark ? "rgba(6,6,14,0.9)" : "rgba(248,250,252,0.9)",
                      flexShrink: 0,
                    }}
                  >
                    {open.map((id, i) => (
                      <div
                        key={id}
                        onClick={() => {
                          setSheet(id);
                          setSheetIdx(i);
                          setActive(id);
                        }}
                        style={{
                          width: i === sheetIdx ? 14 : 5,
                          height: 5,
                          borderRadius: 3,
                          background: i === sheetIdx ? APPS[id].color : T.textInvis,
                          transition: "all 0.2s",
                          cursor: "pointer",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Spotlight (Cmd+K) — works on every shell */}
        {spotlightOpen && (
          <Spotlight
            apps={AL}
            onClose={() => setSpotlightOpen(false)}
            onLaunch={(id) => {
              openApp(id);
              setSpotlightOpen(false);
            }}
          />
        )}

        <style>{`@keyframes si{from{transform:translateX(16px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes mobSlideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes thox-float1{0%,100%{transform:translate(0,0) scale(1)}25%{transform:translate(8vw,5vh) scale(1.1)}50%{transform:translate(3vw,10vh) scale(0.95)}75%{transform:translate(-5vw,3vh) scale(1.05)}}@keyframes thox-float2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-6vw,-8vh) scale(1.08)}66%{transform:translate(4vw,-4vh) scale(0.92)}}@keyframes thox-float3{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-45%,-55%) scale(1.15)}}div::-webkit-scrollbar{width:4px;height:0}div::-webkit-scrollbar-track{background:transparent}div::-webkit-scrollbar-thumb{background:#1f2937;border-radius:2px}`}</style>
      </div>
    </Ctx.Provider>
  );
}
