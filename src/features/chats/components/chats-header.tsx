import { useApp, useSocketIO } from '@/hooks';
import { ActionIcon, Avatar, Flex, Menu, Text } from '@mantine/core';
import { IconDotsVertical, IconPlus, IconX } from '@tabler/icons-react';
import { NewChat } from '.';

const ChatsHeader = () => {
  const { user } = useApp();
  const { room, actions } = useSocketIO();

  if (!user) {
    return null;
  }

  return (
    <Flex direction="row" align="center" justify="space-between" gap="xs">
      <Avatar
        size="md"
        alt={user.name}
        radius="md"
        color="blue"
        src="/user.png"
      />

      <Flex direction="column" style={{ flex: 1 }}>
        <Text size="sm" fw={600}>
          {user.name}
        </Text>
        <Text size="xs" fw={400}>
          {user.email}
        </Text>
      </Flex>

      <Flex direction="row" align="center" gap="sm">
        <NewChat />

        <Menu position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="light" size={36} color="gray">
              <IconDotsVertical size={26} stroke={3} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconX size={20} />}
              color="orange"
              disabled={!room.activeId}
              onClick={() => actions.setActiveRoomId(undefined)}
            >
              <Text size="xs" fw={500}>
                Close active room
              </Text>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default ChatsHeader;
