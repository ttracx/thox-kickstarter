// Universal command palette. Phase 1 wires keybinds + fuzzy search.
import { useEffect, useState } from "react";

const COMMANDS = [
  "Create Project",
  "Open Vault",
  "Find Device",
  "Launch Agent",
  "Deploy Workflow",
  "Generate Code",
  "Print Asset",
  "Search Memory",
] as const;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  if (!open) return null;
  return (
    <div role="dialog" aria-label="THOX command palette" className="thox-cmdk">
      <ul>{COMMANDS.map((c) => <li key={c}>{c}</li>)}</ul>
    </div>
  );
}
