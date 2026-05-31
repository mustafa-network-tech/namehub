import type { Metadata } from "next";
import InternalPromoBanner from "@/components/promo/InternalPromoBanner";
import SectionHeader from "@/components/common/SectionHeader";
import UsernameCategoryGrid from "@/components/username/UsernameCategoryGrid";
import UsernameExplorer from "@/components/username/UsernameExplorer";
import { buildMetadata } from "@/lib/seo";
import { trUsernames } from "@/data/tr/usernames";

export const metadata: Metadata = buildMetadata({
  title: "Kullanıcı Adları Kütüphanesi",
  description:
    "Instagram, TikTok, YouTube, X, Discord ve Twitch için 1000+ yaratıcı kullanıcı adı. Platforma ve kategoriye göre filtrele, kopyala ve kaydet.",
  locale: "tr",
});

export default function KullaniciAdlariPage() {
  return (
    <main className="container-page py-8 sm:py-10">
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Kullanıcı Adı Kütüphanesi
        </h1>
        <p className="mt-2 text-muted">
          1000+ kullanıcı adı, müsaitlik skoru ve stil etiketleriyle. Platforma
          ve kategoriye göre keşfet, beğendiğini kopyala ve kaydet.
        </p>
      </header>

      <div className="mt-8">
        <SectionHeader title="Kategoriler" subtitle="İlgini çeken alanı keşfet" className="mb-5" />
        <UsernameCategoryGrid locale="tr" base="/tr/kullanici-adlari" />
      </div>

      <div className="mt-10">
        <InternalPromoBanner seed="usernames" locale="tr" />
      </div>

      <div className="mt-12">
        <SectionHeader title="Tüm Kullanıcı Adları" subtitle="Filtrele, ara ve kopyala" className="mb-5" />
        <UsernameExplorer items={trUsernames} locale="tr" />
      </div>
    </main>
  );
}
