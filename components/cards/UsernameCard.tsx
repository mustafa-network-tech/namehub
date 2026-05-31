import Link from "next/link";
import CopyButton from "@/components/ui/CopyButton";
import SavedButton from "@/components/ui/SavedButton";
import {
  getCategoryLabel,
  getCategoryColor,
  getPlatformIcon,
  getPlatformLabel,
} from "@/lib/usernames";
import type { Username } from "@/types/username";
import type { Locale } from "@/types/common";

const DETAIL_BASE: Record<Locale, string> = {
  tr: "/tr/kullanici-adlari",
  en: "/en/usernames",
};

export default function UsernameCard({
  item,
  locale,
}: {
  item: Username;
  locale: Locale;
}) {
  const href = `${DETAIL_BASE[locale]}/${item.slug}`;
  const categoryLabel = getCategoryLabel(locale, item.category);
  const color = getCategoryColor(item.category);
  const copyMsg = locale === "tr" ? "✓ Panoya kopyalandı" : "✓ Copied to clipboard";
  const availLabel = locale === "tr" ? "Müsaitlik" : "Availability";

  return (
    <article className="card-base flex flex-col gap-3 p-5 transition-shadow hover:shadow-soft-lg">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color.badge}`}>
            {categoryLabel}
          </span>
          <h3 className="mt-1.5 truncate text-lg font-semibold">
            <Link href={href} className="focus-ring hover:text-accent">
              @{item.username}
            </Link>
          </h3>
        </div>
        <SavedButton
          item={{
            id: item.id,
            kind: "username",
            label: `@${item.username}`,
            sublabel: categoryLabel,
            locale,
            href,
          }}
        />
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted">
        <span aria-hidden="true">{getPlatformIcon(locale, item.platform)}</span>
        <span>{getPlatformLabel(locale, item.platform)}</span>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-muted">
          <span>{availLabel}</span>
          <span className="font-semibold text-ink">{item.availability}/100</span>
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-bg">
          <div
            className={`h-full rounded-full ${color.bar}`}
            style={{ width: `${item.availability}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {item.styleTags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${color.tint} ${color.text}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${color.dot}`} aria-hidden="true" />
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex gap-2 border-t border-line pt-3">
        <CopyButton
          value={`@${item.username}`}
          toastMessage={copyMsg}
          label={locale === "tr" ? "Kopyala" : "Copy"}
          className="flex-1"
        />
        <Link
          href={href}
          className="btn-touch focus-ring border border-line bg-white px-3 text-ink hover:bg-bg"
          aria-label={locale === "tr" ? "Detay" : "Details"}
        >
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
