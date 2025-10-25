import { logout } from '@/actions/auth';
import { SupabaseUsersRepository } from '@/lib/repositories/users';
import { createClient } from '@/lib/utils/supabase/server';
import NavbarAvatarMenu from './navbar-avatar-menu';

export default async function NavbarAvatarMenuContainer() {
  const supabase = await createClient();
  const repository = new SupabaseUsersRepository(supabase);
  const { data, ok } = await repository.getMe();

  if (!ok) {
    return <div>Err!</div>;
  }

  return (
    <NavbarAvatarMenu
      name={data.privateDetails?.fullName || ''}
      email={data.privateDetails?.email || ''}
      avatarUrl={data.publicDetails.avatarUrl || ''}
      logout={logout}
    />
  );
}
