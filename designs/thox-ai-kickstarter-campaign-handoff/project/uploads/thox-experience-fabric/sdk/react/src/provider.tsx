import { createContext, useContext, type ReactNode } from "react";
import type { ThoxUser } from "./types";

interface ThoxContextValue {
  user: ThoxUser | null;
  advancedMode: boolean;
}

const Ctx = createContext<ThoxContextValue>({ user: null, advancedMode: false });

export function ThoxProvider({ user, advancedMode = false, children }: { user: ThoxUser | null; advancedMode?: boolean; children: ReactNode }) {
  return <Ctx.Provider value={{ user, advancedMode }}>{children}</Ctx.Provider>;
}

export function useThox() {
  return useContext(Ctx);
}
