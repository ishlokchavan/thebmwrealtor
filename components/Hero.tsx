import Link from "next/link";
import PropertyCard from "./PropertyCard";
import SkylineIllustration from "./SkylineIllustration";
import { ArrowRightIcon, StarIcon } from "./icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-night-mesh text-white">
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.15]" />
      <SkylineIllustration className="absolute inset-x-0 bottom-0 h-52 w-full opacity-90" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-night-400/30 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-10 sm:pt-14 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:pb-28">
        {/* Copy */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur">
            <span className="flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} className="h-3.5 w-3.5 text-gold-300" />
              ))}
            </span>
            <span className="text-xs font-medium text-white/80">
              Trusted by Noida homeowners
            </span>
          </div>

          <h1 className="mt-5 font-serif text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Sell your property in{" "}
            <span className="text-gradient-gold">60 days</span>
            <span className="align-super text-2xl text-gold-300">*</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg">
            List once and get connected with the{" "}
            <span className="font-semibold text-white">top 10 brokers of Noida</span>.
            Verified buyers, faster closings, zero spam.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/list-property"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold-300 px-7 py-4 text-sm font-bold text-night-950 shadow-glow transition hover:bg-gold-200 active:scale-[0.98]"
            >
              List Your Property — Free
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-4 text-sm font-semibold text-white/90 transition hover:border-white/40 hover:bg-white/5"
            >
              How it works
            </a>
          </div>

          <div className="mt-9 grid max-w-md grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-4">
            {[
              ["60", "days* avg. sale"],
              ["10", "top brokers"],
              ["0", "brokerage to list"],
            ].map(([n, l]) => (
              <div key={l} className="px-2 text-center first:pl-0">
                <p className="font-serif text-2xl font-semibold text-gold-300">{n}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-white/55">{l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="mt-14 flex justify-center lg:mt-0 lg:justify-end">
          <div className="relative">
            <div className="animate-float">
              <PropertyCard />
            </div>
            <div className="absolute bottom-0 -left-4 translate-y-[78%] rounded-2xl glass px-4 py-3 shadow-float sm:-left-9">
              <div className="flex items-center gap-3">
                <span className="flex -space-x-2">
                  {["#dca93a", "#2c3f80", "#a67420"].map((c) => (
                    <span
                      key={c}
                      className="h-7 w-7 rounded-full border-2 border-night-900"
                      style={{ background: c }}
                    />
                  ))}
                </span>
                <p className="text-xs leading-tight text-white/80">
                  <span className="font-bold text-white">240+ owners</span>
                  <br /> listed this month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="relative mx-auto max-w-6xl px-4 pb-6 text-[11px] text-white/35">
        *Indicative timeline based on active seller engagement, not a guarantee.
      </p>
    </section>
  );
}
