//! UX validators.
//!
//! Each function returns a 0-100 score for the relevant dimension. v0.1 is a
//! coarse manifest-only check. Future versions will introspect the actual UI
//! via Storybook + Figma comparison.

fn truthy(j: &serde_json::Value, key: &str) -> bool {
    j.get(key).and_then(serde_json::Value::as_bool).unwrap_or(false)
}

fn parse(manifest: &str) -> serde_json::Value {
    serde_json::from_str(manifest).unwrap_or(serde_json::Value::Null)
}

pub fn score_navigation(manifest: &str) -> u8 {
    let j = parse(manifest);
    if truthy(&j, "navigationStandard") {
        100
    } else {
        0
    }
}

pub fn score_agents(manifest: &str) -> u8 {
    let j = parse(manifest);
    if truthy(&j, "agentFabricEnabled") {
        100
    } else {
        50
    }
}

pub fn score_devices(manifest: &str) -> u8 {
    let j = parse(manifest);
    if truthy(&j, "deviceFabricEnabled") {
        100
    } else {
        50
    }
}

pub fn score_memory(manifest: &str) -> u8 {
    let j = parse(manifest);
    if truthy(&j, "memoryEnabled") {
        100
    } else {
        0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn manifest_all_true_scores_high() {
        let m = r#"{"navigationStandard":true,"agentFabricEnabled":true,"deviceFabricEnabled":true,"memoryEnabled":true}"#;
        assert_eq!(score_navigation(m), 100);
        assert_eq!(score_agents(m), 100);
        assert_eq!(score_devices(m), 100);
        assert_eq!(score_memory(m), 100);
    }
}
