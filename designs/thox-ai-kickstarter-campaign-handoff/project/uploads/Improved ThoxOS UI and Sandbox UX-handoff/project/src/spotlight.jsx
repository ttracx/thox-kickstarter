// Spotlight (Cmd+K) — fast app launcher.

function Spotlight({ open, onClose, apps, onLaunch }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQ(''); setSel(0);
      setTimeout(() => inputRef.current && inputRef.current.focus(), 30);
    }
  }, [open]);

  if (!open) return null;

  const filtered = q.trim()
    ? apps.filter(a => a.name.toLowerCase().includes(q.toLowerCase()) || (a.desc || '').toLowerCase().includes(q.toLowerCase()))
    : apps.slice(0, 8);

  const launch = (id) => { onLaunch(id); onClose(); };

  const onKey = (e) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setSel(s => Math.min(filtered.length - 1, s + 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSel(s => Math.max(0, s - 1)); }
    if (e.key === 'Enter')     { e.preventDefault(); filtered[sel] && launch(filtered[sel].id); }
  };

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 9500, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 110, background: 'rgba(0,0,0,0.32)', backdropFilter: 'blur(2px)' }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: 580,
        background: 'rgba(20,20,22,0.96)',
        backdropFilter: 'blur(28px) saturate(160%)',
        WebkitBackdropFilter: 'blur(28px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 12,
        boxShadow: '0 32px 80px -16px rgba(0,0,0,0.8), 0 0 0 1px rgba(0,0,0,0.5)',
        overflow: 'hidden',
        animation: 'sp-in 180ms cubic-bezier(0.2,0.8,0.2,1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ color: '#34D399', display: 'inline-flex' }}><Ico.Search s={18} /></span>
          <input
            ref={inputRef}
            value={q}
            onChange={e => { setQ(e.target.value); setSel(0); }}
            onKeyDown={onKey}
            placeholder="Search apps, files, commands"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: '#FAFAFA', fontSize: 16, fontFamily: 'Inter, sans-serif', fontWeight: 400,
            }}
          />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5, color: '#52525B', letterSpacing: '0.06em' }}>ESC</span>
        </div>

        <div style={{ maxHeight: 380, overflowY: 'auto', padding: 6 }}>
          {filtered.length === 0 && (
            <div style={{ padding: '36px 16px', textAlign: 'center', color: '#71717A', fontSize: 13 }}>No results</div>
          )}
          {filtered.map((a, i) => {
            const Icon = a.icon;
            const isSel = i === sel;
            return (
              <button
                key={a.id}
                onClick={() => launch(a.id)}
                onMouseEnter={() => setSel(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                  padding: '9px 10px', borderRadius: 7,
                  background: isSel ? 'rgba(16,185,129,0.16)' : 'transparent',
                  border: isSel ? '1px solid rgba(52,211,153,0.30)' : '1px solid transparent',
                  color: '#FAFAFA',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                }}
              >
                <span style={{
                  width: 30, height: 30, borderRadius: 6,
                  background: isSel ? 'rgba(16,185,129,0.20)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: isSel ? '#34D399' : '#A1A1AA',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}><Icon s={16} /></span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500, color: '#FAFAFA' }}>{a.name}</div>
                  {a.desc && <div style={{ fontSize: 11.5, color: '#71717A', marginTop: 1 }}>{a.desc}</div>}
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#52525B', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{a.kind || 'App'}</span>
              </button>
            );
          })}
        </div>
      </div>
      <style>{`@keyframes sp-in { from { opacity: 0; transform: translateY(-12px) scale(0.98); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

window.Spotlight = Spotlight;
