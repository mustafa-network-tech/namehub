import { FOOTER_LINKS } from "@/components/prelaunch/config";

export default function PreLaunchFooter() {
  return (
    <footer className="bg-[#0B1020] py-12">
      <div className="container-page mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-amber-300/30 bg-white/[0.04] px-6 py-10 text-center shadow-soft backdrop-blur-md">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-white">
          <span className="text-blue-400" aria-hidden="true">✦</span>
          Name<span className="text-blue-400">Hub</span>
        </div>

        <p className="text-sm text-slate-400">© 2026 NameHub. All rights reserved.</p>

        <div className="flex flex-col items-center gap-1 text-sm text-slate-400">
          <span>
            Powered by{" "}
            <a
              href={FOOTER_LINKS.mkDigital}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring font-medium text-slate-200 underline-offset-4 hover:text-blue-300 hover:underline"
            >
              MK Digital Systems
            </a>
          </span>
          <span>
            Personal portfolio:{" "}
            <a
              href={FOOTER_LINKS.mustafaOner}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring font-medium text-slate-200 underline-offset-4 hover:text-blue-300 hover:underline"
            >
              MustafaÖner.net
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
