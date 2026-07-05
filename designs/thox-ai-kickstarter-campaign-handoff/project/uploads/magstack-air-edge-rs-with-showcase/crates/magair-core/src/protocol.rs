use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::BTreeMap;

pub const CAP_INTENT: &str = "ai.intent.v1";
pub const CAP_SENSOR_ANOMALY: &str = "ai.sensor_anomaly.v1";
pub const CAP_EMBED_HASH: &str = "ai.embed_hash.v1";
pub const CAP_PLUGIN_PROCESS: &str = "plugin.process.v1";

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum NodeMode {
    Leader,
    Worker,
    Standalone,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum TaskStatus {
    Queued,
    Running,
    Succeeded,
    Failed,
    Requeued,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Metrics {
    pub hostname: String,
    pub uptime_seconds: u64,
    pub load_1m: f32,
    pub mem_total_kb: u64,
    pub mem_available_kb: u64,
    pub disk_available_kb: u64,
    pub cpu_temp_c: Option<f32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NodeInfo {
    pub node_id: String,
    pub mode: NodeMode,
    pub address: String,
    pub capabilities: Vec<String>,
    pub labels: BTreeMap<String, String>,
    pub capacity: u32,
    pub running: u32,
    pub last_seen_ms: i64,
    pub metrics: Option<Metrics>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RegisterRequest {
    pub node_id: String,
    pub mode: NodeMode,
    pub address: String,
    pub capabilities: Vec<String>,
    pub labels: BTreeMap<String, String>,
    pub capacity: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BeatRequest {
    pub node_id: String,
    pub address: String,
    pub capabilities: Vec<String>,
    pub labels: BTreeMap<String, String>,
    pub capacity: u32,
    pub running: u32,
    pub metrics: Metrics,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BeatResponse {
    pub accepted: bool,
    pub leader_time_ms: i64,
    pub assignment: Option<Task>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TaskSubmission {
    pub kind: String,
    pub payload: Value,
    pub required_capability: Option<String>,
    pub labels: BTreeMap<String, String>,
    pub timeout_ms: u64,
    pub max_output_bytes: usize,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InferRequest {
    pub kind: String,
    pub text: Option<String>,
    pub payload: Option<Value>,
    pub sync: bool,
    pub wait_ms: Option<u64>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InferResponse {
    pub task_id: String,
    pub status: TaskStatus,
    pub result: Option<Value>,
    pub preview: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Task {
    pub id: String,
    pub kind: String,
    pub status: TaskStatus,
    pub payload: Value,
    pub result: Option<Value>,
    pub required_capability: Option<String>,
    pub labels: BTreeMap<String, String>,
    pub assigned_node: Option<String>,
    pub timeout_ms: u64,
    pub max_output_bytes: usize,
    pub attempt_count: u32,
    pub created_at_ms: i64,
    pub started_at_ms: Option<i64>,
    pub completed_at_ms: Option<i64>,
    pub error: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TaskResult {
    pub task_id: String,
    pub node_id: String,
    pub ok: bool,
    pub result: Value,
    pub error: Option<String>,
    pub duration_ms: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HealthResponse {
    pub ok: bool,
    pub service: String,
    pub node_id: String,
    pub mode: NodeMode,
    pub version: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StatusResponse {
    pub node_id: String,
    pub mode: NodeMode,
    pub bind: String,
    pub leader_url: Option<String>,
    pub capabilities: Vec<String>,
    pub labels: BTreeMap<String, String>,
    pub metrics: Metrics,
}

impl TaskSubmission {
    pub fn infer(kind: impl Into<String>, payload: Value) -> Self {
        let kind = kind.into();
        Self {
            required_capability: Some(kind.clone()),
            kind,
            payload,
            labels: BTreeMap::new(),
            timeout_ms: 120_000,
            max_output_bytes: 1024 * 1024,
        }
    }
}
