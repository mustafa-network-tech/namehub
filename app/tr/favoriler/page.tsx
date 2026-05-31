import type { Metadata } from "next";
import FavoritesList from "@/components/ui/FavoritesList";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Favorilerim",
  description:
    "Kaydettiğin nickler ve isimler. Kopyala, kaldır veya detay sayfasına git.",
  locale: "tr",
});

export default function FavorilerPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Favorilerim
        </h1>
        <p className="mt-2 text-muted">
          Kalp ikonuna dokunarak kaydettiğin tüm öğeler burada. Tek dokunuşla
          kopyala veya kaldır.
        </p>
      </header>

      <div className="mt-8">
        <FavoritesList locale="tr" />
      </div>
    </main>
  );
}
