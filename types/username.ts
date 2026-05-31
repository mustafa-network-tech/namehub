import type { Locale } from "@/types/common";

export interface Username {
  id: string;
  /** SEO dostu URL parçası. */
  slug: string;
  /** @ olmadan kullanıcı adı metni, ör. "soft.lens". */
  username: string;
  language: Locale;
  /** Kategori id'si (minimal, gaming, ...). */
  category: string;
  /** Önerilen birincil platform id'si (instagram, tiktok, ...). */
  platform: string;
  /** 0-100 arası tahmini müsaitlik skoru. */
  availability: number;
  /** Stil etiketleri, ör. ["lowercase", "short", "dotted"]. */
  styleTags: string[];
}

export interface UsernameCategoryDef {
  id: string;
  label: string;
}

export interface UsernamePlatformDef {
  id: string;
  label: string;
  /** Kart/rozet üzerinde gösterilecek kısa simge metni. */
  icon: string;
}
