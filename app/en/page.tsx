import type { Metadata } from "next";
import HeroSearch from "@/components/home/HeroSearch";
import StatsStrip from "@/components/home/StatsStrip";
import PopularSearches from "@/components/home/PopularSearches";
import CategoryGrid from "@/components/home/CategoryGrid";
import HomeSection from "@/components/home/HomeSection";
import TrustSection from "@/components/home/TrustSection";
import BabyNameCard from "@/components/cards/BabyNameCard";
import PetNameCard from "@/components/cards/PetNameCard";
import NickCard from "@/components/cards/NickCard";
import BioCard from "@/components/cards/BioCard";
import BrandCard from "@/components/cards/BrandCard";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import { buildMetadata } from "@/lib/seo";
import { pickOnePerAnimal } from "@/lib/sampleNames";
import { enBabyGirlNames } from "@/data/en/baby-girl-names";
import { enBabyBoyNames } from "@/data/en/baby-boy-names";
import { enPetNames } from "@/data/en/pet-names";
import { enNicknames } from "@/data/en/nicknames";
import { enBios } from "@/data/en/bios";
import { enBrandNames } from "@/data/en/brand-names";

export const metadata: Metadata = buildMetadata({
  title: "The Center of Names and Digital Identity",
  description:
    "Baby names, pet names, nicknames, usernames, bio ideas and brand names — all in one platform.",
  locale: "en",
});

// 2 girls + 2 boys mixed sample (4 cards in a row)
const babyNames = [...enBabyGirlNames.slice(0, 2), ...enBabyBoyNames.slice(0, 2)];
// One sample per animal type
const petNames = pickOnePerAnimal(enPetNames);
const nickNames = enNicknames.slice(0, 4);
const bioItems = enBios.slice(0, 4);
const brandItems = enBrandNames.slice(0, 4);

export default function EnHomePage() {
  return (
    <>
      <HeroSearch locale="en" />

      <StatsStrip locale="en" />

      <PopularSearches locale="en" />

      <HomeSection title="Categories" subtitle="Everything you need in one place">
        <CategoryGrid locale="en" />
      </HomeSection>

      <div className="container-page">
        <InternalPromoBanner seed="home" locale="en" />
      </div>

      <HomeSection
        title="Example Baby Names"
        subtitle="Names that stand out with meaning and origin"
        actionLabel="View all"
        actionHref="/en/baby-names"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {babyNames.map((item) => (
            <BabyNameCard key={item.slug} item={item} locale="en" detailBase="/en/baby-names" />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Example Pet Names"
        subtitle="One sample for every companion"
        actionLabel="View all"
        actionHref="/en/pet-names"
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {petNames.map((item) => (
            <PetNameCard key={item.id} item={item} locale="en" />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Popular Nicknames"
        subtitle="Copy with a single tap"
        actionLabel="View all"
        actionHref="/en/nicknames"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nickNames.map((item) => (
            <NickCard key={item.id} item={item} locale="en" />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Bio Ideas"
        subtitle="Ready-to-use text for your profile"
        actionLabel="View all"
        actionHref="/en/bio-ideas"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bioItems.map((item) => (
            <BioCard key={item.id} item={item} locale="en" />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Brand / Business Names"
        subtitle="Memorable ideas by sector"
        actionLabel="View all"
        actionHref="/en/brand-names"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brandItems.map((item) => (
            <BrandCard key={item.id} item={item} locale="en" />
          ))}
        </div>
      </HomeSection>

      <TrustSection locale="en" />
    </>
  );
}
