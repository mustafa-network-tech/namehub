import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import BrandExplorer from "@/components/brand/BrandExplorer";
import { buildMetadata } from "@/lib/seo";
import {
  BRAND_CATEGORIES,
  findCategory,
  getBrandsByCategory,
  getCategoryDescription,
} from "@/lib/brands";

export function generateStaticParams() {
  return BRAND_CATEGORIES.en.map((c) => ({ cat: c.id }));
}

export function generateMetadata({
  params,
}: {
  params: { cat: string };
}): Metadata {
  const cat = findCategory("en", params.cat);
  if (!cat) return { title: "Not found • NameHub" };
  return buildMetadata({
    title: `${cat.label} Brand Names`,
    description: getCategoryDescription("en", cat.id),
    locale: "en",
  });
}

export default function BrandCategoryPage({
  params,
}: {
  params: { cat: string };
}) {
  const cat = findCategory("en", params.cat);
  if (!cat) notFound();

  const items = getBrandsByCategory("en", cat.id);

  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {cat.label} Brand Names
        </h1>
        <p className="mt-2 text-muted">{getCategoryDescription("en", cat.id)}</p>
      </header>

      <div className="mt-8">
        <BrandExplorer items={items} locale="en" showCategoryFilter={false} />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed={`brand-cat-${cat.id}`} locale="en" />
      </div>
    </main>
  );
}
