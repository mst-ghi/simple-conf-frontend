import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const useLoginForm = () => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(191),
  });

  const loginForm = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: zodResolver(schema),
  });

  return { loginForm };
};

export default useLoginForm;
