export function ThoxNotification({ title, description, severity }: { title: string; description: string; severity: "info" | "success" | "warning" | "danger" | "critical" }) {
  return (
    <div role="alert" aria-live={severity === "info" || severity === "success" ? "polite" : "assertive"} className={`thox-notification thox-notification--${severity}`}>
      <strong>{title}</strong>
      <p>{description}</p>
    </div>
  );
}
