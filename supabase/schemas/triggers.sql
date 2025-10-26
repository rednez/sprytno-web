create function create_user_private_details()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users_private_details(user_id, email)
  values (new.id, new.email);
  return new;
end;
$$;

create trigger auth_users_insert_trigger
after insert on auth.users
for each row
execute function create_user_private_details();