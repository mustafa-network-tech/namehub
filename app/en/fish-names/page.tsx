import type { Metadata } from "next";
import PetNameCard from "@/components/cards/PetNameCard";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";
import { enPetNames } from "@/data/en/pet-names";

export const metadata: Metadata = buildMetadata({
  title: "Fish Names",
  description: "Colorful, cute and creative name ideas for your aquarium friends.",
  locale: "en",
});

export default function FishNamesPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Fish Names
        </h1>
        <p className="mt-2 text-muted">
          Copy your favourite name with one tap or save it to your vault.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {enPetNames
          .filter((item) => item.animal === "fish")
          .map((item) => (
            <PetNameCard key={item.id} item={item} locale="en" />
          ))}
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="fish" locale="en" />
      </div>
    </main>
  );
}
