import type { Metadata } from "next";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import SectionHeader from "@/components/common/SectionHeader";
import BrandCategoryGrid from "@/components/brand/BrandCategoryGrid";
import BrandExplorer from "@/components/brand/BrandExplorer";
import { buildMetadata } from "@/lib/seo";
import { enBrandNames } from "@/data/en/brand-names";

export const metadata: Metadata = buildMetadata({
  title: "Brand Name Generator",
  description:
    "1500+ brand names for Tech, AI, SaaS, Agency, Health, Food and more. A startup naming platform with meanings, usage suggestions and similar names.",
  locale: "en",
});

export default function BrandNamesPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Brand Name Generator
        </h1>
        <p className="mt-2 text-muted">
          1500+ brand names, each with a meaning and usage suggestions. Discover a
          memorable name for your startup, agency or next project.
        </p>
      </header>

      <div className="mt-8">
        <SectionHeader title="Industries" subtitle="Pick your field" className="mb-5" />
        <BrandCategoryGrid locale="en" base="/en/brand-names" />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="brand" locale="en" />
      </div>

      <div className="mt-12">
        <SectionHeader title="All Brand Names" subtitle="Filter, search and copy" className="mb-5" />
        <BrandExplorer items={enBrandNames} locale="en" />
      </div>
    </main>
  );
}
