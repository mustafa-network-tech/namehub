import type { AnimalType } from "@/types/pet-name";
import type { Gender } from "@/types/baby-name";

// public/images altındaki her kategoride mevcut görsel sayısı.
// İsim sayısı görsel sayısından fazla olduğundan görseller döngüsel atanır.
const IMAGE_COUNTS: Record<string, number> = {
  "boy-baby": 43,
  "girl-baby": 24,
  cat: 9,
  dog: 15,
  bird: 11,
  fish: 11,
  rabbit: 10,
};

// Dosya adı ön ekleri (ör. boy-baby klasöründe boy-1.jpg).
const FILE_PREFIX: Record<string, string> = {
  "boy-baby": "boy",
  "girl-baby": "girl",
  cat: "cat",
  dog: "dog",
  bird: "bird",
  fish: "fish",
  rabbit: "rabbit",
};

const FALLBACK = "/images/placeholders/baby-visual.svg";

// djb2 — anahtara göre kararlı (deterministik) sayı üretir.
function hashString(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(hash | 0);
}

// Bir kategori klasöründen, anahtara göre kararlı bir görsel yolu döndürür.
export function getCategoryImage(folder: string, key: string): string {
  const count = IMAGE_COUNTS[folder] ?? 0;
  const prefix = FILE_PREFIX[folder] ?? folder;
  if (count <= 0) return FALLBACK;
  const index = (hashString(key) % count) + 1;
  return `/images/${folder}/${prefix}-${index}.jpg`;
}

export function getBabyImage(gender: Gender, key: string): string {
  const folder = gender === "boy" ? "boy-baby" : "girl-baby";
  return getCategoryImage(folder, key);
}

export function getPetImage(animal: AnimalType, key: string): string {
  return getCategoryImage(animal, key);
}
