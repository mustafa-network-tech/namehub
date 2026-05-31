import type { Metadata } from "next";
import "./globals.css";
import Toast from "@/components/ui/Toast";
import { SITE_NAME } from "@/lib/constants";

// Sosyal paylaşım görselinin mutlak URL'e çözülmesi için site kökü.
// Production alan adını NEXT_PUBLIC_SITE_URL ile ayarlayabilirsin.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.namehub.tr";
const OG_IMAGE = "/images/og-namehub.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – İsmini Bul, Markanı Kur, Dijital Kimliğini Oluştur`,
    template: `%s`,
  },
  description:
    "NameHub; bebek isimleri, evcil hayvan isimleri, nicknameler, kullanıcı adları, bio önerileri ve marka isimleri için yeni nesil dijital kimlik keşif platformudur.",
  keywords: [
    "NameHub",
    "isim bulma",
    "bebek isimleri",
    "marka isimleri",
    "kullanıcı adları",
    "nickname",
    "bio önerileri",
    "evcil hayvan isimleri",
  ],
  openGraph: {
    title: "NameHub Çok Yakında",
    description: "İsmini bul, markanı kur, dijital kimliğini oluştur.",
    siteName: SITE_NAME,
    locale: "tr_TR",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "NameHub – İsmini Bul, Markanı Kur, Dijital Kimliğini Oluştur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NameHub Çok Yakında",
    description: "İsmini bul, markanı kur, dijital kimliğini oluştur.",
    images: [OG_IMAGE],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-bg font-sans text-ink antialiased">
        {children}
        <Toast />
      </body>
    </html>
  );
}
