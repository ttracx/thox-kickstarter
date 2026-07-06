# Previz Drop QA v1: Kickstarter Film Storyboard HTML and PPTX

Doc: ks-video-previz-qa-v1 | 2026-07-03 | Operator: Claude, approver Tommy Xaypanya
Scope: verify the incoming previz drop against storyboards v2 (117 shots), THOX-KS-INSTR-001 Rev B, and Regenerated Handoff v2.1, then fix drift in place.

## Inputs

| File | Result |
|---|---|
| thox-kickstarter-storyboard.html (270,785 B) | Structure matches v2: 13 modules, v2 titles, $10,000 goal, master 9:40. Four text fixes applied. |
| thox-kickstarter-storyboard.pptx (17 slides, 46 media images) | Structure matches v2. One text fix, three raster fixes applied. |

## Scans run

- Term scan: retired names, fabric, wireless-first, WireGuard symbol, Coordinator-as-label, certification and absolute-security claims, patent claims, legacy goal figures, TOPS. GDPR hits were base64 image data, not copy.
- Color scan: no purple (#A855F7, #C084FC) and no cyan in the HTML palette. Emerald system confirmed.
- Font scan: PPTX runs use Calibri, the documented DOCX and deck fallback; Xolonium is referenced by name only, no font binaries embedded, per the redistribution rule. HTML loads brand fonts by family name.
- Raster scan: OCR pass over all 46 embedded media images for drifted labels.

## Fixes applied

| # | File | Location | Before | After |
|---|---|---|---|---|
| 1 | HTML | V10 mesh panel label | FABRIC / N NODES | MESH / N NODES |
| 2 | HTML | V10 status label | FABRIC ONLINE | MESH ONLINE |
| 3 | HTML | Footer note | software fabric | software mesh layer |
| 4 | HTML | End CTA | BACK THOX.AI ON KICKSTARTER | BACK US ON KICKSTARTER |
| 5 | PPTX | Slide 17 CTA text run | BACK THOX.AI ON KICKSTARTER | BACK US ON KICKSTARTER |
| 6 | PPTX | image-12-5.png raster label | FABRIC | MESH |
| 7 | PPTX | image-12-6.png raster label | FABRIC ONLINE | MESH ONLINE |
| 8 | PPTX | image-17-1.png raster label | FABRIC ONLINE | MESH ONLINE |

Raster method: OCR-located word boxes, background and glyph colors sampled from the frame, replacement set in a matched-height mono face. OCR verification after rewrite: FABRIC absent, MESH present in all three images. Deck reloads clean and converts to 17-page PDF.

## Accepted as-is

- HTML CSS class names containing the string fabric: non-rendering selectors in an internal document; no visible text.
- Two patched labels use a substitute mono face at matched size and color; within tolerance for directional line-art previz. Optional: re-export those two frames from the corrected HTML for pixel-perfect boards.
- Claims wording in V10 frames verified correct by OCR: sentence case, no WireGuard symbol, coordinator only inside the approved phrase.

## Evidence

| Field | Value |
|---|---|
| artifact_path | /outputs/thox-kickstarter-storyboard.html, /outputs/thox-kickstarter-storyboard.pptx |
| sha256 (16) | 5b8c937e56e5bacb (html), cd887c09e0f3f661 (pptx) |
| build_command | patch scripts, OCR raster rewrite |
| test_command | term, color, font, OCR scans; pptx reload; soffice PDF smoke, 17 pages |
| timestamp | 2026-07-04 01:3x UTC |
| result | PASS with 8 fixes |
