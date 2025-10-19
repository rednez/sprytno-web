create table friends (
  user_id uuid not null,
  created_at timestamp with time zone not null default now(),
  friend_id uuid not null,
  constraint friends_pkey primary key (user_id, friend_id),
  constraint friends_user_id_fkey foreign KEY (user_id) references auth.users (id),
  constraint friends_friend_id_fkey foreign KEY (friend_id) references auth.users (id),
  constraint user_cannot_be_friend_to_self check ((user_id <> friend_id))
);

ALTER TABLE friends ENABLE ROW LEVEL SECURITY;

create policy "Enable read access for authenticated users"
  on "public"."friends"
  as PERMISSIVE
  for SELECT
  to authenticated
  using (true);