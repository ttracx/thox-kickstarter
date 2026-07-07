#!/usr/bin/env python3
"""Model Review gate — validate THOX.ai model profiles against the standard.

Enforces docs/MODEL_PROFILE_STANDARD.md against models/catalog.json and
cross-checks the canonical registry with the download-center catalog
(kickstarter/sources/models.html).

Usage:
    python3 scripts/review_thox_models.py            # validate, exit 1 on error
    python3 scripts/review_thox_models.py --check-live  # also print live-diff hints

Exit code 0 = all profiles pass the gate. Errors fail; warnings don't.
Stdlib only — no network required (the live diff is done by the Discovery
agent; this script validates the committed state).
"""
import json
import re
import sys
import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CATALOG = ROOT / "models" / "catalog.json"
SITE_CATALOG = ROOT / "kickstarter" / "sources" / "models.html"

FAMILIES = {"core", "webby", "nellie", "pro", "cluster"}
VISIBILITY = {"public", "gated", "private"}
STATUS = {"live", "coming-soon", "roadmap"}
CAPS = {"tools", "think", "vision", "code", "browser"}
DEVICES = {"ThoxKey", "ThoxMini Air", "ThoxMini", "ThoxNova"}
HF_ORG = "Thox-ai"
OLLAMA_NS = "Thox-ai"
BAD_NAMESPACES = ("thox-ai/", "THOX-ai/", "ttracx/")
REQUIRED = ["id", "name", "family", "params", "base", "license",
            "visibility", "status", "capabilities", "devices", "sources", "blurb"]

errors, warnings = [], []


def err(model, msg):
    errors.append(f"[FAIL] {model}: {msg}")


def warn(model, msg):
    warnings.append(f"[warn] {model}: {msg}")


def validate_profile(m):
    name = m.get("name", m.get("id", "<unknown>"))

    # §1 required fields
    for f in REQUIRED:
        if f not in m or m[f] in (None, "", []):
            if f in ("capabilities",):  # may be empty list
                if f not in m:
                    err(name, f"missing required field '{f}'")
            else:
                err(name, f"missing/empty required field '{f}'")

    # enums
    if m.get("family") not in FAMILIES:
        err(name, f"family '{m.get('family')}' not in {sorted(FAMILIES)}")
    if m.get("visibility") not in VISIBILITY:
        err(name, f"visibility '{m.get('visibility')}' not in {sorted(VISIBILITY)}")
    if m.get("status") not in STATUS:
        err(name, f"status '{m.get('status')}' not in {sorted(STATUS)}")

    # id format
    if m.get("id") and not re.fullmatch(r"[a-z0-9][a-z0-9.\-:]*", m["id"]):
        err(name, f"id '{m['id']}' is not lowercase kebab/tag form")

    # capabilities + devices vocab
    for c in m.get("capabilities", []):
        if c not in CAPS:
            err(name, f"capability '{c}' not in {sorted(CAPS)}")
    for d in m.get("devices", []):
        if d not in DEVICES:
            err(name, f"device '{d}' not in {sorted(DEVICES)}")

    # §2 sources / namespaces
    src = m.get("sources", {}) or {}
    hf, oll = src.get("huggingface"), src.get("ollama")
    if not hf and not oll:
        err(name, "at least one of sources.huggingface / sources.ollama must be set")
    if hf and not hf.startswith(HF_ORG + "/"):
        err(name, f"HF repo '{hf}' must be under '{HF_ORG}/'")
    if oll and not oll.startswith(OLLAMA_NS + "/"):
        err(name, f"Ollama tag '{oll}' must be under '{OLLAMA_NS}/'")
    if m.get("status") == "live" and not (hf or oll):
        err(name, "status 'live' requires a reachable source")

    # §3 blurb
    blurb = m.get("blurb", "")
    if len(blurb) > 240:
        err(name, f"blurb is {len(blurb)} chars (>240)")
    if m.get("visibility") == "private" and (hf or oll):
        warn(name, "private model links a source — ensure it is not presented as openly pullable")

    return name


def cross_check_site(models):
    """Flag legacy namespaces in the download center and public models missing from it."""
    if not SITE_CATALOG.exists():
        warn("site", f"{SITE_CATALOG} not found — skipping cross-check")
        return
    html = SITE_CATALOG.read_text(encoding="utf-8")
    for bad in BAD_NAMESPACES:
        for mobj in re.finditer(re.escape(bad), html):
            # allow the canonical Thox-ai/ which contains 'thox-ai' case-insensitively? No —
            # BAD are exact-case tokens; Thox-ai/ won't match thox-ai/ or THOX-ai/.
            pass
        n = html.count(bad)
        if n:
            warn("site", f"download center uses non-canonical namespace '{bad}' ({n}x) — "
                          f"standardize on 'Thox-ai/' per Standard §2")
    # public+live models should be discoverable by name in the catalog
    for m in models:
        if m.get("visibility") == "public" and m.get("status") == "live":
            if m["name"] not in html:
                warn("site", f"public/live model '{m['name']}' not found in download center HTML")


def main():
    check_live = "--check-live" in sys.argv
    if not CATALOG.exists():
        print(f"[FAIL] canonical registry not found: {CATALOG}")
        sys.exit(1)
    data = json.loads(CATALOG.read_text(encoding="utf-8"))
    models = data.get("models", [])

    ids = [m.get("id") for m in models]
    dupes = {i for i in ids if ids.count(i) > 1}
    if dupes:
        err("registry", f"duplicate ids: {sorted(dupes)}")

    for m in models:
        validate_profile(m)
    cross_check_site(models)

    print(f"THOX Model Review — {len(models)} profiles in {CATALOG.relative_to(ROOT)}")
    live = sum(1 for m in models if m.get("status") == "live")
    print(f"  live: {live}  |  gated/coming-soon: "
          f"{sum(1 for m in models if m.get('status') == 'coming-soon')}  |  "
          f"families: {sorted({m.get('family') for m in models})}")

    if check_live:
        print("\nLive-diff hints (compare against):")
        print(f"  HF:     {data['sources']['huggingface_org']}")
        print(f"  Ollama: {data['sources']['ollama_namespace']}")
        print("  Run the Discovery agent (agent_tasks/model-review-team.md) for the authoritative diff.")

    for w in warnings:
        print(w)
    for e in errors:
        print(e)

    if errors:
        print(f"\nGATE: FAIL ({len(errors)} error(s), {len(warnings)} warning(s))")
        sys.exit(1)
    print(f"\nGATE: PASS ({len(warnings)} warning(s))")
    sys.exit(0)


if __name__ == "__main__":
    main()
