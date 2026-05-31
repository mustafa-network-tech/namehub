"use client";

import { useEffect, useState } from "react";
import { showToast } from "@/components/ui/Toast";
import { TOASTS } from "@/components/prelaunch/config";

const PLACEHOLDERS = [
  "Bebek ismi ara...",
  "Marka ismi keşfet...",
  "Instagram kullanıcı adı bul...",
  "TikTok bio önerisi al...",
  "Oyun nicki oluştur...",
  "Evcil dostuna isim bul...",
];

export default function FakeSearchBox() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  function tease() {
    showToast(TOASTS.search);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        tease();
      }}
      role="search"
      aria-label="NameHub arama"
      className="group relative mx-auto flex w-full max-w-xl items-center gap-2 rounded-2xl border border-line/80 bg-white/70 p-2 shadow-soft-lg backdrop-blur-md transition-shadow focus-within:shadow-soft-lg"
    >
      <span className="pl-3 text-muted" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
          <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>

      <input
        type="text"
        readOnly
        onClick={tease}
        onFocus={tease}
        placeholder={PLACEHOLDERS[index]}
        aria-label="NameHub yakında — örnek arama"
        className="min-h-[44px] w-full cursor-pointer bg-transparent text-base text-ink outline-none placeholder:text-muted sm:text-lg"
      />

      <button
        type="submit"
        className="btn-touch focus-ring shrink-0 bg-gradient-to-r from-accent to-violet-600 px-5 text-white transition-transform hover:scale-[1.02] active:scale-95"
      >
        Keşfet
      </button>
    </form>
  );
}
