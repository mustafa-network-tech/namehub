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
  return getNicknames("en").map((n) => ({ slug: n.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = findNickname("en", params.slug);
  if (!item) return { title: "Not found • NameHub" };
  return buildMetadata({
    title: `${item.base} — Nickname Meaning & Styles`,
    description: `${item.base}: ${item.meaning} Category: ${getCategoryLabel("en", item.category)}.`,
    locale: "en",
  });
}

export default function NickDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = findNickname("en", params.slug);
  if (!item) notFound();

  const sameCategory = getSameCategoryNicknames("en", item, 6);
  const similar = getSimilarThemeNicknames("en", item, 6);

  return (
    <NickDetail
      item={item}
      locale="en"
      listBase="/en/nicknames"
      sameCategory={sameCategory}
      similar={similar}
    />
  );
}
