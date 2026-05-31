import type { Locale } from "@/types/common";

export interface BrandName {
  id: string;
  /** SEO dostu URL parçası. */
  slug: string;
  /** Marka adı (ör. "Lumora"). */
  name: string;
  /** Kategori id'si (tech, ai, saas, ...). */
  category: string;
  language: Locale;
  /** Markanın anlamı / çağrışımı. */
  meaning: string;
  /** Önerilen kullanım alanları. */
  usage: string[];
}

export interface BrandCategoryDef {
  id: string;
  label: string;
}
