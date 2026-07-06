#!/usr/bin/env python3
"""Assemble kickstarter/site/ — a portable, deployable static bundle of every
THOX campaign design page.

- Flattens all pages to the bundle root so their relative ./support.js,
  ./image-slot.js, ./*.jsx and assets/ references keep resolving.
- Vendors React / ReactDOM / Babel locally and repoints support.js at them,
  so the interactive pages (Model Gallery, Software Demo, ThoxOS Mini Demo,
  Campaign Animatic) run with no CDN dependency.
- Copies only the assets the pages actually reference (no 300 MB of unused
  product renders / uploads).
- Uses the self-contained story.html and the self-contained storyboard export.
- Writes a branded index.html hub on the TXF tokens.
"""
import pathlib, shutil, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parent            # kickstarter/
REPO = ROOT.parent
PROJ = REPO / "designs/thox-ai-kickstarter-campaign-handoff/project"
VENDOR_SRC = pathlib.Path("/tmp/claude-0/-home-user-thox-kickstarter/e9e722ec-7063-5708-b6a1-db20e11232b3/scratchpad/vendor")
SITE = ROOT / "site"

if SITE.exists():
    shutil.rmtree(SITE)
SITE.mkdir(parents=True)

# 1) Runtime + animation bundles
for f in ["support.js", "image-slot.js", "animations.jsx",
          "animatic-scenes.jsx", "animatic-bundle.jsx", "favicon.svg" if (PROJ/"favicon.svg").exists() else "assets/favicon.svg"]:
    src = PROJ / f
    if src.exists():
        shutil.copy2(src, SITE / pathlib.Path(f).name)

# 2) Vendor React/ReactDOM/Babel and repoint support.js
vend = SITE / "vendor"; vend.mkdir()
for v in ["react.production.min.js", "react-dom.production.min.js", "babel.min.js"]:
    shutil.copy2(VENDOR_SRC / v, vend / v)
sup = (SITE / "support.js").read_text()
sup = sup.replace("https://unpkg.com/@babel/standalone@7.29.0/babel.min.js", "./vendor/babel.min.js")
sup = sup.replace("https://unpkg.com/react@18.3.1/umd/react.production.min.js", "./vendor/react.production.min.js")
sup = sup.replace("https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js", "./vendor/react-dom.production.min.js")
(SITE / "support.js").write_text(sup)

# 3) Referenced assets only
for rel in ["assets/fonts", "assets/logos", "assets/runbook", "assets/thoxos",
            "assets/team", "assets/video", "assets/product/stretch-colors"]:
    src = PROJ / rel
    if src.exists():
        shutil.copytree(src, SITE / rel, dirs_exist_ok=True)
if (PROJ / "assets/favicon.svg").exists():
    shutil.copy2(PROJ / "assets/favicon.svg", SITE / "assets/favicon.svg")

# 4a) Featured flagship page: the realistic ThoxOS desktop sandbox (v6.1)
FEATURED = {
    "src": ROOT / "sources/thoxos-sandbox.html",
    "out": "thoxos-demo.html",
    "title": "ThoxOS Demo",
    "blurb": "The full ThoxOS desktop that ships on THOX Nova and the THOX Edge Series, live: lock screen, menu bar, command palette (⌘K), a dock of real apps, and streaming on-device inference at 42 tok/s. Same Experience Fabric as ThoxOS Mini, scaled up. Any password unlocks it.",
    "preview": "sources/thoxos-preview.png",
}
prev_rel = None
if FEATURED["src"].exists():
    shutil.copy2(FEATURED["src"], SITE / FEATURED["out"])
    prevdir = SITE / "assets/preview"; prevdir.mkdir(parents=True, exist_ok=True)
    if (ROOT / FEATURED["preview"]).exists():
        shutil.copy2(ROOT / FEATURED["preview"], prevdir / "thoxos-demo.png")
        prev_rel = "assets/preview/thoxos-demo.png"
    print(f"  * {FEATURED['out']:26s} <- {FEATURED['src'].name} (featured)")

# 4b) Pages: (source, output-name, title, blurb, kind)
PAGES = [
    (ROOT / "story.html",                              "story.html",             "Kickstarter Story",  "The full campaign narrative: hero, devices, MeshStack, ThoxOS, rewards, timeline, risks, team, FAQ.", "self-contained"),
    (PROJ / "Campaign Runbook.dc.html",                "campaign-runbook.html",  "Campaign Runbook",   "Internal launch playbook: overview, roles, tiers, timeline, launch-day comms, risk tracker.", "runtime"),
    (PROJ / "Model Gallery.dc.html",                   "model-gallery.html",     "Model Gallery",      "Interactive browser of the local model library available on ThoxOS.", "interactive"),
    (PROJ / "Software Demo.dc.html",                   "software-demo.html",     "Software Demo",      "Clickable ThoxOS software walkthrough: mesh, devices, activity, settings.", "interactive"),
    ((ROOT / "sources/thoxos-mini-demo.dc.html") if (ROOT / "sources/thoxos-mini-demo.dc.html").exists() else (PROJ / "ThoxOS Mini Demo.dc.html"),
                                                       "thoxos-mini-demo.html",  "ThoxOS Mini Demo",   "The edge build that powers ThoxKey, ThoxMini Air, ThoxMini, and ThoxClip. Boot, insert, agents, files, skills, terminal — the same Experience Fabric, shrunk to a key.", "interactive"),
    (PROJ / "Campaign Animatic.dc.html",               "campaign-animatic.html", "Campaign Animatic",  "Animated teaser sequence built from the device close-up footage.", "interactive"),
]

# 4b2) MeshStack app — fully functional standalone demos, one per platform
MESHSTACK = [
    ("ios",     "MeshStack · iOS",     "The MeshStack iPhone app: create a private identity, pair by QR, and watch the encrypted mesh come alive."),
    ("ipad",    "MeshStack · iPad",    "MeshStack on iPad: full mesh overview, device roles, and live distributed-inference metrics."),
    ("macos",   "MeshStack · macOS",   "The macOS desktop app: network map, devices, inference, activity, and security in one window."),
    ("windows", "MeshStack · Windows", "MeshStack for Windows: monitor your private mesh, devices online, and total throughput live."),
    ("android", "MeshStack · Android", "The MeshStack Android app: one-time pairing, private mesh, and on-device inference."),
]
msdir = ROOT / "sources/meshstack"
meshstack_kept = []
if msdir.exists():
    for key, title, blurb in MESHSTACK:
        src = msdir / f"{key}.html"
        if src.exists():
            shutil.copy2(src, SITE / f"meshstack-{key}.html")
            meshstack_kept.append((f"meshstack-{key}.html", title, blurb))
            print(f"  ~ meshstack-{key:8s}.html <- sources/meshstack/{key}.html")

# 4b3) Tools: ThoxMigrate + ThoxLLM Model Gallery & Download Center
thoxmigrate_kept = []
tm_src = ROOT / "sources/thoxmigrate.html"
if tm_src.exists():
    shutil.copy2(tm_src, SITE / "thoxmigrate.html")
    thoxmigrate_kept.append(("thoxmigrate.html", "ThoxMigrate",
        "Cloud-to-edge AI migration: scan your current cloud AI usage, map models to local equivalents, and plan the move to THOX edge devices. Fully interactive."))
    print("  ~ thoxmigrate.html      <- sources/thoxmigrate.html")
mg_src = ROOT / "sources/models.html"
if mg_src.exists():
    shutil.copy2(mg_src, SITE / "models.html")
    thoxmigrate_kept.append(("models.html", "ThoxLLM Model Gallery",
        "Model gallery + download center: browse the real THOX models, find the right one for your device, and pull from Hugging Face or Ollama. Links to the catalog + compatibility tool."))
    print("  ~ models.html           <- sources/models.html")

# 4b3b) THOX Experience Fabric (TXF) — the cross-platform design + runtime framework
platform_kept = []
xf_src = ROOT / "sources/experience-fabric.html"
if xf_src.exists():
    shutil.copy2(xf_src, SITE / "experience-fabric.html")
    platform_kept.append(("experience-fabric.html", "THOX Experience Fabric",
        "The scientific design system and Rust runtime behind every THOX surface. One experience across ThoxOS Mini and full ThoxOS: locked navigation, one visible agent, four-tier memory, generated tokens, and a certified Experience Score."))
    print("  ~ experience-fabric.html <- sources/experience-fabric.html")

# 4b3c) Packaging showcase — "what's in the box" retail renders
packaging_kept = []
pkg_page = ROOT / "sources/packaging.html"
pkg_imgs = ROOT / "sources/packaging"
if pkg_page.exists() and pkg_imgs.exists():
    shutil.copytree(pkg_imgs, SITE / "assets/packaging", dirs_exist_ok=True)
    shutil.copy2(pkg_page, SITE / "packaging.html")
    packaging_kept.append(("packaging.html", "What's in the Box",
        "The actual retail packaging your pledge ships in: ThoxMini Air, ThoxMini (three colorways), and ThoxClip — front, back, and specs. Exactly what Kickstarter backers receive."))
    print("  ~ packaging.html         <- sources/packaging.html (+ assets/packaging/)")

# 4b4) Flagship edge-AI device demos (upcoming product line)
DEVICES = [
    ("thox-nova",      "THOX Nova",      "Your private AI mesh, in hand. The flagship handheld edge-AI node running ThoxOS."),
    ("thox-pro",       "THOX Edge Pro",       "The Pro desktop edge-AI node for always-on local inference."),
    ("thox-pro-max",   "THOX Edge Pro Max",   "The higher-capacity Pro Max node for larger local models."),
    ("thox-pro-ultra", "THOX Edge Pro Ultra", "The top-tier Pro Ultra node for the most demanding local AI workloads."),
]
devdir = ROOT / "sources/devices"
device_kept = []
if devdir.exists():
    for key, title, blurb in DEVICES:
        src = devdir / f"{key}.html"
        if src.exists():
            shutil.copy2(src, SITE / f"{key}.html")
            device_kept.append((f"{key}.html", title, blurb))
            print(f"  ~ {key+'.html':22s} <- sources/devices/{key}.html")

# 4c) Production resources (storyboard visualization + generated tracker + animatic)
shutil.copy2(ROOT / "sources/thox-kickstarter-storyboard.html", SITE / "storyboard.html")
PRODUCTION = [
    ("production-tracker.html", "Production Tracker", "Interactive shot-by-shot tracker for the film: device capture inventory, storyboard scenes, To shoot &rarr; Captured &rarr; Approved, notes, and JSON/CSV export. Saved in your browser.", "interactive"),
    ("storyboard.html",         "Video Storyboard",   "The QA-approved previz storyboard: 13 modules, 117 shots, 9:40 master. Shot-for-shot visual reference for the shoot.", "self-contained"),
]
# Campaign animatic — working-concept video, playable in the bundle
animatic_src = REPO / "assets/video/thox-campaign-animatic-v1-1080p.mp4"
if animatic_src.exists():
    (SITE / "assets/video").mkdir(parents=True, exist_ok=True)
    shutil.copy2(animatic_src, SITE / "assets/video/campaign-animatic.mp4")
    (SITE / "animatic.html").write_text("""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>THOX.ai — Campaign Animatic</title>
<style>
  html,body{margin:0;background:#09090B;color:#FAFAFA;font-family:Inter,system-ui,sans-serif;min-height:100vh;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:32px;box-sizing:border-box;}
  .k{font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#34D399;}
  h1{font-size:24px;font-weight:700;margin:0;text-align:center;}
  video{width:min(100%,1100px);border-radius:14px;border:1px solid #27272A;background:#000;box-shadow:0 12px 32px rgba(0,0,0,.7);}
  a{color:#34D399;font-family:'JetBrains Mono',monospace;font-size:12px;text-decoration:none;}
  .sub{color:#A1A1AA;font-size:13.5px;margin:0;text-align:center;}
</style></head>
<body>
  <div class="k">THOX.ai · Kickstarter Film · Working concept</div>
  <h1>Campaign Animatic v1</h1>
  <video controls playsinline preload="metadata" src="assets/video/campaign-animatic.mp4"></video>
  <p class="sub">Animatic pass of the storyboard. Not final footage.</p>
  <a href="./index.html">&larr; Back to campaign pages</a>
</body></html>""")
    PRODUCTION.append(("animatic.html", "Campaign Animatic (video)",
        "The working-concept animatic of the Kickstarter film storyboard, playable in the browser. Not final footage.", "self-contained"))
    print("  ~ animatic.html          <- assets/video/thox-campaign-animatic-v1-1080p.mp4")
kept = []
for src, out, title, blurb, kind in PAGES:
    if src.exists():
        shutil.copy2(src, SITE / out)
        kept.append((out, title, blurb, kind))
        print(f"  + {out:26s} <- {src.name}")

# 5) Branded index hub
badge = {
    "self-contained": ("#10B981", "Self-contained"),
    "interactive":    ("#34D399", "Interactive"),
    "runtime":        ("#A1A1AA", "Runtime"),
}
cards = "\n".join(f"""
      <a class="card" href="./{out}">
        <div class="card-top">
          <div class="card-title">{title}</div>
          <span class="tag" style="color:{badge[kind][0]};border-color:{badge[kind][0]}55;">{badge[kind][1]}</span>
        </div>
        <p class="card-blurb">{blurb}</p>
        <div class="card-go">Open &rarr;</div>
      </a>""" for (out, title, blurb, kind) in kept)

device_cards = "\n".join(f"""
      <a class="card" href="./{out}">
        <div class="card-top">
          <div class="card-title">{title}</div>
          <span class="tag" style="color:#34D399;border-color:#34D39955;">Live demo</span>
        </div>
        <p class="card-blurb">{blurb}</p>
        <div class="card-go">Explore device &rarr;</div>
      </a>""" for (out, title, blurb) in device_kept)

tool_cards = "\n".join(f"""
      <a class="card" href="./{out}">
        <div class="card-top">
          <div class="card-title">{title}</div>
          <span class="tag" style="color:#34D399;border-color:#34D39955;">Live app</span>
        </div>
        <p class="card-blurb">{blurb}</p>
        <div class="card-go">Launch app &rarr;</div>
      </a>""" for (out, title, blurb) in thoxmigrate_kept)

meshstack_cards = "\n".join(f"""
      <a class="card" href="./{out}">
        <div class="card-top">
          <div class="card-title">{title}</div>
          <span class="tag" style="color:#34D399;border-color:#34D39955;">Live app</span>
        </div>
        <p class="card-blurb">{blurb}</p>
        <div class="card-go">Launch app &rarr;</div>
      </a>""" for (out, title, blurb) in meshstack_kept)

platform_cards = "\n".join(f"""
      <a class="card" href="./{out}">
        <div class="card-top">
          <div class="card-title">{title}</div>
          <span class="tag" style="color:#A855F7;border-color:#A855F755;">Platform</span>
        </div>
        <p class="card-blurb">{blurb}</p>
        <div class="card-go">Explore the fabric &rarr;</div>
      </a>""" for (out, title, blurb) in platform_kept)

packaging_cards = "\n".join(f"""
      <a class="card" href="./{out}">
        <div class="card-top">
          <div class="card-title">{title}</div>
          <span class="tag" style="color:#34D399;border-color:#34D39955;">Rewards</span>
        </div>
        <p class="card-blurb">{blurb}</p>
        <div class="card-go">See what backers get &rarr;</div>
      </a>""" for (out, title, blurb) in packaging_kept)

prod_cards = "\n".join(f"""
      <a class="card" href="./{out}">
        <div class="card-top">
          <div class="card-title">{title}</div>
          <span class="tag" style="color:{badge[kind][0]};border-color:{badge[kind][0]}55;">{badge[kind][1]}</span>
        </div>
        <p class="card-blurb">{blurb}</p>
        <div class="card-go">Open &rarr;</div>
      </a>""" for (out, title, blurb, kind) in PRODUCTION)

featured_html = ""
if FEATURED["src"].exists():
    preview_img = f'<div class="feat-media"><img src="{prev_rel}" alt="ThoxOS desktop" loading="lazy" /></div>' if prev_rel else ""
    featured_html = f"""
    <a class="feature" href="./{FEATURED['out']}">
      <div class="feat-body">
        <span class="tag" style="color:#34D399;border-color:#34D39955;">Flagship demo</span>
        <div class="feat-title">{FEATURED['title']}</div>
        <p class="feat-blurb">{FEATURED['blurb']}</p>
        <div class="card-go">Launch ThoxOS &rarr;</div>
      </div>
      {preview_img}
    </a>"""

index = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>THOX.ai — Campaign Pages</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
<style>
  @font-face {{ font-family:'Xolonium'; src:url('assets/fonts/xolonium-bold.otf') format('opentype'); font-weight:700; }}
  :root {{ --ink:#09090B; --surface:#1A1A1C; --border:#27272A; --em:#10B981; --em2:#34D399; --fg:#FAFAFA; --mut:#A1A1AA; }}
  * {{ box-sizing:border-box; }}
  html,body {{ margin:0; background:var(--ink); color:var(--fg); font-family:Inter,system-ui,sans-serif; }}
  .wrap {{ max-width:1040px; margin:0 auto; padding:64px 32px 80px; }}
  .top {{ display:flex; align-items:center; justify-content:space-between; gap:16px; }}
  .brand {{ display:flex; align-items:center; gap:12px; }}
  .brand img {{ height:28px; }}
  .kicker {{ font-family:'JetBrains Mono',monospace; font-size:12px; letter-spacing:.16em; color:var(--mut); text-transform:uppercase; }}
  h1 {{ font-family:Xolonium,Inter,sans-serif; font-weight:700; font-size:48px; line-height:1.08; margin:56px 0 0; letter-spacing:-.01em; }}
  h1 .g {{ color:var(--em2); }}
  .sub {{ font-size:18px; line-height:1.6; color:var(--mut); max-width:640px; margin:20px 0 0; }}
  .grid {{ margin-top:44px; display:grid; grid-template-columns:1fr 1fr; gap:16px; }}
  @media (max-width:720px) {{ .grid {{ grid-template-columns:1fr; }} h1 {{ font-size:38px; }} }}
  .card {{ display:flex; flex-direction:column; gap:12px; background:var(--surface); border:1px solid var(--border);
           border-radius:16px; padding:24px; text-decoration:none; color:inherit; transition:border-color .2s, transform .2s; }}
  .card:hover {{ border-color:var(--em); transform:translateY(-2px); }}
  .card-top {{ display:flex; align-items:center; justify-content:space-between; gap:12px; }}
  .card-title {{ font-family:Xolonium,Inter,sans-serif; font-weight:700; font-size:20px; }}
  .tag {{ font-family:'JetBrains Mono',monospace; font-size:10.5px; letter-spacing:.1em; text-transform:uppercase;
          border:1px solid; border-radius:999px; padding:4px 10px; white-space:nowrap; }}
  .card-blurb {{ font-size:14px; line-height:1.6; color:var(--mut); margin:0; flex:1; }}
  .card-go {{ font-family:'JetBrains Mono',monospace; font-size:12.5px; color:var(--em2); }}
  .feature {{ margin-top:44px; display:grid; grid-template-columns:1fr 1.15fr; gap:0; background:linear-gradient(135deg,#0d1512,#000);
              border:1px solid #1F3430; border-radius:20px; overflow:hidden; text-decoration:none; color:inherit; transition:border-color .2s; }}
  .feature:hover {{ border-color:var(--em); }}
  .feat-body {{ padding:40px; display:flex; flex-direction:column; gap:14px; justify-content:center; }}
  .feat-title {{ font-family:Xolonium,Inter,sans-serif; font-weight:700; font-size:30px; }}
  .feat-blurb {{ font-size:15px; line-height:1.6; color:var(--mut); margin:0; }}
  .feat-media {{ position:relative; min-height:260px; border-left:1px solid #1F3430; background:#000; }}
  .feat-media img {{ position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:top center; }}
  @media (max-width:720px) {{ .feature {{ grid-template-columns:1fr; }} .feat-media {{ min-height:200px; border-left:0; border-top:1px solid #1F3430; }} }}
  .section-label {{ margin-top:40px; font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.18em;
                    text-transform:uppercase; color:#71717A; border-bottom:1px solid var(--border); padding-bottom:10px; }}
  .foot {{ margin-top:56px; display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap;
           font-family:'JetBrains Mono',monospace; font-size:11px; letter-spacing:.14em; color:#71717A; }}
</style>
</head>
<body>
  <div class="wrap">
    <div class="top">
      <div class="brand"><img src="assets/logos/thox-logo-horiz-whiteout.png" alt="THOX.ai" /></div>
      <div class="kicker">Kickstarter · July 9, 2026</div>
    </div>
    <h1>Your AI. Your Data.<br /><span class="g">Your Rules.</span></h1>
    <p class="sub">Every page of the THOX.ai Kickstarter campaign, generated from the design handoff and deployable as one static bundle. Pick a page to open it.</p>
    {featured_html}
    <div class="section-label">Kickstarter rewards — what backers get</div>
    <div class="grid">{packaging_cards}
    </div>
    <div class="section-label">Platform &amp; architecture — one experience, every surface</div>
    <div class="grid">{platform_cards}
    </div>
    <div class="section-label">Upcoming flagship devices — THOX Nova &amp; the THOX Edge Series</div>
    <div class="grid">{device_cards}
    </div>
    <div class="section-label">Tools</div>
    <div class="grid">{tool_cards}
    </div>
    <div class="section-label">MeshStack app — live demos</div>
    <div class="grid">{meshstack_cards}
    </div>
    <div class="section-label">Film production</div>
    <div class="grid">{prod_cards}
    </div>
    <div class="section-label">Campaign pages</div>
    <div class="grid">{cards}
    </div>
    <div class="foot">
      <div>THOX.AI LLC · © 2026</div>
      <div>YOUR AI. YOUR DATA. YOUR RULES.</div>
    </div>
  </div>
</body>
</html>
"""
(SITE / "index.html").write_text(index)
print(f"\nWrote {SITE}/index.html with {len(kept)} pages + {len(PRODUCTION)} production resources")

# 6) Generate the interactive production tracker into the bundle
subprocess.run([sys.executable, str(ROOT / "build_tracker.py")], check=True)

sz = sum(f.stat().st_size for f in SITE.rglob('*') if f.is_file())
print(f"Bundle size: {sz/1048576:.1f} MB")
