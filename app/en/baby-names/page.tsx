"use client";

import { useMemo, useState } from "react";
import BabyNameCard from "@/components/cards/BabyNameCard";
import SearchInput from "@/components/ui/SearchInput";
import FilterBar from "@/components/ui/FilterBar";
import Pagination from "@/components/ui/Pagination";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import EmptyState from "@/components/common/EmptyState";
import { enBabyGirlNames } from "@/data/en/baby-girl-names";
import { enBabyBoyNames } from "@/data/en/baby-boy-names";

const ALL = [...enBabyGirlNames, ...enBabyBoyNames];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "girl", label: "Girl Names" },
  { id: "boy", label: "Boy Names" },
  { id: "origin", label: "Origin" },
  { id: "popular", label: "Popular" },
];

export default function BabyNamesPage() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    let list = ALL;
    if (filter === "girl") list = list.filter((n) => n.gender === "girl");
    else if (filter === "boy") list = list.filter((n) => n.gender === "boy");
    else if (filter === "origin")
      list = [...list].sort((a, b) => a.origin.localeCompare(b.origin));
    else if (filter === "popular")
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (n) =>
          n.name.toLowerCase().includes(q) ||
          n.meaning.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, query]);

  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Baby Names
        </h1>
        <p className="mt-2 text-muted">
          Girl and boy baby names with meaning, origin and pronunciation. Save
          your favourites and explore the details.
        </p>
      </header>

      <div className="mt-6 max-w-xl">
        <SearchInput
          placeholder="Search a name or meaning..."
          buttonLabel="Search"
          onSearch={setQuery}
        />
      </div>

      <div className="mt-4">
        <FilterBar options={FILTERS} active={filter} onChange={setFilter} />
      </div>

      <div className="mt-6">
        {items.length === 0 ? (
          <EmptyState
            title="No results found"
            description="Try a different filter or search term."
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <BabyNameCard
                key={item.slug}
                item={item}
                locale="en"
                detailBase="/en/baby-names"
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <InternalPromoBanner seed="baby-landing" locale="en" />
      </div>

      <div className="mt-8">
        <Pagination current={1} total={3} />
      </div>
    </main>
  );
}
