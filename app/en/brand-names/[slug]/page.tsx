import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BrandDetail from "@/components/brand/BrandDetail";
import { buildMetadata } from "@/lib/seo";
import {
  getBrands,
  findBrand,
  getRelatedBrands,
  getCategoryLabel,
} from "@/lib/brands";

export function generateStaticParams() {
  return getBrands("en").map((b) => ({ slug: b.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = findBrand("en", params.slug);
  if (!item) return { title: "Not found • NameHub" };
  return buildMetadata({
    title: `${item.name} — Brand Name Meaning`,
    description: `${item.name}: ${item.meaning} Category: ${getCategoryLabel("en", item.category)}.`,
    locale: "en",
  });
}

export default function BrandDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = findBrand("en", params.slug);
  if (!item) notFound();

  const related = getRelatedBrands("en", item, 9);

  return (
    <BrandDetail
      item={item}
      locale="en"
      listBase="/en/brand-names"
      related={related}
    />
  );
}
