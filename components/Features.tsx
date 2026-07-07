import AccentBar from "./AccentBar";
import { BadgeIcon, KeyIcon, ShieldIcon, TrendingUpIcon } from "./icons";

const features = [
  {
    icon: BadgeIcon,
    title: "An invite-only broker network",
    desc: "Your listing is shared only with our hand-picked network of Noida's top 10 brokers. Brokers cannot self-register — it stays exclusive.",
  },
  {
    icon: TrendingUpIcon,
    title: "A faster, higher-value close",
    desc: "Serious buyers matched to your sector help most owners close in around 60 days* — at the right price.",
  },
  {
    icon: KeyIcon,
    title: "Zero brokerage to list",
    desc: "Listing your property is completely free. You stay in full control of every conversation.",
  },
  {
    icon: ShieldIcon,
    title: "Your data, protected",
    desc: "Your details are encrypted and never sold. Only our verified brokers can access them — and only after you submit.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <div className="max-w-xl">
        <AccentBar />
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
          The difference
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
          A smarter way to build wealth
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-gold-200 hover:shadow-card"
          >
            <span className="absolute left-0 top-0 h-full w-1 accent-line opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-carbon-950 text-gold-300">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-ink">{f.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
