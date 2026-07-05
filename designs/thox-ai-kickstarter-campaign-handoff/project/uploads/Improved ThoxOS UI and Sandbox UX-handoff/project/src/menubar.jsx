// Top menu bar — macOS-flavored but lab-styled.
// Always-visible global chrome. Small, dense, mono accents.

function MenuBar({ activeApp, onSpotlight, onLock }) {
  const os = useOS();
  const now = useClock();
  const [openMenu, setOpenMenu] = useState(null);
  const [batt] = useState(0.78);

  const menus = [
    { id: 'thox',  label: <Ico.ThoxChip s={14} />, items: [
      { label: 'About ThoxOS' }, '-',
      { label: 'System Settings…', kbd: '⌘ ,' }, '-',
      { label: 'Lock Screen', kbd: '⌃⌘ Q', onClick: onLock },
      { label: 'Sleep' }, { label: 'Restart…' }, { label: 'Shut Down…' },
    ]},
    { id: 'app',  label: activeApp?.name || 'Finder', bold: true, items: [
      { label: `About ${activeApp?.name || 'Finder'}` }, '-',
      { label: 'Preferences…', kbd: '⌘ ,' }, '-',
      { label: 'Hide', kbd: '⌘ H' }, { label: 'Quit', kbd: '⌘ Q' },
    ]},
    { id: 'file', label: 'File',  items: [{ label: 'New Window', kbd: '⌘ N' }, { label: 'New Tab',  kbd: '⌘ T' }, '-', { label: 'Close', kbd: '⌘ W' }] },
    { id: 'edit', label: 'Edit',  items: [{ label: 'Undo', kbd: '⌘ Z' }, { label: 'Redo', kbd: '⇧⌘ Z' }, '-', { label: 'Cut', kbd: '⌘ X' }, { label: 'Copy', kbd: '⌘ C' }, { label: 'Paste', kbd: '⌘ V' }] },
    { id: 'view', label: 'View',  items: [{ label: 'Show Sidebar', kbd: '⌥⌘ S' }, { label: 'Toggle Telemetry' }] },
    { id: 'win',  label: 'Window', items: [{ label: 'Minimize', kbd: '⌘ M' }, { label: 'Tile to Left' }, { label: 'Tile to Right' }] },
    { id: 'help', label: 'Help',  items: [{ label: 'ThoxOS Help', kbd: '⌘ ?' }] },
  ];

  return (
    <>
      <div
        onMouseLeave={() => setOpenMenu(null)}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 28,
          zIndex: 9000,
          background: 'rgba(9,9,11,0.78)',
          backdropFilter: 'blur(20px) saturate(140%)',
          WebkitBackdropFilter: 'blur(20px) saturate(140%)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center',
          padding: '0 10px',
          fontFamily: 'Inter, sans-serif', fontSize: 12.5,
          color: '#FAFAFA',
          userSelect: 'none',
        }}
      >
        {/* Left side — menus */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {menus.map(m => (
            <div key={m.id} style={{ position: 'relative' }}>
              <button
                onClick={() => setOpenMenu(openMenu === m.id ? null : m.id)}
                onMouseEnter={() => openMenu && setOpenMenu(m.id)}
                style={{
                  background: openMenu === m.id ? 'rgba(255,255,255,0.10)' : 'transparent',
                  border: 'none', color: '#FAFAFA',
                  padding: m.id === 'thox' ? '4px 9px 3px' : '4px 9px',
                  fontSize: 12.5, fontWeight: m.bold ? 600 : 400,
                  borderRadius: 4, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center',
                  fontFamily: 'inherit',
                }}
              >
                {m.label}
              </button>
              {openMenu === m.id && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0,
                  marginTop: 2, minWidth: 220,
                  background: 'rgba(20,20,22,0.96)',
                  backdropFilter: 'blur(24px) saturate(160%)',
                  WebkitBackdropFilter: 'blur(24px) saturate(160%)',
                  border: '1px solid rgba(255,255,255,0.10)',
                  borderRadius: 8,
                  padding: 4,
                  boxShadow: '0 16px 32px -8px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.4)',
                  fontSize: 12.5,
                }}>
                  {m.items.map((it, i) => it === '-' ? (
                    <div key={i} style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '4px 8px' }} />
                  ) : (
                    <button key={i}
                      onClick={() => { it.onClick && it.onClick(); setOpenMenu(null); }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: 24, width: '100%',
                        padding: '5px 10px', borderRadius: 4,
                        background: 'transparent', border: 'none',
                        color: '#FAFAFA', fontSize: 12.5, fontFamily: 'inherit',
                        cursor: 'pointer', textAlign: 'left',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.18)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <span>{it.label}</span>
                      {it.kbd && <span style={{ color: '#71717A', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{it.kbd}</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Right side — telemetry + system tray */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 11.5 }}>
          {os.tweaks.showTelemetry && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10.5,
              color: '#71717A', letterSpacing: '0.06em',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', boxShadow: '0 0 6px #34D399' }} />
              <span style={{ color: '#A1A1AA' }}>NOVA</span>
              <span style={{ color: '#FAFAFA' }}>32 tok/s</span>
              <span style={{ color: '#52525B' }}>·</span>
              <span style={{ color: '#A1A1AA' }}>FP8</span>
            </span>
          )}
          <button onClick={onSpotlight} title="Spotlight (⌘ K)" style={{
            background: 'transparent', border: 'none', color: '#A1A1AA',
            padding: 4, cursor: 'pointer', display: 'inline-flex', borderRadius: 4,
          }}><Ico.Spotlight s={13} /></button>
          <span style={{ color: '#A1A1AA', display: 'inline-flex' }}><Ico.Wifi s={13} /></span>
          <span style={{ color: '#A1A1AA', display: 'inline-flex' }}><Ico.Battery level={batt} s={14} /></span>
          <span style={{ color: '#A1A1AA', fontSize: 11.5, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.02em' }}>
            {fmtDate(now)} · {fmtTime(now)}
          </span>
        </div>
      </div>
      {openMenu && (
        <div onClick={() => setOpenMenu(null)} style={{ position: 'fixed', inset: 0, zIndex: 8500 }} />
      )}
    </>
  );
}

window.MenuBar = MenuBar;
