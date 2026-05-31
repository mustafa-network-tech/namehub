import Link from "next/link";
import BabyNameVisual from "@/components/baby/BabyNameVisual";
import BabyNameInfoTable from "@/components/baby/BabyNameInfoTable";
import RelatedNames from "@/components/baby/RelatedNames";
import CopyButton from "@/components/ui/CopyButton";
import ShareButton from "@/components/ui/ShareButton";
import SavedButton from "@/components/ui/SavedButton";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import type { BabyName } from "@/types/baby-name";
import type { Locale } from "@/types/common";

interface BabyNameDetailProps {
  item: BabyName;
  locale: Locale;
  listBase: string;
  alsoSearched: { name: string; slug: string }[];
}

const T = {
  tr: {
    back: "Bebek İsimlerine dön",
    similar: "Benzer isimler",
    middle: "Uyumlu ikinci isim önerileri",
    also: "Bunu arayanlar şunları da aradı",
    copy: "İsmi kopyala",
    share: "Paylaş",
    adLabel: "Reklam Alanı",
  },
  en: {
    back: "Back to Baby Names",
    similar: "Similar names",
    middle: "Middle name suggestions",
    also: "People who searched this also searched",
    copy: "Copy name",
    share: "Share",
    adLabel: "Advertisement",
  },
};

export default function BabyNameDetail({
  item,
  locale,
  listBase,
  alsoSearched,
}: BabyNameDetailProps) {
  const t = T[locale];

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

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <BabyNameVisual name={item.name} gender={item.gender} imageKey={item.slug} />
        </div>

        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {item.name}
            </h1>
            <SavedButton
              item={{
                id: item.slug + "-" + locale,
                kind: "baby",
                label: item.name,
                sublabel: item.origin,
                locale,
              }}
            />
          </div>
          <p className="mt-2 text-base text-muted">{item.meaning}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <CopyButton value={item.name} label={t.copy} toastMessage={locale === "tr" ? "Kopyalandı!" : "Copied!"} />
            <ShareButton
              title={item.name}
              text={item.meaning}
              label={t.share}
              copiedMessage={locale === "tr" ? "Bağlantı kopyalandı!" : "Link copied!"}
            />
          </div>

          <div className="mt-6">
            <BabyNameInfoTable item={item} locale={locale} />
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <RelatedNames title={t.similar} names={item.similar} />
        <RelatedNames title={t.middle} names={item.middleNames} variant="pill" />

        <InternalPromoBanner seed={`baby-${item.slug}`} locale={locale} />

        {alsoSearched.length > 0 && (
          <section className="card-base p-5">
            <h2 className="text-base font-semibold">{t.also}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {alsoSearched.map((n) => (
                <Link
                  key={n.slug}
                  href={`${listBase}/${n.slug}`}
                  className="focus-ring inline-flex items-center rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink hover:border-accent/40 hover:text-accent"
                >
                  {n.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
