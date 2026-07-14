-- STRAVION iletişim / strateji görüşmesi talepleri
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 120),
  email text not null check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  company text check (char_length(company) <= 160),
  phone text check (char_length(phone) <= 40),
  topic text not null check (char_length(topic) <= 80),
  message text not null check (char_length(message) between 10 and 4000),
  locale text not null default 'tr' check (locale in ('tr','en')),
  kvkk_consent boolean not null default false,
  ip_hash text,
  user_agent text
);

comment on table public.contact_requests is 'Site iletişim formu kayıtları (yalnızca insert; okuma sadece dashboard/service role)';

-- RLS: dışarıdan yalnızca INSERT; SELECT/UPDATE/DELETE yok
alter table public.contact_requests enable row level security;

drop policy if exists "anon_can_insert_contact" on public.contact_requests;
create policy "anon_can_insert_contact"
  on public.contact_requests
  for insert
  to anon
  with check (kvkk_consent = true);

-- kaba istismarı sınırlamak için basit indeks
create index if not exists contact_requests_created_at_idx on public.contact_requests (created_at desc);
create index if not exists contact_requests_ip_hash_idx on public.contact_requests (ip_hash, created_at desc);
