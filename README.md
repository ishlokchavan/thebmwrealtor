# The BMW Realtor — Noida Seller Platform

Mobile-first Next.js + Supabase app for sellers in Noida to list their
property and get connected with the top brokers in the city.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Postgres + Storage) via `@supabase/supabase-js`
- Deploys on Vercel (auto-publish from GitHub)

## 1. Set up the database

The Supabase project is **not** connected to this session, so run the schema
yourself once:

1. Open your project's SQL Editor: https://supabase.com/dashboard/project/zyxfgssfsfpgcttccyoc/sql/new
2. Paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) and run it.

This creates:
- `states` / `cities` — dynamic location lists (seeded with Uttar Pradesh →
  Noida, Greater Noida). Add more any time with plain `INSERT`s — no code
  changes needed, the form reads them live.
- `inquiries` — seller submissions (name, phone w/ country code, property
  details, location).
- `inquiry_photos` — photos attached to a listing.
- Storage bucket `property-photos` (public read, public upload) for photo
  uploads from the form.
- Row Level Security policies allowing public read on locations, public
  insert on inquiries/photos, and public upload/delete on the photo bucket
  (sellers manage their own photos before submitting).

## 2. Environment variables

Copy `.env.local.example` to `.env.local` (already done in this checkout)
and fill in your Supabase project URL/anon key if they ever change. When
deploying on Vercel, set the same two variables in the project's
Environment Variables settings:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/thebmwrealtor.noida/
```

## 3. Run locally

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## 4. Deploy

Connect this GitHub repo to Vercel — every push to the default branch will
auto-deploy. Add the environment variables above in the Vercel project
settings before the first deploy.

## Pages

- `/` — landing page: hero, tagline, "how it works", broker CTA.
- `/list-property` — the seller inquiry form (name, phone with country
  flag/dial-code, property address fields, dynamic state/city dropdowns,
  optional photo upload with add/remove).
- `/thank-you` — confirmation screen after a successful submission.

## Extending locations

States and cities are stored in the database, not hardcoded, so you can add
all of India's states/cities over time without touching the app:

```sql
insert into states (name) values ('Delhi');
insert into cities (name, state_id) select 'New Delhi', id from states where name = 'Delhi';
```

The form's dropdowns always include an "Other (type manually)" fallback so
sellers are never blocked while you're still filling out the location list.
