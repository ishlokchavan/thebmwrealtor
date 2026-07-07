"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import {
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
  TrashIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { PROPERTY_PHOTOS_BUCKET, supabase } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/admin";

type Inquiry = {
  id: string;
  name: string;
  country_dial_code: string;
  phone: string;
  house_no: string | null;
  sector: string | null;
  block: string | null;
  project_name: string | null;
  city_name: string | null;
  state_name: string | null;
  country: string;
  status: string;
  created_at: string;
};

const STATUSES = ["new", "contacted", "in_progress", "closed"] as const;

const statusStyles: Record<string, string> = {
  new: "bg-gold-100 text-gold-700 border-gold-200",
  contacted: "bg-blue-50 text-blue-700 border-blue-200",
  in_progress: "bg-amber-50 text-amber-700 border-amber-200",
  closed: "bg-green-50 text-green-700 border-green-200",
};

export default function AdminPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [photos, setPhotos] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    const { data: rows } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });

    setInquiries((rows as Inquiry[]) ?? []);

    const { data: photoRows } = await supabase
      .from("inquiry_photos")
      .select("inquiry_id,storage_path");

    if (photoRows && photoRows.length > 0) {
      const paths = photoRows.map((p) => p.storage_path);
      const { data: signed } = await supabase.storage
        .from(PROPERTY_PHOTOS_BUCKET)
        .createSignedUrls(paths, 3600);

      const byPath: Record<string, string> = {};
      (signed ?? []).forEach((s) => {
        if (s.signedUrl && s.path) byPath[s.path] = s.signedUrl;
      });

      const grouped: Record<string, string[]> = {};
      photoRows.forEach((p) => {
        const url = byPath[p.storage_path];
        if (!url) return;
        (grouped[p.inquiry_id] ??= []).push(url);
      });
      setPhotos(grouped);
    } else {
      setPhotos({});
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      if (!data.session || !isAdminEmail(user?.email)) {
        router.replace("/login");
        return;
      }
      setEmail(user?.email ?? null);
      setReady(true);
      loadData();
    });
  }, [router, loadData]);

  async function updateStatus(id: string, status: string) {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status } : i))
    );
    await supabase.from("inquiries").update({ status }).eq("id", id);
  }

  async function deleteInquiry(id: string) {
    if (!confirm("Delete this inquiry permanently?")) return;
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    await supabase.from("inquiries").delete().eq("id", id);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  function exportCsv() {
    const headers = [
      "Name",
      "Phone",
      "House No",
      "Block",
      "Sector",
      "Project",
      "City",
      "State",
      "Status",
      "Created",
    ];
    const rows = inquiries.map((i) => [
      i.name,
      `${i.country_dial_code} ${i.phone}`,
      i.house_no ?? "",
      i.block ?? "",
      i.sector ?? "",
      i.project_name ?? "",
      i.city_name ?? "",
      i.state_name ?? "",
      i.status,
      new Date(i.created_at).toLocaleString(),
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "seller-inquiries.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return inquiries;
    return inquiries.filter((i) =>
      [i.name, i.phone, i.sector, i.project_name, i.city_name, i.state_name]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q))
    );
  }, [inquiries, query]);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-carbon-950 text-white/60">
        <p className="text-sm">Checking access…</p>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-carbon-950 text-white">
        <span className="accent-line block h-1 w-full" aria-hidden="true" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <div className="leading-tight">
              <p className="font-display text-sm font-bold uppercase tracking-tight">
                Seller Inquiries
              </p>
              <p className="flex items-center gap-1 text-[11px] text-gold-300">
                <ShieldIcon className="h-3 w-3" /> {email}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80 transition hover:border-gold-400 hover:text-gold-300"
          >
            Log out
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-extrabold uppercase tracking-tight text-ink">
              {inquiries.length} {inquiries.length === 1 ? "listing" : "listings"}
            </h1>
            <p className="text-sm text-slate-500">
              Live seller inquiries from across Noida.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, phone, sector…"
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-200 sm:w-64"
            />
            <button
              onClick={exportCsv}
              className="shrink-0 rounded-lg bg-carbon-950 px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-gold-300 transition hover:bg-carbon-800"
            >
              Export CSV
            </button>
          </div>
        </div>

        {loading ? (
          <p className="mt-10 text-center text-sm text-slate-400">Loading…</p>
        ) : filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-sm text-slate-500">
              {inquiries.length === 0
                ? "No inquiries yet. New seller listings will appear here."
                : "No results match your search."}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filtered.map((i) => {
              const addr = [
                i.house_no,
                i.block ? `Block ${i.block}` : null,
                i.sector,
                i.project_name,
                i.city_name,
                i.state_name,
              ]
                .filter(Boolean)
                .join(", ");
              const dial = `${i.country_dial_code}${i.phone.replace(/\s/g, "")}`;
              const imgs = photos[i.id] ?? [];
              return (
                <article
                  key={i.id}
                  className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-soft"
                >
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 p-4">
                    <div>
                      <p className="font-bold text-ink">{i.name}</p>
                      <p className="text-xs text-slate-400">
                        {new Date(i.created_at).toLocaleString()}
                      </p>
                    </div>
                    <select
                      value={i.status}
                      onChange={(e) => updateStatus(i.id, e.target.value)}
                      className={`rounded-full border px-2.5 py-1 text-xs font-semibold capitalize outline-none ${
                        statusStyles[i.status] ?? "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2.5 p-4">
                    <p className="flex items-start gap-2 text-sm text-slate-600">
                      <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                      {addr || "No address provided"}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={`tel:${dial}`}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-carbon-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-carbon-800"
                      >
                        <PhoneIcon className="h-3.5 w-3.5 text-gold-300" />
                        {i.country_dial_code} {i.phone}
                      </a>
                      <a
                        href={`https://wa.me/${dial.replace("+", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-100"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    </div>

                    {imgs.length > 0 && (
                      <div className="flex gap-2 overflow-x-auto pt-1">
                        {imgs.map((url) => (
                          // eslint-disable-next-line @next/next/no-img-element
                          <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                            <img
                              src={url}
                              alt="Property"
                              className="h-16 w-16 shrink-0 rounded-lg border border-slate-200 object-cover"
                            />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end border-t border-slate-100 px-4 py-2">
                    <button
                      onClick={() => deleteInquiry(i.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition hover:text-red-500"
                    >
                      <TrashIcon className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
