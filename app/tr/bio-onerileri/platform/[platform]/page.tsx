import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BioExplorer from "@/components/bio/BioExplorer";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";
import { BIO_PLATFORMS, findPlatform, getBiosByPlatform } from "@/lib/bios";

export function generateStaticParams() {
  return BIO_PLATFORMS.map((p) => ({ platform: p.id }));
}

export function generateMetadata({
  params,
}: {
  params: { platform: string };
}): Metadata {
  const p = findPlatform(params.platform);
  if (!p) return { title: "Bulunamadı • NameHub" };
  return buildMetadata({
    title: `${p.label} Bio Önerileri`,
    description: `${p.label} için kategoriye göre düzenlenmiş, kopyalanabilir bio metinleri. Ara, kaydet ve tek dokunuşla kopyala.`,
    locale: "tr",
  });
}

export default function BioPlatformPage({
  params,
}: {
  params: { platform: string };
}) {
  const p = findPlatform(params.platform);
  if (!p) notFound();

  const items = getBiosByPlatform("tr", p.id);

  return (
    <main className="container-page py-8 sm:py-10">
      <Link
        href="/tr/bio-onerileri"
        className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Bio Kütüphanesi
      </Link>

      <header className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {p.label} Bio Önerileri
        </h1>
        <p className="mt-2 text-muted">
          {p.label} profilin için hazır bio metinleri. Kategoriye göre filtrele,
          ara ve kopyala.
        </p>
      </header>

      <div className="mt-8">
        <BioExplorer
          items={items}
          locale="tr"
          altHref={`/en/bio-ideas/platform/${p.id}`}
          showPlatformFilter={false}
        />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed={`bio-plat-${p.id}`} locale="tr" />
      </div>
    </main>
  );
}
