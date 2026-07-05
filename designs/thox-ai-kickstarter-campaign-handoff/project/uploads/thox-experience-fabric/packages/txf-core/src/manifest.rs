//! The TXF Manifest schema.
//!
//! Every TXF-certified application must ship a `txf.json` at the root of its
//! bundle. The certification CLI reads this manifest before running validators.

use schemars::{schema_for, JsonSchema};
use serde::{Deserialize, Serialize};

pub const MANIFEST_VERSION: &str = "2.0";

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct TxfManifest {
    pub txf_version: String,
    pub design_system: String,
    pub identity_enabled: bool,
    pub memory_enabled: bool,
    pub projects_enabled: bool,
    pub navigation_standard: bool,
    pub device_fabric_enabled: bool,
    pub agent_fabric_enabled: bool,
    pub voice_enabled: bool,
    pub accessibility_certified: bool,
    /// Minimum THOX Experience Score required to release this app.
    /// Defaults to 90 (Ship gate).
    #[serde(default = "default_score_floor")]
    pub experience_score_floor: u8,
}

fn default_score_floor() -> u8 {
    90
}

impl Default for TxfManifest {
    fn default() -> Self {
        Self {
            txf_version: MANIFEST_VERSION.into(),
            design_system: "THOX".into(),
            identity_enabled: true,
            memory_enabled: true,
            projects_enabled: true,
            navigation_standard: true,
            device_fabric_enabled: true,
            agent_fabric_enabled: true,
            voice_enabled: true,
            accessibility_certified: true,
            experience_score_floor: default_score_floor(),
        }
    }
}

/// Returns the JSON Schema for [`TxfManifest`], for use by validators and
/// downstream tooling. Pinned to draft-07 via `schemars`.
pub fn txf_manifest_schema() -> serde_json::Value {
    serde_json::to_value(schema_for!(TxfManifest)).unwrap_or_default()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default_manifest_passes_floor() {
        let m = TxfManifest::default();
        assert_eq!(m.txf_version, "2.0");
        assert!(m.identity_enabled);
        assert_eq!(m.experience_score_floor, 90);
    }

    #[test]
    fn schema_compiles() {
        let s = txf_manifest_schema();
        assert!(s.is_object());
    }
}
