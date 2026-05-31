"use client";

import { useEffect, useState } from "react";
import { isSaved, subscribeVault, toggleSaved } from "@/lib/saved-vault";
import { showToast } from "@/components/ui/Toast";
import type { SavedItem } from "@/types/common";

interface SavedButtonProps {
  item: Omit<SavedItem, "createdAt">;
  savedMessage?: string;
  removedMessage?: string;
  className?: string;
}

export default function SavedButton({
  item,
  savedMessage = "Kasaya eklendi",
  removedMessage = "Kasadan çıkarıldı",
  className = "",
}: SavedButtonProps) {
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaved(isSaved(item.id));
    return subscribeVault(() => setSaved(isSaved(item.id)));
  }, [item.id]);

  function handleToggle() {
    const nowSaved = toggleSaved({ ...item, createdAt: Date.now() });
    showToast(nowSaved ? savedMessage : removedMessage);
  }

  const isActive = mounted && saved;

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-pressed={saved}
      aria-label={saved ? "Kayıtlı, kaldır" : "Kaydet"}
      className={`focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-150 hover:scale-110 active:scale-95 ${className}`}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={isActive ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={`transition-colors duration-150 ${
          isActive ? "text-red-500" : "text-muted hover:text-red-400"
        }`}
      >
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5z" />
      </svg>
    </button>
  );
}
