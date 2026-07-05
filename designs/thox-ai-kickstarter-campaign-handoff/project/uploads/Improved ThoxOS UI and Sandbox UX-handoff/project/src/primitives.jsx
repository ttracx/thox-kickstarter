// Shared chrome primitives + state hooks

const { useState, useEffect, useRef, useCallback, useMemo, createContext, useContext } = React;

// =========================================================
// Tweak defaults — edited via host
// =========================================================
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "comfortable",
  "accent": "emerald",
  "chrome": "lab",
  "wallpaper": "grid",
  "showTelemetry": true,
  "showWordmark": true
}/*EDITMODE-END*/;

// =========================================================
// OS context
// =========================================================
const OSContext = createContext(null);
const useOS = () => useContext(OSContext);

// =========================================================
// Live clock
// =========================================================
function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 15_000);
    return () => clearInterval(t);
  }, []);
  return now;
}
function fmtTime(d) {
  let h = d.getHours(), m = d.getMinutes();
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')} ${ampm}`;
}
function fmtDate(d) {
  return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
}

// =========================================================
// Density tokens
// =========================================================
const DENSITY = {
  compact:     { unit: 4,  pad: 10, gap: 6,  text: 12.5 },
  comfortable: { unit: 4,  pad: 14, gap: 10, text: 13.5 },
  spacious:    { unit: 4,  pad: 18, gap: 14, text: 14.5 },
};

const ACCENTS = {
  emerald: { color: '#10B981', hover: '#34D399', neon: '#00FF88' },
  cyan:    { color: '#06B6D4', hover: '#22D3EE', neon: '#67E8F9' },
  lime:    { color: '#84CC16', hover: '#A3E635', neon: '#D9F99D' },
};

// =========================================================
// Generic surface — hairline-bordered card
// =========================================================
function Surface({ children, style, hover = false, ...rest }) {
  return (
    <div
      style={{
        background: '#0E0E11',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        ...(style || {}),
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

// =========================================================
// Mono telemetry chip (e.g.  AI · 32 tok/s · FP8)
// =========================================================
function TelChip({ label, value, accent = false, dot = false, dotColor }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 8px',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 4,
      background: 'rgba(255,255,255,0.02)',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 10.5,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      color: accent ? '#34D399' : '#A1A1AA',
      whiteSpace: 'nowrap',
    }}>
      {dot && (
        <span style={{
          width: 6, height: 6, borderRadius: '50%',
          background: dotColor || '#34D399',
          boxShadow: `0 0 6px ${dotColor || '#34D399'}`,
        }} />
      )}
      {label && <span style={{ color: '#71717A' }}>{label}</span>}
      {value && <span style={{ color: accent ? '#34D399' : '#FAFAFA' }}>{value}</span>}
    </span>
  );
}

// =========================================================
// Eyebrow label —  ◆ AI INFERENCE
// =========================================================
function Eyebrow({ children, color = '#34D399' }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
      color,
    }}>
      <span style={{ width: 6, height: 6, background: color, transform: 'rotate(45deg)' }} />
      {children}
    </div>
  );
}

// =========================================================
// Chrome button (used in window controls + toolbar)
// =========================================================
function ChromeBtn({ icon, onClick, color = '#71717A', hoverColor = '#FAFAFA', title, active = false }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={title}
      style={{
        width: 22, height: 22,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: active ? 'rgba(16,185,129,0.12)' : (hover ? 'rgba(255,255,255,0.06)' : 'transparent'),
        border: 'none', borderRadius: 5, cursor: 'pointer',
        color: active ? '#34D399' : (hover ? hoverColor : color),
        transition: 'all 120ms',
        padding: 0,
      }}
    >{icon}</button>
  );
}

// =========================================================
// Sparkline — small inline chart
// =========================================================
function Spark({ data, w = 80, h = 18, color = '#34D399', fill = false }) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  const r = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / r) * h;
    return [x, y];
  });
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const area = `${d} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      {fill && <path d={area} fill={color} opacity="0.15" />}
      <path d={d} fill="none" stroke={color} strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// =========================================================
// Live ticker hook — generates a noisy series for telemetry
// =========================================================
function useTicker({ base = 32, jitter = 4, period = 1500, length = 24 } = {}) {
  const [arr, setArr] = useState(() => Array.from({ length }, () => base + (Math.random() - 0.5) * jitter));
  useEffect(() => {
    const t = setInterval(() => {
      setArr(prev => [...prev.slice(1), base + (Math.random() - 0.5) * jitter]);
    }, period);
    return () => clearInterval(t);
  }, [base, jitter, period, length]);
  return arr;
}

Object.assign(window, {
  useState, useEffect, useRef, useCallback, useMemo,
  OSContext, useOS,
  useClock, fmtTime, fmtDate,
  DENSITY, ACCENTS,
  Surface, TelChip, Eyebrow, ChromeBtn, Spark, useTicker,
  TWEAK_DEFAULTS,
});
