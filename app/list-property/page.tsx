"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import CountryCodeSelect from "@/components/CountryCodeSelect";
import PhotoUploader from "@/components/PhotoUploader";
import {
  ArrowRightIcon,
  CameraIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
} from "@/components/icons";
import { DEFAULT_COUNTRY, type Country } from "@/lib/countries";
import { supabase } from "@/lib/supabase";
import type { CityRow, InquiryPhoto, StateRow } from "@/lib/types";

const OTHER_VALUE = "__other__";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3.5 text-sm text-ink placeholder:text-slate-400 transition focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-200";
const selectClass =
  "w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-3.5 text-sm text-ink transition focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-200";
const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

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

      {/* Page intro */}
      <div className="relative overflow-hidden bg-night-mesh text-white">
        <div className="pointer-events-none absolute inset-0 grain opacity-[0.12]" />
        <div className="relative mx-auto max-w-2xl px-4 pb-10 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-xs font-medium text-white/60 transition hover:text-white"
          >
            &larr; Back home
          </Link>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            List your property
          </h1>
          <p className="mt-2 max-w-md text-sm text-white/70">
            Takes under a minute. Our top Noida brokers will reach out to you
            directly — free to list, no spam.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <ShieldIcon className="h-4 w-4 text-gold-300" /> Private &amp; secure
            </span>
            <span className="inline-flex items-center gap-1.5">
              <PhoneIcon className="h-4 w-4 text-gold-300" /> Verified brokers only
            </span>
          </div>
        </div>
      </div>

      <main className="mx-auto -mt-6 max-w-2xl px-4 pb-24">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200/70 bg-white p-5 shadow-card sm:p-7"
        >
          {/* Your details */}
          <section>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-night-950 text-gold-300">
                <PhoneIcon className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink">
                Your details
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
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
                    className="w-full rounded-r-xl border border-slate-200 bg-white px-3.5 py-3.5 text-sm text-ink placeholder:text-slate-400 transition focus:border-gold-300 focus:outline-none focus:ring-2 focus:ring-gold-200"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          <hr className="my-7 border-slate-100" />

          {/* Property details */}
          <section>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-night-950 text-gold-300">
                <MapPinIcon className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink">
                Property details
              </h2>
            </div>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="houseNo" className={labelClass}>
                    House No.
                  </label>
                  <input
                    id="houseNo"
                    type="text"
                    value={houseNo}
                    onChange={(e) => setHouseNo(e.target.value)}
                    placeholder="B-204"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="sector" className={labelClass}>
                    Sector
                  </label>
                  <input
                    id="sector"
                    type="text"
                    value={sector}
                    onChange={(e) => setSector(e.target.value)}
                    placeholder="Sector 62"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="block" className={labelClass}>
                    Block
                  </label>
                  <input
                    id="block"
                    type="text"
                    value={block}
                    onChange={(e) => setBlock(e.target.value)}
                    placeholder="C"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="projectName" className={labelClass}>
                    Project / Society
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Amrapali Sapphire"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="state" className={labelClass}>
                    State
                  </label>
                  <div className="relative">
                    <select
                      id="state"
                      value={stateId}
                      onChange={(e) => setStateId(e.target.value)}
                      disabled={locationsLoading}
                      className={selectClass}
                    >
                      {states.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                      <option value={OTHER_VALUE}>Other (type manually)</option>
                    </select>
                  </div>
                  {stateId === OTHER_VALUE && (
                    <input
                      type="text"
                      value={customState}
                      onChange={(e) => setCustomState(e.target.value)}
                      placeholder="Enter state"
                      className={`mt-2 ${inputClass}`}
                    />
                  )}
                </div>
                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>
                  <select
                    id="city"
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                    disabled={locationsLoading}
                    className={selectClass}
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
                      className={`mt-2 ${inputClass}`}
                    />
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="country" className={labelClass}>
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
            </div>
          </section>

          <hr className="my-7 border-slate-100" />

          {/* Photos */}
          <section>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-night-950 text-gold-300">
                <CameraIcon className="h-4 w-4" />
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wide text-ink">
                Photos{" "}
                <span className="font-medium normal-case text-slate-400">
                  (optional)
                </span>
              </h2>
            </div>
            <div className="mt-4">
              <PhotoUploader
                draftId={draftId}
                photos={photos}
                onPhotosChange={setPhotos}
              />
            </div>
          </section>

          {formError && (
            <p className="mt-6 rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-600">
              {formError}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="group mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-gold-300 py-4 text-sm font-bold text-night-950 shadow-glow transition hover:bg-gold-200 active:scale-[0.98] disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit Listing"}
            {!submitting && (
              <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
            )}
          </button>
          <p className="mt-3 text-center text-[11px] text-slate-400">
            By submitting, you agree to be contacted by our partner brokers about
            your property.
          </p>
        </form>
      </main>
    </>
  );
}
