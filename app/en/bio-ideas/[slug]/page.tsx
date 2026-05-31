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
  return getBios("en").map((b) => ({ slug: b.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = findBio("en", params.slug);
  if (!item) return { title: "Not found • NameHub" };
  return buildMetadata({
    title: `${item.text}`,
    description: `A ${getBioCategoryLabel("en", item.category)} bio for ${getPlatformLabel(item.platform)}: "${item.text}" — copy and share.`,
    locale: "en",
  });
}

export default function BioDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = findBio("en", params.slug);
  if (!item) notFound();

  const sameCategory = getSameCategoryBios("en", item, 6);
  const related = getRelatedBios("en", item, 6);

  return (
    <BioDetail
      item={item}
      locale="en"
      listBase="/en/bio-ideas"
      sameCategory={sameCategory}
      related={related}
    />
  );
}
