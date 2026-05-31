"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/copy";
import { showToast } from "@/components/ui/Toast";

interface CopyButtonProps {
  value: string;
  toastMessage?: string;
  label?: string;
  className?: string;
  iconOnly?: boolean;
}

export default function CopyButton({
  value,
  toastMessage = "Kopyalandı!",
  label = "Kopyala",
  className = "",
  iconOnly = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      showToast(toastMessage);
      window.setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      className={`btn-touch focus-ring border border-line bg-white text-ink hover:bg-bg ${
        iconOnly ? "px-3" : ""
      } ${className}`}
    >
      {copied ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-emerald">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
          <path d="M5 15V5a2 2 0 0 1 2-2h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )}
      {!iconOnly && <span>{copied ? "Tamam" : label}</span>}
    </button>
  );
}
