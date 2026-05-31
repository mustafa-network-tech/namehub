"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import CopyButton from "@/components/ui/CopyButton";
import EmptyState from "@/components/common/EmptyState";
import {
  clearSaved,
  getSavedItems,
  removeSaved,
  subscribeVault,
} from "@/lib/saved-vault";
import type { SavedItem } from "@/types/common";
import type { Locale } from "@/types/common";

const T = {
  tr: {
    emptyTitle: "Henüz favori yok",
    emptyDesc: "Beğendiğin nicklerdeki kalp ikonuna dokunarak kaydet.",
    remove: "Kaldır",
    copy: "Kopyala",
    copied: "✓ Panoya kopyalandı",
    clear: "Tümünü temizle",
    count: (n: number) => `${n} kayıt`,
    browse: "Nicklere göz at",
    browseHref: "/tr/nickler",
  },
  en: {
    emptyTitle: "No favorites yet",
    emptyDesc: "Tap the heart icon on a nickname you like to save it.",
    remove: "Remove",
    copy: "Copy",
    copied: "✓ Copied to clipboard",
    clear: "Clear all",
    count: (n: number) => `${n} saved`,
    browse: "Browse nicknames",
    browseHref: "/en/nicknames",
  },
};

export default function FavoritesList({ locale }: { locale: Locale }) {
  const t = T[locale];
  const [items, setItems] = useState<SavedItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(getSavedItems());
    return subscribeVault(() => setItems(getSavedItems()));
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div>
        <EmptyState title={t.emptyTitle} description={t.emptyDesc} />
        <div className="mt-6">
          <Link
            href={t.browseHref}
            className="btn-touch focus-ring bg-accent px-5 text-white hover:bg-accent-hover"
          >
            {t.browse}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted">{t.count(items.length)}</p>
        <button
          type="button"
          onClick={() => clearSaved()}
          className="focus-ring text-sm font-medium text-muted hover:text-red-500"
        >
          {t.clear}
        </button>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li
            key={item.id}
            className="card-base flex items-center justify-between gap-3 p-4"
          >
            <div className="min-w-0">
              {item.href ? (
                <Link
                  href={item.href}
                  className="block truncate font-semibold text-ink hover:text-accent"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="block truncate font-semibold text-ink">
                  {item.label}
                </span>
              )}
              {item.sublabel && (
                <span className="block truncate text-xs text-muted">
                  {item.sublabel}
                </span>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <CopyButton
                value={item.label}
                label={t.copy}
                toastMessage={t.copied}
                iconOnly
              />
              <button
                type="button"
                onClick={() => removeSaved(item.id)}
                aria-label={t.remove}
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full text-muted hover:bg-bg hover:text-red-500"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0l1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
