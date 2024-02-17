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

      <ScrollArea h={500} type="always" scrollbarSize={8}>
        {data?.rooms.map((room) => {
          return (
            <Box key={room.id} onClick={() => setActiveRoomId(room.id)}>
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
    </Stack>
  );
};

export default Rooms;
