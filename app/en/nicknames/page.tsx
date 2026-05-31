import type { Metadata } from "next";
import NickCategoryGrid from "@/components/nick/NickCategoryGrid";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nickname Categories",
  description:
    "Dark, gaming, warrior, fantasy and more. Discover a category first, then browse, search and save the stylish nicknames inside it.",
  locale: "en",
});

export default function NicknamesPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Nickname Categories
        </h1>
        <p className="mt-2 text-muted">
          A nickname library. Pick the category that fits you first, then explore
          the nicknames inside. Four styles for each — tap the one you like to
          copy it instantly.
        </p>
      </header>

      <div className="mt-8">
        <NickCategoryGrid locale="en" />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="nick-landing" locale="en" />
      </div>
    </main>
  );
}
