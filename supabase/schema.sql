-- The BMW Realtor — Noida Seller Platform
-- Run this once in the Supabase SQL editor (https://app.supabase.com -> SQL Editor)
-- Project: https://zyxfgssfsfpgcttccyoc.supabase.co

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Location tables (dynamic — start with UP/Noida, add more states/cities any time)
-- ---------------------------------------------------------------------------
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

-- ---------------------------------------------------------------------------
-- Seller inquiries
-- ---------------------------------------------------------------------------
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
  url text not null,
  created_at timestamptz not null default now()
);

create index if not exists inquiry_photos_inquiry_id_idx on inquiry_photos (inquiry_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table states enable row level security;
alter table cities enable row level security;
alter table inquiries enable row level security;
alter table inquiry_photos enable row level security;

-- Anyone can read the location lists (used to populate the dropdowns)
create policy "public read states" on states for select using (true);
create policy "public read cities" on cities for select using (true);

-- Anyone can submit a listing inquiry (public seller form), but cannot read others' inquiries
create policy "public insert inquiries" on inquiries for insert with check (true);
create policy "public insert inquiry photos" on inquiry_photos for insert with check (true);

-- Allow a seller to manage (edit/delete) photos they just uploaded within the same session
-- via the anon key from the client (CRUD on their own not-yet-submitted photos).
create policy "public update inquiry photos" on inquiry_photos for update using (true);
create policy "public delete inquiry photos" on inquiry_photos for delete using (true);

-- ---------------------------------------------------------------------------
-- Storage bucket for property photos
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('property-photos', 'property-photos', true)
on conflict (id) do nothing;

create policy "public read property photos"
  on storage.objects for select
  using (bucket_id = 'property-photos');

create policy "public upload property photos"
  on storage.objects for insert
  with check (bucket_id = 'property-photos');

create policy "public delete own property photos"
  on storage.objects for delete
  using (bucket_id = 'property-photos');

-- ---------------------------------------------------------------------------
-- Seed data — Uttar Pradesh / Noida to start; add more any time with plain INSERTs
-- ---------------------------------------------------------------------------
insert into states (name) values ('Uttar Pradesh') on conflict (name) do nothing;

insert into cities (name, state_id)
select 'Noida', id from states where name = 'Uttar Pradesh'
on conflict (name, state_id) do nothing;

insert into cities (name, state_id)
select 'Greater Noida', id from states where name = 'Uttar Pradesh'
on conflict (name, state_id) do nothing;

-- To add another state later:
--   insert into states (name) values ('Delhi');
-- Then add its cities:
--   insert into cities (name, state_id) select 'New Delhi', id from states where name = 'Delhi';
