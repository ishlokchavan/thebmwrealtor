import Link from "next/link";
import CountUp from "./CountUp";
import Photo from "./Photo";
import SkylineIllustration from "./SkylineIllustration";
import { IMAGES } from "@/lib/site";
import { ArrowRightIcon } from "./icons";

const stats: [number, string][] = [
  [60, "days* to sell"],
  [10, "top brokers"],
  [0, "brokerage"],
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-carbon-950 text-white">
      {/* Real photo layer (loads on the live site; gradient shows if it fails) */}
      <Photo
        src={IMAGES.heroExterior}
        alt="Modern residential towers in Noida at golden hour"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div className="pointer-events-none absolute inset-0 bg-carbon-mesh opacity-85" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/70 to-carbon-950/20" />
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-40" />
      <SkylineIllustration className="absolute inset-x-0 bottom-0 h-44 w-full opacity-80" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-float rounded-full bg-emerald-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-3xl px-4 pb-24 pt-16 text-center sm:pt-24 sm:pb-28">
        <div className="animate-fade-up">
          <div className="mx-auto inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur">
            <span className="accent-line h-3.5 w-6 rounded-sm" aria-hidden="true" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80">
              Building Massive Wealth · Noida
            </span>
          </div>

          <h1 className="mx-auto mt-6 max-w-2xl font-display text-[2.9rem] font-extrabold uppercase leading-[0.95] tracking-tight sm:text-[4.6rem]">
            Sell in{" "}
            <span className="text-gradient-emerald">60 days</span>
            <span className="align-super text-2xl text-emerald-300">*</span>
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
            Matched with Noida&apos;s{" "}
            <span className="font-semibold text-white">top 10 brokers</span>. Free
            to list.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/list-property"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-emerald-600 active:scale-[0.98] sm:w-auto"
            >
              List Your Property — Free
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/20 px-6 py-4 text-sm font-semibold uppercase tracking-wide text-white/90 transition hover:border-white/40 hover:bg-white/5 sm:w-auto"
            >
              How it works
            </a>
          </div>

          <div className="mx-auto mt-10 grid max-w-md grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-4">
            {stats.map(([n, l]) => (
              <div key={l} className="px-2 text-center">
                <p className="font-display text-3xl font-extrabold text-white">
                  <CountUp to={n} />
                </p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wide leading-tight text-white/50">
                  {l}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="relative mx-auto max-w-3xl px-4 pb-6 text-center text-[11px] text-white/35">
        *Indicative timeline based on active seller engagement, not a guarantee.
      </p>
    </section>
  );
}
