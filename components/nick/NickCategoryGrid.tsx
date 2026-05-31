import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryStats } from "@/lib/nicknames";
import type { Locale } from "@/types/common";

const CATEGORY_BASE: Record<Locale, string> = {
  tr: "/tr/nickler/kategori",
  en: "/en/nicknames/category",
};

const T = {
  tr: { count: (n: number) => `${n} Nick`, explore: "Keşfet", preview: "Önizleme" },
  en: { count: (n: number) => `${n} Nicknames`, explore: "Explore", preview: "Preview" },
};

export default function NickCategoryGrid({ locale }: { locale: Locale }) {
  const stats = getCategoryStats(locale);
  const t = T[locale];
  const base = CATEGORY_BASE[locale];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((c) => (
        <Link
          key={c.id}
          href={`${base}/${c.id}`}
          className={`focus-ring group flex h-full flex-col rounded-2xl border border-line/60 p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg ${c.color.tint}`}
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-ink">
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${c.color.dot}`} aria-hidden="true" />
              {c.label}
            </h3>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${c.color.badge}`}>
              {t.count(c.count)}
            </span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-muted">{c.description}</p>

          {c.preview.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {c.preview.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center rounded-full bg-white/70 px-2.5 py-1 text-xs font-medium text-ink"
                >
                  {name}
                </span>
              ))}
            </div>
          )}

          <span className={`mt-5 inline-flex items-center gap-1 pt-1 text-sm font-semibold ${c.color.text}`}>
            {t.explore}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </Link>
      ))}
    </div>
  );
}
