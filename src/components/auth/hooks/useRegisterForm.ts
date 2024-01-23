import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const useRegisterForm = () => {
  const schema = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(191),
    password: z.string().min(8).max(191),
  });

  const registerForm = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    validate: zodResolver(schema),
  });

  return { registerForm };
};

export default useRegisterForm;
