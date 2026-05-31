import { getBios } from "@/lib/bios";
import type { Bio } from "@/types/bio";

// Scalable data source: deterministically generated from the
// category-based word banks in lib/bios.ts (~500 items).
export const enBios: Bio[] = getBios("en");
