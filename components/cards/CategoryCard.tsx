import Link from "next/link";
import {
  Baby,
  PawPrint,
  Gamepad2,
  AtSign,
  PenLine,
  Building2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { ACCENT_STYLES } from "@/lib/constants";
import type { CategoryItem, Locale } from "@/types/common";

const ICONS: Record<string, LucideIcon> = {
  "c-baby": Baby,
  "c-pet": PawPrint,
  "c-nick": Gamepad2,
  "c-user": AtSign,
  "c-bio": PenLine,
  "c-brand": Building2,
};

export default function CategoryCard({
  item,
  locale,
}: {
  item: CategoryItem;
  locale: Locale;
}) {
  const accent = ACCENT_STYLES[item.accent] ?? ACCENT_STYLES.slate;
  const Icon = ICONS[item.id] ?? Baby;
  const popularLabel = locale === "tr" ? "Popüler:" : "Popular:";
  const cta = locale === "tr" ? "Keşfet" : "Explore";

  return (
    <Link
      href={item.href}
      className="focus-ring group flex h-full flex-col rounded-2xl border border-[#f1f1f1] bg-card p-6 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-soft-lg"
    >
      <div className="flex items-center gap-3.5">
        <span
          className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${accent.bg} ${accent.text}`}
          aria-hidden="true"
        >
          <Icon size={24} strokeWidth={1.8} />
        </span>
        <h3 className="font-semibold text-ink transition-colors group-hover:text-accent">
          {item.title}
        </h3>
      </div>

      <p className="mt-3.5 text-sm leading-relaxed text-muted">{item.description}</p>

      {(item.count || item.examples?.length) && (
        <div className="mt-4 flex flex-col gap-2">
          {item.count && (
            <span className="inline-flex w-fit items-center rounded-full bg-bg px-2.5 py-1 text-xs font-semibold text-ink">
              {item.count}
            </span>
          )}
          {item.examples?.length ? (
            <p className="text-sm text-muted">
              <span className="font-medium text-ink/80">{popularLabel}</span>{" "}
              {item.examples.join(", ")}
            </p>
          ) : null}
        </div>
      )}

      <div className="mt-5 flex items-center gap-1 pt-1 text-sm font-medium text-accent">
        {cta}
        <ArrowRight
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
