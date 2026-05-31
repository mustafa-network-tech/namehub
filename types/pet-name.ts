export type AnimalType = "cat" | "dog" | "bird" | "fish" | "rabbit";

export interface PetName {
  id: string;
  name: string;
  animal: AnimalType;
  emoji: string;
  tag: string;
}
