import { logout } from '@/actions/auth';
import { SupabaseUsersRepository } from '@/lib/repositories/users';
import { createClient } from '@/lib/utils/supabase/server';
import NavbarAvatarMenu from './navbar-avatar-menu';

export default async function NavbarAvatarMenuContainer() {
  const supabase = await createClient();
  const repository = new SupabaseUsersRepository(supabase);
  const user = await repository.getMe();

  return (
    <NavbarAvatarMenu
      name={user.privateDetails?.fullName || ''}
      email={user.privateDetails?.email || ''}
      avatarUrl={user.publicDetails.avatarUrl || ''}
      logout={logout}
    />
  );
}
