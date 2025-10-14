'use client';

import { login } from '@/actions/auth';
import SprytnoLogo from '@/components/ui/sprytno-logo';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTransition } from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleIcon = styled(FcGoogle)({
  marginRight: '12px',
  fontSize: '20px',
});

const GoogleButton = styled(Button)({
  textTransform: 'none',
  borderRadius: 8,
});

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    startTransition(async () => {
      await login();
    });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <SprytnoLogo />

        <Typography marginTop={4} marginBottom={1} variant="h5">
          Signin to the App
        </Typography>

        <GoogleButton
          variant="outlined"
          loading={isPending}
          size="large"
          onClick={handleLogin}
        >
          <GoogleIcon />
          {isPending ? 'Signing in...' : 'Signin with Google'}
        </GoogleButton>
      </Box>
    </Container>
  );
}
