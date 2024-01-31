import { Card, Flex, ScrollArea } from '@mantine/core';
import { ConfUserCard } from '.';

interface ConfSidebarProps {
  mode?: 'users' | 'chat';
}

const ConfSidebar = ({ mode }: ConfSidebarProps) => {
  return (
    <Card
      bg="gray.1"
      withBorder={false}
      h="87vh"
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
          <ConfUserCard name="Mostafa" />
          <ConfUserCard name="Mostafa" />
          <ConfUserCard name="Mostafa" />
          <ConfUserCard name="Mostafa" />
          <ConfUserCard name="Mostafa" />
          <ConfUserCard name="Mostafa" />
          <ConfUserCard name="Mostafa" />
        </Flex>
      </ScrollArea>
    </Card>
  );
};

export default ConfSidebar;
