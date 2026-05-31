import {
  Briefcase,
  Code2,
  Camera,
  Sparkles,
  BookOpen,
  Scissors,
  LineChart,
  MessagesSquare,
  ArrowUpRight,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { pickPromo, type PromoIcon } from "@/lib/promos";
import type { Locale } from "@/types/common";

const ICONS: Record<PromoIcon, LucideIcon> = {
  briefcase: Briefcase,
  code: Code2,
  camera: Camera,
  sparkles: Sparkles,
  book: BookOpen,
  scissors: Scissors,
  chart: LineChart,
  messages: MessagesSquare,
};

const BADGE = { tr: "MK Ekosistemi", en: "MK Ecosystem" };

export default function InternalPromoBanner({
  seed,
  locale,
  className = "",
}: {
  /** Deterministik seçim için tohum (ör. sayfa slug'ı). */
  seed: string;
  locale: Locale;
  className?: string;
}) {
  const promo = pickPromo(seed);
  const Icon = ICONS[promo.icon];
  const features = promo.features[locale];
  const marquee = promo.marquee[locale];
  // Kesintisiz kayma için içerik iki kez yazılır.
  const marqueeLoop = [...marquee, ...marquee];

  return (
    <a
      href={promo.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={promo.title}
      className={`group relative block overflow-hidden rounded-2xl bg-gradient-to-br ${promo.gradient} text-white shadow-soft-lg ring-1 ring-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${className}`}
    >
      {/* Sağdaki büyük şeffaf hayalet ikon */}
      <Icon
        className="pointer-events-none absolute -right-8 top-1/2 h-48 w-48 -translate-y-1/2 opacity-[0.08] transition-transform duration-500 group-hover:scale-105"
        strokeWidth={1}
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold backdrop-blur">
            <Icon size={13} aria-hidden="true" />
            {BADGE[locale]}
          </span>
          <ExternalLink
            size={18}
            className="shrink-0 text-white/60 transition-colors group-hover:text-white"
            aria-hidden="true"
          />
        </div>

        <div>
          <h3 className="text-xl font-bold tracking-tight drop-shadow-sm sm:text-2xl">
            {promo.title}
          </h3>
          <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-white/90">
            {promo.description[locale]}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {features.map((f) => (
            <span
              key={f}
              className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-1 text-xs font-medium text-white/95 ring-1 ring-white/10 backdrop-blur"
            >
              {f}
            </span>
          ))}
        </div>

        <span className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-sm transition-colors group-hover:bg-white/90">
          {promo.cta[locale]}
          <ArrowUpRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>
      </div>

      {/* Alt kayan yazı (marquee) */}
      <div className="relative border-t border-white/15 bg-black/10">
        <div className="overflow-hidden py-2">
          <div className="flex w-max animate-marquee items-center gap-0 whitespace-nowrap group-hover:[animation-play-state:paused]">
            {marqueeLoop.map((word, i) => (
              <span key={i} className="flex items-center text-xs font-medium text-white/80">
                <span className="px-3">{word}</span>
                <span className="text-white/40" aria-hidden="true">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}
