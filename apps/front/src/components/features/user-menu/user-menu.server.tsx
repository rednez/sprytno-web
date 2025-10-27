import { logout } from '@/actions/auth';
import { createUsersRepository } from '@/lib/repositories/users';
import ClientUserMenu from './user-menu.client';

export async function ServerUserMenu() {
  const repository = await createUsersRepository();
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
