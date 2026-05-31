import type { Locale } from "@/types/common";

const TESTIMONIALS: Record<
  Locale,
  { quote: string; author: string; role: string }[]
> = {
  tr: [
    {
      quote:
        "İsim ararken aradığım her şeyi tek yerde buldum. Tasarımı sade ve hızlı.",
      author: "A. Yılmaz",
      role: "Örnek kullanıcı",
    },
    {
      quote:
        "Nick stillerini tek dokunuşla kopyalayabilmek harika. Çok pratik.",
      author: "M. Demir",
      role: "Örnek kullanıcı",
    },
    {
      quote:
        "Bio önerileri ve marka isimleri bölümü ilham verici. Temiz bir deneyim.",
      author: "E. Kaya",
      role: "Örnek kullanıcı",
    },
  ],
  en: [
    {
      quote:
        "Found everything I needed in one place. The design is clean and fast.",
      author: "A. Smith",
      role: "Sample user",
    },
    {
      quote:
        "Copying nickname styles with one tap is amazing. So practical.",
      author: "M. Johnson",
      role: "Sample user",
    },
    {
      quote:
        "The bio ideas and brand names sections are inspiring. A clean experience.",
      author: "E. Brown",
      role: "Sample user",
    },
  ],
};

export default function TrustSection({ locale }: { locale: Locale }) {
  const title = locale === "tr" ? "Kullanıcılar ne diyor?" : "What people say";
  const subtitle =
    locale === "tr"
      ? "Örnek yorumlar — gerçek kullanıcı verisi içermez."
      : "Sample comments — no real user data.";

  return (
    <section className="container-page py-10">
      <div className="mb-6">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS[locale].map((t) => (
          <figure key={t.author} className="card-base flex flex-col gap-4 p-6">
            <div className="flex gap-0.5 text-amber-400" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3 7.3 13.6l-5-4.6 6.8-.8L12 2z" />
                </svg>
              ))}
            </div>
            <blockquote className="text-sm leading-relaxed text-ink">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-auto">
              <div className="text-sm font-semibold">{t.author}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
