import type { Metadata } from "next";
import CategoryCard from "@/components/cards/CategoryCard";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";
import type { CategoryItem } from "@/types/common";

export const metadata: Metadata = buildMetadata({
  title: "Evcil Hayvan İsimleri",
  description:
    "Kedi, köpek, kuş, balık ve tavşan için sevimli ve yaratıcı isim fikirleri.",
  locale: "tr",
});

const SUBCATEGORIES: CategoryItem[] = [
  { id: "cat", title: "Kedi İsimleri", description: "Sevimli ve karakterli kedi isimleri.", href: "/tr/kedi-isimleri", emoji: "🐱", accent: "amber" },
  { id: "dog", title: "Köpek İsimleri", description: "Sadık dostların için isim fikirleri.", href: "/tr/kopek-isimleri", emoji: "🐶", accent: "blue" },
  { id: "bird", title: "Kuş İsimleri", description: "Neşeli kuşlar için tatlı isimler.", href: "/tr/kus-isimleri", emoji: "🐦", accent: "emerald" },
  { id: "fish", title: "Balık İsimleri", description: "Akvaryum dostların için fikirler.", href: "/tr/balik-isimleri", emoji: "🐠", accent: "violet" },
  { id: "rabbit", title: "Tavşan İsimleri", description: "Yumuşacık dostlar için isimler.", href: "/tr/tavsan-isimleri", emoji: "🐰", accent: "rose" },
];

export default function EvcilHayvanIsimleriPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Evcil Hayvan İsimleri
        </h1>
        <p className="mt-2 text-muted">
          Hangi dostun için isim arıyorsun? Bir kategori seç, sana en uygun
          ismi bul.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUBCATEGORIES.map((item) => (
          <CategoryCard key={item.id} item={item} locale="tr" />
        ))}
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="pets" locale="tr" />
      </div>
    </main>
  );
}
