"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import MobileDrawer from "@/components/layout/MobileDrawer";
import { getLocaleFromPath, NAV_LINKS } from "@/lib/navigation";

export default function Header() {
  const pathname = usePathname() || "/tr";
  const locale = getLocaleFromPath(pathname);
  const links = NAV_LINKS[locale];
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="focus-ring shrink-0 text-xl font-bold tracking-tight"
        >
          Name<span className="text-accent">Hub</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`focus-ring rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "text-accent" : "text-ink hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label={locale === "tr" ? "Menüyü aç" : "Open menu"}
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white text-ink hover:bg-bg lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        links={links}
        locale={locale}
      />
    </header>
  );
}
