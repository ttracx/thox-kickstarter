// Lightweight notification toasts — appear top-right under menu bar.

function Notifications({ items, onDismiss }) {
  return (
    <div style={{
      position: 'absolute', top: 38, right: 12, zIndex: 8800,
      display: 'flex', flexDirection: 'column', gap: 8, width: 320,
      pointerEvents: 'none',
    }}>
      {items.map(n => (
        <div key={n.id}
          style={{
            pointerEvents: 'auto',
            background: 'rgba(20,20,22,0.94)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 10,
            padding: '10px 12px',
            display: 'flex', gap: 10, alignItems: 'flex-start',
            boxShadow: '0 16px 32px -8px rgba(0,0,0,0.6)',
            animation: 'n-in 220ms cubic-bezier(0.2,0.8,0.2,1)',
          }}
        >
          <div style={{
            width: 24, height: 24, borderRadius: 5,
            background: 'rgba(16,185,129,0.18)',
            border: '1px solid rgba(52,211,153,0.30)',
            color: '#34D399', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{n.icon || <Ico.ThoxChip s={13} />}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontSize: 11.5, fontWeight: 600, color: '#FAFAFA' }}>{n.title}</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9.5, color: '#52525B', letterSpacing: '0.04em' }}>{n.time || 'now'}</span>
            </div>
            <div style={{ fontSize: 11.5, color: '#A1A1AA', marginTop: 2, lineHeight: 1.4 }}>{n.body}</div>
          </div>
          <button onClick={() => onDismiss(n.id)} style={{
            background: 'transparent', border: 'none', color: '#52525B',
            cursor: 'pointer', padding: 2, display: 'inline-flex',
          }}><Ico.Close s={11} /></button>
        </div>
      ))}
      <style>{`@keyframes n-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}

window.Notifications = Notifications;
