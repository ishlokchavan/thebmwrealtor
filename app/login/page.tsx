"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";
import { ArrowRightIcon, ShieldIcon } from "@/components/icons";
import { supabase } from "@/lib/supabase";
import { isAdminEmail } from "@/lib/admin";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && isAdminEmail(data.session.user.email)) {
        router.replace("/admin");
      } else {
        setChecking(false);
      }
    });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    if (!isAdminEmail(data.user?.email)) {
      await supabase.auth.signOut();
      setError("This account is not authorised for admin access.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-carbon-mesh px-4 py-12 text-white">
      <span className="accent-line absolute left-0 top-0 h-1 w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-50" />
      <div className="pointer-events-none absolute inset-0 grain opacity-[0.1]" />

      <div className="relative w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <Logo className="h-10 w-10" />
          <span className="leading-tight">
            <span className="block font-display text-base font-bold uppercase tracking-tight">
              The BMW Realtor
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-300">
              Building Massive Wealth
            </span>
          </span>
        </Link>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
          <div className="flex items-center gap-2 text-gold-300">
            <ShieldIcon className="h-5 w-5" />
            <h1 className="font-display text-lg font-bold uppercase tracking-tight">
              Admin login
            </h1>
          </div>
          <p className="mt-1.5 text-sm text-white/60">
            Secure access to seller inquiries.
          </p>

          {checking ? (
            <p className="mt-6 text-sm text-white/50">Checking session…</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/70">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-white/70">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-3 text-sm text-white placeholder:text-white/30 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-400/30"
                  required
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-500/15 px-3 py-2 text-xs text-red-300">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-gold-400 py-3.5 text-sm font-bold uppercase tracking-wide text-carbon-950 shadow-glow transition hover:bg-gold-300 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? "Signing in…" : "Sign in"}
                {!loading && <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />}
              </button>
            </form>
          )}
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-xs text-white/40 transition hover:text-white/70"
        >
          &larr; Back to site
        </Link>
      </div>
    </main>
  );
}
