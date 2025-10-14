'use client';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuLinkProps extends LinkProps {
  isActive: boolean;
}

const MenuLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<MenuLinkProps>(({ theme, isActive }) => ({
  color: theme.palette.common.black,
  fontWeight: 500,
  textDecoration: 'none',
  padding: theme.spacing(0.5, 1.5),
  backgroundColor: isActive ? 'rgba(149, 150, 150, 0.1)' : 'transparent',
  borderRadius: 8,
  ...theme.applyStyles('dark', {
    color: theme.palette.common.white,
    backgroundColor: isActive ? 'rgba(25, 118, 210, 0.1)' : 'transparent',
  }),
}));

export default function NavbarMenu({
  pages,
}: {
  pages: Array<{ name: string; href: string }>;
}) {
  const pathname = usePathname();

  return (
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
        <MenuLink
          key={page.name}
          href={page.href}
          isActive={pathname.includes(page.href)}
        >
          {page.name}
        </MenuLink>
      ))}
    </Box>
  );
}
