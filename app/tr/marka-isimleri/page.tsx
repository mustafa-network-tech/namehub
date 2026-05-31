import type { Metadata } from "next";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import SectionHeader from "@/components/common/SectionHeader";
import BrandCategoryGrid from "@/components/brand/BrandCategoryGrid";
import BrandExplorer from "@/components/brand/BrandExplorer";
import { buildMetadata } from "@/lib/seo";
import { trBrandNames } from "@/data/tr/brand-names";

export const metadata: Metadata = buildMetadata({
  title: "Marka İsmi Üretici",
  description:
    "Teknoloji, AI, SaaS, ajans, sağlık, gıda ve daha fazlası için 1500+ marka ismi. Anlamı, kullanım önerileri ve benzer isimlerle bir startup isimlendirme platformu.",
  locale: "tr",
});

export default function MarkaIsimleriPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Marka İsmi Üretici
        </h1>
        <p className="mt-2 text-muted">
          1500+ marka ismi, her biri anlamı ve kullanım önerileriyle. Startup'ın,
          ajansın ya da yeni projen için akılda kalıcı ismi keşfet.
        </p>
      </header>

      <div className="mt-8">
        <SectionHeader title="Sektörler" subtitle="İşinin alanını seç" className="mb-5" />
        <BrandCategoryGrid locale="tr" base="/tr/marka-isimleri" />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="brand" locale="tr" />
      </div>

      <div className="mt-12">
        <SectionHeader title="Tüm Marka İsimleri" subtitle="Filtrele, ara ve kopyala" className="mb-5" />
        <BrandExplorer items={trBrandNames} locale="tr" />
      </div>
    </main>
  );
}
