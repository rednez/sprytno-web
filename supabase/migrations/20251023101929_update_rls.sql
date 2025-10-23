drop policy "Enable friends to view data" on "public"."users_private_details";

drop policy "Enable users to view their own data only" on "public"."users_private_details";

create policy "Enable owners and those friends to view private details"
on "public"."users_private_details"
as permissive
for select
to authenticated
using (((user_id = ( SELECT auth.uid() AS uid)) OR (EXISTS ( SELECT 1
   FROM friends f
  WHERE (f.friend_id = ( SELECT auth.uid() AS uid))))));



