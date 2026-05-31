import type { Locale } from "@/types/common";

export type PromoIcon =
  | "briefcase"
  | "code"
  | "camera"
  | "sparkles"
  | "book"
  | "scissors"
  | "chart"
  | "messages";

export interface Promo {
  id: string;
  title: string;
  description: Record<Locale, string>;
  url: string;
  /** Rotasyon ağırlığı (toplam 100). */
  weight: number;
  /** Tailwind gradyan sınıfları (koyu zemin, beyaz metin). */
  gradient: string;
  cta: Record<Locale, string>;
  icon: PromoIcon;
  /** 3 kısa hizmet/değer etiketi. */
  features: Record<Locale, string[]>;
  /** Alttaki kayan yazı (marquee) için anahtar kelimeler. */
  marquee: Record<Locale, string[]>;
}

// Birincil siteler en sık; ikincil siteler nadiren görünür.
// Ağırlık toplamı 100: 30 + 30 + 25 + 10 + (4 × 1.25 = 5).
export const PROMOS: Promo[] = [
  {
    id: "mustafaoner",
    title: "MustafaÖner.net",
    description: {
      tr: "Kişisel portföy, web projeleri, yazılar ve dijital çalışmalar.",
      en: "Personal portfolio, web projects, articles and digital works.",
    },
    url: "https://mustafaoner.net/tr",
    weight: 30,
    gradient: "from-blue-600 to-blue-800",
    cta: { tr: "Projeleri Keşfet", en: "Explore Projects" },
    icon: "briefcase",
    features: {
      tr: ["Portföy", "Projeler", "Yazılar"],
      en: ["Portfolio", "Projects", "Articles"],
    },
    marquee: {
      tr: ["Web Projeleri", "Dijital Çalışmalar", "Portföy", "Yazılar", "Demo Siteler", "Mustafa Öner"],
      en: ["Web Projects", "Digital Works", "Portfolio", "Articles", "Demo Sites", "Mustafa Öner"],
    },
  },
  {
    id: "mk-digital",
    title: "MK Digital Systems",
    description: {
      tr: "Web sitesi, özel yazılım, SaaS ve dijital sistem çözümleri.",
      en: "Websites, custom software, SaaS and digital system solutions.",
    },
    url: "https://mk-digital-systems.vercel.app/en",
    weight: 30,
    gradient: "from-blue-900 to-slate-900",
    cta: { tr: "Teklif Al", en: "Get Proposal" },
    icon: "code",
    features: {
      tr: ["Web Sitesi", "Yazılım", "SaaS"],
      en: ["Website", "Software", "SaaS"],
    },
    marquee: {
      tr: ["Kurumsal Web Sitesi", "Özel Yazılım", "SaaS Sistemleri", "Yönetim Paneli", "CRM", "ERP", "Dijital Çözümler"],
      en: ["Corporate Website", "Custom Software", "SaaS Systems", "Admin Panel", "CRM", "ERP", "Digital Solutions"],
    },
  },
  {
    id: "mavikadraj",
    title: "Mavi Kadraj",
    description: {
      tr: "Doğa fotoğrafları, görsel hikâyeler ve kadrajdan kalbe akan içerikler.",
      en: "Nature photography, visual stories and content from the frame to the heart.",
    },
    url: "https://www.mavikadraj.com.tr/",
    weight: 25,
    gradient: "from-emerald-600 to-green-800",
    cta: { tr: "Doğayı Keşfet", en: "Discover Nature" },
    icon: "camera",
    features: {
      tr: ["Fotoğraf", "Doğa", "Hikâye"],
      en: ["Photography", "Nature", "Stories"],
    },
    marquee: {
      tr: ["Doğa Fotoğrafları", "Görsel Hikâyeler", "Mavi Kadraj", "Kadrajdan Kalbe", "Fotoğraf Galerisi", "Blog Yazıları"],
      en: ["Nature Photos", "Visual Stories", "Mavi Kadraj", "Frame to Heart", "Photo Gallery", "Blog Posts"],
    },
  },
  {
    id: "aria",
    title: "ARIA Demo",
    description: {
      tr: "Modern, şık ve hızlı web arayüzü deneyimi.",
      en: "A modern, sleek and fast web interface experience.",
    },
    url: "https://aria-demo-omega.vercel.app/",
    weight: 10,
    gradient: "from-purple-600 to-indigo-800",
    cta: { tr: "Demoyu Gör", en: "View Demo" },
    icon: "sparkles",
    features: {
      tr: ["Modern UI", "Demo", "Web Tasarım"],
      en: ["Modern UI", "Demo", "Web Design"],
    },
    marquee: {
      tr: ["Modern Web Tasarım", "Responsive Arayüz", "UI Showcase", "Landing Page", "Premium Tasarım"],
      en: ["Modern Web Design", "Responsive UI", "UI Showcase", "Landing Page", "Premium Design"],
    },
  },
  {
    id: "siir",
    title: "Şiir Dünyası",
    description: {
      tr: "Şiirler, dizeler ve edebi içeriklerin buluştuğu dünya.",
      en: "A world where poems, verses and literary content meet.",
    },
    url: "https://siirdunyasi.com.tr/",
    weight: 1.25,
    gradient: "from-amber-700 to-stone-800",
    cta: { tr: "Şiirleri Oku", en: "Read Poems" },
    icon: "book",
    features: {
      tr: ["Şiir", "Edebiyat", "Dize"],
      en: ["Poetry", "Literature", "Verse"],
    },
    marquee: {
      tr: ["Şiirler", "Dizeler", "Edebiyat", "Şair Köşesi", "Günün Şiiri"],
      en: ["Poems", "Verses", "Literature", "Poet's Corner", "Poem of the Day"],
    },
  },
  {
    id: "beauty",
    title: "Beauty Salon Demo",
    description: {
      tr: "Güzellik salonu için modern, randevu odaklı demo web sitesi.",
      en: "A modern, booking-focused demo website for a beauty salon.",
    },
    url: "https://guzellik-salonu-demo-web.vercel.app/",
    weight: 1.25,
    gradient: "from-pink-500 to-rose-700",
    cta: { tr: "Demoyu Gör", en: "View Demo" },
    icon: "scissors",
    features: {
      tr: ["Güzellik", "Salon", "Randevu"],
      en: ["Beauty", "Salon", "Booking"],
    },
    marquee: {
      tr: ["Güzellik Salonu", "Online Randevu", "Bakım", "Demo Web Sitesi"],
      en: ["Beauty Salon", "Online Booking", "Care", "Demo Website"],
    },
  },
  {
    id: "consulting",
    title: "Consulting Demo",
    description: {
      tr: "Danışmanlık firmaları için profesyonel demo web sitesi.",
      en: "A professional demo website for consulting firms.",
    },
    url: "https://danismanlik-demo.vercel.app/",
    weight: 1.25,
    gradient: "from-slate-800 to-blue-950",
    cta: { tr: "Demoyu Gör", en: "View Demo" },
    icon: "chart",
    features: {
      tr: ["Danışmanlık", "Strateji", "Demo"],
      en: ["Consulting", "Strategy", "Demo"],
    },
    marquee: {
      tr: ["Danışmanlık", "Strateji", "Kurumsal Çözümler", "Demo Web Sitesi"],
      en: ["Consulting", "Strategy", "Corporate Solutions", "Demo Website"],
    },
  },
  {
    id: "mavi-iletisim",
    title: "Mavi İletişim Demo",
    description: {
      tr: "İletişim ve reklam ajansları için modern demo web sitesi.",
      en: "A modern demo website for communication and advertising agencies.",
    },
    url: "https://mavi-iletisim-demo.vercel.app/",
    weight: 1.25,
    gradient: "from-cyan-500 to-sky-700",
    cta: { tr: "Demoyu Gör", en: "View Demo" },
    icon: "messages",
    features: {
      tr: ["İletişim", "Ajans", "Reklam"],
      en: ["Communication", "Agency", "Ads"],
    },
    marquee: {
      tr: ["İletişim Ajansı", "Marka", "Reklam", "Demo Web Sitesi"],
      en: ["Communication Agency", "Branding", "Advertising", "Demo Website"],
    },
  },
];

const TOTAL_WEIGHT = PROMOS.reduce((sum, p) => sum + p.weight, 0);

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/**
 * Verilen seed (ör. sayfa slug'ı) için ağırlıklı, deterministik banner seçer.
 * Aynı seed her zaman aynı banner'ı verir → SSG ve hidrasyon uyumludur,
 * sayfalar genelinde dağılım belirtilen yüzdelere yaklaşır.
 */
export function pickPromo(seed: string): Promo {
  const r = (hashString(seed) % 100000) / 100000 * TOTAL_WEIGHT;
  let acc = 0;
  for (const p of PROMOS) {
    acc += p.weight;
    if (r < acc) return p;
  }
  return PROMOS[0];
}
