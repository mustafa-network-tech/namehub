import type { Locale } from "@/types/common";
import type {
  Username,
  UsernameCategoryDef,
  UsernamePlatformDef,
} from "@/types/username";

/* -------------------------------------------------------------------------- */
/* Platformlar                                                                */
/* -------------------------------------------------------------------------- */

export const USERNAME_PLATFORMS: Record<Locale, UsernamePlatformDef[]> = {
  tr: [
    { id: "instagram", label: "Instagram", icon: "📸" },
    { id: "tiktok", label: "TikTok", icon: "🎵" },
    { id: "youtube", label: "YouTube", icon: "▶️" },
    { id: "x", label: "X", icon: "✖️" },
    { id: "discord", label: "Discord", icon: "💬" },
    { id: "twitch", label: "Twitch", icon: "🎮" },
  ],
  en: [
    { id: "instagram", label: "Instagram", icon: "📸" },
    { id: "tiktok", label: "TikTok", icon: "🎵" },
    { id: "youtube", label: "YouTube", icon: "▶️" },
    { id: "x", label: "X", icon: "✖️" },
    { id: "discord", label: "Discord", icon: "💬" },
    { id: "twitch", label: "Twitch", icon: "🎮" },
  ],
};

const PLATFORM_IDS = ["instagram", "tiktok", "youtube", "x", "discord", "twitch"];

export function getPlatformLabel(locale: Locale, id: string): string {
  return USERNAME_PLATFORMS[locale].find((p) => p.id === id)?.label ?? id;
}

export function getPlatformIcon(locale: Locale, id: string): string {
  return USERNAME_PLATFORMS[locale].find((p) => p.id === id)?.icon ?? "🌐";
}

/* -------------------------------------------------------------------------- */
/* Kategoriler                                                                */
/* -------------------------------------------------------------------------- */

const CATEGORY_IDS = [
  "minimal",
  "photography",
  "gaming",
  "tech",
  "creator",
  "travel",
  "dark",
  "aesthetic",
  "professional",
  "funny",
  "modern",
];

export const USERNAME_CATEGORIES: Record<Locale, UsernameCategoryDef[]> = {
  tr: [
    { id: "minimal", label: "Minimal" },
    { id: "photography", label: "Fotoğraf" },
    { id: "gaming", label: "Oyun" },
    { id: "tech", label: "Teknoloji" },
    { id: "creator", label: "İçerik Üretici" },
    { id: "travel", label: "Gezgin" },
    { id: "dark", label: "Karanlık" },
    { id: "aesthetic", label: "Estetik" },
    { id: "professional", label: "Profesyonel" },
    { id: "funny", label: "Komik" },
    { id: "modern", label: "Modern" },
  ],
  en: [
    { id: "minimal", label: "Minimal" },
    { id: "photography", label: "Photography" },
    { id: "gaming", label: "Gaming" },
    { id: "tech", label: "Tech" },
    { id: "creator", label: "Creator" },
    { id: "travel", label: "Travel" },
    { id: "dark", label: "Dark" },
    { id: "aesthetic", label: "Aesthetic" },
    { id: "professional", label: "Professional" },
    { id: "funny", label: "Funny" },
    { id: "modern", label: "Modern" },
  ],
};

export function getCategoryLabel(locale: Locale, id: string): string {
  return USERNAME_CATEGORIES[locale].find((c) => c.id === id)?.label ?? id;
}

export function findCategory(
  locale: Locale,
  id: string
): UsernameCategoryDef | undefined {
  return USERNAME_CATEGORIES[locale].find((c) => c.id === id);
}

const CATEGORY_DESC: Record<Locale, Record<string, string>> = {
  tr: {
    minimal: "Sade, kısa ve şık kullanıcı adları.",
    photography: "Fotoğrafçılar ve görsel üreticiler için isimler.",
    gaming: "Oyuncular ve yayıncılar için enerjik kullanıcı adları.",
    tech: "Yazılım, teknoloji ve geliştiriciler için isimler.",
    creator: "İçerik üreticileri ve influencer'lar için isimler.",
    travel: "Gezginler ve doğa tutkunları için isimler.",
    dark: "Gizemli, karanlık ve havalı kullanıcı adları.",
    aesthetic: "Yumuşak, estetik ve dikkat çekici isimler.",
    professional: "Kurumsal ve profesyonel duruşlu isimler.",
    funny: "Eğlenceli ve akılda kalıcı kullanıcı adları.",
    modern: "Güncel, teknolojik ve modern isimler.",
  },
  en: {
    minimal: "Clean, short and stylish usernames.",
    photography: "Names for photographers and visual creators.",
    gaming: "Energetic usernames for gamers and streamers.",
    tech: "Names for software, tech and developers.",
    creator: "Names for content creators and influencers.",
    travel: "Names for travelers and nature lovers.",
    dark: "Mysterious, dark and cool usernames.",
    aesthetic: "Soft, aesthetic and eye-catching names.",
    professional: "Corporate and professional looking names.",
    funny: "Fun and memorable usernames.",
    modern: "Contemporary, tech-forward and modern names.",
  },
};

export function getCategoryDescription(locale: Locale, id: string): string {
  return CATEGORY_DESC[locale][id] ?? "";
}

/* -------------------------------------------------------------------------- */
/* Slug                                                                       */
/* -------------------------------------------------------------------------- */

const TR_MAP: Record<string, string> = {
  ş: "s", Ş: "s", ı: "i", İ: "i", ğ: "g", Ğ: "g",
  ü: "u", Ü: "u", ö: "o", Ö: "o", ç: "c", Ç: "c",
};

function slugify(text: string): string {
  return text
    .replace(/[şŞıİğĞüÜöÖçÇ]/g, (ch) => TR_MAP[ch] ?? ch)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/* -------------------------------------------------------------------------- */
/* Kelime bankaları (kategori bazlı önek + sonek)                             */
/* -------------------------------------------------------------------------- */

interface Bank {
  id: string;
  prefixes: string[];
  suffixes: string[];
}

// İngilizce ve Türkçe için ortak, handle dostu (ASCII) kelime bankaları.
const EN_BANKS: Bank[] = [
  { id: "minimal", prefixes: ["just", "only", "pure", "mono", "soft", "the", "less", "plain", "bare", "calm"], suffixes: ["one", "co", "dot", "line", "form", "type", "ish", "lab", "set", "ly"] },
  { id: "photography", prefixes: ["lens", "frame", "shot", "photo", "focus", "iso", "light", "aperture", "shutter", "grain"], suffixes: ["works", "studio", "diary", "frames", "film", "story", "house", "club", "media", "shots"] },
  { id: "gaming", prefixes: ["shadow", "ghost", "rage", "neo", "venom", "frost", "blaze", "storm", "pixel", "cyber"], suffixes: ["gg", "plays", "ttv", "gamer", "squad", "arena", "main", "clutch", "rush", "fps"] },
  { id: "tech", prefixes: ["dev", "byte", "code", "cloud", "stack", "data", "logic", "node", "kernel", "binary"], suffixes: ["dev", "io", "labs", "stack", "ware", "ops", "hub", "sys", "core", "ai"] },
  { id: "creator", prefixes: ["daily", "the", "make", "create", "studio", "tell", "real", "your", "go", "by"], suffixes: ["creates", "media", "studio", "daily", "vibes", "diary", "tales", "world", "tv", "hq"] },
  { id: "travel", prefixes: ["wander", "roam", "nomad", "trek", "drift", "voyage", "globe", "trail", "far", "wild"], suffixes: ["lust", "trail", "roads", "diary", "steps", "map", "world", "tales", "miles", "soul"] },
  { id: "dark", prefixes: ["void", "raven", "noir", "ash", "dusk", "grim", "onyx", "ember", "hollow", "crow"], suffixes: ["soul", "veil", "shade", "fall", "core", "mist", "thorn", "wraith", "abyss", "night"] },
  { id: "aesthetic", prefixes: ["pastel", "soft", "dreamy", "misty", "petal", "honey", "luna", "velour", "bloom", "hush"], suffixes: ["aura", "bloom", "haze", "glow", "muse", "petal", "core", "dust", "tone", "dew"] },
  { id: "professional", prefixes: ["mr", "ms", "the", "real", "official", "prime", "pro", "studio", "atelier", "house"], suffixes: ["co", "studio", "group", "works", "consult", "agency", "official", "global", "partners", "hq"] },
  { id: "funny", prefixes: ["lazy", "crazy", "funky", "goofy", "silly", "chubby", "sleepy", "spicy", "wonky", "derp"], suffixes: ["panda", "potato", "llama", "taco", "noodle", "penguin", "duck", "toast", "ferret", "waffle"] },
  { id: "modern", prefixes: ["neo", "vapor", "quantum", "matrix", "nova", "vertex", "hyper", "axis", "flux", "zenith"], suffixes: ["x", "core", "lab", "net", "sync", "verse", "flow", "wave", "node", "ly"] },
];

const TR_BANKS: Bank[] = [
  { id: "minimal", prefixes: ["sade", "az", "saf", "ince", "duz", "net", "tek", "mono", "yalin", "dingin"], suffixes: ["co", "nokta", "cizgi", "form", "ton", "iz", "an", "lab", "kare", "set"] },
  { id: "photography", prefixes: ["kare", "kadraj", "isik", "obje", "lens", "an", "poz", "gri", "siyah", "deklanşor"], suffixes: ["foto", "studyo", "atolye", "gunluk", "kareler", "hikaye", "ev", "kulup", "anlar", "film"] },
  { id: "gaming", prefixes: ["golge", "hayalet", "ofke", "neon", "zehir", "ayaz", "alev", "firtina", "piksel", "siber"], suffixes: ["oyun", "yayin", "ttv", "gamer", "ekip", "arena", "main", "rush", "klan", "fps"] },
  { id: "tech", prefixes: ["dev", "bayt", "kod", "bulut", "veri", "mantik", "dugum", "cekirdek", "ag", "sistem"], suffixes: ["dev", "io", "lab", "yazilim", "ware", "ops", "merkez", "sys", "core", "ai"] },
  { id: "creator", prefixes: ["gunluk", "uret", "anlat", "studyo", "gercek", "senin", "hadi", "ile", "kanal", "her"], suffixes: ["uretir", "medya", "studyo", "gunluk", "vibe", "gunce", "hikaye", "dunya", "tv", "merkez"] },
  { id: "travel", prefixes: ["gezgin", "yolcu", "kasif", "rota", "savrul", "sefer", "kure", "patika", "uzak", "yaban"], suffixes: ["tutku", "rota", "yollar", "gunluk", "adim", "harita", "dunya", "hikaye", "km", "ruh"] },
  { id: "dark", prefixes: ["bosluk", "kuzgun", "kara", "kul", "alacakaranlik", "asık", "onyx", "kor", "loş", "puhu"], suffixes: ["ruh", "perde", "golge", "dusus", "core", "sis", "diken", "hayalet", "ucurum", "gece"] },
  { id: "aesthetic", prefixes: ["pastel", "soft", "ruya", "puslu", "yaprak", "bal", "ay", "kadife", "tomurcuk", "fisilti"], suffixes: ["aura", "bloom", "haze", "glow", "ilham", "petal", "core", "toz", "ton", "cig"] },
  { id: "professional", prefixes: ["bay", "bayan", "resmi", "gercek", "prime", "pro", "studyo", "atolye", "ofis", "ev"], suffixes: ["co", "studyo", "grup", "works", "danismanlik", "ajans", "resmi", "global", "ortaklar", "merkez"] },
  { id: "funny", prefixes: ["tembel", "cilgin", "komik", "sapsal", "sevimli", "tombis", "uykucu", "acayip", "garip", "afacan"], suffixes: ["panda", "patates", "lama", "taco", "eriste", "penguen", "ordek", "tost", "gelincik", "kofte"] },
  { id: "modern", prefixes: ["neo", "vektor", "kuantum", "matriks", "nova", "vertex", "hiper", "eksen", "akis", "zirve"], suffixes: ["x", "core", "lab", "net", "sync", "evren", "akim", "dalga", "node", "pro"] },
];

const SEPARATORS = ["", ".", "_"];

/* -------------------------------------------------------------------------- */
/* Stil etiketleri                                                            */
/* -------------------------------------------------------------------------- */

const TAGS: Record<Locale, Record<string, string>> = {
  tr: {
    lowercase: "küçük harf",
    short: "kısa",
    medium: "orta",
    long: "uzun",
    dotted: "noktalı",
    underscore: "alt çizgili",
    clean: "sade",
    aesthetic: "estetik",
    catchy: "akılda kalıcı",
  },
  en: {
    lowercase: "lowercase",
    short: "short",
    medium: "medium",
    long: "long",
    dotted: "dotted",
    underscore: "underscore",
    clean: "clean",
    aesthetic: "aesthetic",
    catchy: "catchy",
  },
};

function buildStyleTags(locale: Locale, handle: string): string[] {
  const t = TAGS[locale];
  const tags: string[] = [t.lowercase];
  const len = handle.replace(/[._]/g, "").length;
  if (len <= 8) tags.push(t.short);
  else if (len <= 12) tags.push(t.medium);
  else tags.push(t.long);
  if (handle.includes(".")) tags.push(t.dotted);
  else if (handle.includes("_")) tags.push(t.underscore);
  else tags.push(t.clean);
  return tags;
}

/* -------------------------------------------------------------------------- */
/* Üretici                                                                    */
/* -------------------------------------------------------------------------- */

const PER_CATEGORY = 95; // 11 kategori × 95 ≈ 1045 kullanıcı adı

function generateUsernames(locale: Locale): Username[] {
  const banks = locale === "tr" ? TR_BANKS : EN_BANKS;
  const out: Username[] = [];
  const seen = new Set<string>();
  let platformIdx = 0;

  for (const bank of banks) {
    let count = 0;
    outer: for (const p of bank.prefixes) {
      for (const s of bank.suffixes) {
        if (count >= PER_CATEGORY) break outer;
        const pre = p.trim();
        const suf = s.trim();
        const h = hashString(pre + suf + bank.id);
        const sep = SEPARATORS[h % SEPARATORS.length];
        const handle = `${pre}${sep}${suf}`.toLowerCase();
        const slug = slugify(handle);
        if (!slug || seen.has(slug)) continue;
        seen.add(slug);
        count += 1;
        const platform = PLATFORM_IDS[platformIdx % PLATFORM_IDS.length];
        platformIdx += 1;
        out.push({
          id: `${locale}-user-${slug}`,
          slug,
          username: handle,
          language: locale,
          category: bank.id,
          platform,
          availability: 55 + (hashString(slug) % 45), // 55-99
          styleTags: buildStyleTags(locale, handle),
        });
      }
    }
  }

  return out;
}

const CACHE: Partial<Record<Locale, Username[]>> = {};

export function getUsernames(locale: Locale): Username[] {
  if (!CACHE[locale]) CACHE[locale] = generateUsernames(locale);
  return CACHE[locale]!;
}

export function findUsername(locale: Locale, slug: string): Username | undefined {
  return getUsernames(locale).find((u) => u.slug === slug);
}

export function getUsernamesByCategory(locale: Locale, categoryId: string): Username[] {
  return getUsernames(locale).filter((u) => u.category === categoryId);
}

export function getUsernamesByPlatform(locale: Locale, platformId: string): Username[] {
  return getUsernames(locale).filter((u) => u.platform === platformId);
}

/** Aynı kategoriden kullanıcı adları (varsayılan 8). */
export function getRelatedUsernames(
  locale: Locale,
  item: Username,
  count = 8
): Username[] {
  return getUsernames(locale)
    .filter((u) => u.category === item.category && u.slug !== item.slug)
    .slice(0, count);
}

/* -------------------------------------------------------------------------- */
/* Renkler (kategori aksanları)                                               */
/* -------------------------------------------------------------------------- */

export interface CategoryColor {
  badge: string;
  dot: string;
  tint: string;
  text: string;
  bar: string;
}

const CATEGORY_COLOR: Record<string, CategoryColor> = {
  minimal: { badge: "bg-gray-100 text-gray-700", dot: "bg-gray-400", tint: "bg-gray-50", text: "text-gray-700", bar: "bg-gray-400" },
  photography: { badge: "bg-sky-100 text-sky-700", dot: "bg-sky-400", tint: "bg-sky-50", text: "text-sky-700", bar: "bg-sky-500" },
  gaming: { badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500", tint: "bg-indigo-50", text: "text-indigo-700", bar: "bg-indigo-500" },
  tech: { badge: "bg-cyan-100 text-cyan-700", dot: "bg-cyan-500", tint: "bg-cyan-50", text: "text-cyan-700", bar: "bg-cyan-500" },
  creator: { badge: "bg-rose-100 text-rose-700", dot: "bg-rose-400", tint: "bg-rose-50", text: "text-rose-700", bar: "bg-rose-500" },
  travel: { badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", tint: "bg-emerald-50", text: "text-emerald-700", bar: "bg-emerald-500" },
  dark: { badge: "bg-zinc-200 text-zinc-800", dot: "bg-zinc-600", tint: "bg-zinc-100", text: "text-zinc-800", bar: "bg-zinc-700" },
  aesthetic: { badge: "bg-pink-100 text-pink-700", dot: "bg-pink-400", tint: "bg-pink-50", text: "text-pink-700", bar: "bg-pink-400" },
  professional: { badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500", tint: "bg-blue-50", text: "text-blue-700", bar: "bg-blue-600" },
  funny: { badge: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-400", tint: "bg-yellow-50", text: "text-yellow-800", bar: "bg-yellow-400" },
  modern: { badge: "bg-violet-100 text-violet-700", dot: "bg-violet-500", tint: "bg-violet-50", text: "text-violet-700", bar: "bg-violet-500" },
};

const DEFAULT_COLOR: CategoryColor = {
  badge: "bg-bg text-muted",
  dot: "bg-line",
  tint: "bg-card",
  text: "text-ink",
  bar: "bg-accent",
};

export function getCategoryColor(categoryId: string): CategoryColor {
  return CATEGORY_COLOR[categoryId] ?? DEFAULT_COLOR;
}

/* -------------------------------------------------------------------------- */
/* Kategori istatistikleri (kart önizleme)                                    */
/* -------------------------------------------------------------------------- */

export interface UsernameCategoryStat {
  id: string;
  label: string;
  description: string;
  count: number;
  preview: string[];
  color: CategoryColor;
}

export function getCategoryStats(locale: Locale): UsernameCategoryStat[] {
  return USERNAME_CATEGORIES[locale].map((c) => {
    const items = getUsernamesByCategory(locale, c.id);
    return {
      id: c.id,
      label: c.label,
      description: getCategoryDescription(locale, c.id),
      count: items.length,
      preview: items.slice(0, 3).map((i) => i.username),
      color: getCategoryColor(c.id),
    };
  });
}

export { CATEGORY_IDS, PLATFORM_IDS };
