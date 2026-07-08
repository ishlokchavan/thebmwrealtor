import AccentBar from "./AccentBar";
import Reveal from "./Reveal";
import { BadgeIcon, KeyIcon, ShieldIcon, TrendingUpIcon } from "./icons";

const features = [
  {
    icon: BadgeIcon,
    title: "Top 10 brokers only",
    desc: "An invite-only network. Brokers can't self-register.",
  },
  {
    icon: TrendingUpIcon,
    title: "Sell faster, for more",
    desc: "Matched buyers close most homes in ~60 days*.",
  },
  {
    icon: KeyIcon,
    title: "Zero brokerage",
    desc: "Free to list. You stay in full control.",
  },
  {
    icon: ShieldIcon,
    title: "Data protected",
    desc: "Encrypted, never sold. Brokers only, after you submit.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <Reveal className="max-w-xl">
        <AccentBar />
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
          The difference
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
          A smarter way to build wealth
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={i * 80}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-card">
              <span className="absolute left-0 top-0 h-full w-1 accent-line opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-carbon-950 text-emerald-300 transition-transform duration-300 group-hover:scale-110">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-3 text-sm font-bold text-ink sm:text-base">
                {f.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                {f.desc}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
