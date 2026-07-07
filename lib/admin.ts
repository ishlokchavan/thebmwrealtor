// Only these email(s) may access the admin dashboard. Public sign-ups are also
// disabled in Supabase Auth, so in practice only this account can log in at all.
export const ADMIN_EMAILS = ["gautam@agadxb.com"];

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.map((e) => e.toLowerCase()).includes(email.toLowerCase());
}
