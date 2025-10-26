set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_user_private_details()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.users_private_details(user_id, email)
  values (new.id, new.email);
  return new;
end;
$function$
;

create trigger auth_users_insert_trigger
after insert on auth.users
for each row
execute function create_user_private_details();

create or replace view "public"."my_details" as  SELECT private_details.user_id,
    public_details.nickname,
    public_details.avatar_url,
    private_details.email,
    private_details.phone
   FROM (users_private_details private_details
     LEFT JOIN users_public_details public_details ON ((private_details.user_id = public_details.user_id)))
  WHERE (private_details.user_id = ( SELECT auth.uid() AS uid));



