export function ThoxAgentCard({ name, role, status }: { name: string; role: string; status: string }) {
  return (
    <article className="thox-agent-card" aria-label={`${name} (${role})`}>
      <header>{name}</header>
      <p>{role}</p>
      <span aria-live="polite">{status}</span>
    </article>
  );
}
