//! `thox-cert` - run all TXF validators against a bundle and emit the score.

use std::env;
use std::fs;
use std::path::PathBuf;
use std::process::ExitCode;

fn main() -> ExitCode {
    let args: Vec<String> = env::args().collect();
    let mut bundle: Option<PathBuf> = None;
    let mut i = 1;
    while i < args.len() {
        match args[i].as_str() {
            "--bundle" | "-b" => {
                i += 1;
                bundle = args.get(i).map(PathBuf::from);
            }
            "--help" | "-h" => {
                println!("thox-cert --bundle <path>");
                println!("Runs the TXF validators and emits the THOX Experience Score.");
                return ExitCode::SUCCESS;
            }
            _ => {}
        }
        i += 1;
    }

    let Some(bundle) = bundle else {
        eprintln!("error: --bundle required");
        return ExitCode::from(2);
    };

    let manifest_path = bundle.join("txf.json");
    let manifest_json = match fs::read_to_string(&manifest_path) {
        Ok(s) => s,
        Err(e) => {
            eprintln!("error: {} ({e})", manifest_path.display());
            return ExitCode::FAILURE;
        }
    };

    let branding = branding_validator::score(&manifest_json);
    let navigation = ux_validator::score_navigation(&manifest_json);
    let accessibility = accessibility_validator::score(&manifest_json);
    let agents = ux_validator::score_agents(&manifest_json);
    let devices = ux_validator::score_devices(&manifest_json);
    let memory = ux_validator::score_memory(&manifest_json);

    let score = release_gates::Score {
        branding, navigation, accessibility, agents, devices, memory,
    };
    let overall = score.experience_score();
    let gate = score.gate();

    println!("{}", serde_json::to_string_pretty(&serde_json::json!({
        "bundle": bundle.display().to_string(),
        "score": &score,
        "experience_score": overall,
        "gate": format!("{gate:?}"),
    })).unwrap_or_default());

    match gate {
        release_gates::Gate::Ship => ExitCode::SUCCESS,
        release_gates::Gate::Review => ExitCode::from(10),
        release_gates::Gate::Blocked => ExitCode::from(20),
    }
}
