import type { Metadata } from "next";
import "./globals.css";
import Toast from "@/components/ui/Toast";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
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
  },
  twitter: {
    card: "summary_large_image",
    title: "NameHub Çok Yakında",
    description: "İsmini bul, markanı kur, dijital kimliğini oluştur.",
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
