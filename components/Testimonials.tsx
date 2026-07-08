import AccentBar from "./AccentBar";
import Reveal from "./Reveal";
import { CheckCircleIcon, QuoteIcon, StarIcon } from "./icons";

const testimonials = [
  {
    quote:
      "Three serious buyers within two weeks. Closed the deal in 47 days.",
    detail: "Verified owner · Sector 78, Noida",
  },
  {
    quote:
      "No random calls at odd hours — only genuine, verified brokers. Stress-free.",
    detail: "Verified owner · Sector 137, Noida",
  },
  {
    quote:
      "Got the right buyer at the right value, without the runaround.",
    detail: "Verified owner · Greater Noida West",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <Reveal className="max-w-xl">
          <AccentBar />
          <p className="mt-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
            Owner stories
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-ink sm:text-4xl">
            Sellers who moved on faster
          </h2>
        </Reveal>
        <Reveal className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-soft">
          <span className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} className="h-4 w-4 text-emerald-500" />
            ))}
          </span>
          <span className="text-sm font-bold text-ink">4.9</span>
          <span className="text-xs text-slate-400">avg. rating</span>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.detail} delay={i * 90}>
            <figure className="flex h-full flex-col rounded-2xl border border-slate-200/70 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
              <QuoteIcon className="h-8 w-8 text-emerald-200" />
              <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-slate-700">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500">
                <CheckCircleIcon className="h-4 w-4 text-emerald-500" />
                {t.detail}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
