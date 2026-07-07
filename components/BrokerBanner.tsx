import Link from "next/link";
import { UsersIcon } from "./icons";

export default function BrokerBanner() {
  return (
    <section className="mx-auto max-w-5xl px-4 pb-10">
      <div className="relative overflow-hidden rounded-2xl bg-brand-950 text-white shadow-card">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 20%, rgba(250,204,21,0.25), transparent 45%), radial-gradient(circle at 100% 100%, rgba(77,132,255,0.35), transparent 55%)",
          }}
        />
        <UsersIcon className="pointer-events-none absolute -right-4 -top-4 h-32 w-32 text-white/5" />
        <div className="relative px-5 py-7">
          <h2 className="max-w-[15rem] text-lg font-bold leading-snug">
            Get connected with the top 10 brokers of Noida
          </h2>
          <p className="mt-2 max-w-xs text-sm text-white/70">
            Verified, local, and active in your sector — no cold calls to
            strangers.
          </p>
          <Link
            href="/list-property"
            className="mt-4 inline-flex items-center rounded-lg bg-accent-400 px-5 py-2.5 text-sm font-bold text-brand-950"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}
