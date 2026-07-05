//! TXF universal project model.
//!
//! Everything in THOX belongs to a project. Projects scope memory, agents,
//! devices, files, and workflows so the user can context-switch cleanly.

use chrono::{DateTime, Utc};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct Project {
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
    pub members: Vec<Uuid>,
    pub devices: Vec<Uuid>,
    pub agents: Vec<Uuid>,
    pub files: Vec<Uuid>,
    pub workflows: Vec<Uuid>,
    pub tags: Vec<String>,
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
pub struct Workflow {
    pub id: Uuid,
    pub project_id: Uuid,
    pub name: String,
    pub state: WorkflowState,
    pub progress: f32,
    pub agents: Vec<Uuid>,
    pub dependencies: Vec<Uuid>,
    pub started_at: Option<DateTime<Utc>>,
    pub eta: Option<DateTime<Utc>>,
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn workflow_progress_bounded() {
        let w = Workflow {
            id: Uuid::new_v4(), project_id: Uuid::new_v4(),
            name: "deploy".into(), state: WorkflowState::Running,
            progress: 0.42, agents: vec![], dependencies: vec![],
            started_at: Some(Utc::now()), eta: None,
        };
        assert!((0.0..=1.0).contains(&w.progress));
    }
}
