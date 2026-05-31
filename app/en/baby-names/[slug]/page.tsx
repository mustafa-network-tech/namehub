import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BabyNameDetail from "@/components/baby/BabyNameDetail";
import { buildMetadata } from "@/lib/seo";
import { enBabyGirlNames } from "@/data/en/baby-girl-names";
import { enBabyBoyNames } from "@/data/en/baby-boy-names";

const ALL = [...enBabyGirlNames, ...enBabyBoyNames];

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
  if (!item) return { title: "Not found • NameHub" };
  return buildMetadata({
    title: `${item.name} — Meaning & Origin`,
    description: `${item.name}: ${item.meaning} Origin: ${item.origin}.`,
    locale: "en",
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
      locale="en"
      listBase="/en/baby-names"
      alsoSearched={alsoSearched}
    />
  );
}
