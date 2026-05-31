import Link from "next/link";
import CopyButton from "@/components/ui/CopyButton";
import ShareButton from "@/components/ui/ShareButton";
import SavedButton from "@/components/ui/SavedButton";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { getCategoryLabel, getCategoryColor } from "@/lib/brands";
import type { BrandName } from "@/types/brand";
import type { Locale } from "@/types/common";

interface BrandDetailProps {
  item: BrandName;
  locale: Locale;
  listBase: string;
  related: BrandName[];
}

const T = {
  tr: {
    back: "Marka isimlerine dön",
    meaning: "Anlamı & Çağrışımı",
    usage: "Nerede kullanılır?",
    category: "Kategori",
    language: "Dil",
    languageName: "Türkçe",
    domainHint: "Alan adı fikri",
    related: "Benzer Marka İsimleri",
    copy: "Kopyala",
    share: "Paylaş",
    copied: "✓ Panoya kopyalandı",
    linkCopied: "Bağlantı kopyalandı!",
    tagline: "Startup'ın için akılda kalıcı bir isim.",
  },
  en: {
    back: "Back to brand names",
    meaning: "Meaning & Associations",
    usage: "Where to use",
    category: "Category",
    language: "Language",
    languageName: "English",
    domainHint: "Domain idea",
    related: "Similar Brand Names",
    copy: "Copy",
    share: "Share",
    copied: "✓ Copied to clipboard",
    linkCopied: "Link copied!",
    tagline: "A memorable name for your startup.",
  },
};

export default function BrandDetail({
  item,
  locale,
  listBase,
  related,
}: BrandDetailProps) {
  const t = T[locale];
  const categoryLabel = getCategoryLabel(locale, item.category);
  const color = getCategoryColor(item.category);
  const categoryHref = `${listBase}/${locale === "tr" ? "kategori" : "category"}/${item.category}`;
  const domain = `${item.slug.replace(/-/g, "")}.com`;

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
          {/* Marka kahramanı */}
          <div
            className={`relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-line/60 p-10 text-center ${color.tint}`}
          >
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${color.badge}`}>
              {categoryLabel}
            </span>
            <h1 className={`text-5xl font-extrabold tracking-tight sm:text-6xl ${color.text}`}>
              {item.name}
            </h1>
            <p className="text-sm text-muted">{t.tagline}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <CopyButton value={item.name} label={t.copy} toastMessage={t.copied} />
              <ShareButton
                title={item.name}
                text={item.meaning}
                label={t.share}
                copiedMessage={t.linkCopied}
              />
              <SavedButton
                item={{
                  id: item.id,
                  kind: "brand",
                  label: item.name,
                  sublabel: categoryLabel,
                  locale,
                  href: `${listBase}/${item.slug}`,
                }}
                className="border border-line bg-white"
              />
            </div>
          </div>

          <div className="card-base p-6">
            <dl className="flex flex-col divide-y divide-line">
              <div className="flex items-center justify-between gap-4 pb-3">
                <dt className="flex items-center gap-1.5 text-sm text-muted">
                  <span aria-hidden="true">🏷</span>
                  {t.category}
                </dt>
                <dd>
                  <Link
                    href={categoryHref}
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-opacity hover:opacity-80 ${color.badge}`}
                  >
                    {categoryLabel}
                  </Link>
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="flex items-center gap-1.5 text-sm text-muted">
                  <span aria-hidden="true">🌐</span>
                  {t.language}
                </dt>
                <dd className="text-sm font-semibold text-ink">{t.languageName}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 pt-3">
                <dt className="flex items-center gap-1.5 text-sm text-muted">
                  <span aria-hidden="true">🔗</span>
                  {t.domainHint}
                </dt>
                <dd className="text-sm font-semibold text-ink">{domain}</dd>
              </div>
            </dl>
          </div>

          <InternalPromoBanner seed={`brand-side-${item.slug}`} locale={locale} />
        </div>

        <div className="flex flex-col gap-6">
          <section className="card-base p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <span aria-hidden="true">💡</span>
              {t.meaning}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted">{item.meaning}</p>
          </section>

          <section className="card-base p-6">
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <span aria-hidden="true">🎯</span>
              {t.usage}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {item.usage.map((u) => (
                <li
                  key={u}
                  className="inline-flex items-center gap-1.5 rounded-full bg-bg px-3 py-1 text-sm font-medium text-ink"
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${color.dot}`} aria-hidden="true" />
                  {u}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <span aria-hidden="true">✨</span>
              {t.related}
            </h2>
            {related.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {related.map((b) => {
                  const c = getCategoryColor(b.category);
                  return (
                    <Link
                      key={b.slug}
                      href={`${listBase}/${b.slug}`}
                      className={`card-base flex items-center justify-center px-3 py-4 text-center font-semibold transition-shadow hover:shadow-soft-lg ${c.tint} ${c.text}`}
                    >
                      {b.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed={`brand-${item.slug}`} locale={locale} />
      </div>
    </div>
  );
}
