//! THOX design tokens, compiled once and emitted into every target.
//!
//! The token set is the source of truth for color, typography, spacing,
//! radius, motion, elevation, and Z-stack across every TXF surface. Surfaces
//! must consume the emitted artifact, not redefine values inline.

use serde::{Deserialize, Serialize};

/// Top-level token bundle.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Tokens {
    pub version: String,
    pub colors: Colors,
    pub typography: Typography,
    pub spacing: Spacing,
    pub radius: Radius,
    pub motion: Motion,
    pub elevation: Elevation,
    pub layout: Layout,
}

/// Emerald-first dark-surface palette. THOX brand uses one signature accent
/// (emerald), one signature reserved accent (purple = MagStack only), and four
/// semantic colors.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Colors {
    pub black: String,
    pub surface: String,
    pub card: String,
    pub border: String,
    pub emerald: String,
    pub emerald_bright: String,
    /// Reserved: MagStack / MeshStack / fabric visualizations only.
    pub magstack_purple: String,
    pub success: String,
    pub warning: String,
    pub danger: String,
    pub info: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Typography {
    pub primary_family: String,
    pub mono_family: String,
    pub weights: [u16; 5],
    pub scale_rem: [f32; 8],
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Spacing {
    /// 8px baseline, doubled steps. Step 0 = 0px.
    pub scale_px: [u16; 12],
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Radius {
    pub scale_px: [u16; 6],
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Motion {
    pub duration_ms: [u16; 5],
    pub easing_default: String,
    pub easing_emphasized: String,
    pub reduced_motion_default_ms: u16,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Elevation {
    pub shadow_sm: String,
    pub shadow_md: String,
    pub shadow_lg: String,
    pub glass_blur_px: u16,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Layout {
    pub desktop_columns: u8,
    pub tablet_columns: u8,
    pub mobile_columns: u8,
    pub desktop_gutter_px: u16,
    pub tablet_gutter_px: u16,
    pub mobile_gutter_px: u16,
    pub baseline_px: u8,
    pub min_touch_target_px: u8,
}

/// The canonical THOX token set (spec v2.0).
pub fn thox_tokens() -> Tokens {
    Tokens {
        version: "2.0".into(),
        colors: Colors {
            black: "#09090B".into(),
            surface: "#111113".into(),
            card: "#1A1A1C".into(),
            border: "#27272A".into(),
            emerald: "#10B981".into(),
            emerald_bright: "#34D399".into(),
            magstack_purple: "#A855F7".into(),
            success: "#10B981".into(),
            warning: "#F59E0B".into(),
            danger: "#EF4444".into(),
            info: "#3B82F6".into(),
        },
        typography: Typography {
            primary_family: "Inter, system-ui, -apple-system, sans-serif".into(),
            mono_family: "JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, monospace".into(),
            weights: [400, 500, 600, 700, 800],
            // 12, 14, 16, 18, 20, 24, 32, 48 (in rem at 16px base)
            scale_rem: [0.75, 0.875, 1.0, 1.125, 1.25, 1.5, 2.0, 3.0],
        },
        spacing: Spacing {
            scale_px: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96],
        },
        radius: Radius {
            scale_px: [0, 4, 8, 12, 16, 24],
        },
        motion: Motion {
            duration_ms: [100, 200, 300, 500, 800],
            easing_default: "cubic-bezier(0.4, 0.0, 0.2, 1)".into(),
            easing_emphasized: "cubic-bezier(0.2, 0.0, 0.0, 1)".into(),
            reduced_motion_default_ms: 0,
        },
        elevation: Elevation {
            shadow_sm: "0 1px 2px rgba(0,0,0,0.6)".into(),
            shadow_md: "0 4px 12px rgba(0,0,0,0.65)".into(),
            shadow_lg: "0 12px 32px rgba(0,0,0,0.72)".into(),
            glass_blur_px: 20,
        },
        layout: Layout {
            desktop_columns: 12,
            tablet_columns: 8,
            mobile_columns: 4,
            desktop_gutter_px: 24,
            tablet_gutter_px: 20,
            mobile_gutter_px: 16,
            baseline_px: 8,
            min_touch_target_px: 44,
        },
    }
}

/// Available emit targets.
#[derive(Debug, Clone, Copy)]
pub enum Target {
    Css,
    Json,
    Swift,
    Kotlin,
    Tailwind,
    Figma,
}

impl Target {
    pub fn parse(s: &str) -> Option<Self> {
        match s.to_ascii_lowercase().as_str() {
            "css" => Some(Self::Css),
            "json" => Some(Self::Json),
            "swift" => Some(Self::Swift),
            "kotlin" | "kt" => Some(Self::Kotlin),
            "tailwind" | "tw" => Some(Self::Tailwind),
            "figma" => Some(Self::Figma),
            _ => None,
        }
    }
}

/// Emit the token set in the requested target format.
pub fn emit(tokens: &Tokens, target: Target) -> anyhow::Result<String> {
    Ok(match target {
        Target::Json => serde_json::to_string_pretty(tokens)?,
        Target::Css => emit_css(tokens),
        Target::Swift => emit_swift(tokens),
        Target::Kotlin => emit_kotlin(tokens),
        Target::Tailwind => emit_tailwind(tokens),
        Target::Figma => serde_json::to_string_pretty(&figma_payload(tokens))?,
    })
}

fn emit_css(t: &Tokens) -> String {
    let c = &t.colors;
    let l = &t.layout;
    let m = &t.motion;
    format!(
        ":root {{\n  /* THOX Experience Fabric v{ver} tokens */\n  --thox-black: {b};\n  --thox-surface: {s};\n  --thox-card: {card};\n  --thox-border: {bo};\n  --thox-emerald: {em};\n  --thox-emerald-bright: {emb};\n  --thox-magstack-purple: {mp};\n  --thox-success: {ok};\n  --thox-warning: {warn};\n  --thox-danger: {dgr};\n  --thox-info: {info};\n  --thox-font-primary: {fp};\n  --thox-font-mono: {fm};\n  --thox-baseline: {bl}px;\n  --thox-min-touch: {mt}px;\n  --thox-motion-fast: {d0}ms;\n  --thox-motion-default: {d1}ms;\n  --thox-motion-slow: {d2}ms;\n  --thox-easing-default: {ed};\n  --thox-easing-emphasized: {ee};\n}}\n",
        ver = t.version,
        b = c.black, s = c.surface, card = c.card, bo = c.border,
        em = c.emerald, emb = c.emerald_bright, mp = c.magstack_purple,
        ok = c.success, warn = c.warning, dgr = c.danger, info = c.info,
        fp = t.typography.primary_family, fm = t.typography.mono_family,
        bl = l.baseline_px, mt = l.min_touch_target_px,
        d0 = m.duration_ms[0], d1 = m.duration_ms[2], d2 = m.duration_ms[3],
        ed = m.easing_default, ee = m.easing_emphasized,
    )
}

fn emit_swift(t: &Tokens) -> String {
    let c = &t.colors;
    format!(
        "// THOX Experience Fabric v{ver} - autogenerated. Do not edit.\nimport SwiftUI\n\npublic enum ThoxTokens {{\n    public static let black = Color(hex: \"{b}\")\n    public static let surface = Color(hex: \"{s}\")\n    public static let card = Color(hex: \"{card}\")\n    public static let border = Color(hex: \"{bo}\")\n    public static let emerald = Color(hex: \"{em}\")\n    public static let emeraldBright = Color(hex: \"{emb}\")\n    public static let magstackPurple = Color(hex: \"{mp}\")\n    public static let success = Color(hex: \"{ok}\")\n    public static let warning = Color(hex: \"{warn}\")\n    public static let danger = Color(hex: \"{dgr}\")\n    public static let info = Color(hex: \"{info}\")\n    public static let baseline: CGFloat = {bl}\n    public static let minTouchTarget: CGFloat = {mt}\n}}\n",
        ver = t.version,
        b = c.black, s = c.surface, card = c.card, bo = c.border,
        em = c.emerald, emb = c.emerald_bright, mp = c.magstack_purple,
        ok = c.success, warn = c.warning, dgr = c.danger, info = c.info,
        bl = t.layout.baseline_px, mt = t.layout.min_touch_target_px,
    )
}

fn emit_kotlin(t: &Tokens) -> String {
    let c = &t.colors;
    let strip = |s: &str| s.trim_start_matches('#').to_string();
    format!(
        "// THOX Experience Fabric v{ver} - autogenerated. Do not edit.\npackage ai.thox.txf.tokens\n\nimport androidx.compose.ui.graphics.Color\nimport androidx.compose.ui.unit.dp\n\nobject ThoxTokens {{\n    val black = Color(0xFF{b})\n    val surface = Color(0xFF{s})\n    val card = Color(0xFF{card})\n    val border = Color(0xFF{bo})\n    val emerald = Color(0xFF{em})\n    val emeraldBright = Color(0xFF{emb})\n    val magstackPurple = Color(0xFF{mp})\n    val success = Color(0xFF{ok})\n    val warning = Color(0xFF{warn})\n    val danger = Color(0xFF{dgr})\n    val info = Color(0xFF{info})\n    val baseline = {bl}.dp\n    val minTouchTarget = {mt}.dp\n}}\n",
        ver = t.version,
        b = strip(&c.black), s = strip(&c.surface), card = strip(&c.card), bo = strip(&c.border),
        em = strip(&c.emerald), emb = strip(&c.emerald_bright), mp = strip(&c.magstack_purple),
        ok = strip(&c.success), warn = strip(&c.warning), dgr = strip(&c.danger), info = strip(&c.info),
        bl = t.layout.baseline_px, mt = t.layout.min_touch_target_px,
    )
}

fn emit_tailwind(t: &Tokens) -> String {
    let c = &t.colors;
    format!(
        "// THOX Experience Fabric v{ver} Tailwind preset.\n/** @type {{import('tailwindcss').Config}} */\nmodule.exports = {{\n  darkMode: 'class',\n  theme: {{\n    extend: {{\n      colors: {{\n        thox: {{\n          black: '{b}',\n          surface: '{s}',\n          card: '{card}',\n          border: '{bo}',\n          emerald: '{em}',\n          'emerald-bright': '{emb}',\n          magstack: '{mp}',\n          success: '{ok}',\n          warning: '{warn}',\n          danger: '{dgr}',\n          info: '{info}',\n        }},\n      }},\n      fontFamily: {{\n        sans: ['Inter', 'system-ui', 'sans-serif'],\n        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],\n      }},\n    }},\n  }},\n}};\n",
        ver = t.version,
        b = c.black, s = c.surface, card = c.card, bo = c.border,
        em = c.emerald, emb = c.emerald_bright, mp = c.magstack_purple,
        ok = c.success, warn = c.warning, dgr = c.danger, info = c.info,
    )
}

fn figma_payload(t: &Tokens) -> serde_json::Value {
    serde_json::json!({
        "version": t.version,
        "modes": ["Dark"],
        "collections": {
            "color": {
                "thox-black": { "$value": &t.colors.black, "$type": "color" },
                "thox-surface": { "$value": &t.colors.surface, "$type": "color" },
                "thox-card": { "$value": &t.colors.card, "$type": "color" },
                "thox-border": { "$value": &t.colors.border, "$type": "color" },
                "thox-emerald": { "$value": &t.colors.emerald, "$type": "color" },
                "thox-emerald-bright": { "$value": &t.colors.emerald_bright, "$type": "color" },
                "magstack-purple": { "$value": &t.colors.magstack_purple, "$type": "color" },
                "success": { "$value": &t.colors.success, "$type": "color" },
                "warning": { "$value": &t.colors.warning, "$type": "color" },
                "danger": { "$value": &t.colors.danger, "$type": "color" },
                "info": { "$value": &t.colors.info, "$type": "color" },
            }
        }
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn token_set_is_well_formed() {
        let t = thox_tokens();
        assert_eq!(&t.colors.emerald, "#10B981");
        assert_eq!(t.layout.min_touch_target_px, 44);
        assert_eq!(t.spacing.scale_px[0], 0);
    }

    #[test]
    fn emits_all_targets() {
        let t = thox_tokens();
        for tgt in [Target::Css, Target::Json, Target::Swift, Target::Kotlin, Target::Tailwind, Target::Figma] {
            let s = emit(&t, tgt).expect("emit");
            assert!(!s.is_empty());
        }
    }

    #[test]
    fn target_parse_accepts_aliases() {
        assert!(matches!(Target::parse("kt"), Some(Target::Kotlin)));
        assert!(matches!(Target::parse("tw"), Some(Target::Tailwind)));
        assert!(Target::parse("nonsense").is_none());
    }
}
