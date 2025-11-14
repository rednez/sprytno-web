create or replace function get_nearby_tasks (
  user_lat double precision,
  user_lng double precision,
  distance_meters int
) returns table (
  id public.tasks.id % type,
  user_id public.tasks.user_id % type,
  type public.tasks.type % type,
  title public.tasks.title % type,
  description public.tasks.description % type,
  repeated_days public.tasks.repeated_days % type,
  is_me boolean,
  distance_meters int
)
set search_path = '' language sql as $$
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
$$;

create or replace function get_task_details (
  input_task_id bigint,
  current_lat double precision DEFAULT NULL,
  current_lng double precision DEFAULT NULL
) returns table (
  id public.tasks.id%type,
  user_id public.tasks.user_id%type,
  user_nickname public.users_public_details.nickname%type,
  user_avatar_url public.users_public_details.avatar_url%type,
  type public.tasks.type%type,
  title public.tasks.title%type,
  description public.tasks.description%type,
  repeated_days public.tasks.repeated_days%type,
  is_me boolean,
  distance_meters integer,
  lat double precision,
  lng double precision,
  participation_status public.participations.status%type,
  participation_updated_at public.participations.updated_at%type
)
language sql
set search_path = '' 
as $$
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
  gis.st_x(t.location::gis.geometry) as lng,
  prtcs.status as participation_status,
  prtcs.updated_at as participation_updated_at
FROM public.tasks t
LEFT JOIN public.users_public_details public_details
  ON public_details.user_id = t.user_id
LEFT JOIN public.participations prtcs
  ON prtcs.task_id = t.id
WHERE t.id = input_task_id
$$;

create or replace function get_my_task_details (input_task_id bigint) returns table (
  id public.tasks.id%type,
  user_id public.tasks.user_id%type,
  user_nickname public.users_public_details.nickname%type,
  user_avatar_url public.users_public_details.avatar_url%type,
  type public.tasks.type%type,
  title public.tasks.title%type,
  description public.tasks.description%type,
  repeated_days public.tasks.repeated_days%type,
  lat double precision,
  lng double precision
)
language sql
set search_path = '' 
as $$
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
WHERE t.id = input_task_id
$$;

create or replace function get_my_task_participations (p_task_id bigint) returns table (
  id participations.id % type,
  status participations.status % type,
  updated_at participations.updated_at % type,
  user_nickname users_public_details.nickname % type,
  user_avatar_url users_public_details.avatar_url % type
) language sql
set
  search_path = public as $$
select
  p.id,
  p.status,
  p.updated_at,
  upd.nickname as user_nickname,
  upd.avatar_url as user_avatar_url
from
  participations p
  join users_public_details upd on upd.user_id = p.user_id
where
  p.task_id = p_task_id;
$$;

