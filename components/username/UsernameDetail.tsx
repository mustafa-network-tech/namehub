import Link from "next/link";
import CopyButton from "@/components/ui/CopyButton";
import ShareButton from "@/components/ui/ShareButton";
import SavedButton from "@/components/ui/SavedButton";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import {
  getCategoryLabel,
  getCategoryColor,
  getCategoryDescription,
  getPlatformIcon,
  getPlatformLabel,
} from "@/lib/usernames";
import type { Username } from "@/types/username";
import type { Locale } from "@/types/common";

interface UsernameDetailProps {
  item: Username;
  locale: Locale;
  listBase: string;
  related: Username[];
}

const T = {
  tr: {
    back: "Kullanıcı adlarına dön",
    intro: "Bu kullanıcı adı fikrini kopyala, profilinde kullan.",
    category: "Kategori",
    platform: "Önerilen Platform",
    availability: "Müsaitlik Skoru",
    language: "Dil",
    languageName: "Türkçe",
    styleTags: "Stil Etiketleri",
    related: "Benzer Kullanıcı Adları",
    copy: "Kopyala",
    share: "Paylaş",
    copied: "✓ Panoya kopyalandı",
    linkCopied: "Bağlantı kopyalandı!",
    availabilityHint:
      "Tahmini müsaitlik skoru; gerçek durum platforma göre değişebilir.",
  },
  en: {
    back: "Back to usernames",
    intro: "Copy this username idea and use it on your profile.",
    category: "Category",
    platform: "Suggested Platform",
    availability: "Availability Score",
    language: "Language",
    languageName: "English",
    styleTags: "Style Tags",
    related: "Related Usernames",
    copy: "Copy",
    share: "Share",
    copied: "✓ Copied to clipboard",
    linkCopied: "Link copied!",
    availabilityHint:
      "Estimated availability score; actual status may vary by platform.",
  },
};

export default function UsernameDetail({
  item,
  locale,
  listBase,
  related,
}: UsernameDetailProps) {
  const t = T[locale];
  const categoryLabel = getCategoryLabel(locale, item.category);
  const color = getCategoryColor(item.category);
  const handle = `@${item.username}`;
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
                <h1 className="mt-3 break-all text-3xl font-bold tracking-tight sm:text-4xl">
                  {handle}
                </h1>
              </div>
              <SavedButton
                item={{
                  id: item.id,
                  kind: "username",
                  label: handle,
                  sublabel: categoryLabel,
                  locale,
                  href: `${listBase}/${item.slug}`,
                }}
              />
            </div>

            <p className="mt-4 text-base leading-relaxed text-muted">
              {getCategoryDescription(locale, item.category) || t.intro}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <CopyButton value={handle} label={t.copy} toastMessage={t.copied} />
              <ShareButton
                title={handle}
                text={handle}
                label={t.share}
                copiedMessage={t.linkCopied}
              />
            </div>

            <dl className="mt-6 flex flex-col divide-y divide-line border-t border-line">
              <div className="flex items-center justify-between gap-4 py-3">
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

              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="flex items-center gap-1.5 text-sm text-muted">
                  <span aria-hidden="true">📱</span>
                  {t.platform}
                </dt>
                <dd className="flex items-center gap-1.5 text-sm font-semibold text-ink">
                  <span aria-hidden="true">{getPlatformIcon(locale, item.platform)}</span>
                  {getPlatformLabel(locale, item.platform)}
                </dd>
              </div>

              <div className="py-3">
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-1.5 text-sm text-muted">
                    <span aria-hidden="true">✅</span>
                    {t.availability}
                  </dt>
                  <dd className="text-sm font-semibold text-ink">{item.availability}/100</dd>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg">
                  <div
                    className={`h-full rounded-full ${color.bar}`}
                    style={{ width: `${item.availability}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted">{t.availabilityHint}</p>
              </div>

              <div className="flex items-start justify-between gap-4 py-3">
                <dt className="flex items-center gap-1.5 text-sm text-muted">
                  <span aria-hidden="true">✨</span>
                  {t.styleTags}
                </dt>
                <dd className="flex flex-wrap justify-end gap-1.5">
                  {item.styleTags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1.5 rounded-full bg-bg px-2.5 py-0.5 text-xs font-medium text-ink"
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${color.dot}`} aria-hidden="true" />
                      {tag}
                    </span>
                  ))}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3">
                <dt className="flex items-center gap-1.5 text-sm text-muted">
                  <span aria-hidden="true">🌐</span>
                  {t.language}
                </dt>
                <dd className="text-sm font-semibold text-ink">{t.languageName}</dd>
              </div>
            </dl>
          </div>

          <div
            className={`relative flex min-h-[160px] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-line/60 p-8 text-center ${color.tint}`}
          >
            <div className="pointer-events-none absolute -right-4 -top-5 text-7xl opacity-10" aria-hidden="true">
              @
            </div>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${color.badge}`}>
              {categoryLabel}
            </span>
            <p className={`break-all text-2xl font-bold tracking-tight sm:text-3xl ${color.text}`}>
              {handle}
            </p>
            <p className="text-sm text-muted">{item.styleTags.join(" • ")}</p>
          </div>

          <InternalPromoBanner seed={`user-side-${item.slug}`} locale={locale} />
        </div>

        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold">
            <span aria-hidden="true">🔗</span>
            {t.related}
          </h2>
          {related.length > 0 ? (
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {related.map((u) => {
                const c = getCategoryColor(u.category);
                return (
                  <Link
                    key={u.slug}
                    href={`${listBase}/${u.slug}`}
                    className="card-base flex items-center justify-between gap-3 px-4 py-3 transition-shadow hover:shadow-soft-lg"
                  >
                    <span className="min-w-0 truncate font-medium text-ink">@{u.username}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${c.badge}`}>
                      {u.availability}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed={`user-${item.slug}`} locale={locale} />
      </div>
    </div>
  );
}
