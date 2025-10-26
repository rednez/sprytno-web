drop function if exists "public"."get_task_details"(task_id integer, current_lat double precision, current_lng double precision);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_my_task_details(task_id bigint)
 RETURNS TABLE(id bigint, user_id uuid, user_nickname text, user_avatar_url text, type task_type, title text, description text, repeated_days text[], lat double precision, lng double precision)
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
  gis.st_y(t.location::gis.geometry) as lng
FROM public.tasks t
LEFT JOIN public.users_public_details public_details
  ON public_details.user_id = t.user_id
WHERE t.id = task_id
$function$
;

CREATE OR REPLACE FUNCTION public.get_task_details(task_id bigint, current_lat double precision DEFAULT NULL::double precision, current_lng double precision DEFAULT NULL::double precision)
 RETURNS TABLE(id bigint, user_id uuid, user_nickname text, user_avatar_url text, type task_type, title text, description text, repeated_days text[], is_me boolean, distance_meters integer, lat double precision, lng double precision)
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
  gis.st_y(t.location::gis.geometry) as lng
FROM public.tasks t
LEFT JOIN public.users_public_details public_details
  ON public_details.user_id = t.user_id
WHERE t.id = task_id
$function$
;


