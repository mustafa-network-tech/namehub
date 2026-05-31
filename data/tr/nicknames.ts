import { getNicknames } from "@/lib/nicknames";
import type { Nickname } from "@/types/nickname";

// Ölçeklenebilir veri kaynağı: lib/nicknames.ts içindeki kategori bazlı
// kelime bankalarından deterministik üretilir (~300 adet).
export const trNicknames: Nickname[] = getNicknames("tr");
