import { Fragment } from "react";
import type { Locale } from "@/types/common";

interface Stat {
  value: string;
  label: string;
}

const STATS: Record<Locale, Stat[]> = {
  tr: [
    { value: "10.000+", label: "İsim" },
    { value: "2", label: "Dil" },
    { value: "1000+", label: "Nick" },
    { value: "500+", label: "Marka Fikri" },
  ],
  en: [
    { value: "10,000+", label: "Names" },
    { value: "2", label: "Languages" },
    { value: "1000+", label: "Nicknames" },
    { value: "500+", label: "Brand Ideas" },
  ],
};

export default function StatsStrip({ locale }: { locale: Locale }) {
  const stats = STATS[locale];

  return (
    <section className="container-page pb-2">
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-line bg-white/70 px-5 py-3 text-sm shadow-soft sm:gap-x-6 sm:text-base lg:justify-start">
        {stats.map((s, i) => (
          <Fragment key={s.label}>
            <span className="inline-flex items-baseline gap-1.5">
              <strong className="font-extrabold tracking-tight text-ink">{s.value}</strong>
              <span className="text-muted">{s.label}</span>
            </span>
            {i < stats.length - 1 && (
              <span className="text-line" aria-hidden="true">
                •
              </span>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
