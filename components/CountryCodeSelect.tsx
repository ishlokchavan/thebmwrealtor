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
        value={`${value.iso}`}
        onChange={(e) => {
          const next = COUNTRIES.find((c) => c.iso === e.target.value);
          if (next) onChange(next);
        }}
        className="peer h-full appearance-none rounded-l-xl border border-r-0 border-slate-200 bg-slate-50 py-3.5 pl-3 pr-7 text-sm font-medium text-slate-800 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
      >
        {COUNTRIES.map((c) => (
          <option key={c.iso} value={c.iso}>
            {c.flag} {c.dialCode}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
    </div>
  );
}
