export type Locale = "tr" | "en";

export type SavedKind =
  | "baby"
  | "pet"
  | "nick"
  | "username"
  | "bio"
  | "brand";

export interface SavedItem {
  id: string;
  kind: SavedKind;
  label: string;
  sublabel?: string;
  locale: Locale;
  href?: string;
  createdAt: number;
}

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  href: string;
  emoji: string;
  accent: "blue" | "emerald" | "violet" | "amber" | "rose" | "slate";
  /** Opsiyonel kapak görseli; varsa emoji yerine gösterilir. */
  image?: string;
  /** Kategorideki toplam içerik sayısı, ör. "4.200+ isim". */
  count?: string;
  /** Kart üzerinde gösterilecek 3 örnek giriş. */
  examples?: string[];
}
