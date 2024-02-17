import { useApp, useSocketIO } from '@/hooks';
import { Events, truncateText } from '@/utils';
import { Avatar, Card, Flex, Indicator, Text } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';

interface RoomCardProps {
  room: IRoom;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const { user } = useApp();
  const { room: roomState, socket } = useSocketIO();
  const [active, setActive] = useState(false);

  const { title, description } = useMemo(() => {
    if (room.mode === 'private') {
      const displayUser = room.users?.find((el) => el.id !== user?.id);

      if (displayUser) {
        return {
          title: displayUser.name,
          description: displayUser.email,
        };
      }
    }

    return {
      title: room.title,
      description: room.description,
    };
  }, [room]);

  useEffect(() => {
    socket.on(Events.message.new, (res: ISocketData<{ message: IMessage }>) => {
      const message = res.data.message;

      if (message) {
        if (
          message.room_id === room.id &&
          message.user_id !== user?.id &&
          roomState.activeId !== room.id
        ) {
          setActive(true);
        }
      }
    });
  }, []);

  return (
    <Indicator position="middle-start" disabled={!active} processing>
      <Card
        p={6}
        mb={6}
        pos="relative"
        className="room-card"
        bg={roomState.activeId === room.id ? 'gray.1' : 'gray.0'}
        withBorder={false}
        onClick={() => setActive(false)}
      >
        <Flex direction="row" align="center" gap={6}>
          <Avatar variant="white" radius="md" size={40}>
            {title.substring(0, 2)}
          </Avatar>

          <Flex direction="column" mr="xs" style={{ flex: 1 }}>
            <Text fz={14} fw={600}>
              {truncateText(title, 28)}
            </Text>
            <Text size="xs" fw={300}>
              {truncateText(description, 42)}
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Indicator>
  );
};

export default RoomCard;
