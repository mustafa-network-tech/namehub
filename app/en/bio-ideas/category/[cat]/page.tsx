import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BioExplorer from "@/components/bio/BioExplorer";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";
import {
  BIO_CATEGORIES,
  findBioCategory,
  getBioCategoryDescription,
  getBiosByCategory,
} from "@/lib/bios";

export function generateStaticParams() {
  return BIO_CATEGORIES.en.map((c) => ({ cat: c.id }));
}

export function generateMetadata({
  params,
}: {
  params: { cat: string };
}): Metadata {
  const cat = findBioCategory("en", params.cat);
  if (!cat) return { title: "Not found • NameHub" };
  return buildMetadata({
    title: `${cat.label} Bio Ideas`,
    description: `${getBioCategoryDescription("en", cat.id)} Filter by platform, search and copy with one tap.`,
    locale: "en",
  });
}

export default function BioCategoryPage({
  params,
}: {
  params: { cat: string };
}) {
  const cat = findBioCategory("en", params.cat);
  if (!cat) notFound();

  const items = getBiosByCategory("en", cat.id);

  return (
    <main className="container-page py-8 sm:py-10">
      <Link
        href="/en/bio-ideas"
        className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Bio Library
      </Link>

      <header className="mt-4 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {cat.label} Bio Ideas
        </h1>
        <p className="mt-2 text-muted">{getBioCategoryDescription("en", cat.id)}</p>
      </header>

      <div className="mt-8">
        <BioExplorer
          items={items}
          locale="en"
          altHref="/tr/bio-onerileri"
          showCategoryFilter={false}
        />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed={`bio-cat-${cat.id}`} locale="en" />
      </div>
    </main>
  );
}
