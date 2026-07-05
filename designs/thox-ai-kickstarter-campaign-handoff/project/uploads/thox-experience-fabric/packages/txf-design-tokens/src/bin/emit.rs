//! CLI: `txf-tokens emit --target <css|json|swift|kotlin|tailwind|figma>`
//!
//! Usage:
//!   cargo run -p txf-design-tokens -- emit --target css   > tokens.css
//!   cargo run -p txf-design-tokens -- emit --target json  > tokens.json

use std::env;
use std::process::ExitCode;

use txf_design_tokens::{emit, thox_tokens, Target};

fn main() -> ExitCode {
    let args: Vec<String> = env::args().collect();
    let mut target = Target::Json;
    let mut i = 1;
    while i < args.len() {
        match args[i].as_str() {
            "emit" => {}
            "--target" | "-t" => {
                i += 1;
                let raw = args.get(i).map_or("", String::as_str);
                match Target::parse(raw) {
                    Some(t) => target = t,
                    None => {
                        eprintln!("unknown target: {raw}");
                        eprintln!("supported: css, json, swift, kotlin, tailwind, figma");
                        return ExitCode::from(2);
                    }
                }
            }
            "--help" | "-h" => {
                println!("txf-tokens emit --target <css|json|swift|kotlin|tailwind|figma>");
                return ExitCode::SUCCESS;
            }
            _ => {
                eprintln!("unknown arg: {}", args[i]);
                return ExitCode::from(2);
            }
        }
        i += 1;
    }

    match emit(&thox_tokens(), target) {
        Ok(out) => {
            print!("{out}");
            ExitCode::SUCCESS
        }
        Err(e) => {
            eprintln!("emit failed: {e:#}");
            ExitCode::FAILURE
        }
    }
}
