/* global React, Ic */
const { useState, useEffect, useRef, useMemo } = React;

/* ============ Quantum Sim ============ */
function QuantumApp() {
  const [theta, setTheta] = useState(45);
  const [phi, setPhi] = useState(60);
  const [backend, setBackend] = useState('cuStateVec');
  const [qubits, setQubits] = useState(8);
  const probs = useMemo(()=>{
    const out = []; const n = 1<<qubits;
    for (let i=0;i<Math.min(n,16);i++) out.push({ s:i.toString(2).padStart(qubits,'0'), p: Math.pow(Math.random(),2)/4 });
    const sum = out.reduce((a,b)=>a+b.p,0)||1; return out.map(o=>({...o, p:o.p/sum }));
  },[qubits, theta, phi]);
  const x = Math.sin(theta*Math.PI/180)*Math.cos(phi*Math.PI/180);
  const y = Math.sin(theta*Math.PI/180)*Math.sin(phi*Math.PI/180);
  const z = Math.cos(theta*Math.PI/180);
  return (
    <div className="app qsim">
      <div className="qsim-rail">
        <div className="rail-h">BACKEND</div>
        <div className="seg col">
          {['cuStateVec','cuTensorNet','cuDensityMat'].map(b=>
            <button key={b} className={backend===b?'on':''} onClick={()=>setBackend(b)}>{b}</button>)}
        </div>
        <div className="rail-h" style={{marginTop:14}}>QUBITS</div>
        <input type="range" min="2" max="12" value={qubits} onChange={e=>setQubits(+e.target.value)}/>
        <div className="rail-row"><span>n</span><b className="mono">{qubits}</b></div>
        <div className="rail-row"><span>states</span><b className="mono">{1<<qubits}</b></div>
        <div className="rail-h" style={{marginTop:14}}>BLOCH</div>
        <div className="rail-row"><span>θ</span><b className="mono">{theta}°</b></div>
        <div className="rail-row"><span>φ</span><b className="mono">{phi}°</b></div>
        <input type="range" min="0" max="180" value={theta} onChange={e=>setTheta(+e.target.value)}/>
        <input type="range" min="0" max="360" value={phi} onChange={e=>setPhi(+e.target.value)}/>
      </div>
      <div className="qsim-main">
        <div className="qsim-bloch">
          <svg viewBox="-110 -110 220 220">
            <ellipse cx="0" cy="0" rx="90" ry="22" fill="none" stroke="#27272A"/>
            <circle cx="0" cy="0" r="90" fill="none" stroke="#27272A"/>
            <line x1="0" y1="-90" x2="0" y2="90" stroke="#27272A"/>
            <line x1="-90" y1="0" x2="90" y2="0" stroke="#27272A"/>
            <line x1="-60" y1="35" x2="60" y2="-35" stroke="#27272A" strokeDasharray="2 3"/>
            <text x="0" y="-94" textAnchor="middle" fontSize="9" fill="#71717A" fontFamily="JetBrains Mono">|0⟩</text>
            <text x="0" y="100" textAnchor="middle" fontSize="9" fill="#71717A" fontFamily="JetBrains Mono">|1⟩</text>
            <line x1="0" y1="0" x2={x*90} y2={-z*90} stroke="#34D399" strokeWidth="2"/>
            <circle cx={x*90} cy={-z*90} r="5" fill="#34D399"/>
            <circle cx="0" cy="0" r="3" fill="#FAFAFA"/>
          </svg>
        </div>
        <div className="qsim-hist">
          <div className="rail-h">PROBABILITY · |ψ⟩</div>
          <div className="hist">
            {probs.map((p,i)=>(
              <div className="hist-row" key={i}>
                <span className="mono lbl">|{p.s}⟩</span>
                <div className="bar"><i style={{width:(p.p*100)+'%'}}/></div>
                <span className="mono val">{(p.p*100).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ Edge Pipeline ============ */
function PipelineApp() {
  const stages = ['Camera','Vision','Router','LLM','Embed'];
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(()=>{ if(!auto) return; const id=setInterval(()=>setActive(a=>(a+1)%stages.length), 900); return ()=>clearInterval(id); },[auto]);
  return (
    <div className="app pipeline">
      <div className="pipe-h">
        <div><div className="eye mono">EDGE PIPELINE</div><div className="ttl">Camera → Vision → Router → LLM/Quantum/Embed</div></div>
        <div className="seg"><button className={auto?'on':''} onClick={()=>setAuto(true)}>auto</button><button className={!auto?'on':''} onClick={()=>setAuto(false)}>step</button></div>
      </div>
      <div className="pipe-flow">
        {stages.map((s,i)=>(
          <React.Fragment key={s}>
            <div className={"pipe-node "+(active===i?'active':'')+(active>i?' done':'')} onClick={()=>{setAuto(false);setActive(i);}}>
              <div className="node-ic mono">{'0'+(i+1)}</div>
              <div className="node-name">{s}</div>
              <div className="node-sub mono">{['1080p · 30fps','YOLO-S · 24ms','intent · 4ms','sonnet-4 · 42t/s','384d · 8ms'][i]}</div>
            </div>
            {i<stages.length-1 && <div className={"pipe-arrow "+(active>i?'lit':'')}>→</div>}
          </React.Fragment>
        ))}
      </div>
      <div className="pipe-jobs">
        <div className="rail-h">DEMO JOBS</div>
        {[
          ['object-count','count visible objects','done','312ms'],
          ['caption-frame','natural language caption','running','—'],
          ['route-intent','classify and dispatch','queued','—'],
          ['embed-context','build vector context','queued','—'],
          ['summarize','24-token summary','queued','—'],
        ].map(([n,d,s,t])=>(
          <div className="job mono" key={n}><span className={"st "+s}/><b>{n}</b><span className="d">{d}</span><span className="t">{t}</span></div>
        ))}
      </div>
    </div>
  );
}

/* ============ Agents (NullClaw) ============ */
function AgentsApp() {
  const subs = [
    { id:'planner', name:'Planner', tool:'mcp:plan', state:'thinking', msg:'Decomposing: "Build cluster status report"' },
    { id:'researcher', name:'Researcher', tool:'mcp:web', state:'tool', msg:'fetching docs/magstack.md…' },
    { id:'coder', name:'Coder', tool:'mcp:fs+exec', state:'idle', msg:'Awaiting plan v3' },
    { id:'verifier', name:'Verifier', tool:'mcp:test', state:'idle', msg:'Last run: 42/42 PASS' },
  ];
  const [log, setLog] = useState([
    {who:'planner', t:'14:02:11', text:'Decomposed task into 4 subgoals.'},
    {who:'researcher', t:'14:02:14', text:'Fetched MagStack consensus protocol.'},
    {who:'planner', t:'14:02:18', text:'Spawned coder.thread#3.'},
    {who:'coder', t:'14:02:24', text:'Wrote node-roster.json (4 nodes).'},
    {who:'verifier', t:'14:02:30', text:'Schema check OK.'},
  ]);
  const [input, setInput] = useState('');
  const [attach, setAttach] = useState([]);
  const [tool, setTool] = useState('plan');
  const [busy, setBusy] = useState(false);
  const tools = [
    { id:'plan', name:'Plan & dispatch', desc:'Decompose · spawn agents' },
    { id:'web', name:'Web research',    desc:'Researcher · fetch docs' },
    { id:'code', name:'Code & run',     desc:'Coder · sandboxed exec' },
    { id:'fs',  name:'Filesystem',      desc:'Read/write /mnt/thox' },
    { id:'verify', name:'Verifier',     desc:'Tests · schema · lint' },
  ];
  const send = ()=>{
    if (!input.trim() || busy) return;
    const t = new Date().toTimeString().slice(0,8);
    setLog(l=>[...l, { who:'user', t, text:'▸ '+input }]);
    setInput(''); setAttach([]); setBusy(true);
    setTimeout(()=>{
      setLog(l=>[...l, { who:'planner', t:new Date().toTimeString().slice(0,8), text:'Accepted task — dispatching ['+tool+'] to subagents.' }]);
      setBusy(false);
    }, 700);
  };
  useEffect(()=>{
    const id=setInterval(()=>{
      const tags=['planner','researcher','coder','verifier'];
      const lines=['planning step','tool call: read(...)','wrote artifact','verifier passed','checkpoint saved'];
      const now = new Date(); const t=now.toTimeString().slice(0,8);
      setLog(l=>[...l.slice(-30), {who:tags[Math.floor(Math.random()*4)], t, text:lines[Math.floor(Math.random()*lines.length)]}]);
    }, 1800);
    return ()=>clearInterval(id);
  },[]);
  return (
    <div className="app agents">
      <div className="agents-rail">
        <div className="rail-h">NULLCLAW · v0.4</div>
        {subs.map(s=>(
          <div className="agent-card" key={s.id}>
            <div className="ah"><b>{s.name}</b><span className={"st "+s.state}/></div>
            <div className="at mono">{s.tool}</div>
            <div className="am">{s.msg}</div>
          </div>
        ))}
        <div className="rail-h" style={{marginTop:12}}>MEMORY</div>
        <div className="rail-row"><span>SQLite</span><b className="mono">2.4 MB</b></div>
        <div className="rail-row"><span>Vectors</span><b className="mono">1,128</b></div>
        <div className="rail-row"><span>Tools</span><b className="mono">14 MCP</b></div>
      </div>
      <div className="agents-log">
        <div className="rail-h">RUNTIME LOG</div>
        <div className="log">
          {log.map((l,i)=>(
            <div className="log-line" key={i}>
              <span className="mono ts">{l.t}</span>
              <span className={"who "+l.who}>{l.who}</span>
              <span className="msg">{l.text}</span>
            </div>
          ))}
        </div>
        <ChatComposer
          value={input} onChange={setInput} onSend={send} disabled={busy}
          placeholder="Direct the swarm — describe a task…"
          tools={tools} tool={tool} onTool={setTool}
          attachments={attach} onAttach={(a)=>setAttach(s=>[...s,a])} onClearAttach={(i)=>setAttach(s=>s.filter((_,j)=>j!==i))}
        />
      </div>
    </div>
  );
}

/* ============ Mesh Cognition ============ */
function MeshApp() {
  const [phase, setPhase] = useState(0);
  useEffect(()=>{ const id=setInterval(()=>setPhase(p=>p+0.04),60); return ()=>clearInterval(id); },[]);
  const sync = 0.62 + 0.18*Math.sin(phase*0.4);
  // generate 64 neurons on a grid
  const nodes = useMemo(()=>{
    const a=[]; for (let i=0;i<64;i++){ const r=4+i%8; const c=Math.floor(i/8); a.push({x:14+r*8.5, y:14+c*8.5, off: Math.random()*Math.PI*2}); } return a;
  },[]);
  return (
    <div className="app mesh">
      <div className="mesh-h">
        <div><div className="eye mono">CFC NETWORK</div><div className="ttl">64-neuron cognitive mesh · Kuramoto sync</div></div>
        <div className="mesh-stat"><div><b className="mono">{(sync*100).toFixed(1)}%</b><span>sync</span></div><div><b className="mono">42 Hz</b><span>γ-band</span></div><div><b className="mono">UET·MEC·CRE</b><span>stack</span></div></div>
      </div>
      <div className="mesh-canvas">
        <svg viewBox="0 0 100 80">
          <defs><radialGradient id="nf"><stop offset="0%" stopColor="#34D399" stopOpacity=".9"/><stop offset="100%" stopColor="#34D399" stopOpacity="0"/></radialGradient></defs>
          {nodes.map((n,i)=>{
            const f = (Math.sin(phase + n.off)+1)/2;
            const r = 1 + f*1.5;
            return <g key={i}><circle cx={n.x} cy={n.y} r={r+1.5} fill="url(#nf)" opacity={f*0.4}/><circle cx={n.x} cy={n.y} r={r} fill={f>0.7?'#34D399':'#3F3F46'}/></g>;
          })}
        </svg>
      </div>
      <div className="mesh-stack">
        {[['UET','urgency · effort · time', 0.72],['MEC','memory · emotion · context', 0.58],['CRE','create · respond · evaluate', 0.81]].map(([k,d,v])=>(
          <div className="stack-row" key={k}><span className="k mono">{k}</span><span className="d">{d}</span><div className="bar"><i style={{width:(v*100)+'%'}}/></div><span className="mono v">{(v*100).toFixed(0)}%</span></div>
        ))}
      </div>
    </div>
  );
}

/* ============ Distributed Inference ============ */
function DistInfApp() {
  const [mode, setMode] = useState('TP');
  const [scale, setScale] = useState(8);
  return (
    <div className="app distinf">
      <div className="pipe-h">
        <div><div className="eye mono">DISTRIBUTED INFERENCE</div><div className="ttl">Tensor / Pipeline / Duplication parallelism</div></div>
        <div className="seg">{['TP','PP','DP'].map(m=><button key={m} className={mode===m?'on':''} onClick={()=>setMode(m)}>{m}</button>)}</div>
      </div>
      <div className="distinf-grid">
        {Array.from({length:scale}).map((_,i)=>(
          <div className="d-shard" key={i}>
            <div className="d-h mono">shard-{String(i).padStart(2,'0')}</div>
            <div className="d-vis">
              {Array.from({length:8}).map((_,j)=><div key={j} className="d-cell" style={{opacity:0.2+Math.random()*0.7}}/>)}
            </div>
            <div className="d-row mono"><span>{mode==='TP'?'attn-h '+(i*4)+'…'+(i*4+3):mode==='PP'?'layer '+(i*4)+'-'+(i*4+3):'rep-'+i}</span><span>{(40+Math.random()*8).toFixed(1)}t/s</span></div>
          </div>
        ))}
      </div>
      <div className="distinf-foot">
        <div className="seg"><span>cluster</span>{[4,8,16,32].map(n=><button key={n} className={scale===n?'on':''} onClick={()=>setScale(n)}>{n}×</button>)}</div>
        <div className="distinf-stat mono"><b>{(scale*42).toFixed(0)} t/s</b> aggregate · <b>spec-decode 1.8×</b> · <b>{(scale*0.62).toFixed(1)}KW</b></div>
      </div>
    </div>
  );
}

/* ============ Memory Hierarchy ============ */
function MemHierApp() {
  const tiers = [
    {k:'T0', n:'Register file', s:'2 MB',  bw:'8 TB/s', use:0.92, c:'#34D399'},
    {k:'T1', n:'L1/L2 cache',   s:'12 MB', bw:'2.1 TB/s', use:0.78, c:'#10B981'},
    {k:'T2', n:'UMA LPDDR5',    s:'16 GB', bw:'102 GB/s', use:0.71, c:'#A78BFA'},
    {k:'T3', n:'NVMe paged',    s:'2 TB',  bw:'7 GB/s', use:0.34, c:'#F59E0B'},
    {k:'T4', n:'Network tier',  s:'cluster', bw:'10 Gb', use:0.18, c:'#71717A'},
  ];
  return (
    <div className="app memhier">
      <div className="pipe-h"><div><div className="eye mono">MEMORY</div><div className="ttl">5-tier hierarchy · UMA budget manager</div></div></div>
      <div className="pyramid">
        {tiers.map((t,i)=>(
          <div className="pyr-row" key={t.k} style={{width:(40+i*15)+'%'}}>
            <span className="pyr-k mono" style={{color:t.c}}>{t.k}</span>
            <span className="pyr-n">{t.n}</span>
            <span className="pyr-s mono">{t.s}</span>
            <span className="pyr-bw mono">{t.bw}</span>
            <div className="bar" style={{width:80}}><i style={{width:(t.use*100)+'%', background:t.c}}/></div>
          </div>
        ))}
      </div>
      <div className="uma">
        <div className="rail-h">UMA BUDGET · 16 GB</div>
        <div className="uma-bar">
          <i style={{width:'42%', background:'#34D399'}} title="model"/>
          <i style={{width:'18%', background:'#A78BFA'}} title="kv-cache"/>
          <i style={{width:'12%', background:'#F59E0B'}} title="vision"/>
          <i style={{width:'8%', background:'#22D3EE'}} title="quantum"/>
          <i style={{width:'14%', background:'#3F3F46'}} title="os"/>
        </div>
        <div className="uma-legend mono">
          <span><i style={{background:'#34D399'}}/>model 6.7G</span>
          <span><i style={{background:'#A78BFA'}}/>kv 2.9G</span>
          <span><i style={{background:'#F59E0B'}}/>vision 1.9G</span>
          <span><i style={{background:'#22D3EE'}}/>qsim 1.3G</span>
          <span><i style={{background:'#3F3F46'}}/>os 2.2G</span>
        </div>
      </div>
    </div>
  );
}

/* ============ Security Center ============ */
function SecurityApp() {
  const chain = [
    ['BootROM','signed','ok'],
    ['SecureBoot','PKCS7 verified','ok'],
    ['Bootloader','sha256 ok','ok'],
    ['Kernel','PREEMPT_RT signed','ok'],
    ['Init','attested','ok'],
    ['ThoxOS','TPM quote 0xA1F4','ok'],
    ['Apps','sandboxed','ok'],
  ];
  return (
    <div className="app sec">
      <div className="pipe-h">
        <div><div className="eye mono">SECURITY CENTER</div><div className="ttl">Zero-trust scorecard · TPM 2.0 attestation</div></div>
        <div className="trust"><b className="mono">7/7</b><span>MAXIMUM TRUST</span></div>
      </div>
      <div className="sec-chain">
        {chain.map(([n,d,s],i)=>(
          <div className="cl" key={n}>
            <div className="dot ok"/>
            <div><div className="cn">{n}</div><div className="cd mono">{d}</div></div>
            {i<chain.length-1 && <div className="cr">→</div>}
          </div>
        ))}
      </div>
      <div className="sec-grid">
        <div className="card"><div className="rail-h">FIREWALL · ACTIVE</div>
          <div className="rules mono">
            <div>ALLOW · :443 · cluster-comm</div>
            <div>ALLOW · :50051 · gRPC raft</div>
            <div>DENY · :22 · ssh</div>
            <div>DENY · 0.0.0.0/0 · default</div>
          </div>
        </div>
        <div className="card"><div className="rail-h">COMPLIANCE</div>
          <div className="badges">
            {['SOC 2','HIPAA','FIPS 140-3','GDPR'].map(b=><span className="badge" key={b}>{b}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============ KV Cache ============ */
function KVCacheApp() {
  const [ctx, setCtx] = useState(64);
  const sizeGb = (ctx*1024 / 1024 / 1024 * 0.18).toFixed(2);
  const compressed = (sizeGb / 3.76).toFixed(2);
  return (
    <div className="app kvc">
      <div className="pipe-h"><div><div className="eye mono">KV CACHE</div><div className="ttl">PolarQuant compression · NVMe offload</div></div></div>
      <div className="kvc-slider">
        <div className="rail-h">CONTEXT WINDOW · {ctx}K tokens</div>
        <input type="range" min="2" max="254" value={ctx} onChange={e=>setCtx(+e.target.value)}/>
        <div className="kvc-stats mono">
          <div><b>{ctx}K</b><span>tokens</span></div>
          <div><b>{sizeGb} GB</b><span>raw</span></div>
          <div><b>{compressed} GB</b><span>polarquant</span></div>
          <div><b>3.76×</b><span>ratio</span></div>
        </div>
      </div>
      <div className="kvc-flow">
        <div className="kvf-box hot"><b>VRAM</b><span className="mono">hot · 2.1 GB</span></div>
        <div className="kvf-arrow">→</div>
        <div className="kvf-box warm"><b>UMA</b><span className="mono">warm · 4.4 GB</span></div>
        <div className="kvf-arrow">→</div>
        <div className="kvf-box cold"><b>NVMe</b><span className="mono">cold · paged · 0.5 ms</span></div>
      </div>
    </div>
  );
}

/* ============ OTA Updates ============ */
function OTAApp() {
  return (
    <div className="app ota">
      <div className="pipe-h"><div><div className="eye mono">OTA UPDATES</div><div className="ttl">A/B partition · component-level rollouts</div></div></div>
      <div className="ab">
        <div className="ab-side current">
          <div className="rail-h">SLOT A · running</div>
          <div className="v mono">v6.1.0-stable</div>
          <div className="b mono">build 20260418.214</div>
        </div>
        <div className="ab-side next">
          <div className="rail-h">SLOT B · staged</div>
          <div className="v mono">v6.2.0-rc.3</div>
          <div className="b mono">build 20260501.014</div>
        </div>
      </div>
      <div className="ota-table">
        <div className="row head mono"><span>component</span><span>current</span><span>target</span><span>state</span></div>
        {[
          ['kernel','5.15-rt-n102','5.15-rt-n104','staged'],
          ['cuda-runtime','12.4.1','12.4.3','staged'],
          ['tensor-rt-llm','0.9.0','0.9.2','staged'],
          ['magstackd','1.4.7','1.5.0','staged'],
          ['thoxd','6.1.0','6.2.0','staged'],
        ].map(r=><div className="row mono" key={r[0]}><span>{r[0]}</span><span>{r[1]}</span><span>{r[2]}</span><span><i className="dot st-ok"/>{r[3]}</span></div>)}
      </div>
      <div className="ota-actions">
        <button className="btn">Rollback</button>
        <button className="btn primary">Install &amp; reboot</button>
      </div>
    </div>
  );
}

/* ============ Demo Mode ============ */
function DemoModeApp() {
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(()=>{ if(!running) return; const id=setInterval(()=>setT(t=>Math.min(55,t+1)), 1000); return ()=>clearInterval(id); },[running]);
  const beats = ['Boot','Home','Inference','MagStack','Quantum','Pipeline','GPU','Memory','Wrap'];
  const beat = Math.min(beats.length-1, Math.floor(t/55*beats.length));
  return (
    <div className="app demo">
      <div className="pipe-h"><div><div className="eye mono">DEMO MODE</div><div className="ttl">55-second Kickstarter walkthrough</div></div></div>
      <div className="demo-timeline mono">
        <span className="t">{t.toString().padStart(2,'0')} / 55s</span>
        <div className="track"><i style={{width:(t/55*100)+'%'}}/></div>
      </div>
      <div className="demo-beats">
        {beats.map((b,i)=><div key={i} className={"beat "+(i===beat?'on':'')+(i<beat?' done':'')}><b className="mono">{(i*6).toString().padStart(2,'0')}s</b><span>{b}</span></div>)}
      </div>
      <div className="demo-actions">
        <button className="btn" onClick={()=>{setT(0);setRunning(false);}}>Reset</button>
        <button className="btn primary" onClick={()=>setRunning(r=>!r)}>{running?'Pause':'Play walkthrough'}</button>
      </div>
    </div>
  );
}

/* ============ Device Info ============ */
function DeviceInfoApp() {
  const skus = [
    { name:'Core',     ram:'8 GB',  price:'$329',  badge:'stretch', accent:'#71717A' },
    { name:'Dev/Pro',  ram:'16 GB', price:'$549',  badge:'flagship', accent:'#34D399' },
    { name:'Enterprise', ram:'32 GB', price:'TBD',  badge:'pro', accent:'#A78BFA' },
  ];
  return (
    <div className="app devinfo">
      <div className="pipe-h"><div><div className="eye mono">DEVICE INFO</div><div className="ttl">Thox.ai Edge AI Computer · spec sheet</div></div></div>
      <div className="dev-spec">
        <div className="r"><span>SoC</span><b className="mono">NVIDIA Jetson Orin NX</b></div>
        <div className="r"><span>CUDA</span><b className="mono">1024 cores · 32 Tensor</b></div>
        <div className="r"><span>Memory</span><b className="mono">LPDDR5 · UMA</b></div>
        <div className="r"><span>AI</span><b className="mono">TensorRT-LLM 0.9 · FP8</b></div>
        <div className="r"><span>Quantum</span><b className="mono">cuStateVec · 34q</b></div>
        <div className="r"><span>Cluster</span><b className="mono">MagStack™ · pogo + NFC</b></div>
        <div className="r"><span>Security</span><b className="mono">TPM 2.0 SLB9670</b></div>
        <div className="r"><span>I/O</span><b className="mono">HDMI 2.1 · USB-C · GbE</b></div>
        <div className="r"><span>OS</span><b className="mono">ThoxOS · Linux 5.15-rt</b></div>
      </div>
      <div className="dev-skus">
        {skus.map(s=>(
          <div className="sku" key={s.name} style={{borderColor:s.accent}}>
            <div className="sku-h"><b>{s.name}</b><span className="bdg" style={{color:s.accent}}>{s.badge}</span></div>
            <div className="sku-ram mono">{s.ram} UMA</div>
            <div className="sku-pr mono" style={{color:s.accent}}>{s.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ Realtime Chat ============ */
function RealtimeChatApp() {
  const [msgs, setMsgs] = useState([
    { who:'thox', t:'14:01', text:'Realtime stream open. Ask me anything about the device.' },
  ]);
  const [input, setInput] = useState('');
  const send = ()=>{
    if (!input.trim()) return;
    const t = new Date().toTimeString().slice(0,5);
    setMsgs(m=>[...m,{who:'user', t, text:input}]);
    setInput('');
    setTimeout(()=>setMsgs(m=>[...m,{who:'thox', t, text:'Streaming response over WebRTC. ~32 tok/s round-trip on local Orin NX.'}]), 600);
  };
  return (
    <div className="app rtchat">
      <div className="rt-bar mono"><span className="led"/> realtime · openai-compat · WebRTC · 32ms RTT</div>
      <div className="rt-stream">
        {msgs.map((m,i)=>(
          <div key={i} className={"rt-msg "+m.who}>
            <span className="mono w">{m.who}</span><span className="mono t">{m.t}</span>
            <div className="tx">{m.text}</div>
          </div>
        ))}
      </div>
      <div className="inf-input">
        <textarea placeholder="Speak or type…" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send();}}}/>
        <button className="btn primary" onClick={send}><Ic.send size={13}/> Send</button>
      </div>
    </div>
  );
}

/* ============ Architecture viewer ============ */
function ArchitectureApp() {
  return (
    <div className="app arch">
      <div className="pipe-h"><div><div className="eye mono">AGENT ARCHITECTURE</div><div className="ttl">NullClaw runtime · MCP tools · memory tiers</div></div></div>
      <svg viewBox="0 0 600 320" className="arch-svg">
        <g fill="none" stroke="#3F3F46" strokeWidth="1">
          {[[300,40],[120,140],[300,140],[480,140],[300,240]].map(([x,y],i)=><rect key={i} x={x-70} y={y-22} width="140" height="44" rx="6"/>)}
          <line x1="300" y1="62" x2="120" y2="118"/>
          <line x1="300" y1="62" x2="300" y2="118"/>
          <line x1="300" y1="62" x2="480" y2="118"/>
          <line x1="120" y1="162" x2="300" y2="218"/>
          <line x1="300" y1="162" x2="300" y2="218"/>
          <line x1="480" y1="162" x2="300" y2="218"/>
        </g>
        {[[300,40,'Planner','core'],[120,140,'Researcher','MCP web'],[300,140,'Coder','MCP fs+exec'],[480,140,'Verifier','MCP test'],[300,240,'Memory · SQLite + vectors','tier']].map(([x,y,n,d],i)=>(
          <g key={i}>
            <text x={x} y={y-3} textAnchor="middle" fontSize="12" fontFamily="Inter" fontWeight="600" fill="#FAFAFA">{n}</text>
            <text x={x} y={y+14} textAnchor="middle" fontSize="10" fontFamily="JetBrains Mono" fill="#71717A">{d}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

window.QuantumApp = QuantumApp;
window.PipelineApp = PipelineApp;
window.AgentsApp = AgentsApp;
window.MeshApp = MeshApp;
window.DistInfApp = DistInfApp;
window.MemHierApp = MemHierApp;
window.SecurityApp = SecurityApp;
window.KVCacheApp = KVCacheApp;
window.OTAApp = OTAApp;
window.DemoModeApp = DemoModeApp;
window.DeviceInfoApp = DeviceInfoApp;
window.RealtimeChatApp = RealtimeChatApp;
window.ArchitectureApp = ArchitectureApp;
