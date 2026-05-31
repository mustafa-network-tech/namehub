import Link from "next/link";
import CopyButton from "@/components/ui/CopyButton";
import SavedButton from "@/components/ui/SavedButton";
import { getCategoryLabel, getCategoryColor } from "@/lib/brands";
import type { BrandName } from "@/types/brand";
import type { Locale } from "@/types/common";

const DETAIL_BASE: Record<Locale, string> = {
  tr: "/tr/marka-isimleri",
  en: "/en/brand-names",
};

export default function BrandCard({
  item,
  locale,
}: {
  item: BrandName;
  locale: Locale;
}) {
  const href = `${DETAIL_BASE[locale]}/${item.slug}`;
  const categoryLabel = getCategoryLabel(locale, item.category);
  const color = getCategoryColor(item.category);
  const copyMsg = locale === "tr" ? "Kopyalandı!" : "Copied!";
  const detailLabel = locale === "tr" ? "İncele" : "View";

  return (
    <article className={`card-base flex flex-col gap-3 p-5 transition-shadow hover:shadow-soft-lg ${color.tint}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color.badge}`}>
            {categoryLabel}
          </span>
          <h3 className="mt-1.5 truncate text-xl font-bold tracking-tight">
            <Link href={href} className={`focus-ring hover:opacity-80 ${color.text}`}>
              {item.name}
            </Link>
          </h3>
        </div>
        <SavedButton
          item={{
            id: item.id,
            kind: "brand",
            label: item.name,
            sublabel: categoryLabel,
            locale,
            href,
          }}
        />
      </div>

      <p className="line-clamp-3 text-sm text-muted">{item.meaning}</p>

      <div className="mt-auto flex gap-2 border-t border-line pt-3">
        <CopyButton
          value={item.name}
          toastMessage={copyMsg}
          label={locale === "tr" ? "Kopyala" : "Copy"}
          className="flex-1"
        />
        <Link
          href={href}
          className="btn-touch focus-ring border border-line bg-white px-4 text-ink hover:bg-bg"
        >
          {detailLabel}
        </Link>
      </div>
    </article>
  );
}
