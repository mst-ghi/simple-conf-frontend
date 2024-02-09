import { useSocketIO } from '@/hooks';
import { truncateText } from '@/utils';
import { Avatar, Card, Flex, Text } from '@mantine/core';

interface RoomCardProps {
  room: IRoom;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const { room: roomState } = useSocketIO();

  return (
    <Card
      p={6}
      mb={6}
      className="room-card"
      bg={roomState.activeId === room.id ? 'gray.1' : 'gray.0'}
      withBorder={false}
    >
      <Flex direction="row" align="center" gap={6}>
        <Avatar variant="white" radius="md" size={40}>
          {room.title.substring(0, 2)}
        </Avatar>

        <Flex direction="column" mr="xs" style={{ flex: 1 }}>
          <Text fz={14} fw={600}>
            {truncateText(room.title, 28)}
          </Text>
          <Text size="xs" fw={300}>
            {truncateText(room.description, 42)}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};

export default RoomCard;
