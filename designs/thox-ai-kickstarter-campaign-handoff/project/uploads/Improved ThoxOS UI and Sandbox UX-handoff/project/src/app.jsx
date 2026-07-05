/* global React, ReactDOM, Ic, BootScreen, LockScreen, Wallpaper, MenuBar, Dock, Window, Spotlight,
   AIInferenceApp, MagStackApp, TerminalApp, GPUApp, SettingsApp,
   QuantumApp, PipelineApp, AgentsApp, MeshApp, DistInfApp, MemHierApp, SecurityApp, KVCacheApp, OTAApp, DemoModeApp, DeviceInfoApp, RealtimeChatApp, ArchitectureApp,
   useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakToggle,
   useIsMobile, MobileHome, MobileAppShell */
const { useState, useEffect, useCallback } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "comfortable",
  "wallpaper": "grid",
  "telemetry": true
}/*EDITMODE-END*/;

const APPS = [
  { id:'inference', name:'AI Inference',   desc:'Claude · FP8 · KV-cache',        icon:<Ic.sparkle size={20}/>, meta:'app', component:AIInferenceApp,  w:920, h:580, pinned:true },
  { id:'magstack',  name:'MagStack',       desc:'Cluster topology · Raft',        icon:<Ic.cluster size={20}/>, meta:'app', component:MagStackApp,     w:780, h:620, pinned:true },
  { id:'quantum',   name:'Quantum Sim',    desc:'Bloch sphere · cuStateVec',      icon:<Ic.atom size={20}/>,    meta:'app', component:QuantumApp,      w:880, h:560, pinned:true },
  { id:'pipeline',  name:'Edge Pipeline',  desc:'Camera → LLM · 5 stages',        icon:<Ic.flow size={20}/>,    meta:'app', component:PipelineApp,     w:880, h:540, pinned:true },
  { id:'gpu',       name:'GPU Dashboard',  desc:'SM cores · power rails',         icon:<Ic.bars size={20}/>,    meta:'app', component:GPUApp,          w:720, h:540, pinned:true },
  { id:'terminal',  name:'Terminal',       desc:'thox-shell',                     icon:<Ic.term size={20}/>,    meta:'app', component:TerminalApp,     w:760, h:480, pinned:true },
  { id:'agents',    name:'Agents',         desc:'NullClaw · MCP runtime',         icon:<Ic.bot size={20}/>,     meta:'app', component:AgentsApp,       w:880, h:580, pinned:true },
  { id:'mesh',      name:'Mesh Cognition', desc:'CfC network · Kuramoto sync',    icon:<Ic.brain size={20}/>,   meta:'app', component:MeshApp,         w:780, h:600, pinned:true },
  { id:'distinf',   name:'Dist Inference', desc:'TP · PP · DP parallelism',       icon:<Ic.shards size={20}/>,  meta:'app', component:DistInfApp,      w:880, h:600, pinned:true },
  { id:'memhier',   name:'Memory',         desc:'5-tier hierarchy · UMA budget',  icon:<Ic.layers size={20}/>,  meta:'app', component:MemHierApp,      w:780, h:560, pinned:true },
  { id:'security',  name:'Security',       desc:'Boot chain · TPM 2.0',           icon:<Ic.shield size={20}/>,  meta:'app', component:SecurityApp,     w:860, h:560, pinned:true },
  { id:'kvcache',   name:'KV Cache',       desc:'PolarQuant · NVMe offload',      icon:<Ic.cache size={20}/>,   meta:'app', component:KVCacheApp,      w:780, h:480, pinned:true },
  { id:'ota',       name:'OTA Updates',    desc:'A/B partition · components',     icon:<Ic.download size={20}/>,meta:'app', component:OTAApp,          w:820, h:560, pinned:true },
  { id:'rtchat',    name:'Realtime Chat',  desc:'WebRTC · OpenAI compat',         icon:<Ic.mic size={20}/>,     meta:'app', component:RealtimeChatApp, w:760, h:540, pinned:true },
  { id:'arch',      name:'Architecture',   desc:'Agent runtime diagram',          icon:<Ic.graph size={20}/>,   meta:'sys', component:ArchitectureApp, w:720, h:480, pinned:true },
  { id:'demo',      name:'Demo Mode',      desc:'55s Kickstarter walkthrough',    icon:<Ic.play size={20}/>,    meta:'sys', component:DemoModeApp,     w:760, h:520, pinned:true },
  { id:'device',    name:'Device Info',    desc:'Spec sheet · SKU comparison',    icon:<Ic.info size={20}/>,    meta:'sys', component:DeviceInfoApp,   w:780, h:560, pinned:true },
  { id:'settings',  name:'Settings',       desc:'Density · wallpaper',            icon:<Ic.chip size={20}/>,    meta:'sys', component:SettingsApp,     w:640, h:460, pinned:true },
];

function ThoxOS() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [phase, setPhase] = useState('boot'); // boot | lock | desktop
  const [windows, setWindows] = useState([]); // {id, appId, x,y,w,h, z, minimized, ...}
  const [zCounter, setZCounter] = useState(10);
  const [focusedId, setFocusedId] = useState(null);
  const [spotOpen, setSpotOpen] = useState(false);
  const [mobileApp, setMobileApp] = useState(null); // appId currently open in mobile fullscreen
  const isMobile = useIsMobile();

  useEffect(()=>{
    const onKey = (e)=>{
      if ((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k') { e.preventDefault(); setSpotOpen(s=>!s); }
      if (e.key==='Escape') setSpotOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
  },[]);

  const launch = useCallback((appId)=>{
    const app = APPS.find(a=>a.id===appId);
    if (!app) return;
    const existing = windows.find(w=>w.appId===appId);
    setZCounter(z=>z+1);
    if (existing) {
      setWindows(ws=>ws.map(w=>w.appId===appId ? { ...w, minimized:false, z:zCounter+1 } : w));
      setFocusedId(existing.id);
    } else {
      const id = appId+'-'+Date.now();
      const x = 60 + (windows.length*30)%200;
      const y = 50 + (windows.length*24)%140;
      setWindows(ws=>[...ws, { id, appId, x, y, w:app.w, h:app.h, z:zCounter+1, minimized:false }]);
      setFocusedId(id);
    }
  },[windows, zCounter]);

  const focus = (id)=>{ setZCounter(z=>z+1); setWindows(ws=>ws.map(w=>w.id===id?{...w, z:zCounter+1}:w)); setFocusedId(id); };
  const close = (id)=>{ setWindows(ws=>ws.filter(w=>w.id!==id)); setFocusedId(null); };
  const min = (id)=>{ setWindows(ws=>ws.map(w=>w.id===id?{...w, minimized:true}:w)); };
  const max = (id)=>{
    setWindows(ws=>ws.map(w=>w.id===id?{...w, x:8, y:8, w:window.innerWidth-16, h:window.innerHeight-30-70}:w));
  };
  const move = (id, x, y)=>{ setWindows(ws=>ws.map(w=>w.id===id?{...w, x, y}:w)); };

  const focusedApp = windows.find(w=>w.id===focusedId);
  const focusedAppDef = focusedApp ? APPS.find(a=>a.id===focusedApp.appId) : null;

  if (phase==='boot') return <BootScreen onDone={()=>setPhase('lock')}/>;
  if (phase==='lock') return <LockScreen user="tommy" onUnlock={()=>setPhase('desktop')}/>;

  // ===== Mobile shell =====
  if (isMobile) {
    const currentApp = mobileApp ? APPS.find(a=>a.id===mobileApp) : null;
    return (
      <div data-density={tweaks.density} data-shell="mobile">
        <Wallpaper kind={tweaks.wallpaper}/>
        {!currentApp && <MobileHome apps={APPS} onLaunch={(id)=>setMobileApp(id)} onSpotlight={()=>setSpotOpen(true)}/>}
        {currentApp && (
          <MobileAppShell app={currentApp} onHome={()=>setMobileApp(null)} onSpotlight={()=>setSpotOpen(true)}>
            {React.createElement(currentApp.component, { tweaks, setTweak, mobile: true })}
          </MobileAppShell>
        )}
        {spotOpen && <Spotlight apps={APPS} onClose={()=>setSpotOpen(false)} onLaunch={(id)=>{setMobileApp(id); setSpotOpen(false);}}/>}
      </div>
    );
  }

  const openIds = windows.filter(w=>!w.minimized).map(w=>w.appId);
  const visibleWindows = windows.filter(w=>!w.minimized);

  return (
    <div data-density={tweaks.density}>
      <Wallpaper kind={tweaks.wallpaper}/>
      <MenuBar
        activeApp={focusedAppDef?.name}
        onOpenSpotlight={()=>setSpotOpen(true)}
        telemetry={tweaks.telemetry}
        apps={APPS}
        openIds={openIds}
        onLaunch={launch}
        onFocusApp={(appId)=>{ const w=windows.find(x=>x.appId===appId); if(w){ setWindows(ws=>ws.map(z=>z.id===w.id?{...z,minimized:false}:z)); focus(w.id); } }}
        onCloseAll={()=>{ setWindows([]); setFocusedId(null); }}
        onMinAll={()=>setWindows(ws=>ws.map(w=>({...w,minimized:true})))}
        onTilesView={()=>{
          const vw = window.innerWidth, vh = window.innerHeight - 30 - 80;
          const open = windows.filter(w=>!w.minimized);
          const cols = Math.ceil(Math.sqrt(open.length||1));
          const rows = Math.ceil((open.length||1)/cols);
          const cw = Math.floor(vw/cols)-12, ch = Math.floor(vh/rows)-12;
          setWindows(ws=>ws.map(w=>{
            const i = open.findIndex(o=>o.id===w.id);
            if (i<0) return w;
            const r = Math.floor(i/cols), c = i%cols;
            return { ...w, x: 6+c*(cw+12), y: 36+r*(ch+12), w: cw, h: ch };
          }));
        }}
        onAbout={()=>launch('arch')}
      />

      <div className="desktop">
        {windows.length===0 && <EmptyHero onLaunch={launch}/>}
        {windows.map(w=>{
          const app = APPS.find(a=>a.id===w.appId);
          if (!app) return null;
          const Comp = app.component;
          return (
            <Window key={w.id}
              w={{ ...w, title:app.name, icon:app.icon, meta:[app.meta, w.appId==='inference'?'sonnet-4':'',w.appId==='magstack'?'4 nodes':'',w.appId==='terminal'?'bash':''].filter(Boolean) }}
              focused={focusedId===w.id}
              onFocus={()=>focus(w.id)} onClose={()=>close(w.id)} onMin={()=>min(w.id)} onMax={()=>max(w.id)} onMove={(x,y)=>move(w.id,x,y)}>
              <Comp tweaks={tweaks} setTweak={setTweak}/>
            </Window>
          );
        })}
      </div>

      <Dock apps={APPS} openIds={openIds} focusedId={focusedAppDef?.id} onLaunch={launch}/>

      {spotOpen && <Spotlight apps={APPS} onClose={()=>setSpotOpen(false)} onLaunch={launch}/>}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Display">
          <TweakRadio label="Density" value={tweaks.density} options={[{value:'compact',label:'Compact'},{value:'comfortable',label:'Comfy'},{value:'spacious',label:'Spacious'}]} onChange={v=>setTweak('density',v)}/>
          <TweakRadio label="Wallpaper" value={tweaks.wallpaper} options={[{value:'grid',label:'Grid'},{value:'rings',label:'Rings'},{value:'noise',label:'Aurora'}]} onChange={v=>setTweak('wallpaper',v)}/>
        </TweakSection>
        <TweakSection label="System">
          <TweakToggle label="Telemetry chips" value={tweaks.telemetry} onChange={v=>setTweak('telemetry',v)}/>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function EmptyHero({ onLaunch }) {
  return (
    <div className="empty-hero">
      <div className="hero-glyph">
        <svg viewBox="0 0 116 110" width="120" height="120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="14" y="14" width="88" height="82" rx="10"/>
          <rect x="42" y="40" width="32" height="30" rx="3" fill="#000"/>
          <rect x="54" y="51" width="8" height="8" rx="1" strokeWidth="1.6"/>
          <g strokeWidth="2.4">
            <path d="M30 2v12M44 2v12M58 2v12M72 2v12M86 2v12"/>
            <path d="M30 96v12M44 96v12M58 96v12M72 96v12M86 96v12"/>
            <path d="M2 30h12M2 44h12M2 58h12M2 72h12M2 86h12"/>
            <path d="M102 30h12M102 44h12M102 58h12M102 72h12M102 86h12"/>
          </g>
        </svg>
      </div>
      <div className="hero-name">Thox<b>OS</b></div>
      <div className="hero-status"><span className="led"/> Status: Ready</div>
      <div className="hero-tele mono">AI INFERENCE · 42 TOK/S · FP8</div>
      <div className="hero-hint">Press <kbd>⌘K</kbd> to search apps</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ThoxOS/>);
