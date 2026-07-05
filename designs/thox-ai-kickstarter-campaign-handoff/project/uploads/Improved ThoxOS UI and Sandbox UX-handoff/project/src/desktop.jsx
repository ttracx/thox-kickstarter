// Desktop — wallpaper + status widgets + welcome card.

function Desktop({ onOpen }) {
  const os = useOS();
  const now = useClock();
  const tickTok = useTicker({ base: 32, jitter: 6, period: 800 });
  const tickPwr = useTicker({ base: 11.4, jitter: 0.8, period: 1200 });

  const lastTok = tickTok[tickTok.length - 1].toFixed(1);
  const lastPwr = tickPwr[tickPwr.length - 1].toFixed(1);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
      <Wallpaper style={os.tweaks.wallpaper} />

      {/* Hero wordmark — center-bottom, faint */}
      {os.tweaks.showWordmark && (
        <div style={{
          position: 'absolute', left: '50%', top: '36%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', zIndex: 1,
          pointerEvents: 'none',
        }}>
          <div style={{
            fontFamily: 'Xolonium, Inter, sans-serif',
            fontSize: 96, fontWeight: 700, letterSpacing: '-0.025em',
            color: '#FAFAFA', lineHeight: 1,
            opacity: 0.9,
            textShadow: '0 0 60px rgba(16,185,129,0.18)',
          }}>ThoxOS</div>
          <div style={{
            marginTop: 10,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11, color: '#52525B', letterSpacing: '0.22em', textTransform: 'uppercase',
          }}>Edge AI Compute · Nova</div>
        </div>
      )}

      {/* Top-left telemetry strip */}
      <div style={{
        position: 'absolute', top: 44, left: 16, zIndex: 2,
        display: 'flex', flexDirection: 'column', gap: 6,
      }}>
        <Eyebrow color="#34D399">Live · System</Eyebrow>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 2,
        }}>
          <TelChip dot dotColor="#34D399" label="GPU" value="68%" />
          <TelChip label="VRAM" value="9.2 / 16 GB" />
          <TelChip label="THERM" value="54°C" />
        </div>
      </div>

      {/* Top-right session card */}
      <div style={{
        position: 'absolute', top: 44, right: 16, zIndex: 2,
        width: 260,
        background: 'rgba(14,14,17,0.78)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10, padding: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <Eyebrow color="#34D399">Inference</Eyebrow>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, color: '#52525B', letterSpacing: '0.08em' }}>FP8</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
          <span style={{
            fontFamily: 'Xolonium, Inter, sans-serif', fontSize: 30, fontWeight: 700,
            color: '#FAFAFA', letterSpacing: '-0.02em', lineHeight: 1,
          }}>{lastTok}</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#71717A' }}>tok/s</span>
        </div>
        <Spark data={tickTok} w={236} h={28} color="#34D399" fill />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10.5, color: '#71717A', fontFamily: 'JetBrains Mono, monospace' }}>
          <span>claude-sonnet-4</span>
          <span>{lastPwr}W</span>
        </div>
      </div>

      {/* Welcome card — center-bottom-ish */}
      <div style={{
        position: 'absolute', left: '50%', top: '60%',
        transform: 'translate(-50%, 0)',
        zIndex: 2, width: 520,
      }}>
        <div style={{
          background: 'rgba(14,14,17,0.78)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 12,
          padding: 18,
          textAlign: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 8px #34D399' }} />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
              color: '#34D399', letterSpacing: '0.16em', textTransform: 'uppercase',
            }}>Status: Ready</span>
          </div>
          <p style={{ fontSize: 13.5, color: '#A1A1AA', margin: 0, lineHeight: 1.55 }}>
            Sandbox active. Quick-launch apps from the dock or hit <KbdKey>⌘ K</KbdKey> for spotlight.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            {[
              { id: 'inference', label: 'AI Inference' },
              { id: 'magstack', label: 'MagStack' },
              { id: 'terminal', label: 'Terminal' },
              { id: 'gpu', label: 'GPU Dash' },
            ].map(q => (
              <button key={q.id} onClick={() => onOpen(q.id)} style={{
                padding: '6px 12px',
                background: 'rgba(16,185,129,0.10)',
                border: '1px solid rgba(52,211,153,0.30)',
                color: '#34D399',
                fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500,
                borderRadius: 6, cursor: 'pointer',
              }}>{q.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function KbdKey({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '1px 6px',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.10)',
      borderRadius: 4,
      fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#FAFAFA',
    }}>{children}</span>
  );
}

window.Desktop = Desktop;
window.KbdKey = KbdKey;
