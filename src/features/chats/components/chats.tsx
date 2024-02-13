import { Box, Card, Flex } from '@mantine/core';
import { useSocketIO } from '@/hooks';
import { ChatsHeader, MessageForm, RoomMessages, Rooms } from '.';

const Chats = () => {
  const { room } = useSocketIO();

  return (
    <Card h={740}>
      <Card.Section px="md" pt="md" pb="sm">
        <ChatsHeader />
      </Card.Section>

      <Flex direction="row" h="100%" gap="xs">
        <Box w="30%" h="100%">
          <Rooms />
        </Box>

        <Box style={{ flex: 1 }}>
          <RoomMessages />

          {room.activeId && <MessageForm />}
        </Box>
      </Flex>
    </Card>
  );
};

export default Chats;
