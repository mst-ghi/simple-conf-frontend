import dayjs from 'dayjs';
import { useEffect } from 'react';
import { z } from 'zod';

import { useForm, zodResolver } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import {
  IconAlertCircle,
  IconChevronRight,
  IconLetterCase,
} from '@tabler/icons-react';

import { useEventRequests } from '..';
import { CommunitySelect } from '@/features/communities';
import {
  Alert,
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Overlay,
  SegmentedControl,
  Select,
  Slider,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
  rem,
} from '@mantine/core';

type EventFormValues = {
  community_id?: string;
  title: string;
  description: string;
  duration: number;
  start_at: Date;
  mode: TEventMode;
  status: TEventStatus;
};

const EventFormSchema = z.object({
  title: z.string().min(2).max(190),
  description: z.string().min(2).max(250),
  duration: z.number().min(1).max(240),
  start_at: z.date(),
  status: z.nativeEnum({
    Pending: 'pending',
    Started: 'started',
    Finished: 'finished',
  }),
});

const EventForm = ({
  communityId,
  event,
  done,
}: {
  communityId?: string | null;
  event?: IEvent;
  done?: () => void;
}) => {
  const { loading, createEventRequest, updateEventRequest } =
    useEventRequests();

  const form = useForm<EventFormValues>({
    initialValues: {
      community_id: '',
      title: '',
      description: '',
      duration: 5,
      mode: 'public',
      status: 'pending',
      start_at: new Date(),
    },
    validate: zodResolver(EventFormSchema),
  });

  const handleSubmit = async (values: EventFormValues) => {
    let res: ICallRequestResponse | undefined;

    const data = {
      ...values,
    };

    if (event?.id) {
      delete data.community_id;
      res = await updateEventRequest(event?.id, data);
    } else {
      res = await createEventRequest(data);
    }

    if (res?.unprocessable) {
      form.setErrors(res.errors);
    }

    if (res?.success) {
      if (!event?.id) {
        form.reset();
      }

      if (done) {
        done();
      }
    }
  };

  useEffect(() => {
    if (communityId) {
      form.setFieldValue('community_id', communityId);
    }
  }, [communityId]);

  useEffect(() => {
    if (event) {
      form.setFieldValue('title', event.title);
      form.setFieldValue('description', event.description);
      form.setFieldValue('duration', event.duration);
      form.setFieldValue('start_at', dayjs(event.start_at).toDate());
      form.setFieldValue('status', event.status);
    }
  }, [event]);

  return (
    <Stack pt={event?.id ? 0 : undefined} gap="md">
      <Title order={2}>
        {event?.id ? `Update ${event.title}` : 'Create Your Own Event'}{' '}
      </Title>

      <Card>
        <Alert
          icon={<IconAlertCircle />}
          mb="sm"
          color="dark"
          title="First, find your community and select them"
        />

        <CommunitySelect
          communityId={form.values.community_id}
          onSelect={(community) =>
            form.setFieldValue('community_id', community?.id || '')
          }
        />
      </Card>

      <Card pos="relative">
        {!form.values.community_id && <Overlay blur={2} color="#ffffff" />}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Card p="xs">
            <Text size="sm" mb="xs" fw={500}>
              Duration
            </Text>
            <Flex direction="row" align="center">
              <Box style={{ display: 'flex', flex: 1 }}>
                <Slider
                  w="100%"
                  step={5}
                  min={5}
                  max={240}
                  thumbChildren={<IconChevronRight size="1.5rem" />}
                  thumbSize={22}
                  styles={{ thumb: { borderWidth: rem(2), padding: rem(3) } }}
                  {...form.getInputProps('duration')}
                />
              </Box>

              <Text ml="xs" fw={500} size="sm">
                {form.values.duration} Minute
              </Text>
            </Flex>
          </Card>

          <TextInput
            withAsterisk
            minLength={2}
            maxLength={190}
            mt={10}
            label="Title"
            placeholder="Enter event title"
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
            placeholder="Enter event description"
            leftSection={<IconLetterCase size={14} />}
            autoComplete="description"
            {...form.getInputProps('description')}
          />

          <Grid>
            <Grid.Col span={6}>
              <Select
                withAsterisk
                clearable
                mt={10}
                label="Status"
                placeholder="Select event status"
                data={[
                  { value: 'pending', label: 'Pending' },
                  { value: 'started', label: 'Started' },
                  { value: 'finished', label: 'Finished' },
                ]}
                {...form.getInputProps('status')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <DateTimePicker
                minDate={new Date()}
                hideOutsideDates
                withAsterisk
                clearable
                mt={10}
                label="Started atime"
                placeholder="Select started time"
                {...form.getInputProps('start_at')}
              />
            </Grid.Col>
          </Grid>

          <Grid mt={28}>
            <Grid.Col span={3}>
              <Center h="100%">
                <SegmentedControl
                  w="100%"
                  h={54}
                  size="lg"
                  data={[
                    { label: 'Public', value: 'public' },
                    { label: 'Private', value: 'private' },
                  ]}
                  {...form.getInputProps('mode')}
                />
              </Center>
            </Grid.Col>

            <Grid.Col span={9}>
              <Button
                type="submit"
                variant="light"
                h={54}
                size="lg"
                fullWidth
                loading={loading}
                disabled={!form.isValid()}
              >
                {event?.id ? 'Update' : 'Create'}
              </Button>
            </Grid.Col>
          </Grid>
        </form>
      </Card>
    </Stack>
  );
};

export default EventForm;
