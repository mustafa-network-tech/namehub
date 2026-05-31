import type { Metadata } from "next";
import type { Locale } from "@/types/common";
import { SITE_NAME } from "@/lib/constants";

interface SeoInput {
  title: string;
  description: string;
  locale: Locale;
  path?: string;
}

export function buildMetadata({
  title,
  description,
  locale,
}: SeoInput): Metadata {
  const fullTitle = `${title} • ${SITE_NAME}`;
  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      locale: locale === "tr" ? "tr_TR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
