import { useApp, useSocketIO, useThemeStyle } from '@/hooks';
import { ActionIcon, Avatar, Flex, Menu, Text } from '@mantine/core';
import {
  IconArrowLeft,
  IconDotsVertical,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import { NewChat } from '.';
import { Fragment } from 'react';

const ChatsHeader = () => {
  const { user } = useApp();
  const { room, actions } = useSocketIO();
  const { isDesktop, isMobile } = useThemeStyle();

  if (!user) {
    return null;
  }

  return (
    <Flex direction="row" align="center" justify="space-between" gap="xs">
      {isMobile && (
        <ActionIcon
          variant="light"
          size={36}
          color="gray"
          disabled={!room.activeId}
          onClick={() => actions.setActiveRoomId()}
        >
          <IconArrowLeft size={26} stroke={3} />
        </ActionIcon>
      )}

      {isDesktop && (
        <Fragment>
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
        </Fragment>
      )}

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
