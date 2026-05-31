"use client";

import { shareOrCopy } from "@/lib/share";
import { showToast } from "@/components/ui/Toast";

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  label?: string;
  copiedMessage?: string;
  className?: string;
  iconOnly?: boolean;
}

export default function ShareButton({
  title,
  text,
  url,
  label = "Paylaş",
  copiedMessage = "Bağlantı kopyalandı!",
  className = "",
  iconOnly = false,
}: ShareButtonProps) {
  async function handleShare() {
    const result = await shareOrCopy({ title, text, url });
    if (result === "copied") showToast(copiedMessage);
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={label}
      className={`btn-touch focus-ring border border-line bg-white text-ink hover:bg-bg ${
        iconOnly ? "px-3" : ""
      } ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 16V4m0 0L8 8m4-4l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!iconOnly && <span>{label}</span>}
    </button>
  );
}
