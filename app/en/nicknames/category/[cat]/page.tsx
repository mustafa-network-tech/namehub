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
  return NICK_CATEGORIES.en.map((c) => ({ cat: c.id }));
}

export function generateMetadata({
  params,
}: {
  params: { cat: string };
}): Metadata {
  const cat = findCategory("en", params.cat);
  if (!cat) return { title: "Not found • NameHub" };
  return buildMetadata({
    title: `${cat.label} Nicknames`,
    description: `${getCategoryDescription("en", cat.id)} Search, save and copy stylish ${cat.label.toLowerCase()} nicknames with one tap.`,
    locale: "en",
  });
}

export default function NickCategoryPage({
  params,
}: {
  params: { cat: string };
}) {
  const cat = findCategory("en", params.cat);
  if (!cat) notFound();

  const items = getNicknamesByCategory("en", cat.id);

  return (
    <main className="container-page py-8 sm:py-10">
      <Link
        href="/en/nicknames"
        className="focus-ring inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        All categories
      </Link>

      <header className="mt-4 max-w-2xl">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {cat.label} Nicknames
          </h1>
          <span className="rounded-full bg-bg px-3 py-1 text-sm font-semibold text-ink">
            {items.length} Nicknames
          </span>
        </div>
        <p className="mt-2 text-muted">{getCategoryDescription("en", cat.id)}</p>
      </header>

      <div className="mt-8">
        <NicknameExplorer items={items} locale="en" showFilter={false} />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed={`nick-cat-${cat.id}`} locale="en" />
      </div>
    </main>
  );
}
