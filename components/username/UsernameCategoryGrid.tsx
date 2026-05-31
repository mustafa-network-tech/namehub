import Link from "next/link";
import { getCategoryStats } from "@/lib/usernames";
import type { Locale } from "@/types/common";

export default function UsernameCategoryGrid({
  locale,
  base,
}: {
  locale: Locale;
  base: string;
}) {
  const stats = getCategoryStats(locale);
  const catBase = `${base}/${locale === "tr" ? "kategori" : "category"}`;
  const exploreLabel = locale === "tr" ? "Keşfet" : "Explore";
  const countLabel = (n: number) =>
    locale === "tr" ? `${n} kullanıcı adı` : `${n} usernames`;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((c) => (
        <Link
          key={c.id}
          href={`${catBase}/${c.id}`}
          className={`group card-base flex flex-col gap-3 p-5 transition-shadow hover:shadow-soft-lg ${c.color.tint}`}
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <span className={`h-2.5 w-2.5 rounded-full ${c.color.dot}`} aria-hidden="true" />
              {c.label}
            </h3>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.color.badge}`}>
              {countLabel(c.count)}
            </span>
          </div>

          <p className="text-sm text-muted">{c.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {c.preview.map((p) => (
              <span
                key={p}
                className="inline-flex items-center rounded-full border border-line/60 bg-white/70 px-2.5 py-0.5 text-xs font-medium text-ink"
              >
                @{p}
              </span>
            ))}
          </div>

          <span className={`mt-auto inline-flex items-center gap-1 pt-1 text-sm font-medium ${c.color.text}`}>
            {exploreLabel}
            <span className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
