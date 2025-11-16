
  create policy "Enable update for task owner or participation owner only"
  on "public"."participations"
  as permissive
  for update
  to authenticated
using ((public.is_my_task(task_id) OR (user_id = ( SELECT auth.uid() AS uid))));



