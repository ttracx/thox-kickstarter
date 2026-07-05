// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// animations.jsx — timeline engine. Exports (on window): Stage, Sprite,
//   TextSprite, ImageSprite, RectSprite, VideoSprite, PlaybackBar,
//   useTime, useTimeline, useSprite, Easing, interpolate, animate, clamp.
//
//   <Stage width={1280} height={720} duration={10} background="#f6f4ef">
//     <Sprite start={0} end={3}>
//       <TextSprite text="Hello" x={100} y={300} size={72} color="#111" />
//     </Sprite>
//     <Sprite start={2} end={8}>
//       <ImageSprite src="hero.png" x={200} y={120} width={640} height={360} kenBurns />
//     </Sprite>
//   </Stage>
//
// Stage({width,height,duration,background,fps,loop,autoplay}) — auto-scales to
//   viewport; scrubber + play/pause + ←/→ seek + space + 0-reset; persists
//   playhead. The canvas is an <svg><foreignObject>, export-ready: Share →
//   Export → Video (or the PlaybackBar's download button) renders it to .mp4.
//   Screenshot tools DOM-rerender (not pixel-capture) and unwrap this wrapper
//   so captures should work — but if one comes back black, that's a capture
//   artifact, not a render bug; trust the live preview.
// Sprite({start,end,keepMounted}) — mounts children only while playhead is in
//   [start,end]. Children read {localTime, progress, duration} via useSprite().
// useTime() → seconds; useTimeline() → {time,duration,playing,setTime,setPlaying}.
// TextSprite({text,x,y,size,color,font,weight,align,entryDur,exitDur}) — fades/scales in+out.
// ImageSprite({src,x,y,width,height,fit,radius,kenBurns,placeholder}) — same, with optional ken-burns.
// RectSprite({x,y,width,height,color,radius}) — solid box with entry/exit.
// VideoSprite({src,start,end,speed,style}) — looped <video> clip synced to the
//   timeline; its audio is mixed into the exported video.
// Easing.{linear,easeIn/Out/InOut Quad/Cubic/Quart/Quint/Expo/Back, …}
// interpolate([t0,t1,…],[v0,v1,…],ease?) → (t)=>v  — piecewise tween.
// animate({from,to,start,end,ease}) → (t)=>v  — single tween.
//
// Build scenes by composing Sprites inside Stage. Absolutely-position elements.
//
// In a .dc.html project, put your scene in a sibling my-scene.jsx (reading
// {Stage, Sprite, useTime, Easing, …} from window is safe) and mount BOTH:
//   <x-import component-from-global-scope="MyScene"
//             from="./animations.jsx ./my-scene.jsx"></x-import>
// The two files in from= load in order, so my-scene.jsx can use the globals
// animations.jsx set.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

// ── Easing functions (hand-rolled, Popmotion-style) ─────────────────────────
// All easings take t ∈ [0,1] and return eased t ∈ [0,1] (may overshoot for back/elastic).
const Easing = {
  linear: (t) => t,

  // Quad
  easeInQuad:    (t) => t * t,
  easeOutQuad:   (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  // Cubic
  easeInCubic:    (t) => t * t * t,
  easeOutCubic:   (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),

  // Quart
  easeInQuart:    (t) => t * t * t * t,
  easeOutQuart:   (t) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t),

  // Expo
  easeInExpo:  (t) => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeInOutExpo: (t) => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    if (t < 0.5) return 0.5 * Math.pow(2, 20 * t - 10);
    return 1 - 0.5 * Math.pow(2, -20 * t + 10);
  },

  // Sine
  easeInSine:    (t) => 1 - Math.cos((t * Math.PI) / 2),
  easeOutSine:   (t) => Math.sin((t * Math.PI) / 2),
  easeInOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,

  // Back (overshoot)
  easeOutBack: (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
  easeInBack: (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return c3 * t * t * t - c1 * t * t;
  },
  easeInOutBack: (t) => {
    const c1 = 1.70158, c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  },

  // Elastic
  easeOutElastic: (t) => {
    const c4 = (2 * Math.PI) / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

// ── Core interpolation helpers ──────────────────────────────────────────────

// Clamp a value to [min, max]
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

// interpolate([0, 0.5, 1], [0, 100, 50], ease?) -> fn(t)
// Popmotion-style: linearly maps t across input keyframes to output values,
// with optional easing per segment (single fn or array of fns).
function interpolate(input, output, ease = Easing.linear) {
  return (t) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const easeFn = Array.isArray(ease) ? (ease[i] || Easing.linear) : ease;
        const eased = easeFn(local);
        return output[i] + (output[i + 1] - output[i]) * eased;
      }
    }
    return output[output.length - 1];
  };
}

// animate({from, to, start, end, ease})(t) — simpler single-segment tween.
// Returns `from` before `start`, `to` after `end`.
function animate({ from = 0, to = 1, start = 0, end = 1, ease = Easing.easeInOutCubic }) {
  return (t) => {
    if (t <= start) return from;
    if (t >= end) return to;
    const local = (t - start) / (end - start);
    return from + (to - from) * ease(local);
  };
}

// ── Timeline context ────────────────────────────────────────────────────────

const TimelineContext = React.createContext({ time: 0, duration: 10, playing: false });

const useTime = () => React.useContext(TimelineContext).time;
const useTimeline = () => React.useContext(TimelineContext);

// ── Sprite ──────────────────────────────────────────────────────────────────
// Renders children only when the playhead is inside [start, end]. Provides
// a sub-context with `localTime` (seconds since start) and `progress` (0..1).
//
//   <Sprite start={2} end={5}>
//     {({ localTime, progress }) => <Thing x={progress * 100} />}
//   </Sprite>
//
// Or as a plain wrapper — children can call useSprite() themselves.

const SpriteContext = React.createContext({ localTime: 0, progress: 0, duration: 0 });
const useSprite = () => React.useContext(SpriteContext);

function Sprite({ start = 0, end = Infinity, children, keepMounted = false }) {
  const { time } = useTimeline();
  const visible = time >= start && time <= end;
  if (!visible && !keepMounted) return null;

  const duration = end - start;
  const localTime = Math.max(0, time - start);
  const progress = duration > 0 && isFinite(duration)
    ? clamp(localTime / duration, 0, 1)
    : 0;

  const value = { localTime, progress, duration, visible };

  return (
    <SpriteContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </SpriteContext.Provider>
  );
}

// ── Sample sprite components ────────────────────────────────────────────────

// TextSprite: fades/slides text in on entry, holds, then fades out on exit.
// Props: text, x, y, size, color, font, entryDur, exitDur, align
function TextSprite({
  text,
  x = 0, y = 0,
  size = 48,
  color = '#111',
  font = 'Inter, system-ui, sans-serif',
  weight = 600,
  entryDur = 0.45,
  exitDur = 0.35,
  entryEase = Easing.easeOutBack,
  exitEase = Easing.easeInCubic,
  align = 'left',
  letterSpacing = '-0.01em',
}) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);

  let opacity = 1;
  let ty = 0;

  if (localTime < entryDur) {
    const t = entryEase(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    ty = (1 - t) * 16;
  } else if (localTime > exitStart) {
    const t = exitEase(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    ty = -t * 8;
  }

  const translateX = align === 'center' ? '-50%' : align === 'right' ? '-100%' : '0';

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      transform: `translate(${translateX}, ${ty}px)`,
      opacity,
      fontFamily: font,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing,
      whiteSpace: 'pre',
      lineHeight: 1.1,
      willChange: 'transform, opacity',
    }}>
      {text}
    </div>
  );
}

// ImageSprite: scales + fades in; optional Ken Burns drift during hold.
function ImageSprite({
  src,
  x = 0, y = 0,
  width = 400, height = 300,
  entryDur = 0.6,
  exitDur = 0.4,
  kenBurns = false,
  kenBurnsScale = 1.08,
  radius = 12,
  fit = 'cover',
  placeholder = null, // {label: string} for striped placeholder
}) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);

  let opacity = 1;
  let scale = 1;

  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t;
    scale = 0.96 + 0.04 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = (kenBurns ? kenBurnsScale : 1) + 0.02 * t;
  } else if (kenBurns) {
    const holdSpan = exitStart - entryDur;
    const holdT = holdSpan > 0 ? (localTime - entryDur) / holdSpan : 0;
    scale = 1 + (kenBurnsScale - 1) * holdT;
  }

  const content = placeholder ? (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'repeating-linear-gradient(135deg, #e9e6df 0 10px, #dcd8cf 10px 20px)',
      color: '#6b6458',
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    }}>
      {placeholder.label || 'image'}
    </div>
  ) : (
    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: fit, display: 'block' }} />
  );

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width, height,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      borderRadius: radius,
      overflow: 'hidden',
      willChange: 'transform, opacity',
    }}>
      {content}
    </div>
  );
}

// RectSprite: simple rectangle that animates position/size/color via props.
// Useful demo primitive — takes a `render` fn for per-frame customization.
function RectSprite({
  x = 0, y = 0,
  width = 100, height = 100,
  color = '#111',
  radius = 8,
  entryDur = 0.4,
  exitDur = 0.3,
  render, // optional: (ctx) => style overrides
}) {
  const spriteCtx = useSprite();
  const { localTime, duration } = spriteCtx;
  const exitStart = Math.max(0, duration - exitDur);

  let opacity = 1;
  let scale = 1;

  if (localTime < entryDur) {
    const t = Easing.easeOutBack(clamp(localTime / entryDur, 0, 1));
    opacity = clamp(localTime / entryDur, 0, 1);
    scale = 0.4 + 0.6 * t;
  } else if (localTime > exitStart) {
    const t = Easing.easeInQuad(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t;
    scale = 1 - 0.15 * t;
  }

  const overrides = render ? render(spriteCtx) : {};

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width, height,
      background: color,
      borderRadius: radius,
      opacity,
      transform: `scale(${scale})`,
      transformOrigin: 'center',
      willChange: 'transform, opacity',
      ...overrides,
    }} />
  );
}


// ── Font inlining ───────────────────────────────────────────────────────────
// Copy every @font-face rule from the page into a <style> inside the svg's
// foreignObject, with font URLs rewritten to data: URLs. Makes the svg
// self-describing so serializing it alone (video export fast path) still
// renders with the right fonts. Sets data-om-fonts-inlined on the svg when
// done so the exporter can wait for it.

function useInlineFontsInto(svgRef) {
  React.useEffect(() => {
    const svg = svgRef.current;
    const host = svg && svg.querySelector('foreignObject > div');
    if (!svg || !host) return;
    let cancelled = false;
    (async () => {
      const rules = [];
      for (const ss of document.styleSheets) {
        let cssRules;
        try { cssRules = ss.cssRules; } catch {
          // Cross-origin sheet without crossorigin attr (e.g. the standard
          // fonts.googleapis.com <link>) — fetch the CSS text directly and
          // regex-extract the @font-face blocks.
          if (ss.href) {
            try {
              const txt = await fetch(ss.href).then(r => { if (!r.ok) throw 0; return r.text(); });
              for (const ff of (txt.match(/@font-face\s*{[^}]*}/g) || []))
                rules.push({ css: ff, base: ss.href });
            } catch {}
          }
          continue;
        }
        if (!cssRules) continue;
        for (const r of cssRules) {
          if (r.type === CSSRule.FONT_FACE_RULE) {
            rules.push({ css: r.cssText, base: ss.href || location.href });
          }
        }
      }
      const toDataURL = (url) => fetch(url)
        .then(r => { if (!r.ok) throw 0; return r.blob(); })
        .then(b => new Promise(res => {
          const fr = new FileReader();
          fr.onload = () => res(fr.result);
          fr.onerror = () => res(url);
          fr.readAsDataURL(b);
        }))
        .catch(() => url);
      const parts = await Promise.all(rules.map(async ({ css, base }) => {
        const re = /url\((['"]?)([^'")]+)\1\)/g;
        let out = css, m;
        while ((m = re.exec(css))) {
          const u = m[2];
          if (u.startsWith('data:')) continue;
          let abs; try { abs = new URL(u, base).href; } catch { continue; }
          out = out.split(m[0]).join(`url("${await toDataURL(abs)}")`);
        }
        return out;
      }));
      if (cancelled || !parts.length) {
        svg.setAttribute('data-om-fonts-inlined', 'true');
        return;
      }
      const style = document.createElement('style');
      style.textContent = parts.join('\n');
      host.insertBefore(style, host.firstChild);
      svg.setAttribute('data-om-fonts-inlined', 'true');
    })();
    return () => { cancelled = true; };
  }, []);
}


function Stage({
  width = 1280,
  height = 720,
  duration = 10,
  background = '#f6f4ef',
  fps = 60,
  loop = true,
  autoplay = true,
  persistKey = 'animstage',
  children,
}) {
  // Props arrive as strings when Stage is mounted via <x-import> (DC
  // projects) — coerce so style={{width}} gets a number React can px-ify.
  width = +width || 1280; height = +height || 720;
  duration = +duration || 10; fps = +fps || 60;
  if (typeof loop === 'string') loop = loop !== 'false';
  if (typeof autoplay === 'string') autoplay = autoplay !== 'false';

  const [time, setTime] = React.useState(() => {
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0');
      return isFinite(v) ? clamp(v, 0, duration) : 0;
    } catch { return 0; }
  });
  const [playing, setPlaying] = React.useState(autoplay);
  const [hoverTime, setHoverTime] = React.useState(null);
  const [scale, setScale] = React.useState(1);

  const stageRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const lastTsRef = React.useRef(null);

  // Persist playhead
  React.useEffect(() => {
    try { localStorage.setItem(persistKey + ':t', String(time)); } catch {}
  }, [time, persistKey]);

  // Auto-scale to fit viewport
  React.useEffect(() => {
    if (!stageRef.current) return;
    const el = stageRef.current;
    const measure = () => {
      const barH = 44; // playback bar height
      const s = Math.min(
        el.clientWidth / width,
        (el.clientHeight - barH) / height
      );
      setScale(Math.max(0.05, s));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [width, height]);

  // Animation loop
  React.useEffect(() => {
    if (!playing) {
      lastTsRef.current = null;
      return;
    }
    const step = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      setTime((t) => {
        let next = t + dt;
        if (next >= duration) {
          if (loop) next = next % duration;
          else { next = duration; setPlaying(false); }
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [playing, duration, loop]);

  // Keyboard: space = play/pause, ← → = seek
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setPlaying(p => !p);
      } else if (e.code === 'ArrowLeft') {
        setTime(t => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.code === 'ArrowRight') {
        setTime(t => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration));
      } else if (e.key === '0' || e.code === 'Home') {
        setTime(0);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [duration]);

  // Video-export protocol: the exporter dispatches this event per frame;
  // pause + sync the playhead so the capture sees exactly that timestamp.
  React.useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const onSeek = (e) => {
      setPlaying(false);
      setTime(clamp(e.detail.time, 0, duration));
    };
    el.addEventListener('data-om-seek-to-time-frame', onSeek);
    return () => el.removeEventListener('data-om-seek-to-time-frame', onSeek);
  }, [duration]);

  // Inline @font-face rules into the svg's foreignObject so the svg is
  // self-describing — serializing it alone (for video export) then renders
  // with the right fonts. Sets data-om-fonts-inlined once done.
  useInlineFontsInto(canvasRef);

  const displayTime = hoverTime != null ? hoverTime : time;

  const ctxValue = React.useMemo(
    () => ({ time: displayTime, duration, playing, setTime, setPlaying }),
    [displayTime, duration, playing]
  );

  return (
    <div
      ref={stageRef}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        background: '#0a0a0a',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Canvas area — vertically centered in remaining space */}
      <div style={{
        flex: 1,
        width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        minHeight: 0,
      }}>
        <svg
          ref={canvasRef}
          width={width} height={height}
          data-om-exportable-video-with-duration-secs={duration}
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center',
            flexShrink: 0,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            display: 'block',
          }}
        >
          <foreignObject x="0" y="0" width="100%" height="100%">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                width, height,
                background,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <TimelineContext.Provider value={ctxValue}>
                {children}
              </TimelineContext.Provider>
            </div>
          </foreignObject>
        </svg>
      </div>

      {/* Playback bar — stacked below canvas, never overlapping */}
      <PlaybackBar
        time={displayTime}
        actualTime={time}
        duration={duration}
        playing={playing}
        onPlayPause={() => setPlaying(p => !p)}
        onReset={() => { setTime(0); }}
        onSeek={(t) => setTime(t)}
        onHover={(t) => setHoverTime(t)}
      />
    </div>
  );
}

// ── Playback bar ────────────────────────────────────────────────────────────
// Play/pause, return-to-begin, scrub track, time display.
// Uses fixed-width time fields so layout doesn't thrash.

function PlaybackBar({ time, duration, playing, onPlayPause, onReset, onSeek, onHover }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);

  const timeFromEvent = React.useCallback((e) => {
    const rect = trackRef.current.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    return x * duration;
  }, [duration]);

  const onTrackMove = (e) => {
    if (!trackRef.current) return;
    const t = timeFromEvent(e);
    if (dragging) {
      onSeek(t);
    } else {
      onHover(t);
    }
  };

  const onTrackLeave = () => {
    if (!dragging) onHover(null);
  };

  const onTrackDown = (e) => {
    setDragging(true);
    const t = timeFromEvent(e);
    onSeek(t);
    onHover(null);
  };

  React.useEffect(() => {
    if (!dragging) return;
    const onUp = () => setDragging(false);
    const onMove = (e) => {
      if (!trackRef.current) return;
      const t = timeFromEvent(e);
      onSeek(t);
    };
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mousemove', onMove);
    };
  }, [dragging, timeFromEvent, onSeek]);

  const pct = duration > 0 ? (time / duration) * 100 : 0;
  const fmt = (t) => {
    const total = Math.max(0, t);
    const m = Math.floor(total / 60);
    const s = Math.floor(total % 60);
    const cs = Math.floor((total * 100) % 100);
    return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };

  const mono = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace';

  return (
    <div data-omelette-chrome style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '8px 16px',
      background: 'rgba(20,20,20,0.92)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      width: '100%',
      maxWidth: 680,
      alignSelf: 'center',

      borderRadius: 8,
      color: '#f6f4ef',
      fontFamily: 'Inter, system-ui, sans-serif',
      userSelect: 'none',
      flexShrink: 0,
    }}>
      <IconButton onClick={onReset} title="Return to start (0)">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 2v10M12 2L5 7l7 5V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
        </svg>
      </IconButton>
      <IconButton onClick={onPlayPause} title="Play/pause (space)">
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="3" y="2" width="3" height="10" fill="currentColor"/>
            <rect x="8" y="2" width="3" height="10" fill="currentColor"/>
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 2l9 5-9 5V2z" fill="currentColor"/>
          </svg>
        )}
      </IconButton>

      {/* Current time: fixed width so it doesn't thrash */}
      <div style={{
        fontFamily: mono,
        fontSize: 12,
        fontVariantNumeric: 'tabular-nums',
        width: 64, textAlign: 'right',
        color: '#f6f4ef',
      }}>
        {fmt(time)}
      </div>

      {/* Scrub track */}
      <div
        ref={trackRef}
        onMouseMove={onTrackMove}
        onMouseLeave={onTrackLeave}
        onMouseDown={onTrackDown}
        style={{
          flex: 1,
          height: 22,
          position: 'relative',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center',
        }}
      >
        <div style={{
          position: 'absolute',
          left: 0, right: 0, height: 4,
          background: 'rgba(255,255,255,0.12)',
          borderRadius: 2,
        }}/>
        <div style={{
          position: 'absolute',
          left: 0, width: `${pct}%`, height: 4,
          background: 'oklch(72% 0.12 250)',
          borderRadius: 2,
        }}/>
        <div style={{
          position: 'absolute',
          left: `${pct}%`, top: '50%',
          width: 12, height: 12,
          marginLeft: -6, marginTop: -6,
          background: '#fff',
          borderRadius: 6,
          boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
        }}/>
      </div>

      {/* Duration: fixed width */}
      <div style={{
        fontFamily: mono,
        fontSize: 12,
        fontVariantNumeric: 'tabular-nums',
        width: 64, textAlign: 'left',
        color: 'rgba(246,244,239,0.55)',
      }}>
        {fmt(duration)}
      </div>

      {typeof VideoEncoder !== 'undefined' && (
        <IconButton
          title="Export video"
          onClick={() => window.parent.postMessage({ type: 'omelette:request-video-export' }, '*')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v7m0 0L4 6m3 3l3-3M2 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </IconButton>
      )}
    </div>
  );
}

function IconButton({ children, onClick, title }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 28, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: hover ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 6,
        color: '#f6f4ef',
        cursor: 'pointer',
        padding: 0,
        transition: 'background 120ms',
      }}
    >
      {children}
    </button>
  );
}


// ── VideoSprite ─────────────────────────────────────────────────────────────
// Renders a <video> that loops within [start,end] of its source at `speed`,
// kept in sync with the Stage's playhead. Carries the
// data-om-exportable-video-play-* attrs so video export can mix its audio.
//
//   <VideoSprite src="clip.mp4" start={2} end={5} speed={1}
//     style={{ width: 640, height: 360 }} />

function VideoSprite({ src, start = 0, end, speed = 1, style, ...rest }) {
  start = +start || 0; speed = +speed || 1;
  if (end != null) end = +end || undefined;
  const t = useTime();
  const ref = React.useRef(null);
  const span = Math.max(0.001, ((end ?? start + 1) - start));
  React.useEffect(() => {
    const v = ref.current;
    if (!v || v.readyState < 1) return;
    const target = start + ((t * speed) % span);
    if (Math.abs(v.currentTime - target) > 0.05) v.currentTime = target;
  }, [t, start, span, speed]);
  return (
    <video
      ref={ref}
      src={src}
      muted playsInline preload="auto"
      data-om-exportable-video-play-start={start}
      data-om-exportable-video-play-end={end ?? start + span}
      data-om-exportable-video-play-speed={speed}
      style={{ display: 'block', objectFit: 'cover', ...style }}
      {...rest}
    />
  );
}


Object.assign(window, {
  Easing, interpolate, animate, clamp,
  TimelineContext, useTime, useTimeline,
  Sprite, SpriteContext, useSprite,
  TextSprite, ImageSprite, RectSprite, VideoSprite,
  Stage, PlaybackBar,
});


;
/* THOX.ai KS-FILM-2026 — 90-second animatic.
   Scenes composed on the animations.jsx engine (window globals).
   Wireframe animatic language lifted from Video Storyboard.html:
   gray construction lines, emerald accents, mono labels, Xolonium display. */

const { Stage, Sprite, VideoSprite, useSprite, useTime, useTimeline, Easing, interpolate, animate, clamp } = window;

const C = {
  bg: '#050506', panel: '#0e0e11', surface: '#1A1A1C',
  line: '#4b4b53', line2: '#33333a',
  text: '#fafafa', text2: '#a1a1aa', muted: '#71717a',
  em: '#10b981', emL: '#34d399', neon: '#00ff88', red: '#ef4444',
};
const F = {
  d: "'Xolonium', sans-serif",
  m: "'JetBrains Mono', Consolas, monospace",
  s: "'Inter', system-ui, sans-serif",
};

const pad = (n) => String(n).padStart(2, '0');
// draw progress: eased 0..1 starting at `delay` over `dur`
const dp = (t, delay = 0, dur = 0.7) => Easing.easeOutCubic(clamp((t - delay) / dur, 0, 1));

/* ---------- svg primitives (draw-on via pathLength trick) ---------- */
function Wire({ children, style }) {
  return (
    <svg viewBox="0 0 1920 1080" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', ...style }}>
      {children}
    </svg>
  );
}
const drawStyle = (p) => ({ strokeDasharray: 1, strokeDashoffset: 1 - p });
function P({ d, p = 1, c = C.line, w = 3, fill = 'none', glow, dash }) {
  if (dash) {
    return <path d={d} fill={fill} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"
      strokeDasharray={dash} opacity={p} />;
  }
  return <path d={d} fill={fill} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round"
    pathLength={1} style={drawStyle(p)} filter={glow ? 'drop-shadow(0 0 6px rgba(52,211,153,.6))' : undefined} />;
}
function R({ x, y, w, h, rx = 0, p = 1, c = C.line, sw = 3, fill = 'none', dash }) {
  if (dash) {
    return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={c} strokeWidth={sw}
      strokeDasharray={dash} opacity={p} />;
  }
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={c} strokeWidth={sw}
    pathLength={1} style={drawStyle(p)} />;
}
function Ln({ x1, y1, x2, y2, p = 1, c = C.line, w = 3, dash }) {
  if (dash) {
    return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={w} strokeLinecap="round"
      strokeDasharray={dash} opacity={p} />;
  }
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={w} strokeLinecap="round"
    pathLength={1} style={drawStyle(p)} />;
}
function Cir({ cx, cy, r, p = 1, c = C.line, w = 3, fill = 'none' }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} stroke={c} strokeWidth={w}
    pathLength={1} style={drawStyle(p)} />;
}
function LED({ x, y, r = 5, t }) {
  const o = 0.55 + 0.45 * Math.sin(t * 4);
  return <circle cx={x} cy={y} r={r} fill={C.emL} opacity={o} filter="drop-shadow(0 0 10px rgba(52,211,153,.9))" />;
}
function T({ x, y, size = 24, c = C.muted, f = F.m, ls = '.18em', o = 1, weight = 500, anchor = 'start', children }) {
  return <text x={x} y={y} fontSize={size} fill={c} fontFamily={f} letterSpacing={ls}
    fontWeight={weight} opacity={o} textAnchor={anchor}>{children}</text>;
}

/* ---------- device silhouettes (geometry from storyboard symbols) ---------- */
function Key({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Cir cx={10} cy={20} r={6} p={dp(t, d)} />
      <R x={20} y={9} w={52} h={22} rx={6} p={dp(t, d + 0.12)} />
      <R x={72} y={14} w={18} h={12} rx={2} p={dp(t, d + 0.24)} />
      <Ln x1={77} y1={17} x2={86} y2={17} p={dp(t, d + 0.36)} c={C.line2} w={2} />
      <Ln x1={77} y1={23} x2={86} y2={23} p={dp(t, d + 0.4)} c={C.line2} w={2} />
      {t > d + 0.7 && <LED x={30} y={20} r={2.4} t={t} />}
    </g>
  );
}
function Air({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={12} y={12} w={76} h={36} rx={9} p={dp(t, d)} />
      <Ln x1={22} y1={22} x2={52} y2={22} p={dp(t, d + 0.2)} c={C.line2} w={2} />
      {t > d + 0.6 && <LED x={78} y={40} r={2.4} t={t} />}
    </g>
  );
}
function Mini({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={14} y={10} w={52} h={52} rx={11} p={dp(t, d)} />
      <P d="M24 68 Q40 76 56 68" p={dp(t, d + 0.25)} c={C.emL} w={2.5} glow />
      {t > d + 0.6 && <LED x={40} y={36} r={2.6} t={t} />}
    </g>
  );
}
function Clip({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={13} y={14} w={34} h={54} rx={12} p={dp(t, d)} />
      <P d="M20 14 v-5 q0 -4 5 -4 h10 q5 0 5 4 v5" p={dp(t, d + 0.2)} c={C.line2} w={2.5} />
      <Ln x1={23} y1={52} x2={37} y2={52} p={dp(t, d + 0.3)} c={C.line2} w={2} />
      {t > d + 0.6 && <LED x={30} y={34} r={2.6} t={t} />}
    </g>
  );
}
function Person({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Cir cx={30} cy={16} r={10} p={dp(t, d)} w={2.5} />
      <P d="M12 62 Q12 32 30 32 Q48 32 48 62 L48 96 M12 62 L12 96" p={dp(t, d + 0.2, 0.9)} w={2.5} />
    </g>
  );
}
function Laptop({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={20} y={6} w={80} h={50} rx={4} p={dp(t, d)} />
      <P d="M12 68 L20 56 H100 L108 68 Z" p={dp(t, d + 0.2)} />
    </g>
  );
}
function Monitor({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={6} y={4} w={108} h={64} rx={5} p={dp(t, d)} />
      <R x={50} y={68} w={20} h={9} p={dp(t, d + 0.2)} c={C.line2} sw={2.5} />
      <Ln x1={36} y1={80} x2={84} y2={80} p={dp(t, d + 0.3)} />
    </g>
  );
}
function Phone({ x = 0, y = 0, s = 1, t, d = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <R x={0} y={0} w={120} h={240} rx={24} p={dp(t, d)} />
      <Ln x1={45} y1={16} x2={75} y2={16} p={dp(t, d + 0.2)} c={C.line2} w={3} />
    </g>
  );
}

/* ---------- chrome ---------- */
function VO({ from, to, speaker, text }) {
  const { localTime: t } = useSprite();
  if (t < from || t > to) return null;
  const o = Math.min(dp(t, from, 0.4), clamp((to - t) / 0.4, 0, 1));
  return (
    <div style={{
      position: 'absolute', left: '50%', bottom: 110, transform: `translateX(-50%) translateY(${(1 - dp(t, from, 0.5)) * 14}px)`,
      opacity: o, textAlign: 'center', maxWidth: 1240,
    }}>
      <div style={{ fontFamily: F.m, fontSize: 19, letterSpacing: '.3em', color: C.emL, marginBottom: 12 }}>{speaker}</div>
      <div style={{
        fontFamily: F.s, fontStyle: 'italic', fontSize: 38, lineHeight: 1.35, color: C.text,
        background: 'rgba(9,9,11,.55)', padding: '10px 28px', borderRadius: 10,
      }}>{text}</div>
    </div>
  );
}
function Slate({ id, title, shot }) {
  const { localTime: t } = useSprite();
  const o = dp(t, 0.3, 0.5);
  return (
    <div style={{ opacity: o }}>
      <div style={{
        position: 'absolute', top: 84, left: 96, display: 'flex', alignItems: 'baseline', gap: 22,
        fontFamily: F.m, letterSpacing: '.22em',
      }}>
        <span style={{ color: C.emL, fontSize: 22, fontWeight: 700 }}>{id}</span>
        <span style={{ color: C.text2, fontSize: 22 }}>{title}</span>
      </div>
      {shot && <div style={{
        position: 'absolute', top: 78, right: 96, fontFamily: F.m, fontSize: 19, letterSpacing: '.24em',
        color: C.emL, border: '1.5px solid rgba(16,185,129,.4)', borderRadius: 999, padding: '8px 20px',
        background: 'rgba(9,9,11,.7)',
      }}>{shot}</div>}
    </div>
  );
}
function SceneBody({ cam = 0.06, children, chrome }) {
  const { localTime: t, duration: D } = useSprite();
  const o = Math.min(clamp(t / 0.55, 0, 1), clamp((D - t) / 0.55, 0, 1));
  const sc = 1 + cam * (t / D);
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: o }}>
      <div style={{ position: 'absolute', inset: 0, transform: `scale(${sc})`, transformOrigin: '50% 46%' }}>
        {children}
      </div>
      {chrome}
    </div>
  );
}

/* ---------- scenes ---------- */
function SceneTitle() {
  const { localTime: t } = useSprite();
  const tag = 'YOUR AI. YOUR DATA. YOUR RULES.';
  const shown = tag.slice(0, Math.max(0, Math.floor((t - 2.6) * 20)));
  return (
    <div style={{ position: 'absolute', inset: 0, textAlign: 'center' }}>
      <div style={{
        position: 'absolute', top: 300, left: 0, right: 0, opacity: dp(t, 0.4, 0.6),
        fontFamily: F.m, fontSize: 21, letterSpacing: '.34em', color: C.emL,
      }}>KICKSTARTER FILM / ANIMATIC / REV V2</div>
      <div style={{
        position: 'absolute', top: 380, left: 0, right: 0,
        fontFamily: F.d, fontWeight: 700, fontSize: 200, letterSpacing: '.02em', color: C.text,
        opacity: dp(t, 0.9, 0.9), transform: `scale(${0.96 + 0.04 * dp(t, 0.9, 1.2)})`,
      }}>THOX<span style={{ color: C.emL }}>.AI</span></div>
      <div style={{
        position: 'absolute', top: 680, left: 0, right: 0, minHeight: 60,
        fontFamily: F.m, fontSize: 42, letterSpacing: '.3em', color: C.text2,
      }}>{shown}<span style={{ opacity: t % 0.9 < 0.45 && t > 2.4 ? 1 : 0, color: C.neon }}>▌</span></div>
      <div style={{
        position: 'absolute', bottom: 130, left: 0, right: 0, opacity: dp(t, 4.6, 0.8),
        display: 'flex', justifyContent: 'center', gap: 64,
        fontFamily: F.m, fontSize: 20, letterSpacing: '.22em', color: C.muted,
      }}>
        <span>4K UHD / 23.976 / 16:9</span>
        <span style={{ color: C.text2 }}>MASTER 9:40 / CUT 1:30</span>
        <span style={{ color: C.emL }}>LAUNCH 07.09.2026</span>
      </div>
    </div>
  );
}

function SceneCEO() {
  const { localTime: t } = useSprite();
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Wire>
        <Ln x1={140} y1={880} x2={1780} y2={880} p={dp(t, 0.2, 0.9)} c={C.line2} />
        {/* LED wall panel */}
        <R x={220} y={220} w={560} h={300} rx={10} p={dp(t, 0.5, 0.8)} dash="10 12" c={C.line2} sw={2.5} />
        <T x={330} y={385} size={52} c={C.emL} ls=".3em" o={dp(t, 1.2, 0.6)} f={F.m}>THOX.AI</T>
        <P d="M300 260 q120 -50 260 -30" p={dp(t, 1.4, 0.7) * 0.5} c={C.emL} w={2.5} dash="8 10" />
        {/* founder + plinth */}
        <Person x={1180} y={420} s={4.6} t={t} d={0.8} />
        <Ln x1={620} y1={880} x2={1120} y2={880} p={dp(t, 1.2, 0.6)} />
        <Ln x1={650} y1={880} x2={650} y2={770} p={dp(t, 1.4, 0.4)} />
        <Ln x1={1090} y1={880} x2={1090} y2={770} p={dp(t, 1.4, 0.4)} />
        <Ln x1={620} y1={770} x2={1120} y2={770} p={dp(t, 1.5, 0.5)} />
        <Key x={665} y={700} s={1.15} t={t} d={1.9} />
        <Air x={790} y={688} s={1.15} t={t} d={2.1} />
        <Mini x={905} y={680} s={1.1} t={t} d={2.3} />
        <Clip x={1010} y={668} s={1.1} t={t} d={2.5} />
        <T x={140} y={960} size={20} o={dp(t, 2, 0.5)}>SLOW DOLLY-IN</T>
        <P d="M140 990 H340" p={dp(t, 2.2, 0.6)} c={C.emL} w={2.5} dash="8 10" />
      </Wire>
      <VO from={3.2} to={7.6} speaker="CRAIG / ON CAMERA" text="Your AI. Your Data. Your Rules." />
    </div>
  );
}

function SceneEco() {
  const { localTime: t } = useSprite();
  const names = ['THOXKEY', 'THOXMINI AIR', 'THOXMINI', 'THOXCLIP'];
  const xs = [330, 750, 1170, 1520];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Wire>
        <Key x={300} y={520} s={3.4} t={t} d={0.5} />
        <Air x={700} y={470} s={3.4} t={t} d={1.1} />
        <Mini x={1130} y={450} s={3.2} t={t} d={1.7} />
        <Clip x={1490} y={420} s={3} t={t} d={2.3} />
        {/* mesh links */}
        <P d="M470 590 Q590 520 800 575" p={dp(t, 3.1, 0.6)} c={C.emL} w={2.5} dash="7 9" />
        <P d="M900 575 Q1050 520 1190 570" p={dp(t, 3.3, 0.6)} c={C.emL} w={2.5} dash="7 9" />
        <P d="M1310 570 Q1420 520 1540 545" p={dp(t, 3.5, 0.6)} c={C.emL} w={2.5} dash="7 9" />
        {names.map((n, i) => (
          <T key={n} x={xs[i] + (i === 0 ? 40 : 0)} y={800} size={26} c={C.text2} ls=".26em"
            o={dp(t, 0.9 + i * 0.6, 0.5)} anchor="start">{n}</T>
        ))}
      </Wire>
      <VO from={4} to={7.6} speaker="MODULE VO" text="One ecosystem. One experience. Designed around you." />
    </div>
  );
}

function SceneKey() {
  const { localTime: t } = useSprite();
  const slideX = interpolate([0.8, 2.2], [-360, 0], Easing.easeOutCubic)(t);
  const chips = ['SUMMARY', 'CODE', 'TRANSLATE', 'DRAFT'];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <VideoSprite src="assets/video/thoxkey-closeup.mp4" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,6,.45) 0%, rgba(5,5,6,0) 26%, rgba(5,5,6,0) 55%, rgba(5,5,6,.82) 100%)' }}></div>
      <div style={{ position: 'absolute', top: 760, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 18 }}>
        {chips.map((ch, i) => (
          <span key={ch} style={{
            opacity: dp(t, 4 + i * 0.35, 0.4), fontFamily: F.m, fontSize: 21, letterSpacing: '.18em',
            color: C.text2, border: `1.5px solid ${C.line2}`, background: C.surface,
            padding: '10px 24px', borderRadius: 999,
          }}>{ch}</span>
        ))}
      </div>
      <VO from={4.2} to={8.6} speaker="MODULE VO" text="Open a document. Ask for a summary. Generate code. Everything happens locally." />
    </div>
  );
}

function SceneAir() {
  const { localTime: t } = useSprite();
  const cardX = interpolate([0.9, 2.4], [-560, 0], Easing.easeOutCubic)(t);
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <VideoSprite src="assets/video/thoxmini-air-closeup.mp4" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,6,.45) 0%, rgba(5,5,6,0) 26%, rgba(5,5,6,0) 55%, rgba(5,5,6,.82) 100%)' }}></div>
      <div style={{
        position: 'absolute', top: 160, left: 0, right: 0, textAlign: 'center', opacity: dp(t, 2.8, 0.5),
        fontFamily: F.m, fontSize: 24, letterSpacing: '.26em', color: C.emL,
      }}>WIRELESS / MESH NODE</div>
      {/* project chip flies in, continuity from ThoxKey */}
      <div style={{ position: 'absolute', top: 760, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <span style={{
          transform: `translateX(${cardX}px)`, opacity: dp(t, 0.9, 0.3),
          fontFamily: F.m, fontSize: 21, letterSpacing: '.18em', color: C.emL,
          border: '1.5px solid rgba(16,185,129,.4)', background: 'rgba(9,9,11,.7)',
          padding: '10px 24px', borderRadius: 999,
        }}>PROJECT / CONTINUED</span>
      </div>
      <VO from={3.4} to={7.6} speaker="TOMMY / VO" text="Pick up exactly where you left off. More headroom. Same workspace." />
    </div>
  );
}

function SceneMini() {
  const { localTime: t } = useSprite();
  const jobs = [
    { label: 'CODE', y: 0 },
    { label: 'IMAGE', y: 1 },
    { label: 'RESEARCH', y: 2 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <VideoSprite src="assets/video/thoxmini-closeup.mp4" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,6,.45) 0%, rgba(5,5,6,0) 26%, rgba(5,5,6,0) 55%, rgba(5,5,6,.82) 100%)' }}></div>
      <VO from={3.6} to={8.4} speaker="TOMMY / VO" text="Big coding projects. Image generation. Long research. ThoxMini handles the heavy lifting, right here on my desk." />
    </div>
  );
}

function SceneClip() {
  const { localTime: t } = useSprite();
  const fly = clamp((t - 3.4) / 1.6, 0, 1);
  const fx = interpolate([0, 1], [740, 1330], Easing.easeInOutCubic)(fly);
  const fy = 560 - Math.sin(fly * Math.PI) * 200;
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <VideoSprite src="assets/video/thoxclip-closeup.mp4" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,6,.45) 0%, rgba(5,5,6,0) 26%, rgba(5,5,6,0) 55%, rgba(5,5,6,.82) 100%)' }}></div>
      {/* handoff chip flying */}
      {t > 3.2 && (
        <div style={{
          position: 'absolute', left: fx, top: fy, transform: 'translate(-50%,-50%)',
          fontFamily: F.m, fontSize: 20, letterSpacing: '.16em', color: C.emL,
          border: '1.5px solid rgba(16,185,129,.5)', background: 'rgba(9,9,11,.85)',
          padding: '10px 20px', borderRadius: 8, opacity: fly < 1 ? 1 : dp(4.2, 4, 0.2),
        }}>HANDOFF / FILES SYNCED</div>
      )}
      <VO from={1.6} to={4.4} speaker="TOMMY / ON CAMERA" text="Files, keys, models. They leave the house with me." />
      <VO from={5} to={7.6} speaker="TOMMY / VO" text="And when I'm back, it's all already here." />
    </div>
  );
}

function MeshNode({ x, y, label, t, d, kind }) {
  const p = dp(t, d, 0.6);
  const ring = clamp((t - d) / 1.1, 0, 1);
  const em = kind === 'thox';
  return (
    <g opacity={p}>
      {ring < 1 && ring > 0 && <circle cx={x} cy={y} r={30 + ring * 70} fill="none" stroke={C.emL} strokeWidth={2} opacity={1 - ring} />}
      <circle cx={x} cy={y} r={34} fill={C.panel} stroke={em ? C.emL : C.line} strokeWidth={2.5} />
      <circle cx={x} cy={y} r={7} fill={em ? C.emL : C.text2} filter={em ? 'drop-shadow(0 0 8px rgba(52,211,153,.8))' : undefined} />
      <T x={x} y={y + 78} size={20} c={em ? C.emL : C.text2} anchor="middle" ls=".2em">{label}</T>
    </g>
  );
}
function SceneMesh() {
  const { localTime: t } = useSprite();
  const hub = { x: 960, y: 480 };
  const nodes = [
    { x: 610, y: 320, label: 'THOXKEY', d: 1.6, kind: 'thox' },
    { x: 1310, y: 320, label: 'THOXMINI AIR', d: 2.2, kind: 'thox' },
    { x: 640, y: 690, label: 'THOXCLIP', d: 2.8, kind: 'thox' },
    { x: 380, y: 500, label: 'MACBOOK PRO', d: 6.6, kind: 'guest' },
    { x: 1540, y: 520, label: 'PC', d: 7.2, kind: 'guest' },
    { x: 1280, y: 700, label: 'IPHONE', d: 7.8, kind: 'guest' },
  ];
  const claims = ['DATA STAYS ON YOUR DEVICES', 'WORKS OFFLINE ON LAN AFTER PAIRING', 'WIREGUARD PROTOCOL', 'COORDINATOR NEVER SEES PLAINTEXT'];
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Wire>
        {nodes.map((n) => (
          <P key={n.label} d={`M${hub.x} ${hub.y} L${n.x} ${n.y}`} p={dp(t, n.d + 0.25, 0.6)}
            c={n.kind === 'thox' ? C.emL : C.line} w={2.5} dash="7 9" />
        ))}
        <MeshNode x={hub.x} y={hub.y} label="THOXMINI" t={t} d={0.7} kind="thox" />
        {nodes.map((n) => <MeshNode key={n.label} {...n} t={t} kind={n.kind} />)}
        <T x={960} y={180} size={30} c={C.text} f={F.d} weight={700} ls=".24em" anchor="middle" o={dp(t, 0.5, 0.6)}>ONE PRIVATE MESH</T>
      </Wire>
      <div style={{ position: 'absolute', bottom: 210, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
        {claims.map((cl, i) => (
          <span key={cl} style={{
            opacity: dp(t, 9.2 + i * 0.5, 0.5), fontFamily: F.m, fontSize: 19, letterSpacing: '.14em',
            color: C.emL, border: '1.5px solid rgba(52,211,153,.4)', background: 'rgba(16,185,129,.08)',
            padding: '10px 22px', borderRadius: 999,
          }}>{cl}</span>
        ))}
      </div>
      <VO from={1.4} to={5.2} speaker="TOMMY / ON CAMERA" text="Pair a device. Watch it join." />
      <VO from={6.4} to={9.2} speaker="TOMMY / ON CAMERA" text="And it's not just THOX hardware." />
      <VO from={9.6} to={13.4} speaker="TOMMY / ON CAMERA" text="Ask from anywhere on your mesh. Your own devices answer." />
    </div>
  );
}

function SceneClose() {
  const { localTime: t } = useSprite();
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Wire>
        <Person x={870} y={280} s={5.2} t={t} d={0.4} />
        <Ln x1={300} y1={800} x2={1620} y2={800} p={dp(t, 0.3, 0.8)} c={C.line2} />
        <Key x={640} y={840} s={1.3} t={t} d={1.4} />
        <Air x={790} y={828} s={1.3} t={t} d={1.6} />
        <Mini x={930} y={820} s={1.25} t={t} d={1.8} />
        <Clip x={1050} y={808} s={1.25} t={t} d={2} />
      </Wire>
      <VO from={2.2} to={8.4} speaker="CRAIG / ON CAMERA" text="We believe the future of AI should be personal. Private. Expandable. And owned by the people who use it." />
    </div>
  );
}

function SceneCTA() {
  const { localTime: t } = useSprite();
  const chips = ['GOAL $10,000', 'ALL OR NOTHING', '12 MONTHS MESHSTACK PRO INCLUDED'];
  return (
    <div style={{ position: 'absolute', inset: 0, textAlign: 'center' }}>
      <div style={{
        position: 'absolute', top: 330, left: 0, right: 0, opacity: dp(t, 0.5, 0.8),
        fontFamily: F.d, fontWeight: 700, fontSize: 92, color: C.text, letterSpacing: '.03em',
      }}>BACK THOX<span style={{ color: C.emL }}>.AI</span> ON KICKSTARTER</div>
      <div style={{
        position: 'absolute', top: 480, left: 0, right: 0, opacity: dp(t, 1.4, 0.6),
        fontFamily: F.m, fontSize: 34, letterSpacing: '.3em', color: C.emL,
      }}>JULY 9, 2026 / 9:00 AM PT</div>
      <div style={{ position: 'absolute', top: 590, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 18 }}>
        {chips.map((ch, i) => (
          <span key={ch} style={{
            opacity: dp(t, 2 + i * 0.45, 0.5), fontFamily: F.m, fontSize: 21, letterSpacing: '.16em',
            color: C.text2, border: `1.5px solid ${C.line2}`, background: C.surface,
            padding: '12px 26px', borderRadius: 999,
          }}>{ch}</span>
        ))}
      </div>
      <div style={{
        position: 'absolute', top: 740, left: 0, right: 0, opacity: dp(t, 3.6, 0.8),
        fontFamily: F.m, fontSize: 26, letterSpacing: '.34em', color: C.text2,
      }}>YOUR AI. <span style={{ color: C.muted }}>YOUR DATA.</span> <span style={{ color: C.text }}>YOUR RULES.</span></div>
    </div>
  );
}

/* ---------- persistent burn-ins ---------- */
function TopBar() {
  const t = useTime();
  const fr = Math.floor((t % 1) * 24);
  const tc = `TC 00:${pad(Math.floor(t / 60))}:${pad(Math.floor(t) % 60)}:${pad(fr)}`;
  const blink = Math.floor(t * 1.4) % 2 === 0;
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, height: 56, display: 'flex', alignItems: 'center',
      gap: 28, padding: '0 36px', background: 'rgba(9,9,11,.82)', borderBottom: `1px solid ${C.line2}`,
      fontFamily: F.m, fontSize: 19, letterSpacing: '.14em', color: C.text2, zIndex: 5,
    }}>
      <span style={{ color: C.red, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 11, height: 11, borderRadius: '50%', background: C.red, opacity: blink ? 1 : 0.15,
          boxShadow: '0 0 8px rgba(239,68,68,.8)',
        }}></span>REC
      </span>
      <span style={{ color: C.text, fontWeight: 700 }}>THOX<span style={{ color: C.emL }}>.AI</span> / KS-FILM-2026 / ANIMATIC</span>
      <span style={{ color: C.muted }}>LAUNCH 07.09.2026</span>
      <span style={{ marginLeft: 'auto', color: C.emL, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{tc}</span>
    </div>
  );
}
function BottomStrip() {
  const { time, duration } = useTimeline();
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 5, background: C.surface, zIndex: 5 }}>
      <div style={{
        width: `${(time / duration) * 100}%`, height: '100%',
        background: `linear-gradient(90deg, ${C.em}, ${C.neon})`, boxShadow: '0 0 10px rgba(16,185,129,.5)',
      }}></div>
    </div>
  );
}
function Backdrop() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle, #17171b 1.5px, transparent 1.5px)', backgroundSize: '42px 42px',
        opacity: 0.5,
      }}></div>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 62% 46% at 50% 42%, rgba(16,185,129,.06), transparent 65%)',
      }}></div>
    </div>
  );
}

/* ---------- master timeline ---------- */
function CampaignAnimatic({ burnIns = true, loop = true }) {
  return (
    <Stage width={1920} height={1080} duration={90} background={C.bg} autoplay loop={loop}>
      <Backdrop />
      <Sprite start={0} end={8.2}><SceneBody cam={0.03} chrome={null}><SceneTitle /></SceneBody></Sprite>
      <Sprite start={7.8} end={16.2}>
        <SceneBody cam={0.09} chrome={<Slate id="V01" title="CEO OPENING / WHY THOX EXISTS" shot="WIDE / SLOW DOLLY-IN / 35MM" />}>
          <SceneCEO />
        </SceneBody>
      </Sprite>
      <Sprite start={15.8} end={24.2}>
        <SceneBody cam={0.05} chrome={<Slate id="V02" title="ECOSYSTEM MONTAGE" shot="180 DEGREE ORBIT / GIMBAL" />}>
          <SceneEco />
        </SceneBody>
      </Sprite>
      <Sprite start={23.8} end={33.2}>
        <SceneBody cam={0.07} chrome={<Slate id="V04" title="THOXKEY / PERSONAL AI, POCKET SIZED" shot="MACRO CLOSE-UP / FOOTAGE" />}>
          <SceneKey />
        </SceneBody>
      </Sprite>
      <Sprite start={32.8} end={41.2}>
        <SceneBody cam={0.06} chrome={<Slate id="V05" title="THOXMINI AIR / WORK IN MOTION" shot="CLOSE-UP / FOOTAGE" />}>
          <SceneAir />
        </SceneBody>
      </Sprite>
      <Sprite start={40.8} end={50.2}>
        <SceneBody cam={0.06} chrome={<Slate id="V06" title="THOXMINI / DEDICATED AI WORKSPACE" shot="CLOSE-UP / FOOTAGE" />}>
          <SceneMini />
        </SceneBody>
      </Sprite>
      <Sprite start={49.8} end={58.2}>
        <SceneBody cam={0.06} chrome={<Slate id="V07" title="THOXCLIP / THOX ON YOUR PHONE" shot="CLOSE-UP / FOOTAGE" />}>
          <SceneClip />
        </SceneBody>
      </Sprite>
      <Sprite start={57.8} end={72.2}>
        <SceneBody cam={0.05} chrome={<Slate id="V10" title="MESHSTACK / THE WOW MOMENT" shot="UI / GRAPH BUILD" />}>
          <SceneMesh />
        </SceneBody>
      </Sprite>
      <Sprite start={71.8} end={81.2}>
        <SceneBody cam={0.07} chrome={<Slate id="V13" title="CEO CLOSING / FINAL HERO" shot="MEDIUM / LOCKED" />}>
          <SceneClose />
        </SceneBody>
      </Sprite>
      <Sprite start={80.8} end={90}>
        <SceneBody cam={0.03} chrome={null}><SceneCTA /></SceneBody>
      </Sprite>
      {burnIns && <TopBar />}
      {burnIns && <BottomStrip />}
    </Stage>
  );
}

window.CampaignAnimatic = CampaignAnimatic;
