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
  if (!p) return { title: "Not found • NameHub" };
  return buildMetadata({
    title: `${p.label} Bio Ideas`,
    description: `Copyable, category-organized bios for ${p.label}. Search, save and copy with one tap.`,
    locale: "en",
  });
}

export default function BioPlatformPage({
  params,
}: {
  params: { platform: string };
}) {
  const p = findPlatform(params.platform);
  if (!p) notFound();

  const items = getBiosByPlatform("en", p.id);

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
          {p.label} Bio Ideas
        </h1>
        <p className="mt-2 text-muted">
          Ready-made bios for your {p.label} profile. Filter by category, search
          and copy.
        </p>
      </header>

      <div className="mt-8">
        <BioExplorer
          items={items}
          locale="en"
          altHref={`/tr/bio-onerileri/platform/${p.id}`}
          showPlatformFilter={false}
        />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed={`bio-plat-${p.id}`} locale="en" />
      </div>
    </main>
  );
}
