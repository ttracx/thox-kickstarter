#!/usr/bin/env python3
"""Generate site/production-tracker.html — a self-contained, localStorage-backed
interactive tracker for the THOX Kickstarter film, built from
sources/thox-video-shotlist.csv.

Tracks two things the team needs to complete:
  1) Device video capture (per device: ThoxKey, ThoxMini, ThoxMini Air, ThoxClip)
  2) Storyboard scene capture, following the script + storyboard steps (V01-V13)

Each shot moves To shoot -> Captured -> Approved, with a notes field. All state
lives in the browser (localStorage), and can be exported as JSON or CSV.
"""
import csv, json, pathlib, datetime

ROOT = pathlib.Path(__file__).resolve().parent
CSV = ROOT / "sources/thox-video-shotlist.csv"
OUT = ROOT / "site/production-tracker.html"

SEG_TITLES = {
    "ceo-open": "CEO Open", "ecosystem": "The Ecosystem", "cto-intro": "CTO Intro",
    "thoxkey": "ThoxKey", "thoxmini-air": "ThoxMini Air", "thoxmini": "ThoxMini",
    "thoxclip": "ThoxClip", "unified": "A Unified Day", "thoxos-mini": "ThoxOS Mini",
    "meshstack": "MeshStack", "user-stories": "User Stories",
    "cto-close": "CTO Close", "ceo-close": "CEO Close",
}
PRIMARY_DEVICES = ["ThoxKey", "ThoxMini Air", "ThoxMini", "ThoxClip"]

rows = []
with open(CSV, newline="") as f:
    for r in csv.DictReader(f):
        vseg = r["shot_id"].split("-")[0]        # V01..V13
        rows.append({
            "seg": r["segment"], "segTitle": SEG_TITLES.get(r["segment"], r["segment"]),
            "vseg": vseg, "id": r["shot_id"], "type": r["shot_type"], "device": r["device"],
            "action": r["action"], "proof": r["on_screen_proof"],
            "speaker": r["speaker"], "gate": r["acceptance_gate"],
        })

meta = {
    "generated": datetime.date.today().isoformat(),
    "total": len(rows),
    "segments": sorted({r["vseg"] for r in rows}),
    "devices": PRIMARY_DEVICES,
    "allDevices": sorted({r["device"] for r in rows}),
    "types": sorted({r["type"] for r in rows}),
}

DATA_JSON = json.dumps(rows, ensure_ascii=False)
META_JSON = json.dumps(meta, ensure_ascii=False)

TEMPLATE = r"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>THOX.ai — Video Production Tracker</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  @font-face { font-family:'Xolonium'; src:url('assets/fonts/xolonium-bold.otf') format('opentype'); font-weight:700; }
  :root{ --ink:#09090B; --surface:#131316; --card:#1A1A1C; --border:#27272A; --border2:#3F3F46;
         --em:#10B981; --em2:#34D399; --amber:#F59E0B; --fg:#FAFAFA; --mut:#A1A1AA; --dim:#71717A; }
  *{ box-sizing:border-box; }
  html,body{ margin:0; background:var(--ink); color:var(--fg); font-family:Inter,system-ui,sans-serif; }
  a{ color:var(--em2); }
  .wrap{ max-width:1200px; margin:0 auto; padding:40px 28px 90px; }
  .top{ display:flex; align-items:center; justify-content:space-between; gap:16px; flex-wrap:wrap; }
  .brand{ display:flex; align-items:center; gap:12px; }
  .brand img{ height:26px; }
  .kicker{ font-family:'JetBrains Mono',monospace; font-size:11.5px; letter-spacing:.16em; color:var(--mut); text-transform:uppercase; }
  h1{ font-family:Xolonium,Inter,sans-serif; font-weight:700; font-size:34px; margin:28px 0 0; letter-spacing:-.01em; }
  .sub{ color:var(--mut); font-size:15px; line-height:1.6; margin:12px 0 0; max-width:760px; }
  /* KPI row */
  .kpis{ margin-top:28px; display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
  @media(max-width:820px){ .kpis{ grid-template-columns:1fr 1fr; } }
  .kpi{ background:var(--card); border:1px solid var(--border); border-radius:14px; padding:18px 20px; }
  .kpi .lab{ font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.12em; color:var(--dim); text-transform:uppercase; }
  .kpi .val{ font-family:Xolonium,Inter,sans-serif; font-size:30px; font-weight:700; margin-top:6px; }
  .kpi .val small{ font-size:15px; color:var(--mut); font-family:Inter; }
  .bar{ height:7px; border-radius:99px; background:#000; overflow:hidden; margin-top:12px; border:1px solid var(--border); }
  .bar > span{ display:block; height:100%; background:linear-gradient(90deg,var(--em),var(--em2)); width:0; transition:width .3s; }
  /* device inventory */
  h2{ font-family:Xolonium,Inter,sans-serif; font-size:20px; font-weight:700; margin:44px 0 0; }
  .devgrid{ margin-top:16px; display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
  @media(max-width:820px){ .devgrid{ grid-template-columns:1fr 1fr; } }
  .dev{ background:var(--card); border:1px solid var(--border); border-radius:14px; padding:18px; }
  .dev .n{ font-family:Xolonium,Inter,sans-serif; font-weight:700; font-size:16px; }
  .dev .c{ font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--mut); margin-top:4px; }
  .dev .pct{ font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--em2); margin-top:10px; }
  /* controls */
  .controls{ position:sticky; top:0; z-index:20; margin-top:36px; padding:14px 0; background:linear-gradient(var(--ink),var(--ink) 78%,rgba(9,9,11,0)); display:flex; gap:10px; flex-wrap:wrap; align-items:center; }
  select,input[type=search],button{ font-family:Inter; font-size:13px; color:var(--fg); background:var(--surface); border:1px solid var(--border2); border-radius:9px; padding:9px 12px; }
  input[type=search]{ min-width:200px; }
  button{ cursor:pointer; }
  button.ghost:hover{ border-color:var(--em); }
  .spacer{ flex:1; }
  /* segment + shots */
  .seg{ margin-top:22px; border:1px solid var(--border); border-radius:16px; overflow:hidden; }
  .seghead{ display:flex; align-items:center; gap:14px; padding:16px 20px; background:var(--card); cursor:pointer; }
  .seghead .vid{ font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--em2); }
  .seghead .st{ font-family:Xolonium,Inter,sans-serif; font-weight:700; font-size:17px; }
  .seghead .mini{ flex:1; max-width:220px; }
  .seghead .cnt{ font-family:'JetBrains Mono',monospace; font-size:11.5px; color:var(--mut); }
  .shots{ display:block; }
  .shots.collapsed{ display:none; }
  .shot{ display:grid; grid-template-columns:96px 1fr 260px; gap:16px; padding:16px 20px; border-top:1px solid var(--border); }
  @media(max-width:900px){ .shot{ grid-template-columns:1fr; gap:10px; } }
  .shot.hide{ display:none; }
  .sid{ font-family:'JetBrains Mono',monospace; font-size:12px; color:var(--fg); }
  .stype{ display:inline-block; margin-top:6px; font-family:'JetBrains Mono',monospace; font-size:9.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--mut); border:1px solid var(--border2); border-radius:99px; padding:3px 8px; }
  .sdev{ display:inline-block; margin-top:6px; font-size:11px; color:var(--em2); }
  .action{ font-size:14px; line-height:1.55; color:var(--fg); }
  .meta{ margin-top:8px; display:flex; flex-wrap:wrap; gap:8px; }
  .chip{ font-family:'JetBrains Mono',monospace; font-size:10.5px; color:var(--mut); background:#000; border:1px solid var(--border); border-radius:99px; padding:4px 9px; }
  .chip b{ color:var(--em2); font-weight:500; }
  .gate{ font-size:12px; color:var(--amber); margin-top:8px; }
  .gate::before{ content:'GATE  '; font-family:'JetBrains Mono',monospace; font-size:9.5px; letter-spacing:.1em; color:var(--dim); }
  .side{ display:flex; flex-direction:column; gap:8px; }
  .states{ display:flex; gap:6px; }
  .states button{ flex:1; padding:7px 6px; font-size:11.5px; border-radius:8px; background:#000; }
  .states button.on[data-s="todo"]{ border-color:var(--dim); color:var(--fg); }
  .states button.on[data-s="captured"]{ border-color:var(--em); color:var(--em2); background:rgba(16,185,129,.1); }
  .states button.on[data-s="approved"]{ border-color:var(--em); color:var(--ink); background:var(--em); font-weight:700; }
  .note{ width:100%; font-size:12px; padding:8px 10px; border-radius:8px; background:#000; border:1px solid var(--border); color:var(--fg); resize:vertical; min-height:34px; font-family:Inter; }
  .foot{ margin-top:40px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.12em; color:var(--dim); display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px; }
</style>
</head>
<body>
<div class="wrap">
  <div class="top">
    <div class="brand"><img src="assets/logos/thox-logo-horiz-whiteout.png" alt="THOX.ai" /></div>
    <div class="kicker">Kickstarter Film · Production Tracker</div>
  </div>
  <h1>Video Capture &amp; Storyboard Tracker</h1>
  <p class="sub">Every shot from the film shot list, grouped by storyboard segment. Move each shot <b>To shoot → Captured → Approved</b> as you record it, following the script and storyboard steps. Progress is saved in this browser. Export any time. <a href="./storyboard.html">Open the visual storyboard →</a></p>

  <div class="kpis" id="kpis"></div>

  <h2>Device capture inventory</h2>
  <div class="devgrid" id="devgrid"></div>

  <div class="controls">
    <input type="search" id="q" placeholder="Search action, proof, gate…" />
    <select id="fseg"></select>
    <select id="fdev"></select>
    <select id="ftype"></select>
    <select id="fstatus">
      <option value="">All statuses</option>
      <option value="todo">To shoot</option>
      <option value="captured">Captured</option>
      <option value="approved">Approved</option>
    </select>
    <div class="spacer"></div>
    <button class="ghost" id="expand">Expand all</button>
    <button class="ghost" id="exportJson">Export JSON</button>
    <button class="ghost" id="exportCsv">Export CSV</button>
    <button class="ghost" id="reset">Reset</button>
  </div>

  <div id="segs"></div>

  <div class="foot">
    <div>THOX.AI LLC · © 2026 · <span id="gen"></span></div>
    <div>YOUR AI. YOUR DATA. YOUR RULES.</div>
  </div>
</div>

<script>
const SHOTS = __DATA__;
const META = __META__;
const KEY = 'thox-prod-tracker-v1';
let state = {};
try { state = JSON.parse(localStorage.getItem(KEY) || '{}'); } catch(e){ state = {}; }
function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }
function st(id){ return (state[id] && state[id].s) || 'todo'; }
function note(id){ return (state[id] && state[id].n) || ''; }
function setSt(id,s){ state[id] = Object.assign({}, state[id], {s}); save(); render(); }
function setNote(id,n){ state[id] = Object.assign({}, state[id], {n}); save(); renderKpis(); }

const el = (t,c,h)=>{ const e=document.createElement(t); if(c)e.className=c; if(h!=null)e.innerHTML=h; return e; };
document.getElementById('gen').textContent = 'Shot list ' + META.total + ' shots · generated ' + META.generated;

// filters
function opt(v,l){ const o=document.createElement('option'); o.value=v; o.textContent=l; return o; }
const fseg=document.getElementById('fseg'); fseg.appendChild(opt('','All segments'));
META.segments.forEach(v=>{ const t=(SHOTS.find(s=>s.vseg===v)||{}).segTitle||v; fseg.appendChild(opt(v, v+' · '+t)); });
const fdev=document.getElementById('fdev'); fdev.appendChild(opt('','All devices'));
META.allDevices.forEach(d=> fdev.appendChild(opt(d,d)));
const ftype=document.getElementById('ftype'); ftype.appendChild(opt('','All shot types'));
META.types.forEach(t=> ftype.appendChild(opt(t,t)));

let expanded = {};
function filters(){ return { q:document.getElementById('q').value.toLowerCase().trim(),
  seg:fseg.value, dev:fdev.value, type:ftype.value, status:document.getElementById('fstatus').value }; }
function match(s,f){
  if(f.seg && s.vseg!==f.seg) return false;
  if(f.dev && s.device!==f.dev) return false;
  if(f.type && s.type!==f.type) return false;
  if(f.status && st(s.id)!==f.status) return false;
  if(f.q && !((s.action+' '+s.proof+' '+s.gate+' '+s.id+' '+s.device).toLowerCase().includes(f.q))) return false;
  return true;
}

function pct(done,total){ return total? Math.round(done/total*100):0; }

function renderKpis(){
  const cap = SHOTS.filter(s=>st(s.id)!=='todo').length;
  const app = SHOTS.filter(s=>st(s.id)==='approved').length;
  const segsDone = META.segments.filter(v=>{ const g=SHOTS.filter(s=>s.vseg===v); return g.length && g.every(s=>st(s.id)==='approved'); }).length;
  const kpis=[
    ['Shots captured', cap, SHOTS.length],
    ['Shots approved', app, SHOTS.length],
    ['Segments complete', segsDone, META.segments.length],
    ['Devices wrapped', META.devices.filter(d=>{ const g=SHOTS.filter(s=>s.device===d); return g.length && g.every(s=>st(s.id)==='approved'); }).length, META.devices.length],
  ];
  const box=document.getElementById('kpis'); box.innerHTML='';
  kpis.forEach(([lab,d,t])=>{ const k=el('div','kpi');
    k.innerHTML='<div class="lab">'+lab+'</div><div class="val">'+d+' <small>/ '+t+'</small></div><div class="bar"><span style="width:'+pct(d,t)+'%"></span></div>';
    box.appendChild(k); });
}
function renderDevices(){
  const box=document.getElementById('devgrid'); box.innerHTML='';
  META.devices.forEach(d=>{ const g=SHOTS.filter(s=>s.device===d);
    const cap=g.filter(s=>st(s.id)!=='todo').length, app=g.filter(s=>st(s.id)==='approved').length;
    const c=el('div','dev');
    c.innerHTML='<div class="n">'+d+'</div><div class="c">'+g.length+' dedicated shots</div>'+
      '<div class="bar"><span style="width:'+pct(app,g.length)+'%"></span></div>'+
      '<div class="pct">'+cap+' captured · '+app+' approved</div>';
    box.appendChild(c); });
}
function renderSegs(){
  const f=filters(); const box=document.getElementById('segs'); box.innerHTML='';
  META.segments.forEach(v=>{
    const g=SHOTS.filter(s=>s.vseg===v); const vis=g.filter(s=>match(s,f));
    if(!vis.length) return;
    const app=g.filter(s=>st(s.id)==='approved').length;
    const seg=el('div','seg');
    const head=el('div','seghead');
    head.innerHTML='<div class="vid">'+v+'</div><div class="st">'+(g[0].segTitle)+'</div>'+
      '<div class="mini bar"><span style="width:'+pct(app,g.length)+'%"></span></div>'+
      '<div class="cnt">'+app+'/'+g.length+' approved</div>';
    const shots=el('div','shots'+((expanded[v]===false)?' collapsed':''));
    head.onclick=()=>{ expanded[v]=!(expanded[v]!==false); shots.classList.toggle('collapsed'); };
    vis.forEach(s=>{
      const row=el('div','shot');
      const cur=st(s.id);
      row.innerHTML=
        '<div><div class="sid">'+s.id+'</div><div class="stype">'+s.type+'</div><div class="sdev">'+s.device+'</div></div>'+
        '<div><div class="action">'+s.action+'</div>'+
          '<div class="meta"><span class="chip">Proof: <b>'+s.proof+'</b></span>'+
          (s.speaker&&s.speaker!=='None'?'<span class="chip">Speaker: <b>'+s.speaker+'</b></span>':'')+'</div>'+
          '<div class="gate">'+s.gate+'</div></div>'+
        '<div class="side"><div class="states">'+
          ['todo','captured','approved'].map(x=>'<button data-s="'+x+'" class="'+(cur===x?'on':'')+'">'+({todo:'To shoot',captured:'Captured',approved:'Approved'}[x])+'</button>').join('')+
          '</div><textarea class="note" placeholder="Notes (take, location, issues)…">'+note(s.id).replace(/</g,'&lt;')+'</textarea></div>';
      row.querySelectorAll('.states button').forEach(b=> b.onclick=()=> setSt(s.id, b.dataset.s));
      row.querySelector('.note').addEventListener('input', e=> setNote(s.id, e.target.value));
      shots.appendChild(row);
    });
    seg.appendChild(head); seg.appendChild(shots); box.appendChild(seg);
  });
}
function render(){ renderKpis(); renderDevices(); renderSegs(); }

['q','fseg','fdev','ftype','fstatus'].forEach(id=> document.getElementById(id).addEventListener('input', renderSegs));
document.getElementById('expand').onclick=()=>{ const any=META.segments.some(v=>expanded[v]===false); META.segments.forEach(v=>expanded[v]=any?true:false); renderSegs(); document.getElementById('expand').textContent = any?'Collapse all':'Expand all'; };
document.getElementById('reset').onclick=()=>{ if(confirm('Clear all captured/approved status and notes?')){ state={}; save(); render(); } };
document.getElementById('exportJson').onclick=()=>{ dl('thox-production-status.json', JSON.stringify(SHOTS.map(s=>({id:s.id,segment:s.seg,device:s.device,status:st(s.id),note:note(s.id)})),null,2), 'application/json'); };
document.getElementById('exportCsv').onclick=()=>{ const rows=[['shot_id','segment','device','status','note']].concat(SHOTS.map(s=>[s.id,s.seg,s.device,st(s.id),'"'+note(s.id).replace(/"/g,'""')+'"'])); dl('thox-production-status.csv', rows.map(r=>r.join(',')).join('\n'), 'text/csv'); };
function dl(name,data,mime){ const b=new Blob([data],{type:mime}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=name; a.click(); }
render();
</script>
</body>
</html>
"""

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(TEMPLATE.replace("__DATA__", DATA_JSON).replace("__META__", META_JSON))
print(f"Wrote {OUT} ({OUT.stat().st_size/1024:.0f} KB) — {len(rows)} shots across {len(meta['segments'])} segments")
