"use client";

import { useState } from "react";
import Link from "next/link";
import { copyToClipboard } from "@/lib/copy";
import { showToast } from "@/components/ui/Toast";
import SavedButton from "@/components/ui/SavedButton";
import { getCategoryLabel, getCategoryColor } from "@/lib/nicknames";
import type { Nickname } from "@/types/nickname";
import type { Locale } from "@/types/common";

const DETAIL_BASE: Record<Locale, string> = {
  tr: "/tr/nickler",
  en: "/en/nicknames",
};

export default function NickCard({
  item,
  locale,
}: {
  item: Nickname;
  locale: Locale;
}) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const copyMsg = locale === "tr" ? "✓ Panoya kopyalandı" : "✓ Copied to clipboard";
  const href = `${DETAIL_BASE[locale]}/${item.slug}`;
  const categoryLabel = getCategoryLabel(locale, item.category);
  const color = getCategoryColor(item.category);
  const detailLabel = locale === "tr" ? "Detay" : "Details";

  async function handleCopy(value: string, index: number) {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopiedIndex(index);
      showToast(copyMsg);
      window.setTimeout(() => setCopiedIndex(null), 1200);
    }
  }

  return (
    <article className="card-base flex flex-col gap-3 p-5 transition-shadow hover:shadow-soft-lg">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color.badge}`}>
            {categoryLabel}
          </span>
          <h3 className="mt-1.5 truncate text-lg font-semibold">
            <Link href={href} className="focus-ring hover:text-accent">
              {item.base}
            </Link>
          </h3>
        </div>
        <SavedButton
          item={{
            id: item.id,
            kind: "nick",
            label: item.base,
            sublabel: categoryLabel,
            locale,
            href,
          }}
        />
      </div>

      <ul className="flex flex-col gap-2">
        {item.variants.slice(0, 4).map((variant, index) => (
          <li key={variant.style}>
            <button
              type="button"
              onClick={() => handleCopy(variant.value, index)}
              className={`focus-ring group flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl border border-line/50 px-3 text-left hover:border-accent/40 ${color.tint}`}
            >
              <span className={`truncate text-base font-medium ${color.text}`}>{variant.value}</span>
              <span className="shrink-0 text-muted group-hover:text-accent" aria-hidden="true">
                {copiedIndex === index ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-emerald">
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M5 15V5a2 2 0 0 1 2-2h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="focus-ring mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium text-accent hover:text-accent-hover"
      >
        {detailLabel}
        <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}
