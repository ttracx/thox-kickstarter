//! TXF component contracts.
//!
//! These types are the *semantic* contracts every TXF surface implements.
//! React, SwiftUI, Compose, and HTML wrappers consume these definitions to
//! guarantee shape parity. The render is platform-specific; the contract is
//! universal.

use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

/// `ThoxButton` variants.
#[derive(Debug, Clone, Copy, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub enum ButtonVariant {
    Primary,
    Secondary,
    Danger,
    Ghost,
    /// Used only for agent-initiated actions in the chat UI.
    Agent,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub enum StatusPillState {
    Online,
    Offline,
    Busy,
    Thinking,
    Warning,
    Error,
    Updating,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct ThoxButton {
    pub label: String,
    pub variant: ButtonVariant,
    pub icon: Option<String>,
    pub disabled: bool,
    pub loading: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct ThoxStatusPill {
    pub state: StatusPillState,
    pub label: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct ThoxAgentCard {
    pub agent_id: String,
    pub name: String,
    pub role: String,
    pub current_task: Option<String>,
    pub confidence: Option<f32>,
    pub memory_scope: String,
    pub status: StatusPillState,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct ThoxDevicePanel {
    pub device_id: String,
    pub name: String,
    pub status: StatusPillState,
    pub battery_pct: Option<u8>,
    pub temperature_c: Option<f32>,
    pub storage_pct: Option<u8>,
    pub network_state: Option<String>,
    pub last_sync_iso: Option<String>,
    pub capabilities: Vec<String>,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub enum Severity {
    Info,
    Success,
    Warning,
    Danger,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct ThoxNotification {
    pub id: String,
    pub title: String,
    pub description: String,
    pub severity: Severity,
    pub source: String,
    pub actions: Vec<ThoxButton>,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct ThoxWorkflowCard {
    pub id: String,
    pub name: String,
    pub state: String,
    pub progress: f32,
    pub dependencies: Vec<String>,
    pub agents: Vec<String>,
    pub eta_iso: Option<String>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn button_serializes() {
        let b = ThoxButton {
            label: "Deploy".into(),
            variant: ButtonVariant::Primary,
            icon: Some("rocket".into()),
            disabled: false,
            loading: false,
        };
        let s = serde_json::to_string(&b).unwrap();
        assert!(s.contains("primary"));
    }
}
