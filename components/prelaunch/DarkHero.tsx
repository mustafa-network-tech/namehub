"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MarqueeRow from "@/components/prelaunch/MarqueeRow";
import { LAUNCH_DATE } from "@/components/prelaunch/config";

const HERO_IMAGES = [
  { src: "/images/girl-baby/girl-1.jpg", alt: "Kız Bebek İsimleri" },
  { src: "/images/boy-baby/boy-1.jpg", alt: "Erkek Bebek İsimleri" },
  { src: "/images/cat/cat-1.jpg", alt: "Kedi İsimleri" },
  { src: "/images/dog/dog-1.jpg", alt: "Köpek İsimleri" },
  { src: "/images/bird/bird-1.jpg", alt: "Kuş İsimleri" },
  { src: "/images/rabbit/rabbit-1.jpg", alt: "Tavşan İsimleri" },
];

const ROTATE_MS = 5000;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: number): TimeLeft {
  let delta = Math.max(0, Math.floor((target - Date.now()) / 1000));
  const days = Math.floor(delta / 86400);
  delta -= days * 86400;
  const hours = Math.floor(delta / 3600);
  delta -= hours * 3600;
  const minutes = Math.floor(delta / 60);
  const seconds = delta - minutes * 60;
  return { days, hours, minutes, seconds };
}

const COUNTDOWN_UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Gün" },
  { key: "hours", label: "Saat" },
  { key: "minutes", label: "Dakika" },
  { key: "seconds", label: "Saniye" },
];

const MARQUEE_ROW_1 = [
  "👶 Aylin",
  "🐶 Pamuk",
  "🎮 Kırık Düş",
  "🏢 Lumora",
  "📱 @quiet.frame",
  "📝 Minimal bio",
  "🌙 Elbet Bir Gün",
  "🚀 Nexora",
  "📷 Mavi Kadraj",
  "✨ Bir Tutam Hayal",
];

const MARQUEE_ROW_2 = [
  "👶 Defne",
  "🐱 Boncuk",
  "🎮 ShadowNinja",
  "🏢 CreativeLab",
  "📱 @daily.pixel",
  "📝 just vibes.",
  "🌙 Sessiz Bekleyiş",
  "🚀 NovaWorks",
  "📷 Nature Lens",
  "✨ Yalnız Adam",
];

export default function DarkHero() {
  const [active, setActive] = useState(0);
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % HERO_IMAGES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const target = new Date(LAUNCH_DATE).getTime();
    setTime(getTimeLeft(target));
    const id = window.setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden">
      {/* 1) Koyu gradyan taban */}
      <div
        className="absolute inset-0 -z-30"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(135deg, #020617 0%, #0F172A 42%, #111827 72%, #1E1B4B 100%)",
        }}
      />

      {/* 2) Tam ekran dönen arka plan görseli (sinematik) */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        {HERO_IMAGES.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
              i === active ? "opacity-50" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* 3) Okunabilirlik için koyu overlay */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, rgba(2,6,23,0.55) 0%, rgba(2,6,23,0.78) 55%, rgba(2,6,23,0.94) 100%)",
        }}
      />

      {/* 3b) Footer'a pürüzsüz geçiş — alt kenar footer rengine karışır */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, rgba(11,16,32,0) 0%, #0B1020 100%)",
        }}
      />

      {/* 4) Yumuşak renkli radyal ışıklar */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-10 h-[30rem] w-[30rem] rounded-full bg-blue-600/20 blur-[120px] animate-float-slow" />
        <div className="absolute -right-24 top-24 h-[28rem] w-[28rem] rounded-full bg-fuchsia-600/15 blur-[120px] animate-float-slower" />
        <div className="absolute bottom-[-6rem] left-1/2 h-[26rem] w-[34rem] -translate-x-1/2 rounded-full bg-purple-600/15 blur-[130px] animate-float-slow" />
      </div>

      {/* Üst marka çubuğu — menü/iç bağlantı yok */}
      <div className="relative z-10">
        <div className="container-page flex items-center justify-between py-6">
          <div className="flex items-center gap-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="text-blue-400" aria-hidden="true">✦</span>
            Name<span className="text-blue-400">Hub</span>
          </div>
        </div>
      </div>

      {/* İçerik */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 text-center">
        <div className="mx-auto w-full max-w-4xl">
          <h1 className="animate-rise text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(2,6,23,0.6)] sm:text-7xl lg:text-8xl">
            NameHub
            <br />
            <span className="bg-gradient-to-r from-white via-sky-200 to-violet-300 bg-clip-text text-transparent">
              Çok Yakında
            </span>
          </h1>

          {/* Geri sayım sayacı — 4 büyük daire */}
          <div className="animate-rise mt-12">
            <p className="mb-7 text-sm font-medium uppercase tracking-[0.2em] text-slate-400 sm:text-base">
              NameHub açılışına kalan süre
            </p>
            <div className="flex items-start justify-center gap-3 sm:gap-7">
              {COUNTDOWN_UNITS.map((u) => {
                const value = time ? time[u.key] : 0;
                return (
                  <div key={u.key} className="flex flex-col items-center gap-3 sm:gap-4">
                    <div className="flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-full border border-amber-300/35 bg-white/[0.03] backdrop-blur-sm sm:h-40 sm:w-40">
                      <span
                        className="font-mono text-3xl font-bold tabular-nums text-white sm:text-6xl"
                        suppressHydrationWarning
                      >
                        {String(value).padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wide text-slate-400 sm:text-base">
                      {u.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Hero içine alınan kayan yazılar */}
      <div className="relative z-10 space-y-3 pb-14">
        <MarqueeRow items={MARQUEE_ROW_1} direction="left" dark />
        <MarqueeRow items={MARQUEE_ROW_2} direction="right" dark />
      </div>
    </section>
  );
}
