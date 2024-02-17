import { Box, Card, Flex } from '@mantine/core';
import { useSocketIO, useThemeStyle } from '@/hooks';
import { ChatsHeader, MessageForm, RoomMessages, Rooms } from '.';

const Chats = () => {
  const { isDesktop } = useThemeStyle();
  const { room } = useSocketIO();

  return (
    <Card h={isDesktop ? 740 : '100%'}>
      <Card.Section px="md" pt="md" pb="sm">
        <ChatsHeader />
      </Card.Section>

      <Flex direction="row" h="100%" gap="xs">
        {(isDesktop || !room.activeId) && (
          <Box w={isDesktop ? '30%' : '100%'} h="100%">
            <Rooms />
          </Box>
        )}

        {(isDesktop || room.activeId) && (
          <Box style={{ flex: 1 }}>
            <RoomMessages />

            {room.activeId && <MessageForm />}
          </Box>
        )}
      </Flex>
    </Card>
  );
};

export default Chats;
