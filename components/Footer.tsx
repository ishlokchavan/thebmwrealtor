import Link from "next/link";
import Logo from "./Logo";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://www.instagram.com/thebmwrealtor.noida/";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-carbon-950 px-4 pb-10 pt-12 text-white safe-bottom">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-display text-lg font-bold uppercase tracking-tight">
                The BMW Realtor
              </span>
            </div>
            <span className="accent-line mt-4 block h-1 w-14 rounded-full" aria-hidden="true" />
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Building massive wealth through Noida real estate. Connecting
              owners with the city&apos;s top brokers — free to list, no hidden
              charges, no spam.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-gold-400 hover:text-gold-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-gold-400 hover:text-gold-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
                Company
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                <li>
                  <Link href="/" className="transition hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/#how-it-works" className="transition hover:text-white">
                    How it works
                  </Link>
                </li>
                <li>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
                Get started
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                <li>
                  <Link href="/list-property" className="transition hover:text-white">
                    List a property
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="transition hover:text-white">
                    Admin login
                  </Link>
                </li>
                <li className="text-white/40">Noida · Greater Noida</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} The BMW Realtor · Building Massive
            Wealth. All rights reserved.
          </p>
          <p>Noida · Greater Noida · Uttar Pradesh, India</p>
        </div>
      </div>
    </footer>
  );
}
