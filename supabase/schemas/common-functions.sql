create or replace function is_me(check_user_id uuid)
returns boolean
  language sql
  stable
as $$
    select check_user_id = auth.uid();
$$;