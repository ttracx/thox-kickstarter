export const TXF_VERSION = "2.0";
export const SDK_VERSION = "0.1.0";

export const NAVIGATION_SECTIONS = ["Home", "Agents", "Projects", "Devices", "Vault"] as const;
export type NavigationSection = typeof NAVIGATION_SECTIONS[number];
