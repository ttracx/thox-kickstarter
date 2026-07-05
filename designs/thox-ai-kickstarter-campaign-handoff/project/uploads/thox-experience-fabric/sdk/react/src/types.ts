// Mirror of txf-core types. Phase 1 will codegen this from the JSON Schema.

export interface ThoxUser {
  id: string;
  profile: {
    displayName: string;
    handle: string;
    avatarUrl?: string;
    locale: string;
    timezone: string;
    createdAt: string;
  };
  preferences: {
    theme: "dark" | "light" | "system";
    voiceEnabled: boolean;
    reducedMotion: boolean;
    highContrast: boolean;
    hapticsEnabled: boolean;
    advancedMode: boolean;
  };
}

export interface TxfManifest {
  txfVersion: "2.0";
  designSystem: "THOX";
  identityEnabled: boolean;
  memoryEnabled: boolean;
  projectsEnabled: boolean;
  navigationStandard: boolean;
  deviceFabricEnabled: boolean;
  agentFabricEnabled: boolean;
  voiceEnabled: boolean;
  accessibilityCertified: boolean;
  experienceScoreFloor?: number;
}
