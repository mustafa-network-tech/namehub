import type { MetadataRoute } from "next";
import { trBabyBoyNames } from "@/data/tr/baby-boy-names";
import { trBabyGirlNames } from "@/data/tr/baby-girl-names";
import { enBabyBoyNames } from "@/data/en/baby-boy-names";
import { enBabyGirlNames } from "@/data/en/baby-girl-names";
import { getNicknames } from "@/lib/nicknames";
import { NICK_CATEGORIES } from "@/lib/nicknames";
import { getUsernames, USERNAME_CATEGORIES } from "@/lib/usernames";
import { getBrands, BRAND_CATEGORIES } from "@/lib/brands";
import { getBios, BIO_CATEGORIES, BIO_PLATFORMS } from "@/lib/bios";

const BASE = "https://www.namehub.tr";

type ChangeFreq =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

function url(
  path: string,
  priority: number,
  changeFreq: ChangeFreq = "monthly"
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: changeFreq,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ─── Statik ana sayfalar ────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    url("/tr", 1.0, "daily"),
    url("/en", 0.9, "daily"),

    // TR kütüphaneler
    url("/tr/bebek-isimleri", 0.9, "weekly"),
    url("/tr/evcil-hayvan-isimleri", 0.8, "weekly"),
    url("/tr/kedi-isimleri", 0.8, "weekly"),
    url("/tr/kopek-isimleri", 0.8, "weekly"),
    url("/tr/kus-isimleri", 0.8, "weekly"),
    url("/tr/balik-isimleri", 0.8, "weekly"),
    url("/tr/tavsan-isimleri", 0.8, "weekly"),
    url("/tr/nickler", 0.9, "weekly"),
    url("/tr/kullanici-adlari", 0.9, "weekly"),
    url("/tr/bio-onerileri", 0.9, "weekly"),
    url("/tr/marka-isimleri", 0.9, "weekly"),
    url("/tr/favoriler", 0.5, "weekly"),

    // EN libraries
    url("/en/baby-names", 0.9, "weekly"),
    url("/en/pet-names", 0.8, "weekly"),
    url("/en/cat-names", 0.8, "weekly"),
    url("/en/dog-names", 0.8, "weekly"),
    url("/en/bird-names", 0.8, "weekly"),
    url("/en/fish-names", 0.8, "weekly"),
    url("/en/rabbit-names", 0.8, "weekly"),
    url("/en/nicknames", 0.9, "weekly"),
    url("/en/usernames", 0.9, "weekly"),
    url("/en/bio-ideas", 0.9, "weekly"),
    url("/en/brand-names", 0.9, "weekly"),
    url("/en/favorites", 0.5, "weekly"),
  ];

  // ─── Bebek ismi detay sayfaları ─────────────────────────────────────────
  const babyPages: MetadataRoute.Sitemap = [
    ...trBabyBoyNames.map((n) => url(`/tr/bebek-isimleri/${n.slug}`, 0.6)),
    ...trBabyGirlNames.map((n) => url(`/tr/bebek-isimleri/${n.slug}`, 0.6)),
    ...enBabyBoyNames.map((n) => url(`/en/baby-names/${n.slug}`, 0.6)),
    ...enBabyGirlNames.map((n) => url(`/en/baby-names/${n.slug}`, 0.6)),
  ];

  // ─── Nick kategorileri ve detay sayfaları ───────────────────────────────
  const trNickCats = NICK_CATEGORIES["tr"].map((c) =>
    url(`/tr/nickler/kategori/${c.id}`, 0.7, "weekly")
  );
  const enNickCats = NICK_CATEGORIES["en"].map((c) =>
    url(`/en/nicknames/category/${c.id}`, 0.7, "weekly")
  );
  const trNickDetails = getNicknames("tr").map((n) =>
    url(`/tr/nickler/${n.slug}`, 0.5)
  );
  const enNickDetails = getNicknames("en").map((n) =>
    url(`/en/nicknames/${n.slug}`, 0.5)
  );

  // ─── Kullanıcı adı kategorileri ve detay sayfaları ──────────────────────
  const trUserCats = USERNAME_CATEGORIES["tr"].map((c) =>
    url(`/tr/kullanici-adlari/kategori/${c.id}`, 0.7, "weekly")
  );
  const enUserCats = USERNAME_CATEGORIES["en"].map((c) =>
    url(`/en/usernames/category/${c.id}`, 0.7, "weekly")
  );
  const trUserDetails = getUsernames("tr").map((n) =>
    url(`/tr/kullanici-adlari/${n.slug}`, 0.5)
  );
  const enUserDetails = getUsernames("en").map((n) =>
    url(`/en/usernames/${n.slug}`, 0.5)
  );

  // ─── Marka ismi kategorileri ve detay sayfaları ─────────────────────────
  const trBrandCats = BRAND_CATEGORIES["tr"].map((c) =>
    url(`/tr/marka-isimleri/kategori/${c.id}`, 0.7, "weekly")
  );
  const enBrandCats = BRAND_CATEGORIES["en"].map((c) =>
    url(`/en/brand-names/category/${c.id}`, 0.7, "weekly")
  );
  const trBrandDetails = getBrands("tr").map((n) =>
    url(`/tr/marka-isimleri/${n.slug}`, 0.5)
  );
  const enBrandDetails = getBrands("en").map((n) =>
    url(`/en/brand-names/${n.slug}`, 0.5)
  );

  // ─── Bio kategorileri, platformlar ve detay sayfaları ───────────────────
  const trBioCats = BIO_CATEGORIES["tr"].map((c) =>
    url(`/tr/bio-onerileri/kategori/${c.id}`, 0.7, "weekly")
  );
  const enBioCats = BIO_CATEGORIES["en"].map((c) =>
    url(`/en/bio-ideas/category/${c.id}`, 0.7, "weekly")
  );
  const bioPlatformsTr = BIO_PLATFORMS.map((p) =>
    url(`/tr/bio-onerileri/platform/${p.id}`, 0.7, "weekly")
  );
  const bioPlatformsEn = BIO_PLATFORMS.map((p) =>
    url(`/en/bio-ideas/platform/${p.id}`, 0.7, "weekly")
  );
  const trBioDetails = getBios("tr").map((n) =>
    url(`/tr/bio-onerileri/${n.slug}`, 0.5)
  );
  const enBioDetails = getBios("en").map((n) =>
    url(`/en/bio-ideas/${n.slug}`, 0.5)
  );

  return [
    ...staticPages,
    ...babyPages,
    ...trNickCats,
    ...enNickCats,
    ...trNickDetails,
    ...enNickDetails,
    ...trUserCats,
    ...enUserCats,
    ...trUserDetails,
    ...enUserDetails,
    ...trBrandCats,
    ...enBrandCats,
    ...trBrandDetails,
    ...enBrandDetails,
    ...trBioCats,
    ...enBioCats,
    ...bioPlatformsTr,
    ...bioPlatformsEn,
    ...trBioDetails,
    ...enBioDetails,
  ];
}
