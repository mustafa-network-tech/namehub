import { copyToClipboard } from "@/lib/copy";

export interface ShareInput {
  title?: string;
  text?: string;
  url?: string;
}

export type ShareResult = "shared" | "copied" | "failed";

export async function shareOrCopy(input: ShareInput): Promise<ShareResult> {
  const url =
    input.url ?? (typeof window !== "undefined" ? window.location.href : "");

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share({
        title: input.title,
        text: input.text,
        url,
      });
      return "shared";
    } catch (err) {
      // Kullanıcı paylaşımı iptal ettiyse sessiz geç
      if (err instanceof DOMException && err.name === "AbortError") {
        return "failed";
      }
    }
  }

  const ok = await copyToClipboard(url);
  return ok ? "copied" : "failed";
}
