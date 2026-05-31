import { SAVED_VAULT_KEY } from "@/lib/constants";
import type { SavedItem } from "@/types/common";

const EVENT_NAME = "namehub:vault-change";

export function getSavedItems(): SavedItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_VAULT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as SavedItem[]) : [];
  } catch {
    return [];
  }
}

function persist(items: SavedItem[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SAVED_VAULT_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function isSaved(id: string): boolean {
  return getSavedItems().some((item) => item.id === id);
}

export function toggleSaved(item: SavedItem): boolean {
  const items = getSavedItems();
  const exists = items.some((i) => i.id === item.id);
  if (exists) {
    persist(items.filter((i) => i.id !== item.id));
    return false;
  }
  persist([{ ...item, createdAt: Date.now() }, ...items]);
  return true;
}

export function removeSaved(id: string): void {
  persist(getSavedItems().filter((i) => i.id !== id));
}

export function clearSaved(): void {
  persist([]);
}

export function subscribeVault(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => listener();
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", handler);
  };
}
