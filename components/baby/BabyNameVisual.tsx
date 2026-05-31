import Image from "next/image";
import { getBabyImage } from "@/lib/nameImage";
import type { Gender } from "@/types/baby-name";

const GRADIENTS: Record<Gender, string> = {
  girl: "from-rose-100 via-pink-50 to-violet-100",
  boy: "from-blue-100 via-sky-50 to-cyan-100",
  unisex: "from-emerald-100 via-teal-50 to-blue-100",
};

export default function BabyNameVisual({
  name,
  gender,
  imageKey,
}: {
  name: string;
  gender: Gender;
  imageKey: string;
}) {
  const initial = name.trim().charAt(0).toLocaleUpperCase("tr");
  const imageSrc = getBabyImage(gender, imageKey);

  return (
    <div
      className={`relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br ${GRADIENTS[gender]}`}
    >
      <Image
        src={imageSrc}
        alt={name}
        fill
        priority
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />
      <span className="absolute bottom-3 left-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-xl font-bold text-ink shadow-soft backdrop-blur">
        {initial}
      </span>
    </div>
  );
}
