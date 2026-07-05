use anyhow::{anyhow, Result};
use rusqlite::{params, Connection};
use serde_json::Value;
use std::collections::BTreeMap;
use std::path::{Path, PathBuf};
use uuid::Uuid;

use crate::auth::now_ms;
use crate::protocol::{BeatRequest, NodeInfo, NodeMode, RegisterRequest, Task, TaskResult, TaskStatus, TaskSubmission};

#[derive(Debug, Clone)]
pub struct Store {
    path: PathBuf,
}

impl Store {
    pub fn new(path: impl AsRef<Path>) -> Self {
        Self { path: path.as_ref().to_path_buf() }
    }

    pub fn init(&self) -> Result<()> {
        if let Some(parent) = self.path.parent() {
            std::fs::create_dir_all(parent)?;
        }
        let conn = self.conn()?;
        conn.execute_batch(
            r#"
            PRAGMA journal_mode=WAL;
            CREATE TABLE IF NOT EXISTS nodes (
                node_id TEXT PRIMARY KEY,
                mode TEXT NOT NULL,
                address TEXT NOT NULL,
                capabilities_json TEXT NOT NULL,
                labels_json TEXT NOT NULL,
                capacity INTEGER NOT NULL,
                running INTEGER NOT NULL,
                last_seen_ms INTEGER NOT NULL,
                metrics_json TEXT
            );
            CREATE TABLE IF NOT EXISTS tasks (
                id TEXT PRIMARY KEY,
                kind TEXT NOT NULL,
                status TEXT NOT NULL,
                payload_json TEXT NOT NULL,
                result_json TEXT,
                required_capability TEXT,
                labels_json TEXT NOT NULL,
                assigned_node TEXT,
                timeout_ms INTEGER NOT NULL,
                max_output_bytes INTEGER NOT NULL,
                attempt_count INTEGER NOT NULL,
                created_at_ms INTEGER NOT NULL,
                started_at_ms INTEGER,
                completed_at_ms INTEGER,
                error TEXT
            );
            CREATE INDEX IF NOT EXISTS idx_tasks_status_created ON tasks(status, created_at_ms);
            CREATE INDEX IF NOT EXISTS idx_nodes_seen ON nodes(last_seen_ms);
            "#,
        )?;
        Ok(())
    }

    fn conn(&self) -> Result<Connection> {
        Ok(Connection::open(&self.path)?)
    }

    pub fn upsert_register(&self, req: &RegisterRequest) -> Result<()> {
        let conn = self.conn()?;
        conn.execute(
            r#"
            INSERT INTO nodes (node_id, mode, address, capabilities_json, labels_json, capacity, running, last_seen_ms, metrics_json)
            VALUES (?1, ?2, ?3, ?4, ?5, ?6, 0, ?7, NULL)
            ON CONFLICT(node_id) DO UPDATE SET
              mode=excluded.mode,
              address=excluded.address,
              capabilities_json=excluded.capabilities_json,
              labels_json=excluded.labels_json,
              capacity=excluded.capacity,
              last_seen_ms=excluded.last_seen_ms
            "#,
            params![
                req.node_id,
                serde_json::to_string(&req.mode)?,
                req.address,
                serde_json::to_string(&req.capabilities)?,
                serde_json::to_string(&req.labels)?,
                req.capacity,
                now_ms(),
            ],
        )?;
        Ok(())
    }

    pub fn upsert_beat(&self, req: &BeatRequest) -> Result<()> {
        let conn = self.conn()?;
        conn.execute(
            r#"
            INSERT INTO nodes (node_id, mode, address, capabilities_json, labels_json, capacity, running, last_seen_ms, metrics_json)
            VALUES (?1, '"worker"', ?2, ?3, ?4, ?5, ?6, ?7, ?8)
            ON CONFLICT(node_id) DO UPDATE SET
              address=excluded.address,
              capabilities_json=excluded.capabilities_json,
              labels_json=excluded.labels_json,
              capacity=excluded.capacity,
              running=excluded.running,
              last_seen_ms=excluded.last_seen_ms,
              metrics_json=excluded.metrics_json
            "#,
            params![
                req.node_id,
                req.address,
                serde_json::to_string(&req.capabilities)?,
                serde_json::to_string(&req.labels)?,
                req.capacity,
                req.running,
                now_ms(),
                serde_json::to_string(&req.metrics)?,
            ],
        )?;
        Ok(())
    }

    pub fn submit_task(&self, sub: &TaskSubmission) -> Result<Task> {
        let conn = self.conn()?;
        let task = Task {
            id: Uuid::new_v4().to_string(),
            kind: sub.kind.clone(),
            status: TaskStatus::Queued,
            payload: sub.payload.clone(),
            result: None,
            required_capability: sub.required_capability.clone(),
            labels: sub.labels.clone(),
            assigned_node: None,
            timeout_ms: sub.timeout_ms,
            max_output_bytes: sub.max_output_bytes,
            attempt_count: 0,
            created_at_ms: now_ms(),
            started_at_ms: None,
            completed_at_ms: None,
            error: None,
        };
        conn.execute(
            r#"
            INSERT INTO tasks (id, kind, status, payload_json, result_json, required_capability, labels_json,
              assigned_node, timeout_ms, max_output_bytes, attempt_count, created_at_ms, started_at_ms, completed_at_ms, error)
            VALUES (?1, ?2, ?3, ?4, NULL, ?5, ?6, NULL, ?7, ?8, 0, ?9, NULL, NULL, NULL)
            "#,
            params![
                task.id,
                task.kind,
                status_to_str(&task.status),
                serde_json::to_string(&task.payload)?,
                task.required_capability,
                serde_json::to_string(&task.labels)?,
                task.timeout_ms as i64,
                task.max_output_bytes as i64,
                task.created_at_ms,
            ],
        )?;
        Ok(task)
    }

    pub fn assign_next(&self, node_id: &str, capabilities: &[String]) -> Result<Option<Task>> {
        let conn = self.conn()?;
        let mut stmt = conn.prepare(
            r#"
            SELECT id, kind, status, payload_json, result_json, required_capability, labels_json, assigned_node,
                   timeout_ms, max_output_bytes, attempt_count, created_at_ms, started_at_ms, completed_at_ms, error
            FROM tasks
            WHERE status = 'queued'
            ORDER BY created_at_ms ASC
            LIMIT 50
            "#,
        )?;
        let mut rows = stmt.query([])?;
        let mut selected: Option<Task> = None;
        while let Some(row) = rows.next()? {
            let task = row_to_task(row)?;
            if task.required_capability.as_ref().map(|c| capabilities.contains(c)).unwrap_or(true) {
                selected = Some(task);
                break;
            }
        }
        drop(rows);
        drop(stmt);

        if let Some(mut task) = selected {
            let now = now_ms();
            conn.execute(
                r#"
                UPDATE tasks SET status='running', assigned_node=?2, started_at_ms=?3,
                  attempt_count=attempt_count+1, error=NULL WHERE id=?1 AND status='queued'
                "#,
                params![task.id, node_id, now],
            )?;
            task.status = TaskStatus::Running;
            task.assigned_node = Some(node_id.to_string());
            task.started_at_ms = Some(now);
            task.attempt_count += 1;
            Ok(Some(task))
        } else {
            Ok(None)
        }
    }

    pub fn complete_task(&self, result: &TaskResult) -> Result<()> {
        let conn = self.conn()?;
        let status = if result.ok { "succeeded" } else { "failed" };
        conn.execute(
            r#"
            UPDATE tasks SET status=?2, result_json=?3, completed_at_ms=?4, error=?5
            WHERE id=?1
            "#,
            params![
                result.task_id,
                status,
                serde_json::to_string(&result.result)?,
                now_ms(),
                result.error,
            ],
        )?;
        Ok(())
    }

    pub fn requeue_stale(&self, failure_timeout_ms: i64) -> Result<u64> {
        let conn = self.conn()?;
        let cutoff = now_ms() - failure_timeout_ms;
        let changed = conn.execute(
            r#"
            UPDATE tasks
            SET status='queued', assigned_node=NULL, started_at_ms=NULL, error='requeued after worker timeout'
            WHERE status='running' AND started_at_ms IS NOT NULL AND started_at_ms < ?1
            "#,
            params![cutoff],
        )?;
        Ok(changed as u64)
    }

    pub fn get_task(&self, task_id: &str) -> Result<Option<Task>> {
        let conn = self.conn()?;
        let mut stmt = conn.prepare(
            r#"
            SELECT id, kind, status, payload_json, result_json, required_capability, labels_json, assigned_node,
                   timeout_ms, max_output_bytes, attempt_count, created_at_ms, started_at_ms, completed_at_ms, error
            FROM tasks WHERE id=?1
            "#,
        )?;
        let mut rows = stmt.query(params![task_id])?;
        if let Some(row) = rows.next()? {
            Ok(Some(row_to_task(row)?))
        } else {
            Ok(None)
        }
    }

    pub fn list_tasks(&self, limit: u32) -> Result<Vec<Task>> {
        let conn = self.conn()?;
        let mut stmt = conn.prepare(
            r#"
            SELECT id, kind, status, payload_json, result_json, required_capability, labels_json, assigned_node,
                   timeout_ms, max_output_bytes, attempt_count, created_at_ms, started_at_ms, completed_at_ms, error
            FROM tasks ORDER BY created_at_ms DESC LIMIT ?1
            "#,
        )?;
        let rows = stmt.query_map(params![limit], row_to_task)?;
        Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
    }

    pub fn list_nodes(&self, max_age_ms: Option<i64>) -> Result<Vec<NodeInfo>> {
        let conn = self.conn()?;
        let cutoff = max_age_ms.map(|age| now_ms() - age).unwrap_or(0);
        let mut stmt = conn.prepare(
            r#"
            SELECT node_id, mode, address, capabilities_json, labels_json, capacity, running, last_seen_ms, metrics_json
            FROM nodes WHERE last_seen_ms >= ?1 ORDER BY last_seen_ms DESC
            "#,
        )?;
        let rows = stmt.query_map(params![cutoff], |row| {
            let mode_json: String = row.get(1)?;
            let caps_json: String = row.get(3)?;
            let labels_json: String = row.get(4)?;
            let metrics_json: Option<String> = row.get(8)?;
            Ok(NodeInfo {
                node_id: row.get(0)?,
                mode: serde_json::from_str::<NodeMode>(&mode_json).unwrap_or(NodeMode::Worker),
                address: row.get(2)?,
                capabilities: serde_json::from_str(&caps_json).unwrap_or_default(),
                labels: serde_json::from_str::<BTreeMap<String, String>>(&labels_json).unwrap_or_default(),
                capacity: row.get::<_, i64>(5)? as u32,
                running: row.get::<_, i64>(6)? as u32,
                last_seen_ms: row.get(7)?,
                metrics: metrics_json.and_then(|s| serde_json::from_str(&s).ok()),
            })
        })?;
        Ok(rows.collect::<rusqlite::Result<Vec<_>>>()?)
    }
}

fn row_to_task(row: &rusqlite::Row<'_>) -> rusqlite::Result<Task> {
    let status: String = row.get(2)?;
    let payload_json: String = row.get(3)?;
    let result_json: Option<String> = row.get(4)?;
    let labels_json: String = row.get(6)?;
    Ok(Task {
        id: row.get(0)?,
        kind: row.get(1)?,
        status: str_to_status(&status),
        payload: serde_json::from_str::<Value>(&payload_json).unwrap_or(Value::Null),
        result: result_json.and_then(|s| serde_json::from_str::<Value>(&s).ok()),
        required_capability: row.get(5)?,
        labels: serde_json::from_str::<BTreeMap<String, String>>(&labels_json).unwrap_or_default(),
        assigned_node: row.get(7)?,
        timeout_ms: row.get::<_, i64>(8)? as u64,
        max_output_bytes: row.get::<_, i64>(9)? as usize,
        attempt_count: row.get::<_, i64>(10)? as u32,
        created_at_ms: row.get(11)?,
        started_at_ms: row.get(12)?,
        completed_at_ms: row.get(13)?,
        error: row.get(14)?,
    })
}

fn status_to_str(status: &TaskStatus) -> &'static str {
    match status {
        TaskStatus::Queued => "queued",
        TaskStatus::Running => "running",
        TaskStatus::Succeeded => "succeeded",
        TaskStatus::Failed => "failed",
        TaskStatus::Requeued => "requeued",
    }
}

fn str_to_status(status: &str) -> TaskStatus {
    match status {
        "queued" => TaskStatus::Queued,
        "running" => TaskStatus::Running,
        "succeeded" => TaskStatus::Succeeded,
        "failed" => TaskStatus::Failed,
        "requeued" => TaskStatus::Requeued,
        _ => TaskStatus::Failed,
    }
}

pub fn parse_labels(pairs: &[String]) -> Result<BTreeMap<String, String>> {
    let mut labels = BTreeMap::new();
    for pair in pairs {
        let (k, v) = pair.split_once('=').ok_or_else(|| anyhow!("label must be key=value: {pair}"))?;
        labels.insert(k.to_string(), v.to_string());
    }
    Ok(labels)
}
