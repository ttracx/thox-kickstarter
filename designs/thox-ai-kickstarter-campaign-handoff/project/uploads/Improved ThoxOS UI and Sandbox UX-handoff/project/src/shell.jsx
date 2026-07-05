/* global React, Ic */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ============ BootScreen ============ */
function BootScreen({ onDone }) {
  const lines = useMemo(()=>[
    ['00.012', 'ThoxOS v6.1 — Jetson Orin NX 16GB','dim'],
    ['00.041', 'TPM 2.0 attestation …','dim'],
    ['00.118', 'Secure boot chain verified','ok'],
    ['00.204', 'CUDA 12.4 / TensorRT-LLM 0.9','ms'],
    ['00.318', 'MagStack™ nodes online — 4/4','ok'],
    ['00.402', 'cuStateVec ready (34q)','ok'],
    ['00.512', 'Mounting /mnt/thox …','dim'],
    ['00.624', 'ThoxOS shell ready','ok'],
  ],[]);
  const [shown, setShown] = useState([]);
  useEffect(()=>{
    let i=0; const id=setInterval(()=>{
      i++; setShown(lines.slice(0,i));
      if (i>=lines.length) { clearInterval(id); setTimeout(onDone, 500); }
    }, 130);
    return ()=>clearInterval(id);
  },[lines, onDone]);
  return (
    <div className="boot">
      <div className="boot-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx=".5" fill="currentColor"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" strokeLinecap="round"/></svg></div>
      <div>
        <div className="boot-name">Thox<b>OS</b></div>
        <div className="boot-version">v6.1.0 · EDGE AI</div>
      </div>
      <div className="boot-bar"><i/></div>
      <div className="boot-log">
        {shown.map((l,i)=>(<div className="line" key={i}><span className="ts">[{l[0]}]</span><span className={l[2]}>{l[1]}</span></div>))}
      </div>
    </div>
  );
}

/* ============ LockScreen ============ */
function LockScreen({ user, onUnlock }) {
  const [pin, setPin] = useState('');
  const [t, setT] = useState(new Date());
  useEffect(()=>{ const id=setInterval(()=>setT(new Date()),1000); return ()=>clearInterval(id); },[]);
  const time = t.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', hour12:false });
  const date = t.toLocaleDateString([], { weekday:'long', month:'long', day:'numeric' });
  const submit = (e)=>{ e.preventDefault(); onUnlock(); };
  return (
    <div className="lock">
      <div className="lock-time">{time}</div>
      <div className="lock-date">{date}</div>
      <form className="lock-card" onSubmit={submit}>
        <div className="lock-mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx=".5" fill="currentColor"/><path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" strokeLinecap="round"/></svg></div>
        <div className="lock-brand">Thox<b>OS</b></div>
        <div className="lock-version">v6.1.0 · Edge AI</div>
        <div className="lock-input">
          <input autoFocus type="password" placeholder="• • • • • •" value={pin} onChange={e=>setPin(e.target.value)} />
          <button className="btn primary" type="submit">Unlock</button>
        </div>
        <div className="lock-hint">Press Enter · Any password works</div>
      </form>
    </div>
  );
}

/* ============ Wallpaper ============ */
function Wallpaper({ kind }) {
  return (
    <div className={"wall "+kind}>
      <div className="wall-mark">THOX</div>
    </div>
  );
}

/* ============ MenuBar ============ */
function MenuBar({ activeApp, onOpenSpotlight, telemetry, apps, onLaunch, onCloseAll, onMinAll, onTilesView, onAbout, openIds, onFocusApp }) {
  const [now, setNow] = useState(new Date());
  const [openMenu, setOpenMenu] = useState(null);
  useEffect(()=>{ const id=setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(id); },[]);
  useEffect(()=>{
    const close = ()=>setOpenMenu(null);
    if (openMenu) { window.addEventListener('click', close); return ()=>window.removeEventListener('click', close); }
  },[openMenu]);
  const tog = (m)=>(e)=>{ e.stopPropagation(); setOpenMenu(openMenu===m?null:m); };
  const item = (label, onClick, kbd, disabled)=>(
    <div className={"menu-row"+(disabled?' disabled':'')} onClick={()=>{ if(!disabled){ onClick&&onClick(); setOpenMenu(null); }}}>
      <span>{label}</span>{kbd && <kbd>{kbd}</kbd>}
    </div>
  );
  const sep = <div className="menu-sep"/>;
  const runningApps = (apps||[]).filter(a=>openIds&&openIds.includes(a.id));

  return (
    <div className="menubar">
      <div className="menubar-brand" onClick={tog('thox')}><Ic.mark size={14}/> ThoxOS</div>
      {openMenu==='thox' && (
        <div className="menu-pop" style={{left:8}} onClick={e=>e.stopPropagation()}>
          {item('About ThoxOS', onAbout)}{sep}
          {item('Spotlight…', onOpenSpotlight, '⌘K')}
          {item('Settings', ()=>onLaunch&&onLaunch('settings'))}{sep}
          {item('Lock screen', ()=>location.reload())}
        </div>
      )}

      <div className="menubar-item active" onClick={tog('apps')} style={{fontWeight:600,color:'var(--accent-h)'}}>{activeApp||'Apps'}</div>
      {openMenu==='apps' && (
        <div className="menu-pop" style={{left:120}} onClick={e=>e.stopPropagation()}>
          {(apps||[]).filter(a=>a.pinned).map(a=>(
            <div key={a.id} className="menu-row" onClick={()=>{ onLaunch&&onLaunch(a.id); setOpenMenu(null); }}>
              <span style={{display:'inline-flex',alignItems:'center',gap:8}}><span style={{color:'var(--accent-h)',display:'inline-flex'}}>{a.icon}</span>{a.name}</span>
            </div>
          ))}
        </div>
      )}

      <div className="menubar-item" onClick={tog('view')}>View</div>
      {openMenu==='view' && (
        <div className="menu-pop" style={{left:200}} onClick={e=>e.stopPropagation()}>
          {item('Tile windows', onTilesView, '⌘T', !runningApps.length)}
          {item('Minimize all', onMinAll, '⌘M', !runningApps.length)}{sep}
          {item('Toggle Tweaks panel', ()=>window.parent.postMessage({type:'__activate_edit_mode'},'*'))}
        </div>
      )}

      <div className="menubar-item" onClick={tog('windows')}>Window</div>
      {openMenu==='windows' && (
        <div className="menu-pop" style={{left:260}} onClick={e=>e.stopPropagation()}>
          {runningApps.length===0 && <div className="menu-row disabled"><span>No open windows</span></div>}
          {runningApps.map(a=>(
            <div key={a.id} className="menu-row" onClick={()=>{ onFocusApp&&onFocusApp(a.id); setOpenMenu(null); }}>
              <span style={{display:'inline-flex',alignItems:'center',gap:8}}><span style={{color:'var(--accent-h)',display:'inline-flex'}}>{a.icon}</span>{a.name}</span>
            </div>
          ))}
          {runningApps.length>0 && sep}
          {runningApps.length>0 && item('Close all', onCloseAll, '⇧⌘W')}
        </div>
      )}

      <div className="menubar-item" onClick={tog('help')}>Help</div>
      {openMenu==='help' && (
        <div className="menu-pop" style={{left:320}} onClick={e=>e.stopPropagation()}>
          {item('Keyboard shortcuts', onAbout)}
          {item('Spotlight search', onOpenSpotlight, '⌘K')}{sep}
          {item('thox.ai', ()=>window.open('https://thox.ai','_blank'))}
          {item('GitHub', ()=>window.open('https://github.com/ttracx/thoxos-sandbox','_blank'))}
        </div>
      )}

      <div className="menubar-right">
        {telemetry && <>
          <span className="tray-chip"><span className="led"/> GPU 38%</span>
          <span className="tray-chip"><span className="led"/> 42 t/s</span>
          <span className="tray-chip"><span className="led amber"/> RAFT 4/4</span>
        </>}
        <span className="tray-search" onClick={onOpenSpotlight}><Ic.search size={11}/> Search <kbd>⌘K</kbd></span>
        <span className="tray-icon" title="WiFi"><Ic.wifi/></span>
        <span className="tray-icon" title="Display"><Ic.sun/></span>
        <span className="tray-icon" title="Notifications"><Ic.bell/></span>
        <span className="tray-clock mono">{now.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:false})}</span>
      </div>
    </div>
  );
}

/* ============ Dock ============ */
function Dock({ apps, openIds, focusedId, onLaunch }) {
  const pinned = apps.filter(a=>a.pinned);
  const others = apps.filter(a=>!a.pinned);
  // also show any running app that's not pinned (so user can see it minimized)
  const runningExtras = others.filter(a=>openIds.includes(a.id));
  const list = [...pinned, ...(runningExtras.length?runningExtras:[])];
  return (
    <div className="dock-wrap">
      <div className="dock">
        {list.map((a)=>{
          const open = openIds.includes(a.id);
          const focused = focusedId===a.id;
          return (
            <div key={a.id} className={"dock-app "+(open?'running ':'')+(focused?'focused':'')} onClick={()=>onLaunch(a.id)}>
              {a.icon}
              <div className="ttip">{a.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============ Window Manager ============ */
function Window({ w, focused, onFocus, onClose, onMin, onMax, onMove, children }) {
  const titleRef = useRef(null);
  const startRef = useRef(null);
  const onMouseDown = (e)=>{
    if (e.target.closest('.tbc')) return;
    onFocus();
    startRef.current = { mx:e.clientX, my:e.clientY, x:w.x, y:w.y };
    const move = (ev)=>{
      const dx=ev.clientX-startRef.current.mx, dy=ev.clientY-startRef.current.my;
      onMove(Math.max(0,startRef.current.x+dx), Math.max(30,startRef.current.y+dy));
    };
    const up = ()=>{ window.removeEventListener('mousemove',move); window.removeEventListener('mouseup',up); };
    window.addEventListener('mousemove',move); window.addEventListener('mouseup',up);
  };
  return (
    <div className={"window "+(focused?'focused':'')+(w.minimized?' minimized':'')}
         style={{left:w.x, top:w.y, width:w.w, height:w.h, zIndex:w.z}} onMouseDown={onFocus}>
      <div className="titlebar" ref={titleRef} onMouseDown={onMouseDown} onDoubleClick={onMax}>
        <div className="tbc-row">
          <span className="tbc close" onClick={(e)=>{e.stopPropagation();onClose();}}><Ic.close/></span>
          <span className="tbc min" onClick={(e)=>{e.stopPropagation();onMin();}}><Ic.min/></span>
          <span className="tbc max" onClick={(e)=>{e.stopPropagation();onMax();}}><Ic.max/></span>
        </div>
        <div className="titlebar-title"><span className="ic">{w.icon}</span>{w.title}</div>
        <div className="titlebar-meta">{w.meta && w.meta.map((m,i)=><span key={i} className="pill">{m}</span>)}</div>
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}

/* ============ Spotlight ============ */
function Spotlight({ apps, onClose, onLaunch }) {
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const filt = useMemo(()=>apps.filter(a=>!q || (a.name+a.desc).toLowerCase().includes(q.toLowerCase())).slice(0,8),[q, apps]);
  useEffect(()=>{ setIdx(0); },[q]);
  const onKey = (e)=>{
    if (e.key==='Escape') onClose();
    else if (e.key==='ArrowDown') { setIdx(i=>Math.min(i+1, filt.length-1)); e.preventDefault(); }
    else if (e.key==='ArrowUp') { setIdx(i=>Math.max(i-1, 0)); e.preventDefault(); }
    else if (e.key==='Enter') { if (filt[idx]) { onLaunch(filt[idx].id); onClose(); } }
  };
  return (
    <div className="spotlight-bg" onClick={onClose}>
      <div className="spotlight" onClick={e=>e.stopPropagation()}>
        <div className="spotlight-input">
          <Ic.search size={20}/>
          <input autoFocus placeholder="Search apps, run commands…" value={q} onChange={e=>setQ(e.target.value)} onKeyDown={onKey}/>
          <kbd>ESC</kbd>
        </div>
        <div className="spotlight-list">
          {filt.length===0 && <div className="spotlight-empty">No matches.</div>}
          {filt.map((a,i)=>(
            <div key={a.id} className={"spotlight-item "+(i===idx?'active':'')} onClick={()=>{onLaunch(a.id); onClose();}}>
              <div className="ic">{a.icon}</div>
              <div><div className="nm">{a.name}</div><div className="ds">{a.desc}</div></div>
              <div className="spotlight-meta">{a.meta||'app'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

window.BootScreen = BootScreen; window.LockScreen = LockScreen; window.Wallpaper = Wallpaper;
window.MenuBar = MenuBar; window.Dock = Dock; window.Window = Window; window.Spotlight = Spotlight;
