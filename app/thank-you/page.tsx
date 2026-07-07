import Link from "next/link";
import Header from "@/components/Header";
import { ArrowRightIcon, CheckCircleIcon, ClockIcon, PhoneIcon, UsersIcon } from "@/components/icons";

const next = [
  { icon: UsersIcon, text: "Our top brokers review your listing." },
  { icon: PhoneIcon, text: "You get a call on your number, directly." },
  { icon: ClockIcon, text: "Most owners see interest within days." },
];

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-night-mesh">
        <div className="pointer-events-none absolute inset-0 grain opacity-[0.12]" />
        <div className="pointer-events-none absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-gold-400/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-[82vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center text-white">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-300/15 text-gold-300 ring-1 ring-gold-300/30">
            <CheckCircleIcon className="h-11 w-11" />
          </div>
          <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Listing submitted!
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            Thank you for sharing your property details. Here&apos;s what happens
            next.
          </p>

          <ul className="mt-8 w-full space-y-3 text-left">
            {next.map((n) => (
              <li
                key={n.text}
                className="flex items-center gap-3 rounded-2xl glass px-4 py-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-300 text-night-950">
                  <n.icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm text-white/85">{n.text}</span>
              </li>
            ))}
          </ul>

          <Link
            href="/"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold-300 px-7 py-4 text-sm font-bold text-night-950 shadow-glow transition hover:bg-gold-200 active:scale-[0.98]"
          >
            Back to Home
            <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </main>
    </>
  );
}
