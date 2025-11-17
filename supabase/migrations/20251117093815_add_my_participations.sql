create or replace view "public"."my_participations" with (security_invoker = on) as  SELECT p.id,
    p.status,
    t.title AS task_title,
    t.description AS task_description,
    t.type AS task_type,
    t.repeated_days AS task_repeated_days
   FROM (public.participations p
     JOIN public.tasks t ON ((t.id = p.task_id)))
  WHERE (p.user_id = ( SELECT auth.uid() AS uid));



