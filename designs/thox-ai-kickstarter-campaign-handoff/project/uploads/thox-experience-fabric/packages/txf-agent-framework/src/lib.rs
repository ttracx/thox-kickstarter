//! TXF agent framework: THOXY + the agent mesh.
//!
//! ## The THOXY Protocol
//!
//! Only one agent is user-visible by default: **THOXY**. Every other agent
//! (Ava, Mira, Kai, Sera, Nova, Hermes, Forge, Architect, etc.) is a background
//! worker. THOXY routes user intent into the mesh and presents synthesis back
//! to the user. The mesh is invisible unless the user enables Advanced Mode.
//!
//! Background agents are delegated to [`thox-digitalhumans`](https://github.com/ttracx/thox-digitalhumans).

use async_trait::async_trait;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// A declarative agent capability.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema, PartialEq, Eq, Hash)]
#[serde(rename_all = "snake_case")]
pub enum Capability {
    Synthesis,
    MemoryRead,
    MemoryWrite,
    DeviceControl,
    Codegen,
    Cad,
    Compliance,
    Research,
    Manufacturing,
    Security,
    Voice,
    Vision,
    Custom(String),
}

/// Routing policy for THOXY: which background agents to invoke for a task.
#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct RoutingPolicy {
    pub required: Vec<Capability>,
    pub optional: Vec<Capability>,
    /// If true, THOXY will surface intermediate background agents to the user
    /// (Advanced Mode). Default false (single-agent presentation).
    pub advanced_mode: bool,
}

impl Default for RoutingPolicy {
    fn default() -> Self {
        Self {
            required: vec![],
            optional: vec![],
            advanced_mode: false,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct AgentSpec {
    pub id: Uuid,
    pub name: String,
    pub role: String,
    pub capabilities: Vec<Capability>,
    pub visible_by_default: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct TaskRequest {
    pub id: Uuid,
    pub intent: String,
    pub policy: RoutingPolicy,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct TaskOutcome {
    pub id: Uuid,
    pub synthesis: String,
    pub contributing_agents: Vec<String>,
    pub confidence: f32,
}

#[derive(Debug, thiserror::Error)]
pub enum AgentError {
    #[error("no agent available for required capability: {0:?}")]
    NoCapability(Capability),
    #[error("backend failure: {0}")]
    Backend(String),
}

/// Pluggable agent backend.
///
/// TXF ships with a default implementation backed by `thox-digitalhumans`'s
/// HumanFabric orchestrator. Surfaces may swap this for a local-only or
/// cloud-only backend without changing the THOXY presentation contract.
#[async_trait]
pub trait AgentBackend: Send + Sync {
    async fn dispatch(&self, request: TaskRequest) -> Result<TaskOutcome, AgentError>;
    fn roster(&self) -> Vec<AgentSpec>;
}

/// THOXY presenter. Always renders a single agent identity to the user
/// regardless of how many background agents contributed.
pub struct Thoxy<B: AgentBackend> {
    backend: B,
}

impl<B: AgentBackend> Thoxy<B> {
    pub fn new(backend: B) -> Self {
        Self { backend }
    }

    pub async fn ask(&self, intent: impl Into<String>) -> Result<TaskOutcome, AgentError> {
        self.backend
            .dispatch(TaskRequest {
                id: Uuid::new_v4(),
                intent: intent.into(),
                policy: RoutingPolicy::default(),
            })
            .await
    }

    pub fn agents(&self) -> Vec<AgentSpec> {
        self.backend.roster()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    struct NoopBackend;

    #[async_trait]
    impl AgentBackend for NoopBackend {
        async fn dispatch(&self, req: TaskRequest) -> Result<TaskOutcome, AgentError> {
            Ok(TaskOutcome {
                id: req.id,
                synthesis: format!("ack: {}", req.intent),
                contributing_agents: vec!["THOXY".into()],
                confidence: 1.0,
            })
        }
        fn roster(&self) -> Vec<AgentSpec> {
            vec![]
        }
    }

    #[tokio::test(flavor = "current_thread")]
    async fn thoxy_routes_through_backend() {
        let t = Thoxy::new(NoopBackend);
        let out = t.ask("hello").await.unwrap();
        assert!(out.synthesis.contains("hello"));
    }
}

#[cfg(test)]
mod tokio_dep {
    // Keep tokio as a dev dep only.
}
