set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.is_me(check_user_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE
AS $function$
    select check_user_id = auth.uid();
$function$
;


