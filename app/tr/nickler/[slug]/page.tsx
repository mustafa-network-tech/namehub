import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NickDetail from "@/components/nick/NickDetail";
import { buildMetadata } from "@/lib/seo";
import {
  getNicknames,
  findNickname,
  getSameCategoryNicknames,
  getSimilarThemeNicknames,
  getCategoryLabel,
} from "@/lib/nicknames";

export function generateStaticParams() {
  return getNicknames("tr").map((n) => ({ slug: n.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = findNickname("tr", params.slug);
  if (!item) return { title: "Bulunamadı • NameHub" };
  return buildMetadata({
    title: `${item.base} — Nick Anlamı ve Stilleri`,
    description: `${item.base}: ${item.meaning} Kategori: ${getCategoryLabel("tr", item.category)}.`,
    locale: "tr",
  });
}

export default function NickDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = findNickname("tr", params.slug);
  if (!item) notFound();

  const sameCategory = getSameCategoryNicknames("tr", item, 6);
  const similar = getSimilarThemeNicknames("tr", item, 6);

  return (
    <NickDetail
      item={item}
      locale="tr"
      listBase="/tr/nickler"
      sameCategory={sameCategory}
      similar={similar}
    />
  );
}
