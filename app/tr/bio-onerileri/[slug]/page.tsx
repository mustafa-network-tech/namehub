import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BioDetail from "@/components/bio/BioDetail";
import { buildMetadata } from "@/lib/seo";
import {
  getBios,
  findBio,
  getSameCategoryBios,
  getRelatedBios,
  getBioCategoryLabel,
  getPlatformLabel,
} from "@/lib/bios";

export function generateStaticParams() {
  return getBios("tr").map((b) => ({ slug: b.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = findBio("tr", params.slug);
  if (!item) return { title: "Bulunamadı • NameHub" };
  return buildMetadata({
    title: `${item.text}`,
    description: `${getPlatformLabel(item.platform)} için ${getBioCategoryLabel("tr", item.category)} bio: "${item.text}" — kopyala ve paylaş.`,
    locale: "tr",
  });
}

export default function BioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = findBio("tr", params.slug);
  if (!item) notFound();

  const sameCategory = getSameCategoryBios("tr", item, 6);
  const related = getRelatedBios("tr", item, 6);

  return (
    <BioDetail
      item={item}
      locale="tr"
      listBase="/tr/bio-onerileri"
      sameCategory={sameCategory}
      related={related}
    />
  );
}
