import { createClient } from '@/utils/supabase/server';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { logout } from '../actions';
import NavbarAvatarMenu from './navbar-avatar-menu';
import NavbarHamburgerMenu from './navbar-hamburger-menu';
import SprytnoLogo from './sprytno-logo';

const pages = [
  { name: 'Home', href: '/' },
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

            <Box
              sx={{
                flexGrow: 1,
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
                justifyContent: 'center',
                gap: 1,
              }}
            >
              {pages.map((page) => (
                <Link key={page.name} href={page.href}>
                  <Button
                    sx={{
                      borderRadius: 4,
                      fontSize: '1rem',
                      textTransform: 'none',
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <NavbarAvatarMenu
                fullName={fullName}
                avatarUrl={avatarUrl}
                email={email}
                onLogout={logout}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
