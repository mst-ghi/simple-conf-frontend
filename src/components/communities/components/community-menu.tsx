import { Fragment } from 'react';
import Link from 'next/link';
import { ActionIcon, Flex, Menu } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { openModal } from '@mantine/modals';
import { CommunityForm, useCommunityActions } from '..';
import {
  IconCalendarEvent,
  IconDotsVertical,
  IconEdit,
  IconArrowLoopRight,
  IconTrash,
  IconLayersUnion,
} from '@tabler/icons-react';

const CommunityMenu = ({
  community,
  done,
}: {
  community?: ICommunity;
  done?: () => void;
}) => {
  const pathname = usePathname();
  const { isIJoined, isIOwner } = useCommunityActions();

  if (!community) {
    return null;
  }

  return (
    <Flex direction="row" align="center" gap="md">
      {isIOwner(community.owner_id) && (
        <Fragment>
          <ActionIcon color="orange">
            <IconTrash />
          </ActionIcon>
          <ActionIcon
            color="blue"
            onClick={() => {
              openModal({
                title: `Update ${community.title}`,
                size: 'xl',
                children: <CommunityForm community={community} done={done} />,
              });
            }}
          >
            <IconEdit />
          </ActionIcon>
        </Fragment>
      )}

      <Menu
        width={148}
        shadow="sm"
        position="bottom-end"
        withArrow
        withinPortal
      >
        <Menu.Target>
          <ActionIcon color="white">
            <IconDotsVertical />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Operations</Menu.Label>
          <Menu.Divider mx="xs" />

          {!pathname.includes(community.id) && (
            <Menu.Item
              leftSection={<IconArrowLoopRight />}
              component={Link}
              href={`/communities/${community.id}`}
            >
              See Details
            </Menu.Item>
          )}

          <Menu.Item leftSection={<IconCalendarEvent />}>See Events</Menu.Item>

          <Menu.Item
            leftSection={<IconLayersUnion />}
            disabled={isIJoined(community.id) || isIOwner(community.owner_id)}
          >
            Join
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default CommunityMenu;
