import { Card, Flex, ScrollArea } from '@mantine/core';
import { ConferenceUserCard } from '.';

interface ConferenceSidebarProps {
  mode?: 'users' | 'chat';
}

const ConferenceSidebar = ({ mode }: ConferenceSidebarProps) => {
  return (
    <Card
      bg="gray.1"
      withBorder={false}
      h="85vh"
      pos="relative"
      px="sm"
      pt="xs"
      pb={4}
    >
      <ScrollArea
        h="87vh"
        type="always"
        scrollbarSize={10}
        styles={{
          viewport: {
            paddingBottom: 10,
            paddingTop: 2,
          },
        }}
      >
        <Flex direction="column" align="center" justify="flex-start" gap="xs">
          <ConferenceUserCard name="Mostafa" />
          <ConferenceUserCard name="Mostafa" />
          <ConferenceUserCard name="Mostafa" />
          <ConferenceUserCard name="Mostafa" />
          <ConferenceUserCard name="Mostafa" />
          <ConferenceUserCard name="Mostafa" />
          <ConferenceUserCard name="Mostafa" />
        </Flex>
      </ScrollArea>
    </Card>
  );
};

export default ConferenceSidebar;
