/* global React */
/* Shared primitives for v2 app redesigns */
const { useState: u3S, useEffect: u3E, useMemo: u3M, useRef: u3R } = React;

function AppShell({ eyebrow, title, status, accent='#34D399', tabs, tab, onTab, action, children, dense }) {
  return (
    <div className={"a3"+(dense?' dense':'')} style={{'--a3-accent':accent}}>
      <div className="a3-h">
        <div className="a3-h-l">
          <div className="a3-eye mono">{eyebrow}</div>
          <div className="a3-ttl">{title}</div>
        </div>
        <div className="a3-h-r">
          {status && <div className="a3-status mono">{status}</div>}
          {action}
        </div>
      </div>
      {tabs && tabs.length > 0 && (
        <div className="a3-tabs">
          {tabs.map(t => (
            <button key={t.id} className={"a3-tab "+(tab===t.id?'on':'')} onClick={()=>onTab(t.id)}>
              {t.icon ? <span className="a3-tab-ic">{t.icon}</span> : null}
              <span>{t.label}</span>
              {t.badge ? <span className="a3-tab-badge mono">{t.badge}</span> : null}
            </button>
          ))}
        </div>
      )}
      <div className="a3-body">{children}</div>
    </div>
  );
}

function StatTile({ label, value, sub, accent }) {
  return (
    <div className="a3-stat">
      <div className="a3-stat-l mono">{label}</div>
      <div className="a3-stat-v" style={accent?{color:accent}:null}>{value}</div>
      {sub && <div className="a3-stat-s mono">{sub}</div>}
    </div>
  );
}

function Card({ title, action, accent, padded=true, className='', children }) {
  return (
    <div className={"a3-card "+className} style={accent?{borderColor:accent+'40'}:null}>
      {(title || action) && (
        <div className="a3-card-h">
          <span className="a3-card-t mono" style={accent?{color:accent}:null}>{title}</span>
          {action}
        </div>
      )}
      <div className={"a3-card-b"+(padded?' p':'')}>{children}</div>
    </div>
  );
}

function Pill({ children, tone='default' }) {
  return <span className={"a3-pill a3-pill-"+tone+" mono"}>{children}</span>;
}

function Bar({ value, max=100, accent='#34D399', label, right }) {
  const pct = Math.max(0,Math.min(100,(value/max)*100));
  return (
    <div className="a3-bar">
      {label && <div className="a3-bar-h"><span className="mono">{label}</span>{right && <span className="mono">{right}</span>}</div>}
      <div className="a3-bar-t"><i style={{width:pct+'%', background:accent}}/></div>
    </div>
  );
}

function KeyVal({ rows }) {
  return (
    <div className="a3-kv">
      {rows.map(([k,v],i)=>(
        <div key={i} className="a3-kv-row">
          <span className="a3-kv-k mono">{k}</span>
          <span className="a3-kv-v">{v}</span>
        </div>
      ))}
    </div>
  );
}

window.A3 = { AppShell, StatTile, Card, Pill, Bar, KeyVal };
