# NameHub

İki dilli (TR / EN) isim ve dijital kimlik platformu. Bu repo, **tasarım aşaması** prototipidir: gerçek veri tabanı, Supabase veya toplu içerik **yoktur**; yalnızca küçük mock veriler kullanılır.

## Teknolojiler

- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS**

## Özellikler

- İki dilli rota yapısı: `/tr` ve `/en` (içerikler ayrıdır, karışmaz)
- Mobil öncelikli, sade ve modern tasarım
- Sticky header + hamburger menü + yan çekmece (drawer)
- Kopyala / paylaş etkileşimleri (`navigator.clipboard`, `navigator.share`)
- `localStorage` tabanlı "Kayıtlı Kimlik Kasası" (login yok)
- Reklam yer tutucuları (layout shift'i önleyen sabit oranlı kutular)
- Bebek isimleri için detay sayfaları

## Sayfalar

| TR | EN |
| --- | --- |
| `/tr` | `/en` |
| `/tr/bebek-isimleri` (+ `/[slug]`) | `/en/baby-names` (+ `/[slug]`) |
| `/tr/evcil-hayvan-isimleri` | `/en/pet-names` |
| `/tr/kedi-isimleri` | `/en/cat-names` |
| `/tr/nickler` | `/en/nicknames` |
| `/tr/kullanici-adlari` | `/en/usernames` |
| `/tr/bio-onerileri` | `/en/bio-ideas` |
| `/tr/marka-isimleri` | `/en/brand-names` |

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın (kök, `/tr` adresine yönlenir).

## Komutlar

- `npm run dev` — geliştirme sunucusu
- `npm run build` — üretim derlemesi
- `npm run start` — üretim sunucusu
- `npm run lint` — lint kontrolü

## Klasör Yapısı

```
app/            # App Router sayfaları (tr + en)
components/     # layout, home, cards, baby, ui, common bileşenleri
data/           # küçük mock veri dizileri (tr + en)
lib/            # yardımcılar (copy, share, saved-vault, navigation, slug, seo)
types/          # TypeScript tipleri
public/         # statik dosyalar
```

> Not: Gerçek doğrulanmış veri setleri sonraki aşamada eklenecektir.
