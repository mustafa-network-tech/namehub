import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import UsernameExplorer from "@/components/username/UsernameExplorer";
import { buildMetadata } from "@/lib/seo";
import {
  USERNAME_CATEGORIES,
  findCategory,
  getUsernamesByCategory,
  getCategoryDescription,
} from "@/lib/usernames";

export function generateStaticParams() {
  return USERNAME_CATEGORIES.tr.map((c) => ({ cat: c.id }));
}

export function generateMetadata({
  params,
}: {
  params: { cat: string };
}): Metadata {
  const cat = findCategory("tr", params.cat);
  if (!cat) return { title: "Bulunamadı • NameHub" };
  return buildMetadata({
    title: `${cat.label} Kullanıcı Adları`,
    description: getCategoryDescription("tr", cat.id),
    locale: "tr",
  });
}

export default function UsernameCategoryPage({
  params,
}: {
  params: { cat: string };
}) {
  const cat = findCategory("tr", params.cat);
  if (!cat) notFound();

  const items = getUsernamesByCategory("tr", cat.id);

  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {cat.label} Kullanıcı Adları
        </h1>
        <p className="mt-2 text-muted">{getCategoryDescription("tr", cat.id)}</p>
      </header>

      <div className="mt-8">
        <UsernameExplorer items={items} locale="tr" showCategoryFilter={false} />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed={`user-cat-${cat.id}`} locale="tr" />
      </div>
    </main>
  );
}
