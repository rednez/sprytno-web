set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_participation_details(p_participation_id bigint, p_current_lat double precision DEFAULT NULL::double precision, p_current_lng double precision DEFAULT NULL::double precision)
 RETURNS TABLE(id bigint, status public.task_participation_status, updated_at timestamp with time zone, task_user_id uuid, task_user_nickname text, task_user_avatar_url text, task_type public.task_type, task_title text, task_description text, task_repeated_days public.task_day[], task_distance_meters integer, task_lat double precision, task_lng double precision)
 LANGUAGE sql
 SET search_path TO 'public'
AS $function$
select
  p.id,
  p.status,
  p.updated_at,
  t.user_id as task_user_id,
  pud.nickname as task_user_nickname,
  pud.avatar_url as task_user_avatar_url,
  t.type as task_type, 
  t.title as task_title, 
  t.description as task_description, 
  t.repeated_days as task_repeated_days,
  CASE 
    WHEN p_current_lat IS NOT NULL AND p_current_lng IS NOT NULL THEN
      round(gis.st_distance(t.location, gis.st_point(p_current_lng, p_current_lat)::gis.geography))::int
    ELSE 
      NULL 
  END AS task_distance_meters,
  gis.st_y(t.location::gis.geometry) as task_lat,
  gis.st_x(t.location::gis.geometry) as task_lng
FROM participations p
LEFT JOIN tasks t on t.id = p.task_id
LEFT JOIN users_public_details pud
  ON pud.user_id = t.user_id
WHERE p.id = p_participation_id
$function$
;


