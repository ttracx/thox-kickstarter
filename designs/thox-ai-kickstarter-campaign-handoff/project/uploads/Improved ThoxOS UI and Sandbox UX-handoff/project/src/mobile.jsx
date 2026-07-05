/* global React, Ic */
const { useState, useEffect, useRef } = React;

function useIsMobile() {
  const [m, setM] = useState(()=>typeof window!=='undefined' && (window.innerWidth < 768 || /iPhone|Android.*Mobile|iPod/.test(navigator.userAgent)));
  useEffect(()=>{
    const onR = ()=>setM(window.innerWidth < 768 || /iPhone|Android.*Mobile|iPod/.test(navigator.userAgent));
    window.addEventListener('resize', onR);
    return ()=>window.removeEventListener('resize', onR);
  },[]);
  return m;
}

/* ============ Mobile Status Bar ============ */
function MobileStatusBar() {
  const [now, setNow] = useState(new Date());
  useEffect(()=>{ const id=setInterval(()=>setNow(new Date()),1000); return ()=>clearInterval(id); },[]);
  const t = now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', hour12:false });
  return (
    <div className="mb-status">
      <span className="mb-time mono">{t}</span>
      <span className="mb-tele">
        <span className="mb-chip"><span className="led"/>42 t/s</span>
        <span className="mb-chip"><span className="led amber"/>FP8</span>
        <Ic.wifi size={14}/>
      </span>
    </div>
  );
}

/* ============ Mobile Home Screen ============ */
function MobileHome({ apps, onLaunch, onSpotlight }) {
  const pinned = apps.filter(a=>a.pinned);
  // Hero apps for the AI edge device — offline AI first
  const heroIds = ['inference','rtchat','terminal','magstack'];
  const hero = heroIds.map(id=>apps.find(a=>a.id===id)).filter(Boolean);
  const grid = pinned.filter(a=>!heroIds.includes(a.id));
  const dockApps = ['inference','rtchat','terminal','settings'].map(id=>apps.find(a=>a.id===id)).filter(Boolean);

  return (
    <div className="mobile-home">
      <MobileStatusBar/>
      <div className="mb-header">
        <img src="assets/thox-icon-green.png" className="mb-mark" alt=""/>
        <div>
          <div className="mb-brand">Thox<b>OS</b></div>
        </div>
      </div>

      <div className="mb-search" onClick={onSpotlight}>
        <Ic.search size={14}/> <span>Ask anything · search apps</span>
      </div>

      <div className="mb-section-h">Hero apps</div>
      <div className="mb-hero-grid">
        {hero.map(a=>(
          <button key={a.id} className="mb-hero-tile" onClick={()=>onLaunch(a.id)}>
            <div className="mb-hero-ic">{a.icon}</div>
            <div className="mb-hero-nm">{a.name}</div>
            <div className="mb-hero-ds">{a.desc}</div>
          </button>
        ))}
      </div>

      <div className="mb-section-h">All apps</div>
      <div className="mb-grid">
        {grid.map(a=>(
          <button key={a.id} className="mb-app" onClick={()=>onLaunch(a.id)}>
            <div className="mb-app-ic">{a.icon}</div>
            <div className="mb-app-nm">{a.name}</div>
          </button>
        ))}
      </div>

      <div className="mb-dock">
        {dockApps.map(a=>(
          <button key={a.id} className="mb-dock-app" onClick={()=>onLaunch(a.id)}>
            <div className="mb-dock-ic">{a.icon}</div>
          </button>
        ))}
      </div>
      <div className="mb-handle"/>
    </div>
  );
}

/* ============ Mobile App Shell (fullscreen) ============ */
function MobileAppShell({ app, onHome, onSpotlight, children }) {
  return (
    <div className="mobile-app">
      <MobileStatusBar/>
      <div className="mb-app-bar">
        <button className="mb-back" onClick={onHome}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <div className="mb-app-title">
          <span className="ic">{app.icon}</span>{app.name}
        </div>
        <button className="mb-back" onClick={onSpotlight}><Ic.search size={16}/></button>
      </div>
      <div className="mb-app-body">{children}</div>
      <div className="mb-handle"/>
    </div>
  );
}

window.useIsMobile = useIsMobile;
window.MobileHome = MobileHome;
window.MobileAppShell = MobileAppShell;
window.MobileStatusBar = MobileStatusBar;
