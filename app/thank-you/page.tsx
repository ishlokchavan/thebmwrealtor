"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { CheckCircleIcon, WhatsAppIcon } from "@/components/icons";
import { BUSINESS_WHATSAPP } from "@/lib/site";

export default function ThankYouPage() {
  const [waUrl, setWaUrl] = useState<string | null>(null);

  useEffect(() => {
    const url = sessionStorage.getItem("bmw_wa_url");
    if (url) {
      setWaUrl(url);
      sessionStorage.removeItem("bmw_wa_url");
      // Auto-open WhatsApp with the prefilled details shortly after landing.
      const t = setTimeout(() => {
        window.location.href = url;
      }, 1400);
      return () => clearTimeout(t);
    }
  }, []);

  const target = waUrl ?? `https://wa.me/${BUSINESS_WHATSAPP}`;

  return (
    <>
      <Header />
      <main className="relative flex min-h-[86vh] flex-col items-center justify-center overflow-hidden bg-carbon-mesh px-4 py-16 text-center text-white">
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-40" />
        <div className="pointer-events-none absolute left-1/2 top-16 h-64 w-64 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="relative w-full max-w-sm animate-fade-up">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/40">
            <CheckCircleIcon className="h-11 w-11" />
          </div>
          <span className="accent-line mx-auto mt-6 block h-1 w-16 rounded-full" aria-hidden="true" />
          <h1 className="mt-4 font-display text-3xl font-extrabold uppercase tracking-tight">
            You&apos;re all set
          </h1>
          <p className="mt-2 text-sm text-white/70">
            {waUrl
              ? "One last step — send your details on WhatsApp so our brokers can reach you faster."
              : "Thanks! Our top brokers will review your listing and reach out to you directly."}
          </p>

          <a
            href={target}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] py-4 text-sm font-bold uppercase tracking-wide text-white shadow-glow transition hover:brightness-105 active:scale-[0.98]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {waUrl ? "Send my details on WhatsApp" : "Chat with us on WhatsApp"}
          </a>

          {waUrl && (
            <p className="mt-3 text-xs text-white/40">Opening WhatsApp for you…</p>
          )}

          <Link
            href="/"
            className="mt-6 inline-block text-xs font-medium text-white/50 transition hover:text-white"
          >
            &larr; Back to home
          </Link>
        </div>
      </main>
    </>
  );
}
