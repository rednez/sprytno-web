import { createClient } from '@/utils/supabase/server';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import { logout } from '../../actions';
import SprytnoLogo from '../sprytno-logo';
import NavbarAvatarMenu from './navbar-avatar-menu';
import NavbarHamburgerMenu from './navbar-hamburger-menu';
import NavbarMenu from './navbar-menu';

const pages = [
  { name: 'Overview', href: '/overview' },
  { name: 'My Tasks', href: '/my-tasks' },
  { name: 'Notifications', href: '/notifications' },
];

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const email = user.user_metadata['email'] as string;
  const fullName = user.user_metadata['full_name'] as string;
  const avatarUrl = user.user_metadata['avatar_url'] as string;

  return (
    <>
      <AppBar
        component="nav"
        color="default"
        elevation={0}
        sx={{ backgroundColor: 'white' }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <NavbarHamburgerMenu pages={pages.map((page) => page.name)} />

            <SprytnoLogo />

            <NavbarMenu pages={pages} />

            <NavbarAvatarMenu
              fullName={fullName}
              avatarUrl={avatarUrl}
              email={email}
              onLogout={logout}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
