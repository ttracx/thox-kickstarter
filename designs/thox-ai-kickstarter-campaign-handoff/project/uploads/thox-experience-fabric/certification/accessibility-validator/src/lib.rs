//! Accessibility validator.
//!
//! v0.1: gates on `accessibilityCertified: true` in the manifest. The contrast
//! checks this comment used to defer are now performed in CI by the UX engine
//! at `tools/ux-engine`: its WCAG 2.1 AA contrast gate evaluates every
//! token theme (interactive and document surfaces) on every PR. This crate
//! remains the in-bundle scorer; the engine is the authoritative enforcer.

pub fn score(manifest: &str) -> u8 {
    let Ok(j) = serde_json::from_str::<serde_json::Value>(manifest) else {
        return 0;
    };
    let certified = j.get("accessibilityCertified").and_then(serde_json::Value::as_bool) == Some(true);
    if certified {
        100
    } else {
        0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn certified_scores_100() {
        let m = r#"{"accessibilityCertified":true}"#;
        assert_eq!(score(m), 100);
    }
}
