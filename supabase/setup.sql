-- Run this once in the Supabase SQL editor.
create extension if not exists pgcrypto;

create table if not exists public.site_admins (
	user_id uuid primary key references auth.users(id) on delete cascade,
	created_at timestamptz not null default now()
);

create table if not exists public.moments (
	id uuid primary key default gen_random_uuid(),
	author_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
	content text not null check (char_length(content) between 1 and 2000),
	images text[] not null default '{}',
	location text check (char_length(location) <= 80),
	created_at timestamptz not null default now(),
	updated_at timestamptz not null default now()
);

alter table public.site_admins enable row level security;
alter table public.moments enable row level security;

grant select on public.moments to anon;
grant select, insert, update, delete on public.moments to authenticated;
revoke all on public.site_admins from anon, authenticated;

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
	select exists (
		select 1 from public.site_admins where user_id = (select auth.uid())
	);
$$;

revoke all on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to authenticated;

drop policy if exists "Moments are public" on public.moments;
create policy "Moments are public"
	on public.moments for select
	to anon, authenticated
	using (true);

drop policy if exists "Admins can create moments" on public.moments;
create policy "Admins can create moments"
	on public.moments for insert
	to authenticated
	with check (
		author_id = (select auth.uid())
		and (select public.is_site_admin())
	);

drop policy if exists "Admins can update moments" on public.moments;
create policy "Admins can update moments"
	on public.moments for update
	to authenticated
	using ((select public.is_site_admin()))
	with check ((select public.is_site_admin()));

drop policy if exists "Admins can delete moments" on public.moments;
create policy "Admins can delete moments"
	on public.moments for delete
	to authenticated
	using ((select public.is_site_admin()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('moments', 'moments', true, 10485760, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
	public = excluded.public,
	file_size_limit = excluded.file_size_limit,
	allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Admins can view moment uploads" on storage.objects;
create policy "Admins can view moment uploads"
	on storage.objects for select
	to authenticated
	using (
		bucket_id = 'moments'
		and (select public.is_site_admin())
	);

drop policy if exists "Admins can upload moment images" on storage.objects;
create policy "Admins can upload moment images"
	on storage.objects for insert
	to authenticated
	with check (
		bucket_id = 'moments'
		and (select public.is_site_admin())
	);

drop policy if exists "Admins can update moment images" on storage.objects;
create policy "Admins can update moment images"
	on storage.objects for update
	to authenticated
	using (
		bucket_id = 'moments'
		and (select public.is_site_admin())
	);

drop policy if exists "Admins can delete moment images" on storage.objects;
create policy "Admins can delete moment images"
	on storage.objects for delete
	to authenticated
	using (
		bucket_id = 'moments'
		and (select public.is_site_admin())
	);

-- After creating your only Auth user in the dashboard, replace the value below
-- and run this final statement separately:
-- insert into public.site_admins (user_id) values ('YOUR_AUTH_USER_UUID');
