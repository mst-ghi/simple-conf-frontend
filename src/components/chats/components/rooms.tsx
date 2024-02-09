import { RoomCard } from '.';
import { useFetchRooms } from '../hooks';
import { useSocketIO } from '@/hooks';
import { Box, Center, Loader, ScrollArea, Stack, Text } from '@mantine/core';

const Rooms = () => {
  const { data, isFetching } = useFetchRooms();
  const {
    actions: { setActiveRoomId },
  } = useSocketIO();

  return (
    <Stack gap="md" h="100%">
      {isFetching && (
        <Center w="100%" h="100%">
          <Loader />
        </Center>
      )}

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

      <ScrollArea h={500} type="always" scrollbarSize={8}>
        {data?.rooms.map((room) => {
          return (
            <Box key={room.id} onClick={() => setActiveRoomId(room.id)}>
              <RoomCard room={room} />
            </Box>
          );
        })}
      </ScrollArea>
    </Stack>
  );
};

export default Rooms;
