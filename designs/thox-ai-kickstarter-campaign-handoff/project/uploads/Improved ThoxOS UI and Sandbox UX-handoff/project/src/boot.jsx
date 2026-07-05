// Boot screen — short, lab-instrument feel.
// Shows: chip glyph, wordmark, animated boot log, progress bar.

function BootScreen({ onDone }) {
  const [lines, setLines] = useState([]);
  const [progress, setProgress] = useState(0);
  const lineRef = useRef(null);

  const script = [
    'thoxos: kernel 5.15-rt PREEMPT_RT loaded',
    'tpm2: SLB9670 attestation OK',
    'jetson: Orin NX 16GB · 1024 CUDA · 32 Tensor',
    'uma: 16384 MiB unified · budget 14336 MiB',
    'tensorrt-llm: v0.9 · FP8 pipeline ready',
    'magstack: pogo link · 4-node Raft · gRPC :50051',
    'cuStateVec: 34q ready · cuTensorNet: 60q+',
    'thoxos: shell ready',
  ];

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      if (i >= script.length) { clearInterval(t); return; }
      setLines(prev => [...prev, script[i]]);
      setProgress(((i + 1) / script.length) * 100);
      i++;
    }, 220);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const t = setTimeout(onDone, 600);
      return () => clearTimeout(t);
    }
  }, [progress, onDone]);

  useEffect(() => {
    if (lineRef.current) lineRef.current.scrollTop = lineRef.current.scrollHeight;
  }, [lines]);

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 10000,
      background: '#000',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'JetBrains Mono, monospace',
      animation: 'b-in 320ms ease-out',
    }}>
      {/* radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.12) 0%, transparent 50%)',
      }} />

      {/* chip */}
      <div style={{ position: 'relative', marginBottom: 28 }}>
        <svg width="84" height="84" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="1.4" strokeLinecap="round"
          style={{ filter: 'drop-shadow(0 0 18px rgba(52,211,153,0.6)) drop-shadow(0 0 36px rgba(16,185,129,0.4))' }}>
          <rect x="6" y="6" width="12" height="12" rx="1.2" />
          <rect x="10" y="10" width="4" height="4" rx="0.4" fill="#34D399" stroke="none" />
          <path d="M9 3v2M12 3v2M15 3v2M9 19v2M12 19v2M15 19v2M3 9h2M3 12h2M3 15h2M19 9h2M19 12h2M19 15h2" />
        </svg>
      </div>

      <div style={{
        fontFamily: 'Xolonium, Inter, sans-serif',
        fontSize: 32, fontWeight: 700, letterSpacing: '-0.01em',
        color: '#FAFAFA',
        marginBottom: 4,
      }}>ThoxOS</div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 10.5, color: '#52525B', letterSpacing: '0.18em', textTransform: 'uppercase',
        marginBottom: 32,
      }}>v6.0 · Nova Edge</div>

      {/* boot log */}
      <div ref={lineRef} style={{
        width: 460, height: 120, overflow: 'hidden',
        fontSize: 11, lineHeight: 1.55,
        color: '#71717A',
        textAlign: 'left',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '10px 0',
        marginBottom: 18,
      }}>
        {lines.map((l, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, opacity: i === lines.length - 1 ? 1 : 0.6 }}>
            <span style={{ color: '#34D399' }}>[ OK ]</span>
            <span>{l}</span>
          </div>
        ))}
      </div>

      {/* progress */}
      <div style={{ width: 320, height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${progress}%`,
          background: 'linear-gradient(90deg, #10B981, #34D399, #00FF88)',
          boxShadow: '0 0 8px rgba(52,211,153,0.6)',
          transition: 'width 200ms cubic-bezier(0.2,0.8,0.2,1)',
        }} />
      </div>

      <div style={{ marginTop: 64, fontSize: 9.5, color: '#3F3F46', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
        THOX.AI LLC · CONFIDENTIAL
      </div>

      <style>{`@keyframes b-in { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}

window.BootScreen = BootScreen;
