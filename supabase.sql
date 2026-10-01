-- Run this once in Supabase: SQL Editor > New query > paste > Run.
create table if not exists public.movie_list (
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  movie_id integer not null,
  title text not null,
  poster_path text,
  year integer,
  status text not null check (status in ('watchlist','watched')),
  rating integer not null default 0 check (rating between 0 and 5),
  updated_at timestamptz not null default now(),
  primary key (user_id, movie_id)
);

alter table public.movie_list enable row level security;

create policy "read own list"   on public.movie_list for select using (auth.uid() = user_id);
create policy "add to own list" on public.movie_list for insert with check (auth.uid() = user_id);
create policy "edit own list"   on public.movie_list for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own list" on public.movie_list for delete using (auth.uid() = user_id);
