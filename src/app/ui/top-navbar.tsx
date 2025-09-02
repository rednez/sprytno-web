'use client';

import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { ReactElement, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { MdLogout } from 'react-icons/md';
import SprytnoLogo from './sprytno-logo';

const drawerWidth = 240;

function HideOnScroll({ children }: { children: ReactElement<unknown> }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children ?? <div />}
    </Slide>
  );
}

const LogoutIcon = styled(MdLogout)({
  marginRight: '12px',
});

export default function TopNavbar({ onLogout }: { onLogout: () => void }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const pages = ['Home', 'My Tasks', 'Notifications'];
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }} onClick={handleDrawerToggle}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          gap: 1,
        }}
      >
        {pages.map((page) => (
          <Button
            key={page}
            sx={{
              display: 'block',
              borderRadius: 4,
              fontSize: '1rem',
              textTransform: 'none',
            }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar
          component="nav"
          color="default"
          elevation={0}
          sx={{ backgroundColor: 'white' }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
                onClick={handleDrawerToggle}
              >
                <FiMenu />
              </IconButton>

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
                  <Button
                    key={page}
                    sx={{
                      display: 'block',
                      borderRadius: 4,
                      fontSize: '1rem',
                      textTransform: 'none',
                    }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <IconButton onClick={handleClick}>
                  <Avatar alt="user" src="https://i.pravatar.cc/64?img=66" />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={onLogout}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
