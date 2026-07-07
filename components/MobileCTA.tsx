import Link from "next/link";
import { ArrowRightIcon } from "./icons";

export default function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-carbon-950/90 px-4 py-3 backdrop-blur-xl safe-bottom sm:hidden">
      <Link
        href="/list-property"
        className="flex items-center justify-center gap-2 rounded-full bg-gold-400 py-3.5 text-sm font-bold uppercase tracking-wide text-carbon-950 shadow-glow active:scale-[0.98]"
      >
        List Your Property — Free
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}
