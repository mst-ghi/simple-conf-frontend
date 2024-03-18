import { Button, Card, Flex, Text, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { EventOverAlert, EventStartAlert, EventTimer } from '..';
import {
  IconArrowRight,
  IconClockCheck,
  IconClockUp,
  IconClockX,
} from '@tabler/icons-react';
import { useThemeStyle } from '@/hooks';
import { addTimeTo, isDateAfter, isDateBefore } from '@/utils';
import Link from 'next/link';

const EventStatus = {
  pending: {
    icon: <IconClockUp size={24} color="white" />,
    color: 'white',
  },
  started: {
    icon: <IconClockCheck size={24} color="green" />,
    color: 'green',
  },
  finished: {
    icon: <IconClockX size={24} color="red" />,
    color: 'red',
  },
};

const EventCard = ({ event }: { event?: IEvent }) => {
  const { isDesktop } = useThemeStyle();
  const [eventData, setEventData] = useState<IEvent>();

  const joinable = useMemo(() => {
    if (!eventData) return false;
    return isDateAfter(eventData.start_at) && eventData.status === 'started';
  }, [eventData]);

  const status = useMemo(() => {
    if (!eventData) {
      return EventStatus.pending;
    }

    if (
      isDateBefore(addTimeTo(eventData.start_at, eventData.duration, 'minute'))
    ) {
      return EventStatus.finished;
    }

    return EventStatus[eventData.status];
  }, [eventData]);

  useEffect(() => {
    if (event) {
      setEventData(event);
    }
  }, [event]);

  if (!event || !eventData) {
    return null;
  }

  return (
    <Card shadow="md">
      <Card.Section h={54} bg="dark" mb="sm">
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          h="100%"
          px="md"
        >
          <Flex direction="row" align="center" gap={4}>
            {status.icon}
          </Flex>

          <Button
            component={Link}
            href={`/events/${eventData.id}`}
            variant="filled"
            rightSection={<IconArrowRight />}
          >
            See Details
          </Button>
        </Flex>
      </Card.Section>

      <EventOverAlert enable={eventData.status === 'finished'} />
      <EventStartAlert enable={joinable} />

      <Flex direction={isDesktop ? 'row' : 'column-reverse'} gap="md">
        <Flex direction="column" mt={6} style={{ flex: 1 }}>
          {eventData.community?.owner?.name && (
            <Text c="gray" tt="capitalize" size="sm" mb={4} mt={-10}>
              {eventData.community?.owner?.name}
            </Text>
          )}

          <Title order={3} tt="capitalize">
            {eventData.title}
          </Title>

          <Text>{eventData.description}</Text>
        </Flex>

        <EventTimer
          startDate={new Date(eventData.start_at)}
          duration={eventData.duration}
        />
      </Flex>
    </Card>
  );
};

export default EventCard;
