// THOX Experience Fabric React SDK - Phase 0 surface.
//
// Phase 1 will flesh out the components against the txf-components Rust
// contract via wasm-bindgen-generated bindings. For now the API surface is
// declared so app teams can wire imports and we can lock in the export shape.

export type { ThoxUser, TxfManifest } from "./types";
export { ThoxProvider, useThox } from "./provider";
export { Navigation } from "./components/navigation";
export { CommandPalette } from "./components/command-palette";
export { ThoxAgentCard } from "./components/agent-card";
export { ThoxDevicePanel } from "./components/device-panel";
export { ThoxNotification } from "./components/notification";
export { ThoxStatusPill } from "./components/status-pill";
export { ThoxButton } from "./components/button";
export { ThoxCard } from "./components/card";
export { TXF_VERSION } from "./version";
