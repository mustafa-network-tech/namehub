"use client";

import { useMemo, useState } from "react";
import BabyNameCard from "@/components/cards/BabyNameCard";
import SearchInput from "@/components/ui/SearchInput";
import FilterBar from "@/components/ui/FilterBar";
import Pagination from "@/components/ui/Pagination";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import EmptyState from "@/components/common/EmptyState";
import { trBabyGirlNames } from "@/data/tr/baby-girl-names";
import { trBabyBoyNames } from "@/data/tr/baby-boy-names";

const ALL = [...trBabyGirlNames, ...trBabyBoyNames];

const FILTERS = [
  { id: "all", label: "Tümü" },
  { id: "girl", label: "Kız" },
  { id: "boy", label: "Erkek" },
  { id: "origin", label: "Köken" },
  { id: "popular", label: "Popüler" },
];

export default function BebekIsimleriPage() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    let list = ALL;
    if (filter === "girl") list = list.filter((n) => n.gender === "girl");
    else if (filter === "boy") list = list.filter((n) => n.gender === "boy");
    else if (filter === "origin")
      list = [...list].sort((a, b) => a.origin.localeCompare(b.origin, "tr"));
    else if (filter === "popular")
      list = [...list].sort((a, b) => a.name.localeCompare(b.name, "tr"));

    if (query) {
      const q = query.toLocaleLowerCase("tr");
      list = list.filter(
        (n) =>
          n.name.toLocaleLowerCase("tr").includes(q) ||
          n.meaning.toLocaleLowerCase("tr").includes(q)
      );
    }
    return list;
  }, [filter, query]);

  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Bebek İsimleri
        </h1>
        <p className="mt-2 text-muted">
          Anlamı, kökeni ve okunuşuyla kız ve erkek bebek isimleri. Beğendiğin
          ismi kaydet, detay sayfasında daha fazlasını keşfet.
        </p>
      </header>

      <div className="mt-6 max-w-xl">
        <SearchInput
          placeholder="İsim veya anlam ara..."
          buttonLabel="Ara"
          onSearch={setQuery}
        />
      </div>

      <div className="mt-4">
        <FilterBar options={FILTERS} active={filter} onChange={setFilter} />
      </div>

      <div className="mt-6">
        {items.length === 0 ? (
          <EmptyState
            title="Sonuç bulunamadı"
            description="Farklı bir filtre veya arama terimi deneyin."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <BabyNameCard
                key={item.slug}
                item={item}
                locale="tr"
                detailBase="/tr/bebek-isimleri"
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <InternalPromoBanner seed="baby-landing" locale="tr" />
      </div>

      <div className="mt-8">
        <Pagination current={1} total={3} />
      </div>
    </main>
  );
}
