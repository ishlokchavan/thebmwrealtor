import { MapPinIcon, StarIcon } from "./icons";

export default function PropertyCard({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="w-full max-w-[280px] overflow-hidden rounded-2xl bg-white shadow-float">
        <span className="accent-line block h-1 w-full" aria-hidden="true" />
        <div className="p-3">
          {/* Photo area */}
          <div className="relative h-36 overflow-hidden rounded-xl bg-carbon-900">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(120% 100% at 20% 0%, #3a2f18 0%, transparent 60%), linear-gradient(160deg, #1b1813 0%, #0b0a07 100%)",
              }}
            />
            <svg viewBox="0 0 280 100" className="absolute bottom-0 left-0 w-full" aria-hidden="true">
              {[
                [10, 55, 26, 45],
                [40, 38, 22, 62],
                [66, 62, 20, 38],
                [90, 26, 28, 74],
                [122, 48, 22, 52],
                [148, 60, 20, 40],
                [172, 32, 26, 68],
                [202, 52, 22, 48],
                [228, 40, 24, 60],
                [256, 58, 18, 42],
              ].map(([x, y, w, h], i) => (
                <rect key={i} x={x} y={y} width={w} height={h} rx="1" fill="#0b0a07" opacity={0.7 + (i % 2) * 0.2} />
              ))}
            </svg>
            <span className="absolute left-3 top-3 rounded bg-gold-400 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-carbon-950">
              For Sale
            </span>
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-[10px] font-bold text-carbon-900">
              <StarIcon className="h-3 w-3 text-gold-500" /> 4.9
            </span>
          </div>
          {/* Details */}
          <div className="px-1 pb-1 pt-3">
            <p className="font-display text-base font-bold text-ink">3 BHK Apartment</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <MapPinIcon className="h-3.5 w-3.5 text-gold-500" /> Sector 78, Noida
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-slate-400">Listed by owner</p>
                <p className="text-sm font-bold text-ink">Direct · No brokerage</p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-carbon-950 text-gold-300">
                <MapPinIcon className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
