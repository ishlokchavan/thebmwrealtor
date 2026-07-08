import Link from "next/link";
import AccentBar from "./AccentBar";
import Reveal from "./Reveal";
import { ArrowRightIcon, CameraIcon, HomeIcon, UsersIcon } from "./icons";

const steps = [
  {
    icon: HomeIcon,
    title: "Share your property",
    desc: "A 60-second form. Photos optional.",
  },
  {
    icon: UsersIcon,
    title: "We match top brokers",
    desc: "Routed to the 10 brokers in your sector.",
  },
  {
    icon: CameraIcon,
    title: "Close with confidence",
    desc: "Real buyers, visits, sold in ~60 days*.",
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
        <Reveal className="max-w-xl">
          <AccentBar />
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            The process
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Three steps to sold
          </h2>
        </Reveal>

        <ol className="relative mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 120} className="relative">
              <div className="group h-full overflow-hidden rounded-2xl glass p-6 transition hover:-translate-y-1">
                <span className="accent-line absolute left-0 top-0 h-1 w-full" aria-hidden="true" />
                <div className="flex items-center justify-between pt-1">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500 text-white transition-transform duration-300 group-hover:scale-110">
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
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10">
          <Link
            href="/list-property"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-500 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-emerald-600 active:scale-[0.98]"
          >
            Start your free listing
            <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
