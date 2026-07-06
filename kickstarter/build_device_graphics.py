#!/usr/bin/env python3
"""Regenerate the four device feature graphics from the canonical short copy in
copy.md, so the on-image text is guaranteed to match. Each graphic composites
the exact copy (title, subheadline, short description, 5 callouts, footer line,
honest positioning) with the real matte-black product render, on the TXF tokens.

Writes self-contained 16:9 HTML to a scratch dir; a companion Playwright script
screenshots each to assets/social/prelaunch/prelaunch_product_<device>_16x9_v2.png.
"""
import base64, pathlib, json

REPO = pathlib.Path(__file__).resolve().parent.parent
DESIGN = REPO / "designs/thox-ai-kickstarter-campaign-handoff/project/assets"
OUTDIR = pathlib.Path("/tmp/claude-0/-home-user-thox-kickstarter/e9e722ec-7063-5708-b6a1-db20e11232b3/scratchpad/devgfx")
OUTDIR.mkdir(parents=True, exist_ok=True)

def uri(path, mime):
    return f"data:{mime};base64," + base64.b64encode(pathlib.Path(path).read_bytes()).decode()

XOL = uri(DESIGN / "fonts/xolonium-bold.otf", "font/otf")
LOGO = uri(DESIGN / "logos/thox-logo-horiz-whiteout.png", "image/png")

# Canonical short copy — verbatim from kickstarter/copy.md
DEVICES = [
    {
        "key": "thoxkey", "name_w": "Thox", "name_g": "Key",
        "sub": "Your portable THOX workspace key.",
        "desc": "Carry your THOX workspace, files, launchers, model assets, recovery tools, and offline resources across supported computers.",
        "callouts": ["Portable THOX workspace", "USB plug-in workflow", "Local-first file access", "Stores setup tools + docs", "Companion to ThoxOS devices"],
        "footer": "Carry your workspace anywhere.",
        "honest": "Portable workspace + storage device. Not a standalone AI computer.",
        "img": REPO / "assets/device/thoxkey-matte-black.png",
        "fit": "contain",
    },
    {
        "key": "thoxmini", "name_w": "Thox", "name_g": "Mini",
        "sub": "A compact local AI compute companion.",
        "desc": "A pocket-sized USB-C device for local THOX services, lightweight agents, companion tools, and offline-first workflows.",
        "callouts": ["Compact USB-C companion", "Local-first architecture", "Lightweight agent support", "Connected local workflows", "Built for ThoxOS Mini"],
        "footer": "Compact connected compute for local AI.",
        "honest": "Compact local compute companion. Final performance depends on production hardware and software release.",
        "img": REPO / "assets/device/thoxmini-matte-black.png",
        "fit": "contain",
    },
    {
        "key": "thoxminiair", "name_w": "Thox", "name_g": "Mini Air",
        "sub": "Wireless THOX workflows in a battery-powered form.",
        "desc": "A portable wireless THOX companion for lightweight local services, device pairing, mobile access, and on-the-go workflows.",
        "callouts": ["Wireless-first companion", "Battery-powered portability", "Device pairing + mobile access", "Local-first workflow support", "Works with THOX companion apps"],
        "footer": "Portable wireless access to THOX workflows.",
        "honest": "Wireless companion for lightweight local workflows. Not a laptop or workstation replacement.",
        "img": REPO / "assets/device/thoxmini-air-matte-black-4view.png",
        "fit": "contain",
    },
    {
        "key": "thoxclip", "name_w": "Thox", "name_g": "Clip",
        "sub": "The magnetic THOX companion for your phone.",
        "desc": "A slim magnetic companion designed to attach to compatible phones and bring THOX workflows closer to the device you already carry.",
        "callouts": ["Magnetic phone-back companion", "Slim vertical profile", "USB-C access", "MagStack design DNA", "Built for THOX mobile workflows"],
        "footer": "Keep THOX with your phone.",
        "honest": "Magnetic-compatible accessory. Not certified under third-party magnetic attachment or charging standards unless certification is completed.",
        "img": REPO / "assets/device/thoxclip-matte-black-back.png",
        "fit": "contain",
    },
]

ICON = ('<svg viewBox="0 0 24 24" fill="none" stroke="#34D399" stroke-width="1.6" '
        'stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>')

def card(d):
    img = uri(d["img"], "image/png")
    callouts = "\n".join(
        f'<div class="co"><div class="ico">{ICON}</div><div class="cot">{c}</div></div>'
        for c in d["callouts"])
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8"/>
<style>
  @font-face {{ font-family:'Xolonium'; src:url('{XOL}') format('opentype'); font-weight:700; }}
  *{{margin:0;padding:0;box-sizing:border-box;}}
  html,body{{width:1600px;height:900px;overflow:hidden;font-family:Inter,system-ui,-apple-system,sans-serif;
    background:radial-gradient(1200px 700px at 78% 42%, #0d1f18 0%, #09090B 62%);color:#FAFAFA;}}
  .card{{position:relative;width:1600px;height:900px;padding:64px 72px;display:grid;grid-template-columns:1.02fr 0.98fr;gap:40px;}}
  .glow{{position:absolute;right:-160px;top:120px;width:720px;height:640px;border-radius:50%;
    background:radial-gradient(circle,rgba(16,185,129,0.16) 0%,rgba(0,0,0,0) 68%);pointer-events:none;}}
  .head{{position:absolute;top:44px;left:72px;right:72px;display:flex;align-items:center;justify-content:space-between;}}
  .head img{{height:34px;}}
  .tag{{font-size:15px;color:#A1A1AA;}} .tag b{{color:#34D399;font-weight:600;}}
  .left{{align-self:center;display:flex;flex-direction:column;gap:0;}}
  h1{{font-family:'Xolonium',Inter,sans-serif;font-weight:700;font-size:86px;line-height:0.98;letter-spacing:-0.01em;margin-top:8px;}}
  h1 .g{{color:#34D399;}}
  .sub{{font-size:26px;font-weight:600;line-height:1.25;margin-top:20px;max-width:640px;}}
  .desc{{font-size:16.5px;line-height:1.55;color:#A1A1AA;margin-top:16px;max-width:600px;}}
  .cos{{margin-top:26px;display:flex;flex-direction:column;gap:0;max-width:600px;}}
  .co{{display:flex;align-items:center;gap:16px;padding:13px 0;border-bottom:1px solid #1c2b26;}}
  .co:last-child{{border-bottom:0;}}
  .ico{{flex:none;width:40px;height:40px;border:1px solid rgba(52,211,153,0.4);border-radius:10px;
    display:flex;align-items:center;justify-content:center;background:rgba(16,185,129,0.06);}}
  .ico svg{{width:20px;height:20px;}}
  .cot{{font-size:18px;font-weight:500;color:#FAFAFA;}}
  .right{{position:relative;display:flex;align-items:center;justify-content:center;}}
  .right img{{max-width:100%;max-height:560px;object-fit:{d['fit']};filter:drop-shadow(0 30px 60px rgba(0,0,0,0.6));}}
  .footbar{{position:absolute;left:72px;right:72px;bottom:56px;display:flex;align-items:center;gap:16px;
    border:1px solid rgba(52,211,153,0.28);border-radius:16px;padding:18px 26px;background:rgba(16,185,129,0.05);}}
  .footbar .fi{{width:34px;height:34px;flex:none;border:1px solid rgba(52,211,153,0.5);border-radius:9px;
    display:flex;align-items:center;justify-content:center;}}
  .footbar .fi svg{{width:18px;height:18px;}}
  .footline{{font-family:'Xolonium',Inter,sans-serif;font-weight:700;font-size:24px;}}
  .footline .g{{color:#34D399;}}
  .honest{{position:absolute;left:72px;bottom:26px;font-size:12px;color:#52525B;max-width:1000px;}}
</style></head>
<body><div class="card">
  <div class="glow"></div>
  <div class="head"><img src="{LOGO}" alt="THOX.ai"/><div class="tag">Your <b>AI</b>. Your <b>Data</b>. Your <b>Rules</b>.</div></div>
  <div class="left">
    <h1>{d['name_w']}<span class="g">{d['name_g']}</span></h1>
    <div class="sub">{d['sub']}</div>
    <div class="desc">{d['desc']}</div>
    <div class="cos">{callouts}</div>
  </div>
  <div class="right"><img src="{img}" alt="{d['name_w']}{d['name_g']}"/></div>
  <div class="footbar"><div class="fi">{ICON}</div><div class="footline">{d['footer']}</div></div>
  <div class="honest">{d['honest']}</div>
</div></body></html>"""

manifest = []
for d in DEVICES:
    html = card(d)
    hpath = OUTDIR / f"{d['key']}.html"
    hpath.write_text(html)
    manifest.append({"key": d["key"], "html": str(hpath),
                     "out": f"prelaunch_product_{d['key']}_16x9_v2.png",
                     "honest": d["honest"], "footer": d["footer"], "sub": d["sub"]})

(OUTDIR / "manifest.json").write_text(json.dumps(manifest, indent=2))
print(f"Wrote {len(manifest)} device-graphic HTML files to {OUTDIR}")
print("Next: screenshot each with the companion node script.")
