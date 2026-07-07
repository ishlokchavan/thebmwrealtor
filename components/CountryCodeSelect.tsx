"use client";

import { COUNTRIES, type Country } from "@/lib/countries";
import { ChevronDownIcon } from "./icons";

export default function CountryCodeSelect({
  value,
  onChange,
}: {
  value: Country;
  onChange: (country: Country) => void;
}) {
  return (
    <div className="relative shrink-0">
      <select
        aria-label="Country code"
        value={value.iso}
        onChange={(e) => {
          const next = COUNTRIES.find((c) => c.iso === e.target.value);
          if (next) onChange(next);
        }}
        className="h-full appearance-none rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 py-3.5 pl-3.5 pr-8 text-sm font-semibold text-ink transition focus:border-bmw-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-bmw-200"
      >
        {COUNTRIES.map((c) => (
          <option key={c.iso} value={c.iso}>
            {c.flag} {c.dialCode}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  );
}
