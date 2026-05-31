import type { Locale } from "@/types/common";

export interface NickVariant {
  style: string;
  value: string;
}

export interface Nickname {
  id: string;
  /** SEO dostu, dile özgü benzersiz slug (ör. "gece-yolcusu", "shadowninja"). */
  slug: string;
  /** Ana nick metni. */
  base: string;
  language: Locale;
  /** Kategori id'si (bkz. NICK_CATEGORIES). */
  category: string;
  /** Kısa açıklama / anlam. */
  meaning: string;
  /** 4 stil varyasyonu (kopyalanabilir). */
  variants: NickVariant[];
}

export interface NickCategoryDef {
  id: string;
  label: string;
}
