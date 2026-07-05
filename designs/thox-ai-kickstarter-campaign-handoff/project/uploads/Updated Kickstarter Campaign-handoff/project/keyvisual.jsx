/* keyvisual.jsx — THOX.ai Kickstarter project key visual.
   Exports to window: KVScene (16:9), KVSquare (1:1), KVThumb (320x180 scaled).
   Pure composition; no deps beyond React + assets/colors_and_type.css. */

const KV = {
  bg: '#09090B',
  surface: '#161619',
  text: '#E8E8EC',
  muted: '#A6A6B0',
  faint: '#7A7A85',
  emerald: '#10B981',
  emeraldBright: '#34D399',
  emeraldDeep: '#0B6E4F',
  emeraldSoft: '#6EE7B7',
  glow: 'rgba(16,185,129,0.22)',
  purple: '#A855F7',
  purpleSoft: '#C084FC',
  display: "'Xolonium','Inter',sans-serif",
  sans: "'Inter',system-ui,sans-serif",
  mono: "'JetBrains Mono',monospace",
  device: 'assets/product/nova-screenglow.png',
  chip: 'assets/logos/thox-icon-green.png',
};

// ---- Logo lockup: chip mark + THOX.ai wordmark -------------------------
function Lockup({ scale = 1 }) {
  const h = 52 * scale;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 * scale }}>
      <img src={KV.chip} alt="THOX chip mark"
        style={{ height: h, width: 'auto', display: 'block',
                 filter: 'drop-shadow(0 0 12px rgba(16,185,129,0.45))' }} />
      <span style={{ fontFamily: KV.display, fontWeight: 700,
                     fontSize: 40 * scale, letterSpacing: '0.01em',
                     lineHeight: 1, whiteSpace: 'nowrap' }}>
        <span style={{ color: KV.emerald }}>THOX</span>
        <span style={{ color: KV.emeraldBright }}>.ai</span>
      </span>
    </div>
  );
}

// ---- Faint connected-node mesh, deep background ------------------------
function MeshBg({ w = 1920, h = 1080 }) {
  // Nodes biased toward the right/center deep field, quiet and out of focus.
  const nodes = [
    [1180, 250], [1340, 180], [1500, 320], [1640, 230], [1760, 400],
    [1280, 430], [1450, 500], [1600, 560], [1740, 640], [1230, 620],
    [1380, 720], [1540, 760], [1680, 840], [1300, 860], [1490, 920],
    [1130, 470], [1620, 130], [1820, 520],
  ];
  const edges = [
    [0,1],[1,2],[2,3],[3,16],[2,4],[4,17],[0,5],[5,6],[6,7],[7,8],
    [5,9],[9,10],[10,11],[11,12],[6,11],[10,13],[13,14],[14,12],
    [0,15],[15,9],[1,4],[7,17],
  ];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h}
      style={{ position: 'absolute', inset: 0, zIndex: 1,
               filter: 'blur(1.2px)', opacity: 0.5 }}>
      <g stroke="rgba(16,185,129,0.22)" strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]}
            x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i % 4 === 0 ? 4 : 2.4}
            fill={i % 4 === 0 ? KV.emeraldBright : KV.emerald}
            opacity={i % 4 === 0 ? 0.55 : 0.32} />
        </g>
      ))}
    </svg>
  );
}

// ---- Restrained MagStack duo hint (only place purple is allowed) -------
// A small, stylized face-to-back coupling motif, low and quiet.
function MagStackHint({ scale = 1, style }) {
  const w = 168 * scale;
  return (
    <div style={{ position: 'absolute', ...style, width: w, opacity: 0.85,
                  filter: 'blur(0.3px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 * scale }}>
        {/* top slab */}
        <div style={{ width: w, height: 30 * scale, borderRadius: 8 * scale,
          background: 'linear-gradient(180deg,#242427,#0e0e10)',
          border: '1px solid rgba(192,132,252,0.35)',
          boxShadow: '0 0 18px rgba(168,85,247,0.22)' }} />
        {/* magnetic coupling line */}
        <div style={{ width: w * 0.72, height: 2 * scale, borderRadius: 2,
          background: 'linear-gradient(90deg,transparent,#C084FC,transparent)',
          boxShadow: '0 0 10px rgba(168,85,247,0.6)' }} />
        {/* bottom slab */}
        <div style={{ width: w, height: 30 * scale, borderRadius: 8 * scale,
          background: 'linear-gradient(180deg,#242427,#0e0e10)',
          border: '1px solid rgba(192,132,252,0.25)',
          boxShadow: '0 0 14px rgba(168,85,247,0.16)' }} />
      </div>
      <div style={{ fontFamily: KV.mono, fontSize: 11 * scale, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: 'rgba(192,132,252,0.7)',
        textAlign: 'center', marginTop: 10 * scale }}>
        MagStack
      </div>
    </div>
  );
}

// ---- The device with glow + ground shadow + reflection -----------------
function Device({ scale = 1, height = 880 }) {
  const h = height * scale;
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column',
                  alignItems: 'center' }}>
      <img src={KV.device} alt="ThoxNova edge AI computer"
        style={{ height: h, width: 'auto', display: 'block',
                 filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.7))' }} />
      {/* reflection */}
      <img src={KV.device} alt="" aria-hidden="true"
        style={{ height: h, width: 'auto', display: 'block',
                 transform: 'scaleY(-1)', marginTop: -2 * scale, opacity: 0.16,
                 WebkitMaskImage: 'linear-gradient(180deg,rgba(0,0,0,0.9),transparent 32%)',
                 maskImage: 'linear-gradient(180deg,rgba(0,0,0,0.9),transparent 32%)' }} />
    </div>
  );
}

// ---- Corner tag --------------------------------------------------------
function FounderTag({ scale = 1, style }) {
  return (
    <div style={{ position: 'absolute', display: 'flex', alignItems: 'center',
                  gap: 9 * scale, ...style }}>
      <span style={{ width: 7 * scale, height: 7 * scale, borderRadius: '50%',
        background: KV.emeraldBright,
        boxShadow: `0 0 10px ${KV.emeraldBright}` }} />
      <span style={{ fontFamily: KV.mono, fontSize: 13 * scale, fontWeight: 500,
        letterSpacing: '0.2em', textTransform: 'uppercase', color: KV.faint }}>
        Founder Reservation Open
      </span>
    </div>
  );
}

// ======================================================================
//  16:9 SCENE  (mode: 'full' shows text, 'plate' is text-free)
// ======================================================================
function KVScene({ mode = 'full' }) {
  const showText = mode !== 'plate';
  return (
    <div style={{ position: 'relative', width: 1920, height: 1080,
      background: KV.bg, overflow: 'hidden', fontFamily: KV.sans,
      color: KV.text }}>

      {/* radial emerald glow behind device, aligned to the glowing screen */}
      <div style={{ position: 'absolute', left: 1394, top: 470,
        width: 1280, height: 1280, transform: 'translate(-50%,-50%)', zIndex: 0,
        background: 'radial-gradient(circle, rgba(16,185,129,0.20) 0%, rgba(16,185,129,0.07) 32%, transparent 62%)' }} />

      <MeshBg />

      {/* device, right two-thirds (positioned by top; reflection flows below) */}
      <div style={{ position: 'absolute', left: 1180, top: 120, zIndex: 3 }}>
        <Device height={824} />
      </div>

      {/* MagStack hint, small and low, in the empty center gap */}
      <MagStackHint scale={0.92} style={{ left: 928, top: 884, zIndex: 2 }} />

      {/* ground anchor shadow under device */}
      <div style={{ position: 'absolute', left: 1175, top: 944, zIndex: 2,
        width: 560, height: 64,
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.75) 0%, transparent 70%)',
        filter: 'blur(6px)' }} />

      {/* left third: text column */}
      {showText && (
        <div style={{ position: 'absolute', left: 120, top: 0, bottom: 0,
          width: 760, zIndex: 4, display: 'flex', flexDirection: 'column',
          justifyContent: 'center', gap: 0 }}>
          <Lockup scale={1} />
          <p style={{ fontFamily: KV.mono, fontSize: 18, fontWeight: 500,
            letterSpacing: '0.32em', textTransform: 'uppercase',
            color: KV.emeraldSoft, margin: '54px 0 22px' }}>
            Privacy First Edge AI
          </p>
          <h1 style={{ fontFamily: KV.display, fontWeight: 700, fontSize: 104,
            lineHeight: 1.04, letterSpacing: '-0.01em', margin: 0,
            color: KV.text }}>
            Your AI.<br />
            <span style={{ color: KV.emeraldBright }}>Your Data.</span><br />
            Your Rules.
          </h1>
          <p style={{ fontFamily: KV.sans, fontSize: 26, lineHeight: 1.45,
            color: KV.muted, margin: '40px 0 0', maxWidth: 600 }}>
            Runs on the device. Your data stays on your devices.
          </p>
        </div>
      )}

      {/* corner tag */}
      {showText && <FounderTag scale={1} style={{ left: 120, bottom: 64 }} />}

      {/* subtle vignette to seat the composition */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
        background: 'radial-gradient(130% 100% at 60% 50%, transparent 55%, rgba(0,0,0,0.45) 100%)' }} />
    </div>
  );
}

// ======================================================================
//  SQUARE 1080x1080  (center-safe social crop)
// ======================================================================
function KVSquare() {
  return (
    <div style={{ position: 'relative', width: 1080, height: 1080,
      background: KV.bg, overflow: 'hidden', fontFamily: KV.sans,
      color: KV.text }}>

      <div style={{ position: 'absolute', left: '50%', top: 360,
        width: 1180, height: 1180, transform: 'translate(-50%,-50%)', zIndex: 0,
        background: 'radial-gradient(circle, rgba(16,185,129,0.20) 0%, rgba(16,185,129,0.06) 34%, transparent 60%)' }} />

      {/* device, centered upper (positioned by top so reflection flows below) */}
      <div style={{ position: 'absolute', left: '50%', top: 66, zIndex: 3,
        transform: 'translateX(-50%)' }}>
        <Device height={636} />
      </div>

      {/* ground shadow */}
      <div style={{ position: 'absolute', left: '50%', top: 704, zIndex: 2,
        width: 480, height: 52, transform: 'translateX(-50%)',
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.7) 0%, transparent 70%)',
        filter: 'blur(6px)' }} />

      {/* text block, lower-center safe */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: 744, zIndex: 4,
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <p style={{ fontFamily: KV.mono, fontSize: 17, fontWeight: 500,
          letterSpacing: '0.3em', textTransform: 'uppercase',
          color: KV.emeraldSoft, margin: '0 0 18px' }}>
          Privacy First Edge AI
        </p>
        <h1 style={{ fontFamily: KV.display, fontWeight: 700, fontSize: 72,
          lineHeight: 1.05, letterSpacing: '-0.01em', margin: 0 }}>
          Your AI. <span style={{ color: KV.emeraldBright }}>Your Data.</span> Your Rules.
        </h1>
        <div style={{ marginTop: 30 }}>
          <Lockup scale={0.82} />
        </div>
      </div>

      <FounderTag scale={0.92} style={{ left: '50%', bottom: 30,
        transform: 'translateX(-50%)', display: 'none' }} />

      <div style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
        background: 'radial-gradient(120% 95% at 50% 42%, transparent 58%, rgba(0,0,0,0.5) 100%)' }} />
    </div>
  );
}

// ======================================================================
//  THUMBNAIL 320x180  (full comp scaled, legibility check)
// ======================================================================
function KVThumb() {
  const s = 320 / 1920; // 0.16667
  return (
    <div style={{ width: 320, height: 180, overflow: 'hidden',
      position: 'relative', background: KV.bg }}>
      <div style={{ width: 1920, height: 1080, transform: `scale(${s})`,
        transformOrigin: 'top left' }}>
        <KVScene mode="full" />
      </div>
    </div>
  );
}

Object.assign(window, { KVScene, KVSquare, KVThumb, Lockup });
