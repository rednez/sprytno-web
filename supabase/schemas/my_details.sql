create or replace view public.my_details with (security_invoker = on) as
 SELECT private_details.user_id,
    public_details.nickname,
    public_details.avatar_url,
    private_details.email,
    private_details.phone,
    public_details.nickname IS NOT NULL AND public_details.avatar_url IS NOT NULL AS is_profile_completed
   FROM users_private_details private_details
     LEFT JOIN users_public_details public_details ON private_details.user_id = public_details.user_id
  WHERE private_details.user_id = (( SELECT auth.uid() AS uid));