#!/usr/bin/env python3
"""Resolve the Claude Design 'Kickstarter Story.dc.html' into a self-contained,
deployable standalone HTML page: inline every image slot as a data URI, inline
the Xolonium brand font, and resolve the sc-if campaign-state conditionals to
their launch defaults (early bird available, sage locked)."""
import base64, json, re, pathlib

PROJ = pathlib.Path("designs/thox-ai-kickstarter-campaign-handoff/project")
SRC = PROJ / "Kickstarter Story.dc.html"
STATE = PROJ / ".image-slots.state.json"
OUT = pathlib.Path("kickstarter/story.html")

def data_uri(path, mime):
    b = pathlib.Path(path).read_bytes()
    return f"data:{mime};base64," + base64.b64encode(b).decode()

# 1) Load design-team slot assignments (device cards + founders)
state = json.loads(STATE.read_text())
slots = {k: v["u"] for k, v in state.items() if isinstance(v, dict) and v.get("u")}

# 2) Fill the three unassigned slots with the best real assets on hand
slots["hero-family"] = data_uri("assets/social/prelaunch/prelaunch_campaign_ecosystem_16x9_v1.png", "image/png")
slots["topology"] = data_uri(PROJ / "assets/marketing/ks-mkt-thoxmini-wireless-diagram-v2.png", "image/png")
slots["thoxos-dashboard"] = data_uri(PROJ / "assets/thoxos/thox-bg-2026.png", "image/png")

html = SRC.read_text()

# 3) Replace each <x-import ... image-slot ...></x-import> with a plain <img>
def repl_slot(m):
    tag = m.group(0)
    sid = re.search(r'id="([^"]+)"', tag)
    if not sid or sid.group(1) not in slots:
        return tag
    sid = sid.group(1)
    style = re.search(r'style="([^"]*)"', tag)
    style = style.group(1) if style else ""
    radius = re.search(r'radius="(\d+)"', tag)
    shape = re.search(r'shape="([^"]+)"', tag)
    alt = re.search(r'placeholder="([^"]*)"', tag)
    alt = alt.group(1) if alt else sid
    extra = "object-fit:cover;display:block;"
    if radius and shape and shape.group(1) in ("rounded",):
        extra += f"border-radius:{radius.group(1)}px;"
    return f'<img src="{slots[sid]}" alt="{alt}" style="{style};{extra}" />'

html = re.sub(r'<x-import\b[^>]*></x-import>', repl_slot, html)

# 4) Resolve sc-if conditionals to launch defaults.
#    Keep ebAvailable + sageLocked branches; drop ebSoldOut + sageUnlocked.
def repl_scif(m):
    var = m.group(1)
    inner = m.group(2)
    return inner if var in ("ebAvailable", "sageLocked") else ""

html = re.sub(r'<sc-if value="\{\{\s*(\w+)\s*\}\}"[^>]*>(.*?)</sc-if>',
              repl_scif, html, flags=re.DOTALL)

# 5) Inline Xolonium so the display font travels with the file
xol_reg = data_uri(PROJ / "assets/fonts/xolonium-regular.otf", "font/otf")
xol_bold = data_uri(PROJ / "assets/fonts/xolonium-bold.otf", "font/otf")

# 6) Extract the helmet <style> + body content, rebuild a clean document
style_block = re.search(r'<helmet>.*?<style>(.*?)</style>.*?</helmet>', html, re.DOTALL).group(1)
style_block = re.sub(r"url\('assets/fonts/xolonium-regular\.otf'\)", f"url('{xol_reg}')", style_block)
style_block = re.sub(r"url\('assets/fonts/xolonium-bold\.otf'\)", f"url('{xol_bold}')", style_block)

body = re.search(r'</helmet>(.*?)</x-dc>', html, re.DOTALL).group(1)

doc = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>THOX.ai — Kickstarter Story</title>
  <meta name="description" content="THOX.ai — a family of four privacy-first local AI devices. Your AI. Your Data. Your Rules. Kickstarter launches July 9, 2026." />
  <meta property="og:title" content="THOX.ai — Your AI. Your Data. Your Rules." />
  <meta property="og:description" content="Four local-first AI devices that keep your work on hardware you own. Kickstarter July 9, 2026." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
  <style>{style_block}</style>
</head>
<body>{body}</body>
</html>
"""

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(doc)
print(f"Wrote {OUT} ({len(doc)/1024:.0f} KB)")
print("Slots inlined:", ", ".join(sorted(slots)))
# sanity: no design-runtime leftovers
for bad in ("x-import", "x-dc", "sc-if", "support.js", "image-slot.js"):
    assert bad not in doc, f"LEFTOVER: {bad}"
print("Clean: no Claude Design runtime tags remain.")
