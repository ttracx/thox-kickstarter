//! TXF device fabric.
//!
//! Devices announce themselves via the fabric, expose presence and telemetry,
//! and surface the same panel everywhere they are rendered.

use chrono::{DateTime, Utc};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Copy, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "PascalCase")]
pub enum DeviceClass {
    ThoxNova,
    ThoxMini,
    ThoxAir,
    ThoxClip,
    ThoxWatch,
    ThoxVault,
    Magstack,
    Custom,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub enum Presence {
    Online,
    Idle,
    Offline,
    Pairing,
    Updating,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct Telemetry {
    pub battery_pct: Option<u8>,
    pub temperature_c: Option<f32>,
    pub storage_pct: Option<u8>,
    pub cpu_pct: Option<u8>,
    pub ram_pct: Option<u8>,
    pub network_state: Option<String>,
    pub uptime_s: Option<u64>,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct DeviceAnnouncement {
    pub id: Uuid,
    pub class: DeviceClass,
    pub name: String,
    pub capabilities: Vec<String>,
    pub announced_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct DevicePanel {
    pub id: Uuid,
    pub class: DeviceClass,
    pub name: String,
    pub presence: Presence,
    pub telemetry: Telemetry,
    pub last_sync: DateTime<Utc>,
    pub capabilities: Vec<String>,
}

#[derive(Debug, thiserror::Error)]
pub enum FabricError {
    #[error("device not found: {0}")]
    NotFound(Uuid),
    #[error("transport failure: {0}")]
    Transport(String),
}

pub trait DeviceFabric: Send + Sync {
    fn announce(&self, announcement: DeviceAnnouncement) -> Result<(), FabricError>;
    fn panel(&self, id: Uuid) -> Result<DevicePanel, FabricError>;
    fn list(&self) -> Result<Vec<DevicePanel>, FabricError>;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn panel_serializes() {
        let p = DevicePanel {
            id: Uuid::new_v4(),
            class: DeviceClass::ThoxNova,
            name: "Nova-01".into(),
            presence: Presence::Online,
            telemetry: Telemetry {
                battery_pct: Some(82),
                temperature_c: Some(41.0),
                storage_pct: Some(73),
                cpu_pct: None, ram_pct: None, network_state: None, uptime_s: None,
            },
            last_sync: Utc::now(),
            capabilities: vec!["inference".into(), "render".into()],
        };
        let s = serde_json::to_string(&p).unwrap();
        assert!(s.contains("ThoxNova"));
    }
}
