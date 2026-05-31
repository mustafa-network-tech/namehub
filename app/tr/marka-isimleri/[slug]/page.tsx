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
  return getBrands("tr").map((b) => ({ slug: b.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = findBrand("tr", params.slug);
  if (!item) return { title: "Bulunamadı • NameHub" };
  return buildMetadata({
    title: `${item.name} — Marka İsmi Anlamı`,
    description: `${item.name}: ${item.meaning} Kategori: ${getCategoryLabel("tr", item.category)}.`,
    locale: "tr",
  });
}

export default function BrandDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = findBrand("tr", params.slug);
  if (!item) notFound();

  const related = getRelatedBrands("tr", item, 9);

  return (
    <BrandDetail
      item={item}
      locale="tr"
      listBase="/tr/marka-isimleri"
      related={related}
    />
  );
}
