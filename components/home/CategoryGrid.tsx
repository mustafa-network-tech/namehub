import CategoryCard from "@/components/cards/CategoryCard";
import type { CategoryItem, Locale } from "@/types/common";

export const HOME_CATEGORIES: Record<Locale, CategoryItem[]> = {
  tr: [
    { id: "c-baby", title: "Bebek İsimleri", description: "Anlamı ve kökeniyle kız & erkek bebek isimleri.", href: "/tr/bebek-isimleri", emoji: "👶", accent: "blue", count: "4.200+ isim", examples: ["Aylin", "Emma", "Kerem"] },
    { id: "c-pet", title: "Evcil Hayvan İsimleri", description: "Kedi, köpek, kuş ve daha fazlası için fikirler.", href: "/tr/evcil-hayvan-isimleri", emoji: "🐾", accent: "emerald", count: "1.850+ isim", examples: ["Pamuk", "Boncuk", "Luna"] },
    { id: "c-nick", title: "Oyun Nickleri", description: "Stilize, havalı ve kopyalanabilir nick fikirleri.", href: "/tr/nickler", emoji: "🎮", accent: "violet", count: "1.000+ nick", examples: ["ShadowNinja", "DarkWolf", "NovaX"] },
    { id: "c-user", title: "Sosyal Medya Kullanıcı Adları", description: "Instagram, TikTok, YouTube ve Discord için.", href: "/tr/kullanici-adlari", emoji: "✨", accent: "rose", count: "2.000+ kullanıcı adı", examples: ["PixelDream", "SkyNova", "WildFrame"] },
    { id: "c-bio", title: "Bio Önerileri", description: "Platformlara uygun hazır bio metinleri.", href: "/tr/bio-onerileri", emoji: "📝", accent: "amber", count: "800+ bio", examples: ["Minimalist", "Creator", "Traveler"] },
    { id: "c-brand", title: "Marka / İşletme İsimleri", description: "Sektöre göre akılda kalıcı marka isimleri.", href: "/tr/marka-isimleri", emoji: "🏷️", accent: "slate", count: "500+ marka fikri", examples: ["CreativeLab", "Nexora", "Lumixa"] },
  ],
  en: [
    { id: "c-baby", title: "Baby Names", description: "Girl & boy baby names with meaning and origin.", href: "/en/baby-names", emoji: "👶", accent: "blue", count: "4,200+ names", examples: ["Aylin", "Emma", "Kerem"] },
    { id: "c-pet", title: "Pet Names", description: "Ideas for cats, dogs, birds and more.", href: "/en/pet-names", emoji: "🐾", accent: "emerald", count: "1,850+ names", examples: ["Pamuk", "Boncuk", "Luna"] },
    { id: "c-nick", title: "Gaming Nicknames", description: "Stylish, cool and copyable nickname ideas.", href: "/en/nicknames", emoji: "🎮", accent: "violet", count: "1,000+ nicknames", examples: ["ShadowNinja", "DarkWolf", "NovaX"] },
    { id: "c-user", title: "Social Media Usernames", description: "For Instagram, TikTok, YouTube and Discord.", href: "/en/usernames", emoji: "✨", accent: "rose", count: "2,000+ usernames", examples: ["PixelDream", "SkyNova", "WildFrame"] },
    { id: "c-bio", title: "Bio Ideas", description: "Ready-to-use bios tailored to each platform.", href: "/en/bio-ideas", emoji: "📝", accent: "amber", count: "800+ bios", examples: ["Minimalist", "Creator", "Traveler"] },
    { id: "c-brand", title: "Brand / Business Names", description: "Memorable brand names by sector.", href: "/en/brand-names", emoji: "🏷️", accent: "slate", count: "500+ brand ideas", examples: ["CreativeLab", "Nexora", "Lumixa"] },
  ],
};

export default function CategoryGrid({ locale }: { locale: Locale }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {HOME_CATEGORIES[locale].map((item) => (
        <CategoryCard key={item.id} item={item} locale={locale} />
      ))}
    </div>
  );
}
