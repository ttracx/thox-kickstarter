export function ThoxDevicePanel({ name, status, batteryPct }: { name: string; status: string; batteryPct?: number }) {
  return (
    <section className="thox-device-panel" aria-label={`${name} device panel`}>
      <h3>{name}</h3>
      <span>{status}</span>
      {typeof batteryPct === "number" && <span>Battery {batteryPct}%</span>}
    </section>
  );
}
