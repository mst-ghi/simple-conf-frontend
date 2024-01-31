import { Box, Button, Card, Text, TextInput, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconLetterCase } from '@tabler/icons-react';
import { useEffect } from 'react';
import { z } from 'zod';
import { useCommunityRequests } from '..';

type CommunityFormValues = {
  title: string;
  description: string;
};

const CommunityFormSchema = z.object({
  title: z.string().min(2).max(190),
  description: z.string().min(2).max(250),
});

const CommunityForm = ({
  community,
  done,
}: {
  community?: ICommunity;
  done?: () => void;
}) => {
  const { loading, createCommunityRequest, updateCommunityRequest } =
    useCommunityRequests();

  const form = useForm<CommunityFormValues>({
    initialValues: {
      title: '',
      description: '',
    },
    validate: zodResolver(CommunityFormSchema),
  });

  const handleSubmit = async (values: CommunityFormValues) => {
    let res: ICallRequestResponse | undefined;

    if (community?.id) {
      res = await updateCommunityRequest(community?.id, values);
    } else {
      res = await createCommunityRequest(values);
    }

    if (res?.unprocessable) {
      form.setErrors(res.errors);
    }

    if (res?.success) {
      if (!community?.id) {
        form.reset();
      }

      if (done) {
        done();
      }
    }
  };

  useEffect(() => {
    if (community) {
      form.setFieldValue('title', community.title);
      form.setFieldValue('description', community.description);
    }
  }, [community]);

  return (
    <Card withBorder={!community?.id} pt={community?.id ? 0 : undefined}>
      {!community?.id && <Text>Create Your Own Community</Text>}

      <Box>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            withAsterisk
            minLength={2}
            maxLength={190}
            mt={10}
            label="Title"
            placeholder="Enter community title"
            leftSection={<IconLetterCase size={14} />}
            autoComplete="title"
            {...form.getInputProps('title')}
          />

          <Textarea
            minLength={2}
            maxLength={255}
            withAsterisk
            mt={10}
            label="Description"
            placeholder="Enter community description"
            leftSection={<IconLetterCase size={14} />}
            autoComplete="description"
            {...form.getInputProps('description')}
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
            {community?.id ? 'Update' : 'Create'}
          </Button>
        </form>
      </Box>
    </Card>
  );
};

export default CommunityForm;
