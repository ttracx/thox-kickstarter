// Lock screen — large clock, user, password.

function LockScreen({ onUnlock }) {
  const now = useClock();
  const [pw, setPw] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current && inputRef.current.focus(), 200);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    onUnlock();
  };

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 9800,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      animation: 'l-in 280ms ease-out',
    }}>
      <Wallpaper style="grid" />

      {/* foreground */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: 360 }}>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11, color: '#34D399', letterSpacing: '0.18em', textTransform: 'uppercase',
          display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14,
        }}>
          <span style={{ width: 6, height: 6, background: '#34D399', transform: 'rotate(45deg)' }} />
          {fmtDate(now).toUpperCase()}
        </div>

        <div style={{
          fontFamily: 'Xolonium, Inter, sans-serif',
          fontSize: 96, fontWeight: 700, letterSpacing: '-0.025em',
          color: '#FAFAFA', lineHeight: 1, marginBottom: 8,
          textShadow: '0 0 60px rgba(16,185,129,0.20)',
        }}>{fmtTime(now)}</div>

        <div style={{ fontSize: 13, color: '#A1A1AA', marginBottom: 56 }}>
          {now.toLocaleDateString(undefined, { weekday: 'long' })}
        </div>

        {/* avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #18181B, #27272A)',
            border: '2px solid rgba(52,211,153,0.40)',
            boxShadow: '0 0 24px rgba(16,185,129,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#34D399',
            fontFamily: 'Xolonium, Inter, sans-serif', fontSize: 28, fontWeight: 700,
          }}>TX</div>

          <div style={{ fontSize: 14, fontWeight: 600, color: '#FAFAFA' }}>tommy.x</div>

          <form onSubmit={submit} style={{ animation: shake ? 'shk 240ms' : 'none' }}>
            <div style={{
              display: 'flex', alignItems: 'center',
              width: 280, height: 36,
              background: 'rgba(20,20,22,0.84)',
              border: '1px solid rgba(255,255,255,0.10)',
              borderRadius: 18,
              padding: '0 6px 0 16px',
            }}>
              <input ref={inputRef}
                value={pw}
                onChange={e => setPw(e.target.value)}
                type="password"
                placeholder="Enter password"
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  color: '#FAFAFA', fontSize: 13, fontFamily: 'Inter, sans-serif',
                }}
              />
              <button type="submit" style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'rgba(16,185,129,0.20)', border: '1px solid rgba(52,211,153,0.40)',
                color: '#34D399', cursor: 'pointer', display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center',
              }}><Ico.ChevronDown s={11} /></button>
            </div>
          </form>

          <button onClick={onUnlock} style={{
            background: 'transparent', border: 'none',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10.5, color: '#71717A', letterSpacing: '0.12em', textTransform: 'uppercase',
            cursor: 'pointer', marginTop: 6,
          }}>↵ Touch ID · Sign in as Guest</button>
        </div>
      </div>

      {/* corner brand */}
      <div style={{
        position: 'absolute', bottom: 28, left: 0, right: 0, zIndex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px',
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em',
        color: '#3F3F46', textTransform: 'uppercase',
      }}>
        <span>THOX.AI LLC · CONFIDENTIAL</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399' }} />
          NOVA EDGE · v6.0
        </span>
      </div>

      <style>{`
        @keyframes l-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shk { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
      `}</style>
    </div>
  );
}

window.LockScreen = LockScreen;
