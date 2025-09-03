'use client';

import styled from '@emotion/styled';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { MdLogout } from 'react-icons/md';

const LogoutIcon = styled(MdLogout)({
  marginRight: '12px',
});

export default function NavbarAvatarMenu({
  onLogout,
  fullName,
  email,
  avatarUrl,
}: {
  fullName: string;
  email: string;
  avatarUrl: string;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar alt="user" src={avatarUrl} />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>{fullName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={onLogout}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
