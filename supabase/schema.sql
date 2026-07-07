-- =====================================================================
-- The BMW Realtor — Building Massive Wealth | Noida Seller Platform
-- Secure schema. Run once in the Supabase SQL Editor:
--   https://supabase.com/dashboard/project/zyxfgssfsfpgcttccyoc/sql/new
--
-- Security model
-- --------------
-- * The public seller form uses the ANON key and can ONLY INSERT.
--   It can never SELECT / read anyone's inquiries or photos.
-- * Seller contact data is readable ONLY by a logged-in admin
--   (authenticated role) — i.e. gautam@agadxb.com.
-- * Property photos live in a PRIVATE storage bucket. The public can
--   upload but cannot list/read them; the admin views them via signed URLs.
-- =====================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Location tables (dynamic — add more states/cities any time)
-- ---------------------------------------------------------------------
create table if not exists states (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists cities (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  state_id uuid not null references states(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (name, state_id)
);

-- ---------------------------------------------------------------------
-- Seller inquiries
-- ---------------------------------------------------------------------
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country_dial_code text not null default '+91',
  country_iso text not null default 'IN',
  phone text not null,
  house_no text,
  sector text,
  block text,
  project_name text,
  city_id uuid references cities(id),
  city_name text,
  state_id uuid references states(id),
  state_name text not null default 'Uttar Pradesh',
  country text not null default 'India',
  status text not null default 'new' check (status in ('new', 'contacted', 'in_progress', 'closed')),
  created_at timestamptz not null default now()
);

create index if not exists inquiries_created_at_idx on inquiries (created_at desc);

create table if not exists inquiry_photos (
  id uuid primary key default gen_random_uuid(),
  inquiry_id uuid not null references inquiries(id) on delete cascade,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create index if not exists inquiry_photos_inquiry_id_idx on inquiry_photos (inquiry_id);

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------
alter table states enable row level security;
alter table cities enable row level security;
alter table inquiries enable row level security;
alter table inquiry_photos enable row level security;

-- Reset any older permissive policies so re-running this file is safe.
drop policy if exists "public read states" on states;
drop policy if exists "public read cities" on cities;
drop policy if exists "public insert inquiries" on inquiries;
drop policy if exists "public insert inquiry photos" on inquiry_photos;
drop policy if exists "public update inquiry photos" on inquiry_photos;
drop policy if exists "public delete inquiry photos" on inquiry_photos;
drop policy if exists "admin read inquiries" on inquiries;
drop policy if exists "admin update inquiries" on inquiries;
drop policy if exists "admin delete inquiries" on inquiries;
drop policy if exists "admin read inquiry photos" on inquiry_photos;
drop policy if exists "admin delete inquiry photos" on inquiry_photos;
drop policy if exists "seller insert inquiries" on inquiries;
drop policy if exists "seller insert inquiry photos" on inquiry_photos;

-- Location lists are public (needed to populate the form dropdowns). Not sensitive.
create policy "public read states" on states for select using (true);
create policy "public read cities" on cities for select using (true);

-- Sellers (anon) may ONLY insert. No select/update/delete → nobody can read
-- or scrape seller contact details with the public anon key.
create policy "seller insert inquiries"
  on inquiries for insert to anon, authenticated with check (true);
create policy "seller insert inquiry photos"
  on inquiry_photos for insert to anon, authenticated with check (true);

-- Admin (any logged-in user) can read and manage inquiries.
create policy "admin read inquiries"
  on inquiries for select to authenticated using (true);
create policy "admin update inquiries"
  on inquiries for update to authenticated using (true) with check (true);
create policy "admin delete inquiries"
  on inquiries for delete to authenticated using (true);

create policy "admin read inquiry photos"
  on inquiry_photos for select to authenticated using (true);
create policy "admin delete inquiry photos"
  on inquiry_photos for delete to authenticated using (true);

-- ---------------------------------------------------------------------
-- Private storage bucket for property photos
-- ---------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('property-photos', 'property-photos', false)
on conflict (id) do update set public = false;

drop policy if exists "public read property photos" on storage.objects;
drop policy if exists "public upload property photos" on storage.objects;
drop policy if exists "public delete own property photos" on storage.objects;
drop policy if exists "seller upload property photos" on storage.objects;
drop policy if exists "seller delete draft property photos" on storage.objects;
drop policy if exists "admin read property photos" on storage.objects;

-- Public can upload (write-only) and delete their own just-added draft photos.
create policy "seller upload property photos"
  on storage.objects for insert to anon, authenticated
  with check (bucket_id = 'property-photos');
create policy "seller delete draft property photos"
  on storage.objects for delete to anon, authenticated
  using (bucket_id = 'property-photos');

-- Only the logged-in admin can read/view photos (via signed URLs).
create policy "admin read property photos"
  on storage.objects for select to authenticated
  using (bucket_id = 'property-photos');

-- ---------------------------------------------------------------------
-- Seed data — Uttar Pradesh / Noida to start
-- ---------------------------------------------------------------------
insert into states (name) values ('Uttar Pradesh') on conflict (name) do nothing;

insert into cities (name, state_id)
select 'Noida', id from states where name = 'Uttar Pradesh'
on conflict (name, state_id) do nothing;

insert into cities (name, state_id)
select 'Greater Noida', id from states where name = 'Uttar Pradesh'
on conflict (name, state_id) do nothing;

-- Add more locations later with plain INSERTs, e.g.:
--   insert into states (name) values ('Delhi');
--   insert into cities (name, state_id) select 'New Delhi', id from states where name = 'Delhi';
