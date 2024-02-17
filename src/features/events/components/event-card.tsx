import { Card, Flex, Text, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { EventMenu, EventTimer, useFetchEvent } from '..';
import { dateView } from '@/utils';
import { IconClockCheck, IconClockUp, IconClockX } from '@tabler/icons-react';
import { closeAllModals } from '@mantine/modals';
import { useThemeStyle } from '@/hooks';

const EventStatus = {
  pending: <IconClockUp size={24} color="white" />,
  started: <IconClockCheck size={24} color="green" />,
  finished: <IconClockX size={24} color="red" />,
};

const EventCard = ({ event }: { event?: IEvent }) => {
  const { isDesktop } = useThemeStyle();
  const [eventData, setEventData] = useState<IEvent>();

  const { data, refetch } = useFetchEvent(eventData?.id, {
    enabled: false,
  });

  const onFormDoneAction = () => {
    closeAllModals();
    refetch();
  };

  useEffect(() => {
    if (event) {
      setEventData(event);
    }
  }, [event]);

  useEffect(() => {
    if (data?.event) {
      setEventData(data.event);
    }
  }, [data]);

  if (!event || !eventData) {
    return null;
  }

  return (
    <Card shadow="md">
      <Card.Section h={36} bg="dark" mb="sm">
        <Flex
          direction="row"
          align="center"
          justify="space-between"
          h="100%"
          px="md"
        >
          <Flex direction="row" align="center" gap={4}>
            {EventStatus[event.status]}

            <Text c="white">{dateView(eventData.start_at)}</Text>
          </Flex>

          <EventMenu event={eventData} done={onFormDoneAction} />
        </Flex>
      </Card.Section>

      <Flex direction={isDesktop ? 'row' : 'column-reverse'} gap="md">
        <EventTimer
          startDate={new Date(eventData.start_at)}
          duration={eventData.duration}
        />

        <Flex direction="column" mt={6} style={{ flex: 1 }}>
          {eventData.community?.owner?.name && (
            <Text c="gray" tt="capitalize" size="sm" mb={4}>
              {eventData.community?.owner?.name}
            </Text>
          )}

          <Title order={3} tt="capitalize">
            {eventData.title}
          </Title>

          <Text>{eventData.description}</Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default EventCard;
