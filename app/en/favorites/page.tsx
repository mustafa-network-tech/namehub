import type { Metadata } from "next";
import FavoritesList from "@/components/ui/FavoritesList";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "My Favorites",
  description:
    "Your saved nicknames and names. Copy, remove or open the detail page.",
  locale: "en",
});

export default function FavoritesPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          My Favorites
        </h1>
        <p className="mt-2 text-muted">
          Everything you saved with the heart icon lives here. Copy or remove
          with a single tap.
        </p>
      </header>

      <div className="mt-8">
        <FavoritesList locale="en" />
      </div>
    </main>
  );
}
