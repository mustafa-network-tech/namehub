"use client";

import Image from "next/image";
import { showToast } from "@/components/ui/Toast";
import { TOASTS } from "@/components/prelaunch/config";

interface PreviewCard {
  icon: string;
  title: string;
  description: string;
  examples: string[];
  accent: string; // tailwind gradient sınıfları
  ring: string;
  image: string;
}

const CARDS: PreviewCard[] = [
  {
    icon: "👶",
    title: "Bebek İsimleri",
    description: "Anlamı, kökeni ve cinsiyetiyle binlerce özenle seçilmiş bebek ismi.",
    examples: ["Aylin", "Defne", "Aras"],
    accent: "from-rose-100 to-pink-50",
    ring: "ring-rose-100",
    image: "/images/girl-baby/girl-1.jpg",
  },
  {
    icon: "🐶",
    title: "Evcil Hayvan İsimleri",
    description: "Kedi, köpek, kuş ve daha fazlası için sevimli ve karakterli isimler.",
    examples: ["Pamuk", "Boncuk", "Zeytin"],
    accent: "from-amber-100 to-orange-50",
    ring: "ring-amber-100",
    image: "/images/dog/dog-1.jpg",
  },
  {
    icon: "🎮",
    title: "Nickler",
    description: "Kişiliğini, oyun tarzını veya sosyal medya duruşunu yansıtan yaratıcı nickler.",
    examples: ["★彡 Kırık Düş 彡★", "『Yalnız Adam』", "☾ Elbet Bir Gün ☽"],
    accent: "from-indigo-100 to-violet-50",
    ring: "ring-indigo-100",
    image: "/images/cat/cat-1.jpg",
  },
  {
    icon: "📱",
    title: "Kullanıcı Adları",
    description: "Instagram, TikTok, YouTube ve daha fazlası için müsait, akılda kalıcı handle'lar.",
    examples: ["@quiet.frame", "@daily.pixel", "@soft.lens"],
    accent: "from-sky-100 to-cyan-50",
    ring: "ring-sky-100",
    image: "/images/bird/bird-1.jpg",
  },
  {
    icon: "📝",
    title: "Bio Önerileri",
    description: "Platforma ve tarzına göre hazır, kopyala-yapıştır bio metinleri.",
    examples: ["Minimal bio", "just vibes.", "Az ama öz."],
    accent: "from-emerald-100 to-teal-50",
    ring: "ring-emerald-100",
    image: "/images/rabbit/rabbit-1.jpg",
  },
  {
    icon: "🏢",
    title: "Marka İsimleri",
    description: "Startup'lar, ajanslar ve projeler için anlamı olan, markalaşmaya hazır isimler.",
    examples: ["Lumora", "Nexora", "NovaWorks"],
    accent: "from-fuchsia-100 to-purple-50",
    ring: "ring-fuchsia-100",
    image: "/images/boy-baby/boy-1.jpg",
  },
];

export default function PreviewCards() {
  function tease() {
    showToast(TOASTS.card);
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {CARDS.map((card) => (
        <button
          key={card.title}
          type="button"
          onClick={tease}
          className={`group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-line bg-white p-6 text-left shadow-soft ring-1 ${card.ring} transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-lg`}
        >
          {/* Arka plan görseli + beyaz veil (kart açık ve okunabilir kalır) */}
          <Image
            src={card.image}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="pointer-events-none absolute inset-0 object-cover opacity-40 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-55"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/95 via-white/70 to-white/45"
            aria-hidden="true"
          />

          <span className="absolute right-4 top-4 z-10 inline-flex items-center rounded-full bg-ink/5 px-2.5 py-1 text-xs font-semibold text-ink/70 backdrop-blur">
            Yakında
          </span>

          <div className="relative z-10 flex flex-col gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-2xl shadow-soft`}
              aria-hidden="true"
            >
              {card.icon}
            </div>

            <h3 className="text-lg font-semibold tracking-tight">{card.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{card.description}</p>

            <div className="mt-1 flex flex-wrap gap-1.5">
              {card.examples.map((ex) => (
                <span
                  key={ex}
                  className="inline-flex items-center rounded-full border border-line/70 bg-bg/80 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur"
                >
                  {ex}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-1 pt-2 text-sm font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
              Önizle
              <span aria-hidden="true">→</span>
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
