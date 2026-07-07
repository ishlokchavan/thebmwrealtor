import Link from "next/link";
import Logo from "./Logo";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
  "https://www.instagram.com/thebmwrealtor.noida/";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-night-950 px-4 pb-10 pt-12 text-white safe-bottom">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Logo className="h-9 w-9" />
              <span className="font-serif text-lg font-semibold">
                The BMW Realtor
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-white/55">
              Connecting Noida property sellers with the city&apos;s top real
              estate brokers. Free to list, no hidden charges, no spam.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-gold-300 hover:text-gold-300"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-gold-300 hover:text-gold-300"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
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
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">
                Get started
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-white/60">
                <li>
                  <Link href="/list-property" className="transition hover:text-white">
                    List a property
                  </Link>
                </li>
                <li className="text-white/40">Noida · Greater Noida</li>
                <li className="text-white/40">Uttar Pradesh, India</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-[11px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} The BMW Realtor, Noida. All rights
            reserved.
          </p>
          <p>Made for property owners across Noida.</p>
        </div>
      </div>
    </footer>
  );
}
