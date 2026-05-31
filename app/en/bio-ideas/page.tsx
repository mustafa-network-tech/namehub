import type { Metadata } from "next";
import BioExplorer from "@/components/bio/BioExplorer";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";
import { enBios } from "@/data/en/bios";

export const metadata: Metadata = buildMetadata({
  title: "Bio Ideas",
  description:
    "500+ ready-made bios for Instagram, TikTok, YouTube, WhatsApp, LinkedIn and X. Filter by platform and category, search, save and copy with one tap.",
  locale: "en",
});

export default function BioIdeasPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Bio Library
        </h1>
        <p className="mt-2 text-muted">
          Ready-made bios for every platform and mood. Filter by platform and
          category, search, see the character count; save the ones you love or
          copy with one tap.
        </p>
      </header>

      <div className="mt-8">
        <BioExplorer items={enBios} locale="en" altHref="/tr/bio-onerileri" />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="bio-landing" locale="en" />
      </div>
    </main>
  );
}
