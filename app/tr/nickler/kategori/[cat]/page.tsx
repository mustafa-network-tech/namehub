import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import NicknameExplorer from "@/components/nick/NicknameExplorer";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";
import {
  NICK_CATEGORIES,
  findCategory,
  getCategoryDescription,
  getNicknamesByCategory,
} from "@/lib/nicknames";

export function generateStaticParams() {
  return NICK_CATEGORIES.tr.map((c) => ({ cat: c.id }));
}

export function generateMetadata({
  params,
}: {
  params: { cat: string };
}): Metadata {
  const cat = findCategory("tr", params.cat);
  if (!cat) return { title: "Bulunamadı • NameHub" };
  return buildMetadata({
    title: `${cat.label} Nickler`,
    description: `${getCategoryDescription("tr", cat.id)} Stilize ${cat.label.toLocaleLowerCase("tr")} nickleri ara, kaydet ve tek dokunuşla kopyala.`,
    locale: "tr",
  });
}

export default function NickCategoryPage({
  params,
}: {
  params: { cat: string };
}) {
  const cat = findCategory("tr", params.cat);
  if (!cat) notFound();

  const items = getNicknamesByCategory("tr", cat.id);

  return (
    <main className="container-page py-8 sm:py-10">
      <Link
        href="/tr/nickler"
        className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Tüm kategoriler
      </Link>

      <header className="mt-4 max-w-2xl">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {cat.label} Nickler
          </h1>
          <span className="rounded-full bg-bg px-3 py-1 text-sm font-semibold text-ink">
            {items.length} Nick
          </span>
        </div>
        <p className="mt-2 text-muted">{getCategoryDescription("tr", cat.id)}</p>
      </header>

      <div className="mt-8">
        <NicknameExplorer items={items} locale="tr" showFilter={false} />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed={`nick-cat-${cat.id}`} locale="tr" />
      </div>
    </main>
  );
}
