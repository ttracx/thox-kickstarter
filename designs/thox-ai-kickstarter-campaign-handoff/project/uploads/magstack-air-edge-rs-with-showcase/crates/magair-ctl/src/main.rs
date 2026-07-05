use anyhow::{anyhow, Result};
use clap::{Parser, Subcommand};
use magair_core::protocol::{InferRequest, TaskSubmission};
use reqwest::blocking::Client;
use serde_json::Value;
use std::collections::BTreeMap;

#[derive(Parser)]
#[command(name = "magairctl", about = "MagStack Air control CLI")]
struct Cli {
    #[arg(long, default_value = "http://127.0.0.1:8787", global = true)]
    url: String,

    #[arg(long, env = "MAGSTACK_AIR_TOKEN", global = true)]
    token: String,

    #[command(subcommand)]
    cmd: Cmd,
}

#[derive(Subcommand)]
enum Cmd {
    Status,
    Nodes,
    Tasks,
    Infer {
        #[arg(long, default_value = "ai.intent.v1")]
        kind: String,
        #[arg(long)]
        text: String,
        #[arg(long, default_value_t = true)]
        sync: bool,
    },
    Submit {
        #[arg(long)]
        kind: String,
        #[arg(long)]
        payload: String,
        #[arg(long)]
        capability: Option<String>,
    },
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    let client = Client::builder().build()?;
    match cli.cmd {
        Cmd::Status => get(&client, &cli, "/api/status"),
        Cmd::Nodes => get(&client, &cli, "/api/nodes"),
        Cmd::Tasks => get(&client, &cli, "/api/tasks"),
        Cmd::Infer { kind, text, sync } => {
            let req = InferRequest { kind, text: Some(text), payload: None, sync, wait_ms: Some(30_000) };
            post(&client, &cli, "/api/infer", &serde_json::to_value(req)?)
        }
        Cmd::Submit { kind, payload, capability } => {
            let payload: Value = serde_json::from_str(&payload).map_err(|e| anyhow!("payload must be valid JSON: {e}"))?;
            let req = TaskSubmission {
                kind,
                required_capability: capability,
                payload,
                labels: BTreeMap::new(),
                timeout_ms: 120_000,
                max_output_bytes: 1024 * 1024,
            };
            post(&client, &cli, "/api/tasks", &serde_json::to_value(req)?)
        }
    }
}

fn get(client: &Client, cli: &Cli, path: &str) -> Result<()> {
    let url = format!("{}{}", cli.url.trim_end_matches('/'), path);
    let value: Value = client.get(url).bearer_auth(&cli.token).send()?.error_for_status()?.json()?;
    println!("{}", serde_json::to_string_pretty(&value)?);
    Ok(())
}

fn post(client: &Client, cli: &Cli, path: &str, body: &Value) -> Result<()> {
    let url = format!("{}{}", cli.url.trim_end_matches('/'), path);
    let value: Value = client.post(url).bearer_auth(&cli.token).json(body).send()?.error_for_status()?.json()?;
    println!("{}", serde_json::to_string_pretty(&value)?);
    Ok(())
}
