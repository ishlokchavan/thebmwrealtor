# The BMW Realtor — Building Massive Wealth (Noida Seller Platform)

Mobile-first Next.js + Supabase app for property owners in Noida to list
their property and get connected with an invite-only network of the city's
top 10 brokers. Premium black-and-gold identity. "BMW" here stands for
**Building Massive Wealth** — this is not affiliated with any car brand.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Auth + private Storage)
- Deploys on Vercel (auto-publish from GitHub `main`)

## Pages

- `/` — landing page (hero, features, how it works, testimonials, CTA)
- `/list-property` — public seller form (contact + property details + photos)
- `/thank-you` — post-submit confirmation
- `/login` — admin sign-in (Supabase Auth)
- `/admin` — protected dashboard: all seller inquiries, photos, status, CSV export

## 1. Set up the database (run once)

Open the SQL Editor and run [`supabase/schema.sql`](./supabase/schema.sql):
https://supabase.com/dashboard/project/zyxfgssfsfpgcttccyoc/sql/new

It creates the tables, a **private** `property-photos` storage bucket, and a
secure Row Level Security model.

## 2. Security model — how seller data is protected

- The public form uses the **anon key** and can **only INSERT**. It cannot
  read, list, or scrape anyone's inquiries. (Try it: there is no SELECT policy
  for the public role, so reads are denied by Postgres RLS.)
- Seller contact details are readable **only by a logged-in admin**
  (the `authenticated` role).
- Property photos live in a **private** storage bucket. The public can upload
  but cannot view others' photos; the admin views them through short-lived
  **signed URLs**.
- The seller form generates each record's id on the client, so it never needs
  read access back after submitting.

## 3. Create the admin user (gautam@agadxb.com)

1. Supabase Dashboard → **Authentication → Users → Add user**.
2. Email: `gautam@agadxb.com`, set a **strong password**, tick
   *Auto Confirm User*.
3. Supabase Dashboard → **Authentication → Providers → Email** and turn
   **OFF** "Allow new users to sign up". This means nobody else can ever
   register — only this account can log in.

To allow additional admins later, add their emails to
[`lib/admin.ts`](./lib/admin.ts) and create their users the same way.

The admin dashboard double-checks the signed-in email against that allow-list,
so even a stray account can't view data.

## 4. Environment variables (Vercel + local)

Set these in Vercel → Project → Settings → Environment Variables (and in a
local `.env.local`, already present in this checkout):

```
NEXT_PUBLIC_SUPABASE_URL=https://zyxfgssfsfpgcttccyoc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your anon key>
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/thebmwrealtor.noida/
```

## 5. Run locally

```bash
npm install
npm run dev   # http://localhost:3000
```

## 6. Connect the domain (buildingmassivewealth.com)

Add the domain in Vercel → Project → Settings → Domains, then in your
registrar's **DNS records** (recommended over nameservers — faster & simpler):

- **A** record: host `@` → `76.76.21.21`
- **CNAME** record: host `www` → `cname.vercel-dns.com`

Vercel shows the exact records next to the domain; match them, then it flips
to a green "Valid".

## Extending locations

States/cities are stored in the DB (not hardcoded). Add more any time:

```sql
insert into states (name) values ('Delhi');
insert into cities (name, state_id) select 'New Delhi', id from states where name = 'Delhi';
```

The form always includes an "Other" option so sellers are never blocked.
