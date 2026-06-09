"use client";

import { useEffect } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import type { NavLink } from "@/lib/navigation";
import type { Locale } from "@/types/common";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  locale: Locale;
}

export default function MobileDrawer({
  open,
  onClose,
  links,
  locale,
}: MobileDrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.classList.add("scroll-locked");
    } else {
      document.body.classList.remove("scroll-locked");
    }
    return () => document.body.classList.remove("scroll-locked");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label={locale === "tr" ? "Kapat" : "Close"}
        className="absolute inset-0 bg-ink/30"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 flex h-full w-[84%] max-w-xs flex-col bg-card shadow-soft-lg">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <span className="text-lg font-bold tracking-tight">
            Name<span className="text-accent">Hub</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={locale === "tr" ? "Kapat" : "Close"}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-bg"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="focus-ring flex min-h-[48px] items-center rounded-xl px-3 text-base font-medium text-ink hover:bg-bg"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line px-5 py-4">
          <LanguageSwitcher />
        </div>
      </aside>
    </div>
  );
}
