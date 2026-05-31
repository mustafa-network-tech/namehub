import type { Metadata } from "next";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import SectionHeader from "@/components/common/SectionHeader";
import UsernameCategoryGrid from "@/components/username/UsernameCategoryGrid";
import UsernameExplorer from "@/components/username/UsernameExplorer";
import { buildMetadata } from "@/lib/seo";
import { enUsernames } from "@/data/en/usernames";

export const metadata: Metadata = buildMetadata({
  title: "Username Library",
  description:
    "1000+ creative usernames for Instagram, TikTok, YouTube, X, Discord and Twitch. Filter by platform and category, copy and save.",
  locale: "en",
});

export default function UsernamesPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Username Library
        </h1>
        <p className="mt-2 text-muted">
          1000+ usernames with availability scores and style tags. Explore by
          platform and category, copy and save the ones you like.
        </p>
      </header>

      <div className="mt-8">
        <SectionHeader title="Categories" subtitle="Discover an area you like" className="mb-5" />
        <UsernameCategoryGrid locale="en" base="/en/usernames" />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="usernames" locale="en" />
      </div>

      <div className="mt-12">
        <SectionHeader title="All Usernames" subtitle="Filter, search and copy" className="mb-5" />
        <UsernameExplorer items={enUsernames} locale="en" />
      </div>
    </main>
  );
}
