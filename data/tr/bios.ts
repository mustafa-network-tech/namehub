import { getBios } from "@/lib/bios";
import type { Bio } from "@/types/bio";

// Ölçeklenebilir veri kaynağı: lib/bios.ts içindeki kategori bazlı
// kelime bankalarından deterministik üretilir (~500 adet).
export const trBios: Bio[] = getBios("tr");
