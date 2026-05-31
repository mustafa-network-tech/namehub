import Link from "next/link";
import CopyButton from "@/components/ui/CopyButton";
import ShareButton from "@/components/ui/ShareButton";
import SavedButton from "@/components/ui/SavedButton";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import {
  getCategoryLabel,
  getCategoryColor,
  getNickThemes,
  getNickStats,
  getSuitableFor,
} from "@/lib/nicknames";
import type { Nickname } from "@/types/nickname";
import type { Locale } from "@/types/common";

interface NickDetailProps {
  item: Nickname;
  locale: Locale;
  listBase: string;
  sameCategory: Nickname[];
  similar: Nickname[];
}

const T = {
  tr: {
    back: "Kategorilere dön",
    meaning: "Anlamı",
    variants: "Stil varyasyonları",
    variantsHint:
      "16 farklı stil hazır. Beğendiğin stile dokunarak panoya kopyala; oyun, profil ve sosyal medyada kullan.",
    category: "Kategori",
    themes: "Temalar",
    popularity: "Popülerlik",
    favorites: "Favoriler",
    language: "Dil",
    languageName: "Türkçe",
    suitableFor: "Uygun olduğu yerler",
    sameCategory: "Aynı Kategori",
    similarThemes: "Benzer Temalar",
    saves: (n: number) => `${n} kayıt`,
    copy: "Kopyala",
    share: "Paylaş",
    copied: "✓ Panoya kopyalandı",
    linkCopied: "Bağlantı kopyalandı!",
    adLabel: "Reklam Alanı",
  },
  en: {
    back: "Back to categories",
    meaning: "Meaning",
    variants: "Style variations",
    variantsHint:
      "16 distinct styles ready. Tap any style to copy it; use it across games, profiles and social media.",
    category: "Category",
    themes: "Themes",
    popularity: "Popularity",
    favorites: "Favorites",
    language: "Language",
    languageName: "English",
    suitableFor: "Suitable For",
    sameCategory: "Same Category",
    similarThemes: "Similar Themes",
    saves: (n: number) => `${n} saves`,
    copy: "Copy",
    share: "Share",
    copied: "✓ Copied to clipboard",
    linkCopied: "Link copied!",
    adLabel: "Advertisement",
  },
};

function RelatedSection({
  emoji,
  title,
  items,
  listBase,
}: {
  emoji: string;
  title: string;
  items: Nickname[];
  listBase: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="card-base p-5">
      <h2 className="flex items-center gap-2 text-base font-semibold">
        <span aria-hidden="true">{emoji}</span>
        {title}
      </h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((n) => (
          <Link
            key={n.slug}
            href={`${listBase}/${n.slug}`}
            className="focus-ring inline-flex items-center rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink hover:border-accent/40 hover:text-accent"
          >
            {n.base}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function NickDetail({
  item,
  locale,
  listBase,
  sameCategory,
  similar,
}: NickDetailProps) {
  const t = T[locale];
  const categoryLabel = getCategoryLabel(locale, item.category);
  const color = getCategoryColor(item.category);
  const themes = getNickThemes(locale, item.category);
  const stats = getNickStats(item);
  const suitableFor = getSuitableFor(locale);
  const categoryHref = `${listBase}/${locale === "tr" ? "kategori" : "category"}/${item.category}`;

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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col gap-6">
        <div className="card-base p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link
                href={categoryHref}
                className={`focus-ring inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-opacity hover:opacity-80 ${color.badge}`}
              >
                {categoryLabel}
              </Link>
              <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                {item.base}
              </h1>
            </div>
            <SavedButton
              item={{
                id: item.id,
                kind: "nick",
                label: item.base,
                sublabel: categoryLabel,
                locale,
                href: `${listBase}/${item.slug}`,
              }}
            />
          </div>

          <p className="mt-4 text-base leading-relaxed text-muted">{item.meaning}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <CopyButton value={item.base} label={t.copy} toastMessage={t.copied} />
            <ShareButton
              title={item.base}
              text={item.meaning}
              label={t.share}
              copiedMessage={t.linkCopied}
            />
          </div>

          <dl className="mt-6 flex flex-col divide-y divide-line border-t border-line">
            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="flex items-center gap-1.5 text-sm text-muted">
                <span aria-hidden="true">🏷</span>
                {t.category}
              </dt>
              <dd>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${color.badge}`}>
                  {categoryLabel}
                </span>
              </dd>
            </div>

            {themes.length > 0 && (
              <div className="flex items-start justify-between gap-4 py-3">
                <dt className="flex items-center gap-1.5 text-sm text-muted">
                  <span aria-hidden="true">🎭</span>
                  {t.themes}
                </dt>
                <dd className="flex flex-wrap justify-end gap-x-2 gap-y-1 text-sm font-medium text-ink">
                  {themes.map((theme, i) => (
                    <span key={theme} className="inline-flex items-center gap-1.5">
                      {i > 0 && <span className="text-line" aria-hidden="true">•</span>}
                      {theme}
                    </span>
                  ))}
                </dd>
              </div>
            )}

            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="flex items-center gap-1.5 text-sm text-muted">
                <span aria-hidden="true">⭐</span>
                {t.popularity}
              </dt>
              <dd className="text-sm font-semibold text-ink">{stats.popularity}/100</dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="flex items-center gap-1.5 text-sm text-muted">
                <span aria-hidden="true">❤️</span>
                {t.favorites}
              </dt>
              <dd className="text-sm font-semibold text-ink">{t.saves(stats.favorites)}</dd>
            </div>

            <div className="flex items-center justify-between gap-4 py-3">
              <dt className="flex items-center gap-1.5 text-sm text-muted">
                <span aria-hidden="true">🌐</span>
                {t.language}
              </dt>
              <dd className="text-sm font-semibold text-ink">{t.languageName}</dd>
            </div>

            <div className="flex items-start justify-between gap-4 py-3">
              <dt className="flex items-center gap-1.5 text-sm text-muted">
                <span aria-hidden="true">🎮</span>
                {t.suitableFor}
              </dt>
              <dd className="flex flex-wrap justify-end gap-1.5">
                {suitableFor.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-0.5 text-xs font-medium text-ink"
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${color.dot}`} aria-hidden="true" />
                    {s}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <div
          className={`relative flex min-h-[180px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-line/60 p-8 text-center ${color.tint}`}
        >
          <div className="pointer-events-none absolute -right-4 -top-5 text-7xl opacity-10" aria-hidden="true">
            ✦
          </div>
          <div className="pointer-events-none absolute -bottom-6 -left-4 text-7xl opacity-10" aria-hidden="true">
            ☾
          </div>
          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${color.badge}`}>
            {categoryLabel}
          </span>
          <p className={`text-2xl font-bold tracking-tight sm:text-3xl ${color.text}`}>
            ★彡 {item.base} 彡★
          </p>
          <p className="text-sm text-muted">{themes.join(" • ")}</p>
        </div>

        <InternalPromoBanner seed={`nick-side-${item.slug}`} locale={locale} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">{t.variants}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.variantsHint}</p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {item.variants.map((variant) => (
              <li
                key={variant.style}
                className={`flex items-center justify-between gap-3 rounded-xl border border-line/50 px-4 py-2.5 ${color.tint}`}
              >
                <div className="min-w-0">
                  <div className="text-xs text-muted">{variant.style}</div>
                  <div className={`truncate text-base font-medium ${color.text}`}>{variant.value}</div>
                </div>
                <CopyButton
                  value={variant.value}
                  label={t.copy}
                  toastMessage={t.copied}
                  iconOnly
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <InternalPromoBanner seed={`nick-${item.slug}`} locale={locale} />
        <RelatedSection emoji="🌙" title={t.sameCategory} items={sameCategory} listBase={listBase} />
        <RelatedSection emoji="🍂" title={t.similarThemes} items={similar} listBase={listBase} />
      </div>
    </div>
  );
}
