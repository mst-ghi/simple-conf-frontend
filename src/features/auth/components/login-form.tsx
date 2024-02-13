import { Button, Card, Divider, PasswordInput, TextInput } from '@mantine/core';
import { IconAt, IconKey } from '@tabler/icons-react';
import Link from 'next/link';
import { useThemeStyle } from '@/hooks';
import { Logo } from '@/features/common';
import { useAuth, useLoginForm } from '..';

type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = ({
  withBorder = true,
  redirectTo = '/',
}: {
  withBorder?: boolean;
  redirectTo?: string;
}) => {
  const { isDesktop, isMobile } = useThemeStyle();
  const { loginForm } = useLoginForm();
  const { loading, loginRequest } = useAuth();

  const handleSubmit = async (values: LoginFormValues) => {
    const response = await loginRequest(values, redirectTo);
    if (response?.unprocessable) {
      loginForm.setFieldError('email', response.message);
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

      <form onSubmit={loginForm.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="Email"
          leftSection={<IconAt size={14} />}
          autoComplete="new-email"
          {...loginForm.getInputProps('email')}
        />

        <PasswordInput
          withAsterisk
          mt={10}
          label="Password"
          placeholder="Password"
          leftSection={<IconKey size={14} />}
          autoComplete="new-password"
          {...loginForm.getInputProps('password')}
        />

        <Button
          type="submit"
          variant="light"
          mt={30}
          size="lg"
          fullWidth
          loading={loading}
          disabled={!loginForm.isValid()}
        >
          Login
        </Button>
      </form>

      <Divider label="OR" labelPosition="center" my="lg" />

      <Button component={Link} href="/auth/register" variant="subtle">
        Don't have an account? Create here
      </Button>
    </Card>
  );
};

export default LoginForm;
