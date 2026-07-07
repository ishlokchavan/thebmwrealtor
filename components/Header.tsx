import Link from "next/link";
import { InstagramIcon } from "./icons";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://www.instagram.com/thebmwrealtor.noida/";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1740]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0b1740]/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-400 text-sm font-black text-brand-950">
            BR
          </span>
          <span className="text-sm font-semibold leading-tight text-white">
            The BMW Realtor
            <span className="block text-[11px] font-normal text-white/60">
              Noida Property Sellers
            </span>
          </span>
        </Link>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/90 transition hover:border-accent-400 hover:text-accent-400"
          aria-label="Follow on Instagram"
        >
          <InstagramIcon className="h-4.5 w-4.5" />
        </a>
      </div>
    </header>
  );
}
