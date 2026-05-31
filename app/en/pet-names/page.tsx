import type { Metadata } from "next";
import CategoryCard from "@/components/cards/CategoryCard";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";
import type { CategoryItem } from "@/types/common";

export const metadata: Metadata = buildMetadata({
  title: "Pet Names",
  description: "Cute and creative name ideas for cats, dogs, birds and more.",
  locale: "en",
});

const SUBCATEGORIES: CategoryItem[] = [
  { id: "cat", title: "Cat Names", description: "Cute and characterful cat names.", href: "/en/cat-names", emoji: "🐱", accent: "amber" },
  { id: "dog", title: "Dog Names", description: "Name ideas for your loyal friend.", href: "/en/dog-names", emoji: "🐶", accent: "blue" },
  { id: "bird", title: "Bird Names", description: "Sweet names for cheerful birds.", href: "/en/bird-names", emoji: "🐦", accent: "emerald" },
  { id: "fish", title: "Fish Names", description: "Ideas for your aquarium friends.", href: "/en/fish-names", emoji: "🐠", accent: "violet" },
  { id: "rabbit", title: "Rabbit Names", description: "Names for fluffy companions.", href: "/en/rabbit-names", emoji: "🐰", accent: "rose" },
];

export default function PetNamesPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Pet Names
        </h1>
        <p className="mt-2 text-muted">
          Which friend are you naming? Pick a category and find the perfect
          name.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SUBCATEGORIES.map((item) => (
          <CategoryCard key={item.id} item={item} locale="en" />
        ))}
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="pets" locale="en" />
      </div>
    </main>
  );
}
