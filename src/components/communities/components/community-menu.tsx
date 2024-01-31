import Link from 'next/link';
import { ActionIcon, Menu } from '@mantine/core';
import {
  IconCalendarEvent,
  IconDotsVertical,
  IconEdit,
  IconArrowLoopRight,
  IconTrash,
  IconLayersUnion,
} from '@tabler/icons-react';
import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { CommunityForm, useCommunityActions } from '..';
import { closeAllModals, openModal } from '@mantine/modals';

const CommunityMenu = ({ community }: { community?: ICommunity }) => {
  const pathname = usePathname();
  const { isIJoined, isIOwner } = useCommunityActions();

  if (!community) {
    return null;
  }

  return (
    <Menu width={148} shadow="sm" position="bottom-end" withArrow withinPortal>
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

        {isIOwner(community.owner_id) && (
          <Fragment>
            <Menu.Item
              leftSection={<IconEdit />}
              onClick={() => {
                openModal({
                  title: `Update ${community.title}`,
                  size: 'xl',
                  children: (
                    <CommunityForm
                      community={community}
                      done={closeAllModals}
                    />
                  ),
                });
              }}
            >
              Edit
            </Menu.Item>

            <Menu.Item leftSection={<IconTrash />} color="red">
              Delete
            </Menu.Item>
          </Fragment>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default CommunityMenu;
