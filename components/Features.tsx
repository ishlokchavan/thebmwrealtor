import MStripe from "./MStripe";
import { BadgeIcon, GaugeIcon, KeyIcon, ShieldIcon } from "./icons";

const features = [
  {
    icon: BadgeIcon,
    title: "Top 10 verified brokers",
    desc: "Your listing is routed only to Noida's most active, background-checked brokers — never a public spam list.",
  },
  {
    icon: GaugeIcon,
    title: "Performance you can measure",
    desc: "Motivated buyers matched to your sector help most owners close in around 60 days*.",
  },
  {
    icon: KeyIcon,
    title: "Zero brokerage to list",
    desc: "Listing your property is completely free. You stay in the driver's seat on every conversation.",
  },
  {
    icon: ShieldIcon,
    title: "Your data, secured",
    desc: "We never sell your number. Only matched brokers see your details, and only after you submit.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <div className="max-w-xl">
        <MStripe />
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-bmw-600">
          The difference
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
          Engineered to sell faster
        </h2>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {features.map((f) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-bmw-200 hover:shadow-card"
          >
            <span className="absolute left-0 top-0 h-full w-1 m-stripe opacity-0 transition group-hover:opacity-100" aria-hidden="true" />
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-carbon-950 text-bmw-300">
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
