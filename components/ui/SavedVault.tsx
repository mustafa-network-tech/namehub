"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  clearSaved,
  getSavedItems,
  removeSaved,
  subscribeVault,
} from "@/lib/saved-vault";
import { getLocaleFromPath } from "@/lib/navigation";
import type { SavedItem } from "@/types/common";

const T = {
  tr: {
    open: "Kayıtlı Kimlik Kasası",
    title: "Kayıtlı Kasam",
    empty: "Henüz bir şey kaydetmedin. Kalp ikonuna dokunarak başla.",
    clear: "Tümünü temizle",
    remove: "Kaldır",
    close: "Kapat",
    viewAll: "Favoriler sayfasını aç",
    favoritesHref: "/tr/favoriler",
  },
  en: {
    open: "Saved Identity Vault",
    title: "My Saved Vault",
    empty: "Nothing saved yet. Tap the heart icon to start.",
    clear: "Clear all",
    remove: "Remove",
    close: "Close",
    viewAll: "Open favorites page",
    favoritesHref: "/en/favorites",
  },
};

export default function SavedVault() {
  const pathname = usePathname() || "/tr";
  const locale = getLocaleFromPath(pathname);
  const t = T[locale];

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<SavedItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setItems(getSavedItems());
    return subscribeVault(() => setItems(getSavedItems()));
  }, []);

  if (!mounted) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.open}
        className="focus-ring fixed bottom-5 right-5 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white shadow-soft-lg transition-transform hover:scale-[1.03]"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 21s-7.5-4.6-10-9.3C.6 8.6 2 5.5 5 5c2-.3 3.4.8 4 1.7C9.6 5.8 11 4.7 13 5c3 .5 4.4 3.6 3 6.7C19.5 16.4 12 21 12 21z" fill="#ef4444" stroke="#ef4444" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        {items.length > 0 && (
          <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-white px-1.5 text-xs font-bold text-ink">
            {items.length}
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label={t.close}
            className="absolute inset-0 bg-ink/30"
            onClick={() => setOpen(false)}
          />
          <aside className="relative flex h-full w-full max-w-sm flex-col bg-card shadow-soft-lg">
            <header className="flex items-center justify-between border-b border-line px-5 py-4">
              <h2 className="text-lg font-semibold">{t.title}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.close}
                className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-bg"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="mt-10 text-center text-sm text-muted">{t.empty}</p>
              ) : (
                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2.5"
                    >
                      <div className="min-w-0">
                        {item.href ? (
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block truncate font-medium text-ink hover:text-accent"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <span className="block truncate font-medium text-ink">
                            {item.label}
                          </span>
                        )}
                        {item.sublabel && (
                          <span className="block truncate text-xs text-muted">
                            {item.sublabel}
                          </span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSaved(item.id)}
                        aria-label={t.remove}
                        className="focus-ring inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-bg hover:text-red-500"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0l1 13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <footer className="flex flex-col gap-2 border-t border-line px-5 py-4">
                <Link
                  href={t.favoritesHref}
                  onClick={() => setOpen(false)}
                  className="btn-touch focus-ring w-full bg-accent text-white hover:bg-accent-hover"
                >
                  {t.viewAll}
                </Link>
                <button
                  type="button"
                  onClick={() => clearSaved()}
                  className="btn-touch focus-ring w-full border border-line text-muted hover:bg-bg"
                >
                  {t.clear}
                </button>
              </footer>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
