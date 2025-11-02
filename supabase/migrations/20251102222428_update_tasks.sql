create type "public"."task_day" as enum ('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');

drop function if exists "public"."get_nearby_tasks";
drop function if exists "public"."get_task_details";
drop function if exists "public"."get_my_task_details";

drop view if exists "public"."my_tasks";

alter table "public"."tasks" alter column "repeated_days" set data type public.task_day[] using "repeated_days"::public.task_day[];

alter table "public"."tasks" add constraint "tasks_description_check" CHECK ((length(description) < 1000)) not valid;

alter table "public"."tasks" validate constraint "tasks_description_check";

alter table "public"."tasks" add constraint "tasks_title_check" CHECK ((length(title) < 200)) not valid;

alter table "public"."tasks" validate constraint "tasks_title_check";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_my_task_details(task_id bigint)
 RETURNS TABLE(id bigint, user_id uuid, user_nickname text, user_avatar_url text, type public.task_type, title text, description text, repeated_days public.task_day[], lat double precision, lng double precision)
 LANGUAGE sql
 SET search_path TO ''
AS $function$
select
  t.id, 
  t.user_id,
  public_details.nickname,
  public_details.avatar_url,
  t.type, 
  t.title, 
  t.description, 
  t.repeated_days, 
  gis.st_y(t.location::gis.geometry) as lat,
  gis.st_x(t.location::gis.geometry) as lng
FROM public.tasks t
LEFT JOIN public.users_public_details public_details
  ON public_details.user_id = t.user_id
WHERE t.id = task_id
$function$
;

CREATE OR REPLACE FUNCTION public.get_nearby_tasks(user_lat double precision, user_lng double precision, distance_meters integer)
 RETURNS TABLE(id bigint, user_id uuid, type public.task_type, title text, description text, repeated_days public.task_day[], is_me boolean, distance_meters integer)
 LANGUAGE sql
 SET search_path TO ''
AS $function$
select
  id,
  user_id,
  type,
  title,
  description,
  repeated_days,
  public.is_me(tasks.user_id) as is_me,
  round(gis.st_distance(public.tasks.location, gis.st_point(user_lng, user_lat)::gis.geography))::int as distance_meters
from
  public.tasks
  where gis.ST_DWithin(
        location,
        gis.ST_SetSRID(gis.ST_MakePoint(user_lng, user_lat), 4326)::gis.geography,
        distance_meters
    ) AND user_id <> (SELECT auth.uid())
  order by location operator(gis.<->) gis.st_point(user_lng, user_lat)::gis.geography;
$function$
;

CREATE OR REPLACE FUNCTION public.get_task_details(task_id bigint, current_lat double precision DEFAULT NULL::double precision, current_lng double precision DEFAULT NULL::double precision)
 RETURNS TABLE(id bigint, user_id uuid, user_nickname text, user_avatar_url text, type public.task_type, title text, description text, repeated_days public.task_day[], is_me boolean, distance_meters integer, lat double precision, lng double precision)
 LANGUAGE sql
 SET search_path TO ''
AS $function$
select
  t.id, 
  t.user_id,
  public_details.nickname,
  public_details.avatar_url,
  t.type, 
  t.title, 
  t.description, 
  t.repeated_days, 
  public.is_me(t.user_id) as is_me,
  CASE 
    WHEN current_lat IS NOT NULL AND current_lng IS NOT NULL THEN
      round(gis.st_distance(t.location, gis.st_point(current_lng, current_lat)::gis.geography))::int
    ELSE 
      NULL 
  END AS distance_meters,
  gis.st_y(t.location::gis.geometry) as lat,
  gis.st_x(t.location::gis.geometry) as lng
FROM public.tasks t
LEFT JOIN public.users_public_details public_details
  ON public_details.user_id = t.user_id
WHERE t.id = task_id
$function$
;

create or replace view "public"."my_tasks" as  SELECT id,
    title,
    description,
    type,
    repeated_days
   FROM public.tasks
  WHERE (user_id = ( SELECT auth.uid() AS uid));



  create policy "Enable insert for users based on user_id"
  on "public"."tasks"
  as permissive
  for insert
  to public
with check ((( SELECT auth.uid() AS uid) = user_id));



