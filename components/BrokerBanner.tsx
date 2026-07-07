import Link from "next/link";
import { ArrowRightIcon } from "./icons";

export default function BrokerBanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-24">
      <div className="relative overflow-hidden rounded-3xl bg-carbon-950 px-6 py-12 text-white shadow-card sm:px-12 sm:py-16">
        <span className="m-stripe absolute left-0 top-0 h-1.5 w-full" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(90% 120% at 100% 0%, rgba(28,105,212,0.35), transparent 55%), radial-gradient(80% 100% at 0% 100%, rgba(15,87,192,0.4), transparent 60%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-40" />

        <div className="relative max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-bmw-300">
            Ready to accelerate
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-[2.75rem]">
            Get connected with the top 10 brokers of Noida
          </h2>
          <p className="mt-4 max-w-lg text-base text-white/70">
            Verified, local, and active in your sector — no cold calls to
            strangers. It takes under a minute and costs nothing to list.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/list-property"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-bmw-600 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:bg-bmw-500 active:scale-[0.98]"
            >
              List Your Property — Free
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <span className="text-sm text-white/50">No brokerage · No spam</span>
          </div>
        </div>
      </div>
    </section>
  );
}
