"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { FOOTER_LINKS, getLocaleFromPath } from "@/lib/navigation";

export default function Footer() {
  const pathname = usePathname() || "/tr";
  const locale = getLocaleFromPath(pathname);
  const columns = FOOTER_LINKS[locale];
  const year = new Date().getFullYear();

  const tagline =
    locale === "tr"
      ? "İsimlerin ve dijital kimliğin merkezi."
      : "The center of names and digital identity.";

  return (
    <footer className="mt-16 border-t border-line bg-card">
      <div className="container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href={`/${locale}`} className="text-xl font-bold tracking-tight">
            Name<span className="text-accent">Hub</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">{tagline}</p>
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-sm font-semibold text-ink">{col.title}</h3>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-sm text-muted sm:flex-row">
          <span>© {year} NameHub</span>
          <span>
            {locale === "tr"
              ? "Tüm içerikler örnek amaçlıdır."
              : "All content is for demo purposes."}
          </span>
        </div>
      </div>
    </footer>
  );
}
