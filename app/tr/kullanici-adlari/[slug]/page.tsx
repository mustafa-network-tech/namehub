import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UsernameDetail from "@/components/username/UsernameDetail";
import { buildMetadata } from "@/lib/seo";
import {
  getUsernames,
  findUsername,
  getRelatedUsernames,
  getCategoryLabel,
} from "@/lib/usernames";

export function generateStaticParams() {
  return getUsernames("tr").map((u) => ({ slug: u.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = findUsername("tr", params.slug);
  if (!item) return { title: "Bulunamadı • NameHub" };
  return buildMetadata({
    title: `@${item.username} — Kullanıcı Adı Fikri`,
    description: `@${item.username}: ${getCategoryLabel("tr", item.category)} kategorisinde kullanıcı adı. Müsaitlik skoru ${item.availability}/100.`,
    locale: "tr",
  });
}

export default function UsernameDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = findUsername("tr", params.slug);
  if (!item) notFound();

  const related = getRelatedUsernames("tr", item, 8);

  return (
    <UsernameDetail
      item={item}
      locale="tr"
      listBase="/tr/kullanici-adlari"
      related={related}
    />
  );
}
