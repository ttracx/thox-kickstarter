"""Command-line interface for the Thox.ai campaign tooling.

Subcommands:
  scan           Scan text or a file against the compliance guardrails.
  prioritize     Score and rank options from JSON.
  run            Run the agent DAG (mock by default; --live for the real API).
  generate-docs  Invoke the Node renderer to build the Word documents.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from typing import Optional, Sequence

from .config import REPO_ROOT
from .guardrails import GuardrailEngine
from .priority import Option, as_table


def _cmd_scan(args: argparse.Namespace) -> int:
    if args.file:
        if not os.path.isfile(args.file):
            print(f"error: file not found: {args.file}", file=sys.stderr)
            return 2
        with open(args.file, "r", encoding="utf-8") as handle:
            text = handle.read()
    elif args.text is not None:
        text = args.text
    else:
        print("error: provide --text or --file", file=sys.stderr)
        return 2

    engine = GuardrailEngine()
    report = engine.scan(text)
    print(report.summary())
    return 0 if report.passed else 1


def _cmd_prioritize(args: argparse.Namespace) -> int:
    if args.file:
        if not os.path.isfile(args.file):
            print(f"error: file not found: {args.file}", file=sys.stderr)
            return 2
        with open(args.file, "r", encoding="utf-8") as handle:
            raw = handle.read()
    elif args.json:
        raw = args.json
    else:
        print("error: provide --json or --file", file=sys.stderr)
        return 2

    try:
        data = json.loads(raw)
    except json.JSONDecodeError as exc:
        print(f"error: invalid JSON: {exc}", file=sys.stderr)
        return 2

    if not isinstance(data, list) or not data:
        print("error: expected a non-empty JSON list of options", file=sys.stderr)
        return 2

    try:
        options = [
            Option(
                name=str(item["name"]),
                market=item["market"],
                technical=item["technical"],
                time_to_market=item["time_to_market"],
                strategic=item["strategic"],
            )
            for item in data
        ]
    except (KeyError, TypeError, ValueError) as exc:
        print(f"error: invalid option: {exc}", file=sys.stderr)
        return 2

    print(as_table(options))
    return 0


def _cmd_run(args: argparse.Namespace) -> int:
    # Import here so `scan`/`prioritize` do not pull in the orchestrator.
    from .llm import AnthropicLLM, MockLLM
    from .orchestrator import run as run_dag

    llm = AnthropicLLM() if args.live else MockLLM()
    report = run_dag(args.brief, llm=llm, strict=not args.no_strict)
    print(report.summary())

    if args.show_output:
        print("\n--- Agent outputs ---")
        for name in report.order:
            result = report.results.get(name)
            if result is None:
                print(f"\n[{name}] (skipped)")
                continue
            print(f"\n[{name}]\n{result.output}")

    return 0 if report.ok else 1


def _cmd_generate_docs(args: argparse.Namespace) -> int:
    script = os.path.join(REPO_ROOT, "scripts", "generate_docs.js")
    if not os.path.isfile(script):
        print(f"error: renderer not found: {script}", file=sys.stderr)
        return 2
    try:
        completed = subprocess.run(["node", script], cwd=REPO_ROOT, check=False)
    except FileNotFoundError:
        print("error: node is not installed or not on PATH", file=sys.stderr)
        return 2
    return completed.returncode


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="thox-campaign",
        description="Thox.ai campaign operations tooling.",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    p_scan = sub.add_parser("scan", help="Scan text or a file against the guardrails.")
    g_scan = p_scan.add_mutually_exclusive_group(required=True)
    g_scan.add_argument("--text", help="Text to scan.")
    g_scan.add_argument("--file", help="Path to a file to scan.")
    p_scan.set_defaults(func=_cmd_scan)

    p_pri = sub.add_parser("prioritize", help="Score and rank options from JSON.")
    g_pri = p_pri.add_mutually_exclusive_group(required=True)
    g_pri.add_argument("--json", help="JSON list of options.")
    g_pri.add_argument("--file", help="Path to a JSON file of options.")
    p_pri.set_defaults(func=_cmd_prioritize)

    p_run = sub.add_parser("run", help="Run the agent DAG.")
    p_run.add_argument("brief", help="The campaign brief.")
    p_run.add_argument("--live", action="store_true", help="Use the real Anthropic API.")
    p_run.add_argument("--no-strict", action="store_true", help="Do not skip downstream of a blocked gate.")
    p_run.add_argument("--show-output", action="store_true", help="Print each agent output.")
    p_run.set_defaults(func=_cmd_run)

    p_docs = sub.add_parser("generate-docs", help="Invoke the Node document renderer.")
    p_docs.set_defaults(func=_cmd_generate_docs)

    return parser


def main(argv: Optional[Sequence[str]] = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    sys.exit(main())
