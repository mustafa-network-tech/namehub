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
import { trBabyGirlNames } from "@/data/tr/baby-girl-names";
import { trBabyBoyNames } from "@/data/tr/baby-boy-names";
import { trPetNames } from "@/data/tr/pet-names";
import { trNicknames } from "@/data/tr/nicknames";
import { trBios } from "@/data/tr/bios";
import { trBrandNames } from "@/data/tr/brand-names";

export const metadata: Metadata = buildMetadata({
  title: "İsimlerin ve Dijital Kimliğin Merkezi",
  description:
    "Bebek isimleri, evcil hayvan isimleri, nickler, kullanıcı adları, bio önerileri ve marka isimleri tek platformda.",
  locale: "tr",
});

// 2 kız + 2 erkek karışık örnek (4 kart yan yana)
const babyNames = [...trBabyGirlNames.slice(0, 2), ...trBabyBoyNames.slice(0, 2)];
// Her hayvan türünden birer örnek
const petNames = pickOnePerAnimal(trPetNames);
const nickNames = trNicknames.slice(0, 4);
const bioItems = trBios.slice(0, 4);
const brandItems = trBrandNames.slice(0, 4);

export default function TrHomePage() {
  return (
    <>
      <HeroSearch locale="tr" />

      <StatsStrip locale="tr" />

      <PopularSearches locale="tr" />

      <HomeSection title="Kategoriler" subtitle="İhtiyacın olan her şey tek yerde">
        <CategoryGrid locale="tr" />
      </HomeSection>

      <div className="container-page">
        <InternalPromoBanner seed="home" locale="tr" />
      </div>

      <HomeSection
        title="Örnek Bebek İsimleri"
        subtitle="Anlamı ve kökeniyle öne çıkan isimler"
        actionLabel="Tümünü gör"
        actionHref="/tr/bebek-isimleri"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {babyNames.map((item) => (
            <BabyNameCard key={item.slug} item={item} locale="tr" detailBase="/tr/bebek-isimleri" />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Örnek Evcil Hayvan İsimleri"
        subtitle="Her dost için birer örnek"
        actionLabel="Tümünü gör"
        actionHref="/tr/evcil-hayvan-isimleri"
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {petNames.map((item) => (
            <PetNameCard key={item.id} item={item} locale="tr" />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Popüler Nickler"
        subtitle="Tek dokunuşla kopyala"
        actionLabel="Tümünü gör"
        actionHref="/tr/nickler"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {nickNames.map((item) => (
            <NickCard key={item.id} item={item} locale="tr" />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Bio Önerileri"
        subtitle="Profilin için hazır metinler"
        actionLabel="Tümünü gör"
        actionHref="/tr/bio-onerileri"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bioItems.map((item) => (
            <BioCard key={item.id} item={item} locale="tr" />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Marka / İşletme İsimleri"
        subtitle="Sektöre göre akılda kalıcı fikirler"
        actionLabel="Tümünü gör"
        actionHref="/tr/marka-isimleri"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brandItems.map((item) => (
            <BrandCard key={item.id} item={item} locale="tr" />
          ))}
        </div>
      </HomeSection>

      <TrustSection locale="tr" />
    </>
  );
}
