'use client';

import { login } from '@/actions/auth';
import SprytnoLogo from '@/components/ui/sprytno-logo';
import styled from '@emotion/styled';
import { Button } from '@heroui/react';
import { useTransition } from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleIcon = styled(FcGoogle)({
  fontSize: '22px',
});

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();

  const handleLogin = () => {
    startTransition(async () => {
      await login();
    });
  };

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <SprytnoLogo />

      <div className="mt-4 mb-1 text-xl text-gray-500">Signin to the App</div>

      <Button
        size="lg"
        variant="bordered"
        color="primary"
        onPress={handleLogin}
      >
        <GoogleIcon />
        {isPending ? 'Signing in...' : 'Signin with Google'}
      </Button>
    </div>
  );
}
