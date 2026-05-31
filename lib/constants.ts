import type { Locale } from "@/types/common";

export const SITE_NAME = "NameHub";

export const LOCALES: Locale[] = ["tr", "en"];

export const DEFAULT_LOCALE: Locale = "tr";

export const COLORS = {
  bg: "#FAFAFA",
  card: "#FFFFFF",
  ink: "#121212",
  muted: "#737373",
  line: "#E5E5E5",
  accent: "#2563EB",
  emerald: "#10B981",
} as const;

export const ACCENT_STYLES: Record<
  string,
  { bg: string; text: string; ring: string }
> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-100" },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-600",
    ring: "ring-emerald-100",
  },
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-600",
    ring: "ring-violet-100",
  },
  amber: { bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-100" },
  rose: { bg: "bg-rose-50", text: "text-rose-600", ring: "ring-rose-100" },
  slate: { bg: "bg-slate-100", text: "text-slate-600", ring: "ring-slate-200" },
};

export const SAVED_VAULT_KEY = "namehub.saved.v1";
