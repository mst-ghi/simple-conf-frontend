import { IconAt, IconKey, IconLetterCase } from '@tabler/icons-react';
import { Button, Card, Divider, PasswordInput, TextInput } from '@mantine/core';
import Link from 'next/link';
import { useThemeStyle } from '@/hooks';
import { Logo } from '@/features/common';
import { useAuth, useRegisterForm } from '..';

type RegisterFormValues = {
  email: string;
  name: string;
  password: string;
};

const RegisterForm = ({
  withBorder = true,
  redirectTo = '/auth/login',
}: {
  withBorder?: boolean;
  redirectTo?: string;
}) => {
  const { isDesktop, isMobile } = useThemeStyle();
  const { registerForm } = useRegisterForm();
  const { loading, registerRequest } = useAuth();

  const handleSubmit = async (values: RegisterFormValues) => {
    const response = await registerRequest(values, redirectTo);
    if (response?.unprocessable) {
      registerForm.setErrors(response.errors);
    }
  };

  return (
    <Card
      p={isDesktop ? 30 : 20}
      w={isMobile ? '100%' : 480}
      radius="md"
      withBorder={withBorder}
    >
      <Card.Section mb="md">
        <Logo />
      </Card.Section>

      <form onSubmit={registerForm.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Email"
          leftSection={<IconAt size={14} />}
          autoComplete="new-email"
          {...registerForm.getInputProps('email')}
        />

        <TextInput
          withAsterisk
          mt={10}
          label="Name"
          placeholder="name"
          leftSection={<IconLetterCase size={14} />}
          autoComplete="new-name"
          {...registerForm.getInputProps('name')}
        />

        <PasswordInput
          withAsterisk
          mt={10}
          label="Password"
          placeholder="Password"
          leftSection={<IconKey size={14} />}
          autoComplete="new-password"
          {...registerForm.getInputProps('password')}
        />

        <Button
          type="submit"
          variant="light"
          mt={30}
          size="lg"
          fullWidth
          loading={loading}
          disabled={!registerForm.isValid()}
        >
          Register
        </Button>
      </form>

      <Divider label="OR" labelPosition="center" my="lg" />

      <Button component={Link} href="/auth/login" variant="subtle">
        Go to login form
      </Button>
    </Card>
  );
};

export default RegisterForm;
