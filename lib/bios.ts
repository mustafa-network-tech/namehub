import type { Locale } from "@/types/common";
import type { Bio, BioCategoryDef, BioPlatform, BioPlatformDef } from "@/types/bio";
import { slugify } from "@/lib/nicknames";

/* -------------------------------------------------------------------------- */
/* Platformlar                                                                */
/* -------------------------------------------------------------------------- */

export const BIO_PLATFORMS: BioPlatformDef[] = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "whatsapp", label: "WhatsApp" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "X" },
];

const PLATFORM_ORDER: BioPlatform[] = [
  "instagram", "tiktok", "youtube", "whatsapp", "linkedin", "twitter",
];

export function getPlatformLabel(id: string): string {
  return BIO_PLATFORMS.find((p) => p.id === id)?.label ?? id;
}

export function findPlatform(id: string): BioPlatformDef | undefined {
  return BIO_PLATFORMS.find((p) => p.id === id);
}

// Platform rozet renkleri (marka tonlarına yakın, yumuşak).
const PLATFORM_BADGE: Record<string, string> = {
  instagram: "bg-pink-100 text-pink-700",
  tiktok: "bg-zinc-200 text-zinc-800",
  youtube: "bg-red-100 text-red-700",
  whatsapp: "bg-green-100 text-green-700",
  linkedin: "bg-blue-100 text-blue-700",
  twitter: "bg-sky-100 text-sky-700",
};

export function getPlatformBadge(id: string): string {
  return PLATFORM_BADGE[id] ?? "bg-bg text-muted";
}

/* -------------------------------------------------------------------------- */
/* Kategoriler                                                                */
/* -------------------------------------------------------------------------- */

export const BIO_CATEGORIES: Record<Locale, BioCategoryDef[]> = {
  tr: [
    { id: "melankolik", label: "Melankolik" },
    { id: "siirsel", label: "Şiirsel" },
    { id: "derin-anlamli", label: "Derin Anlamlı" },
    { id: "minimal", label: "Minimal" },
    { id: "komik", label: "Komik" },
    { id: "motivasyon", label: "Motivasyon" },
    { id: "basari", label: "Başarı" },
    { id: "liderlik", label: "Liderlik" },
    { id: "doga", label: "Doğa" },
    { id: "seyahat", label: "Seyahat" },
    { id: "fotografcilik", label: "Fotoğrafçılık" },
    { id: "teknoloji", label: "Teknoloji" },
    { id: "girisimcilik", label: "Girişimcilik" },
    { id: "romantik", label: "Romantik" },
    { id: "gizemli", label: "Gizemli" },
    { id: "havali", label: "Havalı" },
    { id: "modern", label: "Modern" },
    { id: "sade", label: "Sade" },
  ],
  en: [
    { id: "minimal", label: "Minimal" },
    { id: "motivational", label: "Motivational" },
    { id: "professional", label: "Professional" },
    { id: "leadership", label: "Leadership" },
    { id: "creative", label: "Creative" },
    { id: "photography", label: "Photography" },
    { id: "travel", label: "Travel" },
    { id: "nature", label: "Nature" },
    { id: "technology", label: "Technology" },
    { id: "entrepreneur", label: "Entrepreneur" },
    { id: "romantic", label: "Romantic" },
    { id: "funny", label: "Funny" },
    { id: "dark", label: "Dark" },
    { id: "mysterious", label: "Mysterious" },
    { id: "aesthetic", label: "Aesthetic" },
    { id: "modern", label: "Modern" },
    { id: "simple", label: "Simple" },
    { id: "cool", label: "Cool" },
  ],
};

export function getBioCategoryLabel(locale: Locale, id: string): string {
  return BIO_CATEGORIES[locale].find((c) => c.id === id)?.label ?? id;
}

export function findBioCategory(locale: Locale, id: string): BioCategoryDef | undefined {
  return BIO_CATEGORIES[locale].find((c) => c.id === id);
}

/* -------------------------------------------------------------------------- */
/* Renk paleti (ince, abartısız kategori aksanları)                           */
/* -------------------------------------------------------------------------- */

export interface BioColor {
  /** Çok hafif tonlu kart arka planı. */
  tint: string;
  /** Rozet arka plan + metin. */
  badge: string;
  /** Üst kenar aksanı. */
  border: string;
  /** Küçük nokta. */
  dot: string;
  /** Vurgu metni. */
  text: string;
}

// Tailwind JIT'in toplayabilmesi için tüm sınıflar literal stringlerdir.
const PALETTE: Record<string, BioColor> = {
  slate: { tint: "bg-slate-50", badge: "bg-slate-100 text-slate-700", border: "border-t-slate-300", dot: "bg-slate-400", text: "text-slate-700" },
  gray: { tint: "bg-gray-50", badge: "bg-gray-100 text-gray-700", border: "border-t-gray-300", dot: "bg-gray-400", text: "text-gray-700" },
  stone: { tint: "bg-stone-50", badge: "bg-stone-100 text-stone-700", border: "border-t-stone-300", dot: "bg-stone-400", text: "text-stone-700" },
  zinc: { tint: "bg-zinc-100", badge: "bg-zinc-200 text-zinc-800", border: "border-t-zinc-400", dot: "bg-zinc-500", text: "text-zinc-800" },
  neutral: { tint: "bg-neutral-100", badge: "bg-neutral-200 text-neutral-800", border: "border-t-neutral-400", dot: "bg-neutral-500", text: "text-neutral-800" },
  red: { tint: "bg-red-50", badge: "bg-red-100 text-red-700", border: "border-t-red-300", dot: "bg-red-400", text: "text-red-700" },
  orange: { tint: "bg-orange-50", badge: "bg-orange-100 text-orange-800", border: "border-t-orange-300", dot: "bg-orange-400", text: "text-orange-800" },
  amber: { tint: "bg-amber-50", badge: "bg-amber-100 text-amber-800", border: "border-t-amber-300", dot: "bg-amber-400", text: "text-amber-800" },
  yellow: { tint: "bg-yellow-50", badge: "bg-yellow-100 text-yellow-800", border: "border-t-yellow-300", dot: "bg-yellow-400", text: "text-yellow-800" },
  green: { tint: "bg-green-50", badge: "bg-green-100 text-green-700", border: "border-t-green-300", dot: "bg-green-400", text: "text-green-700" },
  emerald: { tint: "bg-emerald-50", badge: "bg-emerald-100 text-emerald-700", border: "border-t-emerald-300", dot: "bg-emerald-400", text: "text-emerald-700" },
  teal: { tint: "bg-teal-50", badge: "bg-teal-100 text-teal-700", border: "border-t-teal-300", dot: "bg-teal-400", text: "text-teal-700" },
  cyan: { tint: "bg-cyan-50", badge: "bg-cyan-100 text-cyan-700", border: "border-t-cyan-300", dot: "bg-cyan-400", text: "text-cyan-700" },
  sky: { tint: "bg-sky-50", badge: "bg-sky-100 text-sky-700", border: "border-t-sky-300", dot: "bg-sky-400", text: "text-sky-700" },
  blue: { tint: "bg-blue-50", badge: "bg-blue-100 text-blue-700", border: "border-t-blue-300", dot: "bg-blue-400", text: "text-blue-700" },
  indigo: { tint: "bg-indigo-50", badge: "bg-indigo-100 text-indigo-700", border: "border-t-indigo-300", dot: "bg-indigo-400", text: "text-indigo-700" },
  violet: { tint: "bg-violet-50", badge: "bg-violet-100 text-violet-700", border: "border-t-violet-300", dot: "bg-violet-400", text: "text-violet-700" },
  purple: { tint: "bg-purple-50", badge: "bg-purple-100 text-purple-700", border: "border-t-purple-300", dot: "bg-purple-400", text: "text-purple-700" },
  pink: { tint: "bg-pink-50", badge: "bg-pink-100 text-pink-700", border: "border-t-pink-300", dot: "bg-pink-400", text: "text-pink-700" },
  rose: { tint: "bg-rose-50", badge: "bg-rose-100 text-rose-700", border: "border-t-rose-300", dot: "bg-rose-400", text: "text-rose-700" },
};

const CATEGORY_PALETTE: Record<string, string> = {
  // Türkçe
  melankolik: "slate",
  siirsel: "violet",
  "derin-anlamli": "teal",
  minimal: "gray",
  komik: "yellow",
  motivasyon: "emerald",
  basari: "indigo",
  liderlik: "blue",
  doga: "green",
  seyahat: "cyan",
  fotografcilik: "amber",
  teknoloji: "sky",
  girisimcilik: "orange",
  romantik: "pink",
  gizemli: "purple",
  havali: "rose",
  modern: "neutral",
  sade: "stone",
  // İngilizce
  motivational: "emerald",
  professional: "blue",
  leadership: "indigo",
  creative: "violet",
  photography: "amber",
  travel: "cyan",
  nature: "green",
  technology: "sky",
  entrepreneur: "orange",
  romantic: "pink",
  funny: "yellow",
  dark: "zinc",
  mysterious: "purple",
  aesthetic: "rose",
  simple: "stone",
  cool: "teal",
};

const DEFAULT_BIO_COLOR: BioColor = {
  tint: "bg-card",
  badge: "bg-bg text-muted",
  border: "border-t-line",
  dot: "bg-line",
  text: "text-ink",
};

export function getBioCategoryColor(categoryId: string): BioColor {
  const name = CATEGORY_PALETTE[categoryId];
  return (name && PALETTE[name]) || DEFAULT_BIO_COLOR;
}

/* -------------------------------------------------------------------------- */
/* Kategori açıklamaları                                                      */
/* -------------------------------------------------------------------------- */

const CATEGORY_DESC: Record<Locale, Record<string, string>> = {
  tr: {
    melankolik: "Hüzün, özlem ve umut temalı bio fikirleri.",
    siirsel: "Edebi, imgesel ve şiirsel bio metinleri.",
    "derin-anlamli": "Düşündüren, anlam yüklü bio fikirleri.",
    minimal: "Sade, yalın ve net bio metinleri.",
    komik: "Eğlenceli, esprili bio fikirleri.",
    motivasyon: "İlham veren, motive eden bio metinleri.",
    basari: "Hedef ve başarı odaklı bio fikirleri.",
    liderlik: "Liderlik ve özgüven dolu bio metinleri.",
    doga: "Doğa, huzur ve açık hava temalı biolar.",
    seyahat: "Gezgin ruhlu, yol ve keşif temalı biolar.",
    fotografcilik: "Fotoğraf, ışık ve kadraj temalı biolar.",
    teknoloji: "Yazılım, teknoloji ve gelecek temalı biolar.",
    girisimcilik: "Girişimci ve üretken bio fikirleri.",
    romantik: "Sevgi ve duygu dolu bio metinleri.",
    gizemli: "Sırlı, merak uyandıran bio fikirleri.",
    havali: "Enerjik, dikkat çeken havalı biolar.",
    modern: "Güncel ve modern duruşlu bio metinleri.",
    sade: "Samimi, doğal ve sade bio fikirleri.",
  },
  en: {
    minimal: "Clean, simple and concise bio ideas.",
    motivational: "Inspiring, motivating bio lines.",
    professional: "Career-focused, professional bio ideas.",
    leadership: "Confident leadership bio lines.",
    creative: "Imaginative, artistic bio ideas.",
    photography: "Photo, light and frame themed bios.",
    travel: "Wanderlust, road and discovery bios.",
    nature: "Nature, calm and outdoor themed bios.",
    technology: "Code, tech and future themed bios.",
    entrepreneur: "Builder and hustle bio ideas.",
    romantic: "Warm, affectionate bio lines.",
    funny: "Playful, witty bio ideas.",
    dark: "Shadowy, deep and moody bios.",
    mysterious: "Secretive, intriguing bio ideas.",
    aesthetic: "Soft, dreamy and aesthetic bios.",
    modern: "Contemporary, sleek bio lines.",
    simple: "Honest, plain and simple bios.",
    cool: "Confident, stylish cool bios.",
  },
};

export function getBioCategoryDescription(locale: Locale, id: string): string {
  return CATEGORY_DESC[locale][id] ?? "";
}

/* -------------------------------------------------------------------------- */
/* Kelime bankaları: her kategori için kendi içinde tamamlanan kısa cümleler. */
/* opener + " " + ender daima dilbilgisel okunur (her ikisi de tam cümle).    */
/* -------------------------------------------------------------------------- */

interface Bank {
  openers: string[];
  enders: string[];
}

const TR_BANKS: Record<string, Bank> = {
  melankolik: {
    openers: ["Bir veda kadar sessizim.", "Geçmişe bir mektup bıraktım.", "Yorgun ama hâlâ buradayım.", "Hüznü zarafetle taşıyorum.", "Solgun bir gülümseme yeter.", "Uzaklara bakmayı seviyorum."],
    enders: ["Yine de umudu bırakmadım.", "Sessizlik en sadık dostum.", "Her şey geçer, ben kalırım.", "Bir gün herkes anlayacak.", "Kalbim eski şarkılarda.", "Belki yarın daha iyidir."],
  },
  siirsel: {
    openers: ["Kelimelerle resim çiziyorum.", "Dizelerin arasında yaşıyorum.", "Sözcüklerden bir ev kurdum.", "Mısralara saklandım yine.", "Hayalleri kâğıda döküyorum.", "Rüzgâra şiirler fısıldıyorum."],
    enders: ["Her satır bir nefes.", "Şiir, kalbin sessiz dili.", "Bir dize kadar inceyim.", "Kelimeler beni anlatır.", "Defterim hep yarım kalır.", "Sustukça çoğalıyorum."],
  },
  "derin-anlamli": {
    openers: ["Az konuşur, çok düşünürüm.", "Yüzeyin altını merak ederim.", "Anlamı detaylarda ararım.", "Sorular cevaplardan değerli.", "Sessizliğin sesini dinlerim.", "Her şeyin bir nedeni var."],
    enders: ["Derinlik gürültü istemez.", "Gerçek, sabırla bulunur.", "Düşünmek de bir yolculuk.", "Boşlukta bir anlam saklı.", "Az ama öz yaşıyorum.", "Cevaplar içeride başlar."],
  },
  minimal: {
    openers: ["Az eşya, çok huzur.", "Sadelik benim lüksüm.", "Gereksiz olanı bıraktım.", "Boş alan da güzeldir.", "Hayatı yalın seviyorum.", "Daha az, daha iyi."],
    enders: ["Geri kalanı detay.", "Sade kalmak bir seçim.", "Karmaşa bana göre değil.", "Net çizgiler, net zihin.", "Basit ama eksiksiz.", "Huzur sadelikte saklı."],
  },
  komik: {
    openers: ["Hayat ciddi, ben değil.", "Kahveden önce konuşmam.", "Planım yok, neşem var.", "Komik olmaya çalışmıyorum, oluyor.", "Diyet yarın başlıyor, yine.", "Uyku benim süper gücüm."],
    enders: ["Gülmek bedava, bol bol.", "Ciddiyet abartılıyor bence.", "Kahkaha en iyi filtre.", "Sorun yok, atıştırmalık var.", "Gülümse, bedava çünkü.", "Eğlence garanti, gerisi teferruat."],
  },
  motivasyon: {
    openers: ["Bugün dünden güçlüyüm.", "Bahane değil, adım atıyorum.", "Düşsem de kalkarım.", "Hedefe bir adım daha.", "Korku değil, cesaret seçtim.", "Küçük adımlar büyük yollar."],
    enders: ["Vazgeçmek listemde yok.", "Disiplin özgürlüktür.", "Yarın bugünle başlar.", "İnan ve çalış, yeter.", "Sınırlar zihinde başlar.", "Devam et, duraksama."],
  },
  basari: {
    openers: ["Hayalleri plana çeviriyorum.", "Çalıştım, şansa bırakmadım.", "Sonuç değil, süreç önemli.", "Hedefime kilitlendim.", "Az konuş, çok üret.", "Bugün ekiyorum, yarın biçeceğim."],
    enders: ["Başarı bir alışkanlık.", "Emek er geç kazanır.", "Zirve sabır ister.", "Sayılar yalan söylemez.", "Odak, her şeyin anahtarı.", "Kazanmak hazırlıkla başlar."],
  },
  liderlik: {
    openers: ["Önden yürümeyi seçtim.", "Sorumluluk benim işim.", "Ekibim, gücüm demek.", "Karar veririm, arkasında dururum.", "Örnek olmak emir vermekten iyidir.", "Vizyon olmadan yol olmaz."],
    enders: ["Liderlik hizmet etmektir.", "Güven kazanılır, verilmez.", "Birlikte daha güçlüyüz.", "Sözüm senettir.", "Yol gösteren önce yürür.", "Cesaret, liderin pusulası."],
  },
  doga: {
    openers: ["Dağlar beni çağırıyor.", "Toprağın kokusunu özledim.", "Ormanda nefes alıyorum.", "Gökyüzü en geniş tavan.", "Yeşil her zaman doğru renk.", "Doğa en iyi terapist."],
    enders: ["Açık havada özgürüm.", "Doğa hep haklı çıkar.", "Patikalar beni iyileştirir.", "Sessizlik kuş sesleriyle dolu.", "Mevsimler bana yol gösterir.", "Toprağa dönmek huzur."],
  },
  seyahat: {
    openers: ["Pasaportum kalbimle dolu.", "Yeni şehirler topluyorum.", "Yol benim evim.", "Haritada henüz çok yer var.", "Bavulum hep hazır.", "Bilinmeyene doğru gidiyorum."],
    enders: ["Anılar en iyi suvenir.", "Her yol bir hikâye.", "Kaybolmak da keşiftir.", "Dünya okunacak bir kitap.", "Gitmek, biraz büyümek.", "Sınırlar haritada kalsın."],
  },
  fotografcilik: {
    openers: ["Anı kareye çeviriyorum.", "Işığı kovalıyorum hep.", "Mavi kadrajda kayboldum.", "Detaylar benim hikâyem.", "Objektifin ardında özgürüm.", "Manzaralar en sadık modelim."],
    enders: ["Her kare bir an.", "Işık en iyi fırçam.", "Gölgeler de hikâye anlatır.", "Çerçevede zaman durur.", "Bir fotoğraf bin kelime.", "Kadraj, dünyaya penceredir."],
  },
  teknoloji: {
    openers: ["Kod yazarak düşünürüm.", "Geleceği bugünden kuruyorum.", "Hatalar öğretmenim.", "Sıfırlar ve birler dilim.", "Yeniyi denemekten korkmam.", "Sistem değil, çözüm üretirim."],
    enders: ["Teknoloji araç, vizyon amaç.", "Otomasyon zaman kazandırır.", "Veride desen ararım.", "Kur, dene, tekrarla.", "İnovasyon merak ister.", "Gelecek açık kaynak."],
  },
  girisimcilik: {
    openers: ["Sıfırdan inşa ediyorum.", "Riskleri hesaplı alırım.", "Bir fikir, bir başlangıç.", "Problemleri fırsata çeviririm.", "Kendi yolumu çiziyorum.", "Bugün kur, yarın büyüt."],
    enders: ["Vazgeçmek seçenek değil.", "Değer üret, gerisi gelir.", "Hızlı dene, hızlı öğren.", "Müşteri her şeyin merkezi.", "Cesaret sermayedendir.", "Büyük işler küçük başlar."],
  },
  romantik: {
    openers: ["Kalbim hep bahar.", "Sevgiyle bakıyorum dünyaya.", "Bir gülüşe âşığım.", "İncelikle seviyorum.", "Kalbimde sıcak bir yer var.", "Aşk en güzel dil."],
    enders: ["Sevmek cesaret ister.", "Kalbim seninle ısınır.", "Aşk, sessiz bir söz.", "Her şey sevgiyle güzel.", "Tutku, yaşamın rengi.", "Sevgi çoğaldıkça büyür."],
  },
  gizemli: {
    openers: ["Az gösteririm, çok saklarım.", "Sırlarımı geceye anlatırım.", "Gölgelerde rahatım.", "Herkesin bilmediği bir yanım var.", "Sessizliğim bir bilmece.", "Merak uyandırmayı severim."],
    enders: ["Her şeyi söylemem.", "Gizem, çekiciliğin yarısı.", "Maskenin ardı daha derin.", "Bilinmezlik beni özgür kılar.", "Sırlar güçtür.", "Anlamak için yaklaş."],
  },
  havali: {
    openers: ["Tarzım konuşur benim yerime.", "Enerjim yüksek, modum tavan.", "Kuralları kendim yazarım.", "Sahne benim, ışıklar açık.", "Dikkat çekmek işim.", "Kendime güvenim tam."],
    enders: ["Kopya değil, orijinalim.", "Stilim hiç eskimez.", "Enerji yüksek kalsın.", "Herkes bakar, ben yürürüm.", "Havalı olmak bir tutum.", "Sınır tanımam."],
  },
  modern: {
    openers: ["Geleceğe ayak uyduruyorum.", "Yeni çağın insanıyım.", "Minimal ama güçlü duruyorum.", "Trendi takip değil, kurarım.", "Dijital dünyada evimdeyim.", "Sade çizgiler, net fikirler."],
    enders: ["Eski moda bana göre değil.", "Güncel kalmak bir disiplin.", "Form ve işlev bir arada.", "Gelecek şimdi başlıyor.", "Az süs, çok anlam.", "Modern ama insani."],
  },
  sade: {
    openers: ["Olduğum gibiyim.", "Gösterişe ihtiyacım yok.", "Sade yaşamak özgürlük.", "Doğallık en iyi filtre.", "Az şeyle mutluyum.", "İçten ve yalınım."],
    enders: ["Samimiyet her şeyden değerli.", "Sadelik asla eskimez.", "Olduğun gibi kal.", "Huzur basit şeylerde.", "Gerçek, süse gerek duymaz.", "Az ama hakiki."],
  },
};

const EN_BANKS: Record<string, Bank> = {
  minimal: {
    openers: ["Less stuff, more peace.", "Simplicity is my luxury.", "I dropped the unnecessary.", "Empty space is beautiful too.", "I keep life clean.", "Less, but better."],
    enders: ["The rest is just detail.", "Clean lines, clear mind.", "Calm lives in simplicity.", "No clutter, no noise.", "Simple yet complete.", "Quiet by design."],
  },
  motivational: {
    openers: ["Stronger than yesterday.", "No excuses, just steps.", "I rise every time.", "One step closer today.", "I chose courage over fear.", "Small steps, long roads."],
    enders: ["Quitting isn't on my list.", "Discipline is freedom.", "Tomorrow starts today.", "Believe and work.", "Limits live in the mind.", "Keep going, don't pause."],
  },
  professional: {
    openers: ["I turn ideas into results.", "Driven by purpose.", "I let the work speak.", "Focused on outcomes.", "Building value daily.", "Reliability is my brand."],
    enders: ["Always learning, always shipping.", "Trust is earned.", "Details make the difference.", "Results over noise.", "Growth is a habit.", "Excellence, on repeat."],
  },
  leadership: {
    openers: ["I lead from the front.", "Responsibility is my job.", "My team is my strength.", "I decide and stand by it.", "Lead by example, not orders.", "No vision, no path."],
    enders: ["Leadership is service.", "Trust is built, not given.", "Stronger together.", "My word is my bond.", "Guides walk first.", "Courage is a leader's compass."],
  },
  creative: {
    openers: ["I think in colors.", "Ideas keep me awake.", "I build worlds from nothing.", "Curiosity is my fuel.", "I break the template.", "Making is my language."],
    enders: ["Creativity needs no permission.", "Every blank page is a chance.", "Imagination over rules.", "I create, therefore I am.", "Bold ideas only.", "Art is a quiet rebellion."],
  },
  photography: {
    openers: ["I turn moments into frames.", "Always chasing the light.", "Lost in a blue frame.", "Details are my story.", "Free behind the lens.", "Landscapes are my muse."],
    enders: ["Every frame is a moment.", "Light is my brush.", "Shadows tell stories too.", "Time stops in the frame.", "One photo, a thousand words.", "A lens is a window."],
  },
  travel: {
    openers: ["My passport holds my heart.", "Collecting cities, not things.", "The road is my home.", "So many pins to drop.", "My bag is always packed.", "Headed toward the unknown."],
    enders: ["Memories are the best souvenir.", "Every road is a story.", "Getting lost is discovery.", "The world is a book.", "To go is to grow.", "Borders stay on maps."],
  },
  nature: {
    openers: ["The mountains are calling.", "I miss the scent of earth.", "I breathe in the forest.", "The sky is my ceiling.", "Green is always right.", "Nature is my therapist."],
    enders: ["Free in the open air.", "Nature is always right.", "Trails heal me.", "Silence full of birdsong.", "Seasons show the way.", "Grounded and grateful."],
  },
  technology: {
    openers: ["I think by writing code.", "Building the future today.", "Bugs are my teachers.", "Zeros and ones, my language.", "Never afraid to ship.", "I make solutions, not excuses."],
    enders: ["Tech is a tool, vision is the goal.", "Automation buys time.", "I find patterns in data.", "Build, test, repeat.", "Innovation needs curiosity.", "The future is open source."],
  },
  entrepreneur: {
    openers: ["Building from zero.", "I take calculated risks.", "One idea, one start.", "I turn problems into chances.", "Drawing my own path.", "Build today, scale tomorrow."],
    enders: ["Quitting isn't an option.", "Create value, the rest follows.", "Fail fast, learn faster.", "The customer is the center.", "Courage is my capital.", "Big things start small."],
  },
  romantic: {
    openers: ["My heart is always spring.", "I see the world with love.", "In love with a smile.", "I love gently.", "There's a warm spot in my heart.", "Love is the sweetest language."],
    enders: ["Loving takes courage.", "My heart warms with you.", "Love is a quiet word.", "Everything is better with love.", "Passion colors life.", "Love grows when shared."],
  },
  funny: {
    openers: ["Life's serious, I'm not.", "No talk before coffee.", "No plan, just vibes.", "I'm not trying to be funny.", "Diet starts tomorrow, again.", "Sleep is my superpower."],
    enders: ["Laughs are free, take plenty.", "Seriousness is overrated.", "Laughter is the best filter.", "No worries, snacks exist.", "Smile, it's free.", "Fun guaranteed, rest is detail."],
  },
  dark: {
    openers: ["At home in the shadows.", "I keep my storms quiet.", "The night understands me.", "Comfortable in the dark.", "I wear silence well.", "Not everything needs light."],
    enders: ["Darkness has its own peace.", "I glow in the quiet.", "Shadows know my name.", "Less light, more depth.", "I don't fear the night.", "Mystery is my armor."],
  },
  mysterious: {
    openers: ["I show little, hide a lot.", "I tell secrets to the night.", "There's more than you see.", "My silence is a riddle.", "I keep them guessing.", "Half-known, fully free."],
    enders: ["I won't tell it all.", "Mystery is half the charm.", "Behind the mask runs deeper.", "The unknown sets me free.", "Secrets are power.", "Come closer to understand."],
  },
  aesthetic: {
    openers: ["Soft tones, soft soul.", "I live in pastel light.", "Dreamy by default.", "Beauty in the little things.", "Curating quiet moments.", "A gentle kind of glow."],
    enders: ["Calm is my palette.", "Soft but never small.", "Dreaming in color.", "Aesthetic is a feeling.", "Slow and lovely.", "Less noise, more glow."],
  },
  modern: {
    openers: ["Keeping pace with the future.", "A person of the new age.", "Minimal yet strong.", "I set trends, not follow.", "At home in the digital world.", "Clean lines, clear ideas."],
    enders: ["Old-fashioned isn't for me.", "Staying current is discipline.", "Form and function together.", "The future starts now.", "Less decor, more meaning.", "Modern, but human."],
  },
  simple: {
    openers: ["I am as I am.", "No need for show.", "Living simply is freedom.", "Natural is the best filter.", "Happy with little.", "Honest and plain."],
    enders: ["Sincerity over everything.", "Simple never goes out of style.", "Stay as you are.", "Peace in plain things.", "Truth needs no decoration.", "Little, but real."],
  },
  cool: {
    openers: ["My style speaks for me.", "High energy, top mood.", "I write my own rules.", "Spotlight's on, let's go.", "Turning heads is my job.", "Confidence on full."],
    enders: ["Original, never a copy.", "My style never fades.", "Keep the vibe high.", "They look, I walk.", "Cool is an attitude.", "I know no limits."],
  },
};

/* -------------------------------------------------------------------------- */
/* Jeneratör                                                                  */
/* -------------------------------------------------------------------------- */

const PER_CATEGORY = 28;

function slugFromText(text: string): string {
  return slugify(text.split(/\s+/).slice(0, 8).join(" "));
}

function generateBios(locale: Locale): Bio[] {
  const banks = locale === "tr" ? TR_BANKS : EN_BANKS;
  const cats = BIO_CATEGORIES[locale];
  const out: Bio[] = [];
  const seenSlug = new Set<string>();
  let platformIndex = 0;

  for (const cat of cats) {
    const bank = banks[cat.id];
    if (!bank) continue;
    let made = 0;
    for (const opener of bank.openers) {
      for (const ender of bank.enders) {
        if (made >= PER_CATEGORY) break;
        const text = `${opener} ${ender}`;
        let slug = slugFromText(text);
        if (!slug) continue;
        let unique = slug;
        let n = 2;
        while (seenSlug.has(unique)) unique = `${slug}-${n++}`;
        seenSlug.add(unique);

        out.push({
          id: `${locale}-bio-${unique}`,
          slug: unique,
          text,
          language: locale,
          platform: PLATFORM_ORDER[platformIndex % PLATFORM_ORDER.length],
          category: cat.id,
        });
        platformIndex++;
        made++;
      }
      if (made >= PER_CATEGORY) break;
    }
  }

  return out;
}

/* -------------------------------------------------------------------------- */
/* Genel API                                                                  */
/* -------------------------------------------------------------------------- */

const CACHE: Partial<Record<Locale, Bio[]>> = {};

export function getBios(locale: Locale): Bio[] {
  if (!CACHE[locale]) CACHE[locale] = generateBios(locale);
  return CACHE[locale]!;
}

export function findBio(locale: Locale, slug: string): Bio | undefined {
  return getBios(locale).find((b) => b.slug === slug);
}

export function getBiosByCategory(locale: Locale, categoryId: string): Bio[] {
  return getBios(locale).filter((b) => b.category === categoryId);
}

export function getBiosByPlatform(locale: Locale, platform: string): Bio[] {
  return getBios(locale).filter((b) => b.platform === platform);
}

export function getSameCategoryBios(locale: Locale, item: Bio, count = 6): Bio[] {
  return getBios(locale)
    .filter((b) => b.category === item.category && b.slug !== item.slug)
    .slice(0, count);
}

/** Aynı platformdan, farklı bir karışım (öneri amaçlı). */
export function getRelatedBios(locale: Locale, item: Bio, count = 6): Bio[] {
  const all = getBios(locale).filter((b) => b.slug !== item.slug);
  const samePlatform = all.filter((b) => b.platform === item.platform && b.category !== item.category);
  const rest = all.filter((b) => b.platform !== item.platform);
  return [...samePlatform, ...rest].slice(0, count);
}

export interface BioCategoryStat {
  id: string;
  label: string;
  description: string;
  count: number;
  preview: string[];
  color: BioColor;
}

export function getBioCategoryStats(locale: Locale): BioCategoryStat[] {
  return BIO_CATEGORIES[locale].map((c) => {
    const items = getBiosByCategory(locale, c.id);
    return {
      id: c.id,
      label: c.label,
      description: getBioCategoryDescription(locale, c.id),
      count: items.length,
      preview: items.slice(0, 2).map((i) => i.text),
      color: getBioCategoryColor(c.id),
    };
  });
}

export interface PlatformStat {
  id: BioPlatform;
  label: string;
  count: number;
  badge: string;
}

export function getPlatformStats(locale: Locale): PlatformStat[] {
  return BIO_PLATFORMS.map((p) => ({
    id: p.id,
    label: p.label,
    count: getBiosByPlatform(locale, p.id).length,
    badge: getPlatformBadge(p.id),
  }));
}
