create or replace view "public"."my_tasks" as  SELECT id,
    title,
    description,
    type,
    repeated_days
   FROM tasks
  WHERE (user_id = ( SELECT auth.uid() AS uid));



