import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Ön açılış (pre-launch) kapısı.
 *
 * Herkese açık tek sayfa "/" (landing) ve statik varlıklardır. Tüm iç rotalar
 * (/tr, /en ve alt sayfaları) ziyaretçilerden gizlenir ve "/" adresine
 * yönlendirilir.
 *
 * Geliştirici önizlemesi: "/_preview-namehub" adresine gidildiğinde "nh_preview"
 * çerezi set edilir ve gerçek uygulamaya (/tr) yönlendirilir. Çerez aktifken tüm
 * iç rotalara erişilebilir. Bu adres UI'da hiçbir yere bağlanmaz.
 */

const PREVIEW_COOKIE = "nh_preview";
const PREVIEW_PATH = "/_preview-namehub";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Geliştirici önizleme kapısını aç ve uygulamaya yönlendir.
  if (pathname === PREVIEW_PATH) {
    const res = NextResponse.redirect(new URL("/tr", req.url));
    res.cookies.set(PREVIEW_COOKIE, "1", {
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
    });
    return res;
  }

  // Önizleme çerezi olan geliştirici/ziyaretçi her yere erişebilir.
  const hasPreview = req.cookies.get(PREVIEW_COOKIE)?.value === "1";
  if (hasPreview) return NextResponse.next();

  // Herkese açık landing sayfası.
  if (pathname === "/") return NextResponse.next();

  // Diğer tüm iç rotalar gizli: landing'e yönlendir.
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  // Next dahili dosyaları ve statik varlıklar hariç tüm yollar.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|txt|xml)).*)",
  ],
};
