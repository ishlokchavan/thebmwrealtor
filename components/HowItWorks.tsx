import Link from "next/link";
import AccentBar from "./AccentBar";
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
      className="relative overflow-hidden bg-carbon-mesh py-16 text-white sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-50" />
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.1]" />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="max-w-xl">
          <AccentBar />
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
            The process
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Three steps to sold
          </h2>
        </div>

        <ol className="relative mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <div className="h-full overflow-hidden rounded-2xl glass p-6">
                <span className="accent-line absolute left-0 top-0 h-1 w-full" aria-hidden="true" />
                <div className="flex items-center justify-between pt-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400 text-carbon-950">
                    <step.icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-4xl font-extrabold text-white/15">
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
            className="group inline-flex items-center gap-2 rounded-full bg-gold-400 px-7 py-4 text-sm font-bold uppercase tracking-wide text-carbon-950 shadow-glow transition hover:bg-gold-300 active:scale-[0.98]"
          >
            Start your free listing
            <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
