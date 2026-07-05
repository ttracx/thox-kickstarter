import type { ButtonHTMLAttributes } from "react";

export function ThoxButton({ variant = "primary", ...rest }: { variant?: "primary" | "secondary" | "danger" | "ghost" | "agent" } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`thox-btn thox-btn--${variant}`} {...rest} />;
}
