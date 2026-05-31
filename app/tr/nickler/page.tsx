import type { Metadata } from "next";
import NickCategoryGrid from "@/components/nick/NickCategoryGrid";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nick Kategorileri",
  description:
    "Melankolik, şiirsel, karanlık, savaşçı ve daha fazlası. Önce kategoriyi keşfet, ardından içindeki stilize nickleri ara, kaydet ve kopyala.",
  locale: "tr",
});

export default function NicklerPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Nick Kategorileri
        </h1>
        <p className="mt-2 text-muted">
          Bir nick kütüphanesi. Önce sana uygun kategoriyi seç, sonra içindeki
          nickleri keşfet. Her nick için 4 farklı stil; beğendiğine dokun,
          anında kopyala.
        </p>
      </header>

      <div className="mt-8">
        <NickCategoryGrid locale="tr" />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="nick-landing" locale="tr" />
      </div>
    </main>
  );
}
