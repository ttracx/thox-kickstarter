// Dock — bottom-centered. Lab styling: hairline border, no glassy blur cliché,
// emerald glow on active, dot indicator beneath running apps.

function Dock({ apps, onLaunch, runningIds, focusedId }) {
  const [hover, setHover] = useState(null);
  return (
    <div style={{
      position: 'absolute', bottom: 14, left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 7000,
      display: 'flex', alignItems: 'flex-end', gap: 4,
      padding: '6px 8px',
      background: 'rgba(14,14,17,0.78)',
      backdropFilter: 'blur(24px) saturate(140%)',
      WebkitBackdropFilter: 'blur(24px) saturate(140%)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 14,
      boxShadow: '0 16px 40px -16px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)',
    }}>
      {apps.map(app => {
        const running = runningIds.has(app.id);
        const focused = focusedId === app.id;
        const isHover = hover === app.id;
        const Icon = app.icon;
        return (
          <button
            key={app.id}
            onClick={() => onLaunch(app.id)}
            onMouseEnter={() => setHover(app.id)}
            onMouseLeave={() => setHover(null)}
            title={app.name}
            style={{
              position: 'relative',
              width: 44, height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: focused
                ? 'linear-gradient(180deg, rgba(16,185,129,0.18), rgba(16,185,129,0.08))'
                : (isHover ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)'),
              border: focused
                ? '1px solid rgba(52,211,153,0.5)'
                : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10,
              cursor: 'pointer',
              color: focused ? '#34D399' : (isHover ? '#FAFAFA' : '#D4D4D8'),
              transform: isHover ? 'translateY(-3px)' : 'translateY(0)',
              transition: 'transform 160ms cubic-bezier(0.2,0.8,0.2,1), background 160ms, color 160ms, border-color 160ms',
              boxShadow: focused ? '0 0 16px rgba(16,185,129,0.30)' : 'none',
              padding: 0,
            }}
          >
            <Icon s={22} />

            {isHover && (
              <span style={{
                position: 'absolute', bottom: '100%', left: '50%',
                transform: 'translateX(-50%)',
                marginBottom: 8,
                padding: '4px 9px',
                background: 'rgba(20,20,22,0.96)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 5,
                fontSize: 11, fontFamily: 'Inter, sans-serif', fontWeight: 500,
                color: '#FAFAFA',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}>{app.name}</span>
            )}

            {running && (
              <span style={{
                position: 'absolute', bottom: -4, left: '50%',
                transform: 'translateX(-50%)',
                width: 4, height: 4, borderRadius: '50%',
                background: '#34D399',
                boxShadow: '0 0 4px #34D399',
              }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

window.Dock = Dock;
