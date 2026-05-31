import { getNicknames } from "@/lib/nicknames";
import type { Nickname } from "@/types/nickname";

// Scalable data source: deterministically generated from category-based
// word banks in lib/nicknames.ts (~300 entries).
export const enNicknames: Nickname[] = getNicknames("en");
