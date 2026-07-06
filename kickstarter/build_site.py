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
import pathlib, shutil, re

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
    "blurb": "The full ThoxOS desktop, live: lock screen, menu bar, command palette (⌘K), a dock of real apps, and streaming on-device inference at 42 tok/s. Any password unlocks it.",
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
    (PROJ / "ThoxOS Mini Demo.dc.html",                "thoxos-mini-demo.html",  "ThoxOS Mini Demo",   "Interactive ThoxOS Mini shell: boot, insert, agents, files, skills, terminal.", "interactive"),
    (PROJ / "Campaign Animatic.dc.html",               "campaign-animatic.html", "Campaign Animatic",  "Animated teaser sequence built from the device close-up footage.", "interactive"),
    (PROJ / "THOX Video Storyboard (standalone).html", "video-storyboard.html",  "Video Storyboard",   "Shot-by-shot production storyboard for the Kickstarter film.", "self-contained"),
]
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
print(f"\nWrote {SITE}/index.html with {len(kept)} pages")
sz = sum(f.stat().st_size for f in SITE.rglob('*') if f.is_file())
print(f"Bundle size: {sz/1048576:.1f} MB")
