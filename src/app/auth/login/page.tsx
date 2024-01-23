'use client';

import { LoginForm } from '@/components/auth';
import { Center } from '@mantine/core';

const LoginPage = () => {
  return (
    <Center h="calc(90vh - 60px)">
      <LoginForm />
    </Center>
  );
};

export default LoginPage;
