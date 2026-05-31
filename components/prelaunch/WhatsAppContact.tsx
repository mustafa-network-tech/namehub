import { WHATSAPP_URL } from "@/components/prelaunch/config";

export default function WhatsAppContact() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-emerald-50 to-teal-50 p-8 text-center shadow-soft sm:p-12">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto max-w-xl">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Bizimle iletişime geç
        </h2>
        <p className="mt-3 text-muted">
          Açılış hakkında bilgi almak veya projeyle ilgili iletişime geçmek için
          WhatsApp üzerinden bize ulaşabilirsiniz.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-touch focus-ring mt-6 inline-flex bg-[#25D366] px-7 text-base font-semibold text-white shadow-soft-lg transition-transform hover:scale-[1.02] active:scale-95"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.86 9.86 0 0 0 12.04 2Zm0 1.8c2.16 0 4.19.84 5.72 2.37a8.06 8.06 0 0 1 2.37 5.74c0 4.47-3.64 8.11-8.12 8.11a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.12.82.83-3.04-.19-.31a8.04 8.04 0 0 1-1.24-4.27c0-4.47 3.64-8.1 8.11-8.1Zm4.68 10.23c-.26-.13-1.51-.74-1.74-.83-.23-.08-.4-.13-.57.13-.17.26-.65.83-.8 1-.15.17-.29.19-.55.06-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.27-1.51-1.42-1.77-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.16.17-.27.26-.44.09-.17.04-.33-.02-.46-.06-.13-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.44l-.49-.01c-.17 0-.44.06-.67.32-.23.26-.88.86-.88 2.1s.9 2.44 1.03 2.6c.13.17 1.78 2.72 4.3 3.81.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.51-.62 1.72-1.21.21-.6.21-1.1.15-1.21-.06-.11-.23-.17-.49-.3Z" />
          </svg>
          WhatsApp'tan Yaz
        </a>
      </div>
    </div>
  );
}
