"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAlternatePath, getLocaleFromPath } from "@/lib/navigation";

export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const pathname = usePathname() || "/tr";
  const locale = getLocaleFromPath(pathname);
  const alternate = getAlternatePath(pathname);

  return (
    <div
      className={`inline-flex items-center rounded-full border border-line bg-white p-0.5 text-sm font-medium ${className}`}
    >
      <Link
        href={locale === "tr" ? pathname : alternate}
        aria-current={locale === "tr" ? "true" : undefined}
        className={`focus-ring inline-flex h-9 min-w-[40px] items-center justify-center rounded-full px-3 transition-colors ${
          locale === "tr" ? "bg-ink text-white" : "text-muted hover:text-ink"
        }`}
      >
        TR
      </Link>
      <Link
        href={locale === "en" ? pathname : alternate}
        aria-current={locale === "en" ? "true" : undefined}
        className={`focus-ring inline-flex h-9 min-w-[40px] items-center justify-center rounded-full px-3 transition-colors ${
          locale === "en" ? "bg-ink text-white" : "text-muted hover:text-ink"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
