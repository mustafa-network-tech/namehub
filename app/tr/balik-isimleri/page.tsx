import type { Metadata } from "next";
import PetNameCard from "@/components/cards/PetNameCard";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";
import { trPetNames } from "@/data/tr/pet-names";

export const metadata: Metadata = buildMetadata({
  title: "Balık İsimleri",
  description: "Akvaryum dostların için renkli, sevimli ve yaratıcı balık ismi fikirleri.",
  locale: "tr",
});

export default function BalikIsimleriPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Balık İsimleri
        </h1>
        <p className="mt-2 text-muted">
          Beğendiğin ismi tek dokunuşla kopyala veya kasana kaydet.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {trPetNames
          .filter((item) => item.animal === "fish")
          .map((item) => (
            <PetNameCard key={item.id} item={item} locale="tr" />
          ))}
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="fish" locale="tr" />
      </div>
    </main>
  );
}
