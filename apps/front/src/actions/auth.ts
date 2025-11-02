'use server';

import { createClient } from '@/lib/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function login() {
  const supabase = await createClient();

  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_APP_URL}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
