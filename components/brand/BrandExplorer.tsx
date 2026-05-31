"use client";

import { useMemo, useState } from "react";
import BrandCard from "@/components/cards/BrandCard";
import SearchInput from "@/components/ui/SearchInput";
import FilterBar from "@/components/ui/FilterBar";
import EmptyState from "@/components/common/EmptyState";
import { BRAND_CATEGORIES, getCategoryLabel } from "@/lib/brands";
import type { BrandName } from "@/types/brand";
import type { Locale } from "@/types/common";

const T = {
  tr: {
    placeholder: "Marka adı veya kategori ara...",
    button: "Ara",
    all: "Tümü",
    emptyTitle: "Sonuç bulunamadı",
    emptyDesc: "Farklı bir filtre veya arama terimi deneyin.",
    count: (n: number) => `${n} marka adı`,
    more: "Daha fazla göster",
  },
  en: {
    placeholder: "Search a brand name or category...",
    button: "Search",
    all: "All",
    emptyTitle: "No results found",
    emptyDesc: "Try a different filter or search term.",
    count: (n: number) => `${n} brand names`,
    more: "Show more",
  },
};

const PAGE_SIZE = 48;

export default function BrandExplorer({
  items,
  locale,
  showCategoryFilter = true,
}: {
  items: BrandName[];
  locale: Locale;
  showCategoryFilter?: boolean;
}) {
  const t = T[locale];
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filters = useMemo(
    () => [{ id: "all", label: t.all }, ...BRAND_CATEGORIES[locale]],
    [locale, t.all]
  );

  const results = useMemo(() => {
    let list = items;
    if (category !== "all") list = list.filter((b) => b.category === category);

    const q = query.trim().toLocaleLowerCase(locale === "tr" ? "tr" : "en");
    if (q) {
      list = list.filter((b) => {
        const name = b.name.toLocaleLowerCase(locale === "tr" ? "tr" : "en");
        const cat = getCategoryLabel(locale, b.category).toLocaleLowerCase(
          locale === "tr" ? "tr" : "en"
        );
        return name.includes(q) || cat.includes(q) || b.category.includes(q);
      });
    }
    return list;
  }, [items, category, query, locale]);

  const shown = results.slice(0, visible);

  return (
    <div>
      <div className="max-w-xl">
        <SearchInput
          placeholder={t.placeholder}
          buttonLabel={t.button}
          onSearch={(v) => {
            setQuery(v);
            setVisible(PAGE_SIZE);
          }}
        />
      </div>

      {showCategoryFilter && (
        <div className="mt-4">
          <FilterBar
            options={filters}
            active={category}
            onChange={(id) => {
              setCategory(id);
              setVisible(PAGE_SIZE);
            }}
          />
        </div>
      )}

      <p className="mt-4 text-sm text-muted">{t.count(results.length)}</p>

      <div className="mt-3">
        {results.length === 0 ? (
          <EmptyState title={t.emptyTitle} description={t.emptyDesc} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {shown.map((item) => (
                <BrandCard key={item.id} item={item} locale={locale} />
              ))}
            </div>
            {visible < results.length && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="btn-touch focus-ring border border-line bg-white px-6 text-ink hover:bg-bg"
                >
                  {t.more}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
