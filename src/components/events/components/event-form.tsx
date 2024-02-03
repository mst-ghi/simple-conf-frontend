import { useForm, zodResolver } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import { IconChevronRight, IconLetterCase } from '@tabler/icons-react';
import { useEffect } from 'react';
import { z } from 'zod';
import { useEventRequests } from '..';
import dayjs from 'dayjs';
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Select,
  Slider,
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
      duration: 1,
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
    <Card withBorder={!event?.id} pt={event?.id ? 0 : undefined}>
      {!event?.id && <Title order={2}>Create Your Own Event</Title>}

      <Box>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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

          <Card mt={14}>
            <Text size="sm" fw={500}>
              Duration
            </Text>
            <Flex direction="row" align="center">
              <Box style={{ display: 'flex', flex: 1 }}>
                <Slider
                  w="100%"
                  step={1}
                  min={1}
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

          <Button
            type="submit"
            variant="light"
            mt={30}
            size="lg"
            fullWidth
            loading={loading}
            disabled={!form.isValid()}
          >
            {event?.id ? 'Update' : 'Create'}
          </Button>
        </form>
      </Box>
    </Card>
  );
};

export default EventForm;
