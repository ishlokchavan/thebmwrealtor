import AccentBar from "./AccentBar";
import { QuoteIcon, StarIcon } from "./icons";

const testimonials = [
  {
    quote:
      "Listed my 3 BHK in Sector 78 and had three serious buyers within two weeks. Closed the deal in 47 days.",
    name: "Rohit Malhotra",
    detail: "Sold in Sector 78, Noida",
    initials: "RM",
  },
  {
    quote:
      "No random broker calls at odd hours. Only genuine, verified brokers reached out. Completely stress-free.",
    name: "Anjali Verma",
    detail: "Sold in Sector 137, Noida",
    initials: "AV",
  },
  {
    quote:
      "The team understood my society and pricing. Got me the right buyer at the right value without the runaround.",
    name: "Sandeep Rana",
    detail: "Sold in Greater Noida West",
    initials: "SR",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <AccentBar />
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
            Owner stories
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
            Sellers who moved on faster
          </h2>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-soft">
          <span className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} className="h-4 w-4 text-gold-500" />
            ))}
          </span>
          <span className="text-sm font-bold text-ink">4.9</span>
          <span className="text-xs text-slate-400">avg. rating</span>
        </div>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-6 shadow-soft"
          >
            <QuoteIcon className="h-8 w-8 text-gold-200" />
            <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-700">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-carbon-950 text-sm font-bold text-gold-300">
                {t.initials}
              </span>
              <span>
                <span className="block text-sm font-bold text-ink">{t.name}</span>
                <span className="block text-xs text-slate-400">{t.detail}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
