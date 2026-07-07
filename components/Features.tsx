import { BadgeIcon, ClockIcon, KeyIcon, ShieldIcon } from "./icons";

const features = [
  {
    icon: BadgeIcon,
    title: "Top 10 verified brokers",
    desc: "Your listing goes only to Noida's most active, background-checked brokers — never a public spam list.",
  },
  {
    icon: ClockIcon,
    title: "Faster closings",
    desc: "Motivated buyers matched to your sector help most owners close in around 60 days*.",
  },
  {
    icon: KeyIcon,
    title: "Zero brokerage to list",
    desc: "Listing your property is completely free. You stay in control of every conversation.",
  },
  {
    icon: ShieldIcon,
    title: "Your data stays private",
    desc: "We never sell your number. Only matched brokers see your details, and only after you submit.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
          Why owners choose us
        </p>
        <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          A smarter way to sell in Noida
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-gold-200 hover:shadow-card"
          >
            <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-gold-100/60 blur-2xl transition group-hover:bg-gold-200/70" />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-night-950 text-gold-300">
              <f.icon className="h-6 w-6" />
            </div>
            <h3 className="relative mt-4 text-lg font-bold text-ink">{f.title}</h3>
            <p className="relative mt-1.5 text-sm leading-relaxed text-slate-500">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
