import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BabyNameDetail from "@/components/baby/BabyNameDetail";
import { buildMetadata } from "@/lib/seo";
import { trBabyGirlNames } from "@/data/tr/baby-girl-names";
import { trBabyBoyNames } from "@/data/tr/baby-boy-names";

const ALL = [...trBabyGirlNames, ...trBabyBoyNames];

function getName(slug: string) {
  return ALL.find((n) => n.slug === slug);
}

export function generateStaticParams() {
  return ALL.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const item = getName(params.slug);
  if (!item) return { title: "Bulunamadı • NameHub" };
  return buildMetadata({
    title: `${item.name} İsmi — Anlamı ve Kökeni`,
    description: `${item.name}: ${item.meaning} Kökeni: ${item.origin}.`,
    locale: "tr",
  });
}

export default function BabyNameDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = getName(params.slug);
  if (!item) notFound();

  const alsoSearched = ALL.filter((n) => n.slug !== item.slug).map((n) => ({
    name: n.name,
    slug: n.slug,
  }));

  return (
    <BabyNameDetail
      item={item}
      locale="tr"
      listBase="/tr/bebek-isimleri"
      alsoSearched={alsoSearched}
    />
  );
}
