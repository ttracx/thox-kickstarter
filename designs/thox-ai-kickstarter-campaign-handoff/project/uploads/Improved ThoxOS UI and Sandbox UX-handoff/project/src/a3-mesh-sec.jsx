/* global React, Ic, A3 */
const { useState, useEffect, useMemo, useRef } = React;
const { AppShell, StatTile, Card, Pill, Bar, KeyVal } = A3;

/* ============ Mesh Cognition ============ */
function MeshAppV2() {
  const [tab, setTab] = useState('cfc');
  const [meshMode, setMeshMode] = useState(false);
  const [neurons, setNeurons] = useState(()=>Array.from({length:64},()=>({a:Math.random()*0.3})));
  const [phases, setPhases] = useState([0, Math.PI/2, Math.PI, 3*Math.PI/2, Math.PI/3, 5*Math.PI/4]);
  const [order, setOrder] = useState(0.32);
  const [orderHist, setOrderHist] = useState(()=>Array.from({length:60},(_,i)=>0.2+0.4*Math.abs(Math.sin(i*0.12))));
  const [hidden, setHidden] = useState(()=>Array.from({length:32},()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0')));
  const cvRef = useRef(null);

  useEffect(()=>{
    if (tab !== 'cfc') return;
    const id = setInterval(()=>{
      setNeurons(p=>p.map(n=>({a: Math.max(0,Math.min(1, n.a + (Math.random()-0.48)*0.18))})));
      setHidden(Array.from({length:32},()=>Math.floor(Math.random()*256).toString(16).padStart(2,'0')));
    }, 240);
    return ()=>clearInterval(id);
  },[tab]);

  useEffect(()=>{
    if (tab !== 'kuramoto') return;
    const id = setInterval(()=>{
      setPhases(prev=>{
        const K=2.6, omega=[1.0,1.1,0.9,1.05,0.95,1.08];
        return prev.map((th,i)=>{
          let dt = omega[i];
          for (let j=0;j<prev.length;j++) if (j!==i) dt += (K/prev.length)*Math.sin(prev[j]-th);
          return th + dt*0.05;
        });
      });
      setOrder(o=>{
        const r = Math.max(0.05,Math.min(0.99, o + (Math.random()-0.3)*0.05));
        setOrderHist(h=>[...h.slice(-59), r]);
        return r;
      });
    }, 90);
    return ()=>clearInterval(id);
  },[tab]);

  useEffect(()=>{
    if (tab !== 'cfc' || !cvRef.current) return;
    const c = cvRef.current, ctx = c.getContext('2d');
    const dpi = window.devicePixelRatio||1;
    const W = c.clientWidth*dpi, H = c.clientHeight*dpi;
    c.width=W; c.height=H;
    ctx.clearRect(0,0,W,H);
    const cols=8, rows=8, cw=W/cols, ch=H/rows;
    for (let i=0;i<64;i++){
      const x1=(i%cols)*cw+cw/2, y1=Math.floor(i/cols)*ch+ch/2;
      for (let d=1; d<=2; d++){
        const j=(i+d)%64, x2=(j%cols)*cw+cw/2, y2=Math.floor(j/cols)*ch+ch/2;
        const a = neurons[i].a;
        ctx.strokeStyle = `rgba(52,211,153,${a*0.45})`;
        ctx.lineWidth = a*1.2*dpi;
        ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
      }
    }
    for (let i=0;i<64;i++){
      const x=(i%cols)*cw+cw/2, y=Math.floor(i/cols)*ch+ch/2, a=neurons[i].a;
      const r=(2+a*4)*dpi;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fillStyle = `rgba(52,211,153,${0.3+a*0.7})`;
      ctx.fill();
      if (a>0.7){
        ctx.beginPath(); ctx.arc(x,y,r+3*dpi,0,Math.PI*2);
        ctx.strokeStyle = `rgba(52,211,153,${a*0.4})`;
        ctx.lineWidth = dpi; ctx.stroke();
      }
    }
  },[tab, neurons]);

  const tabs = [
    { id:'cfc', label:'CfC Network' },
    { id:'kuramoto', label:'Kuramoto Sync' },
    { id:'emotional', label:'Emotional Stack' },
    { id:'config', label:'Config' },
  ];
  const liveCount = neurons.filter(n=>n.a>0.55).length;
  const status = tab==='cfc' ? `64 neurons · ${liveCount} firing · h(t) 256B`
    : tab==='kuramoto' ? `r(t)=${order.toFixed(3)} · ${order>0.8?'COHERENT':'DESYNC'}`
    : tab==='emotional' ? 'UET·MEC·CRE · 88% aligned'
    : '6 nodes · pogo';

  return (
    <AppShell
      eyebrow="MESH COGNITION" title="CfC + Kuramoto + Emotional Stack"
      status={status} tabs={tabs} tab={tab} onTab={setTab}
      action={<button className="a3-btn-ghost" onClick={()=>setMeshMode(m=>!m)}>{meshMode?'4-node mesh':'1-node local'}</button>}
    >
      {tab==='cfc' && (
        <div className="a3-grid c2 g-mesh">
          <Card title="64-NEURON CfC NETWORK" padded={false} accent="#34D399">
            <canvas ref={cvRef} className="mesh-cv"/>
          </Card>
          <div className="a3-col">
            <Card title="HIDDEN STATE h(t)" accent="#34D399">
              <div className="mesh-hex mono">{hidden.join(' ')}</div>
              <div className="mesh-tag">256-byte opaque vector · zero raw data leaves device</div>
            </Card>
            <Card title="DYNAMICS" accent="#34D399">
              <KeyVal rows={[
                ['Time-constant τ', '1.0 – 4.0 ms'],
                ['Activation', 'tanh + leak'],
                ['Layer width', '64 units'],
                ['Live receptors', liveCount+'/64'],
                ['Sparsity', ((1-liveCount/64)*100).toFixed(0)+'%'],
              ]}/>
            </Card>
          </div>
        </div>
      )}
      {tab==='kuramoto' && (
        <div className="a3-grid c2 g-mesh">
          <Card title="PHASE COUPLING · 6 OSCILLATORS" padded={false} accent="#A78BFA">
            <svg viewBox="0 0 200 200" className="kura-svg">
              <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(167,139,250,.18)" strokeWidth=".6"/>
              {phases.map((th,i)=>{
                const x=100+78*Math.cos(th), y=100+78*Math.sin(th);
                return <g key={i}>
                  <line x1="100" y1="100" x2={x} y2={y} stroke="rgba(167,139,250,.35)" strokeWidth=".6"/>
                  <circle cx={x} cy={y} r={4} fill="#A78BFA"/>
                  <text x={x} y={y-7} fontSize="6" fill="#A78BFA" textAnchor="middle" fontFamily="JetBrains Mono">N{i+1}</text>
                </g>;
              })}
              {(()=>{ // mean field
                const sx = phases.reduce((s,th)=>s+Math.cos(th),0)/phases.length;
                const sy = phases.reduce((s,th)=>s+Math.sin(th),0)/phases.length;
                return <circle cx={100+sx*78} cy={100+sy*78} r="6" fill="none" stroke="#FBBF24" strokeWidth="1.2"/>;
              })()}
            </svg>
          </Card>
          <div className="a3-col">
            <Card title="ORDER PARAMETER r(t)" accent="#A78BFA">
              <div className="kura-r"><b className="mono" style={{color: order>0.8?'#34D399':order>0.5?'#FBBF24':'#FB7185'}}>{order.toFixed(3)}</b><span className="mono">{order>0.8?'COHERENT':order>0.5?'PARTIAL':'DESYNC'}</span></div>
              <svg viewBox="0 0 240 70" className="kura-spark">
                <polyline points={orderHist.map((v,i)=>`${(i/59)*240},${70-v*60-5}`).join(' ')} fill="none" stroke="#A78BFA" strokeWidth="1.5"/>
                <line x1="0" y1={70-0.8*60-5} x2="240" y2={70-0.8*60-5} stroke="#34D399" strokeDasharray="2 2" strokeWidth=".5" opacity=".6"/>
              </svg>
            </Card>
            <Card title="COUPLING MATRIX K" accent="#A78BFA">
              <KeyVal rows={[
                ['Coupling K', '2.60'],
                ['ωᵢ range', '0.90 – 1.10 rad/s'],
                ['Frame', '90 Hz'],
                ['Interpretation', 'Phase-locked attention'],
              ]}/>
            </Card>
          </div>
        </div>
      )}
      {tab==='emotional' && (
        <div className="a3-col">
          {[
            ['UET','Urgency · Effort · Time','#FB7185',0.72,'Latency budget · battery · deadline'],
            ['MEC','Memory · Emotion · Context','#34D399',0.58,'KV-cache · sentiment · session window'],
            ['CRE','Create · Respond · Evaluate','#FBBF24',0.81,'Generation policy · output filter · self-check'],
          ].map(([k,d,c,v,desc])=>(
            <Card key={k} title={k+' STACK'} accent={c}>
              <div className="emo-row">
                <div className="emo-d">{d}</div>
                <div className="emo-bar"><i style={{width:(v*100)+'%', background:c}}/></div>
                <span className="mono emo-v" style={{color:c}}>{(v*100).toFixed(0)}%</span>
              </div>
              <div className="emo-desc">{desc}</div>
            </Card>
          ))}
        </div>
      )}
      {tab==='config' && (
        <div className="a3-grid c2">
          <Card title="DEPLOYMENT" accent="#34D399">
            <KeyVal rows={[
              ['Mode', meshMode?'4-node mesh (pogo)':'1-node local'],
              ['Wake-word', 'on (Pico-WW)'],
              ['Privacy', 'On-device · no telemetry'],
              ['Boot', 'Verified · TPM 2.0'],
            ]}/>
          </Card>
          <Card title="SUBSYSTEMS" accent="#34D399">
            <KeyVal rows={[
              ['CfC layer', '64 neurons · h(t) 256B'],
              ['Kuramoto', '6 oscillators · K=2.6'],
              ['Emotional', 'UET·MEC·CRE composite'],
              ['Mesh sync', meshMode?'2.4 GHz LoRa-PHY':'—'],
            ]}/>
          </Card>
        </div>
      )}
    </AppShell>
  );
}

/* ============ Security Center ============ */
function SecurityAppV2() {
  const [tab, setTab] = useState('boot');
  const [bootStep, setBootStep] = useState(7);
  const [scan, setScan] = useState(false);
  const [scanIdx, setScanIdx] = useState(0);
  const [verdicts, setVerdicts] = useState({});
  useEffect(()=>{
    if (!scan) return;
    if (scanIdx >= 8) { setScan(false); return; }
    const id = setTimeout(()=>{ setVerdicts(v=>({...v,[scanIdx]:'pass'})); setScanIdx(i=>i+1); }, 260);
    return ()=>clearTimeout(id);
  },[scan, scanIdx]);

  const chain = [
    ['BootROM (mask)','immutable','#34D399'],
    ['SecureBoot pubkey','RSA-4096','#34D399'],
    ['Bootloader','signed · v6.1.0','#34D399'],
    ['TPM 2.0 measurement','PCR 0–7','#34D399'],
    ['Kernel + initramfs','dm-verity','#34D399'],
    ['ThoxOS rootfs','Btrfs · sealed','#34D399'],
    ['User keystore','HSM-wrapped','#34D399'],
    ['Runtime attestation','remote ✓','#34D399'],
  ];
  const audit = [
    ['00:14:02','SecureBoot','PASS · pubkey match'],
    ['00:14:02','PCR-extend','0xa1b3…ee'],
    ['00:14:03','dm-verity','rootfs hash OK'],
    ['00:14:04','TPM seal','user keys unsealed'],
    ['00:14:05','attest','remote ack 200 OK'],
    ['00:18:11','net','wlan0 lockdown · UFW deny'],
    ['00:18:12','sandbox','app:agents → seccomp on'],
  ];
  const compliance = [
    { id:'HIPAA', desc:'PHI handling · audit log · BAA', state:'ready' },
    { id:'GDPR', desc:'On-device · DSAR · right-to-erase', state:'ready' },
    { id:'ITAR', desc:'Export-controlled compute', state:'optional' },
    { id:'SOC 2', desc:'Type II controls · evidence pack', state:'ready' },
  ];

  const tabs = [
    { id:'boot', label:'Boot Chain' },
    { id:'attest', label:'Attestation' },
    { id:'audit', label:'Audit Log' },
    { id:'compliance', label:'Compliance' },
  ];

  return (
    <AppShell
      eyebrow="SECURITY CENTER" title="Hardware root of trust"
      status="TPM 2.0 · sealed · attested"
      tabs={tabs} tab={tab} onTab={setTab} accent="#FB7185"
      action={tab==='attest' && <button className="a3-btn" onClick={()=>{setScan(true); setScanIdx(0); setVerdicts({});}} disabled={scan}>{scan?'Scanning…':'Re-attest now'}</button>}
    >
      {tab==='boot' && (
        <div className="a3-grid c2">
          <Card title="VERIFIED BOOT CHAIN" accent="#FB7185">
            <div className="sec-chain">
              {chain.map(([n,m,c],i)=>(
                <div key={i} className={"sec-step "+(i<=bootStep?'on':'')}>
                  <div className="sec-step-i mono">{(i+1).toString().padStart(2,'0')}</div>
                  <div className="sec-step-l">
                    <div className="sec-step-n">{n}</div>
                    <div className="sec-step-m mono">{m}</div>
                  </div>
                  <div className="sec-step-r"><span className="mono" style={{color:c}}>✓</span></div>
                </div>
              ))}
            </div>
          </Card>
          <div className="a3-col">
            <Card title="HARDWARE" accent="#FB7185">
              <KeyVal rows={[
                ['SoC','NVIDIA Orin NX'],
                ['TPM','Infineon SLB 9670 (2.0)'],
                ['Secure Element','NXP A71CH'],
                ['BootROM','Mask · immutable'],
                ['Fuses','OEM-burned'],
              ]}/>
            </Card>
            <Card title="POLICY" accent="#FB7185">
              <KeyVal rows={[
                ['Disk encryption','LUKS2 · TPM-sealed'],
                ['Code signing','Mandatory · cosign'],
                ['Sandbox','seccomp + landlock'],
                ['Network','UFW deny-by-default'],
              ]}/>
            </Card>
          </div>
        </div>
      )}
      {tab==='attest' && (
        <div className="a3-col">
          <Card title="REMOTE ATTESTATION QUOTE" accent="#FB7185">
            <div className="sec-attest">
              {chain.map(([n,m],i)=>(
                <div key={i} className={"sec-attest-row "+(verdicts[i]?'pass':scan && i===scanIdx?'pending':'idle')}>
                  <span className="mono dot">{verdicts[i]?'✓':scan && i===scanIdx?'…':'•'}</span>
                  <span className="nm">{n}</span>
                  <span className="mono pcr">PCR{i}</span>
                  <span className="mono hash">{verdicts[i]?(0xa1b3+i*0x113).toString(16).padStart(8,'0')+'…':'—'}</span>
                </div>
              ))}
            </div>
            <div className="sec-attest-foot">
              <Pill tone={Object.keys(verdicts).length===8?'good':'idle'}>{Object.keys(verdicts).length===8?'QUOTE VERIFIED':'Idle · click Re-attest'}</Pill>
              <span className="mono mute">EK · cert chain · OK</span>
            </div>
          </Card>
        </div>
      )}
      {tab==='audit' && (
        <Card title="AUDIT LOG · LAST 24H" accent="#FB7185" padded={false}>
          <div className="sec-audit">
            {audit.map((r,i)=>(
              <div key={i} className="sec-audit-row mono">
                <span className="t">{r[0]}</span>
                <span className="src">{r[1]}</span>
                <span className="msg">{r[2]}</span>
              </div>
            ))}
          </div>
        </Card>
      )}
      {tab==='compliance' && (
        <div className="a3-grid c2">
          {compliance.map(c=>(
            <Card key={c.id} title={c.id} accent="#FB7185">
              <div className="sec-comp"><b>{c.id}</b><Pill tone={c.state==='ready'?'good':'idle'}>{c.state}</Pill></div>
              <div className="sec-comp-d">{c.desc}</div>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}

window.MeshAppV2 = MeshAppV2;
window.SecurityAppV2 = SecurityAppV2;
