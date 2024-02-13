import { Card, Center, Flex, Text } from '@mantine/core';
import { EventCard } from '.';

const EventsGroup = ({ events }: { events?: IEvent[] }) => {
  if (!events) {
    return (
      <Card>
        <Center w="100%" h={136}>
          <Text size="lg" c="dimmed">
            There are no active events
          </Text>
        </Center>
      </Card>
    );
  }

  return (
    <Flex direction="column" gap="lg">
      {events.map((event) => {
        return <EventCard key={`event-${event.id}`} event={event} />;
      })}
    </Flex>
  );
};

export default EventsGroup;
