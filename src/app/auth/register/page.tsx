'use client';

import { RegisterForm } from '@/features/auth';
import { Center } from '@mantine/core';

const RegisterPage = () => {
  return (
    <Center h="calc(90vh - 60px)">
      <RegisterForm />
    </Center>
  );
};

export default RegisterPage;
