"use client";

import { useMemo, useState } from "react";
import NickCard from "@/components/cards/NickCard";
import SearchInput from "@/components/ui/SearchInput";
import FilterBar from "@/components/ui/FilterBar";
import EmptyState from "@/components/common/EmptyState";
import { NICK_CATEGORIES, getCategoryLabel } from "@/lib/nicknames";
import type { Nickname } from "@/types/nickname";
import type { Locale } from "@/types/common";

const T = {
  tr: {
    placeholder: "Nick veya kategori ara...",
    button: "Ara",
    all: "Tümü",
    emptyTitle: "Sonuç bulunamadı",
    emptyDesc: "Farklı bir filtre veya arama terimi deneyin.",
    count: (n: number) => `${n} nick`,
  },
  en: {
    placeholder: "Search a nickname or category...",
    button: "Search",
    all: "All",
    emptyTitle: "No results found",
    emptyDesc: "Try a different filter or search term.",
    count: (n: number) => `${n} nicknames`,
  },
};

export default function NicknameExplorer({
  items,
  locale,
  showFilter = true,
}: {
  items: Nickname[];
  locale: Locale;
  showFilter?: boolean;
}) {
  const t = T[locale];
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filters = useMemo(
    () => [{ id: "all", label: t.all }, ...NICK_CATEGORIES[locale]],
    [locale, t.all]
  );

  const results = useMemo(() => {
    let list = items;
    if (category !== "all") list = list.filter((n) => n.category === category);

    const q = query.trim().toLocaleLowerCase(locale === "tr" ? "tr" : "en");
    if (q) {
      list = list.filter((n) => {
        const base = n.base.toLocaleLowerCase(locale === "tr" ? "tr" : "en");
        const cat = getCategoryLabel(locale, n.category).toLocaleLowerCase(
          locale === "tr" ? "tr" : "en"
        );
        return base.includes(q) || cat.includes(q) || n.category.includes(q);
      });
    }
    return list;
  }, [items, category, query, locale]);

  return (
    <div>
      <div className="max-w-xl">
        <SearchInput
          placeholder={t.placeholder}
          buttonLabel={t.button}
          onSearch={setQuery}
        />
      </div>

      {showFilter && (
        <div className="mt-4">
          <FilterBar options={filters} active={category} onChange={setCategory} />
        </div>
      )}

      <p className="mt-4 text-sm text-muted">{t.count(results.length)}</p>

      <div className="mt-3">
        {results.length === 0 ? (
          <EmptyState title={t.emptyTitle} description={t.emptyDesc} />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((item) => (
              <NickCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
