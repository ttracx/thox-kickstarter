// Window manager — chrome, drag, focus, minimize, close, snap.
// macOS-flavored traffic lights but in THOX accents (close = red, min = amber, max = emerald).

function Window({ win, focused, onFocus, onClose, onMinimize, onMaximize, onMove, onResize, children }) {
  const ref = useRef(null);
  const drag = useRef(null);

  const handleDown = (e) => {
    if (e.target.closest('[data-no-drag]')) return;
    onFocus();
    drag.current = {
      startX: e.clientX, startY: e.clientY,
      origX: win.x, origY: win.y,
    };
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
  };
  const handleMove = (e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.startX;
    const dy = e.clientY - drag.current.startY;
    onMove(Math.max(-40, drag.current.origX + dx), Math.max(28, drag.current.origY + dy));
  };
  const handleUp = () => {
    drag.current = null;
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', handleUp);
  };

  const isMax = win.maximized;

  return (
    <div
      ref={ref}
      onMouseDown={onFocus}
      style={{
        position: 'absolute',
        left: isMax ? 0 : win.x,
        top: isMax ? 28 : win.y,
        width: isMax ? '100%' : win.w,
        height: isMax ? 'calc(100% - 28px - 72px)' : win.h,
        zIndex: focused ? 5000 : 1000 + (win.z || 0),
        display: win.minimized ? 'none' : 'flex',
        flexDirection: 'column',
        background: '#0E0E11',
        border: focused ? '1px solid rgba(52,211,153,0.32)' : '1px solid rgba(255,255,255,0.08)',
        borderRadius: isMax ? 0 : 10,
        overflow: 'hidden',
        boxShadow: focused
          ? '0 24px 60px -16px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.4), 0 0 30px rgba(16,185,129,0.10)'
          : '0 16px 40px -16px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,0,0,0.3)',
        transition: drag.current ? 'none' : 'box-shadow 160ms, border-color 160ms',
      }}
    >
      {/* Title bar */}
      <div
        onMouseDown={handleDown}
        onDoubleClick={onMaximize}
        style={{
          height: 36, flexShrink: 0,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '0 12px',
          background: focused
            ? 'linear-gradient(180deg, #18181B 0%, #131316 100%)'
            : 'linear-gradient(180deg, #131316 0%, #0F0F12 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          cursor: 'grab',
          userSelect: 'none',
        }}
      >
        {/* Traffic lights */}
        <div data-no-drag style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <button onClick={onClose} title="Close" style={tlStyle('#EF4444', focused)} />
          <button onClick={onMinimize} title="Minimize" style={tlStyle('#FBBF24', focused)} />
          <button onClick={onMaximize} title="Maximize" style={tlStyle('#10B981', focused)} />
        </div>

        {/* Title */}
        <div style={{
          flex: 1, textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          fontSize: 12, fontWeight: 500,
          color: focused ? '#FAFAFA' : '#71717A',
          letterSpacing: '0.005em',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
        }}>
          {win.icon && <span style={{ color: '#34D399', display: 'inline-flex' }}><win.icon s={12} /></span>}
          <span>{win.title}</span>
        </div>

        {/* Right side — window-specific tools placeholder */}
        <div data-no-drag style={{ width: 60, display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
          {win.tools}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: '#0A0A0C' }}>
        {children}
      </div>

      {/* Resize handle */}
      {!isMax && (
        <div
          data-no-drag
          onMouseDown={(e) => {
            e.stopPropagation(); e.preventDefault(); onFocus();
            const start = { x: e.clientX, y: e.clientY, w: win.w, h: win.h };
            const mv = (ev) => onResize(Math.max(380, start.w + (ev.clientX - start.x)), Math.max(260, start.h + (ev.clientY - start.y)));
            const up = () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseup', up); };
            window.addEventListener('mousemove', mv);
            window.addEventListener('mouseup', up);
          }}
          style={{
            position: 'absolute', right: 0, bottom: 0,
            width: 14, height: 14, cursor: 'nwse-resize',
            background: 'linear-gradient(135deg, transparent 50%, rgba(255,255,255,0.20) 50%, rgba(255,255,255,0.20) 60%, transparent 60%, transparent 70%, rgba(255,255,255,0.15) 70%, rgba(255,255,255,0.15) 80%, transparent 80%)',
          }}
        />
      )}
    </div>
  );
}

function tlStyle(color, focused) {
  return {
    width: 12, height: 12,
    borderRadius: '50%',
    background: focused ? color : '#3F3F46',
    border: 'none',
    cursor: 'pointer',
    boxShadow: focused ? `inset 0 0 0 1px rgba(0,0,0,0.18)` : 'none',
    padding: 0,
  };
}

window.Window = Window;
