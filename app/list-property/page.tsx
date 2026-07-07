"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import PhotoUploader from "@/components/PhotoUploader";
import { DEFAULT_COUNTRY, type Country } from "@/lib/countries";
import { supabase } from "@/lib/supabase";
import type { CityRow, InquiryPhoto, StateRow } from "@/lib/types";

const OTHER_VALUE = "__other__";

export default function ListPropertyPage() {
  const router = useRouter();

  const [states, setStates] = useState<StateRow[]>([]);
  const [cities, setCities] = useState<CityRow[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(true);

  const [name, setName] = useState("");
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [phone, setPhone] = useState("");

  const [houseNo, setHouseNo] = useState("");
  const [sector, setSector] = useState("");
  const [block, setBlock] = useState("");
  const [projectName, setProjectName] = useState("");

  const [stateId, setStateId] = useState<string>("");
  const [customState, setCustomState] = useState("");
  const [cityId, setCityId] = useState<string>("");
  const [customCity, setCustomCity] = useState("");

  const draftId = useMemo(() => crypto.randomUUID(), []);
  const [photos, setPhotos] = useState<InquiryPhoto[]>([]);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStates() {
      const { data, error } = await supabase
        .from("states")
        .select("id,name")
        .order("name");
      if (!error && data) {
        setStates(data);
        const up = data.find((s) => s.name.toLowerCase() === "uttar pradesh");
        setStateId(up ? up.id : data[0]?.id ?? OTHER_VALUE);
      } else {
        setStateId(OTHER_VALUE);
      }
      setLocationsLoading(false);
    }
    loadStates();
  }, []);

  useEffect(() => {
    async function loadCities() {
      if (!stateId || stateId === OTHER_VALUE) {
        setCities([]);
        return;
      }
      const { data, error } = await supabase
        .from("cities")
        .select("id,name,state_id")
        .eq("state_id", stateId)
        .order("name");
      if (!error && data) {
        setCities(data);
        const noida = data.find((c) => c.name.toLowerCase() === "noida");
        setCityId(noida ? noida.id : data[0]?.id ?? OTHER_VALUE);
      }
    }
    loadCities();
  }, [stateId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) return setFormError("Please enter your name.");
    if (!phone.trim() || phone.trim().length < 6)
      return setFormError("Please enter a valid phone number.");
    if (!sector.trim()) return setFormError("Please enter the sector.");

    const stateName =
      stateId === OTHER_VALUE
        ? customState.trim()
        : states.find((s) => s.id === stateId)?.name ?? "";
    const cityName =
      cityId === OTHER_VALUE
        ? customCity.trim()
        : cities.find((c) => c.id === cityId)?.name ?? "";

    if (!stateName) return setFormError("Please enter the state.");
    if (!cityName) return setFormError("Please enter the city.");

    setSubmitting(true);
    try {
      const { data: inquiry, error: insertError } = await supabase
        .from("inquiries")
        .insert({
          name: name.trim(),
          country_dial_code: country.dialCode,
          country_iso: country.iso,
          phone: phone.trim(),
          house_no: houseNo.trim() || null,
          sector: sector.trim(),
          block: block.trim() || null,
          project_name: projectName.trim() || null,
          city_id: cityId === OTHER_VALUE ? null : cityId,
          city_name: cityName,
          state_id: stateId === OTHER_VALUE ? null : stateId,
          state_name: stateName,
          country: "India",
        })
        .select("id")
        .single();

      if (insertError || !inquiry) {
        throw new Error(insertError?.message ?? "Could not save your listing.");
      }

      if (photos.length > 0) {
        const { error: photosError } = await supabase.from("inquiry_photos").insert(
          photos.map((p) => ({
            inquiry_id: inquiry.id,
            url: p.url,
            storage_path: p.storagePath,
          }))
        );
        if (photosError) throw new Error(photosError.message);
      }

      router.push("/thank-you");
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-lg px-4 pb-16 pt-6">
        <Link
          href="/"
          className="text-xs font-medium text-brand-500 hover:underline"
        >
          &larr; Back home
        </Link>

        <h1 className="mt-3 text-2xl font-extrabold text-slate-900">
          List your property
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Takes under a minute. Our top Noida brokers will reach out to you
          directly.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <fieldset className="space-y-4">
            <legend className="text-xs font-bold uppercase tracking-wide text-brand-500">
              Your details
            </legend>

            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Sharma"
                className="w-full rounded-xl border border-slate-200 px-3.5 py-3.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">
                Phone number
              </label>
              <div className="flex">
                <CountryCodeSelect value={country} onChange={setCountry} />
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d\s]/g, ""))}
                  placeholder="98765 43210"
                  className="w-full rounded-r-xl border border-slate-200 px-3.5 py-3.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  required
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="text-xs font-bold uppercase tracking-wide text-brand-500">
              Property details
            </legend>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="houseNo" className="mb-1 block text-sm font-medium text-slate-700">
                  House No.
                </label>
                <input
                  id="houseNo"
                  type="text"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  placeholder="B-204"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-3.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
              <div>
                <label htmlFor="sector" className="mb-1 block text-sm font-medium text-slate-700">
                  Sector
                </label>
                <input
                  id="sector"
                  type="text"
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  placeholder="Sector 62"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-3.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="block" className="mb-1 block text-sm font-medium text-slate-700">
                  Block
                </label>
                <input
                  id="block"
                  type="text"
                  value={block}
                  onChange={(e) => setBlock(e.target.value)}
                  placeholder="C"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-3.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
              <div>
                <label htmlFor="projectName" className="mb-1 block text-sm font-medium text-slate-700">
                  Project / Society
                </label>
                <input
                  id="projectName"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Amrapali Sapphire"
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-3.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="state" className="mb-1 block text-sm font-medium text-slate-700">
                  State
                </label>
                <select
                  id="state"
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                  disabled={locationsLoading}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-3.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  {states.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                  <option value={OTHER_VALUE}>Other (type manually)</option>
                </select>
                {stateId === OTHER_VALUE && (
                  <input
                    type="text"
                    value={customState}
                    onChange={(e) => setCustomState(e.target.value)}
                    placeholder="Enter state"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                )}
              </div>
              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-medium text-slate-700">
                  City
                </label>
                <select
                  id="city"
                  value={cityId}
                  onChange={(e) => setCityId(e.target.value)}
                  disabled={locationsLoading}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-3.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                  <option value={OTHER_VALUE}>Other (type manually)</option>
                </select>
                {cityId === OTHER_VALUE && (
                  <input
                    type="text"
                    value={customCity}
                    onChange={(e) => setCustomCity(e.target.value)}
                    placeholder="Enter city"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                )}
              </div>
            </div>

            <div>
              <label htmlFor="country" className="mb-1 block text-sm font-medium text-slate-700">
                Country
              </label>
              <input
                id="country"
                type="text"
                value="India"
                disabled
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3.5 text-sm text-slate-500"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-500">
              Photos (optional)
            </legend>
            <PhotoUploader
              draftId={draftId}
              photos={photos}
              onPhotosChange={setPhotos}
            />
          </fieldset>

          {formError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-brand-600 py-4 text-sm font-bold text-white shadow-card transition active:scale-[0.98] disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit Listing"}
          </button>
          <p className="text-center text-[11px] text-slate-400">
            By submitting, you agree to be contacted by our partner brokers
            about your property.
          </p>
        </form>
      </main>
    </>
  );
}
