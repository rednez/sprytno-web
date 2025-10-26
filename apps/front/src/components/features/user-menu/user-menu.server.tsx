import { logout } from '@/actions/auth';
import { SupabaseUsersRepository } from '@/lib/repositories/users';
import { createClient } from '@/lib/utils/supabase/server';
import ClientUserMenu from './user-menu.client';

export async function ServerUserMenu() {
  const supabase = await createClient();
  const repository = new SupabaseUsersRepository(supabase);
  const { data, ok } = await repository.getMe();

  if (!ok) {
    return <div>Err</div>;
  }

  return (
    <ClientUserMenu
      nickname={data.publicDetails.nickname}
      email={data.privateDetails?.email}
      avatarUrl={data.publicDetails.avatarUrl}
      logout={logout}
    />
  );
}
