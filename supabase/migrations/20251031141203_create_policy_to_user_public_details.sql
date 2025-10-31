drop view if exists "public"."my_tasks";

create or replace view "public"."my_tasks" as  SELECT id,
    title,
    description,
    type,
    repeated_days
   FROM public.tasks
  WHERE (user_id = ( SELECT auth.uid() AS uid));



  create policy "Enable insert for users based on user_id"
  on "public"."users_public_details"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = user_id));



