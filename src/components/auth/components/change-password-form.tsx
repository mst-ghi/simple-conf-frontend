import { Box, Button, PasswordInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconKey } from '@tabler/icons-react';
import { z } from 'zod';
import { useAuth } from '..';

type ChangePasswordFormValues = {
  current_password: string;
  new_password: string;
};

const ChangePasswordSchema = z.object({
  current_password: z.string().min(8).max(191),
  new_password: z.string().min(8).max(191),
});

const ChangePasswordForm = ({ done }: { done?: () => void }) => {
  const { loading, changePasswordRequest } = useAuth();

  const form = useForm<ChangePasswordFormValues>({
    initialValues: {
      current_password: '',
      new_password: '',
    },
    validate: zodResolver(ChangePasswordSchema),
  });

  const handleSubmit = async (values: ChangePasswordFormValues) => {
    const response = await changePasswordRequest(values);

    if (response?.unprocessable) {
      form.setErrors(response.errors);
    }

    if (response?.success && done) {
      done();
    }
  };

  return (
    <Box>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <PasswordInput
          withAsterisk
          mt={10}
          label="Current Password"
          placeholder="Current Password"
          leftSection={<IconKey size={14} />}
          autoComplete="current-password"
          {...form.getInputProps('current_password')}
        />

        <PasswordInput
          withAsterisk
          mt={10}
          label="New Password"
          placeholder="New Password"
          leftSection={<IconKey size={14} />}
          autoComplete="new-password"
          {...form.getInputProps('new_password')}
        />

        <Button
          type="submit"
          variant="light"
          mt={30}
          size="lg"
          fullWidth
          loading={loading}
          disabled={!form.isValid()}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default ChangePasswordForm;
