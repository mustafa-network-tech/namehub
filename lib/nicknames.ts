import type { Locale } from "@/types/common";
import type { Nickname, NickCategoryDef, NickVariant } from "@/types/nickname";

/* -------------------------------------------------------------------------- */
/* Kategoriler                                                                */
/* -------------------------------------------------------------------------- */

export const NICK_CATEGORIES: Record<Locale, NickCategoryDef[]> = {
  tr: [
    { id: "melankolik", label: "Melankolik" },
    { id: "siirsel", label: "Şiirsel" },
    { id: "derin-anlamli", label: "Derin Anlamlı" },
    { id: "karanlik", label: "Karanlık" },
    { id: "huzunlu", label: "Hüzünlü" },
    { id: "savasci", label: "Savaşçı" },
    { id: "lider", label: "Lider" },
    { id: "bozkir", label: "Bozkır" },
    { id: "mitolojik", label: "Mitolojik" },
    { id: "modern", label: "Modern" },
    { id: "havali", label: "Havalı" },
    { id: "komik", label: "Komik" },
    { id: "minimal", label: "Minimal" },
    { id: "gizemli", label: "Gizemli" },
    { id: "romantik", label: "Romantik" },
  ],
  en: [
    { id: "dark", label: "Dark" },
    { id: "warrior", label: "Warrior" },
    { id: "elite", label: "Elite" },
    { id: "gaming", label: "Gaming" },
    { id: "fantasy", label: "Fantasy" },
    { id: "mythology", label: "Mythology" },
    { id: "cool", label: "Cool" },
    { id: "minimal", label: "Minimal" },
    { id: "mysterious", label: "Mysterious" },
    { id: "leader", label: "Leader" },
    { id: "funny", label: "Funny" },
    { id: "stylish", label: "Stylish" },
    { id: "romantic", label: "Romantic" },
    { id: "aesthetic", label: "Aesthetic" },
    { id: "modern", label: "Modern" },
  ],
};

export function getCategoryLabel(locale: Locale, id: string): string {
  return NICK_CATEGORIES[locale].find((c) => c.id === id)?.label ?? id;
}

export function findCategory(locale: Locale, id: string): NickCategoryDef | undefined {
  return NICK_CATEGORIES[locale].find((c) => c.id === id);
}

/* -------------------------------------------------------------------------- */
/* Slug + varyant üretimi                                                     */
/* -------------------------------------------------------------------------- */

const TR_MAP: Record<string, string> = {
  ş: "s", Ş: "s", ı: "i", İ: "i", ğ: "g", Ğ: "g",
  ü: "u", Ü: "u", ö: "o", Ö: "o", ç: "c", Ç: "c",
};

export function slugify(text: string): string {
  return text
    .replace(/[şŞıİğĞüÜöÖçÇ]/g, (ch) => TR_MAP[ch] ?? ch)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ASCII harf/rakamları Unicode "Mathematical Alphanumeric" bloğuna eşler.
// Türkçe karakterler (ü, ş, ı, ğ, ö, ç) ve boşluklar olduğu gibi geçer.
function mapAlphabet(
  text: string,
  upper: number | null,
  lower: number | null,
  digit: number | null = null,
  exceptions: Record<string, string> = {}
): string {
  let out = "";
  for (const ch of text) {
    if (exceptions[ch]) {
      out += exceptions[ch];
      continue;
    }
    const code = ch.codePointAt(0)!;
    if (upper !== null && code >= 65 && code <= 90) {
      out += String.fromCodePoint(upper + (code - 65));
    } else if (lower !== null && code >= 97 && code <= 122) {
      out += String.fromCodePoint(lower + (code - 97));
    } else if (digit !== null && code >= 48 && code <= 57) {
      out += String.fromCodePoint(digit + (code - 48));
    } else {
      out += ch;
    }
  }
  return out;
}

const FONT = {
  script: (s: string) => mapAlphabet(s, 0x1d4d0, 0x1d4ea),
  bold: (s: string) => mapAlphabet(s, 0x1d400, 0x1d41a, 0x1d7ce),
  italic: (s: string) => mapAlphabet(s, 0x1d434, 0x1d44e, null, { h: "ℎ" }),
  mono: (s: string) => mapAlphabet(s, 0x1d670, 0x1d68a, 0x1d7f6),
  doubleStruck: (s: string) =>
    mapAlphabet(s, 0x1d538, 0x1d552, 0x1d7d8, {
      C: "ℂ", H: "ℍ", N: "ℕ", P: "ℙ", Q: "ℚ", R: "ℝ", Z: "ℤ",
    }),
};

interface StyleDef {
  tr: string;
  en: string;
  fn: (base: string, upper: string) => string;
}

// 11 sembol stili + 5 tipografi stili = 16 belirgin varyasyon.
const STYLE_DEFS: StyleDef[] = [
  { tr: "Normal", en: "Normal", fn: (b) => b },
  { tr: "Büyük Harf", en: "Uppercase", fn: (_b, u) => u },
  { tr: "Köşeli", en: "Bracket", fn: (b) => `[${b}]` },
  { tr: "Yıldız", en: "Star", fn: (b) => `★彡${b}彡★` },
  { tr: "Zarif", en: "Elegant", fn: (b) => `✦ ${b} ✦` },
  { tr: "Minimal", en: "Minimal", fn: (b) => `• ${b} •` },
  { tr: "Ay", en: "Moon", fn: (b) => `☾ ${b} ☽` },
  { tr: "Elmas", en: "Diamond", fn: (b) => `◈ ${b} ◈` },
  { tr: "Kraliyet", en: "Royal", fn: (b) => `♔ ${b} ♔` },
  { tr: "Karanlık", en: "Dark", fn: (b) => `☠ ${b} ☠` },
  { tr: "Fantastik", en: "Fantasy", fn: (b) => `『${b}』` },
  { tr: "El Yazısı", en: "Script", fn: (b) => FONT.script(b) },
  { tr: "Kalın", en: "Bold", fn: (b) => FONT.bold(b) },
  { tr: "İtalik", en: "Italic", fn: (b) => FONT.italic(b) },
  { tr: "Monospace", en: "Monospace", fn: (b) => FONT.mono(b) },
  { tr: "Çift Çizgi", en: "Double-Struck", fn: (b) => FONT.doubleStruck(b) },
];

/** Ana metinden 16 belirgin stil varyasyonu üretir (sembol + tipografi). */
export function buildVariants(base: string, locale: Locale): NickVariant[] {
  const upper = base.toLocaleUpperCase(locale === "tr" ? "tr" : "en");
  return STYLE_DEFS.map((def) => ({
    style: locale === "tr" ? def.tr : def.en,
    value: def.fn(base, upper),
  }));
}

/* -------------------------------------------------------------------------- */
/* Kelime bankaları (kategori bazlı, kombinasyonla genişler)                  */
/* -------------------------------------------------------------------------- */

interface CategoryBank {
  id: string;
  seeds: string[];
  prefixes: string[];
  suffixes: string[];
}

// İngilizce: önek + sonek bitişik yazılır (ShadowNinja).
const EN_BANKS: CategoryBank[] = [
  {
    id: "dark",
    seeds: [
      "Phantom", "ShadowNinja", "NightRider", "DarkKnight", "GhostBlade",
      "ShadowWolf", "ShadowKing", "DarkSoul", "DarkHunter",
    ],
    prefixes: ["Shadow", "Dark", "Night", "Ghost", "Grim", "Void"],
    suffixes: ["Ninja", "Knight", "Rider", "Soul", "Hunter", "Blade"],
  },
  {
    id: "warrior",
    seeds: ["StormWolf", "SilentHunter", "IronSoul"],
    prefixes: ["Iron", "Steel", "Storm", "War", "Battle", "Blood"],
    suffixes: ["Wolf", "Soul", "Blade", "Fury", "Hunter", "Fang"],
  },
  {
    id: "elite",
    seeds: ["ApexPrime"],
    prefixes: ["Elite", "Apex", "Omega", "Vortex", "Titan", "Zenith"],
    suffixes: ["X", "Prime", "Core", "Force", "Edge", "Pro"],
  },
  {
    id: "gaming",
    seeds: ["NovaX"],
    prefixes: ["Nova", "Pixel", "Frag", "Sniper", "Clutch", "Respawn"],
    suffixes: ["X", "Pro", "GG", "Main", "Squad", "Op"],
  },
  {
    id: "fantasy",
    seeds: ["FrostMage"],
    prefixes: ["Mystic", "Arcane", "Frost", "Ember", "Astral", "Lunar"],
    suffixes: ["Mage", "Dragon", "Phoenix", "Wizard", "Elf", "Rune"],
  },
  {
    id: "mythology",
    seeds: ["ZeusGod"],
    prefixes: ["Zeus", "Odin", "Thor", "Ares", "Atlas", "Apollo"],
    suffixes: ["God", "Titan", "Olympus", "Storm", "Spear", "Wrath"],
  },
  {
    id: "cool",
    seeds: ["NeonVibe"],
    prefixes: ["Ice", "Neon", "Cyber", "Turbo", "Hyper", "Ultra"],
    suffixes: ["Vibe", "Wave", "Flex", "Storm", "Blaze", "Zone"],
  },
  {
    id: "minimal",
    seeds: ["MonoLine"],
    prefixes: ["Just", "Mono", "Pure", "Plain", "Soft", "Bare"],
    suffixes: ["One", "Dot", "Line", "Form", "Tone", "Ink"],
  },
  {
    id: "mysterious",
    seeds: ["HiddenSoul"],
    prefixes: ["Hidden", "Secret", "Masked", "Silent", "Veiled", "Unknown"],
    suffixes: ["Soul", "Whisper", "Mask", "Trace", "Riddle", "Face"],
  },
  {
    id: "leader",
    seeds: ["Legend"],
    prefixes: ["Alpha", "Prime", "King", "Chief", "Captain", "Royal"],
    suffixes: ["Lord", "Commander", "Boss", "Leader", "Crown", "Reign"],
  },
  {
    id: "funny",
    seeds: ["LazyPanda"],
    prefixes: ["Lazy", "Crazy", "Funky", "Goofy", "Silly", "Chubby"],
    suffixes: ["Panda", "Potato", "Llama", "Taco", "Noodle", "Penguin"],
  },
  {
    id: "stylish",
    seeds: ["VelvetVibe"],
    prefixes: ["Lux", "Velvet", "Gold", "Royal", "Glam", "Chic"],
    suffixes: ["Vibe", "Style", "Mode", "Aura", "Look", "Wave"],
  },
  {
    id: "romantic",
    seeds: ["SweetHeart"],
    prefixes: ["Sweet", "Honey", "Rose", "Dear", "Lovely", "Tender"],
    suffixes: ["Heart", "Soul", "Love", "Kiss", "Dream", "Bloom"],
  },
  {
    id: "aesthetic",
    seeds: ["SoftAura"],
    prefixes: ["Pastel", "Soft", "Dreamy", "Misty", "Faded", "Pale"],
    suffixes: ["Aura", "Bloom", "Haze", "Glow", "Muse", "Petal"],
  },
  {
    id: "modern",
    seeds: ["NeoCore"],
    prefixes: ["Neo", "Cyber", "Vector", "Quantum", "Matrix", "Hyper"],
    suffixes: ["X", "Core", "Lab", "Net", "Code", "Sync"],
  },
];

// Türkçe: önek + boşluk + sonek (Kara Şövalye).
const TR_BANKS: CategoryBank[] = [
  {
    id: "melankolik",
    seeds: [],
    prefixes: ["Sessiz", "Yalnız", "Solgun", "Kırgın", "Yorgun", "Uzak"],
    suffixes: ["Bekleyiş", "Yolcu", "Gölge", "Hüzün", "Veda", "Sokak"],
  },
  {
    id: "siirsel",
    seeds: [],
    prefixes: ["Üşüyen", "Solgun", "Kayıp", "Savrulan", "Dökülen", "Sararan"],
    suffixes: ["Hayaller", "Mısra", "Dize", "Yaprak", "Sözcük", "Rüya"],
  },
  {
    id: "derin-anlamli",
    seeds: [],
    prefixes: ["Sonsuz", "Derin", "Sessiz", "Saklı", "Görünmez", "Kayıp"],
    suffixes: ["Anlam", "Yolculuk", "Gerçek", "Sır", "Boşluk", "İz"],
  },
  {
    id: "karanlik",
    seeds: [],
    prefixes: ["Kara", "Gece", "Gölge", "Karanlık", "Hayalet", "Kuzgun"],
    suffixes: ["Şövalye", "Yolcu", "Avcı", "Ruh", "Bekçi", "Efendi"],
  },
  {
    id: "huzunlu",
    seeds: [],
    prefixes: ["Buruk", "Kırık", "Mahzun", "Solan", "Küskün", "Gözyaşı"],
    suffixes: ["Düş", "Kalp", "Mektup", "Hikaye", "Anı", "Veda"],
  },
  {
    id: "savasci",
    seeds: [],
    prefixes: ["Demir", "Çelik", "Fırtına", "Kan", "Savaş", "Ateş"],
    suffixes: ["Kurt", "Pençe", "Kılıç", "Öfke", "Avcı", "Yürek"],
  },
  {
    id: "lider",
    seeds: [],
    prefixes: ["Alfa", "Baş", "Kral", "Reis", "Kaptan", "Asil"],
    suffixes: ["Efendi", "Komutan", "Patron", "Lider", "Taç", "Hükümdar"],
  },
  {
    id: "bozkir",
    seeds: [],
    prefixes: ["Bozkır", "Yaban", "Step", "Yörük", "Çöl", "Dağ"],
    suffixes: ["Kurdu", "Atlısı", "Beyi", "Hanı", "Rüzgarı", "Kartalı"],
  },
  {
    id: "mitolojik",
    seeds: [],
    prefixes: ["Zeus", "Odin", "Thor", "Ares", "Atlas", "Apollon"],
    suffixes: ["Oğlu", "Tanrısı", "Efsanesi", "Kılıcı", "Gölgesi", "Ruhu"],
  },
  {
    id: "modern",
    seeds: [],
    prefixes: ["Nova", "Piksel", "Siber", "Vektör", "Kuantum", "Matriks"],
    suffixes: ["X", "Pro", "Core", "Kod", "Net", "Lab"],
  },
  {
    id: "havali",
    seeds: [],
    prefixes: ["Neon", "Siber", "Turbo", "Hiper", "Mega", "Ultra"],
    suffixes: ["Dalga", "Fırtına", "Alev", "Şimşek", "Yıldız", "Ruh"],
  },
  {
    id: "komik",
    seeds: [],
    prefixes: ["Tembel", "Çılgın", "Komik", "Şapşal", "Sevimli", "Tombiş"],
    suffixes: ["Panda", "Patates", "Kedi", "Köfte", "Erişte", "Penguen"],
  },
  {
    id: "minimal",
    seeds: [],
    prefixes: ["Sade", "İnce", "Az", "Saf", "Düz", "Net"],
    suffixes: ["Çizgi", "Nokta", "Renk", "Form", "Ton", "İz"],
  },
  {
    id: "gizemli",
    seeds: [],
    prefixes: ["Saklı", "Sırlı", "Bilinmez", "Maskeli", "Suskun", "Loş"],
    suffixes: ["Gölge", "Sır", "Fısıltı", "İz", "Maske", "Yüz"],
  },
  {
    id: "romantik",
    seeds: [],
    prefixes: ["Tatlı", "Sıcak", "İpeksi", "Nazlı", "Sevda", "Gül"],
    suffixes: ["Sevgi", "Kalp", "Buse", "Düş", "Yürek", "Bahar"],
  },
];

/* -------------------------------------------------------------------------- */
/* Anlam şablonları (nick düzeyi) + kategori açıklamaları (kart düzeyi)        */
/* -------------------------------------------------------------------------- */

const MEANING_TR: Record<string, string> = {
  melankolik: "Hüzünlü ve içe dönük; bekleyiş, özlem ve umut temalı bir kimlik.",
  siirsel: "Şiirsel ve imgesel; kelimelerle resim çizen bir kimlik.",
  "derin-anlamli": "Derin, düşündüren ve anlam yüklü bir kimlik.",
  karanlik: "Gizemli, gece temalı; sessiz ve gölgeli oynamayı sevenler için.",
  huzunlu: "Buruk ve dokunaklı; kırık düşleri yansıtan bir kimlik.",
  savasci: "Güçlü ve cesur; mücadeleci bir oyuncu kimliği.",
  lider: "Otorite ve liderlik hissi veren, sözü geçen bir kimlik.",
  bozkir: "Bozkırın özgür ruhunu yansıtan, köklü ve milli bir kimlik.",
  mitolojik: "Mitolojik güç ve efsanelerden esinlenen destansı bir kimlik.",
  modern: "Teknolojik, minimal ve güncel duran modern bir kimlik.",
  havali: "Enerjik ve modern duran, dikkat çeken havalı bir kimlik.",
  komik: "Eğlenceli ve sevimli; ortamı neşelendiren bir kimlik.",
  minimal: "Sade, yalın ve şık; az ile çok anlatan bir kimlik.",
  gizemli: "Saklı, sırlı ve merak uyandıran bir kimlik.",
  romantik: "Sıcak, sevgi dolu ve duygusal bir kimlik.",
};

const MEANING_EN: Record<string, string> = {
  dark: "A mysterious, night-themed identity for players who prefer a stealthy, shadowy vibe.",
  warrior: "A strong and fearless identity for competitive, battle-ready players.",
  elite: "A premium, high-tier identity for top-level players.",
  gaming: "A competitive gaming tag built for the leaderboard.",
  fantasy: "A mystical identity inspired by magic and fantasy worlds.",
  mythology: "An epic handle drawn from myths, gods and legends.",
  cool: "An energetic, modern handle that stands out with style.",
  minimal: "A clean, minimal identity that says more with less.",
  mysterious: "A secretive, intriguing identity wrapped in mystery.",
  leader: "An authoritative handle that radiates leadership and command.",
  funny: "A playful, lighthearted nickname that brings fun to the lobby.",
  stylish: "A sleek, fashionable identity with a premium feel.",
  romantic: "A warm, affectionate and heartfelt identity.",
  aesthetic: "A soft, dreamy and visually pleasing identity.",
  modern: "A sleek, tech-forward and contemporary identity.",
};

export const CATEGORY_DESC: Record<Locale, Record<string, string>> = {
  tr: {
    melankolik: "Yalnızlık, nostalji ve umut temalı nickler.",
    siirsel: "Şiir ve imgelerle bezeli, edebi nickler.",
    "derin-anlamli": "Düşündüren, anlam yüklü nickler.",
    karanlik: "Gece, gölge ve gizem temalı nickler.",
    huzunlu: "Buruk ve dokunaklı, hüzünlü nickler.",
    savasci: "Güçlü, cesur ve mücadeleci nickler.",
    lider: "Otorite ve liderlik çağrıştıran nickler.",
    bozkir: "Bozkırın özgür ve köklü ruhunu taşıyan nickler.",
    mitolojik: "Tanrılar ve efsanelerden ilham alan nickler.",
    modern: "Teknolojik ve güncel duran modern nickler.",
    havali: "Enerjik ve dikkat çeken havalı nickler.",
    komik: "Neşeli ve eğlenceli nickler.",
    minimal: "Sade ve yalın, minimal nickler.",
    gizemli: "Sırlı ve merak uyandıran gizemli nickler.",
    romantik: "Sevgi dolu, romantik nickler.",
  },
  en: {
    dark: "Night, shadow and stealth-themed nicknames.",
    warrior: "Strong, fearless and battle-ready nicknames.",
    elite: "Premium, high-tier nicknames for top players.",
    gaming: "Competitive gaming tags for the leaderboard.",
    fantasy: "Magic and fantasy-inspired nicknames.",
    mythology: "Nicknames drawn from gods and legends.",
    cool: "Energetic, eye-catching cool nicknames.",
    minimal: "Clean, simple and minimal nicknames.",
    mysterious: "Secretive and intriguing nicknames.",
    leader: "Authoritative, leadership nicknames.",
    funny: "Playful and lighthearted nicknames.",
    stylish: "Sleek, fashionable nicknames.",
    romantic: "Warm and affectionate nicknames.",
    aesthetic: "Soft, dreamy and aesthetic nicknames.",
    modern: "Sleek, contemporary nicknames.",
  },
};

export function getCategoryDescription(locale: Locale, id: string): string {
  return CATEGORY_DESC[locale][id] ?? "";
}

function meaningFor(locale: Locale, categoryId: string): string {
  const map = locale === "tr" ? MEANING_TR : MEANING_EN;
  return map[categoryId] ?? Object.values(map)[0];
}

/* -------------------------------------------------------------------------- */
/* Küratörlü nickler (özel anlamlı; üretilenlere göre önceliklidir)           */
/* -------------------------------------------------------------------------- */

interface CuratedNick {
  base: string;
  category: string;
  meaning: string;
}

const CURATED: Record<Locale, CuratedNick[]> = {
  tr: [
    { base: "Elbet Bir Gün", category: "melankolik", meaning: "Umut hiç bitmez. Beklenen gün mutlaka gelir." },
    { base: "Bir Gün Daha", category: "melankolik", meaning: "Sabır ve bekleyiş teması." },
    { base: "Yarım Kalan", category: "huzunlu", meaning: "Tamamlanmamış hikâyelerin sembolü." },
    { base: "Sessiz Bekleyiş", category: "melankolik", meaning: "Konuşmadan sürdürülen umut." },
    { base: "Üşüyen Hayaller", category: "siirsel", meaning: "Rüzgârla savrulan düşler." },
    { base: "Bir Tutam Hayal", category: "siirsel", meaning: "Küçük ama değerli umutlar." },
    { base: "Kırık Düşler", category: "huzunlu", meaning: "Gerçekleşmeyen beklentiler." },
    { base: "Rüzgâra Yazılan", category: "siirsel", meaning: "Kalıcı olmayan ama unutulmayan şeyler." },
    { base: "Hükümsüz", category: "karanlik", meaning: "Geçerliliğini kaybetmiş kararlar ve sözler." },
    { base: "Yok Hükmünde", category: "karanlik", meaning: "Varlığı hissedilmeyen kişi." },
    { base: "Son Karar", category: "lider", meaning: "Nihai sözü söyleyen kişi." },
    { base: "Sessiz İtiraz", category: "karanlik", meaning: "Konuşmadan verilen tepki." },
    { base: "Ayaz", category: "bozkir", meaning: "Keskin ve soğuk karakter." },
    { base: "Bozkurt", category: "bozkir", meaning: "Özgürlüğün ve gücün sembolü." },
    { base: "Kuzey Rüzgârı", category: "bozkir", meaning: "Sert ve kararlı karakter." },
    { base: "Gece Yolcusu", category: "karanlik", meaning: "Gecede ilerleyen yalnız ruh." },
    { base: "Yalnız Adam", category: "melankolik", meaning: "Kendi yolunda yürüyen kişi." },
    { base: "Kayıp Mısra", category: "siirsel", meaning: "Eksik kalan bir şiirin dizesi." },
    { base: "Son Mektup", category: "huzunlu", meaning: "Söylenemeyen son sözler." },
    { base: "Gölgeye Sığınan", category: "gizemli", meaning: "Kalabalıktan uzak duran kişi." },
  ],
  en: [],
};

/* -------------------------------------------------------------------------- */
/* Generator                                                                  */
/* -------------------------------------------------------------------------- */

const PER_CATEGORY = 30;

function generateNicknames(locale: Locale): Nickname[] {
  const banks = locale === "tr" ? TR_BANKS : EN_BANKS;
  const joiner = locale === "tr" ? " " : "";
  const out: Nickname[] = [];
  const seenSlug = new Set<string>();
  const perCat: Record<string, number> = {};

  const add = (base: string, category: string, meaning: string) => {
    const slug = slugify(base);
    if (!slug || seenSlug.has(slug)) return;
    seenSlug.add(slug);
    perCat[category] = (perCat[category] ?? 0) + 1;
    out.push({
      id: `${locale}-nick-${slug}`,
      slug,
      base,
      language: locale,
      category,
      meaning,
      variants: buildVariants(base, locale),
    });
  };

  // 1) Küratörlü kayıtlar önce; özel anlamlarını korur, aynı slug üretileni geçersiz kılar.
  for (const c of CURATED[locale]) {
    add(c.base, c.category, c.meaning);
  }

  // 2) Kategori bazlı üretim; her kategori PER_CATEGORY'ye kadar doldurulur.
  for (const bank of banks) {
    const tmpl = meaningFor(locale, bank.id);
    const candidates = [
      ...bank.seeds,
      ...bank.prefixes.flatMap((p) => bank.suffixes.map((s) => `${p}${joiner}${s}`)),
    ];
    for (const base of candidates) {
      if ((perCat[bank.id] ?? 0) >= PER_CATEGORY) break;
      add(base, bank.id, tmpl);
    }
  }

  return out;
}

/* -------------------------------------------------------------------------- */
/* Genel API                                                                  */
/* -------------------------------------------------------------------------- */

const CACHE: Partial<Record<Locale, Nickname[]>> = {};

export function getNicknames(locale: Locale): Nickname[] {
  if (!CACHE[locale]) CACHE[locale] = generateNicknames(locale);
  return CACHE[locale]!;
}

export function findNickname(locale: Locale, slug: string): Nickname | undefined {
  return getNicknames(locale).find((n) => n.slug === slug);
}

export function getNicknamesByCategory(locale: Locale, categoryId: string): Nickname[] {
  return getNicknames(locale).filter((n) => n.category === categoryId);
}

/** Aynı kategoriden başlayarak benzer nickleri döndürür (varsayılan 6 adet). */
export function getRelatedNicknames(
  locale: Locale,
  item: Nickname,
  count = 6
): Nickname[] {
  const all = getNicknames(locale).filter((n) => n.slug !== item.slug);
  const sameCat = all.filter((n) => n.category === item.category);
  const others = all.filter((n) => n.category !== item.category);
  return [...sameCat, ...others].slice(0, count);
}

export interface CategoryStat {
  id: string;
  label: string;
  description: string;
  count: number;
  preview: string[];
  color: CategoryColor;
}

/** Kategori kartları için istatistik: ad, açıklama, adet, önizleme ve renk. */
export function getCategoryStats(locale: Locale): CategoryStat[] {
  return NICK_CATEGORIES[locale].map((c) => {
    const items = getNicknamesByCategory(locale, c.id);
    return {
      id: c.id,
      label: c.label,
      description: getCategoryDescription(locale, c.id),
      count: items.length,
      preview: items.slice(0, 3).map((i) => i.base),
      color: getCategoryColor(c.id),
    };
  });
}

/* -------------------------------------------------------------------------- */
/* Premium detay verileri: renk, tema, istatistik, benzerlik                  */
/* -------------------------------------------------------------------------- */

export interface CategoryColor {
  /** Rozet (badge) için yumuşak arka plan + metin. */
  badge: string;
  /** Küçük aksan noktası. */
  dot: string;
  /** Kart için çok hafif tonlu arka plan. */
  tint: string;
  /** Başlık / vurgu metni rengi. */
  text: string;
}

// İnce, abartısız kategori aksanları (rozet, nokta, kart tonu ve vurgu metni).
const CATEGORY_COLOR: Record<string, CategoryColor> = {
  // Türkçe
  melankolik: { badge: "bg-slate-100 text-slate-700", dot: "bg-slate-400", tint: "bg-slate-50", text: "text-slate-700" },
  siirsel: { badge: "bg-violet-100 text-violet-700", dot: "bg-violet-400", tint: "bg-violet-50", text: "text-violet-700" },
  "derin-anlamli": { badge: "bg-teal-100 text-teal-700", dot: "bg-teal-400", tint: "bg-teal-50", text: "text-teal-700" },
  karanlik: { badge: "bg-zinc-200 text-zinc-800", dot: "bg-zinc-600", tint: "bg-zinc-100", text: "text-zinc-800" },
  huzunlu: { badge: "bg-amber-100 text-amber-800", dot: "bg-amber-400", tint: "bg-amber-50", text: "text-amber-800" },
  savasci: { badge: "bg-red-100 text-red-700", dot: "bg-red-500", tint: "bg-red-50", text: "text-red-700" },
  lider: { badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500", tint: "bg-blue-50", text: "text-blue-700" },
  bozkir: { badge: "bg-orange-100 text-orange-800", dot: "bg-orange-500", tint: "bg-orange-50", text: "text-orange-800" },
  mitolojik: { badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500", tint: "bg-indigo-50", text: "text-indigo-700" },
  havali: { badge: "bg-cyan-100 text-cyan-700", dot: "bg-cyan-500", tint: "bg-cyan-50", text: "text-cyan-700" },
  komik: { badge: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-400", tint: "bg-yellow-50", text: "text-yellow-800" },
  gizemli: { badge: "bg-purple-100 text-purple-700", dot: "bg-purple-500", tint: "bg-purple-50", text: "text-purple-700" },
  romantik: { badge: "bg-pink-100 text-pink-700", dot: "bg-pink-400", tint: "bg-pink-50", text: "text-pink-700" },
  // İngilizce
  dark: { badge: "bg-zinc-200 text-zinc-800", dot: "bg-zinc-600", tint: "bg-zinc-100", text: "text-zinc-800" },
  warrior: { badge: "bg-red-100 text-red-700", dot: "bg-red-500", tint: "bg-red-50", text: "text-red-700" },
  elite: { badge: "bg-amber-100 text-amber-800", dot: "bg-amber-400", tint: "bg-amber-50", text: "text-amber-800" },
  gaming: { badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500", tint: "bg-indigo-50", text: "text-indigo-700" },
  fantasy: { badge: "bg-violet-100 text-violet-700", dot: "bg-violet-400", tint: "bg-violet-50", text: "text-violet-700" },
  mythology: { badge: "bg-teal-100 text-teal-700", dot: "bg-teal-400", tint: "bg-teal-50", text: "text-teal-700" },
  cool: { badge: "bg-cyan-100 text-cyan-700", dot: "bg-cyan-500", tint: "bg-cyan-50", text: "text-cyan-700" },
  mysterious: { badge: "bg-purple-100 text-purple-700", dot: "bg-purple-500", tint: "bg-purple-50", text: "text-purple-700" },
  leader: { badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500", tint: "bg-blue-50", text: "text-blue-700" },
  funny: { badge: "bg-yellow-100 text-yellow-800", dot: "bg-yellow-400", tint: "bg-yellow-50", text: "text-yellow-800" },
  stylish: { badge: "bg-pink-100 text-pink-700", dot: "bg-pink-400", tint: "bg-pink-50", text: "text-pink-700" },
  romantic: { badge: "bg-pink-100 text-pink-700", dot: "bg-pink-400", tint: "bg-pink-50", text: "text-pink-700" },
  aesthetic: { badge: "bg-rose-100 text-rose-700", dot: "bg-rose-400", tint: "bg-rose-50", text: "text-rose-700" },
  // İki dilde ortak id'ler
  modern: { badge: "bg-neutral-200 text-neutral-800", dot: "bg-neutral-500", tint: "bg-neutral-100", text: "text-neutral-800" },
  minimal: { badge: "bg-gray-100 text-gray-700", dot: "bg-gray-400", tint: "bg-gray-50", text: "text-gray-700" },
};

const DEFAULT_COLOR: CategoryColor = {
  badge: "bg-bg text-muted",
  dot: "bg-line",
  tint: "bg-card",
  text: "text-ink",
};

export function getCategoryColor(categoryId: string): CategoryColor {
  return CATEGORY_COLOR[categoryId] ?? DEFAULT_COLOR;
}

// Kategori temaları (duygusal bağlam etiketleri).
const THEMES: Record<Locale, Record<string, string[]>> = {
  tr: {
    melankolik: ["Umut", "Bekleyiş", "Nostalji"],
    siirsel: ["İmge", "Şiir", "Hayal"],
    "derin-anlamli": ["Anlam", "Düşünce", "Derinlik"],
    karanlik: ["Gece", "Gölge", "Gizem"],
    huzunlu: ["Hüzün", "Veda", "Özlem"],
    savasci: ["Güç", "Cesaret", "Mücadele"],
    lider: ["Otorite", "Liderlik", "Kararlılık"],
    bozkir: ["Özgürlük", "Köken", "Doğa"],
    mitolojik: ["Efsane", "Tanrılar", "Destan"],
    modern: ["Teknoloji", "Minimal", "Gelecek"],
    havali: ["Enerji", "Stil", "Hız"],
    komik: ["Neşe", "Eğlence", "Mizah"],
    minimal: ["Sadelik", "Yalınlık", "Denge"],
    gizemli: ["Sır", "Merak", "Gizem"],
    romantik: ["Sevgi", "Tutku", "Duygu"],
  },
  en: {
    dark: ["Night", "Shadow", "Stealth"],
    warrior: ["Strength", "Courage", "Battle"],
    elite: ["Prestige", "Power", "Top-tier"],
    gaming: ["Competitive", "Esports", "Squad"],
    fantasy: ["Magic", "Myth", "Adventure"],
    mythology: ["Gods", "Legend", "Epic"],
    cool: ["Energy", "Style", "Vibe"],
    minimal: ["Simplicity", "Clean", "Balance"],
    mysterious: ["Secret", "Intrigue", "Enigma"],
    leader: ["Authority", "Command", "Leadership"],
    funny: ["Fun", "Humor", "Playful"],
    stylish: ["Fashion", "Sleek", "Premium"],
    romantic: ["Love", "Passion", "Warmth"],
    aesthetic: ["Soft", "Dreamy", "Pastel"],
    modern: ["Tech", "Minimal", "Future"],
  },
};

export function getNickThemes(locale: Locale, categoryId: string): string[] {
  return THEMES[locale][categoryId] ?? [];
}

const SUITABLE_FOR: Record<Locale, string[]> = {
  tr: ["Oyun", "Sosyal Medya", "Forumlar", "Nickler"],
  en: ["Gaming", "Social Media", "Forums", "Nicknames"],
};

export function getSuitableFor(locale: Locale): string[] {
  return SUITABLE_FOR[locale];
}

// Slug'dan deterministik (her zaman aynı) sayısal türetim.
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export interface NickStats {
  /** 70-99 arası popülerlik puanı. */
  popularity: number;
  /** Gösterimlik kaydetme sayısı. */
  favorites: number;
}

export function getNickStats(item: Nickname): NickStats {
  const h = hashString(item.slug);
  return {
    popularity: 70 + (h % 30),
    favorites: 24 + (h % 476),
  };
}

// Duygusal/anlamsal olarak benzer kategoriler.
const SIMILAR_CATEGORIES: Record<Locale, Record<string, string[]>> = {
  tr: {
    melankolik: ["huzunlu", "siirsel", "derin-anlamli"],
    siirsel: ["melankolik", "derin-anlamli", "romantik"],
    "derin-anlamli": ["melankolik", "siirsel", "gizemli"],
    karanlik: ["gizemli", "savasci", "mitolojik"],
    huzunlu: ["melankolik", "siirsel", "romantik"],
    savasci: ["lider", "bozkir", "karanlik"],
    lider: ["savasci", "modern", "bozkir"],
    bozkir: ["savasci", "mitolojik", "lider"],
    mitolojik: ["karanlik", "savasci", "bozkir"],
    modern: ["minimal", "havali", "lider"],
    havali: ["modern", "komik", "minimal"],
    komik: ["havali", "romantik", "minimal"],
    minimal: ["modern", "derin-anlamli", "havali"],
    gizemli: ["karanlik", "derin-anlamli", "mitolojik"],
    romantik: ["huzunlu", "siirsel", "melankolik"],
  },
  en: {
    dark: ["mysterious", "warrior", "mythology"],
    warrior: ["leader", "dark", "mythology"],
    elite: ["leader", "modern", "gaming"],
    gaming: ["cool", "elite", "modern"],
    fantasy: ["mythology", "mysterious", "aesthetic"],
    mythology: ["fantasy", "warrior", "dark"],
    cool: ["stylish", "gaming", "modern"],
    minimal: ["modern", "aesthetic", "cool"],
    mysterious: ["dark", "fantasy", "aesthetic"],
    leader: ["warrior", "elite", "modern"],
    funny: ["cool", "stylish", "aesthetic"],
    stylish: ["cool", "aesthetic", "romantic"],
    romantic: ["aesthetic", "stylish", "funny"],
    aesthetic: ["minimal", "romantic", "stylish"],
    modern: ["minimal", "cool", "elite"],
  },
};

/** Aynı kategoriden nickler (varsayılan 6). */
export function getSameCategoryNicknames(
  locale: Locale,
  item: Nickname,
  count = 6
): Nickname[] {
  return getNicknames(locale)
    .filter((n) => n.category === item.category && n.slug !== item.slug)
    .slice(0, count);
}

/** Benzer temalı (farklı ama yakın kategorilerden) nickler (varsayılan 6). */
export function getSimilarThemeNicknames(
  locale: Locale,
  item: Nickname,
  count = 6
): Nickname[] {
  const related = SIMILAR_CATEGORIES[locale][item.category] ?? [];
  const out: Nickname[] = [];
  for (const catId of related) {
    for (const n of getNicknamesByCategory(locale, catId)) {
      if (n.slug === item.slug) continue;
      out.push(n);
      if (out.length >= count) return out;
    }
  }
  return out;
}
