//! TXF universal memory contract.
//!
//! ## Tier model
//!
//! | TXF tier | Span                | Backed by (thox-digitalhumans)       |
//! |----------|---------------------|--------------------------------------|
//! | HOT      | Current conversation| Sensory + Working                    |
//! | WARM     | Current project     | Episodic                             |
//! | COLD     | Historical knowledge| Semantic                             |
//! | VAULT    | Archived / sealed   | Identity + Procedural + Mesh, sealed |
//!
//! Every device exposes the same `MemoryEntry` shape. Storage and recall
//! policies are platform-specific; the contract is universal.

use chrono::{DateTime, Utc};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "lowercase")]
pub enum Tier {
    Hot,
    Warm,
    Cold,
    Vault,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct MemoryEntry {
    pub id: Uuid,
    pub tier: Tier,
    pub kind: String,
    pub source: String,
    pub project_id: Option<Uuid>,
    pub timestamp: DateTime<Utc>,
    pub importance: f32,
    pub tags: Vec<String>,
    pub content: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct RecallQuery {
    pub query: String,
    pub project_id: Option<Uuid>,
    pub tiers: Vec<Tier>,
    pub max_results: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize, JsonSchema)]
#[serde(rename_all = "camelCase")]
pub struct RecallHit {
    pub entry: MemoryEntry,
    pub score: f32,
}

#[derive(Debug, thiserror::Error)]
pub enum MemoryError {
    #[error("backend failure: {0}")]
    Backend(String),
    #[error("entry not found: {0}")]
    NotFound(Uuid),
}

/// Pluggable backend.
pub trait MemoryBackend: Send + Sync {
    fn write(&self, entry: MemoryEntry) -> Result<(), MemoryError>;
    fn recall(&self, query: &RecallQuery) -> Result<Vec<RecallHit>, MemoryError>;
    fn promote(&self, id: Uuid, to: Tier) -> Result<(), MemoryError>;
    fn seal_to_vault(&self, id: Uuid) -> Result<(), MemoryError>;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn entry_serializes() {
        let e = MemoryEntry {
            id: Uuid::new_v4(),
            tier: Tier::Hot,
            kind: "chat".into(),
            source: "thox-terminal".into(),
            project_id: None,
            timestamp: Utc::now(),
            importance: 0.5,
            tags: vec!["nova".into()],
            content: "test".into(),
        };
        let s = serde_json::to_string(&e).unwrap();
        assert!(s.contains("\"tier\":\"hot\""));
    }
}
