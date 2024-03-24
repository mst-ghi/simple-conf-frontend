import { Button, Card, Flex, Text, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';

import { useThemeStyle } from '@/hooks';
import Link from 'next/link';

import { EventTimer, useEventStatus } from '..';
import {
  IconArrowRight,
  IconClockCheck,
  IconClockUp,
  IconClockX,
} from '@tabler/icons-react';

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
    icon: <IconClockX size={24} color="orange" />,
    color: 'orange',
  },
};

const EventCard = ({ event }: { event?: IEvent }) => {
  const { isDesktop } = useThemeStyle();
  const [eventData, setEventData] = useState<IEvent>();

  const { isStarted, isFinished } = useEventStatus({ event: eventData });

  const status = useMemo(() => {
    if (!eventData) {
      return EventStatus.pending;
    }

    if (isFinished) {
      return EventStatus.finished;
    }

    return EventStatus[eventData.status];
  }, [eventData, isFinished]);

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
            <Text c={status.color} fw={500}>
              {isStarted ? 'Started' : isFinished ? 'Finished' : 'Pending'}
            </Text>
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
