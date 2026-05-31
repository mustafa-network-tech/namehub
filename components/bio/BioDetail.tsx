import Link from "next/link";
import CopyButton from "@/components/ui/CopyButton";
import ShareButton from "@/components/ui/ShareButton";
import SavedButton from "@/components/ui/SavedButton";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import {
  getPlatformLabel,
  getPlatformBadge,
  getBioCategoryLabel,
  getBioCategoryColor,
} from "@/lib/bios";
import type { Bio } from "@/types/bio";
import type { Locale } from "@/types/common";

interface BioDetailProps {
  item: Bio;
  locale: Locale;
  listBase: string;
  sameCategory: Bio[];
  related: Bio[];
}

const T = {
  tr: {
    back: "Bio Kütüphanesine dön",
    platform: "Platform",
    category: "Kategori",
    charCount: "Karakter",
    language: "Dil",
    languageName: "Türkçe",
    copy: "Kopyala",
    share: "Paylaş",
    copied: "✓ Panoya kopyalandı",
    linkCopied: "Bağlantı kopyalandı!",
    also: "Şunları da beğenebilirsin",
    same: "Aynı Kategori",
    adLabel: "Reklam Alanı",
  },
  en: {
    back: "Back to Bio Library",
    platform: "Platform",
    category: "Category",
    charCount: "Characters",
    language: "Language",
    languageName: "English",
    copy: "Copy",
    share: "Share",
    copied: "✓ Copied to clipboard",
    linkCopied: "Link copied!",
    also: "You may also like",
    same: "Same Category",
    adLabel: "Advertisement",
  },
};

function RelatedSection({
  emoji,
  title,
  items,
  listBase,
  locale,
}: {
  emoji: string;
  title: string;
  items: Bio[];
  listBase: string;
  locale: Locale;
}) {
  if (items.length === 0) return null;
  return (
    <section className="card-base p-5">
      <h2 className="flex items-center gap-2 text-base font-semibold">
        <span aria-hidden="true">{emoji}</span>
        {title}
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {items.map((b) => {
          const color = getBioCategoryColor(b.category);
          return (
            <Link
              key={b.slug}
              href={`${listBase}/${b.slug}`}
              className={`focus-ring flex flex-col gap-2 rounded-xl border border-line/60 border-t-2 p-4 transition-shadow hover:shadow-soft ${color.tint} ${color.border}`}
            >
              <div className="flex flex-wrap gap-1.5">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${getPlatformBadge(b.platform)}`}>
                  {getPlatformLabel(b.platform)}
                </span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ${color.badge}`}>
                  {getBioCategoryLabel(locale, b.category)}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-ink">{b.text}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default function BioDetail({
  item,
  locale,
  listBase,
  sameCategory,
  related,
}: BioDetailProps) {
  const t = T[locale];
  const platformLabel = getPlatformLabel(item.platform);
  const categoryLabel = getBioCategoryLabel(locale, item.category);
  const color = getBioCategoryColor(item.category);
  const categoryHref = `${listBase}/${locale === "tr" ? "kategori" : "category"}/${item.category}`;
  const platformHref = `${listBase}/${locale === "tr" ? "platform" : "platform"}/${item.platform}`;

  return (
    <div className="container-page py-8">
      <Link
        href={listBase}
        className="focus-ring mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {t.back}
      </Link>

      <div className={`rounded-2xl border border-line/60 border-t-2 p-6 shadow-soft sm:p-8 ${color.tint} ${color.border}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Link
              href={platformHref}
              className={`focus-ring inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-opacity hover:opacity-80 ${getPlatformBadge(item.platform)}`}
            >
              {platformLabel}
            </Link>
            <Link
              href={categoryHref}
              className={`focus-ring inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-opacity hover:opacity-80 ${color.badge}`}
            >
              {categoryLabel}
            </Link>
          </div>
          <SavedButton
            item={{
              id: item.id,
              kind: "bio",
              label: item.text,
              sublabel: `${platformLabel} • ${categoryLabel}`,
              locale,
              href: `${listBase}/${item.slug}`,
            }}
          />
        </div>

        <p className="mt-5 text-2xl font-semibold leading-snug text-ink sm:text-3xl">
          {item.text}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <CopyButton value={item.text} label={t.copy} toastMessage={t.copied} />
          <ShareButton
            title="NameHub Bio"
            text={item.text}
            label={t.share}
            copiedMessage={t.linkCopied}
          />
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line/60 pt-5 sm:grid-cols-4">
          <div>
            <dt className="text-xs text-muted">{t.platform}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-ink">{platformLabel}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t.category}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-ink">{categoryLabel}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t.charCount}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-ink">{item.text.length}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted">{t.language}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-ink">{t.languageName}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <InternalPromoBanner seed={`bio-${item.slug}`} locale={locale} />
        <RelatedSection emoji="🗂" title={t.same} items={sameCategory} listBase={listBase} locale={locale} />
        <RelatedSection emoji="✨" title={t.also} items={related} listBase={listBase} locale={locale} />
      </div>
    </div>
  );
}
