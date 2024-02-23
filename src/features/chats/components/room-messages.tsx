import { useFetchMessages } from '../hooks';
import { Fragment } from 'react';
import { Box, Center, Loader, Text } from '@mantine/core';
import { Messages } from '.';

const RoomMessages = () => {
  const { data, isFetching, room } = useFetchMessages();

  return (
    <Box
      bg="gray.1"
      h={room.id ? 606 : 660}
      pos="relative"
      style={{
        borderRadius: 'var(--mantine-radius-md)',
        padding: 'var(--mantine-spacing-sm)',
      }}
    >
      {!room.id && (
        <Center w="100%" h="100%">
          <Text size="lg" c="gray">
            Click one of rooms
          </Text>
        </Center>
      )}

      {room.id && (
        <Fragment>
          <Messages initMessages={data?.messages} />

          {isFetching && (
            <Center pos="absolute" left={0} top={0} right={0} bottom={0}>
              <Loader />
            </Center>
          )}
        </Fragment>
      )}
    </Box>
  );
};

export default RoomMessages;
