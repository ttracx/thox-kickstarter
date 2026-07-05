// Universal 5-section navigation. Order locked. Labels locked. Icons placeholder.
const SECTIONS = ["Home", "Agents", "Projects", "Devices", "Vault"] as const;

export function Navigation({ active }: { active?: typeof SECTIONS[number] }) {
  return (
    <nav aria-label="THOX navigation" className="thox-nav">
      {SECTIONS.map((s) => (
        <a key={s} href={`/${s.toLowerCase()}`} aria-current={s === active ? "page" : undefined}>
          {s}
        </a>
      ))}
    </nav>
  );
}
