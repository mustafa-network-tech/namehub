import Link from "next/link";
import { Flame } from "lucide-react";
import type { Locale } from "@/types/common";

export interface PopularItem {
  label: string;
  href: string;
}

// Dinamik veriye hazır: ileride API/DB'den beslenebilir.
// Şimdilik statik örnek veri (label + ilgili kategori bağlantısı).
const DEFAULTS: Record<Locale, PopularItem[]> = {
  tr: [
    { label: "Aylin", href: "/tr/bebek-isimleri?q=Aylin" },
    { label: "Zeynep", href: "/tr/bebek-isimleri?q=Zeynep" },
    { label: "Emma", href: "/en/baby-names?q=Emma" },
    { label: "Olivia", href: "/en/baby-names?q=Olivia" },
    { label: "Luna", href: "/tr/evcil-hayvan-isimleri?q=Luna" },
    { label: "Pamuk", href: "/tr/kedi-isimleri?q=Pamuk" },
    { label: "ShadowNinja", href: "/tr/nickler?q=ShadowNinja" },
    { label: "CreativeLab", href: "/tr/marka-isimleri?q=CreativeLab" },
  ],
  en: [
    { label: "Aylin", href: "/tr/bebek-isimleri?q=Aylin" },
    { label: "Zeynep", href: "/tr/bebek-isimleri?q=Zeynep" },
    { label: "Emma", href: "/en/baby-names?q=Emma" },
    { label: "Olivia", href: "/en/baby-names?q=Olivia" },
    { label: "Luna", href: "/en/pet-names?q=Luna" },
    { label: "Pamuk", href: "/en/cat-names?q=Pamuk" },
    { label: "ShadowNinja", href: "/en/nicknames?q=ShadowNinja" },
    { label: "CreativeLab", href: "/en/brand-names?q=CreativeLab" },
  ],
};

export default function PopularSearches({
  locale,
  items,
}: {
  locale: Locale;
  items?: PopularItem[];
}) {
  const data = items ?? DEFAULTS[locale];
  const title = locale === "tr" ? "Bugün Popüler" : "Trending Today";

  return (
    <section className="container-page py-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
          <Flame size={18} className="text-orange-500" aria-hidden="true" />
          {title}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {data.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="focus-ring inline-flex items-center rounded-full border border-line bg-white px-3 py-1.5 text-sm font-medium text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-soft"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
