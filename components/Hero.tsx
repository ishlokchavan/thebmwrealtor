import Link from "next/link";
import SkylineIllustration from "./SkylineIllustration";
import { ClockIcon, ShieldIcon, UsersIcon } from "./icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-white">
      <SkylineIllustration className="absolute inset-x-0 bottom-0 h-40 w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1740]/10 via-[#0b1740]/70 to-[#0b1740]" />

      <div className="relative mx-auto max-w-5xl px-4 pb-10 pt-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-400/40 bg-accent-400/10 px-3 py-1 text-xs font-medium text-accent-400">
          Noida&apos;s trusted seller network
        </span>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          Sell your property in{" "}
          <span className="text-accent-400">60 days*</span>
        </h1>
        <p className="mt-3 max-w-md text-base text-white/80">
          Get connected with the{" "}
          <span className="font-semibold text-white">
            top 10 brokers of Noida
          </span>
          . Tell us about your property once — we do the rest.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/list-property"
            className="flex items-center justify-center rounded-xl bg-accent-400 px-6 py-3.5 text-center text-sm font-bold text-brand-950 shadow-card transition active:scale-[0.98]"
          >
            List Your Property — It&apos;s Free
          </Link>
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-3 text-center">
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3">
            <ClockIcon className="mx-auto h-5 w-5 text-accent-400" />
            <dt className="mt-1.5 text-[11px] text-white/70">Avg. sale time</dt>
            <dd className="text-sm font-bold">60 days*</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3">
            <UsersIcon className="mx-auto h-5 w-5 text-accent-400" />
            <dt className="mt-1.5 text-[11px] text-white/70">Top brokers</dt>
            <dd className="text-sm font-bold">10 partners</dd>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3">
            <ShieldIcon className="mx-auto h-5 w-5 text-accent-400" />
            <dt className="mt-1.5 text-[11px] text-white/70">Your data</dt>
            <dd className="text-sm font-bold">Secure</dd>
          </div>
        </dl>
        <p className="mt-3 text-[11px] text-white/40">
          *Indicative timeline based on active seller engagement, not a guarantee.
        </p>
      </div>
    </section>
  );
}
