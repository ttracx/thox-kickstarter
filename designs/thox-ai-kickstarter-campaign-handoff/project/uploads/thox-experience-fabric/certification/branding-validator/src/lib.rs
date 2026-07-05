//! Branding validator.
//!
//! v0.1: confirms `designSystem == "THOX"` and `txfVersion >= 2.0`. The token
//! bundle diff this comment used to defer is now performed in CI by the UX
//! engine at `tools/ux-engine`: its forbidden-pattern and `dist` drift gates
//! diff the consumed `design-systems/thox-ai-txf/TOKENS.json` against the
//! engine source of truth, and its build regenerates the bundle. This crate
//! remains the in-bundle scorer; the engine is the authoritative enforcer.

pub fn score(manifest: &str) -> u8 {
    let Ok(j) = serde_json::from_str::<serde_json::Value>(manifest) else {
        return 0;
    };
    let ds_ok = j.get("designSystem").and_then(serde_json::Value::as_str) == Some("THOX");
    let v_ok = matches!(
        j.get("txfVersion").and_then(serde_json::Value::as_str),
        Some("2.0" | "2.1" | "3.0")
    );
    match (ds_ok, v_ok) {
        (true, true) => 100,
        (true, false) | (false, true) => 50,
        (false, false) => 0,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn good_manifest_scores_100() {
        let m = r#"{"designSystem":"THOX","txfVersion":"2.0"}"#;
        assert_eq!(score(m), 100);
    }

    #[test]
    fn missing_brand_fails() {
        assert_eq!(score("{}"), 0);
    }
}
