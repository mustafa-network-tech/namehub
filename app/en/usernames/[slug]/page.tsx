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
  return getUsernames("en").map((u) => ({ slug: u.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = findUsername("en", params.slug);
  if (!item) return { title: "Not found • NameHub" };
  return buildMetadata({
    title: `@${item.username} — Username Idea`,
    description: `@${item.username}: a ${getCategoryLabel("en", item.category)} username. Availability score ${item.availability}/100.`,
    locale: "en",
  });
}

export default function UsernameDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = findUsername("en", params.slug);
  if (!item) notFound();

  const related = getRelatedUsernames("en", item, 8);

  return (
    <UsernameDetail
      item={item}
      locale="en"
      listBase="/en/usernames"
      related={related}
    />
  );
}
