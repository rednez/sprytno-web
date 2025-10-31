'use server';

import { createClient } from '@/lib/utils/supabase/server';

export async function completeProfile({
  nickname,
  avatarUrl,
}: {
  nickname: string;
  avatarUrl: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('users_public_details')
    .insert({ nickname: nickname, avatar_url: avatarUrl })
    .select();

  if (error) {
    if (error.code === '23505') {
      return {
        errors: { nickname: 'The nickname is already taken', other: null },
      };
    } else {
      return { errors: { other: error.message, nickname: null } };
    }
  }

  return { errors: null };
}
