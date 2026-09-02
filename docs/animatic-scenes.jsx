/* THOX.ai KS-FILM-2026 — 90-second animatic.
   Scenes composed on the animations.jsx engine (window globals).
   Wireframe animatic language lifted from Video Storyboard.html:
   gray construction lines, emerald accents, mono labels, Xolonium display. */

const { Stage, Sprite, VideoSprite, useSprite, useTime, useTimeline, Easing, interpolate, animate, clamp } = window;

const C = {
  bg: '#050506', panel: '#0e0e11', surface: '#1A1A1C',
  line: '#4b4b53', line2: '#33333a',
  text: '#fafafa', text2: '#a1a1aa', muted: '#71717a',
  em: '#10b981', emL: '#34d399', neon: '#00ff88', red: '#ef4444',
};
const F = {
  d: "'Xolonium', sans-serif",
  m: "'JetBrains Mono', Consolas, monospace",
  s: "'Inter', system-ui, sans-serif",
};

const pad = (n) => String(n).padStart(2, '0');
// draw progress: eased 0..1 starting at `delay` over `dur`
const dp = (t, delay = 0, dur = 0.7) => Easing.easeOutCubic(clamp((t - delay) / dur, 0, 1));

/* ---------- svg primitives (draw-on via pathLength trick) ---------- */
function Wire({ children, style }) {
  return (
    <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }}>
      {children}
    </svg>
  );
}
const drawStyle = (p) => ({ strokeDasharray: 1, strokeDashoffset: 1 - p });
function P({ d, p = 1, c = C.line, w = 3, fill = 'none', glow, dash }) {
  if (dash) {
    return <path d={d} fill={fill} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"
      strokeDasharray={dash} opacity={p} />;
  }
  return <path d={d} fill={fill} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"
    pathLength={1} style={drawStyle(p)} filter={glow ? 'drop-shadow(0 0 6px rgba(52,211,153,.6))' : undefined} />;
}
function R({ x, y, w, h, rx = 0, p = 1, c = C.line, sw = 3, fill = 'none', dash }) {
  if (dash) {
    return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={c} strokeWidth={sw}
      strokeDasharray={dash} opacity={p} />;
  }
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={c} strokeWidth={sw}
    pathLength={1} style={drawStyle(p)} />;
}
function Ln({ x1, y1, x2, y2, p = 1, c = C.line, w = 3, dash }) {
  if (dash) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={w} strokeLinecap="round"
      strokeDasharray={dash} opacity={p} />;
  }
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={w} strokeLinecap="round"
    pathLength={1} style={drawStyle(p)} />;
}
function Cir({ cx, cy, r, p = 1, c = C.line, w = 3, fill = 'none' }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} stroke={c} strokeWidth={w}
    pathLength={1} style={drawStyle(p)} />;
}
function LED({ x, y, r = 5, t }) {
  const o = 0.55 + 0.45 * Math.sin(t * 4);
  return <circle cx={x} cy={y} r={r} fill={C.emL} opacity={o} filter="drop-shadow(0 0 10px rgba(52,211,153,.9))" />;
}
function T({ x, y, size = 24, c = C.muted, f = F.m, ls = '.18em', o = 1, weight = 500, anchor = 'start', children }) {
  return <text x={x} y={y} fontSize={size} fill={c} fontFamily={f} letterSpacing={ls}
    fontWeight={weight} opacity={o} textAnchor={anchor}>{children}</text>;
}

/* ---------- device silhouettes (geometry from storyboard symbols) ---------- */
function Key({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Cir cx={10} cy={20} r={6} p={dp(t, d)} />
      <R x={20} y={9} w={52} h={22} rx={6} p={dp(t, d + 0.12)} />
      <R x={72} y={14} w={18} h={12} rx={2} p={dp(t, d + 0.24)} />
      <Ln x1={77} y1={17} x2={86} y2={17} p={dp(t, d + 0.36)} c={C.line2} w={2} />
      <Ln x1={77} y1={23} x2={86} y2={23} p={dp(t, d + 0.4)} c={C.line2} w={2} />
      {t > d + 0.7 && <LED x={30} y={20} r={2.4} t={t} />}
    </g>
  );
}
function Air({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={12} y={12} w={76} h={36} rx={9} p={dp(t, d)} />
      <Ln x1={22} y1={22} x2={52} y2={22} p={dp(t, d + 0.2)} c={C.line2} w={2} />
      {t > d + 0.6 && <LED x={78} y={40} r={2.4} t={t} />}
    </g>
  );
}
function Mini({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={14} y={10} w={52} h={52} rx={11} p={dp(t, d)} />
      <P d="M24 68 Q40 76 56 68" p={dp(t, d + 0.25)} c={C.emL} w={2.5} glow />
      {t > d + 0.6 && <LED x={40} y={36} r={2.6} t={t} />}
    </g>
  );
}
function Clip({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={13} y={14} w={34} h={54} rx={12} p={dp(t, d)} />
      <P d="M20 14 v-5 q0 -4 5 -4 h10 q5 0 5 4 v5" p={dp(t, d + 0.2)} c={C.line2} w={2.5} />
      <Ln x1={23} y1={52} x2={37} y2={52} p={dp(t, d + 0.3)} c={C.line2} w={2} />
      {t > d + 0.6 && <LED x={30} y={34} r={2.6} t={t} />}
    </g>
  );
}
function Person({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Cir cx={30} cy={16} r={10} p={dp(t, d)} w={2.5} />
      <P d="M12 62 Q12 32 30 32 Q48 32 48 62 L48 96 M12 62 L12 96" p={dp(t, d + 0.2, 0.9)} w={2.5} />
    </g>
  );
}
function Laptop({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={20} y={6} w={80} h={50} rx={4} p={dp(t, d)} />
      <P d="M12 68 L20 56 H100 L108 68 Z" p={dp(t, d + 0.2)} />
    </g>
  );
}
function Monitor({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={6} y={4} w={108} h={64} rx={5} p={dp(t, d)} />
      <R x={50} y={68} w={20} h={9} p={dp(t, d + 0.2)} c={C.line2} sw={2.5} />
      <Ln x1={36} y1={80} x2={84} y2={80} p={dp(t, d + 0.3)} />
    </g>
  );
}
function Phone({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={0} y={0} w={120} h={240} rx={24} p={dp(t, d)} />
      <Ln x1={45} y1={16} x2={75} y2={16} p={dp(t, d + 0.2)} c={C.line2} w={3} />
    </g>
  );
}

/* ---------- chrome ---------- */
function VO({ from, to, speaker, text }) {
  const { localTime: t } = useSprite();
  if (t < from || t > to) return null;
  const o = Math.min(dp(t, from, 0.4), clamp((to - t) / 0.4, 0, 1));
  return (
    <div style={{
      position: 'absolute', left: '50%', bottom: 110, transform: `translateX(-50%) translateY(${(1 - dp(t, from, 0.5)) * 14}px)`,
      opacity: o, textAlign: 'center', maxWidth: 1240,
    }}>
      <div style={{ fontFamily: F.m, fontSize: 19, letterSpacing: '.3em', color: C.emL, marginBottom: 12 }}>{speaker}</div>
      <div style={{
        fontFamily: F.s, fontStyle: 'italic', fontSize: 38, lineHeight: 1.35, color: C.text,
        background: 'rgba(9,9,11,.55)', padding: '10px 28px', borderRadius: 10,
      }}>{text}</div>
    </div>
  );
}
function Slate({ id, title, shot }) {
  const { localTime: t } = useSprite();
  const o = dp(t, 0.3, 0.5);
  return (
    <div style={{ opacity: o }}>
      <div style={{
        position: 'absolute', top: 84, left: 96, display: 'flex', alignItems: 'baseline', gap: 22,
        fontFamily: F.m, letterSpacing: '.22em',
      }}>
        <span style={{ color: C.emL, fontSize: 22, fontWeight: 700 }}>{id}</span>
        <span style={{ color: C.text2, fontSize: 22 }}>{title}</span>
      </div>
      {shot && <div style={{
        position: 'absolute', top: 78, right: 96, fontFamily: F.m, fontSize: 19, letterSpacing: '.24em',
        color: C.emL, border: '1.5px solid rgba(16,185,129,.4)', borderRadius: 999, padding: '8px 20px',
        background: 'rgba(9,9,11,.7)',
      }}>{shot}</div>}
    </div>
  );
}
function SceneBody({ cam = 0.06, children, chrome }) {
  const { localTime: t, duration: D } = useSprite();
  const o = Math.min(clamp(t / 0.55, 0, 1), clamp((D - t) / 0.55, 0, 1));
  const sc = 1 + cam * (t / D);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${sc})`, transformOrigin: '50% 46%' }}>
        {children}
      </div>
      {chrome}
    </div>
  );
}

/* ---------- scenes ---------- */
function SceneTitle() {
  const { localTime: t } = useSprite();
  const tag = 'YOUR AI. YOUR DATA. YOUR RULES.';
  const shown = tag.slice(0, Math.max(0, Math.floor((t - 2.6) * 20)));
  return (
    <div style={{ position: 'absolute', inset: 0, textAlign: 'center' }}>
      <div style={{
        position: 'absolute', top: 300, left: 0, right: 0, opacity: dp(t, 0.4, 0.6),
        fontFamily: F.m, fontSize: 21, letterSpacing: '.34em', color: C.emL,
      }}>KICKSTARTER FILM / ANIMATIC / REV V2</div>
      <div style={{
        position: 'absolute', top: 380, left: 0, right: 0,
        fontFamily: F.d, fontWeight: 700, fontSize: 200, letterSpacing: '.02em', color: C.text,
        opacity: dp(t, 0.9, 0.9), transform: `scale(${0.96 + 0.04 * dp(t, 0.9, 1.2)})`,
      }}>THOX<span style={{ color: C.emL }}>.AI</span></div>
      <div style={{
        position: 'absolute', top: 680, left: 0, right: 0, minHeight: 60,
        fontFamily: F.m, fontSize: 42, letterSpacing: '.3em', color: C.text2,
      }}>{shown}<span style={{ opacity: t % 0.9 < 0.45 && t > 2.4 ? 1 : 0, color: C.neon }}>▌</span></div>
      <div style={{
        position: 'absolute', bottom: 130, left: 0, right: 0, opacity: dp(t, 4.6, 0.8),
        display: 'flex', justifyContent: 'center', gap: 64,
        fontFamily: F.m, fontSize: 20, letterSpacing: '.22em', color: C.muted,
      }}>
        <span>4K UHD / 23.976 / 16:9</span>
        <span style={{ color: C.text2 }}>MASTER 9:40 / CUT 1:30</span>
        <span style={{ color: C.emL }}>LAUNCH 07.09.2026</span>
      </div>
    </div>
  );
}

function SceneCEO() {
  const { localTime: t } = useSprite();
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Wire>
        <Ln x1={140} y1={880} x2={1780} y2={880} p={dp(t, 0.2, 0.9)} c={C.line2} />
        {/* LED wall panel */}
        <R x={220} y={220} w={560} h={300} rx={10} p={dp(t, 0.5, 0.8)} dash="10 12" c={C.line2} sw={2.5} />
        <T x={330} y={385} size={52} c={C.emL} ls=".3em" o={dp(t, 1.2, 0.6)} f={F.m}>THOX.AI</T>
        <P d="M300 260 q120 -50 260 -30" p={dp(t, 1.4, 0.7) * 0.5} c={C.emL} w={2.5} dash="8 10" />
        {/* founder + plinth */}
        <Person x={1180} y={420} s={4.6} t={t} d={0.8} />
        <Ln x1={620} y1={880} x2={1120} y2={880} p={dp(t, 1.2, 0.6)} />
        <Ln x1={650} y1={880} x2={650} y2={770} p={dp(t, 1.4, 0.4)} />
        <Ln x1={1090} y1={880} x2={1090} y2={770} p={dp(t, 1.4, 0.4)} />
        <Ln x1={620} y1={770} x2={1120} y2={770} p={dp(t, 1.5, 0.5)} />
        <Key x={665} y={700} s={1.15} t={t} d={1.9} />
        <Air x={790} y={688} s={1.15} t={t} d={2.1} />
        <Mini x={905} y={680} s={1.1} t={t} d={2.3} />
        <Clip x={1010} y={668} s={1.1} t={t} d={2.5} />
        <T x={140} y={960} size={20} o={dp(t, 2, 0.5)}>SLOW DOLLY-IN</T>
        <P d="M140 990 H340" p={dp(t, 2.2, 0.6)} c={C.emL} w={2.5} dash="8 10" />
      </Wire>
      <VO from={3.2} to={7.6} speaker="CRAIG / ON CAMERA" text="Your AI. Your Data. Your Rules." />
    </div>
  );
}

function SceneEco() {
  const { localTime: t } = useSprite();
  const names = ['THOXKEY', 'THOXMINI AIR', 'THOXMINI', 'THOXCLIP'];
  const xs = [330, 750, 1170, 1520];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Wire>
        <Key x={300} y={520} s={3.4} t={t} d={0.5} />
        <Air x={700} y={470} s={3.4} t={t} d={1.1} />
        <Mini x={1130} y={450} s={3.2} t={t} d={1.7} />
        <Clip x={1490} y={420} s={3} t={t} d={2.3} />
        {/* mesh links */}
        <P d="M470 590 Q590 520 800 575" p={dp(t, 3.1, 0.6)} c={C.emL} w={2.5} dash="7 9" />
        <P d="M900 575 Q1050 520 1190 570" p={dp(t, 3.3, 0.6)} c={C.emL} w={2.5} dash="7 9" />
        <P d="M1310 570 Q1420 520 1540 545" p={dp(t, 3.5, 0.6)} c={C.emL} w={2.5} dash="7 9" />
        {names.map((n, i) => (
          <T key={n} x={xs[i] + (i === 0 ? 40 : 0)} y={800} size={26} c={C.text2} ls=".26em"
            o={dp(t, 0.9 + i * 0.6, 0.5)} anchor="start">{n}</T>
        ))}
      </Wire>
      <VO from={4} to={7.6} speaker="MODULE VO" text="One ecosystem. One experience. Designed around you." />
    </div>
  );
}

function SceneKey() {
  const { localTime: t } = useSprite();
  const slideX = interpolate([0.8, 2.2], [-360, 0], Easing.easeOutCubic)(t);
  const chips = ['SUMMARY', 'CODE', 'TRANSLATE', 'DRAFT'];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <VideoSprite src="assets/video/thoxkey-closeup.mp4" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,6,.45) 0%, rgba(5,5,6,0) 26%, rgba(5,5,6,0) 55%, rgba(5,5,6,.82) 100%)' }}></div>
      <div style={{ position: 'absolute', top: 760, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 18 }}>
        {chips.map((ch, i) => (
          <span key={ch} style={{
            opacity: dp(t, 4 + i * 0.35, 0.4), fontFamily: F.m, fontSize: 21, letterSpacing: '.18em',
            color: C.text2, border: `1.5px solid ${C.line2}`, background: C.surface,
            padding: '10px 24px', borderRadius: 999,
          }}>{ch}</span>
        ))}
      </div>
      <VO from={4.2} to={8.6} speaker="MODULE VO" text="Open a document. Ask for a summary. Generate code. Everything happens locally." />
    </div>
  );
}

function SceneAir() {
  const { localTime: t } = useSprite();
  const cardX = interpolate([0.9, 2.4], [-560, 0], Easing.easeOutCubic)(t);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <VideoSprite src="assets/video/thoxmini-air-closeup.mp4" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,6,.45) 0%, rgba(5,5,6,0) 26%, rgba(5,5,6,0) 55%, rgba(5,5,6,.82) 100%)' }}></div>
      <div style={{
        position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center', opacity: dp(t, 2.8, 0.5),
        fontFamily: F.m, fontSize: 24, letterSpacing: '.26em', color: C.emL,
      }}>WIRELESS / MESH NODE</div>
      {/* project chip flies in, continuity from ThoxKey */}
      <div style={{ position: 'absolute', top: 760, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <span style={{
          transform: `translateX(${cardX}px)`, opacity: dp(t, 0.9, 0.3),
          fontFamily: F.m, fontSize: 21, letterSpacing: '.18em', color: C.emL,
          border: '1.5px solid rgba(16,185,129,.4)', background: 'rgba(9,9,11,.7)',
          padding: '10px 24px', borderRadius: 999,
        }}>PROJECT / CONTINUED</span>
      </div>
      <VO from={3.4} to={7.6} speaker="TOMMY / VO" text="Pick up exactly where you left off. More headroom. Same workspace." />
    </div>
  );
}

function SceneMini() {
  const { localTime: t } = useSprite();
  const jobs = [
    { label: 'CODE', y: 0 },
    { label: 'IMAGE', y: 1 },
    { label: 'RESEARCH', y: 2 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <VideoSprite src="assets/video/thoxmini-closeup.mp4" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,6,.45) 0%, rgba(5,5,6,0) 26%, rgba(5,5,6,0) 55%, rgba(5,5,6,.82) 100%)' }}></div>
      <VO from={3.6} to={8.4} speaker="TOMMY / VO" text="Big coding projects. Image generation. Long research. ThoxMini handles the heavy lifting, right here on my desk." />
    </div>
  );
}

function SceneClip() {
  const { localTime: t } = useSprite();
  const fly = clamp((t - 3.4) / 1.6, 0, 1);
  const fx = interpolate([0, 1], [740, 1330], Easing.easeInOutCubic)(fly);
  const fy = 560 - Math.sin(fly * Math.PI) * 200;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <VideoSprite src="assets/video/thoxclip-closeup.mp4" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,6,.45) 0%, rgba(5,5,6,0) 26%, rgba(5,5,6,0) 55%, rgba(5,5,6,.82) 100%)' }}></div>
      {/* handoff chip flying */}
      {t > 3.2 && (
        <div style={{
          position: 'absolute', left: fx, top: fy, transform: 'translate(-50%,-50%)',
          fontFamily: F.m, fontSize: 20, letterSpacing: '.16em', color: C.emL,
          border: '1.5px solid rgba(16,185,129,.5)', background: 'rgba(9,9,11,.85)',
          padding: '10px 20px', borderRadius: 8, opacity: fly < 1 ? 1 : dp(4.2, 4, 0.2),
        }}>HANDOFF / FILES SYNCED</div>
      )}
      <VO from={1.6} to={4.4} speaker="TOMMY / ON CAMERA" text="Files, keys, models. They leave the house with me." />
      <VO from={5} to={7.6} speaker="TOMMY / VO" text="And when I'm back, it's all already here." />
    </div>
  );
}

function MeshNode({ x, y, label, t, d, kind }) {
  const p = dp(t, d, 0.6);
  const ring = clamp((t - d) / 1.1, 0, 1);
  const em = kind === 'thox';
  return (
    <g opacity={p}>
      {ring < 1 && ring > 0 && <circle cx={x} cy={y} r={30 + ring * 70} fill="none" stroke={C.emL} strokeWidth={2} opacity={1 - ring} />}
      <circle cx={x} cy={y} r={34} fill={C.panel} stroke={em ? C.emL : C.line} strokeWidth={2.5} />
      <circle cx={x} cy={y} r={7} fill={em ? C.emL : C.text2} filter={em ? 'drop-shadow(0 0 8px rgba(52,211,153,.8))' : undefined} />
      <T x={x} y={y + 78} size={20} c={em ? C.emL : C.text2} anchor="middle" ls=".2em">{label}</T>
    </g>
  );
}
function SceneMesh() {
  const { localTime: t } = useSprite();
  const hub = { x: 960, y: 480 };
  const nodes = [
    { x: 610, y: 320, label: 'THOXKEY', d: 1.6, kind: 'thox' },
    { x: 1310, y: 320, label: 'THOXMINI AIR', d: 2.2, kind: 'thox' },
    { x: 640, y: 690, label: 'THOXCLIP', d: 2.8, kind: 'thox' },
    { x: 380, y: 500, label: 'MACBOOK PRO', d: 6.6, kind: 'guest' },
    { x: 1540, y: 520, label: 'PC', d: 7.2, kind: 'guest' },
    { x: 1280, y: 700, label: 'IPHONE', d: 7.8, kind: 'guest' },
  ];
  const claims = ['DATA STAYS ON YOUR DEVICES', 'WORKS OFFLINE ON LAN AFTER PAIRING', 'WIREGUARD PROTOCOL', 'COORDINATOR NEVER SEES PLAINTEXT'];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Wire>
        {nodes.map((n) => (
          <P key={n.label} d={`M${hub.x} ${hub.y} L${n.x} ${n.y}`} p={dp(t, n.d + 0.25, 0.6)}
            c={n.kind === 'thox' ? C.emL : C.line} w={2.5} dash="7 9" />
        ))}
        <MeshNode x={hub.x} y={hub.y} label="THOXMINI" t={t} d={0.7} kind="thox" />
        {nodes.map((n) => <MeshNode key={n.label} {...n} t={t} kind={n.kind} />)}
        <T x={960} y={180} size={30} c={C.text} f={F.d} weight={700} ls=".24em" anchor="middle" o={dp(t, 0.5, 0.6)}>ONE PRIVATE MESH</T>
      </Wire>
      <div style={{ position: 'absolute', bottom: 210, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        {claims.map((cl, i) => (
          <span key={cl} style={{
            opacity: dp(t, 9.2 + i * 0.5, 0.5), fontFamily: F.m, fontSize: 19, letterSpacing: '.14em',
            color: C.emL, border: '1.5px solid rgba(52,211,153,.4)', background: 'rgba(16,185,129,.08)',
            padding: '10px 22px', borderRadius: 999,
          }}>{cl}</span>
        ))}
      </div>
      <VO from={1.4} to={5.2} speaker="TOMMY / ON CAMERA" text="Pair a device. Watch it join." />
      <VO from={6.4} to={9.2} speaker="TOMMY / ON CAMERA" text="And it's not just THOX hardware." />
      <VO from={9.6} to={13.4} speaker="TOMMY / ON CAMERA" text="Ask from anywhere on your mesh. Your own devices answer." />
    </div>
  );
}

function SceneClose() {
  const { localTime: t } = useSprite();
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Wire>
        <Person x={870} y={280} s={5.2} t={t} d={0.4} />
        <Ln x1={300} y1={800} x2={1620} y2={800} p={dp(t, 0.3, 0.8)} c={C.line2} />
        <Key x={640} y={840} s={1.3} t={t} d={1.4} />
        <Air x={790} y={828} s={1.3} t={t} d={1.6} />
        <Mini x={930} y={820} s={1.25} t={t} d={1.8} />
        <Clip x={1050} y={808} s={1.25} t={t} d={2} />
      </Wire>
      <VO from={2.2} to={8.4} speaker="CRAIG / ON CAMERA" text="We believe the future of AI should be personal. Private. Expandable. And owned by the people who use it." />
    </div>
  );
}

function SceneCTA() {
  const { localTime: t } = useSprite();
  const chips = ['GOAL $10,000', 'ALL OR NOTHING', '12 MONTHS MESHSTACK PRO INCLUDED'];
  return (
    <div style={{ position: 'absolute', inset: 0, textAlign: 'center' }}>
      <div style={{
        position: 'absolute', top: 330, left: 0, right: 0, opacity: dp(t, 0.5, 0.8),
        fontFamily: F.d, fontWeight: 700, fontSize: 92, color: C.text, letterSpacing: '.03em',
      }}>BACK THOX<span style={{ color: C.emL }}>.AI</span> ON KICKSTARTER</div>
      <div style={{
        position: 'absolute', top: 480, left: 0, right: 0, opacity: dp(t, 1.4, 0.6),
        fontFamily: F.m, fontSize: 34, letterSpacing: '.3em', color: C.emL,
      }}>JULY 9, 2026 / 9:00 AM PT</div>
      <div style={{ position: 'absolute', top: 590, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 18 }}>
        {chips.map((ch, i) => (
          <span key={ch} style={{
            opacity: dp(t, 2 + i * 0.45, 0.5), fontFamily: F.m, fontSize: 21, letterSpacing: '.16em',
            color: C.text2, border: `1.5px solid ${C.line2}`, background: C.surface,
            padding: '12px 26px', borderRadius: 999,
          }}>{ch}</span>
        ))}
      </div>
      <div style={{
        position: 'absolute', top: 740, left: 0, right: 0, opacity: dp(t, 3.6, 0.8),
        fontFamily: F.m, fontSize: 26, letterSpacing: '.34em', color: C.text2,
      }}>YOUR AI. <span style={{ color: C.muted }}>YOUR DATA.</span> <span style={{ color: C.text }}>YOUR RULES.</span></div>
    </div>
  );
}

/* ---------- persistent burn-ins ---------- */
function TopBar() {
  const t = useTime();
  const fr = Math.floor((t % 1) * 24);
  const tc = `TC 00:${pad(Math.floor(t / 60))}:${pad(Math.floor(t) % 60)}:${pad(fr)}`;
  const blink = Math.floor(t * 1.4) % 2 === 0;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 56, display: 'flex', alignItems: 'center',
      gap: 28, padding: '0 36px', background: 'rgba(9,9,11,.82)', borderBottom: `1px solid ${C.line2}`,
      fontFamily: F.m, fontSize: 19, letterSpacing: '.14em', color: C.text2, zIndex: 5,
    }}>
      <span style={{ color: C.red, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 11, height: 11, borderRadius: '50%', background: C.red, opacity: blink ? 1 : 0.15,
          boxShadow: '0 0 8px rgba(239,68,68,.8)',
        }}></span>REC
      </span>
      <span style={{ color: C.text, fontWeight: 700 }}>THOX<span style={{ color: C.emL }}>.AI</span> / KS-FILM-2026 / ANIMATIC</span>
      <span style={{ color: C.muted }}>LAUNCH 07.09.2026</span>
      <span style={{ marginLeft: 'auto', color: C.emL, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{tc}</span>
    </div>
  );
}
function BottomStrip() {
  const { time, duration } = useTimeline();
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 5, background: C.surface, zIndex: 5 }}>
      <div style={{
        width: `${(time / duration) * 100}%`, height: '100%',
        background: `linear-gradient(90deg, ${C.em}, ${C.neon})`, boxShadow: '0 0 10px rgba(16,185,129,.5)',
      }}></div>
    </div>
  );
}
function Backdrop() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #17171b 1.5px, transparent 1.5px)', backgroundSize: '42px 42px',
        opacity: 0.5,
      }}></div>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 62% 46% at 50% 42%, rgba(16,185,129,.06), transparent 65%)',
      }}></div>
    </div>
  );
}

/* ---------- master timeline ---------- */
function CampaignAnimatic({ burnIns = true, loop = true }) {
  return (
    <Stage width={1920} height={1080} duration={90} background={C.bg} autoplay loop={loop}>
      <Backdrop />
      <Sprite start={0} end={8.2}><SceneBody cam={0.03} chrome={null}><SceneTitle /></SceneBody></Sprite>
      <Sprite start={7.8} end={16.2}>
        <SceneBody cam={0.09} chrome={<Slate id="V01" title="CEO OPENING / WHY THOX EXISTS" shot="WIDE / SLOW DOLLY-IN / 35MM" />}>
          <SceneCEO />
        </SceneBody>
      </Sprite>
      <Sprite start={15.8} end={24.2}>
        <SceneBody cam={0.05} chrome={<Slate id="V02" title="ECOSYSTEM MONTAGE" shot="180 DEGREE ORBIT / GIMBAL" />}>
          <SceneEco />
        </SceneBody>
      </Sprite>
      <Sprite start={23.8} end={33.2}>
        <SceneBody cam={0.07} chrome={<Slate id="V04" title="THOXKEY / PERSONAL AI, POCKET SIZED" shot="MACRO CLOSE-UP / FOOTAGE" />}>
          <SceneKey />
        </SceneBody>
      </Sprite>
      <Sprite start={32.8} end={41.2}>
        <SceneBody cam={0.06} chrome={<Slate id="V05" title="THOXMINI AIR / WORK IN MOTION" shot="CLOSE-UP / FOOTAGE" />}>
          <SceneAir />
        </SceneBody>
      </Sprite>
      <Sprite start={40.8} end={50.2}>
        <SceneBody cam={0.06} chrome={<Slate id="V06" title="THOXMINI / DEDICATED AI WORKSPACE" shot="CLOSE-UP / FOOTAGE" />}>
          <SceneMini />
        </SceneBody>
      </Sprite>
      <Sprite start={49.8} end={58.2}>
        <SceneBody cam={0.06} chrome={<Slate id="V07" title="THOXCLIP / THOX ON YOUR PHONE" shot="CLOSE-UP / FOOTAGE" />}>
          <SceneClip />
        </SceneBody>
      </Sprite>
      <Sprite start={57.8} end={72.2}>
        <SceneBody cam={0.05} chrome={<Slate id="V10" title="MESHSTACK / THE WOW MOMENT" shot="UI / GRAPH BUILD" />}>
          <SceneMesh />
        </SceneBody>
      </Sprite>
      <Sprite start={71.8} end={81.2}>
        <SceneBody cam={0.07} chrome={<Slate id="V13" title="CEO CLOSING / FINAL HERO" shot="MEDIUM / LOCKED" />}>
          <SceneClose />
        </SceneBody>
      </Sprite>
      <Sprite start={80.8} end={90}>
        <SceneBody cam={0.03} chrome={null}><SceneCTA /></SceneBody>
      </Sprite>
      {burnIns && <TopBar />}
      {burnIns && <BottomStrip />}
    </Stage>
  );
}

window.CampaignAnimatic = CampaignAnimatic;
