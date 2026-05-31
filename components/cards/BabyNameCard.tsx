import Link from "next/link";
import Image from "next/image";
import SavedButton from "@/components/ui/SavedButton";
import { getBabyImage } from "@/lib/nameImage";
import type { BabyName, Gender } from "@/types/baby-name";
import type { Locale } from "@/types/common";

const GENDER_LABEL: Record<Locale, Record<Gender, string>> = {
  tr: { girl: "Kız", boy: "Erkek", unisex: "Uniseks" },
  en: { girl: "Girl", boy: "Boy", unisex: "Unisex" },
};

const GENDER_STYLE: Record<Gender, string> = {
  girl: "bg-rose-50 text-rose-600",
  boy: "bg-blue-50 text-blue-600",
  unisex: "bg-violet-50 text-violet-600",
};

interface BabyNameCardProps {
  item: BabyName;
  locale: Locale;
  /** Detay sayfasının kök yolu, ör. /tr/bebek-isimleri */
  detailBase: string;
}

export default function BabyNameCard({
  item,
  locale,
  detailBase,
}: BabyNameCardProps) {
  const href = `${detailBase}/${item.slug}`;
  const viewLabel = locale === "tr" ? "Detayları gör" : "View details";
  const imageSrc = getBabyImage(item.gender, item.slug);

  return (
    <article className="card-base flex flex-col gap-3 p-3 transition-shadow hover:shadow-soft-lg">
      <Link href={href} className="focus-ring relative block aspect-[4/3] w-full overflow-hidden rounded-xl bg-bg">
        <Image
          src={imageSrc}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        <span
          className={`absolute left-2 top-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium shadow-soft ${GENDER_STYLE[item.gender]}`}
        >
          {GENDER_LABEL[locale][item.gender]}
        </span>
      </Link>

      <div className="flex items-start justify-between gap-2 px-2">
        <h3 className="text-lg font-semibold tracking-tight">{item.name}</h3>
        <SavedButton
          item={{
            id: item.slug + "-" + locale,
            kind: "baby",
            label: item.name,
            sublabel: item.origin,
            locale,
            href,
          }}
        />
      </div>

      <p className="line-clamp-2 px-2 text-sm text-muted">{item.meaning}</p>

      <div className="mt-auto flex items-center justify-between border-t border-line px-2 pt-3">
        <span className="text-xs text-muted">{item.origin}</span>
        <Link
          href={href}
          className="focus-ring text-sm font-medium text-accent hover:text-accent-hover"
        >
          {viewLabel} →
        </Link>
      </div>
    </article>
  );
}
