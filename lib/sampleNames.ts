import type { PetName } from "@/types/pet-name";

const PET_ANIMAL_ORDER = ["cat", "dog", "bird", "fish", "rabbit"] as const;

/**
 * Ana sayfadaki "Örnek Evcil Hayvan İsimleri" bölümü için her hayvan türünden
 * birer örnek seçer. Aynı ismin tekrarını önlemek için kullanılmış isimleri atlar.
 */
export function pickOnePerAnimal(list: PetName[]): PetName[] {
  const used = new Set<string>();
  const result: PetName[] = [];
  for (const animal of PET_ANIMAL_ORDER) {
    const found = list.find((p) => p.animal === animal && !used.has(p.name));
    if (found) {
      used.add(found.name);
      result.push(found);
    }
  }
  return result;
}
