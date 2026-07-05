//! TXF compliance gates.
//!
//! Each `ComplianceMode` activates a guardrail pre-traffic. Surfaces that fail
//! a gate must refuse to start (and the release-gate validator must refuse to
//! mark the build shippable).

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, Serialize, Deserialize, JsonSchema, PartialEq, Eq)]
#[serde(rename_all = "UPPERCASE")]
pub enum ComplianceMode {
    None,
    Hipaa,
    Gdpr,
    Soc2,
    Pci,
    Iso27001,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct GuardrailReport {
    pub mode: ComplianceMode,
    pub passed: bool,
    pub findings: Vec<String>,
}

/// Run the static guardrail checks for a given mode. This is a pre-flight
/// sanity pass; full runtime enforcement lives in [`thox-digitalhumans`]
/// `Sera` compliance sentinel.
pub fn preflight(mode: ComplianceMode, manifest_json: &str) -> GuardrailReport {
    let mut findings = Vec::new();
    match mode {
        ComplianceMode::None => {}
        ComplianceMode::Hipaa => {
            if !manifest_json.contains("\"accessibilityCertified\":true") {
                findings.push("HIPAA requires accessibility certification".into());
            }
        }
        ComplianceMode::Gdpr => {
            if !manifest_json.contains("\"memoryEnabled\":true") {
                findings.push("GDPR requires memory subsystem for right-to-erasure".into());
            }
        }
        ComplianceMode::Soc2 | ComplianceMode::Iso27001 | ComplianceMode::Pci => {
            if !manifest_json.contains("\"identityEnabled\":true") {
                findings.push(format!("{mode:?} requires identity subsystem"));
            }
        }
    }
    GuardrailReport {
        mode,
        passed: findings.is_empty(),
        findings,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn none_always_passes() {
        let r = preflight(ComplianceMode::None, "{}");
        assert!(r.passed);
    }

    #[test]
    fn hipaa_requires_a11y() {
        let r = preflight(ComplianceMode::Hipaa, r#"{"accessibilityCertified":false}"#);
        assert!(!r.passed);
    }
}
