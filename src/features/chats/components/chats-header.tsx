import { Fragment } from 'react';
import { CallButton } from '@/features/call';
import { useApp, useSocketIO, useThemeStyle } from '@/hooks';
import { ActionIcon, Avatar, Flex, Text } from '@mantine/core';
import { IconArrowLeft, IconX } from '@tabler/icons-react';

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
          disabled={!room.id}
          onClick={() => actions.setRoom({})}
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

      {room.id && (
        <Flex direction="row" align="center" gap="sm">
          <CallButton
            actionIconProps={{ variant: 'light', size: 36, color: 'green' }}
            iconProps={{ size: 26, stroke: 3 }}
          />

          <ActionIcon
            variant="light"
            size={36}
            color="orange"
            onClick={() => actions.setRoom({})}
          >
            <IconX size={26} stroke={3} />
          </ActionIcon>
        </Flex>
      )}
    </Flex>
  );
};

export default ChatsHeader;
