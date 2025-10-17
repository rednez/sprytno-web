alter table "public"."tasks" enable row level security;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_nearby_tasks(user_lat double precision, user_lng double precision, distance_meters integer)
 RETURNS TABLE(id bigint, user_id uuid, type task_type, title text, description text, repeated_days text[], is_me boolean, distance_meters integer)
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
    )
  order by location operator(gis.<->) gis.st_point(user_lng, user_lat)::gis.geography;
$function$
;

create policy "Enable read access for authenticated users"
on "public"."tasks"
as permissive
for select
to authenticated
using (true);



