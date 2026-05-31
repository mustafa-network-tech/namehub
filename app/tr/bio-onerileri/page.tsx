import type { Metadata } from "next";
import BioExplorer from "@/components/bio/BioExplorer";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";
import { trBios } from "@/data/tr/bios";

export const metadata: Metadata = buildMetadata({
  title: "Bio Önerileri",
  description:
    "Instagram, TikTok, YouTube, WhatsApp, LinkedIn ve X için 500+ hazır bio. Platform ve kategoriye göre filtrele, ara, kaydet ve tek dokunuşla kopyala.",
  locale: "tr",
});

export default function BioOnerileriPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Bio Kütüphanesi
        </h1>
        <p className="mt-2 text-muted">
          Her platform ve ruh hali için hazır bio metinleri. Platforma ve
          kategoriye göre filtrele, ara, karakter sayısını gör; beğendiğini
          kaydet veya tek dokunuşla kopyala.
        </p>
      </header>

      <div className="mt-8">
        <BioExplorer items={trBios} locale="tr" altHref="/en/bio-ideas" />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="bio-landing" locale="tr" />
      </div>
    </main>
  );
}
