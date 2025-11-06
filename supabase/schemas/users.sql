create or replace view my_details as
  select 
    private_details.user_id,
    public_details.nickname,
    public_details.avatar_url,
    private_details.email,
    private_details.phone,
    (public_details.nickname is not null and public_details.avatar_url is not null) as is_profile_completed
from users_private_details private_details
LEFT JOIN public.users_public_details public_details
  ON private_details.user_id = public_details.user_id
where private_details.user_id = (select auth.uid());