// thox:surface=internal
// A compliant screen fragment: tokens only, semantic classes, no raw hex.
import { ThoxButton } from '@thox/ux/react';

export function MeshOverview() {
  return (
    <section className="bg-surface-base text-ink-primary font-sans">
      <h2 className="text-ink-primary">Mesh overview</h2>
      <p className="text-ink-secondary">Throughput: -- tok/s</p>
      <div className="bg-surface-card border-line rounded-md">
        <ThoxButton variant="solid">Add device</ThoxButton>
      </div>
    </section>
  );
}
