import Link from "next/link";
import { ArrowRightIcon, CameraIcon, HomeIcon, UsersIcon } from "./icons";

const steps = [
  {
    icon: HomeIcon,
    title: "Share your property",
    desc: "Fill a 60-second form with your property and contact details. Add photos to stand out (optional).",
  },
  {
    icon: UsersIcon,
    title: "We match top brokers",
    desc: "Your listing is routed to the top 10 verified brokers who actively work in your sector.",
  },
  {
    icon: CameraIcon,
    title: "Close with confidence",
    desc: "Brokers bring serious buyers, arrange visits, and help you close — usually within 60 days*.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-night-mesh py-16 text-white sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.12]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gold-line" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
            Simple process
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Three steps to a sold sign
          </h2>
        </div>

        <ol className="relative mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="rounded-2xl glass p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-300 text-night-950">
                    <step.icon className="h-6 w-6" />
                  </span>
                  <span className="font-serif text-4xl font-semibold text-white/15">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  {step.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Link
            href="/list-property"
            className="group inline-flex items-center gap-2 rounded-full bg-gold-300 px-7 py-4 text-sm font-bold text-night-950 shadow-glow transition hover:bg-gold-200 active:scale-[0.98]"
          >
            Start your free listing
            <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
