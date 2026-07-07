import Link from "next/link";
import Logo from "./Logo";
import { InstagramIcon } from "./icons";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://www.instagram.com/thebmwrealtor.noida/";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="h-9 w-9" />
          <span className="leading-tight">
            <span className="block font-serif text-[15px] font-semibold tracking-tight text-white">
              The BMW Realtor
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-gold-300">
              Noida
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-gold-300 hover:text-gold-300"
            aria-label="Follow on Instagram"
          >
            <InstagramIcon className="h-[18px] w-[18px]" />
          </a>
          <Link
            href="/list-property"
            className="hidden rounded-full bg-gold-300 px-4 py-2 text-xs font-bold text-night-950 transition hover:bg-gold-200 sm:block"
          >
            List Property
          </Link>
        </div>
      </div>
    </header>
  );
}
