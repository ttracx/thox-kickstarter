use crate::protocol::Metrics;
use std::fs;
use std::process::Command;

pub fn collect_metrics() -> Metrics {
    Metrics {
        hostname: hostname(),
        uptime_seconds: uptime_seconds(),
        load_1m: load_1m(),
        mem_total_kb: meminfo_value("MemTotal").unwrap_or(0),
        mem_available_kb: meminfo_value("MemAvailable").unwrap_or(0),
        disk_available_kb: disk_available_kb("/").unwrap_or(0),
        cpu_temp_c: cpu_temp_c(),
    }
}

fn hostname() -> String {
    fs::read_to_string("/etc/hostname")
        .map(|s| s.trim().to_string())
        .ok()
        .filter(|s| !s.is_empty())
        .unwrap_or_else(|| "magstack-air-node".to_string())
}

fn uptime_seconds() -> u64 {
    fs::read_to_string("/proc/uptime")
        .ok()
        .and_then(|s| s.split_whitespace().next().map(str::to_string))
        .and_then(|s| s.parse::<f64>().ok())
        .map(|v| v as u64)
        .unwrap_or(0)
}

fn load_1m() -> f32 {
    fs::read_to_string("/proc/loadavg")
        .ok()
        .and_then(|s| s.split_whitespace().next().map(str::to_string))
        .and_then(|s| s.parse::<f32>().ok())
        .unwrap_or(0.0)
}

fn meminfo_value(key: &str) -> Option<u64> {
    let content = fs::read_to_string("/proc/meminfo").ok()?;
    for line in content.lines() {
        if let Some(rest) = line.strip_prefix(&format!("{}:", key)) {
            return rest.split_whitespace().next()?.parse::<u64>().ok();
        }
    }
    None
}

fn cpu_temp_c() -> Option<f32> {
    let raw = fs::read_to_string("/sys/class/thermal/thermal_zone0/temp").ok()?;
    let milli = raw.trim().parse::<f32>().ok()?;
    Some(milli / 1000.0)
}

fn disk_available_kb(path: &str) -> Option<u64> {
    let out = Command::new("df").arg("-k").arg(path).output().ok()?;
    if !out.status.success() {
        return None;
    }
    let text = String::from_utf8_lossy(&out.stdout);
    let line = text.lines().nth(1)?;
    line.split_whitespace().nth(3)?.parse::<u64>().ok()
}
