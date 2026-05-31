"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/ui/SearchInput";
import type { Locale } from "@/types/common";

interface HeroSearchProps {
  locale: Locale;
}

const COPY = {
  tr: {
    title: "İsmini, Markanı ve Dijital Kimliğini Keşfet",
    subtitle:
      "10.000+ isim, kullanıcı adı, oyun nicki, evcil hayvan ismi, bio önerisi ve marka fikri tek platformda.",
    placeholder:
      "Bir isim, nick, kullanıcı adı, evcil hayvan ismi veya marka fikri ara...",
    button: "Ara",
    badges: [
      "Bebek İsimleri",
      "Evcil Hayvan İsimleri",
      "Oyun Nickleri",
      "Kullanıcı Adları",
      "Bio Önerileri",
      "Marka İsimleri",
    ],
  },
  en: {
    title: "Discover Your Name, Brand and Digital Identity",
    subtitle:
      "10,000+ names, usernames, gaming nicknames, pet names, bio ideas and brand ideas — all on one platform.",
    placeholder:
      "Search a name, nickname, username, pet name or brand idea...",
    button: "Search",
    badges: [
      "Baby Names",
      "Pet Names",
      "Gaming Nicknames",
      "Usernames",
      "Bio Ideas",
      "Brand Names",
    ],
  },
};

const BADGE_LINKS: Record<Locale, string[]> = {
  tr: [
    "/tr/bebek-isimleri",
    "/tr/evcil-hayvan-isimleri",
    "/tr/nickler",
    "/tr/kullanici-adlari",
    "/tr/bio-onerileri",
    "/tr/marka-isimleri",
  ],
  en: [
    "/en/baby-names",
    "/en/pet-names",
    "/en/nicknames",
    "/en/usernames",
    "/en/bio-ideas",
    "/en/brand-names",
  ],
};

// Hero görsel döngüsü — her 5 saniyede bir yumuşak fade ile değişir.
// Sıra: Kız Bebek → Erkek Bebek → Kedi → Köpek → Kuş → Tavşan
const HERO_IMAGES: { src: string; tr: string; en: string }[] = [
  { src: "/images/girl-baby/girl-1.jpg", tr: "Kız Bebek İsimleri", en: "Girl Baby Names" },
  { src: "/images/boy-baby/boy-1.jpg", tr: "Erkek Bebek İsimleri", en: "Boy Baby Names" },
  { src: "/images/cat/cat-1.jpg", tr: "Kedi İsimleri", en: "Cat Names" },
  { src: "/images/dog/dog-1.jpg", tr: "Köpek İsimleri", en: "Dog Names" },
  { src: "/images/bird/bird-1.jpg", tr: "Kuş İsimleri", en: "Bird Names" },
  { src: "/images/rabbit/rabbit-1.jpg", tr: "Tavşan İsimleri", en: "Rabbit Names" },
];

const ROTATE_MS = 5000;

export default function HeroSearch({ locale }: HeroSearchProps) {
  const router = useRouter();
  const t = COPY[locale];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_IMAGES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  function handleSearch(value: string) {
    const base = locale === "tr" ? "/tr/bebek-isimleri" : "/en/baby-names";
    router.push(value ? `${base}?q=${encodeURIComponent(value)}` : base);
  }

  return (
    <section className="relative overflow-hidden">
      {/* Yumuşak dekoratif arka plan — sayfanın boş görünmesini engeller */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-56 w-72 -translate-x-1/2 rounded-full bg-violet-100/40 blur-3xl" />
      </div>

      <div className="container-page grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
        {/* Görsel panel — mobilde üstte, masaüstünde sağda */}
        <div className="order-1 lg:order-2">
          <div className="relative h-60 w-full overflow-hidden rounded-3xl border border-line shadow-soft-lg sm:h-80 lg:h-[460px]">
            {HERO_IMAGES.map((img, i) => (
              <Image
                key={img.src}
                src={img.src}
                alt={locale === "tr" ? img.tr : img.en}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 45vw"
                className={`object-cover transition-opacity duration-1000 ease-in-out ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Masaüstü: sol kenarı beyaza karışan gradient (metin alanıyla yumuşak geçiş) */}
            <div
              className="absolute inset-0 hidden lg:block"
              aria-hidden="true"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.60))",
              }}
            />
            {/* Mobil: alt kenarı beyaza karışan gradient (alttaki içerikle yumuşak geçiş) */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent lg:hidden"
              aria-hidden="true"
            />

            {/* Aktif kategori etiketi */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-line/70 bg-white/85 px-3.5 py-1.5 text-sm font-semibold text-ink shadow-soft backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              {locale === "tr" ? HERO_IMAGES[active].tr : HERO_IMAGES[active].en}
            </div>
          </div>
        </div>

        {/* İçerik — mobilde altta, masaüstünde solda */}
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-muted shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden="true" />
            {locale === "tr"
              ? "İsim ve dijital kimlik platformu"
              : "Name & digital identity platform"}
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
            {t.subtitle}
          </p>

          <div className="mx-auto mt-8 max-w-xl lg:mx-0">
            <SearchInput
              placeholder={t.placeholder}
              buttonLabel={t.button}
              size="lg"
              onSearch={handleSearch}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            {t.badges.map((badge, i) => (
              <a
                key={badge}
                href={BADGE_LINKS[locale][i]}
                className="focus-ring inline-flex items-center rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-medium text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-soft"
              >
                {badge}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
