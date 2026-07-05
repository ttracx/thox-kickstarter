// Wallpaper background — geometric, lab-instrument feel.
// Three styles: grid, topo, void.

function Wallpaper({ style = 'grid' }) {
  if (style === 'void') {
    return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse at 50% 60%, #0a1814 0%, #050507 55%, #000 100%)',
      }} />
    );
  }
  if (style === 'topo') {
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#050507', overflow: 'hidden' }}>
        <svg width="100%" height="100%" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
          <defs>
            <radialGradient id="topo-glow" cx="50%" cy="65%" r="55%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#10B981" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#topo-glow)" />
          {Array.from({ length: 14 }).map((_, i) => {
            const r = 80 + i * 90;
            return (
              <ellipse key={i}
                cx="50%" cy="78%"
                rx={r * 1.4} ry={r * 0.62}
                fill="none" stroke="#10B981"
                strokeWidth="0.6" opacity={0.5 - i * 0.03} />
            );
          })}
        </svg>
      </div>
    );
  }
  // grid (default)
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: '#050507', overflow: 'hidden' }}>
      {/* fine grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '32px 32px',
      }} />
      {/* major grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          linear-gradient(rgba(16,185,129,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16,185,129,0.06) 1px, transparent 1px)
        `,
        backgroundSize: '256px 256px',
      }} />
      {/* radial emerald glow */}
      <div style={{
        position: 'absolute',
        left: '50%', top: '60%',
        width: 1100, height: 1100,
        transform: 'translate(-50%,-50%)',
        background: 'radial-gradient(circle, rgba(16,185,129,0.16) 0%, rgba(16,185,129,0.04) 35%, transparent 65%)',
        filter: 'blur(20px)',
      }} />
      {/* corner crosshair markers */}
      {[
        { left: 24, top: 24 }, { right: 24, top: 24 },
        { left: 24, bottom: 84 }, { right: 24, bottom: 84 },
      ].map((pos, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" style={{ position: 'absolute', ...pos, opacity: 0.4 }}>
          <path d="M0 7h5M9 7h5M7 0v5M7 9v5" stroke="#34D399" strokeWidth="1" />
        </svg>
      ))}
      {/* subtle scan line */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, transparent 0%, transparent 99%, rgba(0,255,136,0.04) 100%)',
        backgroundSize: '100% 4px',
        pointerEvents: 'none', opacity: 0.6,
      }} />
    </div>
  );
}

window.Wallpaper = Wallpaper;
