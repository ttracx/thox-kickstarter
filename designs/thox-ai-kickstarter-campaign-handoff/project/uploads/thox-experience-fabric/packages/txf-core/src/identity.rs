//! Universal User Model and the entities it owns.
//!
//! Every THOX product exposes the same `ThoxUser` shape. This crate is the
//! single source of truth; SDKs serialize this verbatim across surfaces.

use chrono::{DateTime, Utc};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// The root identity object every TXF surface binds to.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct ThoxUser {
    pub id: Uuid,
    pub profile: UserProfile,
    pub preferences: Preferences,
    pub memory_profile: MemoryProfile,
    pub projects: Vec<Project>,
    pub devices: Vec<Device>,
    pub agents: Vec<AgentBinding>,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct UserProfile {
    pub display_name: String,
    pub handle: String,
    pub avatar_url: Option<String>,
    pub locale: String,
    pub timezone: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, Default)]
#[serde(rename_all = "camelCase")]
pub struct Preferences {
    pub theme: ThemePreference,
    pub voice_enabled: bool,
    pub reduced_motion: bool,
    pub high_contrast: bool,
    pub haptics_enabled: bool,
    pub advanced_mode: bool,
}

/// `Dark` is the canonical THOX surface. `Light` is provided for accessibility.
#[derive(Debug, Clone, Copy, Serialize, Deserialize, JsonSchema, Default)]
#[serde(rename_all = "camelCase")]
pub enum ThemePreference {
    #[default]
    Dark,
    Light,
    System,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, Default)]
#[serde(rename_all = "camelCase")]
pub struct MemoryProfile {
    pub hot_window_ms: u64,
    pub warm_retention_days: u32,
    pub cold_retention_days: u32,
    pub vault_encrypted: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub created_at: DateTime<Utc>,
    pub members: Vec<Uuid>,
    pub devices: Vec<Uuid>,
    pub agents: Vec<Uuid>,
    pub files: Vec<FileRef>,
    pub workflows: Vec<WorkflowRef>,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct FileRef {
    pub id: Uuid,
    pub name: String,
    pub mime: String,
    pub size_bytes: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct WorkflowRef {
    pub id: Uuid,
    pub name: String,
    pub state: WorkflowState,
    pub progress: f32,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub enum WorkflowState {
    Idle,
    Running,
    Waiting,
    Failed,
    Completed,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct Device {
    pub id: Uuid,
    pub name: String,
    pub model: DeviceModel,
    pub status: DeviceStatus,
    pub capabilities: Vec<String>,
    pub battery_pct: Option<u8>,
    pub temperature_c: Option<f32>,
    pub storage_pct: Option<u8>,
    pub last_sync: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "PascalCase")]
pub enum DeviceModel {
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
pub enum DeviceStatus {
    Online,
    Offline,
    Busy,
    Thinking,
    Updating,
    Warning,
    Error,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct AgentBinding {
    pub id: Uuid,
    pub name: String,
    pub role: String,
    pub visible_by_default: bool,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn user_round_trips_through_json() {
        let u = ThoxUser {
            id: Uuid::new_v4(),
            profile: UserProfile {
                display_name: "Tommy".into(),
                handle: "ttracx".into(),
                avatar_url: None,
                locale: "en-US".into(),
                timezone: "America/Chicago".into(),
                created_at: Utc::now(),
            },
            preferences: Preferences::default(),
            memory_profile: MemoryProfile::default(),
            projects: vec![],
            devices: vec![],
            agents: vec![],
        };
        let s = serde_json::to_string(&u).expect("serialize");
        let back: ThoxUser = serde_json::from_str(&s).expect("deserialize");
        assert_eq!(back.profile.handle, "ttracx");
    }

    #[test]
    fn dark_theme_is_default() {
        let p = Preferences::default();
        assert!(matches!(p.theme, ThemePreference::Dark));
    }
}
