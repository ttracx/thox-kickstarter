type PillState = "online" | "offline" | "busy" | "thinking" | "warning" | "error" | "updating";

export function ThoxStatusPill({ state, label }: { state: PillState; label: string }) {
  return (
    <span className={`thox-status thox-status--${state}`} role="status" aria-live="polite">{label}</span>
  );
}
