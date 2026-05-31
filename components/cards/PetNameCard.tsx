import Image from "next/image";
import CopyButton from "@/components/ui/CopyButton";
import ShareButton from "@/components/ui/ShareButton";
import SavedButton from "@/components/ui/SavedButton";
import { getPetImage } from "@/lib/nameImage";
import type { PetName } from "@/types/pet-name";
import type { Locale } from "@/types/common";

const ANIMAL_LABEL: Record<Locale, Record<string, string>> = {
  tr: { cat: "Kedi", dog: "Köpek", bird: "Kuş", fish: "Balık", rabbit: "Tavşan" },
  en: { cat: "Cat", dog: "Dog", bird: "Bird", fish: "Fish", rabbit: "Rabbit" },
};

export default function PetNameCard({
  item,
  locale,
}: {
  item: PetName;
  locale: Locale;
}) {
  const copyMsg = locale === "tr" ? "Kopyalandı!" : "Copied!";
  const imageSrc = getPetImage(item.animal, item.id);
  return (
    <article className="card-base flex flex-col gap-3 p-3 transition-shadow hover:shadow-soft-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-bg">
        <Image
          src={imageSrc}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
        <div className="absolute right-2 top-2">
          <SavedButton
            item={{
              id: item.id,
              kind: "pet",
              label: item.name,
              sublabel: ANIMAL_LABEL[locale][item.animal],
              locale,
            }}
          />
        </div>
      </div>
      <div className="px-2">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center rounded-full bg-bg px-2.5 py-0.5 text-xs font-medium text-muted">
            {ANIMAL_LABEL[locale][item.animal]}
          </span>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-600">
            {item.tag}
          </span>
        </div>
      </div>
      <div className="mt-auto flex gap-2 px-2 pb-1 pt-1">
        <CopyButton value={item.name} toastMessage={copyMsg} label={locale === "tr" ? "Kopyala" : "Copy"} className="flex-1" />
        <ShareButton
          title={item.name}
          text={item.name}
          label={locale === "tr" ? "Paylaş" : "Share"}
          copiedMessage={locale === "tr" ? "Bağlantı kopyalandı!" : "Link copied!"}
          iconOnly
        />
      </div>
    </article>
  );
}
