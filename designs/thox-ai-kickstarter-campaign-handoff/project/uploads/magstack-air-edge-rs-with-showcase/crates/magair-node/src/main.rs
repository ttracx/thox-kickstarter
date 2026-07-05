use anyhow::{anyhow, Result};
use clap::{Parser, ValueEnum};
use magair_core::ai::EdgeAiEngine;
use magair_core::auth::{bearer_matches, now_ms, sign_body, verify_body};
use magair_core::metrics::collect_metrics;
use magair_core::protocol::*;
use magair_core::store::{parse_labels, Store};
use reqwest::blocking::Client;
use serde::Serialize;
use serde_json::{json, Value};
use std::collections::BTreeMap;
use std::io::Read;
use std::path::PathBuf;
use std::sync::Arc;
use std::thread;
use std::time::{Duration, Instant};
use tiny_http::{Header, Method, Request, Response, Server, StatusCode};
use uuid::Uuid;

#[derive(Debug, Clone, ValueEnum)]
enum CliMode {
    Leader,
    Worker,
    Standalone,
}

#[derive(Debug, Parser)]
#[command(name = "magair-node", about = "MagStack Air Rust node runtime")]
struct Args {
    #[arg(long, value_enum, default_value = "standalone", env = "MAGSTACK_AIR_MODE")]
    mode: CliMode,

    #[arg(long, default_value = "0.0.0.0:8787", env = "MAGSTACK_AIR_BIND")]
    bind: String,

    #[arg(long, env = "MAGSTACK_AIR_PUBLIC_URL")]
    public_url: Option<String>,

    #[arg(long, env = "MAGSTACK_AIR_LEADER_URL")]
    leader_url: Option<String>,

    #[arg(long, default_value = "/var/lib/magstack-air/magstack-air.sqlite", env = "MAGSTACK_AIR_DB")]
    db: PathBuf,

    #[arg(long, default_value = "/opt/magstack-air/models", env = "MAGSTACK_AIR_MODELS_DIR")]
    models_dir: PathBuf,

    #[arg(long, env = "MAGSTACK_AIR_TOKEN")]
    token: String,

    #[arg(long, env = "MAGSTACK_AIR_INTERNAL_SECRET")]
    internal_secret: Option<String>,

    #[arg(long, default_value = "1", env = "MAGSTACK_AIR_CAPACITY")]
    capacity: u32,

    #[arg(long, default_value = "5000", env = "MAGSTACK_AIR_BEAT_MS")]
    beat_ms: u64,

    #[arg(long, default_value = "180000", env = "MAGSTACK_AIR_FAILURE_TIMEOUT_MS")]
    failure_timeout_ms: i64,

    #[arg(long = "label")]
    labels: Vec<String>,

    #[arg(long = "capability")]
    extra_capabilities: Vec<String>,
}

#[derive(Clone)]
struct AppState {
    node_id: String,
    mode: NodeMode,
    bind: String,
    public_url: String,
    leader_url: Option<String>,
    token: String,
    internal_secret: Option<String>,
    store: Store,
    ai: Arc<EdgeAiEngine>,
    labels: BTreeMap<String, String>,
    capabilities: Vec<String>,
    capacity: u32,
    beat_ms: u64,
    failure_timeout_ms: i64,
    client: Client,
}

fn main() -> Result<()> {
    let args = Args::parse();
    let mode = match args.mode {
        CliMode::Leader => NodeMode::Leader,
        CliMode::Worker => NodeMode::Worker,
        CliMode::Standalone => NodeMode::Standalone,
    };
    let labels = parse_labels(&args.labels)?;
    let ai = Arc::new(EdgeAiEngine::load(&args.models_dir)?);
    let mut capabilities = ai.capabilities();
    for cap in args.extra_capabilities {
        if !capabilities.contains(&cap) {
            capabilities.push(cap);
        }
    }
    let public_url = args.public_url.unwrap_or_else(|| format!("http://{}", args.bind.replace("0.0.0.0", "127.0.0.1")));
    let store = Store::new(&args.db);
    if matches!(mode, NodeMode::Leader | NodeMode::Standalone) {
        store.init()?;
    }

    let state = Arc::new(AppState {
        node_id: load_or_create_node_id()?,
        mode: mode.clone(),
        bind: args.bind.clone(),
        public_url,
        leader_url: args.leader_url.clone(),
        token: args.token,
        internal_secret: args.internal_secret,
        store,
        ai,
        labels,
        capabilities,
        capacity: args.capacity,
        beat_ms: args.beat_ms,
        failure_timeout_ms: args.failure_timeout_ms,
        client: Client::builder().timeout(Duration::from_secs(20)).build()?,
    });

    if matches!(state.mode, NodeMode::Leader | NodeMode::Standalone) {
        let reaper_state = state.clone();
        thread::spawn(move || requeue_loop(reaper_state));
    }
    if matches!(state.mode, NodeMode::Worker | NodeMode::Standalone) {
        let worker_state = state.clone();
        thread::spawn(move || worker_loop(worker_state));
    }

    serve(state)
}

fn load_or_create_node_id() -> Result<String> {
    let path = std::env::var("MAGSTACK_AIR_NODE_ID_FILE").unwrap_or_else(|_| "/var/lib/magstack-air/node_id".to_string());
    let p = PathBuf::from(path);
    if let Ok(existing) = std::fs::read_to_string(&p) {
        let trimmed = existing.trim();
        if !trimmed.is_empty() {
            return Ok(trimmed.to_string());
        }
    }
    if let Some(parent) = p.parent() {
        std::fs::create_dir_all(parent).ok();
    }
    let generated = Uuid::new_v4().to_string();
    std::fs::write(&p, &generated).ok();
    Ok(generated)
}

fn requeue_loop(state: Arc<AppState>) {
    loop {
        if let Err(err) = state.store.requeue_stale(state.failure_timeout_ms) {
            eprintln!("requeue error: {err:#}");
        }
        thread::sleep(Duration::from_millis(10_000));
    }
}

fn worker_loop(state: Arc<AppState>) {
    let Some(leader_url) = leader_url_for_worker(&state) else {
        eprintln!("worker mode requires --leader-url or standalone mode");
        return;
    };
    loop {
        if let Err(err) = register_worker(&state, &leader_url) {
            eprintln!("register error: {err:#}");
        } else {
            break;
        }
        thread::sleep(Duration::from_millis(state.beat_ms));
    }
    loop {
        match beat_worker(&state, &leader_url) {
            Ok(Some(task)) => {
                let result = execute_task(&state, task);
                if let Err(err) = post_result(&state, &leader_url, &result) {
                    eprintln!("result post error: {err:#}");
                }
            }
            Ok(None) => {}
            Err(err) => eprintln!("beat error: {err:#}"),
        }
        thread::sleep(Duration::from_millis(state.beat_ms));
    }
}

fn leader_url_for_worker(state: &AppState) -> Option<String> {
    if matches!(state.mode, NodeMode::Standalone) {
        Some(state.public_url.clone())
    } else {
        state.leader_url.clone()
    }
}

fn register_worker(state: &AppState, leader_url: &str) -> Result<()> {
    let req = RegisterRequest {
        node_id: state.node_id.clone(),
        mode: NodeMode::Worker,
        address: state.public_url.clone(),
        capabilities: state.capabilities.clone(),
        labels: state.labels.clone(),
        capacity: state.capacity,
    };
    post_internal::<_, Value>(state, leader_url, "/internal/register", &req).map(|_| ())
}

fn beat_worker(state: &AppState, leader_url: &str) -> Result<Option<Task>> {
    let req = BeatRequest {
        node_id: state.node_id.clone(),
        address: state.public_url.clone(),
        capabilities: state.capabilities.clone(),
        labels: state.labels.clone(),
        capacity: state.capacity,
        running: 0,
        metrics: collect_metrics(),
    };
    let resp: BeatResponse = post_internal(state, leader_url, "/internal/beat", &req)?;
    Ok(resp.assignment)
}

fn execute_task(state: &AppState, task: Task) -> TaskResult {
    let started = Instant::now();
    let run = state.ai.run(&task.kind, &task.payload, task.max_output_bytes);
    match run {
        Ok(result) => TaskResult {
            task_id: task.id,
            node_id: state.node_id.clone(),
            ok: true,
            result,
            error: None,
            duration_ms: started.elapsed().as_millis() as u64,
        },
        Err(err) => TaskResult {
            task_id: task.id,
            node_id: state.node_id.clone(),
            ok: false,
            result: json!({"preview":"task failed"}),
            error: Some(format!("{err:#}")),
            duration_ms: started.elapsed().as_millis() as u64,
        },
    }
}

fn post_result(state: &AppState, leader_url: &str, result: &TaskResult) -> Result<()> {
    post_internal::<_, Value>(state, leader_url, "/internal/result", result).map(|_| ())
}

fn post_internal<T, R>(state: &AppState, leader_url: &str, path: &str, body: &T) -> Result<R>
where
    T: Serialize,
    R: for<'de> serde::Deserialize<'de>,
{
    let body_bytes = serde_json::to_vec(body)?;
    let url = format!("{}{}", leader_url.trim_end_matches('/'), path);
    let mut req = state.client.post(url).bearer_auth(&state.token).body(body_bytes.clone()).header("content-type", "application/json");
    if let Some(secret) = &state.internal_secret {
        let ts = now_ms();
        let sig = sign_body(secret, ts, &body_bytes)?;
        req = req.header("x-magstack-timestamp", ts.to_string()).header("x-magstack-signature", sig);
    }
    let resp = req.send()?;
    if !resp.status().is_success() {
        return Err(anyhow!("internal post failed: {}", resp.status()));
    }
    Ok(resp.json::<R>()?)
}

fn serve(state: Arc<AppState>) -> Result<()> {
    let server = Server::http(&state.bind).map_err(|e| anyhow!("bind failed: {e}"))?;
    println!("magair-node {:?} listening on {} node_id={}", state.mode, state.bind, state.node_id);
    for request in server.incoming_requests() {
        let state = state.clone();
        thread::spawn(move || {
            if let Err(err) = handle_request(request, state) {
                eprintln!("request error: {err:#}");
            }
        });
    }
    Ok(())
}

fn handle_request(mut req: Request, state: Arc<AppState>) -> Result<()> {
    let path = req.url().to_string();
    let method = req.method().clone();
    let mut body = Vec::new();
    req.as_reader().read_to_end(&mut body)?;

    let response = route(&method, &path, &body, &req, state);
    match response {
        Ok(resp) => req.respond(resp)?,
        Err(err) => {
            let resp = json_response(StatusCode(500), &json!({"ok": false, "error": format!("{err:#}")}))?;
            req.respond(resp)?;
        }
    }
    Ok(())
}

fn route(method: &Method, path: &str, body: &[u8], req: &Request, state: Arc<AppState>) -> Result<Response<std::io::Cursor<Vec<u8>>>> {
    if method == &Method::Get && path == "/" {
        return Ok(html_response(include_str!("../../../dashboard/static/index.html"))?);
    }
    if method == &Method::Get && path == "/health" {
        let health = HealthResponse {
            ok: true,
            service: "magstack-air-edge-rs".to_string(),
            node_id: state.node_id.clone(),
            mode: state.mode.clone(),
            version: env!("CARGO_PKG_VERSION").to_string(),
        };
        return json_response(StatusCode(200), &health);
    }

    if path.starts_with("/api/") {
        require_bearer(req, &state.token)?;
        return route_api(method, path, body, state);
    }

    if path.starts_with("/internal/") {
        require_bearer(req, &state.token)?;
        if let Some(secret) = &state.internal_secret {
            let ts = header(req, "x-magstack-timestamp").ok_or_else(|| anyhow!("missing hmac timestamp"))?;
            let sig = header(req, "x-magstack-signature").ok_or_else(|| anyhow!("missing hmac signature"))?;
            verify_body(secret, ts.parse::<i64>()?, body, &sig, 120_000)?;
        }
        return route_internal(method, path, body, state);
    }

    json_response(StatusCode(404), &json!({"ok": false, "error": "not found"}))
}

fn route_api(method: &Method, path: &str, body: &[u8], state: Arc<AppState>) -> Result<Response<std::io::Cursor<Vec<u8>>>> {
    match (method, path) {
        (&Method::Get, "/api/status") => {
            let resp = StatusResponse {
                node_id: state.node_id.clone(),
                mode: state.mode.clone(),
                bind: state.bind.clone(),
                leader_url: state.leader_url.clone(),
                capabilities: state.capabilities.clone(),
                labels: state.labels.clone(),
                metrics: collect_metrics(),
            };
            json_response(StatusCode(200), &resp)
        }
        (&Method::Get, "/api/nodes") => {
            ensure_leader(&state)?;
            let nodes = state.store.list_nodes(Some(10 * 60 * 1000))?;
            json_response(StatusCode(200), &json!({"nodes": nodes}))
        }
        (&Method::Get, "/api/tasks") => {
            ensure_leader(&state)?;
            let tasks = state.store.list_tasks(100)?;
            json_response(StatusCode(200), &json!({"tasks": tasks}))
        }
        (&Method::Post, "/api/tasks") => {
            ensure_leader(&state)?;
            let sub: TaskSubmission = serde_json::from_slice(body)?;
            let task = state.store.submit_task(&sub)?;
            json_response(StatusCode(202), &task)
        }
        (&Method::Post, "/api/infer") => {
            ensure_leader(&state)?;
            let infer: InferRequest = serde_json::from_slice(body)?;
            let payload = match infer.payload {
                Some(v) => v,
                None => json!({"text": infer.text.unwrap_or_default()}),
            };
            let task = state.store.submit_task(&TaskSubmission::infer(infer.kind, payload))?;
            if infer.sync {
                let wait_ms = infer.wait_ms.unwrap_or(30_000);
                let deadline = Instant::now() + Duration::from_millis(wait_ms);
                loop {
                    if let Some(updated) = state.store.get_task(&task.id)? {
                        if matches!(updated.status, TaskStatus::Succeeded | TaskStatus::Failed) {
                            let preview = updated.result.as_ref().and_then(|v| v.get("preview")).and_then(Value::as_str).map(ToString::to_string);
                            let resp = InferResponse { task_id: updated.id, status: updated.status, result: updated.result, preview };
                            return json_response(StatusCode(200), &resp);
                        }
                    }
                    if Instant::now() >= deadline {
                        let resp = InferResponse { task_id: task.id, status: TaskStatus::Queued, result: None, preview: Some("queued".to_string()) };
                        return json_response(StatusCode(202), &resp);
                    }
                    thread::sleep(Duration::from_millis(200));
                }
            }
            let resp = InferResponse { task_id: task.id, status: TaskStatus::Queued, result: None, preview: Some("queued".to_string()) };
            json_response(StatusCode(202), &resp)
        }
        _ => json_response(StatusCode(404), &json!({"ok": false, "error": "api route not found"})),
    }
}

fn route_internal(method: &Method, path: &str, body: &[u8], state: Arc<AppState>) -> Result<Response<std::io::Cursor<Vec<u8>>>> {
    ensure_leader(&state)?;
    match (method, path) {
        (&Method::Post, "/internal/register") => {
            let req: RegisterRequest = serde_json::from_slice(body)?;
            state.store.upsert_register(&req)?;
            json_response(StatusCode(200), &json!({"ok": true}))
        }
        (&Method::Post, "/internal/beat") => {
            let req: BeatRequest = serde_json::from_slice(body)?;
            state.store.upsert_beat(&req)?;
            let assignment = if req.running < req.capacity { state.store.assign_next(&req.node_id, &req.capabilities)? } else { None };
            let resp = BeatResponse { accepted: true, leader_time_ms: now_ms(), assignment };
            json_response(StatusCode(200), &resp)
        }
        (&Method::Post, "/internal/result") => {
            let result: TaskResult = serde_json::from_slice(body)?;
            state.store.complete_task(&result)?;
            json_response(StatusCode(200), &json!({"ok": true}))
        }
        _ => json_response(StatusCode(404), &json!({"ok": false, "error": "internal route not found"})),
    }
}

fn ensure_leader(state: &AppState) -> Result<()> {
    if matches!(state.mode, NodeMode::Leader | NodeMode::Standalone) {
        Ok(())
    } else {
        Err(anyhow!("this node is not the leader"))
    }
}

fn require_bearer(req: &Request, token: &str) -> Result<()> {
    let auth = header(req, "authorization");
    if bearer_matches(auth.as_deref(), token) {
        Ok(())
    } else {
        Err(anyhow!("unauthorized"))
    }
}

fn header(req: &Request, name: &str) -> Option<String> {
    req.headers()
        .iter()
        .find(|h| h.field.equiv(name))
        .map(|h| h.value.as_str().to_string())
}

fn json_response<T: Serialize>(status: StatusCode, value: &T) -> Result<Response<std::io::Cursor<Vec<u8>>>> {
    let body = serde_json::to_vec_pretty(value)?;
    let mut resp = Response::from_data(body).with_status_code(status);
    resp.add_header(Header::from_bytes(&b"Content-Type"[..], &b"application/json"[..]).unwrap());
    Ok(resp)
}

fn html_response(html: &str) -> Result<Response<std::io::Cursor<Vec<u8>>>> {
    let mut resp = Response::from_string(html.to_string()).with_status_code(StatusCode(200));
    resp.add_header(Header::from_bytes(&b"Content-Type"[..], &b"text/html; charset=utf-8"[..]).unwrap());
    Ok(resp)
}
