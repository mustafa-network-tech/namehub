import type { BabyName, Gender } from "@/types/baby-name";
import type { Locale } from "@/types/common";

const GENDER_LABEL: Record<Locale, Record<Gender, string>> = {
  tr: { girl: "Kız", boy: "Erkek", unisex: "Uniseks" },
  en: { girl: "Girl", boy: "Boy", unisex: "Unisex" },
};

export default function BabyNameInfoTable({
  item,
  locale,
}: {
  item: BabyName;
  locale: Locale;
}) {
  const rows: { label: string; value: string }[] =
    locale === "tr"
      ? [
          { label: "Cinsiyet", value: GENDER_LABEL.tr[item.gender] },
          { label: "Anlamı", value: item.meaning },
          { label: "Kökeni", value: item.origin },
          { label: "Okunuşu", value: item.pronunciation },
          {
            label: "Kur’an’da geçiyor mu?",
            value: item.inQuran ? "Evet" : "Hayır",
          },
          { label: "Kullanım hissi", value: item.usageFeeling },
          { label: "Stil", value: item.style },
        ]
      : [
          { label: "Gender", value: GENDER_LABEL.en[item.gender] },
          { label: "Meaning", value: item.meaning },
          { label: "Origin", value: item.origin },
          { label: "Pronunciation", value: item.pronunciation },
          { label: "US / UK usage", value: item.usUkUsage ?? "—" },
          { label: "Usage feeling", value: item.usageFeeling },
          { label: "Style", value: item.style },
        ];

  return (
    <dl className="card-base divide-y divide-line overflow-hidden">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-1 gap-1 px-5 py-3.5 sm:grid-cols-3 sm:gap-3"
        >
          <dt className="text-sm font-medium text-muted">{row.label}</dt>
          <dd className="text-sm text-ink sm:col-span-2">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
