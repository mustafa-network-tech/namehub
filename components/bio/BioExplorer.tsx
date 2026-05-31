"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import BioCard from "@/components/cards/BioCard";
import SearchInput from "@/components/ui/SearchInput";
import FilterBar from "@/components/ui/FilterBar";
import EmptyState from "@/components/common/EmptyState";
import {
  BIO_CATEGORIES,
  BIO_PLATFORMS,
  getBioCategoryLabel,
  getPlatformLabel,
} from "@/lib/bios";
import type { Bio } from "@/types/bio";
import type { Locale } from "@/types/common";

const T = {
  tr: {
    placeholder: "Bio, kategori veya platform ara...",
    button: "Ara",
    all: "Tümü",
    platform: "Platform",
    category: "Kategori",
    language: "Dil",
    tr: "Türkçe",
    en: "İngilizce",
    emptyTitle: "Sonuç bulunamadı",
    emptyDesc: "Farklı bir filtre veya arama terimi deneyin.",
    count: (n: number) => `${n} bio`,
  },
  en: {
    placeholder: "Search a bio, category or platform...",
    button: "Search",
    all: "All",
    platform: "Platform",
    category: "Category",
    language: "Language",
    tr: "Turkish",
    en: "English",
    emptyTitle: "No results found",
    emptyDesc: "Try a different filter or search term.",
    count: (n: number) => `${n} bios`,
  },
};

export default function BioExplorer({
  items,
  locale,
  altHref,
  showPlatformFilter = true,
  showCategoryFilter = true,
}: {
  items: Bio[];
  locale: Locale;
  altHref: string;
  showPlatformFilter?: boolean;
  showCategoryFilter?: boolean;
}) {
  const t = T[locale];
  const [platform, setPlatform] = useState("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const platformOptions = useMemo(
    () => [{ id: "all", label: t.all }, ...BIO_PLATFORMS.map((p) => ({ id: p.id, label: p.label }))],
    [t.all]
  );
  const categoryOptions = useMemo(
    () => [{ id: "all", label: t.all }, ...BIO_CATEGORIES[locale]],
    [locale, t.all]
  );

  const results = useMemo(() => {
    let list = items;
    if (showPlatformFilter && platform !== "all") list = list.filter((b) => b.platform === platform);
    if (showCategoryFilter && category !== "all") list = list.filter((b) => b.category === category);

    const q = query.trim().toLocaleLowerCase(locale === "tr" ? "tr" : "en");
    if (q) {
      list = list.filter((b) => {
        const text = b.text.toLocaleLowerCase(locale === "tr" ? "tr" : "en");
        const cat = getBioCategoryLabel(locale, b.category).toLocaleLowerCase(locale === "tr" ? "tr" : "en");
        const plat = getPlatformLabel(b.platform).toLocaleLowerCase(locale === "tr" ? "tr" : "en");
        return text.includes(q) || cat.includes(q) || plat.includes(q) || b.category.includes(q);
      });
    }
    return list;
  }, [items, platform, category, query, locale, showPlatformFilter, showCategoryFilter]);

  const langBtn = (active: boolean) =>
    `focus-ring inline-flex min-h-[40px] items-center rounded-full border px-4 text-sm font-medium transition-colors ${
      active ? "border-accent bg-accent text-white" : "border-line bg-white text-ink hover:bg-bg"
    }`;

  return (
    <div className="flex flex-col gap-5">
      <div className="max-w-xl">
        <SearchInput placeholder={t.placeholder} buttonLabel={t.button} onSearch={setQuery} />
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{t.language}</p>
        <div className="flex flex-wrap gap-2">
          <span className={langBtn(true)} aria-current="true">
            {locale === "tr" ? t.tr : t.en}
          </span>
          <Link href={altHref} className={langBtn(false)}>
            {locale === "tr" ? t.en : t.tr}
          </Link>
        </div>
      </div>

      {showPlatformFilter && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{t.platform}</p>
          <FilterBar options={platformOptions} active={platform} onChange={setPlatform} />
        </div>
      )}

      {showCategoryFilter && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{t.category}</p>
          <FilterBar options={categoryOptions} active={category} onChange={setCategory} />
        </div>
      )}

      <p className="text-sm text-muted">{t.count(results.length)}</p>

      {results.length === 0 ? (
        <EmptyState title={t.emptyTitle} description={t.emptyDesc} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item) => (
            <BioCard key={item.id} item={item} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
