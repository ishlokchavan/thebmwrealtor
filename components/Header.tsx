import Link from "next/link";
import Logo from "./Logo";
import { InstagramIcon } from "./icons";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://www.instagram.com/thebmwrealtor.noida/";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-carbon-950/85 backdrop-blur-xl">
      <span className="accent-line block h-0.5 w-full" aria-hidden="true" />
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9" />
          <span className="leading-tight">
            <span className="block font-display text-[15px] font-bold uppercase tracking-tight text-white">
              The BMW Realtor
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
              Building Massive Wealth
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-emerald-400 hover:text-emerald-300"
            aria-label="Follow on Instagram"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
          </a>
          <Link
            href="/list-property"
            className="hidden rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-emerald-600 sm:block"
          >
            List Property
          </Link>
        </div>
      </div>
    </header>
  );
}
