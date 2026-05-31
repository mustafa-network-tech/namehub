import type { Metadata } from "next";
import PetNameCard from "@/components/cards/PetNameCard";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";
import { enPetNames } from "@/data/en/pet-names";

export const metadata: Metadata = buildMetadata({
  title: "Rabbit Names",
  description: "Sweet, cute and playful name ideas for your fluffy companion.",
  locale: "en",
});

export default function RabbitNamesPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Rabbit Names
        </h1>
        <p className="mt-2 text-muted">
          Copy your favourite name with one tap or save it to your vault.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {enPetNames
          .filter((item) => item.animal === "rabbit")
          .map((item) => (
            <PetNameCard key={item.id} item={item} locale="en" />
          ))}
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="rabbit" locale="en" />
      </div>
    </main>
  );
}
