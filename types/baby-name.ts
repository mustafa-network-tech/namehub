export type Gender = "girl" | "boy" | "unisex";

export interface BabyName {
  slug: string;
  name: string;
  gender: Gender;
  meaning: string;
  origin: string;
  pronunciation: string;
  /** Yalnızca TR içerikte kullanılır */
  inQuran?: boolean;
  usageFeeling: string;
  style: string;
  /** EN içerikte kullanılır */
  usUkUsage?: string;
  similar: string[];
  middleNames: string[];
}
