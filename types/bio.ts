import type { Locale } from "@/types/common";

export type BioPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "whatsapp"
  | "linkedin"
  | "twitter";

export interface Bio {
  id: string;
  /** SEO dostu, dile özgü benzersiz slug. */
  slug: string;
  text: string;
  language: Locale;
  /** Platform id'si (bkz. BIO_PLATFORMS). */
  platform: BioPlatform;
  /** Kategori id'si (bkz. BIO_CATEGORIES). */
  category: string;
}

export interface BioCategoryDef {
  id: string;
  label: string;
}

export interface BioPlatformDef {
  id: BioPlatform;
  label: string;
}
