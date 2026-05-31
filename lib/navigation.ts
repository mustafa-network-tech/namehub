import type { Locale } from "@/types/common";

export interface NavLink {
  label: string;
  href: string;
}

export const NAV_LINKS: Record<Locale, NavLink[]> = {
  tr: [
    { label: "Bebek İsimleri", href: "/tr/bebek-isimleri" },
    { label: "Evcil Hayvan İsimleri", href: "/tr/evcil-hayvan-isimleri" },
    { label: "Nickler", href: "/tr/nickler" },
    { label: "Kullanıcı Adları", href: "/tr/kullanici-adlari" },
    { label: "Bio Önerileri", href: "/tr/bio-onerileri" },
    { label: "Marka İsimleri", href: "/tr/marka-isimleri" },
  ],
  en: [
    { label: "Baby Names", href: "/en/baby-names" },
    { label: "Pet Names", href: "/en/pet-names" },
    { label: "Nicknames", href: "/en/nicknames" },
    { label: "Usernames", href: "/en/usernames" },
    { label: "Bio Ideas", href: "/en/bio-ideas" },
    { label: "Brand Names", href: "/en/brand-names" },
  ],
};

export const FOOTER_LINKS: Record<
  Locale,
  { title: string; links: NavLink[] }[]
> = {
  tr: [
    {
      title: "Kategoriler",
      links: NAV_LINKS.tr,
    },
    {
      title: "Kurumsal",
      links: [
        { label: "Hakkımızda", href: "/tr#hakkimizda" },
        { label: "İletişim", href: "/tr#iletisim" },
        { label: "Gizlilik", href: "/tr#gizlilik" },
        { label: "Şartlar", href: "/tr#sartlar" },
      ],
    },
  ],
  en: [
    {
      title: "Categories",
      links: NAV_LINKS.en,
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/en#about" },
        { label: "Contact", href: "/en#contact" },
        { label: "Privacy", href: "/en#privacy" },
        { label: "Terms", href: "/en#terms" },
      ],
    },
  ],
};

/** Geçerli yol için diğer dile karşılık gelen yolu üretir. */
export function getLocaleFromPath(pathname: string): Locale {
  return pathname.startsWith("/en") ? "en" : "tr";
}

const PATH_MAP: Record<string, string> = {
  "/tr": "/en",
  "/en": "/tr",
  "/tr/bebek-isimleri": "/en/baby-names",
  "/en/baby-names": "/tr/bebek-isimleri",
  "/tr/evcil-hayvan-isimleri": "/en/pet-names",
  "/en/pet-names": "/tr/evcil-hayvan-isimleri",
  "/tr/kedi-isimleri": "/en/cat-names",
  "/en/cat-names": "/tr/kedi-isimleri",
  "/tr/nickler": "/en/nicknames",
  "/en/nicknames": "/tr/nickler",
  "/tr/kullanici-adlari": "/en/usernames",
  "/en/usernames": "/tr/kullanici-adlari",
  "/tr/bio-onerileri": "/en/bio-ideas",
  "/en/bio-ideas": "/tr/bio-onerileri",
  "/tr/marka-isimleri": "/en/brand-names",
  "/en/brand-names": "/tr/marka-isimleri",
  "/tr/favoriler": "/en/favorites",
  "/en/favorites": "/tr/favoriler",
};

/** Dil değiştiricinin hedef yolunu hesaplar; eşleşme yoksa dil köküne döner. */
export function getAlternatePath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/tr";
  if (PATH_MAP[clean]) return PATH_MAP[clean];
  const target: Locale = clean.startsWith("/en") ? "tr" : "en";
  return `/${target}`;
}
