import type { Locale } from "@/types/common";
import type { BrandName, BrandCategoryDef } from "@/types/brand";

/* -------------------------------------------------------------------------- */
/* Kategoriler                                                                */
/* -------------------------------------------------------------------------- */

export const BRAND_CATEGORIES: Record<Locale, BrandCategoryDef[]> = {
  tr: [
    { id: "tech", label: "Teknoloji" },
    { id: "ai", label: "Yapay Zeka" },
    { id: "saas", label: "SaaS" },
    { id: "agency", label: "Ajans" },
    { id: "media", label: "Medya" },
    { id: "photography", label: "Fotoğraf" },
    { id: "construction", label: "İnşaat" },
    { id: "architecture", label: "Mimarlık" },
    { id: "education", label: "Eğitim" },
    { id: "health", label: "Sağlık" },
    { id: "food", label: "Gıda" },
    { id: "retail", label: "Perakende" },
    { id: "travel", label: "Seyahat" },
    { id: "logistics", label: "Lojistik" },
    { id: "consulting", label: "Danışmanlık" },
  ],
  en: [
    { id: "tech", label: "Tech" },
    { id: "ai", label: "AI" },
    { id: "saas", label: "SaaS" },
    { id: "agency", label: "Agency" },
    { id: "media", label: "Media" },
    { id: "photography", label: "Photography" },
    { id: "construction", label: "Construction" },
    { id: "architecture", label: "Architecture" },
    { id: "education", label: "Education" },
    { id: "health", label: "Health" },
    { id: "food", label: "Food" },
    { id: "retail", label: "Retail" },
    { id: "travel", label: "Travel" },
    { id: "logistics", label: "Logistics" },
    { id: "consulting", label: "Consulting" },
  ],
};

export function getCategoryLabel(locale: Locale, id: string): string {
  return BRAND_CATEGORIES[locale].find((c) => c.id === id)?.label ?? id;
}

export function findCategory(
  locale: Locale,
  id: string
): BrandCategoryDef | undefined {
  return BRAND_CATEGORIES[locale].find((c) => c.id === id);
}

const CATEGORY_DESC: Record<Locale, Record<string, string>> = {
  tr: {
    tech: "Teknoloji ürünleri ve startup'lar için modern marka isimleri.",
    ai: "Yapay zeka ürünleri için akıllı ve geleceğe dönük isimler.",
    saas: "SaaS ve abonelik ürünleri için ölçeklenebilir isimler.",
    agency: "Yaratıcı ajanslar ve stüdyolar için karakterli isimler.",
    media: "Medya, yayın ve içerik markaları için dinamik isimler.",
    photography: "Fotoğraf stüdyoları ve görsel markalar için isimler.",
    construction: "İnşaat ve yapı firmaları için güçlü, güven veren isimler.",
    architecture: "Mimarlık ofisleri için zarif ve estetik isimler.",
    education: "Eğitim ve kurs markaları için ilham verici isimler.",
    health: "Sağlık, klinik ve wellness markaları için güvenilir isimler.",
    food: "Yeme-içme ve gıda markaları için iştah açıcı isimler.",
    retail: "Perakende ve e-ticaret için akılda kalıcı isimler.",
    travel: "Seyahat ve turizm markaları için keşif dolu isimler.",
    logistics: "Lojistik ve kargo firmaları için hızlı, güçlü isimler.",
    consulting: "Danışmanlık firmaları için profesyonel, güven veren isimler.",
  },
  en: {
    tech: "Modern brand names for tech products and startups.",
    ai: "Smart, future-forward names for AI products.",
    saas: "Scalable names for SaaS and subscription products.",
    agency: "Characterful names for creative agencies and studios.",
    media: "Dynamic names for media, broadcast and content brands.",
    photography: "Names for photo studios and visual brands.",
    construction: "Strong, trustworthy names for construction firms.",
    architecture: "Elegant, refined names for architecture studios.",
    education: "Inspiring names for education and course brands.",
    health: "Trustworthy names for health, clinic and wellness brands.",
    food: "Appetizing names for food and beverage brands.",
    retail: "Memorable names for retail and e-commerce.",
    travel: "Exploration-rich names for travel and tourism brands.",
    logistics: "Fast, strong names for logistics and shipping firms.",
    consulting: "Professional, trustworthy names for consulting firms.",
  },
};

export function getCategoryDescription(locale: Locale, id: string): string {
  return CATEGORY_DESC[locale][id] ?? "";
}

/* -------------------------------------------------------------------------- */
/* Anlam çağrışımları + kullanım önerileri                                    */
/* -------------------------------------------------------------------------- */

const ESSENCE: Record<Locale, Record<string, string>> = {
  tr: {
    tech: "modern, yenilikçi ve güvenilir bir teknoloji markası izlenimi verir",
    ai: "akıllı, öğrenen ve geleceğe dönük bir yapay zeka markası hissi taşır",
    saas: "ölçeklenebilir, akıcı ve profesyonel bir yazılım markası izlenimi verir",
    agency: "yaratıcı, cesur ve karakterli bir ajans kimliği yansıtır",
    media: "dinamik, dikkat çekici ve enerjik bir medya markası hissi verir",
    photography: "görsel, zarif ve sanatsal bir fotoğraf markası izlenimi bırakır",
    construction: "sağlam, güçlü ve güven veren bir inşaat markası izlenimi verir",
    architecture: "zarif, dengeli ve estetik bir mimarlık markası hissi taşır",
    education: "ilham verici, güvenilir ve öğretici bir eğitim markası izlenimi verir",
    health: "güvenilir, şefkatli ve sağlıklı bir marka hissi taşır",
    food: "iştah açıcı, taze ve samimi bir gıda markası izlenimi verir",
    retail: "akılda kalıcı, çağdaş ve cazip bir perakende markası hissi verir",
    travel: "özgür, keşif dolu ve davetkâr bir seyahat markası izlenimi bırakır",
    logistics: "hızlı, güçlü ve güvenilir bir lojistik markası hissi taşır",
    consulting: "profesyonel, güven veren ve uzman bir danışmanlık markası izlenimi verir",
  },
  en: {
    tech: "feels like a modern, innovative and reliable tech brand",
    ai: "carries a smart, learning and future-forward AI vibe",
    saas: "feels scalable, fluid and professional for a software brand",
    agency: "reflects a creative, bold and characterful agency identity",
    media: "gives a dynamic, eye-catching and energetic media feel",
    photography: "leaves a visual, elegant and artistic photography impression",
    construction: "feels solid, strong and trustworthy for a construction brand",
    architecture: "carries an elegant, balanced and aesthetic architecture vibe",
    education: "feels inspiring, trustworthy and educational",
    health: "carries a trustworthy, caring and healthy brand feel",
    food: "feels appetizing, fresh and warm for a food brand",
    retail: "gives a memorable, contemporary and appealing retail feel",
    travel: "leaves a free, exploratory and inviting travel impression",
    logistics: "carries a fast, strong and reliable logistics feel",
    consulting: "feels professional, trustworthy and expert for a consulting brand",
  },
};

const USAGE: Record<Locale, Record<string, string[]>> = {
  tr: {
    tech: ["Teknoloji startup'ı", "Donanım/yazılım ürünü", "Mobil uygulama"],
    ai: ["Yapay zeka ürünü", "Chatbot / asistan", "Veri/analitik platformu"],
    saas: ["SaaS platformu", "B2B yazılım", "Abonelik ürünü"],
    agency: ["Reklam ajansı", "Dijital stüdyo", "Tasarım ofisi"],
    media: ["Yayın / podcast", "İçerik platformu", "Yapım şirketi"],
    photography: ["Fotoğraf stüdyosu", "Düğün/portre markası", "Görsel ajans"],
    construction: ["İnşaat firması", "Müteahhitlik", "Yapı malzemeleri"],
    architecture: ["Mimarlık ofisi", "İç mimari stüdyosu", "Tasarım atölyesi"],
    education: ["Online kurs", "Eğitim platformu", "Akademi / dershane"],
    health: ["Klinik / poliklinik", "Wellness markası", "Sağlık uygulaması"],
    food: ["Kafe / restoran", "Gıda markası", "Yemek teslimat servisi"],
    retail: ["E-ticaret mağazası", "Butik / marka", "Perakende zinciri"],
    travel: ["Seyahat acentesi", "Turizm platformu", "Konaklama markası"],
    logistics: ["Kargo / nakliye", "Tedarik zinciri", "Teslimat platformu"],
    consulting: ["Danışmanlık firması", "Strateji ofisi", "Kurumsal hizmet"],
  },
  en: {
    tech: ["Tech startup", "Hardware/software product", "Mobile app"],
    ai: ["AI product", "Chatbot / assistant", "Data/analytics platform"],
    saas: ["SaaS platform", "B2B software", "Subscription product"],
    agency: ["Ad agency", "Digital studio", "Design office"],
    media: ["Broadcast / podcast", "Content platform", "Production company"],
    photography: ["Photo studio", "Wedding/portrait brand", "Visual agency"],
    construction: ["Construction firm", "Contracting", "Building materials"],
    architecture: ["Architecture office", "Interior studio", "Design atelier"],
    education: ["Online course", "Education platform", "Academy / school"],
    health: ["Clinic / practice", "Wellness brand", "Health app"],
    food: ["Cafe / restaurant", "Food brand", "Meal delivery service"],
    retail: ["E-commerce store", "Boutique / brand", "Retail chain"],
    travel: ["Travel agency", "Tourism platform", "Hospitality brand"],
    logistics: ["Courier / shipping", "Supply chain", "Delivery platform"],
    consulting: ["Consulting firm", "Strategy office", "Corporate services"],
  },
};

/* -------------------------------------------------------------------------- */
/* Slug                                                                       */
/* -------------------------------------------------------------------------- */

function slugify(text: string): string {
  return text
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
/* Kelime bankaları (kategori bazlı kök + sonek)                              */
/* -------------------------------------------------------------------------- */

const ROOTS: Record<string, string[]> = {
  tech: ["Lumin", "Quant", "Byt", "Verd", "Cobal", "Nimb", "Pyra", "Volt", "Crys", "Ferro", "Zeta", "Octa", "Nexo"],
  ai: ["Cogni", "Synap", "Neura", "Menta", "Infer", "Logi", "Cere", "Senti", "Predi", "Cortex", "Deepa", "Mindo", "Aiva"],
  saas: ["Flowa", "Stacka", "Scala", "Opsi", "Clouda", "Deploya", "Sprinta", "Boarda", "Kanba", "Metri", "Pipel", "Synca", "Grida"],
  agency: ["Forma", "Studi", "Atel", "Krea", "Brava", "Monto", "Visu", "Lofta", "Bureo", "Anvi", "Cobra", "Vibo", "Makro"],
  media: ["Pixa", "Framo", "Echo", "Vira", "Pulsa", "Strea", "Reela", "Broado", "Telly", "Cana", "Voxa", "Buzza", "Tuno"],
  photography: ["Lensa", "Apera", "Foca", "Isolo", "Shutta", "Lumio", "Grana", "Framix", "Optra", "Verra", "Clari", "Visa", "Capto"],
  construction: ["Terra", "Petra", "Solida", "Fortis", "Maxo", "Builda", "Granta", "Steela", "Konstr", "Basa", "Pila", "Formo", "Rocka"],
  architecture: ["Archi", "Strutta", "Formo", "Linea", "Plana", "Spatia", "Domus", "Atria", "Faca", "Voluma", "Aero", "Modula", "Urba"],
  education: ["Edu", "Lerna", "Scola", "Mento", "Skilla", "Acada", "Tutora", "Brighta", "Lexa", "Kampu", "Studo", "Lumo", "Grada"],
  health: ["Vita", "Medi", "Sana", "Cura", "Bioa", "Welna", "Novo", "Pulso", "Cardi", "Therma", "Remed", "Heala", "Vido"],
  food: ["Gusto", "Sapo", "Fresha", "Bakka", "Crava", "Yuma", "Nutra", "Frutta", "Spica", "Mela", "Verdo", "Forna", "Delisa"],
  retail: ["Shopa", "Marto", "Bazaa", "Vendo", "Carta", "Storo", "Trenda", "Boutiq", "Locca", "Stocka", "Sella", "Picka", "Vitra"],
  travel: ["Voya", "Nomada", "Trekka", "Globa", "Wanda", "Roama", "Drifta", "Soja", "Aera", "Caravo", "Trailo", "Mira", "Atlaso"],
  logistics: ["Loga", "Carga", "Movo", "Routa", "Shippa", "Trako", "Velo", "Freta", "Haula", "Transa", "Linka", "Dispa", "Paka"],
  consulting: ["Advi", "Consu", "Strata", "Insig", "Klari", "Apexa", "Pivota", "Scopa", "Grova", "Merida", "Sago", "Beaco", "Verita"],
};

const SUFFIXES = ["ly", "fy", "io", "ix", "ora", "eon", "ova", "era", "ano", "iq", "os", "ity", "ex"];

const CATEGORY_IDS = [
  "tech", "ai", "saas", "agency", "media", "photography", "construction",
  "architecture", "education", "health", "food", "retail", "travel",
  "logistics", "consulting",
];

/* -------------------------------------------------------------------------- */
/* Üretici                                                                    */
/* -------------------------------------------------------------------------- */

const PER_CATEGORY = 101; // 15 kategori × 101 = 1515 marka

function buildMeaning(locale: Locale, name: string, categoryId: string): string {
  const essence = ESSENCE[locale][categoryId] ?? "";
  if (locale === "tr") {
    return `${name}, ${essence}. Kısa, telaffuzu kolay ve markalaşmaya uygun bir isim.`;
  }
  return `${name} ${essence}. A short, easy-to-pronounce and highly brandable name.`;
}

function generateBrands(locale: Locale): BrandName[] {
  const out: BrandName[] = [];
  const seen = new Set<string>();

  for (const catId of CATEGORY_IDS) {
    const roots = ROOTS[catId] ?? [];
    let count = 0;
    outer: for (const root of roots) {
      for (const suf of SUFFIXES) {
        if (count >= PER_CATEGORY) break outer;
        const name = `${root}${suf}`;
        const slug = slugify(name);
        if (!slug || seen.has(slug)) continue;
        seen.add(slug);
        count += 1;
        out.push({
          id: `${locale}-brand-${slug}`,
          slug,
          name,
          category: catId,
          language: locale,
          meaning: buildMeaning(locale, name, catId),
          usage: USAGE[locale][catId] ?? [],
        });
      }
    }
  }

  return out;
}

const CACHE: Partial<Record<Locale, BrandName[]>> = {};

export function getBrands(locale: Locale): BrandName[] {
  if (!CACHE[locale]) CACHE[locale] = generateBrands(locale);
  return CACHE[locale]!;
}

export function findBrand(locale: Locale, slug: string): BrandName | undefined {
  return getBrands(locale).find((b) => b.slug === slug);
}

export function getBrandsByCategory(locale: Locale, categoryId: string): BrandName[] {
  return getBrands(locale).filter((b) => b.category === categoryId);
}

/** Aynı kategoriden benzer marka isimleri (varsayılan 8). */
export function getRelatedBrands(
  locale: Locale,
  item: BrandName,
  count = 8
): BrandName[] {
  const h = hashString(item.slug);
  const same = getBrands(locale).filter(
    (b) => b.category === item.category && b.slug !== item.slug
  );
  // Deterministik bir başlangıç noktası ile çeşitlilik.
  const start = same.length > 0 ? h % same.length : 0;
  const rotated = [...same.slice(start), ...same.slice(0, start)];
  return rotated.slice(0, count);
}

/* -------------------------------------------------------------------------- */
/* Renkler (kategori aksanları)                                               */
/* -------------------------------------------------------------------------- */

export interface CategoryColor {
  badge: string;
  dot: string;
  tint: string;
  text: string;
}

const CATEGORY_COLOR: Record<string, CategoryColor> = {
  tech: { badge: "bg-cyan-100 text-cyan-700", dot: "bg-cyan-500", tint: "bg-cyan-50", text: "text-cyan-700" },
  ai: { badge: "bg-violet-100 text-violet-700", dot: "bg-violet-500", tint: "bg-violet-50", text: "text-violet-700" },
  saas: { badge: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500", tint: "bg-indigo-50", text: "text-indigo-700" },
  agency: { badge: "bg-rose-100 text-rose-700", dot: "bg-rose-400", tint: "bg-rose-50", text: "text-rose-700" },
  media: { badge: "bg-pink-100 text-pink-700", dot: "bg-pink-400", tint: "bg-pink-50", text: "text-pink-700" },
  photography: { badge: "bg-sky-100 text-sky-700", dot: "bg-sky-400", tint: "bg-sky-50", text: "text-sky-700" },
  construction: { badge: "bg-amber-100 text-amber-800", dot: "bg-amber-500", tint: "bg-amber-50", text: "text-amber-800" },
  architecture: { badge: "bg-stone-200 text-stone-800", dot: "bg-stone-500", tint: "bg-stone-100", text: "text-stone-800" },
  education: { badge: "bg-blue-100 text-blue-700", dot: "bg-blue-500", tint: "bg-blue-50", text: "text-blue-700" },
  health: { badge: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500", tint: "bg-emerald-50", text: "text-emerald-700" },
  food: { badge: "bg-orange-100 text-orange-800", dot: "bg-orange-500", tint: "bg-orange-50", text: "text-orange-800" },
  retail: { badge: "bg-fuchsia-100 text-fuchsia-700", dot: "bg-fuchsia-500", tint: "bg-fuchsia-50", text: "text-fuchsia-700" },
  travel: { badge: "bg-teal-100 text-teal-700", dot: "bg-teal-500", tint: "bg-teal-50", text: "text-teal-700" },
  logistics: { badge: "bg-slate-200 text-slate-800", dot: "bg-slate-500", tint: "bg-slate-100", text: "text-slate-800" },
  consulting: { badge: "bg-zinc-200 text-zinc-800", dot: "bg-zinc-600", tint: "bg-zinc-100", text: "text-zinc-800" },
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

/* -------------------------------------------------------------------------- */
/* Kategori istatistikleri                                                    */
/* -------------------------------------------------------------------------- */

export interface BrandCategoryStat {
  id: string;
  label: string;
  description: string;
  count: number;
  preview: string[];
  color: CategoryColor;
}

export function getCategoryStats(locale: Locale): BrandCategoryStat[] {
  return BRAND_CATEGORIES[locale].map((c) => {
    const items = getBrandsByCategory(locale, c.id);
    return {
      id: c.id,
      label: c.label,
      description: getCategoryDescription(locale, c.id),
      count: items.length,
      preview: items.slice(0, 3).map((i) => i.name),
      color: getCategoryColor(c.id),
    };
  });
}
