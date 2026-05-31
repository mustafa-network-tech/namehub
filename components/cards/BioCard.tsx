import Link from "next/link";
import CopyButton from "@/components/ui/CopyButton";
import ShareButton from "@/components/ui/ShareButton";
import SavedButton from "@/components/ui/SavedButton";
import {
  getPlatformLabel,
  getPlatformBadge,
  getBioCategoryLabel,
  getBioCategoryColor,
} from "@/lib/bios";
import type { Bio } from "@/types/bio";
import type { Locale } from "@/types/common";

const DETAIL_BASE: Record<Locale, string> = {
  tr: "/tr/bio-onerileri",
  en: "/en/bio-ideas",
};

export default function BioCard({
  item,
  locale,
}: {
  item: Bio;
  locale: Locale;
}) {
  const charLabel = locale === "tr" ? "karakter" : "characters";
  const copyMsg = locale === "tr" ? "Kopyalandı!" : "Copied!";
  const platformLabel = getPlatformLabel(item.platform);
  const categoryLabel = getBioCategoryLabel(locale, item.category);
  const color = getBioCategoryColor(item.category);
  const href = `${DETAIL_BASE[locale]}/${item.slug}`;

  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl border border-line/60 border-t-2 p-5 shadow-soft transition-shadow hover:shadow-soft-lg ${color.tint} ${color.border}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getPlatformBadge(item.platform)}`}>
            {platformLabel}
          </span>
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color.badge}`}>
            {categoryLabel}
          </span>
        </div>
        <SavedButton
          item={{
            id: item.id,
            kind: "bio",
            label: item.text,
            sublabel: `${platformLabel} • ${categoryLabel}`,
            locale,
            href,
          }}
        />
      </div>

      <Link href={href} className="focus-ring">
        <p className="text-base leading-relaxed text-ink">{item.text}</p>
      </Link>

      <div className="mt-auto flex items-center justify-between border-t border-line/60 pt-3">
        <span className="text-xs text-muted">
          {item.text.length} {charLabel}
        </span>
        <div className="flex gap-2">
          <CopyButton
            value={item.text}
            toastMessage={copyMsg}
            label={locale === "tr" ? "Kopyala" : "Copy"}
            iconOnly
          />
          <ShareButton
            title="NameHub Bio"
            text={item.text}
            label={locale === "tr" ? "Paylaş" : "Share"}
            copiedMessage={locale === "tr" ? "Bağlantı kopyalandı!" : "Link copied!"}
            iconOnly
          />
        </div>
      </div>
    </article>
  );
}
