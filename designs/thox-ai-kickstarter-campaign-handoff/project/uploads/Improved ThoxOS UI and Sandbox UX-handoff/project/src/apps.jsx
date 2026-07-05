/* global React, Ic */
const { useState, useEffect, useRef } = React;

function ChatComposer({ value, onChange, onSend, disabled, placeholder, tools, tool, onTool, attachments=[], onAttach, onClearAttach }) {
  const [voiceOn, setVoiceOn] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const fileRef = useRef(null);
  const imgRef = useRef(null);
  const handleFile = (e, kind)=>{
    const fs = Array.from(e.target.files||[]);
    fs.forEach(f=>onAttach && onAttach({ kind, name:f.name, size:f.size, type:f.type }));
    e.target.value='';
  };
  return (
    <div className="composer">
      {attachments.length>0 && (
        <div className="composer-att">
          {attachments.map((a,i)=>(
            <div key={i} className="att-chip">
              <span className="ic">{a.kind==='image'?<Ic.image size={12}/>:<Ic.paperclip size={12}/>}</span>
              <span className="nm">{a.name}</span>
              <span className="sz mono">{a.size?(a.size/1024).toFixed(0)+'k':''}</span>
              <button className="x" onClick={()=>onClearAttach&&onClearAttach(i)}>×</button>
            </div>
          ))}
        </div>
      )}
      <div className="composer-main">
        <textarea
          placeholder={placeholder||'Send a message…'}
          value={value}
          onChange={e=>onChange(e.target.value)}
          onKeyDown={e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); onSend(); }}}
        />
      </div>
      <div className="composer-tools">
        <input ref={fileRef} type="file" multiple style={{display:'none'}} onChange={e=>handleFile(e,'file')}/>
        <input ref={imgRef} type="file" accept="image/*" multiple style={{display:'none'}} onChange={e=>handleFile(e,'image')}/>
        <button className="cmp-btn" title="Attach file" onClick={()=>fileRef.current?.click()}><Ic.paperclip size={14}/></button>
        <button className="cmp-btn" title="Upload image" onClick={()=>imgRef.current?.click()}><Ic.image size={14}/></button>
        <button className="cmp-btn" title="Upload" onClick={()=>fileRef.current?.click()}><Ic.upload size={14}/></button>
        <button className={"cmp-btn"+(voiceOn?' on':'')} title="Voice mode" onClick={()=>setVoiceOn(v=>!v)}><Ic.mic size={14}/>{voiceOn && <span className="rec"/>}</button>
        {tools && tools.length>0 && (
          <div className="cmp-tool-wrap">
            <button className={"cmp-btn"+(toolsOpen?' on':'')} title="Tool" onClick={()=>setToolsOpen(o=>!o)}>
              <Ic.tools size={14}/>
              <span className="cmp-tool-label">{tool||'tool'}</span>
            </button>
            {toolsOpen && (
              <div className="cmp-tool-pop" onMouseLeave={()=>setToolsOpen(false)}>
                {tools.map(t=>(
                  <button key={t.id} className={"cmp-tool-row"+(tool===t.id?' on':'')} onClick={()=>{ onTool&&onTool(t.id); setToolsOpen(false); }}>
                    <span className="ic">{t.icon||<Ic.tools size={12}/>}</span>
                    <span><b>{t.name}</b><i>{t.desc}</i></span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        <div style={{flex:1}}/>
        <button className="cmp-send" onClick={onSend} disabled={disabled || !value.trim()}>
          <Ic.send size={13}/> Send
        </button>
      </div>
    </div>
  );
}

window.ChatComposer = ChatComposer;

/* ============ AI Inference ============ */
function AIInferenceApp() {
  const [msgs, setMsgs] = useState([
    { role:'system', text:'ThoxOS Inference · claude-sonnet-4 · FP8 · KV-cache 32K' },
    { role:'user', text:'Summarize MagStack cluster behavior under partition.' },
    { role:'assistant', text:'MagStack uses Raft for leader election across 4 nodes. Under partition, the majority side keeps the leader; the minority becomes read-only until reconciliation. Tensor shards rebalance via index-bit swap on heartbeat resume.' },
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [tps, setTps] = useState(42);
  const [vram, setVram] = useState(11.4);
  const [attach, setAttach] = useState([]);
  const [tool, setTool] = useState('thinking');
  const tools = [
    { id:'thinking', name:'Extended thinking', desc:'Step-by-step reasoning · slower' },
    { id:'web',      name:'Web search',        desc:'Live retrieval · grounded' },
    { id:'code',     name:'Code interpreter',  desc:'Run Python locally' },
    { id:'rag',      name:'RAG over /mnt',     desc:'Local vector store · 14k docs' },
    { id:'vision',   name:'Vision',            desc:'Image understanding' },
  ];
  useEffect(()=>{ const id=setInterval(()=>{ setTps(40+Math.random()*8); setVram(11+Math.random()*1.4);},800); return ()=>clearInterval(id); },[]);
  const send = ()=>{
    if (!input.trim() || streaming) return;
    const u={role:'user', text:input, attach: attach.length?attach:undefined, tool}; setMsgs(m=>[...m,u]); setInput(''); setAttach([]); setStreaming(true);
    setTimeout(()=>{ setMsgs(m=>[...m,{role:'assistant', text:'Streaming token-by-token through TensorRT-LLM. FP8 quantized weights, paged KV-cache, ~42 tok/s sustained on Orin NX.'+(tool!=='thinking'?' Tool: '+tool+' active.':'')}]); setStreaming(false); }, 900);
  };
  return (
    <div className="app inf">
      <div className="inf-rail">
        <div className="rail-h">SESSION</div>
        <div className="rail-row"><span>Model</span><b>sonnet-4</b></div>
        <div className="rail-row"><span>Quant</span><b>FP8</b></div>
        <div className="rail-row"><span>Ctx</span><b>32,768</b></div>
        <div className="rail-h" style={{marginTop:18}}>TELEMETRY</div>
        <div className="rail-meter"><div className="lbl"><span>VRAM</span><b className="mono">{vram.toFixed(1)} / 16 GB</b></div><div className="bar"><i style={{width:(vram/16*100)+'%'}}/></div></div>
        <div className="rail-meter"><div className="lbl"><span>Throughput</span><b className="mono">{tps.toFixed(1)} t/s</b></div><div className="bar"><i style={{width:(tps/64*100)+'%'}}/></div></div>
        <div className="rail-meter"><div className="lbl"><span>GPU</span><b className="mono">38%</b></div><div className="bar"><i style={{width:'38%'}}/></div></div>
      </div>
      <div className="inf-main">
        <div className="inf-stream">
          {msgs.map((m,i)=>(
            <div key={i} className={"msg "+m.role}>
              <div className="msg-tag mono">{m.role==='user'?'USER':m.role==='assistant'?'ASSISTANT':'SYSTEM'}</div>
              <div className="msg-text">{m.text}</div>
            </div>
          ))}
          {streaming && <div className="msg assistant"><div className="msg-tag mono">ASSISTANT</div><div className="msg-text"><span className="caret"/></div></div>}
        </div>
        <ChatComposer
          value={input} onChange={setInput} onSend={send} disabled={streaming}
          placeholder="Send a message…"
          tools={tools} tool={tool} onTool={setTool}
          attachments={attach} onAttach={(a)=>setAttach(s=>[...s,a])} onClearAttach={(i)=>setAttach(s=>s.filter((_,j)=>j!==i))}
        />
      </div>
    </div>
  );
}

/* ============ MagStack ============ */
function MagStackApp() {
  const [tick, setTick] = useState(0);
  useEffect(()=>{ const id=setInterval(()=>setTick(t=>t+1), 1100); return ()=>clearInterval(id); },[]);
  const nodes = [
    {id:'node-01', role:'leader', host:'mag-01', load:62, shard:'A0–A3'},
    {id:'node-02', role:'follower', host:'mag-02', load:48, shard:'A4–A7'},
    {id:'node-03', role:'follower', host:'mag-03', load:54, shard:'B0–B3'},
    {id:'node-04', role:'follower', host:'mag-04', load:41, shard:'B4–B7'},
  ];
  return (
    <div className="app mag">
      <div className="mag-h">
        <div><div className="eye mono">CLUSTER</div><div className="ttl">MagStack™ · Raft consensus</div></div>
        <div className="mag-stats">
          <div><b className="mono">4/4</b><span>nodes</span></div>
          <div><b className="mono">term 47</b><span>raft</span></div>
          <div><b className="mono">2.1ms</b><span>p50 hb</span></div>
          <div><b className="mono">0</b><span>conflicts</span></div>
        </div>
      </div>
      <div className="mag-topo">
        <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lk" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#10B981" stopOpacity="0"/><stop offset="50%" stopColor="#34D399" stopOpacity=".9"/><stop offset="100%" stopColor="#10B981" stopOpacity="0"/></linearGradient>
          </defs>
          <g stroke="#27272A" fill="none" strokeWidth="1">
            <line x1="200" y1="60" x2="80" y2="180"/><line x1="200" y1="60" x2="200" y2="200"/><line x1="200" y1="60" x2="320" y2="180"/>
            <line x1="80" y1="180" x2="200" y2="200"/><line x1="320" y1="180" x2="200" y2="200"/>
          </g>
          <g>
            {[0,1,2,3].map(i=>{
              const x = [200,80,200,320][i], y=[60,180,200,180][i];
              const active = (tick%4)===i;
              return (
                <g key={i} transform={"translate("+x+","+y+")"}>
                  <circle r="22" fill="#0A0A0A" stroke={i===0?'#10B981':'#3F3F46'} strokeWidth={i===0?2:1.2}/>
                  {active && <circle r="22" fill="none" stroke="#34D399" strokeWidth="1.5" opacity=".6"><animate attributeName="r" values="22;34" dur="1s" fill="freeze"/><animate attributeName="opacity" values=".7;0" dur="1s" fill="freeze"/></circle>}
                  <text textAnchor="middle" y="-32" fill="#A1A1AA" fontSize="9" fontFamily="JetBrains Mono">{nodes[i].id}</text>
                  <text textAnchor="middle" y="4" fill={i===0?'#34D399':'#FAFAFA'} fontSize="10" fontWeight="700" fontFamily="JetBrains Mono">{nodes[i].role==='leader'?'L':'F'}</text>
                  <text textAnchor="middle" y="18" fill="#71717A" fontSize="7" fontFamily="JetBrains Mono">{nodes[i].load}%</text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="mag-table">
        <div className="row head mono"><span>node</span><span>role</span><span>host</span><span>shard</span><span>load</span></div>
        {nodes.map(n=>(
          <div className="row mono" key={n.id}>
            <span><i className={"st "+n.role}/>{n.id}</span>
            <span className={"role "+n.role}>{n.role}</span>
            <span>{n.host}.thox</span>
            <span>{n.shard}</span>
            <span><div className="loadbar"><i style={{width:n.load+'%'}}/></div></span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ Terminal ============ */
function TerminalApp() {
  const [hist, setHist] = useState([
    { kind:'out', text:'ThoxOS 6.1.0 (Linux 5.15-rt) on jetson-orin-nx' },
    { kind:'out', text:'Type ‘help’ for commands.' },
    { kind:'cmd', text:'nvidia-smi' },
    { kind:'out', text:'+--------------------------------------------------------------+\n| Orin NX 16GB       | Driver 540.3   | CUDA 12.4              |\n| GPU  Mem-Usage     | GPU-Util       | Power                  |\n|  0   11.4 / 16 GB  | 38 %           | 17.2 W / 25 W          |\n+--------------------------------------------------------------+' },
    { kind:'cmd', text:'magstack status' },
    { kind:'out', text:'cluster: 4/4 healthy   leader: mag-01   term: 47   p50: 2.1ms' },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  useEffect(()=>{ endRef.current && endRef.current.scrollIntoView({block:'end'}); },[hist]);
  const run = ()=>{
    if (!input.trim()) return;
    const cmd = input.trim();
    let out = '';
    if (cmd==='help') out='available: nvidia-smi, magstack status, inference, quantum, ps, clear';
    else if (cmd==='clear') { setHist([]); setInput(''); return; }
    else if (cmd.startsWith('inference')) out='claude-sonnet-4 · FP8 · ctx 32K · 42.1 tok/s · KV 11.4GB';
    else if (cmd.startsWith('quantum')) out='cuStateVec backend · 34 qubits · idle';
    else if (cmd==='ps') out='PID  CMD\n  1  thoxd\n 14  inference-server\n 22  magstackd\n 31  agent-runtime';
    else out='thox: command not found: '+cmd;
    setHist(h=>[...h, {kind:'cmd', text:cmd}, {kind:'out', text:out}]);
    setInput('');
  };
  return (
    <div className="app term">
      <div className="term-body">
        {hist.map((l,i)=>(
          <div key={i} className={"tline "+l.kind}>
            {l.kind==='cmd' && <span className="prompt">tommy@thoxos:~$</span>}
            <pre>{l.text}</pre>
          </div>
        ))}
        <div className="tline cmd active">
          <span className="prompt">tommy@thoxos:~$</span>
          <input autoFocus value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&run()}/>
          <span className="cur"/>
        </div>
        <div ref={endRef}/>
      </div>
    </div>
  );
}

/* ============ Stub apps (visual only) ============ */
function StubApp({ title, eyebrow, children }) {
  return (
    <div className="app stub">
      <div className="stub-h"><div className="eye mono">{eyebrow}</div><div className="ttl">{title}</div></div>
      <div className="stub-body">{children}</div>
    </div>
  );
}

function GPUApp() {
  return (
    <StubApp eyebrow="DASHBOARD" title="GPU · Orin NX 16GB">
      <div className="gpu-grid">
        {Array.from({length:32}).map((_,i)=>{const v=Math.random();return <div key={i} className="cell" style={{background:`rgba(16,185,129,${0.1+v*0.7})`}}/>})}
      </div>
      <div className="gpu-rails">
        <div><span>SM cores</span><div className="bar"><i style={{width:'42%'}}/></div><b className="mono">42%</b></div>
        <div><span>Mem bus</span><div className="bar"><i style={{width:'68%'}}/></div><b className="mono">68%</b></div>
        <div><span>Power</span><div className="bar"><i style={{width:'58%'}}/></div><b className="mono">17.2W</b></div>
        <div><span>Temp</span><div className="bar"><i style={{width:'48%'}}/></div><b className="mono">54°C</b></div>
      </div>
    </StubApp>
  );
}

function SettingsApp({ tweaks, setTweak }) {
  return (
    <StubApp eyebrow="SYSTEM" title="Settings">
      <div className="set-rows">
        <div className="set-row"><div><b>Density</b><span>Compact · Comfortable · Spacious</span></div><div className="seg">{['compact','comfortable','spacious'].map(v=><button key={v} className={tweaks.density===v?'on':''} onClick={()=>setTweak('density',v)}>{v}</button>)}</div></div>
        <div className="set-row"><div><b>Wallpaper</b><span>Background treatment</span></div><div className="seg">{['grid','rings','noise'].map(v=><button key={v} className={tweaks.wallpaper===v?'on':''} onClick={()=>setTweak('wallpaper',v)}>{v}</button>)}</div></div>
        <div className="set-row"><div><b>Telemetry chips</b><span>Show GPU/throughput in menu bar</span></div><div className="seg"><button className={tweaks.telemetry?'on':''} onClick={()=>setTweak('telemetry',true)}>on</button><button className={!tweaks.telemetry?'on':''} onClick={()=>setTweak('telemetry',false)}>off</button></div></div>
      </div>
    </StubApp>
  );
}

window.AIInferenceApp = AIInferenceApp;
window.MagStackApp = MagStackApp;
window.TerminalApp = TerminalApp;
window.GPUApp = GPUApp;
window.SettingsApp = SettingsApp;
