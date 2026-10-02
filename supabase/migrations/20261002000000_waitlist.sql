-- The early access waitlist.
-- Visitors never touch the table: the site calls join_waitlist(), which only adds an email.
-- Reading the list, exporting it and sending invites happen in the dashboard or with the secret key.

create extension if not exists citext with schema extensions;

create table if not exists public.waitlist (
  id              uuid primary key default gen_random_uuid(),
  email           extensions.citext not null unique
                  check (length(email) <= 254 and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  source          text check (length(source) <= 200),     -- the site's host, e.g. goalkeeper.app
  referrer        text check (length(referrer) <= 500),   -- the page that sent them, if any
  token           uuid not null default gen_random_uuid(), -- for confirm and unsubscribe links later
  created_at      timestamptz not null default now(),
  confirmed_at    timestamptz,
  invite_wave     smallint,                                -- which batch they were invited in
  invited_at      timestamptz,
  unsubscribed_at timestamptz
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at);
create index if not exists waitlist_invite_idx on public.waitlist (invite_wave, invited_at);

-- Row level security on, with no policies: the public keys can't read, change or delete rows.
alter table public.waitlist enable row level security;
revoke all on public.waitlist from anon, authenticated;

-- The one thing the public key may do. It answers the same way whether the email is new or
-- already on the list, so nobody can use it to check who signed up.
create or replace function public.join_waitlist(p_email text, p_source text default null, p_referrer text default null)
returns json
language plpgsql
security definer
set search_path = ''
as $$
declare
  e text := lower(trim(p_email));
begin
  if e is null or length(e) > 254 or e !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' then
    raise exception 'invalid email' using errcode = '22023';
  end if;
  insert into public.waitlist (email, source, referrer)
  values (e, left(p_source, 200), left(p_referrer, 500))
  on conflict (email) do nothing;
  return json_build_object('ok', true);
end;
$$;

revoke all on function public.join_waitlist(text, text, text) from public;
grant execute on function public.join_waitlist(text, text, text) to anon, authenticated;

-- Sign-ups per day, for a quick look in the dashboard. Not exposed to the public keys.
create or replace view public.waitlist_daily with (security_invoker = true) as
  select date_trunc('day', created_at at time zone 'Asia/Kolkata')::date as day, count(*) as signups
  from public.waitlist group by 1 order by 1 desc;
revoke all on public.waitlist_daily from anon, authenticated;
