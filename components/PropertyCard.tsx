import Photo from "./Photo";
import { IMAGES } from "@/lib/site";
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
                  "radial-gradient(120% 100% at 20% 0%, #2f4a3d 0%, transparent 60%), linear-gradient(160deg, #232220 0%, #1a1917 100%)",
              }}
            />
            <Photo
              src={IMAGES.heroExterior}
              alt="Property in Noida"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon-950/50 to-transparent" />
            <span className="absolute left-3 top-3 rounded bg-emerald-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              For Sale
            </span>
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded bg-white/90 px-2 py-1 text-[10px] font-bold text-carbon-900">
              <StarIcon className="h-3 w-3 text-emerald-500" /> 4.9
            </span>
          </div>
          {/* Details */}
          <div className="px-1 pb-1 pt-3">
            <p className="font-display text-base font-bold text-ink">3 BHK Apartment</p>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
              <MapPinIcon className="h-3.5 w-3.5 text-emerald-500" /> Sector 78, Noida
            </p>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-slate-400">Listed by owner</p>
                <p className="text-sm font-bold text-ink">Direct · No brokerage</p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-carbon-950 text-emerald-300">
                <MapPinIcon className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
