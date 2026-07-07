export type Country = {
  name: string;
  iso: string;
  dialCode: string;
  flag: string;
};

// ISO country code -> flag emoji (computed from regional indicator symbols)
function isoToFlag(iso: string): string {
  return iso
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

const RAW_COUNTRIES: { name: string; iso: string; dialCode: string }[] = [
  { name: "India", iso: "IN", dialCode: "+91" },
  { name: "United States", iso: "US", dialCode: "+1" },
  { name: "United Kingdom", iso: "GB", dialCode: "+44" },
  { name: "United Arab Emirates", iso: "AE", dialCode: "+971" },
  { name: "Canada", iso: "CA", dialCode: "+1" },
  { name: "Australia", iso: "AU", dialCode: "+61" },
  { name: "Singapore", iso: "SG", dialCode: "+65" },
  { name: "Saudi Arabia", iso: "SA", dialCode: "+966" },
  { name: "Qatar", iso: "QA", dialCode: "+974" },
  { name: "Kuwait", iso: "KW", dialCode: "+965" },
  { name: "Oman", iso: "OM", dialCode: "+968" },
  { name: "Bahrain", iso: "BH", dialCode: "+973" },
  { name: "Nepal", iso: "NP", dialCode: "+977" },
  { name: "Bangladesh", iso: "BD", dialCode: "+880" },
  { name: "Sri Lanka", iso: "LK", dialCode: "+94" },
  { name: "Germany", iso: "DE", dialCode: "+49" },
  { name: "France", iso: "FR", dialCode: "+33" },
  { name: "Japan", iso: "JP", dialCode: "+81" },
  { name: "China", iso: "CN", dialCode: "+86" },
  { name: "Malaysia", iso: "MY", dialCode: "+60" },
];

export const COUNTRIES: Country[] = RAW_COUNTRIES.map((c) => ({
  ...c,
  flag: isoToFlag(c.iso),
})).sort((a, b) => (a.iso === "IN" ? -1 : b.iso === "IN" ? 1 : a.name.localeCompare(b.name)));

export const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.iso === "IN")!;
