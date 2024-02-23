import { NewChat, RoomCard } from '.';
import { useFetchRooms } from '../hooks';
import { useApp, useSocketIO } from '@/hooks';
import { Box, Center, Loader, ScrollArea, Stack, Text } from '@mantine/core';

const Rooms = () => {
  const { user } = useApp();
  const { data, isFetching } = useFetchRooms();
  const {
    actions: { roomClick },
  } = useSocketIO();

  return (
    <Stack gap="md" h="100%" pos="relative">
      {!isFetching && (!data?.rooms || !data.rooms[0]) && (
        <Center w="100%">
          <Text
            size="xs"
            fw={500}
            c="dimmed"
            p="lg"
            style={{ textAlign: 'center' }}
          >
            No chat room exists; please start a new one.
          </Text>
        </Center>
      )}

      <ScrollArea h={500} type="auto" scrollbarSize={8}>
        {data?.rooms.map((room) => {
          return (
            <Box
              key={room.id}
              onClick={() => {
                let userArg = undefined;

                if (room.mode === 'private') {
                  userArg = room.users?.find((el) => el.id !== user?.id);
                }

                roomClick({
                  room: {
                    id: room.id,
                    mode: room.mode,
                  },
                  call: {
                    user: userArg,
                  },
                });
              }}
            >
              <RoomCard room={room} />
            </Box>
          );
        })}
      </ScrollArea>

      {isFetching && (
        <Center pos="absolute" left={0} top={0} right={0} bottom={0}>
          <Loader />
        </Center>
      )}

      <Box pos="absolute" bottom={10} left={0}>
        <NewChat />
      </Box>
    </Stack>
  );
};

export default Rooms;
