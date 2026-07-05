//! TXF notifications.
//!
//! Same shape, same severity ladder, same call-to-action contract, every
//! surface. Surfaces choose the rendering (toast / sheet / haptic / chime),
//! never the schema.

use chrono::{DateTime, Utc};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Copy, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub enum Severity {
    Info,
    Success,
    Warning,
    Danger,
    Critical,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct Action {
    pub id: String,
    pub label: String,
    pub primary: bool,
    pub destructive: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct Notification {
    pub id: Uuid,
    pub title: String,
    pub description: String,
    pub severity: Severity,
    pub source: String,
    pub project_id: Option<Uuid>,
    pub timestamp: DateTime<Utc>,
    pub actions: Vec<Action>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn notification_round_trips() {
        let n = Notification {
            id: Uuid::new_v4(),
            title: "ThoxNova Battery Low".into(),
            description: "15% Remaining".into(),
            severity: Severity::Warning,
            source: "THOXY".into(),
            project_id: None,
            timestamp: Utc::now(),
            actions: vec![
                Action { id: "dismiss".into(), label: "Dismiss".into(), primary: false, destructive: false },
                Action { id: "open".into(), label: "Open Device".into(), primary: true, destructive: false },
            ],
        };
        let s = serde_json::to_string(&n).unwrap();
        let back: Notification = serde_json::from_str(&s).unwrap();
        assert_eq!(back.actions.len(), 2);
    }
}
