import { InstagramIcon, WhatsAppIcon } from "./icons";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://www.instagram.com/thebmwrealtor.noida/";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 px-4 py-8 safe-bottom">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-950 text-xs font-black text-accent-400">
            BR
          </span>
          <span className="text-sm font-semibold text-slate-900">
            The BMW Realtor
          </span>
        </div>
        <p className="mt-3 max-w-sm text-xs leading-relaxed text-slate-500">
          Connecting Noida property sellers with the city&apos;s top real
          estate brokers. Free to list, no hidden charges.
        </p>
        <div className="mt-4 flex gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-brand-500 hover:text-brand-500"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-4.5 w-4.5" />
          </a>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-brand-500 hover:text-brand-500"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon className="h-4.5 w-4.5" />
          </a>
        </div>
        <p className="mt-6 text-[11px] text-slate-400">
          &copy; {new Date().getFullYear()} The BMW Realtor, Noida. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
