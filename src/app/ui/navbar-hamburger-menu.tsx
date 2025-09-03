'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

const drawerWidth = 240;

export default function NavbarHamburgerMenu({ pages }: { pages: string[] }) {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen((prevState) => !prevState);
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
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        sx={{ mr: 2, display: { sm: 'none' } }}
        onClick={handleDrawerToggle}
      >
        <FiMenu />
      </IconButton>

      <Drawer
        variant="temporary"
        open={open}
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
    </>
  );
}
