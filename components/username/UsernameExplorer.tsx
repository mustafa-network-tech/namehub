"use client";

import { useMemo, useState } from "react";
import UsernameCard from "@/components/cards/UsernameCard";
import SearchInput from "@/components/ui/SearchInput";
import FilterBar from "@/components/ui/FilterBar";
import EmptyState from "@/components/common/EmptyState";
import {
  USERNAME_CATEGORIES,
  USERNAME_PLATFORMS,
  getCategoryLabel,
} from "@/lib/usernames";
import type { Username } from "@/types/username";
import type { Locale } from "@/types/common";

const T = {
  tr: {
    placeholder: "Kullanıcı adı veya kategori ara...",
    button: "Ara",
    all: "Tümü",
    platform: "Platform",
    category: "Kategori",
    emptyTitle: "Sonuç bulunamadı",
    emptyDesc: "Farklı bir filtre veya arama terimi deneyin.",
    count: (n: number) => `${n} kullanıcı adı`,
  },
  en: {
    placeholder: "Search a username or category...",
    button: "Search",
    all: "All",
    platform: "Platform",
    category: "Category",
    emptyTitle: "No results found",
    emptyDesc: "Try a different filter or search term.",
    count: (n: number) => `${n} usernames`,
  },
};

const PAGE_SIZE = 60;

export default function UsernameExplorer({
  items,
  locale,
  showPlatformFilter = true,
  showCategoryFilter = true,
}: {
  items: Username[];
  locale: Locale;
  showPlatformFilter?: boolean;
  showCategoryFilter?: boolean;
}) {
  const t = T[locale];
  const [platform, setPlatform] = useState("all");
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const platformFilters = useMemo(
    () => [
      { id: "all", label: t.all },
      ...USERNAME_PLATFORMS[locale].map((p) => ({ id: p.id, label: p.label })),
    ],
    [locale, t.all]
  );

  const categoryFilters = useMemo(
    () => [{ id: "all", label: t.all }, ...USERNAME_CATEGORIES[locale]],
    [locale, t.all]
  );

  const results = useMemo(() => {
    let list = items;
    if (platform !== "all") list = list.filter((u) => u.platform === platform);
    if (category !== "all") list = list.filter((u) => u.category === category);

    const q = query.trim().toLocaleLowerCase(locale === "tr" ? "tr" : "en");
    if (q) {
      list = list.filter((u) => {
        const name = u.username.toLocaleLowerCase(locale === "tr" ? "tr" : "en");
        const cat = getCategoryLabel(locale, u.category).toLocaleLowerCase(
          locale === "tr" ? "tr" : "en"
        );
        return name.includes(q) || cat.includes(q) || u.category.includes(q);
      });
    }
    return list;
  }, [items, platform, category, query, locale]);

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

      {showPlatformFilter && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
            {t.platform}
          </p>
          <FilterBar
            options={platformFilters}
            active={platform}
            onChange={(id) => {
              setPlatform(id);
              setVisible(PAGE_SIZE);
            }}
          />
        </div>
      )}

      {showCategoryFilter && (
        <div className="mt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">
            {t.category}
          </p>
          <FilterBar
            options={categoryFilters}
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
                <UsernameCard key={item.id} item={item} locale={locale} />
              ))}
            </div>
            {visible < results.length && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="btn-touch focus-ring border border-line bg-white px-6 text-ink hover:bg-bg"
                >
                  {locale === "tr" ? "Daha fazla göster" : "Show more"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
